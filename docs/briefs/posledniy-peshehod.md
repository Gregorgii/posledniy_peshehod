---
project: "posledniy-peshehod"
title: "Последний пешеход"
type: brief
exec_plan: docs/exec-plans/posledniy-peshehod.md
status: active
created: 2026-11-13
updated: 2026-11-13
course: "Культура ИИ: медиа и креативность (ИТМО)"
format: "interactive mini-site"
language: "ru"
---

# «Последний пешеход» — Product Brief

## 1. Story Passport

| Field | Value |
|---|---|
| **Title** | «Последний пешеход» / *The Last Pedestrian* |
| **Genre** | Cold psychological mystery / magical realism; interactive short story |
| **Audience (primary)** | Course instructors and jury evaluating the ITMO final project; peers who will play through the site once, 3–5 minutes, mostly desktop, sound possibly muted |
| **Audience (secondary)** | Online viewers 18–35 who like atmospheric interactive fiction, slow cinema, and uncanny short-form web experiences |
| **Logline (RU)** | Единственный, кто остался в засыпанном городе и чистит улицы, каждое утро находит на цельном снегу следы, ведущие из ниоткуда в никуда, и красную перчатку. Идёт поиск «последнего пешехода» — пока не приходит понимание, что следы собственные, а город каждое утро стирает память. |
| **Logline (EN)** | The last person clearing the streets of a buried city finds fresh tracks leading from nowhere to nowhere and a red glove in the untouched snow. The search for the “last pedestrian” continues — until the realization comes: the tracks are their own and the city erases their memory every morning. |
| **Theme** | Memory and identity. The search for another person is the search for oneself. Ritual — the daily investigation — is a way of avoiding the truth. Snow is forgetting; tracks are narrative; the glove is the only proof that someone was here. |
| **Place / time** | An unnamed snowbound city, third week of an unending blizzard. Present or near-future, deliberately unspecified. One street, one apartment, one snowplow, one radio. |
| **Core emotion** | Cold unease that turns into recognition and grief; an ambiguous, quiet consolation. “Cold epic.” |
| **Tone references** | Slow cinema, existential detective fiction, near-monochrome photography, minimalist interactive fiction. No direct adaptation of any existing work. |

### Characters

| Character | Role in the story | Visual / audio signature |
|---|---|---|
| **Миро** (genderless character; sex is not specified or implied) | Detective; unreliable narrator. Investigates, but forgets. | Tiny figure in a heavy work coat, almost always with their back turned or off-frame; breath, boots, the scrape of a shovel. |
| **Голос радио** | Witness. Repeats Миро’s own phrases back, as if it knew them first. | A frosted speaker, a thin waveform, words that sound like a weather forecast until one word changes. |
| **Пёс** | Silent companion. The only one who “remembers,” but cannot speak. | A dark silhouette at the edge of the frame; the same collar, the same age, never grows old. No barking. |

### Key events

1. The city is evacuated; the storm has not stopped for three weeks.
2. Миро clears streets and keeps a diary. The diary rewrites itself: yesterday’s lines are crossed out or replaced.
3. Every morning there is fresh snow, tracks starting at Миро’s threshold, and a glove on the railing.
4. Миро interrogates witnesses: the radio, the dog, a recording of their own voice saying things they do not remember.
5. Миро follows the tracks and arrives back at their own door.
6. Миро must decide who they are in this story: the one who searches, or the one who was erased.

### Project rationale

The course final requires a digital product that demonstrates narrative design, AI-assisted media production, and interactive web craft in one artifact. This concept is small enough to finish, atmospheric enough to be memorable, and structurally dependent on interactivity — the snow mechanic is the theme, not decoration.

---

## 2. Logline, Theme, Emotional Arc

### Logline

See §1. The story is a loop disguised as an investigation: each scene gives Миро a new clue that is actually a piece of their own erased routine.

### Theme

- **Forgetting is a city service.** The snow does not merely fall; it maintains the city by erasing evidence.
- **The detective is the suspect.** The search for “the last pedestrian” is a search for the self, conducted by someone who cannot retain the answer.
- **Proof vs. memory.** The glove is physical proof that someone exists; the diary is unreliable proof that someone remembers. The story asks which one you trust.
- **Ritual as avoidance.** Миро would rather investigate forever than accept that the tracks begin and end at their door.

### Emotional arc

| Beat | Emotion | What the viewer feels |
|---|---|---|
| Scene 1 | Unease | Something is wrong, but the routine feels normal. |
| Scene 2 | Curiosity | The radio knows too much; the forecast sounds like a confession. |
| Scene 3 | Dread | The diary is not a record; it is a cover-up. |
| Scene 4 | Recognition | The tracks loop back. The investigation has no outside. |
| Scene 5 | Suspension | Near-silence. The choice is not “which ending,” but “which self.” |
| Ending A | Ambiguous consolation | Someone is there — but the proof is on their own hand. |
| Ending B | Grief / acceptance | The snow becomes even. The search ends by surrender. |

---

## 3. Core Experience Use Cases

### UC-001 — First playthrough (Priority: P1)
**As a** first-time viewer, **I want** to move through six short scenes and reach one ending, **so that** I understand the twist and feel the intended cold, uncanny mood.

**Acceptance criteria:**
- Given the entry screen, when I press “Войти в метель,” then audio starts (or the site explicitly offers “Без звука”) and Scene 1 appears.
- Given any scene, when I press “Дальше,” then the snow wipe covers the previous frame and the next scene loads within 1.5 s on broadband.
- Given Scene 4, when I choose one of the two options, then the corresponding ending plays and the site offers replay.

### UC-002 — Replay and branch comparison (Priority: P1)
**As a** viewer who has finished once, **I want** to replay and pick the other ending, **so that** I can compare the two interpretations.

