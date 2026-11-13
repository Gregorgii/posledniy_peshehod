# Гайд по генерации ассетов — «Последний пешеход»

**Дедлайн:** 14.11.2026, 23:00. **Сегодня:** 13.11.2026.
**Принцип:** платно — только LLM. Картинки, видео, музыка и SFX — бесплатные триалы и free tier. Карту не вводим, подписки не оформляем.

Цель вечера — закрыть обязательный минимум для 12 баллов: **6 иллюстраций + видео 10–20 с + аудио 20–40 с**. Портреты и SFX — после него, по остатку времени.

---

## 0. Что важно сделать до первой генерации

1. Создай папки, если их нет:
   `posledniy-peshehod/src/assets/images/`, `.../video/`, `.../audio/`.
2. Открой `docs/production/economics-log.csv` — одна строка на каждый ассет. Пиши сразу, потом не восстановишь.
3. Выбери **один** основной сервис для картинок и генерируй в нём все 9 изображений. Смешивать Nano Banana и Kandinsky внутри одной серии — почти гарантированный дрейф стиля.
4. Сгенерируй `scene-1.jpg` первым. Это style anchor. Пока он не нравится — остальные картинки не начинай.
5. Каждый кадр — 3–5 попыток максимум. Если 5 подряд плохо — меняй сервис или упрощай кадр, а не переписывай промпт бесконечно.
6. Все финальные файлы кладутся **плоско**, без вложенных папок: `media.ts` ищет по маске `./images/*`, `./audio/*`, `./video/*`.

---

## 1. План на вечер: порядок по приоритету

| # | Что генерим | Сервис (основной → резерв) | Ориентир времени | Куда кладём | Строка в econlog |
|---|---|---|---|---|---|
| 1 | `scene-1.jpg` — style anchor | Google AI Studio / Nano Banana → Kandinsky | 20–30 мин | `src/assets/images/` | I-01, иллюстрация |
| 2 | `scene-4.jpg` — постер видео | тот же сервис | 15–20 мин | `src/assets/images/` | I-04 |
| 3 | `scene-4.mp4` — видео 12–15 с | Hailuo MiniMax → Kling → Runway → fallback: анимированный постер | 40–60 мин | `src/assets/video/` | V-01, видео |
| 4 | `theme.mp3` — эмбиент 30–40 с | Stable Audio / Mubert → Soundraw trial / Suno → сборка в Audacity | 30–40 мин | `src/assets/audio/` | A-01, музыка |
| 5 | `scene-2.jpg` — кабина радио | Nano Banana → FLUX.1 schnell | 15–20 мин | `src/assets/images/` | I-02 |
| 6 | `scene-3.jpg` — дневник | Nano Banana → Kandinsky | 15–20 мин | `src/assets/images/` | I-03 |
| 7 | `scene-5.jpg` — красная перчатка | Nano Banana → FLUX | 15–25 мин | `src/assets/images/` | I-05 |
| 8 | `scene-6.jpg` — снежное поле | Nano Banana → Kandinsky | 15–20 мин | `src/assets/images/` | I-06 |
| 9 | `char-miro.png` | Nano Banana, image-to-image от `scene-1.jpg` | 15–20 мин | `src/assets/images/` | портрет |
| 10 | `char-radio.png` | Nano Banana → FLUX | 10–15 мин | `src/assets/images/` | портрет |
| 11 | `char-dog.png` | Nano Banana, image-to-image от `scene-4.jpg` | 15–20 мин | `src/assets/images/` | портрет |
| 12 | `cue-step.mp3`, `cue-radio.mp3` | ElevenLabs SFX → Freesound (CC0) | 20–30 мин | `src/assets/audio/` | SFX |
| 13 | Опционально: голос радио, `cue-tag/wind/creak` | ElevenLabs / Silero / Freesound | 20–40 мин | `src/assets/audio/` | SFX/TTS |
| 14 | Сжатие, интеграция, проверка в браузере | `sips`, `ffmpeg`, Squoosh, `npm run dev` | 40–60 мин | — | интеграция/QA |

**Итого:** 4,5–6,5 часа. Если время горит — шаги 1–8 дают обязательный минимум; шаги 9–13 можно урезать.

**Порядок внутри картинок:** 1 → 4 → 2 → 3 → 5 → 6. `scene-4.jpg` нужен раньше остальных, потому что он же постер видео и переиспользуется в сценах 4, 5 и на развилке.

---

## 2. Консистентность: один референс, один суффикс, один seed

Это главный технический приём. Без него 6 кадров будут выглядеть как 6 разных фильмов.

