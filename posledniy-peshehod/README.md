# Последний пешеход

Интерактивная мини-история на Vite + React + TypeScript. Пока это технический каркас: механики готовы, текст и медиа — заглушки.

## Стек

- Vite 5 + React 18 + TypeScript
- Чистый CSS (переменные, адаптив, prefers-reduced-motion)
- Без роутера — состояние прохождения в React state
- Без внешних ассетов и CDN — всё локальное

## Запуск локально

```bash
npm install
npm run dev
```

Откройте адрес из вывода Vite (обычно http://localhost:5173).

## Сборка

```bash
npm run build
npm run preview
```

Готовая сборка лежит в `dist/`. `preview` поднимает локальный сервер, чтобы проверить прод-сборку.

## Деплой на GitHub Pages

1. Запушьте репозиторий на GitHub (ветка `main`).
2. В настройках репозитория: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Любой push в `main` запускает workflow `.github/workflows/deploy.yml`: установка зависимостей → сборка → публикация `dist/` на Pages.
4. Ручной запуск — вкладка **Actions → Deploy to GitHub Pages → Run workflow**.

### Про base path

В `vite.config.ts` стоит `base: './'`. Все ассеты подключаются относительными путями, поэтому сайт одинаково работает:
- на GitHub Pages как project page (`https://user.github.io/repo/`);
- при открытии из подпапки;
- локально через `npm run preview`.

Это надёжнее, чем хардкодить `base: '/repo/'` — не нужно менять конфиг при переименовании репозитория. Единственное ограничение относительных путей — нет глубоких клиентских URL (у нас их и нет: роутера нет).

## Структура

```
.
├── .github/workflows/deploy.yml   # build + deploy на GitHub Pages
├── index.html
├── vite.config.ts                 # base: './'
├── src/
│   ├── App.tsx                    # состояние прохождения, интро, аудио
│   ├── main.tsx
│   ├── components/
│   │   ├── Snowfall.tsx           # canvas-снегопад + пелена перехода
│   │   ├── SceneManager.tsx       # показ сцены и эффект «заметания»
│   │   ├── CharacterLayer.tsx     # появление персонажей
│   │   ├── AudioPlayer.tsx        # музыка, mute, старт по клику
│   │   ├── VideoScene.tsx         # видео с фолбэком
│   │   ├── ChoiceButtons.tsx      # кнопки выбора
│   │   └── EndingScreen.tsx       # финальный экран
│   ├── data/
│   │   ├── scenes.ts              # типизированный граф сцен (заглушки)
│   │   └── characters.ts          # метаданные персонажей
│   ├── assets/
│   │   ├── media.ts               # резолвер локальных медиа
│   │   ├── images/                # фоны и портреты (+ README)
│   │   ├── video/                 # видео (+ README)
│   │   └── audio/                 # музыка и сигналы (+ README)
│   └── styles/
│       ├── index.css              # переменные, layout, адаптив
│       └── animations.css         # keyframes
└── README.md
```

## Как устроен граф истории

`src/data/scenes.ts` — объект `scenes` с ключами-`SceneId`. Прохождение:

```
scene-1 → scene-2 → scene-3 → scene-4 → scene-5 → fork
                                                     ├→ ending-a
                                                     └→ ending-b
```

5 линейных сцен, 1 развилка, 2 финала. Стартовая сцена — `START_SCENE_ID`.

Тип сцены:

```ts
interface Scene {
  id: SceneId;
  title: string;
  text: string[];
  image: string | null;        // имя файла в src/assets/images
  characters: CharacterId[];   // 'miro' | 'radio' | 'dog'
  video?: string;              // имя файла в src/assets/video
  audioCue?: string;           // имя файла в src/assets/audio
  choices?: { label: string; nextSceneId: SceneId }[];
  nextSceneId?: SceneId;
  isEnding?: boolean;
  endingType?: 'A' | 'B';
}
```

Чтобы заменить заглушки: правьте только `scenes.ts` — текст, `image`, `video`, `audioCue`, `choices`, `nextSceneId`. Компоненты трогать не нужно.

## Куда класть ассеты

Все медиа — в `src/assets/`. Имена файлов прописываются в данных сцены **без пути**, только имя:

| Тип | Папка | Поле в `scenes.ts` | Пример |
| --- | --- | --- | --- |
| Фон сцены | `src/assets/images/` | `image` | `scene-1.jpg` |
| Портрет | `src/assets/images/` | `characters.ts → portrait` | `char-miro.png` |
| Видео | `src/assets/video/` | `video` | `scene-4.mp4` |
| Музыка | `src/assets/audio/` | — (фиксировано) | `theme.mp3` |
| Сигнал | `src/assets/audio/` | `audioCue` | `cue-radio.mp3` |

Точные требования и рекомендации по форматам — в README внутри каждой папки ассетов.

Технически файлы находятся через `import.meta.glob` в `src/assets/media.ts`: Vite сам подставляет корректные пути с учётом `base` и хэширует файлы. Отсутствующий файл не ломает сборку — компонент показывает плейсхолдер.

## Что уже работает

- [x] Снегопад на canvas с настраиваемой плотностью/скоростью
- [x] Переход между сценами «заметание снегом» (~1.5 с)
- [x] Фоновая музыка с mute/unmute и запуском по кнопке «Начать»
- [x] Плавное появление персонажей
- [x] Видео с autoplay/muted/loop/playsinline и фолбэком
- [x] Доступные кнопки выбора (клавиатура, aria)
- [x] Финальные экраны A/B и рестарт
- [x] Адаптив под мобильные
- [x] Деплой-workflow для GitHub Pages

## Что осталось подключить

- `src/assets/audio/theme.mp3` — фоновая музыка (пока тишина)
- `src/assets/images/scene-N.jpg` — фоны сцен (пока градиентные заглушки)
- `src/assets/images/char-miro.png`, `char-radio.png`, `char-dog.png` — портреты (пока силуэты)
- `src/assets/video/*.mp4` — видео-вставки (опционально; пока плейсхолдер)
- Реальный текст и заголовки в `src/data/scenes.ts`
- Реальные подписи кнопок в `choices` и подзаголовок интро в `App.tsx`

## Замечания и риски

- **Автоплей**: музыка стартует только после клика «Начать» — это осознанно, иначе браузер заблокирует воспроизведение. Видео `muted` автоплей разрешён.
- **Относительный base** (`base: './'`) подходит, пока нет клиентских маршрутов. Если появится роутер с путями — перейдите на `base: '/<repo>/'`.
- **Вес медиа**: большие видео/картинки замедлят первую загрузку. Сжимайте до указанных в README лимитов.
- **GitHub Pages + SPA**: прямые ссылки на внутренние сцены не поддерживаются (роутера нет), но история линейная и это не требуется.
- **Первый `npm ci` в CI** требует закоммиченного `package-lock.json` — он создаётся при `npm install`; не удаляйте его.
