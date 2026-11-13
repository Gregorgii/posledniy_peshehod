import { useEffect, useState } from 'react';

interface VideoSceneProps {
  /** Уже разрешённый URL видео или null, если файла нет. */
  src: string | null;
  /** URL постера-заглушки (может быть null). */
  poster?: string | null;
  /** Текст плейсхолдера, если видео недоступно. */
  placeholderLabel?: string;
}

/**
 * Видео-вставка сцены. Если файла нет или он не загрузился — ошибка гасится,
 * показывается постер либо текстовый плейсхолдер.
 */
export default function VideoScene({
  src,
  poster = null,
  placeholderLabel = '[ВИДЕО — файл ещё не добавлен]',
}: VideoSceneProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <div className="video-scene video-scene--placeholder" role="img" aria-label="Видео-заглушка">
        {poster ? (
          <img src={poster} alt="" className="video-scene__poster" />
        ) : (
          <span className="video-scene__label">{placeholderLabel}</span>
        )}
      </div>
    );
  }

  return (
    <div className="video-scene">
      <video
        className="video-scene__video"
        src={src}
        poster={poster ?? undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