1. **Один style anchor.** `scene-1.jpg` — эталон. Во всех остальных генерациях, где сервис это умеет, прикладывай `scene-1.jpg` как reference / image-to-image.
2. **Один seed.** Если в сервисе есть поле seed — зафиксируй одно число (например, `123456`) для всех картинок. Запиши его в комментарий econlog. Если seed нет — не страшно, работает reference.
3. **Один суффикс.** В каждом промпте ниже уже вписан единый style suffix. Не меняй его между кадрами: палитра, свет, зерно и композиция должны совпадать. В портретных промптах композиционная часть суффикса заменена на `3:4 portrait` — иначе wide-shot суффикс ломает портрет; палитра, свет и зерно при этом те же.
4. **Миро — бесполый.** Лицо не читается, фигура со спины или в капюшоне, одежда скрывает тело. В промптах добавлено `androgynous, gender not readable`. Не добавляй бороду, каблуки, макияж, выраженную мускулатуру или фигуру.
5. **Красный только один раз.** Единственный красный объект — перчатка в `scene-5`. Во всех остальных кадрах красного нет вообще.
6. **Без текста.** Вся типографика — HTML/CSS поверх картинки. Любые буквы, цифры, логотипы и водяные знаки — брак.
7. **Без лиц.** Даже в профиль. В широких кадрах фигура меньше 10% высоты.
8. **Портреты — не character sheet.** Это «карточка присутствия»: силуэт, спина, предмет. Фон ровный туманно-серый, без деталей.

---

## 3. Практика на бесплатных триалах

Лимиты меняются каждую неделю — цифры ниже ориентировочные, проверяй на месте. Главное правило: **сначала дешёвый черновик, потом финал**.

| Сервис | Что обычно даёт бесплатно | Когда закончилось — что делать |
|---|---|---|
| **Google AI Studio / Nano Banana** (Gemini 2.5 Flash Image) | Бесплатная дневная квота, обычно десятки изображений; умеет reference image | Перейти на Kandinsky для оставшихся кадров, но тогда перегенерируй всю серию в одном сервисе |
| **Kandinsky / Fusionbrain** | Бесплатная очередь, обычно ~100 генераций в день; RU-интерфейс | FLUX.1 schnell на Hugging Face Space; или подождать сброса квоты |
| **FLUX.1 schnell (HF Space)** | Бесплатная очередь, rate limit, без кредитов | Kandinsky; или вернуться в Nano Banana на следующий день |
| **Hailuo MiniMax** | Стартовые и ежедневные кредиты, обычно хватает на несколько клипов 6–10 с | Kling (дневные кредиты) → Runway trial → **официальный fallback**: медленный push-in по `scene-4.jpg` |
| **Kling AI** | Ежедневные кредиты, 1–3 клипа 5 с | Hailuo / Runway; или fallback |
| **Runway** | Разовые trial-кредиты, ~1–2 коротких клипа | Не тратить на черновики; только финальный клип или fallback |
| **Veo в AI Studio** | Ограниченная квота, доступность зависит от региона | Не рассчитывать как на основной; пробовать, если уже открыт AI Studio |
| **Stable Audio** | Бесплатные кредиты на несколько треков | Mubert → Suno → сборка в Audacity из бесплатных SFX |
| **Mubert** | Free tier с ограничениями и атрибуцией | Stable Audio / Suno; или Audacity |
| **Soundraw** | Пробный режим с ограничением на экспорт; часто водяной знак | Проверь watermark; если он есть — не бери, переходи на Stable Audio / Mubert / Suno |
| **Suno** | ~50 кредитов в день, около 10 генераций; нужен instrumental | Stable Audio / Mubert |
| **ElevenLabs** | ~10 000 символов в месяц + SFX на free tier | Silero TTS локально; Freesound CC0 для шумов |
| **Silero TTS** | Локально, без лимита | — |
| **Freesound** | CC0-звуки, скачивание без лимита | — |

**Как не сжечь лимит:**
- Картинки: сначала 1–2 черновика в меньшем разрешении/быстром режиме, финал — только после одобрения композиции.
- Видео: сначала короткий тест 5–6 с в стандартном режиме. Если морфинг — не генерируй 10 с, сразу упрощай движение или переходи на fallback.
- Аудио: не крути 20 вариантов. 2–3 трека, выбрать лучший, обрезать и залупить в Audacity.
- Не вводить карту и не покупать кредиты. Если сервис требует оплату — это не наш сервис.
- Free tier часто **не даёт коммерческую лицензию** и может ставить водяной знак. Для учебного проекта это допустимо, но проверь watermark и укажи сервисы в AI declaration.

---

## 4. Пошагово по каждому ассету

### Шаг 1. `scene-1.jpg` — style anchor (I-01)

**Сервис:** Google AI Studio → Gemini 2.5 Flash Image («Nano Banana»). Если не открывается без VPN — Kandinsky 3.1 (Fusionbrain). Резерв: FLUX.1 schnell на Hugging Face Space.

**Как:** открой сервис → выбери генерацию изображений → aspect ratio 16:9 → вставь промпт → сгенерируй 3–4 варианта → скачай лучший.