**Acceptance criteria:**
- Given the ending screen, when I press “Пройти заново,” then the site resets to the entry screen without a full page reload.
- Given the branch screen, when I pick the other option, then the other ending plays and is visually and audibly distinct.
- Given a completed playthrough, when I replay, then the diary in Scene 3 contains one additional crossed-out line referencing the previous ending (optional enhancement; see §5).

### UC-003 — Muted / mobile viewing (Priority: P2)
**As a** viewer on a phone with sound off, **I want** captions and a readable layout, **so that** the story still works without audio.

**Acceptance criteria:**
- Given a viewport of 360 px width, when I scroll through a scene, then the image, text, and buttons remain readable without horizontal scrolling.
- Given muted audio, when the radio speaks, then the line is also shown as text.
- Given `prefers-reduced-motion`, when I navigate, then the snow burst is replaced by a short crossfade and the video can be skipped.

### UC-004 — Jury evaluation (Priority: P1)
**As an** instructor or jury member, **I want** to verify that the deliverable meets the assignment, **so that** I can grade it without hunting through files.

**Acceptance criteria:**
- Given the repository, when I open the report, then I find the story passport, script, asset list, cost table, AI declaration, and the “Решения и ограничения” section.
- Given the deployed site, when I open it on a clean browser, then it works without a backend or login.

---

## 4. Scene Map

Six scenes, one branch, two endings. Total playtime: 3–5 minutes.

| # | Scene | Viewer sees | What happens | Asset | Character entrance | Interaction |
|---|---|---|---|---|---|---|
| 1 | **Утро. Свежий след** | Extreme wide shot: empty street at dawn, a single line of tracks from a lone doorway into white distance; tiny figure with a shovel | Миро steps out, sees the tracks, writes the first diary line | I-01 | Миро as a distant silhouette | “Дальше” |
| 2 | **Допрос радио** | Interior of the snowplow cab, frost, a glowing radio; waveform text across the windshield | The radio reads the forecast using Миро’s own phrases; one word is different | I-02 | Radio Voice (typographic waveform) | “Слушать” / “Дальше” |
| 3 | **Дневник** | Close-up of a notebook on a table, snow dust on the paper, yesterday’s entry crossed out | Миро tries to read yesterday’s line; the letters dissolve under their finger | I-03 | Пёс appears at the edge of the frame after 5 s | Hover/press to reveal; text dissolves |
| 4 | **След возвращается** | Wide shot: Миро follows the tracks through empty streets; the line loops back to their own door | The camera follows the tracks; the route ends where it began | I-04 + V-01 | Миро and Пёс, both small, back turned | Video plays; then branch |
| 5 | **Выбор** | The door, the tracks, the glove on the railing; UI appears over the image | Миро must decide what the loop means | Reuse I-04 | None new | Two choice buttons |
| 6A | **Финал A — «Есть кто-то»** | Close-up: a red glove on Миро’s own hand; snow on the sleeve; the street behind them | Миро walks on; the city briefly acknowledges them; a second footstep sounds | I-05 | Миро (hand/back), city as off-screen presence | Ending screen / replay |
| 6B | **Финал B — «Снег ровный»** | Extreme wide shot: a tiny figure lying in the snow, almost invisible; the frame fills with white | Миро lies down, understanding the search was for themself; snow covers the screen; the site goes quiet | I-06 | Миро, tiny, still | Ending screen / replay |

### Scene-by-scene intent

**Scene 1 — The hook.** The viewer must see two things clearly: the tracks are fresh, and they start at Миро’s door. Do not show a face. The diary line is the only text: “Третья неделя. Город пуст, но кто-то ходит.”

**Scene 2 — The witness.** The radio should feel like a person who has been waiting. Its first line repeats something Миро says in Scene 1, with one word changed: “Завтра — снег. Вы говорили это вчера.” The viewer should suspect the radio is either omniscient or a recording.

**Scene 3 — The unreliable record.** The diary is the clearest evidence of erasure. Yesterday’s entry is crossed out but still partially legible: “___ находит след. Он начинается у моей двери.” When the viewer tries to reveal it, the letters break into snow. The dog appears silently; it does not age, and it does not speak.

**Scene 4 — The loop.** The walk is the video: 12–15 seconds, low tracking shot following the footprints, no cuts, no face. The route passes familiar landmarks and returns to the same door. This is the branch point. All music drops to wind and breath before the choice.

**Scene 5 — The choice.** Two labels, exact:
- «Идти до конца — значит, кто-то есть»
- «Стереть следы — значит, остаться в одиночестве»

No timer. No “correct” answer. The UI should feel like a door, not a game menu.

**Scene 6A — Ending A.** The glove is on their own hand. The city “acknowledges” them only through sound: a second footstep, a radio fragment, a low warm chord that does not resolve. Text: “След был мой. Но шагов было два.”

**Scene 6B — Ending B.** Миро lies down. The camera does not move. Snow fills the frame over 6–8 seconds; the text fades last. Text: “Снег ровный.” Audio reduces to wind, then a single low note, then silence. The site offers “Встать” after 5 seconds.

---

## 5. Two Endings

| Dimension | Ending A — «Есть кто-то» | Ending B — «Снег ровный» |
|---|---|---|
| **Choice label** | «Идти до конца — значит, кто-то есть» | «Стереть следы — значит, остаться в одиночестве» |
| **Visual** | Close-up of the red glove on their own hand; the palette gains a faint warm gray; the figure remains small but is centered; snow slows | Extreme wide shot; the figure lies down and becomes indistinguishable from the snow; white gradually fills the frame; no red accent |
| **Audio** | Wind continues; a second footstep arrives 1.5 s after Миро’s; radio voice says their name once; a low warm chord sustains under the wind | Wind only; the sub pulse stops; a single low note at the moment Миро lies down; then full silence for 3 s |
| **Text** | “След был мой. Но шагов было два.” Then ending title and replay | “Снег ровный.” Then ending title and replay |
| **Interaction** | “Пройти заново” / “Выбрать иначе” | “Встать” (restart) / “Выбрать иначе” |
| **Thesis** | The self is real because someone else heard the second step. | The self dissolves when the search ends. |

