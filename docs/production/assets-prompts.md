# «Последний пешеход» — промпты на ассеты

> Плановый документ (prompt bible). Фактический стек и результаты — в `docs/report/main.pdf`, `ai-declaration.md`, `economics-log.csv`.

Рабочий документ для генерации всех медиа на бесплатных триалах. Один ассет = один блок: назначение → сервис → промпт (EN) → пояснение (RU) → негатив → параметры → критерии отбора.

**Стек сервисов (бесплатные варианты):**
- Изображения: **Nano Banana** (Gemini 2.5 Flash Image, free tier) — основной; **Kandinsky 3.1** (RU-интерфейс, бесплатно) и **FLUX.1 schnell** (Hugging Face Space) — резерв. Для image-to-image и консистентности лучше Nano Banana (принимает референс-картинку).
- Видео: **Hailuo MiniMax** (free credits, image-to-video) — основной; **Kling AI** (daily credits) и **Runway** (trial) — резерв.
- Аудио: **Stable Audio / Mubert** (музыка, free tier) — основной; **ElevenLabs** (SFX + TTS, free tier) — голос и шумы; **Silero TTS** (локально, бесплатно) — резервный голос радио. Сборка и мастеринг — **Audacity** (бесплатно).

---

## 0. Единый style suffix

Добавлять **в конец каждого** промпта на изображение (для видео — в упрощённом виде). Это ядро визуальной консистентности: палитра, свет, композиция, зерно.

```text
near-monochrome palette of snow white #F2F2EF, ink black #0B0C0D, tin gray #6E747A and fog gray #C9CDD0, with a single saturated red #B3121C accent only where specified; contre-jour backlight, long shadows, blown highlights, milky low-contrast midtones, clean blacks; heavy falling snow as film texture; extreme wide composition, 70-80% negative space, tiny human figure under 10% of frame height, centered or lower-third; shot on 35mm film, fine visible grain, subtle halation on bright edges; cold epic, quiet, still; no text, no logos, no watermark, no crowd, no visible face, no warm sunlight, no teal-orange grade, no lens flare, no bloom, 16:9
```

**Пояснение.** Почти монохром: белый снег, чёрные силуэты, оловянно-серые средние тона, туманно-серый воздух. Красный — только перчатка и ничего больше. Свет контровой: фигура тёмная на светлом поле, длинные тени, пересветы. Композиция широкая и пустая: 70–80% кадра — снег и воздух, человек занимает меньше 10% высоты. Плёнка 35 мм, заметное зерно, лёгкое гало на ярких краях, без блума и бликов. Никакого текста: вся типографика — HTML/CSS поверх изображения.

**Почему без лиц.** Лицо в широком кадре невозможно удержать консистентным между генерациями и оно навязывает эмоцию, которую история должна оставлять зрителю. Силуэт со спины надёжнее технически и точнее по смыслу: Миро — функция поиска, а не характер. Крупные планы разрешены только для перчатки, руки и дневника.

**Общие правила.** Генерировать `scene-1.jpg` первым как style anchor; дальше прикладывать его как reference image (Nano Banana / Kling) или использовать один и тот же seed. Все изображения — 1920×1080, JPEG ≤ 500 КБ после экспорта (WebP/AVIF дополнительно для сайта). Один красный объект на кадр. Все попытки сохранять и логировать.

---

## 1. Иллюстрации

### scene-1.jpg — «Утро. Свежий след» (I-01, style anchor)

