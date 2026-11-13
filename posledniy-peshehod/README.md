# Последний пешеход

Интерактивная мини-история на Vite + React + TypeScript. Проект готов к публикации: написаны текст и сценарий, подключены иллюстрации, портреты, видео, музыка и звуковые эффекты, работают два финала.

Демо: https://gregorgii.github.io/posledniy_peshehod/

## Стек

- Vite 5 + React 18 + TypeScript
- Чистый CSS (переменные, адаптив, `prefers-reduced-motion`)
- Шрифты Oswald, PT Sans и PT Mono (Google Fonts)
- Без роутера — состояние прохождения в React state
- Все медиа локальные, внешних CDN для ассетов нет

## Запуск локально

```bash
npm install
npm run dev
```

Откройте адрес из вывода Vite (обычно http://localhost:5173).

## Сборка и предпросмотр

```bash
npm run build
npm run preview
```

`build` проверяет типы (`tsc -b`) и собирает проект в `dist/`. `preview` поднимает локальный сервер, чтобы проверить прод-сборку.

## Деплой на GitHub Pages

1. Запушьте репозиторий на GitHub (ветка `main`).
2. В настройках репозитория: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Любой push в `main` запускает workflow `.github/workflows/deploy.yml`: установка зависимостей → сборка → публикация `dist/` на Pages.
4. Ручной запуск — вкладка **Actions → Deploy to GitHub Pages → Run workflow**.

### Про base path

В `vite.config.ts` стоит `base: './'`. Все ассеты подключаются относительными путями, поэтому сайт одинаково работает:

- на GitHub Pages как project page;
- при открытии из подпапки;
- локально через `npm run preview`.

Это надёжнее, чем хардкодить конкретный base path — не нужно менять конфиг при переименовании репозитория. Единственное ограничение относительных путей — нет глубоких клиентских URL (роутера в проекте нет).

## Структура

```
.
├── .github/workflows/deploy.yml   # build + deploy на GitHub Pages
├── index.html                     # точка входа, подключение шрифтов
├── vite.config.ts                 # base: './'
├── src/
│   ├── App.tsx                    # состояние прохождения, интро, аудио
│   ├── main.tsx
│   ├── components/
│   │   ├── Snowfall.tsx           # canvas-снегопад + пелена перехода
│   │   ├── SceneManager.tsx       # показ сцены и эффект «заметания»
│   │   ├── CharacterLayer.tsx     # появление персонажей
│   │   ├── AudioPlayer.tsx        # музыка, mute, cue-сигналы
│   │   ├── VideoScene.tsx         # видео и статичный постер
│   │   ├── ChoiceButtons.tsx      # кнопки выбора
│   │   └── EndingScreen.tsx       # финальный экран
│   ├── data/
│   │   ├── scenes.ts              # типизированный граф сцен и текст
│   │   └── characters.ts          # метаданные персонажей
│   ├── assets/
│   │   ├── media.ts               # резолвер локальных медиа
│   │   ├── images/                # 6 иллюстраций и 3 портрета
│   │   ├── video/                 # видео сцены 4
│   │   └── audio/                 # музыка и два SFX
│   └── styles/
│       ├── index.css              # переменные, шрифты, layout, адаптив
│       └── animations.css         # keyframes
└── README.md
```

## Граф истории

`src/data/scenes.ts` — объект `scenes` с ключами-`SceneId`. Прохождение:

```
scene-1 → scene-2 → scene-3 → scene-4 → scene-5 → fork
                                                     ├→ ending-a
                                                     └→ ending-b
```

5 линейных сцен, 1 развилка и 2 финала. Стартовая сцена — `START_SCENE_ID`.

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

## Ассеты

Все медиа лежат в `src/assets/`, имена файлов прописываются в данных сцены без пути.

| Тип | Папка | Поле в данных | Файлы |
| --- | --- | --- | --- |
| Иллюстрации | `src/assets/images/` | `image` | `scene-1.jpg` … `scene-6.jpg` (6 шт.) |
| Портреты | `src/assets/images/` | `characters.ts → portrait` | `char-miro.png`, `char-radio.png`, `char-dog.png` (3 шт.) |
| Видео | `src/assets/video/` | `video` | `scene-4.mp4` (12,79 с) |
| Музыка | `src/assets/audio/` | — (фиксировано) | `theme.mp3` (39 с) |
| SFX | `src/assets/audio/` | `audioCue` | `cue-radio.mp3`, `cue-step.mp3` (2 шт.) |

Файлы находятся через `import.meta.glob` в `src/assets/media.ts`: Vite подставляет корректные пути с учётом `base` и хэширует файлы. Если файл не найден, компонент показывает плейсхолдер и сборка не падает.

## Возможности

- Снегопад на canvas с настраиваемой плотностью и скоростью
- Переход между сценами «заметание снегом» (~1,5 с)
- Фоновая музыка с mute/unmute и запуском по кнопке «Войти в метель»
- Отдельные звуковые сигналы сцен, синхронизированные с моментом показа
- Плавное появление персонажей
- Видео с autoplay/muted/loop/playsinline и фолбэком
- Финальные экраны A/B и рестарт
- Адаптив под мобильные
- `prefers-reduced-motion`: статичный снег и постер вместо видео

## Доступность

- Кнопки выбора работают с клавиатуры и имеют ARIA-атрибуты
- При смене сцены фокус переходит на её заголовок, текст объявляется через `aria-live`
- Кнопка звука недоступна, если музыка не загружена

## Замечания

- **Автоплей**: музыка стартует только после клика на интро — иначе браузер заблокирует воспроизведение. Видео `muted` автоплей разрешён.
- **Относительный base** (`base: './'`) подходит, пока нет клиентских маршрутов.
- **Вес медиа**: видео и иллюстрации влияют на первую загрузку; при замене сжимайте файлы.
- **GitHub Pages + SPA**: прямые ссылки на внутренние сцены не поддерживаются (роутера нет), но история линейная и это не требуется.
- **Первый `npm ci` в CI** требует закоммиченного `package-lock.json` — не удаляйте его.
