import { useEffect, useRef, useState } from 'react';
import type { Scene, SceneId } from '../data/scenes';
import { resolveImage, resolveVideo } from '../assets/media';
import Snowfall from './Snowfall';
import CharacterLayer from './CharacterLayer';
import VideoScene from './VideoScene';
import ChoiceButtons from './ChoiceButtons';
import EndingScreen from './EndingScreen';

interface SceneManagerProps {
  scene: Scene;
  onAdvance: () => void;
  onChoose: (nextSceneId: SceneId) => void;
  onChooseOther: () => void;
  onRestart: () => void;
  /** Вызывается в момент показа новой сцены (после снежной пелены). */
  onReveal?: () => void;
}

const COVER_MS = 780;
const SWAP_MS = 60;

const isMonospaced = (paragraph: string) =>
  paragraph.startsWith('Дневник:') || paragraph.startsWith('—');

/**
 * Управляет показом сцены и переходом между сценами.
 *
 * Переход «заметание снегом»:
 *  1. veil (белая пелена) плавно усиливается, снегопад ускоряется — ~780 мс;
 *  2. под пеленой подменяется сцена;
 *  3. пелена уходит, проявляя новый кадр — ~720 мс.
 * Итого ~1.5 с, в пределах требуемых 1.2–1.8 с.
 */
export default function SceneManager({
  scene,
  onAdvance,
  onChoose,
  onChooseOther,
  onRestart,
  onReveal,
}: SceneManagerProps) {
  const [displayed, setDisplayed] = useState<Scene>(scene);
  const [wiping, setWiping] = useState(false);
  const timers = useRef<number[]>([]);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const onRevealRef = useRef(onReveal);
  const advancingRef = useRef(false);
  onRevealRef.current = onReveal;

  // Синхронный ref-гард: очень быстрый двойной клик не пропускает сцену.
  const guard = (action: () => void) => {
    if (advancingRef.current) return;
    advancingRef.current = true;
    action();
  };

  useEffect(() => {
    if (scene.id === displayed.id) return;
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setWiping(true);

    const swap = window.setTimeout(() => {
      setDisplayed(scene);
      const reveal = window.setTimeout(() => {
        setWiping(false);
        advancingRef.current = false;
        onRevealRef.current?.();
      }, SWAP_MS);
      timers.current.push(reveal);
    }, COVER_MS);

    timers.current.push(swap);
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
  }, [scene]);

  useEffect(() => {
    if (wiping) return;
    const heading = sceneRef.current?.querySelector<HTMLElement>('h1');
    heading?.focus({ preventScroll: true });
  }, [displayed.id, wiping]);

  useEffect(() => () => {
    timers.current.forEach((t) => window.clearTimeout(t));
  }, []);

  const active = displayed;
  const background = resolveImage(active.image);
  const video = resolveVideo(active.video);

  return (
    <div className="scene-stage">
      <Snowfall density={1} speed={1} sweep={wiping} />

      {background && !video && (
        <div
          className="scene__background"
          style={{ backgroundImage: `url("${background}")` }}
          aria-hidden="true"
        />
      )}
      <div className="scene__vignette" aria-hidden="true" />

      <div
        ref={sceneRef}
        className={`scene${wiping ? ' is-wiping' : ''}`}
        data-scene-id={active.id}
        aria-busy={wiping}
      >
        {video && (
          <div className="scene__media">
            <VideoScene
              src={video}
              poster={background}
              placeholderLabel="[ВИДЕО — файл ещё не добавлен]"
            />
          </div>
        )}

        {!video && !background && (
          <span className="scene__media-label" aria-hidden="true">
            [ФОН — изображение не добавлено: {active.id}]
          </span>
        )}

        {active.isEnding ? (
          <EndingScreen
            scene={active}
            onRestart={() => guard(onRestart)}
            onChooseOther={() => guard(onChooseOther)}
          />
        ) : (
          <article
            className="scene__content"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="scene__content-inner" key={active.id}>
              {active.id.startsWith('scene-') && (
                <span className="scene__index" aria-hidden="true">
                  {active.id.replace('scene-', 'ГЛАВА ')}
                </span>
              )}
              <h1 className="scene__title" tabIndex={-1}>
                {active.title}
              </h1>
              <div className="scene__text scene__text--cascade">
                {active.text.map((paragraph, i) => (
                  <p
                    key={i}
                    className={
                      isMonospaced(paragraph) ? 'text-mono' : undefined
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="scene__controls">
                {active.choices ? (
                  <ChoiceButtons
                    choices={active.choices}
                    onChoose={(id) => guard(() => onChoose(id))}
                    disabled={wiping}
                  />
                ) : active.nextSceneId ? (
                  <button
                    type="button"
                    className="choice-button continue-button"
                    onClick={() => guard(onAdvance)}
                    disabled={wiping}
                  >
                    {active.continueLabel ?? 'Дальше'}
                    <span aria-hidden="true"> →</span>
                  </button>
                ) : null}
              </div>
            </div>
          </article>
        )}

        <CharacterLayer key={active.id} characters={active.characters} />
      </div>
    </div>
  );
}