- **Назначение:** сцена 1, фон первого экрана; одновременно эталон стиля для остальных кадров.
- **Сервис:** Nano Banana (основной), Kandinsky 3.1 (резерв).
- **Промпт (EN):**
```text
Extreme wide shot of an empty snowbound city street at dawn, one lone apartment doorway on the left, a single fresh line of footprints starting at that doorstep and running straight into white distance, a tiny figure in a heavy dark work coat standing with their back turned, shovel in hand, no other people, [STYLE SUFFIX]
```
- **Пояснение (RU):** Пустая заснеженная улица на рассвете. Слева одинокий подъезд; от его порога в белую даль уходит одна свежая цепочка следов. Крошечная фигура в тяжёлом тёмном пальто стоит спиной, с лопатой. Больше никого.
- **Негатив:** `face, portrait, crowd, cars, traffic lights, colorful signs, warm window light, multiple red objects, text, watermark, fisheye, aerial top-down, cartoon`
- **Параметры:** 16:9, 1920×1080, без текста.
- **Критерии отбора:** след читается как одна непрерывная линия от двери; фигура < 10% высоты; горизонт высокий или отсутствует; красного нет вообще; снег выглядит зерном, а не «эффектом частиц»; тени длинные и направлены одинаково.

### scene-2.jpg — «Допрос радио» (I-02)

- **Назначение:** сцена 2, интерьер кабины снегоуборщика.
- **Сервис:** Nano Banana; резерв — FLUX.1 schnell.
- **Промпт (EN):**
```text
Interior of an old snowplow cab at dawn, frost blooming on the windshield from inside, a glowing analog radio on the dashboard with a thin luminous dial, faint waveform-like reflection on the frosted glass, empty driver seat, worn metal and rubber, cold light through the ice, claustrophobic framing, [STYLE SUFFIX]
```
- **Пояснение (RU):** Старая кабина снегоуборщика. Иней на лобовом стекле изнутри, тёпло-бледная шкала аналогового радио, тонкое отражение-волна на стекле, пустое водительское место. Свет холодный, сквозь лёд.
- **Негатив:** `driver, human figure, face, hands on wheel, text on radio dial, brand logo, warm orange interior, saturated colors, clean new car, reflections of a person`
- **Параметры:** 16:9, 1920×1080.
- **Критерии отбора:** шкала радио — единственный источник «тепла», но не красная; лицо или силуэт водителя не читаются; теснота кадра при этом не превращается в хоррор; иней выглядит реальным.

### scene-3.jpg — «Дневник» (I-03)

- **Назначение:** сцена 3, крупный план дневника; основа для dissolve-эффекта текста.
- **Сервис:** Nano Banana; резерв — Kandinsky.
- **Промпт (EN):**
```text
Close-up of an open paper diary on a cold wooden table, yesterday's entry densely crossed out with dark ink, the paper almost worn through, fine snow dust on the page, the edge of a heavy dark work glove at the bottom of frame, shallow depth of field, cold side light, [STYLE SUFFIX]
```
- **Пояснение (RU):** Открытый бумажный дневник на холодном дереве. Вчерашняя строка густо перечёркнута, бумага протёрта почти до дыры. На странице — снежная пыль. У нижнего края кадра — край тяжёлой рабочей перчатки (не красной).
- **Негатив:** `readable text, letters, latin script, cyrillic, handwriting, coffee cup, warm lamp, red pen, multiple hands, face, clean new notebook, high saturation`
- **Параметры:** 16:9, 1920×1080; допустим кроп 3:2.
- **Критерии отбора:** перечёркивание читается как жест, а не как текстура; нет ни одной разборчивой буквы (иначе генератор выдаст псевдотекст); снежная пыль на бумаге; глубина резкости малая, фон мягкий.
- **Примечание:** поверх изображения на сайте кладётся HTML-текст записи; в кадре текста быть не должно.

### scene-4.jpg — «След возвращается» (I-04; постер для видео)

- **Назначение:** сцена 4 и сцена 5 (развилка); постер-кадр для `scene-4.mp4`.
- **Сервис:** Nano Banana; для видео — референс в Hailuo/Kling.
- **Промпт (EN):**
```text
Wide shot of the same snowbound empty street, a single line of footprints looping in a wide circle and returning to the same lone door, the door acting as the vanishing point, a tiny figure with their back turned and a dark dog beside them in the far distance, [STYLE SUFFIX]
```
- **Пояснение (RU):** Та же улица. Цепочка следов описывает широкий круг и возвращается к той же двери; дверь — точка схода. Вдали крошечная фигура спиной и тёмный пёс рядом.
- **Негатив:** `two doors, crossroads, multiple tracks, crowd, cars, visible face, red objects, text, symmetric perfect circle, map-like top view`
- **Параметры:** 16:9, 1920×1080.
- **Критерии отбора:** петля читается без схемы и стрелок; дверь визуально «затягивает»; фигура и пёс — два тёмных пятна, не более; стиль совпадает со scene-1 (та же улица, тот же свет).