Both endings must be reachable in under 5 minutes and must not lecture the viewer. The twist is confirmed by image and sound, not by an explanatory paragraph.

---

## 6. Interactive Site Description

### Product shape

A static single-page experience built with **Vite + React**, deployed to **GitHub Pages**. No backend, no login, no database. All content is Russian. The site is a sequence of full-screen scenes with a persistent snow layer, minimal UI, and one branch.

### Entry

- Full-screen title: «Последний пешеход».
- Two buttons: **«Войти в метель»** (starts audio and Scene 1) and **«Без звука»** (starts muted).
- The entry gesture solves browser autoplay restrictions.
- A small line: “Наушники рекомендуются. 3–5 минут.”

### Navigation

- One primary button per scene: **«Дальше»**.
- Secondary controls: **«Дневник»** (opens an overlay with 2–3 entries, some crossed out), **«Звук»** (mute/unmute), **«Начать заново»** (only on ending screens).
- Progress: six thin dots or a hairline at the bottom; no scene numbers, no percentage.
- Keyboard: `Enter` / `Space` advances; `Esc` closes the diary; focus states are visible.

### The snow-forgetting mechanic

This is the signature interaction:

1. A full-viewport `<canvas>` snow layer sits above the scene image but below the UI.
2. On “Дальше,” a wind gust triggers: particle density triples for 1.2–1.6 s, and a white gradient sweeps across the frame.
3. The outgoing scene’s text is split into spans; the glyphs stagger, blur, and drift with the snow, then disappear.
4. The outgoing image fades under white; the next scene fades in from white.
5. The effect is a literal burial of the previous frame. Nothing persists except the user’s memory — which is the point.

Implementation notes:
- Particle count: 300–800 on desktop, 100–250 on mobile; adaptive based on `devicePixelRatio` and frame timing.
- Use `requestAnimationFrame`; pause when the tab is hidden.
- Respect `prefers-reduced-motion`: no particle burst, 300 ms crossfade, video replaced by a slow still.
- The snow layer must never block clicks: `pointer-events: none`.

### Character entrances

- **Миро** is never a portrait. A silhouette, a back, a hand, a breath. In Scene 1 Миро is tiny; in Scene 6A only a hand and sleeve are visible.
- **Голос радио** appears as animated typography and a thin waveform over the cab interior. The voice is heard, not seen.
- **Пёс** enters as a dark silhouette at the edge of Scene 3, follows at a distance in Scene 4, and is absent from the endings. No barking, only a collar tag.

### Video placement

- **V-01** plays in Scene 4, autoplayed muted, 12–15 s, once.
- A poster frame (I-04) is shown while loading.
- If the connection is slow or reduced motion is on, skip the video and show I-04 with a very slow scale/pan.
- After the video, the scene holds on the door for 1 s before the choice appears.

### Music and sound behavior

- One main audio bed with scene-based layers, managed through the Web Audio API (gain nodes, crossfades).
- Crossfade between scenes: 1.5 s.
- Radio voice ducks the music by 6–8 dB.
- At the branch, all music cuts to wind and breath for 1 s. The choice is made in near-silence.
- Ending A adds a second-footstep layer and a warm chord; Ending B strips layers down to wind, then silence.
- Audio is optional at every point; captions cover the radio lines.

### Replay and state

- A single `useReducer` state machine: `scene`, `ending`, `hasPlayed`, `muted`, `reducedMotion`.
- The chosen ending is stored in `localStorage` only to unlock the optional extra diary line on replay. No analytics, no personal data.
- “Выбрать иначе” returns to Scene 5 without replaying the whole story.
- “Пройти заново” resets to the entry screen.

### Performance and deployment

- Target total media payload: under 15 MB; video under 8 MB; each illustration under 500 KB (WebP/AVIF with JPEG fallback).
- Preload the next scene image; lazy-load the video.
- Vite `base` set to the repository path for GitHub Pages; deploy via GitHub Actions or `gh-pages`.
- Test on Chrome, Safari, Firefox, iOS Safari, and a 360 px viewport.
- First meaningful paint under 3 s on broadband.

---

## 7. Visual Style

### Palette

| Token | HEX | Usage |
|---|---|---|
| `--snow` | `#F2F2EF` | Background, snow, negative space |
| `--ink` | `#0B0C0D` | Text, silhouettes, deepest shadows |
| `--tin` | `#6E747A` | Midtones, metal, secondary text |
| `--fog` | `#C9CDD0` | Atmospheric haze, disabled UI, hairline borders |
| `--glove` | `#B3121C` | The single accent: the glove, one hover hairline, nothing else |

No other hues. No warm sunlight, no blue “cinematic” grade, no teal-orange. The red exists only to prove that something is real.

### Light

- Contre-jour: the subject is a dark shape against a bright snowfield.
- Long shadows, low sun, blown highlights.
- Midtones stay low-contrast and milky; blacks are clean, not crushed.
- No bloom, no lens flares. A slight halation around the brightest edges is acceptable.

### Composition

- Extreme wide shots: 70–80% negative space.
- The figure occupies less than 10% of the frame height.
- Centered or lower-third placement; horizon lines are high or absent.
- Close-ups only for the diary, the glove, and the hand. Never a full face.
- Snow is composed as texture, not as a particle effect: it fills the air, softens edges, and erases distance.

