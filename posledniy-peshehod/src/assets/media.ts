/**
 * Резолвер локальных медиа.
 *
 * Все файлы лежат в src/assets/{images,video,audio}. Мы не хардкодим URL:
 * Vite на этапе сборки находит файлы через import.meta.glob и подставляет
 * корректные (захэшированные) пути с учётом base. Если файла нет — возвращаем
 * null, и компонент рисует плейсхолдер. Это позволяет проекту собираться и
 * работать ещё до того, как добавлены реальные ассеты.
 */

type GlobMap = Record<string, string>;

const imageModules = import.meta.glob(
  './images/*.{png,jpg,jpeg,webp,avif,svg}',
  { eager: true, query: '?url', import: 'default' },
) as GlobMap;

const videoModules = import.meta.glob('./video/*.{mp4,webm,ogv}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as GlobMap;

const audioModules = import.meta.glob('./audio/*.{mp3,ogg,wav,m4a}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as GlobMap;

function pick(map: GlobMap, filename?: string | null): string | null {
  if (!filename) return null;
  const hit = Object.keys(map).find((key) => key.endsWith(`/${filename}`));
  return hit ? map[hit] : null;
}

export const resolveImage = (filename?: string | null): string | null =>
  pick(imageModules, filename);

export const resolveVideo = (filename?: string | null): string | null =>
  pick(videoModules, filename);

export const resolveAudio = (filename?: string | null): string | null =>
  pick(audioModules, filename);
