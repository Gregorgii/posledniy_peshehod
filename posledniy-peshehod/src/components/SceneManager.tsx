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
}

const COVER_MS = 780;
const SWAP_MS = 60;

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
}: SceneManagerProps) {
  const [displayed, setDisplayed] = useState<Scene>(scene);
  const [wiping, setWiping] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (scene.id === displayed.id) return;
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setWiping(true);

    const swap = window.setTimeout(() => {
      setDisplayed(scene);
      const reveal = window.setTimeout(() => setWiping(false), SWAP_MS);
      timers.current.push(reveal);
    }, COVER_MS);

    timers.current.push(swap);
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  useEffect(() => () => {
    timers.current.forEach((t) => window.clearTimeout(t));
  }, []);

  const active = displayed;
  const background = resolveImage(active.image);
  const video = resolveVideo(active.video);

  return (
    <div className="scene-stage">
      <Snowfall density={1} speed={1} sweep={wiping} />

      {background && (
        <div
          className="scene__background"
          style={{ backgroundImage: `url("${background}")` }}
          aria-hidden="true"
        />
      )}
      <div className="scene__vignette" aria-hidden="true" />

      <div
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
            onRestart={onRestart}
            onChooseOther={onChooseOther}
          />
        ) : (
          <article className="scene__content" key={active.id}>
            {active.id.startsWith('scene-') && (
              <span className="scene__index" aria-hidden="true">
                {active.id.replace('scene-', 'ГЛАВА ')}
              </span>
            )}
            <h1 className="scene__title">{active.title}</h1>
            <div className="scene__text">
              {active.text.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="scene__controls">
              {active.choices ? (
                <ChoiceButtons
                  choices={active.choices}
                  onChoose={onChoose}
                  disabled={wiping}
                />
              ) : active.nextSceneId ? (
                <button
                  type="button"
                  className="choice-button continue-button"
                  onClick={onAdvance}
                  disabled={wiping}
                >
                  {active.continueLabel ?? 'Дальше'}
                  <span aria-hidden="true"> →</span>
                </button>
              ) : null}
            </div>
          </article>
        )}

        <CharacterLayer key={active.id} characters={active.characters} />
      </div>
    </div>
  );
}