### Texture and motion

- 35 mm film grain; snow reads as grain.
- Slight gate weave is optional in video; keep it subtle.
- Camera movement is slow: a low tracking shot, a slow push-in, a static wide.
- UI motion uses long, linear easing; no bounce, no spring, no playful transitions.

### Typography

- **Headings:** Oswald (Cyrillic support), uppercase, tracked +4–8%, weight 500–600.
- **Body/UI:** PT Sans, 16–18 px, line-height 1.5.
- **Diary/radio:** PT Mono, 14–16 px, slightly increased letter-spacing.
- Text is always overlaid in HTML/CSS, never baked into AI images.
- Maximum two type sizes per screen; no more than 3–4 lines of text at once.
- Buttons are text with a 1 px underline and a small arrow, not filled rectangles.

### Do / Don’t

- **Do:** wide, empty, cold, quiet, one red object.
- **Don’t:** faces, crowds, warm interiors, photoreal emotion, visible AI artifacts, decorative UI cards, gradients unrelated to snow.

---

## 8. Audio Concept

### Main audio fragment (A-01)

- **Length:** 30–40 seconds, loopable.
- **Content:** cold ambient score + wind + metallic texture. No vocals, no clear melody lead.
- **Instrumentation:** low cello/contrabass drone, synth sub pulse, wind recorded or generated, distant radio static, metal creaks, sparse prepared piano or harmonium hits.
- **Structure:**
  - 0–8 s: wind and low drone establish the space.
  - 8–20 s: sub pulse enters; metal creaks; a sense of something approaching.
  - 20–32 s: radio ghost motif — a filtered, wordless tone that resembles speech cadence.
  - 32–40 s: tail recedes to wind, loop point matches 0 s.
- **Mix:** 48 kHz stereo, peak −1 dBFS, loop-safe; export OGG + MP3.

### Scene usage

- **Scene 1:** wind + drone at low volume; no pulse.
- **Scene 2:** radio static and a thin high tone; the voice sits dry and close.
- **Scene 3:** metal creaks and a quiet sub pulse; the diary feels claustrophobic.
- **Scene 4:** pulse rises; at the door, everything drops to wind and breath.
- **Scene 5:** near-silence; only wind and a faint radio hum.
- **Ending A:** second footstep, radio name fragment, warm low chord under the wind.
- **Ending B:** wind only, one low note, then 3 s of silence.

### Voice

- **Radio Voice:** short Russian lines, 6–10 s total across the story. Either TTS (free tier) or a human-recorded voice; TTS is acceptable if it sounds slightly synthetic, which fits the character.
- **Миро:** breath and a few whispered lines only; no long monologue.
- **Пёс:** collar tag, paws, breathing; no bark.

### Technical requirements

- Captions for all radio lines and whispered dialogue.
- Mute toggle persists across scenes.
- No audio autoplay before the entry gesture.
- Loudness target: −16 LUFS integrated for web; true peak ≤ −1 dBTP.

---

## 9. Asset Production List

Six illustrations, one video, one main audio fragment, plus optional short SFX. This exceeds the “at least 5 illustrations” requirement and covers the required 10–20 s video and 20–40 s audio.

All images: 16:9, minimum 1920×1080, no text, no face, no crowd, no warm colors except the red glove. Generate a style anchor first (I-01), then reuse its palette, lighting, and grain in every prompt. Keep a prompt ID for every generation.

| ID | Type | Scene | Duration / size | Shot description | Prompt seed (EN) | Priority |
|---|---|---|---|---|---|---|
| **I-01** | Illustration | 1 | 1920×1080 | Extreme wide, empty snowbound street at dawn; single line of footprints from a lone doorway into white distance; tiny figure with back turned | “Extreme wide shot, evacuated snowbound city street at dawn, single line of footprints leading from a lone doorway into white distance, tiny figure with back turned, near-monochrome snow white and ink black and tin gray, contre-jour, long shadows, 35mm film grain, cold epic, no text, no face, no crowd, no warm colors” | P0 — style anchor |
| **I-02** | Illustration | 2 | 1920×1080 | Interior of a snowplow cab; frost on the windshield; a glowing radio; thin waveform reflection; no visible driver face | “Interior of an old snowplow cab at dawn, frost-covered windshield, glowing analog radio, thin waveform reflection on glass, empty driver seat, tin gray and snow white palette, cold backlight, 35mm grain, claustrophobic, no text, no face, no warm colors” | P1 |
| **I-03** | Illustration | 3 | 1920×1080 | Close-up of an open paper diary on a wooden table; yesterday’s entry heavily crossed out; snow dust on the page; a gloved hand at the edge | “Close-up of an open paper diary on a cold wooden table, yesterday’s entry heavily crossed out with ink, fine snow dust on the page, edge of a work glove, near-monochrome, low contrast, 35mm grain, shallow depth of field, no readable text, no face, no warm colors” | P1 |
| **I-04** | Illustration | 4 / 5 | 1920×1080 | Wide shot of the same street; footprints loop back to the same door; tiny figure and dog in the distance; the door is the vanishing point | “Wide shot of a snowbound empty street, a single line of footprints looping back to the same lone door, tiny figure and a dark dog in the distance, near-monochrome, contre-jour, long shadows, 35mm grain, cold epic, no text, no face, no crowd” | P0 |
| **I-05** | Illustration | 6A | 1920×1080 | Close-up of a red work glove on Миро’s own hand; snow on the sleeve; blurred street behind; the only color in the frame | “Close-up of a red work glove on an androgynous figure’s own hand, snow on the heavy sleeve, blurred snowbound street behind, near-monochrome palette with one saturated red accent, cold backlight, 35mm grain, quiet epiphany, no face, no gender cues, no text” | P1 |
| **I-06** | Illustration | 6B | 1920×1080 | Extreme wide; a tiny figure lying in the snow, almost invisible; white field; high horizon; no red | “Extreme wide shot, tiny figure lying in a vast snowfield, almost invisible, white and tin gray palette, high horizon, soft snowfall, 35mm grain, desolate, quiet, no red, no face, no text, no crowd” | P1 |
| **V-01** | Video | 4 | 12–15 s, 1920×1080, H.264/WebM | Low tracking shot following the footprints through the empty street; no cuts; tiny figure and dog ahead, back turned; heavy snowfall; ends at the same door | “Slow low tracking shot following a single line of footprints through an empty snowbound street, heavy snowfall, tiny figure walking ahead with back turned, dark dog beside them, near-monochrome, 35mm grain, steady camera, no cuts, no face, no text, 12–15 seconds” | P0 |
| **A-01** | Audio | All | 30–40 s, loopable | Cold ambient score: low drone, wind, metal creaks, distant radio static, sub pulse; no vocals | “30–40 second loopable cold ambient score, low cello drone, wind, metallic creaks, distant radio static, sub pulse, no melody lead, no vocals, bleak, cinematic, slow” | P0 |
| **A-02** | SFX | 2, 6A | 2–4 s | Radio voice fragment / second footstep | Generated TTS line + a single boot step in snow, close and dry | P1 |
| **A-03** | SFX | 3, 4, 6B | 2–6 s | Collar tag, distant metal creak, wind gust | Short foley, recorded or generated, mixed low | P2 |