**Промпт (целиком):**
```text
Extreme wide shot of an empty snowbound city street at dawn, one lone apartment doorway on the left, a single fresh line of footprints starting at that doorstep and running straight into white distance, a tiny snowplow operator in a heavy dark work coat with the hood up, androgynous, gender not readable, standing with their back turned, shovel in hand, no other people, near-monochrome palette of snow white #F2F2EF, ink black #0B0C0D, tin gray #6E747A and fog gray #C9CDD0, with a single saturated red #B3121C accent only where specified; contre-jour backlight, long shadows, blown highlights, milky low-contrast midtones, clean blacks; heavy falling snow as film texture; extreme wide composition, 70-80% negative space, tiny human figure under 10% of frame height, centered or lower-third; shot on 35mm film, fine visible grain, subtle halation on bright edges; cold epic, quiet, still; no text, no logos, no watermark, no crowd, no visible face, no warm sunlight, no teal-orange grade, no lens flare, no bloom, 16:9
```

**Негатив (если есть поле):** `face, portrait, crowd, cars, traffic lights, colorful signs, warm window light, multiple red objects, text, watermark, fisheye, aerial top-down, cartoon`

**Параметры:** 16:9, 1920×1080, seed зафиксировать, если есть.

**Отбор:** след — одна непрерывная линия от двери; фигура < 10% высоты; красного нет; снег выглядит зерном, а не «эффектом частиц»; тени длинные и в одну сторону; горизонт высокий или отсутствует.

**Файл:** `posledniy-peshehod/src/assets/images/scene-1.jpg`, JPEG ≤ 500 КБ.

**Econlog:** этап `иллюстрация`, задача `scene-1 — style anchor`, сервис, модель, дата, число генераций, попытки до годного, кредиты, 0 ₽, время.

---

### Шаг 2. `scene-4.jpg` — след возвращается + постер видео (I-04)

**Сервис:** тот же, что для `scene-1.jpg`. Обязательно приложи `scene-1.jpg` как reference, чтобы улица и свет совпали.

**Промпт (целиком):**
```text
Wide shot of the same snowbound empty street, a single line of footprints looping in a wide circle and returning to the same lone door, the door acting as the vanishing point, a tiny snowplow operator with their back turned, hood up, androgynous, gender not readable, and a dark dog beside them in the far distance, near-monochrome palette of snow white #F2F2EF, ink black #0B0C0D, tin gray #6E747A and fog gray #C9CDD0, with a single saturated red #B3121C accent only where specified; contre-jour backlight, long shadows, blown highlights, milky low-contrast midtones, clean blacks; heavy falling snow as film texture; extreme wide composition, 70-80% negative space, tiny human figure under 10% of frame height, centered or lower-third; shot on 35mm film, fine visible grain, subtle halation on bright edges; cold epic, quiet, still; no text, no logos, no watermark, no crowd, no visible face, no warm sunlight, no teal-orange grade, no lens flare, no bloom, 16:9
```

**Негатив:** `two doors, crossroads, multiple tracks, crowd, cars, visible face, red objects, text, symmetric perfect circle, map-like top view`

**Параметры:** 16:9, 1920×1080, тот же seed, что у `scene-1.jpg`, если возможно.

**Отбор:** петля читается без схемы и стрелок; дверь — точка схода; фигура и пёс — два тёмных пятна; та же улица и тот же свет, что в `scene-1.jpg`; красного нет.

**Файл:** `posledniy-peshehod/src/assets/images/scene-4.jpg`, JPEG ≤ 500 КБ. Этот же файл — постер для видео.

---

### Шаг 3. `scene-4.mp4` — видео 12–15 с (V-01)

**Сервис:** Hailuo MiniMax (image-to-video) → Kling → Runway trial. Если ни один не даёт 10+ секунд без артефактов — используй официальный fallback (ниже).

**Как:** открой сервис → Image to Video → загрузи `scene-4.jpg` → вставь промпт → выбери 16:9, 1080p (или 720p), 6–10 с, standard mode → сгенерируй. Если сервис даёт только 5–6 с, сгенерируй самый длинный вариант и замедли до 12 с в редакторе (0,8×–1×, без сильного слоумо).

**Промпт (image-to-video от `scene-4.jpg`):**
```text
Slow low tracking shot moving forward along a single line of footprints in deep snow, heavy snowfall drifting across the frame, a tiny figure in a dark coat walking ahead with their back turned, hood up, androgynous, gender not readable, a dark dog beside them, camera stays at knee height, steady glide, no cuts, no camera shake, footprints gradually disappearing under fresh snow behind the camera, near-monochrome snow white and ink black and tin gray, 35mm film grain, cold epic, 12 seconds
```

**Негатив (если есть):** `face, turning around, running, crowd, cars, camera cut, zoom, speed ramp, morphing limbs, extra legs, red objects, text, watermark`

**Параметры:** 16:9, 1280×720 или 1920×1080, 12–15 с, 24 fps, H.264 MP4, **без звука**, ≤ 8 МБ (лучше 3–5 МБ).

**Отбор:** нет морфинга ног и собаки; камера не уходит вбок; снегопад непрерывен; фигура не разворачивается; след остаётся одной линией; последний кадр можно поставить на паузу.