### scene-5.jpg — «Есть кто-то» (I-05, финал A)

- **Назначение:** финальный экран A; единственный кадр с красным акцентом.
- **Сервис:** Nano Banana; резерв — FLUX (там красный держится стабильнее).
- **Промпт (EN):**
```text
Close-up of a red work glove on an androgynous figure's own hand, worn red canvas with darker seams, snow melting on the heavy dark sleeve, blurred snowbound street behind, the red glove is the only color in an otherwise near-monochrome frame, cold backlight, quiet epiphany, [STYLE SUFFIX]
```
- **Пояснение (RU):** Красная рабочая перчатка на собственной руке Миро. Потёртый красный брезент, тёмные швы, тающий снег на тяжёлом рукаве, размытая заснеженная улица позади. Красный — единственный цвет кадра.
- **Негатив:** `face, two hands, bare skin, jewelry, bright fire-engine red plastic, multiple red objects, text, warm sunset, blood`
- **Параметры:** 16:9, 1920×1080.
- **Критерии отбора:** красный приглушённый, ближе к #B3121C, а не алый; рука читается как рабочая, без гендерных признаков и без лица; снег на рукаве; фон размыт, но узнаваем как та же улица; нет других цветных пятен.
- **Цветокоррекция:** при избыточной насыщенности — desaturate всех каналов, кроме красного (HSL в любом редакторе).

### scene-6.jpg — «Снег ровный» (I-06, финал B)

- **Назначение:** финальный экран B; кадр, в который «заметает» весь сайт.
- **Сервис:** Nano Banana; резерв — Kandinsky.
- **Промпт (EN):**
```text
Extreme wide shot of a vast flat snowfield, a tiny figure lying on their back in the snow almost indistinguishable from the ground, high horizon line, soft steady snowfall, no road, no buildings, no red, overwhelming white negative space, [STYLE SUFFIX]
```
- **Пояснение (RU):** Огромное ровное снежное поле. Крошечная фигура лежит на спине и почти неотличима от земли. Высокий горизонт, ровный снегопад, ни дороги, ни домов, ни красного. Белый цвет подавляет кадр.
- **Негатив:** `visible body outline, red clothing, blood, buildings, trees, crowd, rescue, face, text, dramatic sky, sun`
- **Параметры:** 16:9, 1920×1080.
- **Критерии отбора:** фигуру находишь не сразу (2–4 секунды); нет красного; нет «открыточной» красоты; снег ровный, без вихрей; кадр может быть почти пустым — это норма.

---

## 2. Портреты и силуэты персонажей

**Приём консистентности (обязателен для всех трёх):**
1. Всегда **силуэт или вид со спины**, лицо не показывается. Портрет — это не character sheet, а «карточка присутствия».
2. Один и тот же **seed** и один и тот же reference image (`scene-1.jpg`) во всех трёх генерациях.
3. Один фон: туманно-серое поле `#C9CDD0` → `#F2F2EF`, без деталей.
4. Один свет: контровой, фигура почти чёрная, тонкая светлая кромка по контуру.
5. Формат 3:4, 1200×1600, PNG; фон непрозрачный — зерно и воздух важнее альфа-канала, а силуэт на сайте можно вписать через blend-mode.
6. Масштаб фигуры разный по смыслу: Миро — в полный рост мелко, Радио — предмет крупно, Пёс — по грудь.

### char-miro.png — Миро