### Asset rules

- **No Russian text inside images.** All typography is HTML/CSS overlay. This avoids gibberish and keeps the design editable.
- **No faces in wide shots.** This is both an aesthetic rule and an AI-consistency rule.
- **One red object only.** If a generation adds red elsewhere, reject or desaturate.
- **Same grain, same light, same horizon logic** across all six images. Use I-01 as the reference image where the tool supports it.
- **Video from image-to-video**, seeded by I-04, to preserve the look. Keep the camera move simple; AI video breaks on complex motion.
- **Keep all attempts.** Log rejected generations; they are evidence for the “Решения и ограничения” section.

---

## 10. Script Plan and Requirements

The full script is a separate artifact: `docs/script.md`. This brief fixes its plan, length, and rules.

### Length and structure

Target: **400–800 words** in Russian. Suggested distribution:

| Section | Words | Content |
|---|---|---|
| Scene 1 | 80–110 | Morning, snow, tracks, first diary line |
| Scene 2 | 100–130 | Radio interrogation; forecast as confession |
| Scene 3 | 80–100 | Diary; crossed-out yesterday; dog appears |
| Scene 4 | 90–120 | Following the tracks; return to the door |
| Scene 5 | 40–60 | The choice; two labels |
| Ending A | 60–80 | Glove on their own hand; second step |
| Ending B | 60–80 | Lying in the snow; white frame |
| **Total** | **510–680** | Leaves room for stage directions and captions |

### Voice and rules

- **First-person diary fragments** for Миро’s inner voice; **third-person present tense** for action.
- No exposition dumps. The twist is revealed by repetition, contradiction, and the loop — not by a character explaining it.
- The radio repeats Миро’s lines with one word changed. This is the main exposition device.
- The dog never speaks and is never explained.
- The word “память” appears at most once, and only in the final third.
- Do not name the city, the year, or the evacuation reason.
- Avoid technical jargon, news language, and post-apocalyptic clichés.
- Final lines are fixed:
  - Ending A: “След был мой. Но шагов было два.”
  - Ending B: “Снег ровный.”

### Sample lines to lock the voice

- Scene 1: “Третья неделя. Город пуст, но кто-то ходит.”
- Scene 2 (radio): “Завтра — снег. Вы говорили это вчера.”
- Scene 3 (crossed-out diary): “___ находит след. Он начинается у моей двери.”
- Scene 4: “Я иду по следу, пока след не приводит меня к моей двери.”
- Scene 5: «Идти до конца — значит, кто-то есть» / «Стереть следы — значит, остаться в одиночестве».

### Deliverables

- `docs/script.md` — full script, 400–800 words, scene headings, dialogue, stage directions.
- `docs/script-captions.md` — plain-text captions for the site.
- `docs/script-tts.txt` — clean text for the radio voice TTS.

---

## 11. Success Criteria

| ID | Criterion | How it is observed / measured |
|---|---|---|
| **SC-001** | A first-time viewer completes the experience in 3–5 minutes without instructions | Usability test with 5 viewers; at least 4/5 reach an ending unaided |
| **SC-002** | At least 4/5 viewers can retell the twist after one playthrough (“the tracks were their own; the city erases their memory”) | Short post-play interview; answers coded yes/partial/no |
| **SC-003** | Both endings are reachable; the branch works; replay shows a different ending | Manual QA checklist on desktop and mobile |
| **SC-004** | At least 6 illustrations, 1 video of 10–20 s, and 1 audio fragment of 20–40 s are present and load | Asset inventory + network tab check |
| **SC-005** | The site is deployed on GitHub Pages and loads in under 3 s on broadband; works at 360 px and 1440 px | Lighthouse + manual viewport test |
| **SC-006** | The snow effect runs at ≥50 fps on a mid-range laptop, or degrades gracefully with reduced motion | Performance profile; visual check |
| **SC-007** | At least 4/5 viewers describe the tone as “cold / uncanny / sad” rather than “confusing” or “boring” | Post-play survey with open wording |
| **SC-008** | Every AI asset has a logged prompt, tool, attempt count, and cost; the report includes the full table | Asset log review |
| **SC-009** | The submission covers 100% of the assignment rubric, including the bonus “Решения и ограничения” section | Rubric checklist in the report |