**Fallback, если видео не получилось (официально допустимо):** возьми `scene-4.jpg`, сделай медленный push-in/pan 102–108% на 12 с в CapCut / Keynote / любом редакторе, наложи снежный слой и зерно, экспортируй 1080p без звука. Это закрывает требование «видео 10–20 с» и выглядит стилистически чище, чем артефактный AI-клип.

**Файл:** `posledniy-peshehod/src/assets/video/scene-4.mp4`.

**Сжатие (если файл тяжёлый):**
```bash
ffmpeg -i raw.mp4 -vf "scale=-2:720" -c:v libx264 -crf 24 -preset medium -an -movflags +faststart scene-4.mp4
```

---

### Шаг 4. `theme.mp3` — основной эмбиент (A-01)

**Сервис:** Stable Audio (free tier) или Mubert (free tier). Резерв: Soundraw trial или Suno в instrumental-режиме; если ничего не даёт бесшовную петлю — собери в Audacity по рецепту из `assets-prompts.md`. У Soundraw проверь водяной знак: с watermark трек не берём.

**Как:** открой сервис → выбери instrumental / ambient → duration 30–40 с → вставь промпт → сгенерируй 2–3 варианта → скачай MP3/WAV.

**Промпт (целиком):**
```text
30-40 second loopable cold ambient score for an existential winter film, low cello and contrabass drone, wide wind, distant metal creaks, faint radio static, slow sub pulse entering midway, sparse prepared piano hit, no melody lead, no vocals, no drums, no percussion, bleak, spacious, cinematic, slow, seamless loop
```

**Негатив:** `vocals, choir, beat, drums, EDM, melody hook, major key, bright bells, orchestral swell, trailer braams`

**Параметры:** 30–40 с, 48 кГц, стерео, MP3 320 или WAV; пик ≤ −1 dBFS; интегральная громкость около −16 LUFS; стык петли без щелчка.

**Отбор:** нет запоминающегося мотива; ветер не «синтетический свист»; суб-пульс не превращается в бит; стык петли не слышен; на малой громкости трек не исчезает.

**Файл:** `posledniy-peshehod/src/assets/audio/theme.mp3`, ≤ 2–3 МБ. Если генератор дал 60 с — обрежь до 32–40 с по тихому месту и сделай кроссфейд 0,5–1 с.

**Сжатие:**
```bash
ffmpeg -i raw.wav -ar 48000 -ac 2 -b:a 192k theme.mp3
```

---

### Шаг 5. `scene-2.jpg` — допрос радио (I-02)

**Сервис:** Nano Banana; резерв — FLUX.1 schnell. Reference: `scene-1.jpg` (палитра и зерно), даже если кадр интерьерный.

**Промпт (целиком):**
```text
Interior of an old snowplow cab at dawn, frost blooming on the windshield from inside, a glowing analog radio on the dashboard with a thin luminous dial, faint waveform-like reflection on the frosted glass, empty driver seat, worn metal and rubber, cold light through the ice, claustrophobic framing, near-monochrome palette of snow white #F2F2EF, ink black #0B0C0D, tin gray #6E747A and fog gray #C9CDD0, with a single saturated red #B3121C accent only where specified; contre-jour backlight, long shadows, blown highlights, milky low-contrast midtones, clean blacks; heavy falling snow as film texture; extreme wide composition, 70-80% negative space, tiny human figure under 10% of frame height, centered or lower-third; shot on 35mm film, fine visible grain, subtle halation on bright edges; cold epic, quiet, still; no text, no logos, no watermark, no crowd, no visible face, no warm sunlight, no teal-orange grade, no lens flare, no bloom, 16:9
```

**Негатив:** `driver, human figure, face, hands on wheel, text on radio dial, brand logo, warm orange interior, saturated colors, clean new car, reflections of a person`

**Параметры:** 16:9, 1920×1080, тот же seed.

**Отбор:** шкала радио — единственный источник «тепла», но не красная; лицо и силуэт водителя не читаются; иней выглядит реальным; кадр тесный, но не хоррорный; на шкале нет букв и цифр.

**Файл:** `posledniy-peshehod/src/assets/images/scene-2.jpg`, JPEG ≤ 500 КБ.

---

### Шаг 6. `scene-3.jpg` — дневник (I-03)

**Сервис:** Nano Banana; резерв — Kandinsky. Reference: `scene-1.jpg`.

**Промпт (целиком):**
```text
Close-up of an open paper diary on a cold wooden table, yesterday's entry densely crossed out with dark ink, the paper almost worn through, fine snow dust on the page, the edge of a heavy dark work glove at the bottom of frame, shallow depth of field, cold side light, near-monochrome palette of snow white #F2F2EF, ink black #0B0C0D, tin gray #6E747A and fog gray #C9CDD0, with a single saturated red #B3121C accent only where specified; contre-jour backlight, long shadows, blown highlights, milky low-contrast midtones, clean blacks; heavy falling snow as film texture; extreme wide composition, 70-80% negative space, tiny human figure under 10% of frame height, centered or lower-third; shot on 35mm film, fine visible grain, subtle halation on bright edges; cold epic, quiet, still; no text, no logos, no watermark, no crowd, no visible face, no warm sunlight, no teal-orange grade, no lens flare, no bloom, 16:9
```