- **Назначение:** карточка персонажа, экран «кто здесь», возможный hover-портрет.
- **Сервис:** Nano Banana (image-to-image от `scene-1.jpg`).
- **Промпт (EN):**
```text
Full-body silhouette of an androgynous figure seen from behind, gender not readable, heavy dark work coat with the hood up, shoulders squared against the cold, worn boots, gloved hands, standing still in falling snow, a thin rim of cold light along the contour, featureless fog-gray background, [STYLE SUFFIX]
```
- **Пояснение (RU):** Силуэт в полный рост со спины; пол не читается. Тяжёлое тёмное пальто с капюшоном, плечи держат холод, стоптанные ботинки, перчатки. Стоит неподвижно в снегопаде; по контуру — тонкая светлая кромка. Фон — ровный туманно-серый.
- **Негатив:** `face, profile, eyes, skin, gender cues, feminine silhouette, masculine silhouette, brand logos, reflective vest colors, red, bright yellow, cartoon, detailed background, action pose`
- **Параметры:** 3:4, 1200×1600, PNG.
- **Критерии:** лицо не читается даже в профиль; пол не считывается ни по силуэту, ни по деталям одежды; капюшон и воротник дают характер без мимики; силуэт узнаваем в 100 px; красного нет.

### char-radio.png — Голос радио

- **Назначение:** карточка «свидетеля»; визуальная метафора голоса.
- **Сервис:** Nano Banana; резерв — FLUX.
- **Промпт (EN):**
```text
Close-up of an old analog radio receiver in a dark room, frosted metal casing, a single glowing dial casting pale light, a thin luminous waveform suspended in the air above the speaker like a breath, no hands, no room details, featureless fog-gray background, [STYLE SUFFIX]
```
- **Пояснение (RU):** Крупный план старого аналогового приёмника в тёмной комнате. Заиндевелый металлический корпус, единственная светящаяся шкала, тонкая светящаяся волна висит над динамиком, как дыхание. Ни рук, ни деталей комнаты.
- **Негатив:** `person, hands, face, modern bluetooth speaker, digital display with numbers, brand name, text, red light, warm orange glow, cable clutter`
- **Параметры:** 3:4, 1200×1600, PNG.
- **Критерии:** «волна» читается как голос, а не как эквалайзер; шкала светится холодно-белым; нет ни одной буквы или цифры; предмет выглядит старым и тяжёлым.

### char-dog.png — Пёс

- **Назначение:** карточка «того, кто помнит».
- **Сервис:** Nano Banana (image-to-image от `scene-4.jpg`).
- **Промпт (EN):**
```text
Dark silhouette of a large old dog seen from the side, sitting still in deep snow, thick short coat, a worn collar with a single small metal tag, head slightly lowered, no visible eyes or face details, featureless fog-gray background, [STYLE SUFFIX]
```
- **Пояснение (RU):** Тёмный силуэт крупной старой собаки сбоку. Сидит неподвижно в глубоком снегу, густая короткая шерсть, потёртый ошейник с одним металлическим жетоном, голова чуть опущена. Глаз и деталей морды не видно.
- **Негатив:** `cute puppy, cartoon, open mouth, barking, tongue, bright eyes, breed-specific show pose, leash in hand, person, red collar, text`
- **Параметры:** 3:4, 1200×1600, PNG.
- **Критерии:** порода не определяется однозначно; ошейник с жетоном виден, но жетон без надписей; поза спокойная, без действия; тот же силуэт, что в scene-4.

---

## 3. Видео

### scene-4.mp4 — «Метель заметает след» (V-01)

