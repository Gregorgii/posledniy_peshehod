import type { CharacterId } from './scenes';

export interface CharacterMeta {
  id: CharacterId;
  name: string;
  /** Имя файла портрета в src/assets/images/ (например, 'char-miro.png'). */
  portrait: string;
  /** Силуэт-«свидетель» с прозрачным фоном для сценографии сцены. */
  witness: string;
}

export const characters: Record<CharacterId, CharacterMeta> = {
  miro: {
    id: 'miro',
    name: 'Миро',
    portrait: 'char-miro.png',
    witness: 'char-miro-witness.png',
  },
  radio: {
    id: 'radio',
    name: 'Голос радио',
    portrait: 'char-radio.png',
    witness: 'char-radio-witness.png',
  },
  dog: {
    id: 'dog',
    name: 'Пёс',
    portrait: 'char-dog.png',
    witness: 'char-dog-witness.png',
  },
};