**Негатив:** `readable text, letters, latin script, cyrillic, handwriting, coffee cup, warm lamp, red pen, multiple hands, face, clean new notebook, high saturation`

**Параметры:** 16:9, 1920×1080; допустим кроп 3:2.

**Отбор:** перечёркивание читается как жест, а не текстура; **ни одной разборчивой буквы** (иначе будет псевдотекст); снежная пыль на бумаге; малая глубина резкости; перчатка у нижнего края — не красная.

**Файл:** `posledniy-peshehod/src/assets/images/scene-3.jpg`, JPEG ≤ 500 КБ.

---

### Шаг 7. `scene-5.jpg` — красная перчатка (I-05)

**Сервис:** Nano Banana; резерв — FLUX (там красный стабильнее). Reference: `scene-1.jpg`.

**Промпт (целиком):**
```text
Close-up of a red work glove on a person's own hand, worn red canvas with darker seams, snow melting on the heavy dark sleeve, blurred snowbound street behind, the red glove is the only color in an otherwise near-monochrome frame, androgynous, gender not readable, cold backlight, quiet epiphany, near-monochrome palette of snow white #F2F2EF, ink black #0B0C0D, tin gray #6E747A and fog gray #C9CDD0, with a single saturated red #B3121C accent only where specified; contre-jour backlight, long shadows, blown highlights, milky low-contrast midtones, clean blacks; heavy falling snow as film texture; extreme wide composition, 70-80% negative space, tiny human figure under 10% of frame height, centered or lower-third; shot on 35mm film, fine visible grain, subtle halation on bright edges; cold epic, quiet, still; no text, no logos, no watermark, no crowd, no visible face, no warm sunlight, no teal-orange grade, no lens flare, no bloom, 16:9
```

**Негатив:** `face, two hands, bare skin, jewelry, bright fire-engine red plastic, multiple red objects, text, warm sunset, blood, feminine manicure, hairy masculine arm`

**Параметры:** 16:9, 1920×1080.

**Отбор:** красный приглушённый, ближе к `#B3121C`, не алый; рука читается как рабочая и бесполая, без лица; снег на рукаве; фон размыт, но узнаваем как та же улица; других цветных пятен нет.

**Если красный слишком насыщенный:** в любом редакторе приглуши все каналы, кроме красного (HSL), или слегка desaturate всё изображение.

**Файл:** `posledniy-peshehod/src/assets/images/scene-5.jpg`, JPEG ≤ 500 КБ.

---

### Шаг 8. `scene-6.jpg` — снег ровный (I-06)

**Сервис:** Nano Banana; резерв — Kandinsky. Reference: `scene-1.jpg`.

**Промпт (целиком):**
```text
Extreme wide shot of a vast flat snowfield, a tiny figure lying on their back in the snow almost indistinguishable from the ground, androgynous, gender not readable, high horizon line, soft steady snowfall, no road, no buildings, no red, overwhelming white negative space, near-monochrome palette of snow white #F2F2EF, ink black #0B0C0D, tin gray #6E747A and fog gray #C9CDD0, with a single saturated red #B3121C accent only where specified; contre-jour backlight, long shadows, blown highlights, milky low-contrast midtones, clean blacks; heavy falling snow as film texture; extreme wide composition, 70-80% negative space, tiny human figure under 10% of frame height, centered or lower-third; shot on 35mm film, fine visible grain, subtle halation on bright edges; cold epic, quiet, still; no text, no logos, no watermark, no crowd, no visible face, no warm sunlight, no teal-orange grade, no lens flare, no bloom, 16:9
```

**Негатив:** `visible body outline, red clothing, blood, buildings, trees, crowd, rescue, face, text, dramatic sky, sun`

**Параметры:** 16:9, 1920×1080.

**Отбор:** фигуру находишь не сразу (2–4 секунды); красного нет; нет «открыточной» красоты; снег ровный, без вихрей; кадр может быть почти пустым — это норма.

**Файл:** `posledniy-peshehod/src/assets/images/scene-6.jpg`, JPEG ≤ 500 КБ.

---

### Шаг 9. `char-miro.png` — Миро (портрет)

**Важно:** герой — **Миро**, бесполый персонаж (пол не указан и не подразумевается). Файл называем `char-miro.png`; именно это имя прописано в `characters.ts`.

**Сервис:** Nano Banana, image-to-image от `scene-1.jpg`. Если сервис не принимает reference — тот же seed и тот же суффикс, но тогда проверь совпадение силуэта особенно внимательно.

**Промпт (целиком, портретный суффикс):**
```text
Full-body silhouette of an androgynous figure seen from behind, gender not readable, heavy dark work coat with the hood up, loose coat hiding body shape, worn boots, gloved hands, standing still in falling snow, a thin rim of cold light along the contour, featureless fog-gray background, near-monochrome palette of snow white #F2F2EF, ink black #0B0C0D, tin gray #6E747A and fog gray #C9CDD0, with no red; contre-jour backlight, long shadows, blown highlights, milky low-contrast midtones, clean blacks; heavy falling snow as film texture; centered composition, 60-70% empty fog-gray background, figure occupies 40-60% of frame height; shot on 35mm film, fine visible grain, subtle halation on bright edges; cold epic, quiet, still; no text, no logos, no watermark, no visible face, no warm sunlight, no teal-orange grade, no lens flare, no bloom, 3:4 portrait
```