- **Назначение:** сцена 4; 12–15 с, без склеек, автоплей без звука, постер — `scene-4.jpg`.
- **Сервис:** Hailuo MiniMax (image-to-video, основной); Kling (резерв, daily credits); Runway trial (аварийный).
- **Промпт (EN, image-to-video от scene-4.jpg):**
```text
Slow low tracking shot moving forward along a single line of footprints in deep snow, heavy snowfall drifting across the frame, a tiny figure in a dark coat walking ahead with their back turned, a dark dog beside them, camera stays at knee height, steady glide, no cuts, no camera shake, footprints gradually disappearing under fresh snow behind the camera, near-monochrome snow white and ink black and tin gray, 35mm film grain, cold epic, 12 seconds
```
- **Пояснение (RU):** Медленный низкий проезд камеры вперёд вдоль цепочки следов в глубоком снегу. Сильная метель несёт снег поперёк кадра. Впереди крошечная фигура в тёмном пальто спиной, рядом тёмный пёс. Камера на высоте колена, плавно, без склеек и тряски; позади камеры следы постепенно исчезают под свежим снегом. Почти монохром, зерно 35 мм.
- **Негатив (если сервис принимает):** `face, turning around, running, crowd, cars, camera cut, zoom, speed ramp, morphing limbs, extra legs, red objects, text, watermark`
- **Параметры:** 16:9, 1920×1080 (или 1280×720 с апскейлом), 12–15 с, 24 fps, H.264 MP4 ≤ 8 МБ, без аудиодорожки или с тишиной.
- **Критерии отбора:** нет морфинга ног и собаки; камера не «плывёт» вбок; снегопад непрерывен; фигура не разворачивается; след остаётся одной линией; последний кадр пригоден как стоп-кадр на дверь.
- **Запасной вариант (если артефакты):** взять `scene-4.jpg`, собрать в редакторе медленный push-in/pan (102–108% масштаб, линейный easing, 12 с), наложить снежный слой и зерно. Это официально допустимая замена по брифу (reduced motion / slow connection).

---

## 4. Аудио

### theme.mp3 — основной эмбиент (A-01)

- **Назначение:** единая звуковая подложка на все сцены, 30–40 с, бесшовная петля; слои микшируются на сайте.
- **Сервис:** Stable Audio (free tier) или Mubert (free tier); резерв — сборка из SFX в Audacity (ниже).
- **Промпт (EN):**
```text
30-40 second loopable cold ambient score for an existential winter film, low cello and contrabass drone, wide wind, distant metal creaks, faint radio static, slow sub pulse entering midway, sparse prepared piano hit, no melody lead, no vocals, no drums, no percussion, bleak, spacious, cinematic, slow, seamless loop
```
- **Пояснение (RU):** Холодный эмбиент на 30–40 секунд без вокала и ведущей мелодии. Низкий виолончельный/контрабасовый дрон, широкий ветер, далёкие металлические скрипы, слабые радиопомехи. Ближе к середине входит медленный суб-пульс, редкий удар подготовленного фортепиано. Мрачно, просторно, медленно, бесшовная петля.
- **Негатив:** `vocals, choir, beat, drums, EDM, melody hook, major key, bright bells, orchestral swell, trailer braams`
- **Параметры:** 30–40 с, 48 кГц, стерео, WAV/MP3 320; петля без щелчка; пик ≤ −1 dBFS; интегральная громкость −16 LUFS (по брифу), true peak ≤ −1 dBTP.
- **Критерии отбора:** нет запоминающегося мотива; ветер не «синтетический свист»; суб-пульс ощущается, но не превращается в бит; стык петли не слышен; на малой громкости трек не исчезает.

**Сборка в Audacity (если генератор не даёт петлю):**
1. Дорожка 1 — ветер: шумовой генератор / запись ветра, high-pass 120 Гц, медленная LFO-амплитуда (±2 дБ, 0,1 Гц).
2. Дорожка 2 — дрон: синус/пила 55 Гц + 82,5 Гц, low-pass 300 Гц, лёгкий chorus.
3. Дорожка 3 — суб-пульс: синус 40 Гц, удары каждые 4 с, fade in 10 с, fade out 8 с.
4. Дорожка 4 — металл: редкие скрипы (SFX), реверберация 2,5 с, −24 dB.
5. Дорожка 5 — радиопомехи: узкополосный шум, амплитудная модуляция, −28 dB.
6. Мастер: limiter −1 dBTP, нормализация к −16 LUFS, экспорт MP3 320 + OGG.

**Требования к луффу:** −16 LUFS integrated, true peak ≤ −1 dBTP; при миксе с голосом радио музыка приседает на 6–8 дБ (ducking), переходы между сценами — кроссфейд 1,5 с.

