import type { CharacterId } from './scenes';

export interface CharacterMeta {
  id: CharacterId;
  name: string;
  /** Имя файла портрета в src/assets/images/ (например, 'char-miro.png'). */
  portrait: string;
}

export const characters: Record<CharacterId, CharacterMeta> = {
  miro: {
    id: 'miro',
    name: 'Миро',
    portrait: 'char-miro.png',
  },
  radio: {
    id: 'radio',
    name: 'Голос радио',
    portrait: 'char-radio.png',
  },
  dog: {
    id: 'dog',
    name: 'Пёс',
    portrait: 'char-dog.png',
  },
};
