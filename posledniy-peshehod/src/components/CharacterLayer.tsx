import type { CharacterId } from '../data/scenes';
import { characters } from '../data/characters';
import { resolveImage } from '../assets/media';

interface CharacterLayerProps {
  characters: CharacterId[];
}

/**
 * Слой персонажей-«свидетелей»: крупная фигура у правого края кадра,
 * обрезанная по вертикали и растворённая книзу. Появляется только в сценах,
 * где персонаж присутствует, и плавно проявляется при входе в сцену.
 * Если силуэт не найден — рисуется заглушка.
 */
export default function CharacterLayer({ characters: ids }: CharacterLayerProps) {
  if (ids.length === 0) return null;

  return (
    <div className="character-layer" aria-hidden="true">
      {ids.map((id, index) => {
        const meta = characters[id];
        const witness = resolveImage(meta.witness);
        return (
          <figure
            key={id}
            className="character"
            data-character={id}
            style={{ animationDelay: `${0.15 + index * 0.18}s` }}
          >
            {witness ? (
              <img className="character__image" src={witness} alt="" />
            ) : (
              <div className="character__silhouette">
                <span className="character__name">{meta.name}</span>
              </div>
            )}
          </figure>
        );
      })}
    </div>
  );
}