### Голос радио (TTS)

- **Сервис:** ElevenLabs (free tier) — основной; Silero TTS (локально) — резерв.
- **Текст для озвучки:**
```text
Завтра — снег. Вы говорили это вчера.
Кто ходит? Прогноз: снег, ветер, видимость нулевая. Вы ходите.
```
- **Промпт/настройки:** мужской ровный дикторский голос, нейтральная интонация, лёгкая синтетичность приветствуется; темп медленный, паузы 0,6–0,8 с; без эмоциональных подъёмов. EN-инструкция для ElevenLabs: `calm male Russian radio announcer, flat affect, slight synthetic texture, slow pace, dry close recording, no emotion`.
- **Критерии:** голос не «рекламный»; слышна лёгкая неестественность; слова разборчивы; длительность всех реплик вместе 6–10 с.

### cue-step.mp3 — второй шаг (финал A)

- **Сервис:** ElevenLabs SFX / Freesound (CC0).
- **Промпт (EN):** `single heavy boot step in deep dry snow, close and dry, one step only, no reverb tail, followed by 1.5 seconds of near silence`
- **Пояснение:** Один тяжёлый шаг в глубоком сухом снегу, близко, без длинного хвоста; после — полторы секунды почти тишины.
- **Параметры:** 2–4 с, моно, 48 кГц, −12 dBFS, без щелчков.
- **Критерии:** не похоже на хруст ветки; слышно вес; шаг не совпадает по тембру с шагами Миро из видео — шаг должен быть «чужим».

### cue-radio.mp3 — обрыв / помехи (финалы A и B)

- **Сервис:** ElevenLabs SFX; резерв — генерация шума в Audacity.
- **Промпт (EN):** `old analog radio interference, short burst of static and heterodyne whistle, then abrupt cut to total silence, 3 seconds, no music, no voice`
- **Пояснение:** Короткий всплеск помех и гетеродинного свиста старого радио, затем резкий обрыв в полную тишину.
- **Параметры:** 2–4 с, стерео, 48 кГц.
- **Критерии:** обрыв звучит как выключение, а не как затухание; тишина после — абсолютная (цифровой ноль или −60 dBFS).

### Опциональные SFX

- `cue-tag.mp3` — звон жетона на ошейнике пса (2 с, тихо, −24 dB).
- `cue-wind.mp3` — порыв ветра для снежного перехода между сценами (3–4 с, бесшовный вход/выход).
- `cue-creak.mp3` — далёкий металлический скрип (2–5 с).

---

## 5. Именование и приёмка файлов

| Файл | Тип | Формат | Ограничение |
|---|---|---|---|
| `scene-1.jpg` … `scene-6.jpg` | иллюстрации | JPEG 16:9 | ≤ 500 КБ каждый |
| `char-miro.png`, `char-radio.png`, `char-dog.png` | портреты | PNG 3:4 | ≤ 800 КБ каждый |
| `scene-4.mp4` | видео | H.264 MP4 16:9, 12–15 с | ≤ 8 МБ, без звука |
| `theme.mp3` | музыка | MP3 320 / OGG, 30–40 с | ≤ 2 МБ, −16 LUFS |
| `cue-step.mp3`, `cue-radio.mp3` | SFX | MP3/WAV, 2–4 с | ≤ 300 КБ |

**Чек-лист перед приёмкой каждого ассета:**
- [ ] Нет текста, логотипов, водяных знаков.
- [ ] Нет читаемого лица; в широких кадрах фигура < 10% высоты.
- [ ] Красный присутствует только там, где задан (scene-5, перчатка).
- [ ] Совпадают свет, горизонт и зерно со `scene-1.jpg`.
- [ ] Файл назван строго по таблице.
- [ ] В лог записаны сервис, seed/prompt ID, номер попытки, причина отказа.

**Связанные документы:** бриф — `docs/briefs/posledniy-peshehod.md`; сценарий — `docs/production/script.md`; лог генераций рекомендуется вести в `docs/assets/log.csv` по схеме из §13 брифа.