---

## 12. Scope

### In scope

- Six scenes and two endings, one branch at Scene 4.
- Six AI-generated illustrations (I-01…I-06).
- One AI-generated or AI-assisted video, 12–15 s (V-01).
- One main audio fragment, 30–40 s, plus short SFX and radio voice (A-01…A-03).
- A responsive Vite + React mini-site with the snow-forgetting mechanic, branching, captions, mute, and reduced-motion support.
- Deployment to GitHub Pages.
- A 400–800 word Russian script as a separate artifact.
- A report with economics, AI declaration, and the bonus “Решения и ограничения” section.

### Out of scope

- User accounts, login, profiles, comments, or any backend.
- Analytics, tracking, A/B testing, or personalization.
- Multiple languages or localization.
- 3D, WebGL, or real-time 3D scenes.
- Full voice acting for all characters; only radio lines and minimal whispers.
- More than two endings or more than one branch.
- A CMS or an editor for the diary.
- Custom domain, monetization, ads, or SEO beyond basic meta tags.
- Live-action footage, photoreal human faces, or celebrity likeness.
- Mobile app or desktop app.

### Constraints

- **Stack:** Vite + React; static build; no server.
- **Hosting:** GitHub Pages, including its file-size and bandwidth limits.
- **Budget:** paid only for LLM; image, video, and audio tools must use free tiers or free trials. Small top-ups are a contingency, not the plan.
- **Language:** all content and UI in Russian; the brief itself is in English for the production team.
- **Division of labor:** the development team builds the site and text materials; the user generates media assets from ready prompts.
- **Browser audio:** no autoplay before a user gesture; the entry screen must start audio.
- **Asset weight:** total media under 15 MB; video under 8 MB.
- **AI consistency:** no faces in wide shots; near-monochrome palette; one red accent.
- **Deadline:** course submission date; production must fit 60–100 person-hours.

### Rejected ideas

| Idea | Rationale |
|---|---|
| Linear short film instead of a site | Interactivity is the thesis: the viewer performs the forgetting by advancing scenes. A film would lose the mechanic. |
| Full-color photoreal look | Style drift across AI tools, wrong mood, and expensive retouching. Near-monochrome is more consistent and more directorial. |
| Visible human face / actor likeness | AI faces break consistency and empathy; the story works better with a back-turned silhouette. Also avoids likeness and rights issues. |
| Voice-over explaining the twist | Kills the ambiguity. Replaced by radio echo, diary overwrite, and the loop. |
| More than two endings | Scope creep; two endings already map to the two theses (“someone is there” / “I am alone”). |
| 3D/WebGL city | High production risk, unnecessary for the emotional effect. |
| Background music with vocals | Vocals compete with the radio voice and fix the emotion too explicitly. |
| User text input / personalized diary | No backend and no need; it would turn a controlled narrative into a toy. |
| White glove | The approved visual style requires a single red accent. The glove is red in production; the source logline’s “white glove” is superseded. |

---

## 13. Economics

### What to log from step one

Every generation attempt — accepted or rejected — must be logged. This is the raw data for the cost table and the “Решения и ограничения” section. Minimum schema:

| Field | Description |
|---|---|
| `date` | Date of generation |
| `stage` | concept / image / video / audio / code / report |
| `asset_id` | I-01…I-06, V-01, A-01…A-03 |
| `service` | Tool name (e.g., image generator, video generator, TTS, LLM) |
| `model` | Model/version if known |
| `attempt_no` | 1…n per asset |
| `prompt_id` | Link to the prompt in `docs/assets/prompts.md` |
| `credits_used` | Credits consumed |
| `cash_usd` | Actual money spent, if any |
| `gen_min` | Generation time, minutes |
| `select_min` | Selection time, minutes |
| `retouch_min` | Retouch/edit time, minutes |
| `accepted` | yes / no |
| `reject_reason` | style drift / artifact / wrong composition / text / color / other |
| `notes` | Anything that explains a decision |

Also log:
- Free-tier limits and expiry dates per service.
- Watermark or license restrictions.
- Number of attempts per accepted asset.
- Total elapsed calendar time per stage.

### Indicative cost table

These are planning estimates, not receipts. Update with real numbers during production.

| Stage | Output | Main cost driver | Cash estimate | Time estimate | Notes |
|---|---|---|---|---|---|
| 0. Concept and script | Brief, 400–800 word script, prompt pack | LLM tokens; human rewriting | $2–5 | 6–10 h | 5–8 script iterations |
| 1. Style anchor and images | 6 final illustrations | Free-tier credits; selection and retouching | $0–5 | 10–16 h | 40–70 generations; 6 accepted |
| 2. Video | 1 shot, 12–15 s | Free credits; possible top-up | $0–10 | 4–8 h | 10–20 attempts; image-to-video |
| 3. Audio | 1 track, 30–40 s; SFX; radio voice | Free tier; possible top-up | $0–5 | 4–6 h | Music + TTS + mix |
| 4. Web build | Vite + React site, snow engine, branch, captions | Engineering time | $0 | 24–36 h | Main effort |
| 5. Integration and QA | Assets integrated, responsive, deployed, tested | Engineering time | $0 | 8–12 h | Desktop + mobile + browsers |
| 6. Report and economics | Report, AI declaration, cost table, bonus section | LLM + writing time | $1–3 | 6–8 h | Logs must already exist |
| Contingency | Re-generations, fixes | — | 15% | 15% | Buffer |
| **Total** | | | **$3–25 cash** | **62–96 h** | Labor not monetized |

### Most expensive stages

