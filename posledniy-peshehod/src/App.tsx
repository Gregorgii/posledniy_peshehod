import { useCallback, useRef, useState } from 'react';
import { scenes, START_SCENE_ID, type SceneId } from './data/scenes';
import SceneManager from './components/SceneManager';
import AudioPlayer from './components/AudioPlayer';

function IntroScreen({ onStart }: { onStart: (withSound: boolean) => void }) {
  return (
    <section className="intro">
      <p className="intro__eyebrow">Интерактивная история</p>
      <h1 className="intro__title">Последний<br />пешеход</h1>
      <p className="intro__note">
        Зима третью неделю. Город пуст. Следы свежие.
        <br />
        Наушники рекомендуются. 3–5 минут.
      </p>
      <div className="intro__actions">
        <button
          type="button"
          className="choice-button intro__start"
          onClick={() => onStart(true)}
        >
          Войти в метель
        </button>
        <button
          type="button"
          className="choice-button intro__start"
          onClick={() => onStart(false)}
        >
          Без звука
        </button>
      </div>
    </section>
  );
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [startMuted, setStartMuted] = useState(false);
  const [sceneId, setSceneId] = useState<SceneId>(START_SCENE_ID);
  const [cueToken, setCueToken] = useState(0);
  const advanceLock = useRef(false);

  const scene = scenes[sceneId];

  const handleStart = useCallback((withSound: boolean) => {
    setStartMuted(!withSound);
    setStarted(true);
  }, []);

  const handleAdvance = useCallback(() => {
    if (advanceLock.current) return;
    advanceLock.current = true;
    setSceneId((current) => {
      const next = scenes[current].nextSceneId;
      return next ?? current;
    });
    window.setTimeout(() => {
      advanceLock.current = false;
    }, 900);
  }, []);

  const handleChoose = useCallback((nextSceneId: SceneId) => {
    setSceneId(nextSceneId);
  }, []);

  const handleRestart = useCallback(() => {
    setSceneId(START_SCENE_ID);
    setStarted(false);
  }, []);

  const handleChooseOther = useCallback(() => {
    setSceneId('fork');
  }, []);

  const handleReveal = useCallback(() => {
    setCueToken((token) => token + 1);
  }, []);

  return (
    <div className="app">
      {started ? (
        <SceneManager
          scene={scene}
          onAdvance={handleAdvance}
          onChoose={handleChoose}
          onChooseOther={handleChooseOther}
          onRestart={handleRestart}
          onReveal={handleReveal}
        />
      ) : (
        <IntroScreen onStart={handleStart} />
      )}

      <AudioPlayer
        started={started}
        sceneId={sceneId}
        audioCue={scene.audioCue}
        startMuted={startMuted}
        cueToken={cueToken}
      />
    </div>
  );
}
