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
}

const THEME_FILE = 'theme.mp3';
const BASE_VOLUME = 0.45;

function fade(
  audio: HTMLAudioElement,
  to: number,
  durationMs: number,
): number {
  const from = audio.volume;
  const start = performance.now();
  let frame = 0;
  const step = (now: number) => {
    const t = Math.min((now - start) / durationMs, 1);
    audio.volume = from + (to - from) * t;
    if (t < 1) frame = requestAnimationFrame(step);
  };
  frame = requestAnimationFrame(step);
  return frame;
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
}: AudioPlayerProps) {
  const themeSrc = resolveAudio(THEME_FILE);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const cueRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(startMuted);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    setMuted(startMuted);
  }, [startMuted]);

  useEffect(() => {
    const audio = musicRef.current;
    if (!audio) return;
    if (!started || !themeSrc) {
      audio.pause();
      return;
    }
    audio.volume = muted ? 0 : BASE_VOLUME;
    const playPromise = audio.play();
    if (playPromise) {
      playPromise.catch(() => setAvailable(false));
    }
  }, [started, themeSrc, muted]);

  useEffect(() => {
    const audio = musicRef.current;
    if (!audio || !started || !themeSrc) return;
    audio.muted = muted;
    if (!muted) audio.volume = BASE_VOLUME;
  }, [muted, started, themeSrc]);

  useEffect(() => {
    const audio = musicRef.current;
    if (!audio || !started || !themeSrc || muted) return;
    const down = fade(audio, 0.08, 500);
    const up = window.setTimeout(() => {
      cancelAnimationFrame(down);
      fade(audio, BASE_VOLUME, 900);
    }, 750);
    return () => {
      cancelAnimationFrame(down);
      window.clearTimeout(up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneId]);

  useEffect(() => {
    if (!started || !audioCue) return;
    const src = resolveAudio(audioCue);
    if (!src || !cueRef.current) return;
    cueRef.current.src = src;
    cueRef.current.volume = 0.6;
    cueRef.current.play().catch(() => undefined);
  }, [audioCue, started]);

  return (
    <div className="audio-player">
      {themeSrc && (
        <audio ref={musicRef} src={themeSrc} loop preload="auto" />
      )}
      <audio ref={cueRef} preload="none" />
      <button
        type="button"
        className="audio-toggle"
        onClick={() => setMuted((m) => !m)}
        aria-pressed={muted}
        aria-label={muted ? 'Включить музыку' : 'Выключить музыку'}
        title={
          themeSrc && available
            ? muted
              ? 'Включить музыку'
              : 'Выключить музыку'
            : 'Музыка ещё не добавлена'
        }
      >
        <span aria-hidden="true">{muted ? '♪̶' : '♪'}</span>
        <span className="audio-toggle__text">{muted ? 'muted' : 'sound'}</span>
      </button>
    </div>
  );
}
