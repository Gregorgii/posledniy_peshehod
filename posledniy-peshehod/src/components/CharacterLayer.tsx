import type { CharacterId } from '../data/scenes';
import { characters } from '../data/characters';
import { resolveImage } from '../assets/media';

interface CharacterLayerProps {
  characters: CharacterId[];
}

/**
 * Слой персонажей. При входе в сцену портреты плавно проявляются
 * (CSS opacity + translate). Если портрет не найден — рисуется силуэт-заглушка.
 */
export default function CharacterLayer({ characters: ids }: CharacterLayerProps) {
  if (ids.length === 0) return null;

  return (
    <div className="character-layer" aria-hidden="true">
      {ids.map((id, index) => {
        const meta = characters[id];
        const portrait = resolveImage(meta.portrait);
        return (
          <figure
            key={id}
            className="character"
            style={{ animationDelay: `${0.15 + index * 0.18}s` }}
          >
            {portrait ? (
              <img className="character__image" src={portrait} alt="" />
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