**Негатив:** `face, profile, eyes, skin, beard, feminine curves, gendered body, brand logos, reflective vest colors, red, bright yellow, cartoon, detailed background, action pose`

**Параметры:** 3:4, 1200×1600, PNG, непрозрачный фон.

**Отбор:** лицо не читается даже в профиль; капюшон и воротник дают характер без мимики; силуэт узнаваем в 100 px; пол не читается; красного нет.

**Файл:** `posledniy-peshehod/src/assets/images/char-miro.png`, PNG ≤ 800 КБ.

---

### Шаг 10. `char-radio.png` — Голос радио

**Сервис:** Nano Banana; резерв — FLUX. Reference: `scene-1.jpg` (или `scene-2.jpg`, если он уже готов и совпадает по стилю).

**Промпт (целиком, портретный суффикс):**
```text
Close-up of an old analog radio receiver in a dark room, frosted metal casing, a single glowing dial casting pale light, a thin luminous waveform suspended in the air above the speaker like a breath, no hands, no room details, featureless fog-gray background, near-monochrome palette of snow white #F2F2EF, ink black #0B0C0D, tin gray #6E747A and fog gray #C9CDD0, with no red; contre-jour backlight, long shadows, blown highlights, milky low-contrast midtones, clean blacks; heavy falling snow as film texture; centered composition, 60-70% empty fog-gray background, object occupies 50-60% of frame height; shot on 35mm film, fine visible grain, subtle halation on bright edges; cold epic, quiet, still; no text, no logos, no watermark, no visible face, no warm sunlight, no teal-orange grade, no lens flare, no bloom, 3:4 portrait
```

**Негатив:** `person, hands, face, modern bluetooth speaker, digital display with numbers, brand name, text, red light, warm orange glow, cable clutter`

**Параметры:** 3:4, 1200×1600, PNG, непрозрачный фон.

**Отбор:** «волна» читается как голос, а не эквалайзер; шкала светится холодно-белым; ни одной буквы или цифры; предмет старый и тяжёлый.

**Файл:** `posledniy-peshehod/src/assets/images/char-radio.png`, PNG ≤ 800 КБ.

---

### Шаг 11. `char-dog.png` — Пёс

**Сервис:** Nano Banana, image-to-image от `scene-4.jpg`, чтобы силуэт совпал с видео и сценой 4.

**Промпт (целиком, портретный суффикс):**
```text
Dark silhouette of a large old dog seen from the side, sitting still in deep snow, thick short coat, a worn collar with a single small metal tag, head slightly lowered, no visible eyes or face details, featureless fog-gray background, near-monochrome palette of snow white #F2F2EF, ink black #0B0C0D, tin gray #6E747A and fog gray #C9CDD0, with no red; contre-jour backlight, long shadows, blown highlights, milky low-contrast midtones, clean blacks; heavy falling snow as film texture; centered composition, 60-70% empty fog-gray background, dog occupies 40-60% of frame height, chest-up; shot on 35mm film, fine visible grain, subtle halation on bright edges; cold epic, quiet, still; no text, no logos, no watermark, no visible face, no warm sunlight, no teal-orange grade, no lens flare, no bloom, 3:4 portrait
```

**Негатив:** `cute puppy, cartoon, open mouth, barking, tongue, bright eyes, breed-specific show pose, leash in hand, person, red collar, text`

**Параметры:** 3:4, 1200×1600, PNG, непрозрачный фон.

**Отбор:** порода не определяется однозначно; ошейник с жетоном виден, но жетон без надписей; поза спокойная; тот же силуэт, что в `scene-4.jpg`.

**Файл:** `posledniy-peshehod/src/assets/images/char-dog.png`, PNG ≤ 800 КБ.

---

### Шаг 12. `cue-step.mp3` и `cue-radio.mp3` (SFX)

**Сервис:** ElevenLabs Sound Effects (free tier) → Freesound (только CC0). Эти файлы уже referenced в `scenes.ts`, поэтому их лучше сделать, но обязательный минимум для 12 баллов — это `theme.mp3`.

**`cue-step.mp3` — второй шаг (финал A). Промпт:**
```text
single heavy boot step in deep dry snow, close and dry, one step only, no reverb tail, followed by 1.5 seconds of near silence
```
Параметры: 2–4 с, моно, 48 кГц, −12 dBFS, без щелчков. Отбор: не хруст ветки; слышно вес; шаг «чужой», не совпадает по тембру с шагами из видео.

**`cue-radio.mp3` — обрыв и помехи. Промпт:**
```text
old analog radio interference, short burst of static and heterodyne whistle, then abrupt cut to total silence, 3 seconds, no music, no voice
```
Параметры: 2–4 с, стерео, 48 кГц. Отбор: обрыв звучит как выключение, а не затухание; после — абсолютная тишина.