1. **Web build and integration — in time.** The snow mechanic, audio state, branch, and responsive layout are the largest engineering blocks.
2. **Image generation — in iteration time.** Free credits are cheap; the expensive part is selecting and retouching 6 finals from 40–70 attempts.
3. **Video — in cash and uncertainty.** Free credits may run out; AI video artifacts can force re-generations. Keep the shot simple and budget a small top-up.
4. **LLM and report — in cash, small.** The only guaranteed paid line; cap it at $10.

### Alternatives compared

| Alternative | Cash | Time | Pros | Cons |
|---|---|---|---|---|
| **Chosen: AI stills + one video + React mini-site** | $3–25 | 62–96 h | Best balance of atmosphere, interactivity, and risk; reuses one style anchor | Integration effort; AI consistency management |
| Linear AI short film | $0–30 | 40–70 h | Simpler narrative; no web build | No interactivity; more video shots; higher AI video risk |
| Hand-drawn / hand-animated short | $0 | 100–160 h | Full control; unique look | Too slow for the course; animation skill required |
| Stock footage + edit | $30–100 | 30–50 h | Fast; reliable footage | Style mismatch; licensing; no custom snow mechanic |
| No-code builder (Tilda/Framer) | $0–16/mo | 12–20 h | Fast to assemble | Limited custom canvas/snow/branch; export and hosting constraints |
| 3D/WebGL city | $0–50 | 120+ h | Impressive spatiality | High risk; unnecessary for the emotional effect |

### Assumptions

- Team labor is student time and is not monetized in the cash table.
- LLM spend is capped at $10; the rest of the media budget relies on free tiers and trials.
- 6 final images require 40–70 attempts; 1 video requires 10–20 attempts.
- GitHub Pages is free and sufficient for a static site under 15 MB.
- No stock licenses, no custom domain, no paid plugins.
- One language, one radio voice, one main audio track.
- Prices and free-tier terms are as of November 2026 and must be verified before production.
- The schedule allows 60–100 person-hours across the team.

---

## 14. AI Usage Declaration

This is the policy and draft text for the final report. The report must list actual tools, versions, and dates.

| Stage | AI role | Tool class | Human control | Disclosure |
|---|---|---|---|---|
| Ideation and structure | Brainstorming, alternatives, critique | LLM (paid) | Team chooses the concept, structure, and tone | List model and dates |
| Script | Co-drafting, line variations | LLM (paid) | Team rewrites every line; final text is human-approved | State “AI-assisted, human-edited” |
| Illustrations | Text-to-image generation | Free-tier image generators | Team writes prompts, selects, retouches, color-grades | List services and attempt counts |
| Video | Image-to-video generation | Free-tier video generators | Team selects, trims, grades; fallback to animated still | List service and attempts |
| Audio | Text-to-music, TTS, SFX | Free-tier audio tools | Team edits, mixes, sets levels | List tools; note synthetic voice |
| Code | Pair-programming, boilerplate | LLM (paid) | Team reviews, tests, and owns the code | State “AI-assisted code” |
| Report | Editing and structuring | LLM (paid) | Team verifies all facts, costs, and claims | State “AI-assisted editing” |

Draft statement:

> AI was used as a production tool at every stage of this project: for ideation and script drafting, image and video generation, music and voice synthesis, and code assistance. All narrative decisions, selection, editing, mixing, and integration were made by the team. Every AI-generated asset was reviewed for artifacts, consistency, and rights. No real people’s likeness, no copyrighted characters, and no third-party trademarks were used. A generation log with tools, prompts, attempt counts, and costs is included in the appendix.

---

## 15. Decisions and Limitations (bonus section)

### Five key decisions

**D1. A mini-site, not a linear film.**
*Rationale:* the story is about forgetting, and the site makes the viewer perform the forgetting by advancing scenes. The snow wipe is the thesis in interaction form.
*Trade-off:* more engineering time and more failure points than a video; requires QA on multiple browsers.

**D2. Snow is a mechanic, not decoration.**
*Rationale:* the snowfall buries the previous frame and the previous text. The user cannot go back and reread; the interface enforces the same erasure that happens to Миро.
*Trade-off:* the effect must be tuned carefully; too aggressive and it hurts usability, too subtle and it reads as a background animation.

**D3. Near-monochrome palette with one red accent.**
*Rationale:* it creates a strong directorial signature, makes AI generations more consistent, and turns the glove into the only proof of reality in the frame.
*Trade-off:* limited visual variety; every image must obey the same light and grain rules. The source logline’s “white glove” is superseded by the red glove to preserve the single-accent rule.

**D4. Two endings, one branch, no more.**
*Rationale:* the two endings are two theses — “someone is there” and “I am alone” — not a game-style morality system. One branch keeps the scope finishable and the choice meaningful.
*Trade-off:* less replay value than a larger branching tree; the second playthrough is short.

**D5. Sparse Russian text, no explanatory voice-over, no faces in wide shots.**
*Rationale:* the twist must land through image, sound, and repetition. Wide, faceless compositions are also the most reliable output from AI image and video tools.
*Trade-off:* viewers who skip text or mute audio may miss clues; the story depends on attention.

### Selection and rework examples

**E1. Concept-level: rejected the full-color photoreal direction.**
Early visual references suggested a photoreal, blue-hour, cinematic look. It was rejected because (a) different AI tools drift in color and skin tones, (b) the mood became “generic apocalypse” rather than “cold epic,” and (c) retouching costs would rise. The near-monochrome system was chosen instead; it is cheaper to keep consistent and stronger conceptually.

**E2. Narrative-level: rejected the explanatory voice-over.**
An early script version had Миро narrate the twist (“I understood that the tracks were mine…”). It was cut. The reveal now happens through the radio echo, the crossed-out diary, and the loop back to the door. This preserves ambiguity and shortens the script.

