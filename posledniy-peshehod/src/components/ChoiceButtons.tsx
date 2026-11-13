import type { Choice, SceneId } from '../data/scenes';

interface ChoiceButtonsProps {
  choices: Choice[];
  onChoose: (nextSceneId: SceneId) => void;
  disabled?: boolean;
}

/**
 * Крупные минималистичные кнопки выбора. Нативные <button> дают
 * клавиатурную доступность и фокус «из коробки».
 */
export default function ChoiceButtons({
  choices,
  onChoose,
  disabled = false,
}: ChoiceButtonsProps) {
  return (
    <div className="choices" role="group" aria-label="Выбор дальнейшего пути">
      {choices.map((choice) => (
        <button
          key={choice.nextSceneId + choice.label}
          type="button"
          className="choice-button"
          disabled={disabled}
          onClick={() => onChoose(choice.nextSceneId)}
        >
          {choice.label}
        </button>
      ))}
    </div>
  );
}