**Файлы:** `posledniy-peshehod/src/assets/audio/cue-step.mp3`, `posledniy-peshehod/src/assets/audio/cue-radio.mp3`, ≤ 300 КБ каждый.

**Сжатие:**
```bash
ffmpeg -i raw.wav -ar 48000 -ac 2 -b:a 128k cue-radio.mp3
```

---

### Шаг 13. Опционально: голос радио и дополнительные SFX

**Голос радио (TTS).** Сервис: ElevenLabs → Silero TTS локально. Текст:
```text
Завтра — снег. Вы говорили это вчера.
Кто ходит? Прогноз: снег, ветер, видимость нулевая. Вы ходите.
```
Настройки ElevenLabs: `calm male Russian radio announcer, flat affect, slight synthetic texture, slow pace, dry close recording, no emotion`. Паузы 0,6–0,8 с, без эмоциональных подъёмов, суммарно 6–10 с.
**Файл:** `posledniy-peshehod/src/assets/audio/radio-lines.mp3`. В текущем коде отдельного слота под голос нет — попроси интегратора добавить `audioCue` или объединить с `cue-radio.mp3`. Это не блокирует 12 баллов.

**Дополнительные SFX (по желанию):**
- `cue-tag.mp3` — звон жетона на ошейнике, 2 с, тихо, −24 dB.
- `cue-wind.mp3` — порыв ветра для снежного перехода, 3–4 с, бесшовный вход/выход.
- `cue-creak.mp3` — далёкий металлический скрип, 2–5 с.
Freesound: фильтр `CC0`, скачать WAV, обрезать, сжать в MP3.

---

## 5. Точная структура папок и имён

```text
posledniy-peshehod/src/assets/
├── images/
│   ├── scene-1.jpg
│   ├── scene-2.jpg
│   ├── scene-3.jpg
│   ├── scene-4.jpg
│   ├── scene-5.jpg
│   ├── scene-6.jpg
│   ├── char-miro.png
│   ├── char-radio.png
│   └── char-dog.png
├── video/
│   └── scene-4.mp4
└── audio/
    ├── theme.mp3
    ├── cue-radio.mp3
    ├── cue-step.mp3
    └── radio-lines.mp3        # опционально, если успел
```

Важно:
- Файлы лежат **только в корне** этих папок. `src/assets/media.ts` ищет по маскам `./images/*`, `./audio/*`, `./video/*`; вложенная папка `images/finals/scene-1.jpg` не найдётся.
- `scene-4.jpg` переиспользуется в сценах 4, 5 и на развилке — не удаляй и не переименовывай.
- `char-miro.png` — канон; это имя уже прописано в `src/data/characters.ts`.
- `docs/production/` — это только промпты, логи и отчёты. Финальные медиа — в `posledniy-peshehod/src/assets/...`.

---

## 6. Сжатие и форматы

| Тип | Формат | Размер | Лимит | Быстрая команда |
|---|---|---|---|---|
| Иллюстрации | JPEG, 16:9 | 1920×1080 | ≤ 500 КБ | `sips -Z 1920 -s format jpeg -s formatOptions 65 in.png --out scene-1.jpg` |
| Портреты | PNG, 3:4 | 1200×1600 | ≤ 800 КБ | Squoosh / `pngquant`; фон непрозрачный |
| Видео | H.264 MP4, 16:9 | 1280×720 или 1920×1080 | ≤ 8 МБ (лучше 3–5) | `ffmpeg -i in.mp4 -vf "scale=-2:720" -c:v libx264 -crf 24 -an -movflags +faststart scene-4.mp4` |
| Музыка | MP3 320 / WAV | 30–40 с, 48 кГц, stereo | ≤ 2–3 МБ | `ffmpeg -i in.wav -ar 48000 -ac 2 -b:a 192k theme.mp3` |
| SFX | MP3/WAV | 2–4 с | ≤ 300 КБ | `ffmpeg -i in.wav -ar 48000 -ac 2 -b:a 128k cue-radio.mp3` |

Проверка веса:
```bash
ls -lh posledniy-peshehod/src/assets/images posledniy-peshehod/src/assets/video posledniy-peshehod/src/assets/audio
```

---

## 7. Чек-лист «перед сдачей»

### Обязательные ассеты
- [ ] `scene-1.jpg` … `scene-6.jpg` — все 6, JPEG, 16:9, каждая ≤ 500 КБ.
- [ ] `scene-4.mp4` — 10–20 с (цель 12–15), 16:9, H.264, без звука, ≤ 8 МБ, постер — `scene-4.jpg`.
- [ ] `theme.mp3` — 20–40 с (цель 30–40), бесшовная петля, ≤ 2–3 МБ.
- [ ] `cue-radio.mp3`, `cue-step.mp3` — 2–4 с, ≤ 300 КБ (желательно, не блокирует минимум).
- [ ] `char-miro.png`, `char-radio.png`, `char-dog.png` — PNG 3:4, ≤ 800 КБ, если успел.