**E3. Asset-level: selection log to be completed with real asset IDs.**
During production, log at least one rejected generation per asset class with the reason and the fix. Expected cases:
- An image with a visible face or a second red object → reject, regenerate wider, desaturate.
- A video with morphing limbs or a camera cut → reject, simplify the motion, shorten to 10–12 s.
- A music track with a strong vocal or melody → reject, regenerate as drone/ambient, or strip the lead in the mix.

Each entry must include: asset ID, attempt number, what was wrong, what changed in the prompt or edit, and whether the rework was accepted. This is the evidence for the bonus points.

### Limitations

- **Scripted forgetting, not systemic memory.** The site simulates erasure through scene transitions and a single stored ending flag; it is not a true memory model.
- **AI consistency is bounded.** Even with a prompt bible and a style anchor, images may drift. The monochrome palette and wide shots reduce, but do not eliminate, the risk.
- **Free-tier dependency.** Services can change limits, add watermarks, or expire trials. The budget assumes small paid top-ups only as contingency.
- **No backend.** No accounts, no cloud saves, no analytics. Replay state is local only.
- **Text-dependent twist.** Viewers who skip the diary and radio lines may not understand the ending. Captions help, but attention is required.
- **One video shot.** The video is a single 12–15 s sequence, not full animation. Character motion and complex camera moves are out of scope.
- **Single language.** Russian only; no localization or subtitles in other languages.
- **Economic estimate excludes labor.** The cash table is small, but the real cost is 60–100 person-hours of team time.
- **Accessibility vs. atmosphere.** Heavy snow and slow transitions can affect motion-sensitive viewers; reduced-motion mode trades atmosphere for comfort.
- **AI video artifacts.** Hands, faces, and fast motion are avoided by design; this limits what the video can show.

---

## 16. Requirements Coverage

| Assignment requirement | Where covered | Artifact / status |
|---|---|---|
| Story passport: title, genre, audience, logline, theme, place/time, characters, events, emotion | §1 | This brief |
| Script of 400–800 words | §10 (plan and rules) | `docs/script.md` — to produce |
| At least 5 illustrations / visual frames | §9 (6 planned: I-01…I-06) | `docs/assets/` — to produce |
| Audio 20–40 s | §8, §9 (A-01, 30–40 s) | `docs/assets/audio/` — to produce |
| Video 10–20 s | §9 (V-01, 12–15 s) | `docs/assets/video/` — to produce |
| Assembled digital product: mini-site | §6, §12 | Vite + React on GitHub Pages — to build |
| Economic efficiency: stage cost table, most expensive stages, alternatives, assumptions | §13 | This brief; final numbers in `docs/report.md` |
| AI usage declaration | §14 | This brief; final version in `docs/report.md` |
| Bonus +10: “Решения и ограничения” — 3–5 decisions, 2–3 selection/rework examples, limitations | §15 | This brief; expanded with real asset IDs in `docs/report.md` |

---

## 17. Fixed Decisions and References

### Assignment

- Course: «Культура ИИ: медиа и креативность», ИТМО, final project.
- Assignment variant 2 «Мультимедийная история» (LMS ITMO); the assignment file is not part of the repository.
- Requirements covered: story passport, 400–800 word script, ≥5 illustrations, 20–40 s audio, 10–20 s video, assembled mini-site, economic efficiency, AI declaration, bonus “Решения и ограничения”.

### Fixed product decisions

- **Format:** interactive mini-site.
- **Stack:** Vite + React.
- **Deploy:** GitHub Pages.
- **Language:** Russian content and UI.
- **Budget:** paid only for LLM; image/video/audio via free tiers or trials.
- **Division of labor:** team builds site and text; user generates assets from prompts.
- **Structure:** 6 scenes, 1 branch at Scene 4, 2 endings.
- **Assets:** 6 illustrations, 1 video (12–15 s), 1 main audio track (30–40 s), short SFX and radio voice.
- **Visual system:** near-monochrome, one red accent, no faces in wide shots, HTML-overlaid text.
- **Interaction signature:** snow wipe that buries the previous frame and text.

### Artifact map

| Path | Purpose |
|---|---|
| `docs/briefs/posledniy-peshehod.md` | This product brief |
| `docs/script.md` | Full script, 400–800 words |
| `docs/script-captions.md` | Captions for the site |
| `docs/script-tts.txt` | Clean text for radio TTS |
| `docs/assets/prompts.md` | Prompt bible, one entry per asset, with negative prompts |
| `docs/assets/log.csv` | Generation log: attempts, credits, cash, time, accept/reject |
| `docs/assets/` | Final images, video, audio |
| `docs/report.md` | Final report: economics, AI declaration, decisions and limitations |
| `site/` | Vite + React application |

### Next steps

1. Hand this brief to **Planning** to produce an exec-plan.
2. Freeze the prompt bible and start the generation log before the first image.
3. Generate **I-01** as the style anchor; approve palette, light, and grain.
4. Build the scene engine with placeholder assets and the snow mechanic.
5. Generate the remaining assets in priority order: I-04, V-01, I-05, I-06, I-02, I-03.
6. Write `docs/script.md`; record/TTS the radio voice; mix A-01.
7. Integrate, QA on desktop and mobile, deploy to GitHub Pages.
8. Write `docs/report.md` with real cost data, AI declaration, and the completed selection/rework log.

### Production follow-ups (non-blocking)

- Confirm current free-tier terms and watermark policies for the chosen image, video, and audio services.
- Confirm the final video tool and whether image-to-video is available on the free tier.
- Confirm whether the radio voice is TTS or human-recorded; keep TTS as the fallback.
- Confirm the course submission deadline and file format for the report.
