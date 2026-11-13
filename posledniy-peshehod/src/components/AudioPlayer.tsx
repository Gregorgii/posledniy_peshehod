import { useEffect, useRef, useState } from 'react';
import { resolveAudio } from '../assets/media';

interface AudioPlayerProps {
  /** Музыка запускается только после первого действия пользователя. */
  started: boolean;
  /** Смена сцены — повод плавно приглушить музыку на переходе. */
  sceneId: string;
  /** Имя файла аудио-сигнала (one-shot) из src/assets/audio. */
  audioCue?: string;
  /** Стартовое состояние звука (кнопка «Без звука» на интро). */
  startMuted?: boolean;
  /** Увеличивается в момент показа новой сцены — запускает cue. */
  cueToken?: number;
}

const THEME_FILE = 'theme.mp3';
const BASE_VOLUME = 0.45;
const CUE_VOLUME = 0.6;

function fade(
  audio: HTMLAudioElement,
  to: number,
  durationMs: number,
  frameRef: { current: number },
): () => void {
  if (frameRef.current) cancelAnimationFrame(frameRef.current);
  const from = audio.volume;
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min((now - start) / durationMs, 1);
    audio.volume = from + (to - from) * t;
    if (t < 1) {
      frameRef.current = requestAnimationFrame(step);
    } else {
      frameRef.current = 0;
    }
  };
  frameRef.current = requestAnimationFrame(step);
  return () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
  };
}

/**
 * Фоновая музыка с кнопкой mute/unmute. Автоплей браузерами заблокирован,
 * поэтому play() вызывается только когда started === true (после «Начать»).
 */
export default function AudioPlayer({
  started,
  sceneId,
  audioCue,
  startMuted = false,
  cueToken = 0,
}: AudioPlayerProps) {
  const themeSrc = resolveAudio(THEME_FILE);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const cueRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(startMuted);
  const [available, setAvailable] = useState(true);
  const mutedRef = useRef(muted);
  const fadeFrame = useRef(0);
  const prevStartMuted = useRef(startMuted);

  // Синхронизируем mute с пропом ещё до коммита, чтобы первый play()
  // не успел выдать кадр звука при входе «Без звука».
  if (prevStartMuted.current !== startMuted) {
    prevStartMuted.current = startMuted;
    setMuted(startMuted);
  }

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    if (started) setAvailable(true);
  }, [started]);

  useEffect(() => {
    const cue = cueRef.current;
    if (cue) cue.muted = muted;

    const music = musicRef.current;
    if (!music) return;

    if (!started || !themeSrc) {
      music.pause();
      return;
    }

    music.muted = muted;
    music.volume = muted ? 0 : BASE_VOLUME;
    const playPromise = music.play();
    if (playPromise) {
      playPromise.catch(() => setAvailable(false));
    }
  }, [started, themeSrc, muted]);

  useEffect(() => {
    const audio = musicRef.current;
    if (!audio || !started || !themeSrc || mutedRef.current) return;
    const cancel = fade(audio, 0.08, 500, fadeFrame);
    const up = window.setTimeout(() => {
      fade(audio, BASE_VOLUME, 900, fadeFrame);
    }, 750);
    return () => {
      cancel();
      window.clearTimeout(up);
    };
  }, [sceneId]);

  useEffect(() => {
    if (cueToken === 0 || !audioCue || mutedRef.current) return;
    const cue = cueRef.current;
    if (!cue) return;
    const src = resolveAudio(audioCue);
    if (!src) return;
    cue.muted = mutedRef.current;
    cue.volume = CUE_VOLUME;
    cue.src = src;
    cue.currentTime = 0;
    cue.play().catch(() => undefined);
  }, [cueToken]);

  const musicMissing = !themeSrc;

  return (
    <div className="audio-player">
      {themeSrc && (
        <audio
          ref={musicRef}
          src={themeSrc}
          loop
          preload="metadata"
          muted={muted}
        />
      )}
      <audio ref={cueRef} preload="none" muted={muted} />
      <button
        type="button"
        className="audio-toggle"
        onClick={() => {
          setAvailable(true);
          setMuted((m) => !m);
        }}
        aria-pressed={muted}
        aria-label={muted ? 'Включить музыку' : 'Выключить музыку'}
        disabled={musicMissing}
        title={
          musicMissing
            ? 'Музыка ещё не добавлена'
            : !available
              ? 'Музыка не запустилась — нажмите, чтобы включить'
              : muted
                ? 'Включить музыку'
                : 'Выключить музыку'
        }
      >
        <span aria-hidden="true">{muted ? '♪̶' : '♪'}</span>
        <span className="audio-toggle__text">{muted ? 'muted' : 'sound'}</span>
      </button>
    </div>
  );
}