### Качество
- [ ] Нет текста, логотипов, водяных знаков, псевдобукв.
- [ ] Нет читаемых лиц; Миро бесполый, пол не читается.
- [ ] Красный есть только в `scene-5.jpg`; в остальных кадрах его нет.
- [ ] Свет, горизонт и зерно совпадают со `scene-1.jpg`.
- [ ] Имена файлов точные, без `final`, `copy`, `(1)`.
- [ ] Нет вложенных папок внутри `assets/images|video|audio`.
- [ ] В `economics-log.csv` есть строка на каждый ассет.

### Проверка в браузере
```bash
cd posledniy-peshehod
npm install
npm run dev
```
Открой адрес из вывода Vite и проверь:
- [ ] Пролог и сцена 1: фон `scene-1.jpg`, снег идёт, кнопка «Дальше» работает.
- [ ] Сцена 2: `scene-2.jpg`, звук `cue-radio.mp3` после клика.
- [ ] Сцена 3: `scene-3.jpg`, дневник и текст читаются.
- [ ] Сцена 4: `scene-4.jpg` как постер, затем `scene-4.mp4` автоплеится muted, без звука, без чёрного экрана.
- [ ] Сцена 5 и развилка: `scene-4.jpg`, две кнопки выбора.
- [ ] Финал A: `scene-5.jpg` + `cue-step.mp3`.
- [ ] Финал B: `scene-6.jpg` + `cue-radio.mp3`.
- [ ] `theme.mp3` стартует после «Войти в метель», mute/unmute работает.
- [ ] В консоли браузера нет 404 по `scene-*`, `char-*`, `theme`, `cue-*`.
- [ ] На ширине 360 px ничего не разъезжается.
- [ ] `npm run build && npm run preview` — прод-сборка открывается, ассеты на месте.

### Документы
- [ ] `docs/production/economics-log.csv` заполнен.
- [ ] `docs/production/ai-declaration.md` обновлён: сервисы, модели, даты.
- [ ] В отчёте указаны реальные бесплатные лимиты и случаи отказа.
- [ ] Платных списаний нет, кроме LLM.

---

## 8. Что писать в `economics-log.csv`

Колонки (разделитель `;`):

```text
этап;задача;сервис;модель/инструмент;дата;число_генераций;число_попыток_до_годного;кредиты;стоимость_руб;время_генерации_мин;время_отбора_мин;время_доработки_мин;время_монтажа_мин;итого_время_мин;результат_файл;комментарий
```

Правила:
- Одна строка — один ассет (минимум). Если хочешь показать отбор для бонуса — добавляй отдельные строки на отклонённые попытки и пиши причину в `комментарий`.
- `стоимость_руб` для бесплатных сервисов — `0`, не выдумывай расходы.
- `кредиты` пиши, даже если они бесплатные; если сервис не показывает кредиты — ставь `—`.
- В `комментарий` фиксируй seed, reference, причину отказа, watermark, лицензию.
- `итого_время_мин` = генерация + отбор + доработка + монтаж.

**Пример заполнения (цифры условные, заменить своими):**
```text
иллюстрация;scene-1 «Утро. Свежий след» — style anchor;Nano Banana (Google AI Studio);Gemini 2.5 Flash Image;13.11.2026;6;3;10;0;2;6;4;0;12;scene-1.jpg;ПРИМЕР ЗАПОЛНЕНИЯ — seed 123456, reference нет, 3 отказа: лица вдалеке
```

**Пример строки для видео:**
```text
видео;scene-4.mp4 — низкий проезд по следу 12–15 с;Hailuo MiniMax;image-to-video;13.11.2026;4;2;40;0;6;8;5;10;29;scene-4.mp4;ПРИМЕР ЗАПОЛНЕНИЯ — reference scene-4.jpg, 2 отказа: морфинг ног
```

**Пример строки для музыки:**
```text
музыка;theme.mp3 — холодный эмбиент 30–40 с;Stable Audio;free tier;13.11.2026;3;1;—;0;3;5;8;0;16;theme.mp3;ПРИМЕР ЗАПОЛНЕНИЯ — обрезано до 36 с, кроссфейд 1 с
```

---

## 9. Если время совсем горит

Минимальный путь к 12 баллам за ~3 часа:

1. `scene-1.jpg` — 25 мин.
2. `scene-4.jpg` — 20 мин.
3. `scene-4.mp4` — 40 мин или fallback из постера — 15 мин.
4. `theme.mp3` — 30 мин.
5. `scene-2.jpg`, `scene-3.jpg`, `scene-5.jpg`, `scene-6.jpg` — по 15–20 мин.
6. Сжатие и проверка — 30 мин.

Портреты и SFX — только если осталось время. Портреты без файлов не ломают сайт: компонент покажет силуэт-заглушку. Видео без файла тоже не ломает сайт, но для 12 баллов видео нужно — поэтому fallback из `scene-4.jpg` обязателен, если AI-видео не получилось.
