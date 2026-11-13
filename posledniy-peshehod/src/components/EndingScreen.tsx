import type { Scene } from '../data/scenes';

interface EndingScreenProps {
  scene: Scene;
  onRestart: () => void;
  onChooseOther: () => void;
}

/**
 * Финальный экран. Тип финала (A/B) выводится крупным акцентом.
 */
export default function EndingScreen({
  scene,
  onRestart,
  onChooseOther,
}: EndingScreenProps) {
  const restartLabel = scene.endingType === 'B' ? 'Встать' : 'Пройти заново';
  return (
    <section className="ending" aria-labelledby="ending-title">
      <p className="ending__eyebrow">
        {scene.endingType ? `Финал ${scene.endingType}` : 'Финал'}
      </p>
      <h1 id="ending-title" className="ending__title">
        {scene.title}
      </h1>
      <div className="ending__text">
        {scene.text.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      <div className="choices">
        <button type="button" className="choice-button ending__restart" onClick={onRestart}>
          {restartLabel}
        </button>
        <button type="button" className="choice-button" onClick={onChooseOther}>
          Выбрать иначе
        </button>
      </div>
    </section>
  );
}
