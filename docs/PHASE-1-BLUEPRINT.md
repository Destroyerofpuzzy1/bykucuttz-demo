# BYKUCUTZZ — Phase 1 Implementation Blueprint

Prepared 2026-10-06 as the original research/design proposal. The site is now implemented. Updated 2026-10-09: current state below; historical asset/research/planning sections remain a record of the original proposal, not a complete description of current code. Use `PROJECT_CONTEXT.md`, `TASKS.md` and current source as implementation authority.

Design read: **brand landing page for young urban men (and some women) in Łódź choosing a barber, in an editorial streetwear-campaign language, built on black space, one wide grotesk family, real photography and one LED-line motion system. Conversion = Booksy.**
Dials (taste skill): `DESIGN_VARIANCE 8 / MOTION_INTENSITY 6 / VISUAL_DENSITY 3`.

---

## 1. CURRENT PROJECT STATE

**Current stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4, Archivo via `next/font`, GSAP 3 with ScrollTrigger/SplitText and `@gsap/react`, Phosphor icons. Sharp/Potrace asset tooling. See `package.json` for actual versions and commands.
**Current routes:** `/` (barbershop homepage), `/cutz-academy` (separate training page), `/polityka-prywatnosci`. Sources in `assets-src`, deployed derivatives in `public/images`, typed content in `src/data`, CSS in `src/styles/globals.css` plus scoped Academy CSS. The homepage intro/Ekipa/navbar changes were merged into `main` on 2026-10-09; Academy is local on `codex/cutz-academy`.
**Academy architecture:** `src/app/cutz-academy/page.tsx`, `src/data/academy.ts` + `academy-images.json`, shared Header/Footer/MotionController, supplied `AcademyLogo`, dedicated asset pipeline. Hero with the post-training photo strip → "Szkolenia w praktyce" (Fade/Shape cards, four clips, formats) → brand/instructor confirmation → Instagram inquiries. Route-based Academy variant of the shared Header. Read `docs/CUTZ-ACADEMY.md` for the current audit and content sources. No training prices, durations, instructors or certificates are assumed.
**SEO configuration:** no existing sitemap/robots route and no confirmed production domain (`site.url` is null). Academy has separate metadata; homepage metadata remains unchanged.

**Original stack recommendation (historical):**
| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router, TS), mostly Server Components | `next/image` responsive AVIF/WebP, `next/font` self-hosting, easy Vercel deploy |
| Styling | Tailwind v4 + CSS custom-property tokens in `@theme` | Fast, tokenised, no runtime |
| Motion | **GSAP 3.13+ only** (ScrollTrigger, SplitText, DrawSVG; all free now) + `@gsap/react` `useGSAP` | One library. Line drawing, scrubbed pins and the split are GSAP's strengths. **No Framer Motion** (don't mix two engines). **No Lenis/smooth-scroll** (native scroll = no hijacking, better on mobile) |
| Icons | `@phosphor-icons/react` (InstagramLogo, FacebookLogo, Phone, MapPin, NavigationArrow) | Refined, single stroke family |
| Images | `sharp` script for masters + `next/image` | Source PNGs are 1.5-2.7 MB |
| Hosting | Vercel (recommended) | Keeps `next/image` optimisation; static export would need a pre-generated image set |

**Skills used in this phase and why:**
- `frontend-design`: anti-template direction, type-as-design, "spend boldness in one place".
- `design-taste-frontend` (taste-skill): dials, AI-tell audit (em-dash ban, eyebrow rationing, one marquee, one accent, radius lock, GSAP pin patterns, reduced motion).
- `built-in-browser` (Booksy research), web search (second salon, awards, contacts).

Skills held for later phases: `impeccable` (finish review against this contract), `improve-animations` / `emil-design-eng` (motion polish), `design:accessibility-review`, `cro` (post-build audit), `schema` (LocalBusiness JSON-LD), `stop-slop` / `copy-editing` (Polish copy pass), `image` (asset processing).

---

## 2. ASSET AUDIT

| File | Contains | Quality | Best use | Crop / position | Optimisation |
|---|---|---|---|---|---|
| `logo.jpeg` 687×386 | Script "BykuCutzz Barber", white fill, black outline + black 3D extrusion, on flat cyan `#61CCF0`; "JAKOŚĆ PONAD ILOŚĆ" in wide heavy grotesk below | Clean but low-res JPEG with compression edges | **Reference only.** Must become an inline SVG (see below) | n/a | Vectorise. Ask client for original AI/SVG/PDF first |
| `bykucutzz-hero-interior.png` 1672×941 | Low-angle wide interior: two hex LED ceiling clusters, mirror wall with chairs, swirled black/white epoxy floor reflecting the hexes, cyan wall-wash left, white reception desk right, TV showing MMA | Strong, cinematic; reads as a render/enhanced image. Soft at >1600px | **Desktop hero.** The ceiling is the loader's target geometry | `object-position: 55% 40%`. Ceiling top 35% stays clear of type; headline sits on the dark floor/left wall. Mask or darken the TV (distracting, dated content) | Upscale 2× (generated asset, so upscaling is honest), AVIF/WebP at 640/1080/1600/2400 |
| `bykucutzz-salon-interior.png` 1671×941 | Eye-level wide: 4 chairs in a row, long mirror wall, windows with ring light, hex ceiling, marble epoxy floor | Excellent, calm, clear "barbershop" read | **Salon 01 panel** (two-salon split) | Desktop panel ~65% width: `object-position: 62% 50%` (chairs). Mobile portrait: `70% 50%` (closest chair + mirror) | Upscale 2×, responsive set |
| `salon2.png` 1457×1080 | High-angle view over a huge two-storey loft: floor-to-ceiling windows, hex LED clusters, ducts, wooden stair seating with cyan step lights, mezzanine, long tables, sofas, red umpire chair | Very strong, atmospheric. **No barber chairs or stations visible** (reads as coworking/event space) | **Salon 02 panel** | Desktop: `object-position: 40% 55%` (windows + floor). Mobile: `35% 60%`. Stairs in the lower right lead the eye back toward the CTA | Upscale 2×. **Authenticity to confirm** (§14) |
| `bykucutzz-detail-bg.png` 1670×941 | Dark macro: chair arm foreground, station line with clippers/bottles, mirrors with cyan edge light, hex ceiling top-left | Moody and very dark. Most of the frame is near-black, so it can carry type | **"Przestrzeń" section background** (desktop) | Type over the left 45% (empty black wall). Hex top-left becomes the traced LED overlay | AVIF; tolerates strong compression |
| `bykucutzz-chair-detail.png` 941×1672 (portrait) | Single quilted chair, hex light top-left, mirrors with cyan edges, marble floor | Excellent, the only portrait-format interior | **Mobile hero** (art-directed `<picture>`) **and** desktop inset in "Przestrzeń" | Mobile hero: `object-position: 50% 35%`, top hex visible | Upscale 2× for 3× DPR phones |
| `crew.jpeg` 640×853 | 7 people outside the salon door (hex ceiling visible through door) holding silver "4000" balloons. Real, warm, casual | Authentic but **640 px wide: too small** for large display | **Crew / culture moment** (one use only) | Show at max ~560 css px, or full-bleed with deliberate grain + slight desaturation to hide softness. Never imply it says 5098 | Request original. Otherwise WebP q80 |
| `cut1.jpeg` 1165×1143 | Profile: textured crop with high skin fade, dark background | Sharp, well-lit. The best "fade" proof | **Work: anchor image #2**, plus Pricing "Strzyżenie" hover | Square or 4:5, `object-position: 45% 45%` | WebP/AVIF |
| `cut2.jpeg` 945×1193 | Side: curly textured top, taper, sculpted beard, daylight, white cape. **Barber pole visible top-right** | Good. Daylight looks different from the black interiors (useful variety) | **Work: beard/combo proof**, Pricing "Combo/Broda" | **Crop out the barber pole**: 4:5 crop, x 0-760 px. `object-position: 35% 50%` | WebP/AVIF |
| `cut 3.jpeg` 2076×2340 | Back view: textured top with low/drop taper, blurred salon and **hex LED in frame** | Highest resolution; the brand's LED appears in the proof | **Work: hero image** of the section (largest tile) | 4:5 or 3:4, `object-position: 50% 40%` | Rename to `cut3.jpeg` (space in filename), AVIF |
| `design.jpeg` 1115×993 | Buzz cut with freehand hair design (white-lined pattern), busy background | Softest of the set (looks re-compressed from Instagram). Busy bottom-left | **Work: design proof** (smallest tile), Pricing "Design / Wzorek" | Tight crop to head: x 300-900, y 230-800 | WebP; never show larger than ~600 css px |

**Logo treatment plan:**
1. Preferred: client supplies a vector. Otherwise trace with potrace at 4× upscale into **two SVG layers**: `fill` (white letterforms) and `extrude` (the black outline + 3D extrusion), with "Barber" sub-script kept, plus a separate tagline (set in live type, not traced, since it is a grotesk).
2. On a black site the original black extrusion vanishes. Recolour the extrusion layer to **cyan `#61CCF0`**: white script with a cyan 3D shadow. That is the "cyan light pulse" of the loader, and the logo stays genuinely theirs (same letterforms, same extrusion geometry) without the blue rectangle.
3. Variants: `full` (script + Barber), `compact` (script only, nav), `mono-white` (footer, small sizes where the extrusion turns to mush below ~28 px height).
4. Never re-typeset the script in a font. Never stretch. Minimum height: 28 px.

**Asset gaps:** no individual barber portraits, only 4 work photos, a low-res crew photo, no logo vector, no verified imagery of Salon 02 as a barbershop.

---

## 3. VERIFIED BUSINESS DATA

Sources: Booksy profile (read live 2026-10-06), Instagram (public header only), web search.

### Verified
- **Name:** BYKUCUTZZ Barbershop (Booksy)
- **Address (Salon 01):** Drewnowska 49a, LU11, 91-002 Łódź, Bałuty
- **Coordinates (Booksy map link):** 51.782902, 19.447082
- **Hours (Booksy):** Mon-Fri 10:00-14:30 and 15:00-20:00. Sat 09:00-12:40 and 13:00-17:00. Sun closed.
- **Team (Booksy):** Byku, Kacper, Kamil, Sandra, Kasim, Patryk, Ryan, Macias (+ "RECEPCJA" listed separately)
- **Instagram:** https://www.instagram.com/bykucutzz/ (bio: "Jakość ponad ilość"). The only social link on Booksy.
- **Booking policy (Booksy):** cancel/reschedule ahead by SMS or phone. No-shows are noted, and the next visit costs +50%.
- **Prices (Booksy):** all brief prices confirmed, plus two the brief missed:
  | Group | Service | Price | Time |
  |---|---|---|---|
  | Strzyżenie | Strzyżenie męskie | 100 zł | 45 min |
  | | Strzyżenie męskie, BYKU | 120 zł | 45 min |
  | | Buzzcut | 80 zł | 30 min |
  | | Włosy długie | 120 zł | 1 h |
  | | Włosy długie, BYKU | 140 zł | 1 h 10 |
  | | Metamorfoza | 130 zł | 1 h 10 |
  | | Design / Wzorek | 10 zł | 10 min |
  | Combo | Włosy + broda COMBO | 140 zł | 1 h 15 |
  | | Włosy + broda COMBO, BYKU | 160 zł | 1 h 15 |
  | | **Głowa na 0 + broda** (not in brief) | 80 zł | 40 min |
  | Broda | Strzyżenie brody | 70 zł | 30 min |
  | | Repigmentacja brody | 50 zł | 25 min |
  | | Repigmentacja włosów | 70 zł | 30 min |
  | | Konturowanie brody | 20 zł | 20 min |
  | Inne | Woskowanie nosa | 20 zł | 5 min |
  | Junior Barber | Strzyżenie męskie | 60 zł | 1 h |
  | | COMBO | 80 zł | 1 h 30 |
  | | Buzzcut | 40 zł | 40 min |
  | | Strzyżenie brody | 40 zł | 40 min |
  | | **Głowa na 0 + broda** (not in brief) | 50 zł | 50 min |
  Exclude the Booksy artefacts "Zasady rezerwacji 1 zł" and the "." category.
- **Verified reviews** (exact text, reviewer first name, barber):
  - "Super strzyżenie, pełny profesjonalizm, na pewno przyjdę jeszcze raz" (Sergiusz, Kacper)
  - "Wszystko super napewno wroce" (Dorian, Kamil)
  - "Super polecam" (Magdalena, Ryan)
  - "Ryan boss" (Arek, Ryan)
  - "elegancko" (Krzysztof, Macias)
  The review feed has 510 pages, so Phase 2 must collect ~24-30 more verbatim reviews (and spread them across all barbers).

### Dynamic (one config file, with an `asOf` date)
- Rating **5.0**, reviews **5098**, five-star **5093** (4★ 2, 3★ 1, 2★ 1, 1★ 1). A March search snapshot showed 4743, so the count moves fast.
- Prices, team roster, hours, review quotes.
- No Booksy public API exists. Scraping is fragile and against ToS, so updates stay manual: one file, `content/business.ts`, with `stats.asOf`.

### Missing / needs verification
- **Salon 02:** nothing public found (no Booksy profile, no address, no Instagram mention reachable). Everything is TO PROVIDE.
- **Phone:** hidden behind Booksy login. Only a third-party directory (GoWork) lists one, and that is not an official source. TO PROVIDE.
- **Facebook:** no official page found or linked from Booksy. TO VERIFY.
- **Instagram:** follower and post counts are not readable without login. Not used.
- **Authority signal found:** "Orły Fryzjerstwa 2026: laureat + gold medal" for Bykucutzz Barber, Drewnowska 49a/LU11 (orlyfryzjerstwa.pl). Show it only if the client confirms and wants it.
- **Legal entity** for the footer/privacy page (a public registry shows "Bykucutzz Barber Igor Bykowski"). Client to confirm what to print.
- **How to find LU11** (entrance / which building / parking). Useful for the location panel. TO PROVIDE.
- **Per-barber Booksy deep links:** not determinable. Use the main URL.

---

## 4. CREATIVE DIRECTION

**Concept: "Światło nad fotelem" (light over the chair).** The single most characteristic thing in BYKUCUTZZ's world is the hexagonal LED ceiling: it's in every interior and even in the proof photos (`cut 3`, crew door). The site borrows it as its **only graphic device**: white LED strokes that switch on with a tube-flicker, draw the structure of the page, and become dividers, the split line and the loader. Everything else is black space, huge wide type and real photography.

Concrete rules:
1. **Black is the canvas.** Near-black `#060708` with charcoal sections `#0E1012` used only to separate rhythm. One theme, never inverted.
2. **Type carries sections.** At least four sections are type-first (Manifest, Proof, Finale, Team). No section uses a card.
3. **LED line = the one graphic device.** 1.5 px white (`#F4FAFF`) strokes, hex-derived angles (60° / 120°). The lines are **always traced from real photo geometry** (hero ceiling, detail-bg ceiling) or are the straight continuation of such a trace. Never random decoration.
   **One deliberate exception, kept separate:** the Manifest background is a **decorative procedural honeycomb** (`HexGrid`, generated in code, not a trace and not built from `led-traces.json`). It only lives behind the Manifest and the salons intro, in the CTA cyan. The photo-traced LEDs (loader/hero, Przestrzeń) and their data stay untouched and remain the brand's real-ceiling device.
4. **Cyan is identity, not UI chrome.** It appears in: the logo extrusion, the primary booking button, the LED "ignition pulse", focus rings and the active state in Pricing. Max ~5% of any viewport.
5. **Photography roles:** generated interiors = atmosphere (big, dark, cropped); real cuts = proof (sharp, never filtered beyond a slight level match); crew = humanity (warm, untreated).
6. **Shape lock:** radius 0 everywhere. Sharp rectangles, like the LED tubes. No pills, no shadows, no blur panels.
7. **Layout families (no repeats):** full-bleed poster (Hero), kinetic type (Manifest), split interface (Salons), editorial menu (Pricing), image+overlay geometry (Przestrzeń), giant-name index (Ekipa), asymmetric collage (Robota), number sequence (Proof), marquee (Opinie), photo + short copy (Crew), single-action poster (Finale), information footer (Kontakt).
8. **Copy voice:** short, spoken, Łódź-casual, confident. Sentence case in body, caps only for display and buttons. Zero em-dashes in visible copy. No "pasja / misja / indywidualne podejście / najwyższa jakość / wyjątkowa atmosfera".

What it avoids: gold, barber poles (cropped out of `cut2`), cigars, glassmorphism, glows (the LED is a crisp stroke, a 4-8 px blur at most during the pulse only), gradient blobs, rounded cards, eyebrow labels over every heading, bento.

---

## 5. TYPOGRAPHY SYSTEM

No fonts exist in the project.

**Recommendation: one family, Archivo (variable, OFL, Google Fonts), using its width axis `wdth 62-125` and `wght 100-900`.**
- Why: the logo's own tagline "JAKOŚĆ PONAD ILOŚĆ" is set in a wide, heavy grotesk. Archivo Expanded Black matches it closely, so the website's type grows out of the existing identity instead of competing with it. The width axis gives **wide** (statements, numbers) and **condensed** (long names, long Polish words on mobile) from one coherent family. Full Polish glyph support (ą ć ę ł ń ó ś ź ż) via latin-ext (verify all 18 in Phase 2).
- Body uses the same family at `wdth 100, wght 400`. It is very readable, and one family keeps the page from looking assembled.
- Self-host via `next/font/google` with `axes: ['wdth']`, subsets `latin`, `latin-ext`, `display: swap`.

**Optional paid upgrade** (only if budget allows): Druk Wide + Druk Condensed (Commercial Type) for display, keeping Archivo for body. It is more "campaign", but costs a web licence and carries mild streetwear-cliché risk. Not required.

**Hierarchy** (fluid `clamp`, rem):
| Token | Use | Size | Axis | Leading / tracking |
|---|---|---|---|---|
| `mega` | Hero words, 5098, finale | `clamp(4.25rem, 15vw, 17rem)` | wdth 125, wght 900 | 0.84 / -0.015em |
| `display` | Section statements | `clamp(2.75rem, 8vw, 9rem)` | wdth 125, wght 800 | 0.9 / -0.01em |
| `statement--compact` | Statements on the Manifest LED wall + salons intro heading (implemented as `.t-statement.t-statement--compact`) | `clamp(1.75rem, 4.5vw, 5.1rem)` (~65 px at 1440, 28 px on phones: "JEDEN STANDARD." stays on one line at 375) | wdth 125, wght 800 | 0.98 / -0.01em |
| `names` | Team names, salon numerals | `clamp(4rem, 13vw, 14rem)` | **wdth 62-75**, wght 800 | 0.85 / 0 |
| `title` | Category names, salon names | `clamp(1.5rem, 2.6vw, 2.5rem)` | wdth 112, wght 700 | 1.05 / 0 |
| `price` | Prices | `clamp(1.5rem, 2.6vw, 2.5rem)` | wdth 100, wght 600, `tabular-nums` | 1 |
| `body-l` | Short supporting lines | 1.25rem | wdth 100, wght 400 | 1.45 |
| `body` | Body | 1.0625rem (17px) | wdth 100, wght 400 | 1.55, max 62ch |
| `meta` | Addresses, durations, review attribution | 0.875rem | wdth 100, wght 500 | 1.4 / +0.01em |
| `button` | CTAs | 0.9375rem | wdth 112, wght 700, caps | +0.04em |

Rules: display type is caps; body is sentence case. Never more than one `mega` per viewport. Each section's headline treatment differs (stacked, horizontal sliding lines, single word, number, giant names list). Mobile: switch long display words to `wdth 85-100` before shrinking the size (keeps the drama, avoids hyphenating Polish).

---

## 6. COLOR SYSTEM

Sampled from the assets: logo cyan `#61CCF0` exact; interior blacks average `#07090A`-`#080909`; in-photo cyan light averages `#3990A6`-`#6495B7`.

| Token | Hex | Role | Contrast note |
|---|---|---|---|
| `--ink` | `#060708` | Page background (matches interior blacks) | |
| `--carbon` | `#0E1012` | Alternate section ground, nav on scroll | |
| `--graphite` | `#1C2023` | Hairlines, inactive strokes | |
| `--steel` | `#8E969C` | Secondary text | ≈ 6.5:1 on ink (AA body) |
| `--bone` | `#EEF2F4` | Primary text (cool off-white, no cream) | ≈ 17:1 |
| `--led` | `#F4FAFF` | LED strokes only | |
| `--cyan` | `#61CCF0` | Brand accent: button fill, logo extrusion, focus, active | ≈ 10.9:1 on ink; ink-on-cyan text also ≈ 10.9:1 |
| `--cyan-deep` | `#2F8DB0` | Pressed button, cyan line at low intensity (sampled from photo light) | decorative only |

Button: `--cyan` fill, `--ink` text, 0 radius, `:hover` = ink text with a cyan inner 2 px LED stroke animating along the border. `:active` = `--cyan-deep` + 1 px down.
Image scrims: linear black scrims only where type sits (functional, max 70%), never coloured gradients.

---

## 7. FINAL PAGE ARCHITECTURE

The brief's standalone SALON 01 and SALON 02 sections (13 and 14) are **merged into the Two-Salon experience (§3 below)**, which is both the location section and the dedicated Salon 02 surface. Brief sections 19 + 21 are split so the crew photo is used exactly once.

| # | Section | id (nav) | Psych stage |
|---|---|---|---|
| 0 | Loader | | Attention |
| 1 | Hero: JAKOŚĆ PONAD ILOŚĆ | `#start` | Attention + proof glimpse |
| 2 | Manifest: NIE ROBIMY TEGO NA ILOŚĆ | | Identity |
| 3 | Dwa salony: DWA MIEJSCA. JEDEN STANDARD. → 01 / 02 split | `#salony` (nav: SALONY) | Desire + choice |
| 4 | Cennik | `#cennik` | Risk reduction |
| 5 | Przestrzeń: TO NIE JEST ZWYKŁY BARBER. | | Desire |
| 6 | Ekipa | `#ekipa` | Trust (people) |
| 7 | Robota | `#robota` | Proof (work) |
| 8 | 5098: social proof sequence | | Proof (scale) |
| 9 | Opinie: review marquee | | Proof (voices) |
| 10 | Crew moment: BYKUCUTZZ. | | Belonging |
| 11 | Finale: CZAS NA DOBRE CIĘCIE. | | Booking |
| 12 | Kontakt + footer | `#kontakt` | Logistics |

Nav: **SALONY · CENNIK · EKIPA · ROBOTA · KONTAKT** + **UMÓW WIZYTĘ**. (Note: the brief spells "ROBOTА" with a **Cyrillic А** twice. Use Latin "ROBOTA" in code.)

---

## 8. SECTION-BY-SECTION DESIGN

### 0. Loader
- **Purpose / feel:** "the lights just came on". Branded threshold, not a wait.
- **Content:** traced hex SVG (subset of the hero ceiling), logo SVG, "JAKOŚĆ PONAD ILOŚĆ" in live type.
- **Layout:** black. Hex outline drawn at **the exact position the ceiling occupies in the hero image** (same cover-box), logo centred below, tagline under it.
- **CTA:** none. Skippable (any key, click or scroll ends it).
- **Desktop:** full sequence ~1.4 s. **Mobile:** ~1.0 s, fewer hex segments (one cluster).
- **Repeat visits:** `sessionStorage` flag = skip within the session. `localStorage` "seen" = 0.5 s short version (lines + logo only). Reduced motion = no loader.

### 1. Hero
- **Purpose:** establish in 3 seconds: established, has identity, has proof, bookable now.
- **Psychology:** authority (5098), specificity (exact number, not "thousands"), scale ("2 salony"), immediate low-friction action.
- **Content (max 4 text elements, per the hero rule):** (1) tagline-as-H1 "JAKOŚĆ / PONAD / ILOŚĆ", (2) proof line "5,0 na Booksy. 5098 opinii.", (3) CTAs **UMÓW WIZYTĘ** (primary) + "Poznaj ekipę" (text link), (4) the signal "2 salony · Łódź" (anchor to `#salony`). The logo lives in the nav (`compact`), large on load (loader hand-off), shrinking into nav position.
  Semantic H1 (visually the tagline): "BYKUCUTZZ Barbershop Łódź. Jakość ponad ilość." (sr-only prefix).
- **Layout (desktop):**
  ```
  [logo]        SALONY  CENNIK  EKIPA  ROBOTA  KONTAKT        [UMÓW WIZYTĘ]
  ┌──────────── photo: LED ceiling untouched, top 40% ─────────────────────┐
  │                                                                        │
  │ JAKOŚĆ                                                                 │
  │ PONAD                                       5,0 na Booksy              │
  │ ILOŚĆ                                       5098 opinii                │
  │ [UMÓW WIZYTĘ]  Poznaj ekipę                 2 salony · Łódź ↓          │
  └────────────────────────────────────────────────────────────────────────┘
  ```
  Left-aligned mega type on the dark floor/wall (left 60%). The ceiling stays free: it is the composition's "sky". The proof block is plain typography, right-aligned to the same baseline as "ILOŚĆ". TV area darkened. `min-h-[100dvh]`.
- **Asset:** desktop `hero-interior`; mobile `chair-detail` (portrait) via `<picture>`.
- **Mobile:** full-height portrait chair image. Headline stacked at the bottom third (`wdth 110`, ~17vw), proof line below it, full-width primary CTA, "Poznaj ekipę" link, signal line. Nav = logo + small "UMÓW" + menu.

### 2. Manifest
- **Purpose:** turn the tagline into a belief. **Learn:** they choose quality on purpose. **Next:** see where.
- **Content:** "NIE ROBIMY TEGO / NA ILOŚĆ." then "ROBIMY TO / DOBRZE." (no paragraph).
- **Layout:** black, compact (~75vh on desktop). The whole background is **one continuous procedural LED wall** (`HexGrid`, flat-top honeycomb, reaching past every edge; the decorative exception in §4.3) that covers the Manifest **and runs on behind the salons intro** down to the salon panels, so no dark band is left between them. Unpowered it is a dark blue (`--color-cyan-deep`) outline; powered hexagons glow in the CTA cyan (`--color-cyan`) with one neon halo and a soft ambient blue that grows with the share of the wall that is on (see §9). A light radial veil and `.text-scrim` keep the type in front without killing the effect. It blends out of the hero's dark floor in a few pixels only. Line pairs offset: first pair left-aligned at the 1/12 column, second pair right-aligned at 11/12 (diagonal reading = movement). **One vertical LED line** enters at the bottom of the hero and runs down through the section's centre column (a grid column is centred on it); it is the thread that becomes the salon divider, and the light spreads out from it.
- **CTA:** none (the CTA is one scroll away, in the salon panels).
- **Mobile:** both pairs left-aligned, `wdth 90`. Smaller cells; the LED line runs down the right gutter (16 px in) and the grid is centred on it there.

### 3. Dwa salony (signature moment)
**Decisions (as the brief requires):**
1. **Placement:** directly after the Manifest, as screen 3. The visitor commits to the brand (Hero + Manifest), then chooses where.
2. **Hero connection:** the "2 salony · Łódź" signal anchors here. The Manifest's vertical LED line continues and **becomes the 01|02 divider**.
3. **How 01 and 02 differ:** 01 = eye-level, intimate, chairs in a row, mirror wall: "the workshop". 02 = elevated vantage over a vast loft, windows, stairs: "the flagship space". Each gets its own crop logic and a different text anchor: 01 text bottom-left, 02 text bottom-right, mirrored around the divider.
4. **Interaction:** see below.
5. **Mobile:** two stacked near-fullscreen panels (Option A).
6. **Conversion:** each panel has its own **UMÓW W TYM SALONIE** → that salon's `bookingUrl`, plus **Prowadź** (maps). The mobile sticky CTA learns the chosen salon.
7. **Later salon sections are removed.** Location details return only in Kontakt (compact).

- **Intro:** "DWA MIEJSCA. / JEDEN STANDARD." in `display`, centred on the LED line (the one centred composition on the page; the line justifies it); the two lines converge on it from opposite sides. Then a small line: "Wybierz swój salon." No min-height: it follows the Manifest directly, on the same LED wall (the intro has no background of its own; the opaque salon panels end the wall).
- **Panel content (directly on the image, no cards):** giant numeral `01` / `02` (`names` axis, bottom-anchored, bleeding off the panel edge, `--bone` at 92%), then above it: district (title), address + hours (meta, revealed on expand), CTA + Prowadź link.
- **Desktop behaviour:** both images are full-viewport layers. A single CSS variable `--split` (default 50%) drives `clip-path: inset()` on each layer and the divider's `translateX`. Hover / focus-within on 01 → `--split: 65%`; on 02 → `35%`. GSAP tweens the variable (0.9 s, `expo.out`); the images also scale 1.06 → 1.0 on the expanding side. A black scrim (left-bottom / right-bottom) deepens as a panel expands, so meta text fades in readable. Keyboard: each panel is a focusable `<article>`. Focus expands it. Tab reaches the CTA. Tablets without hover: tap = expand, second tap on CTA = book.
- **Single-salon fallback:** if Salon 02 is not `published` (§11), the section renders the intro "DREWNOWSKA 49A." with Salon 01 full width, the hero signal changes to "Drewnowska 49a · Łódź", and no "coming soon" claim appears unless the client confirms one.
- **Mobile:** intro, then panel 01 (`88svh`, image + numeral + district + address + hours visible by default + CTA), a horizontal LED line wipe, then panel 02. No hover states needed, everything visible. No carousel (a carousel hides half the choice).

### 4. Cennik
- **Purpose:** remove price uncertainty before desire peaks. **Learn:** what it costs and how long it takes. **Next:** book.
- **Content:** 4 groups (Strzyżenie, Combo, Broda, Junior Barber), all ~19 services visible (prices are short, so the menu is the design). For services with a Byku variant, a **second price column "z Byku"** (100 / 120, 120 / 140, 140 / 160). This is clear and makes Byku visibly premium without a separate section. Then "Pełny cennik na Booksy" + **UMÓW WIZYTĘ**.
- **Layout (desktop):** left 7 columns = editorial menu. Group names in `title`, rows = name ... duration ... price (tabular, right-aligned, one hairline per group, not per row). Right 5 columns = **a sticky image slot showing real work for the focused group**: Strzyżenie → `cut1`, Combo → `cut2`, Broda → `cut2` (beard crop), Junior → `cut 3`, Design row → `design`. The slot changes on hover/focus of a group (clip wipe), linking price to proof.
- **CTA:** primary at the end of the menu + Booksy link. Each row is **not** a button (avoids 19 CTAs).
- **Mobile:** groups as stacked blocks, a small 4:5 work image under each group heading, both price columns kept (it fits: "100 / 120 zł"). "Pełny cennik na Booksy" and the CTA follow.

### 5. Przestrzeń
- **Purpose:** desire for the place itself. **Learn:** this is a different kind of shop. **Next:** meet who works here.
- **Content:** "TO NIE JEST / ZWYKŁY BARBER." then three short lines: "Wpadasz. / Siadasz. / Wychodzisz dobrze ostrzyżony."
- **Layout (desktop):** `detail-bg` full-bleed, type on the empty black left half. **The hex in the image's top-left is traced as an SVG overlay**, registered to the photo, and draws on as the section enters (the motion language shown "for real"). `chair-detail` is not used here on desktop (it's the mobile hero). The three lines step down diagonally.
- **Mobile:** `detail-bg` cropped to `object-position: 70% 50%` (station + mirror light), with the type below the image on black, not on top of it (the image is too busy at phone width).

### 6. Ekipa
- **Purpose:** "who will cut my hair?" Trust through named people.
- **Psychology:** familiarity and choice; Byku as the founder/authority.
- **Content:** the 8 names. Byku first and largest, with "Strzyżenie z Byku od 120 zł" (fact from Booksy). Each other barber gets **one verified review that names them** (e.g. Ryan: "Ryan boss", Arek; Kacper: "Super strzyżenie, pełny profesjonalizm...", Sergiusz). No bios, no invented specialties. Plus "Recepcja" mentioned in Kontakt, not here.
- **Layout (desktop), as built: Byku + a honeycomb ring of hexagon portraits.** The business supplied portraits, so the planned giant-name index became the 8 portraits, each clipped to a regular **pointy-top hexagon** (`.hex-portrait`, CSS `clip-path`, `object-fit: cover`: never stretched; pointy-top keeps whole faces, a flat-top crop cut chins). **Byku is the large anchor on the left (≥1024 px)**: his big hexagon with name, the verified Booksy fact as his short line ("Strzyżenie Byku od … zł"; no role is invented), review, author and Booksy link below. **On the right, the other seven form a honeycomb ring: one in the middle, six around it** (middle: Kacper; around, clockwise from the top left: Kamil, Sandra, Kasim, Patryk, Ryan, Macias). The ring is exact: on 5 columns with step s = column + gap and a row step of 1.732 s, all six sit 2 s from the middle one at 60° steps, and each card's text hangs below its hexagon into a column with no hexagon there, so nothing overlaps. No connecting lines (any line through the ring would cross a caption). Grid placement only (`.lineup` in `globals.css`); the DOM order (Byku, then the crew in Booksy order) is unchanged. Name (`names`, condensed), the verified review, its author and "Umów się do …" (Booksy) stay **under** each hexagon, never inside it. A thin CTA-cyan outline (`#61CCF0`, SVG on the hexagon edge) is the only cyan here; it powers on like the LED tubes (hot flash, flicker, steady neon glow) **only while the pointer is over the hexagon itself** (the photo's `clip-path` is the hit area, so the corners of its box and the text below never trigger it) or when the barber's Booksy link has keyboard focus (`:focus-visible`).
- **CTA:** **UMÓW WIZYTĘ** next to the heading (desktop); on phones a booking tile closes the grid.
- **Mobile:** Byku as a wide lead row (his hexagon ~60% of the width, text beside it), the crew in 2 columns with the right column a quarter hexagon lower; all reviews visible (no hover needed); Byku stays the largest hexagon (the ring would be too small to read on a phone). Between 768 and 1023 px: Byku as a wide row at the top left (hexagon, text beside it), the same ring below.

### 7. Robota
- **Purpose:** the proof is the work. **Learn:** fades, beards, designs at a high standard.
- **Content:** "ROBOTA." + 4 photos + "Więcej na Instagramie @bykucutzz". Captions only as Booksy service names (Strzyżenie męskie, Combo, Design / Wzorek), to be confirmed by the client per photo.
- **Layout (desktop) asymmetric collage, 12-col:**
  ```
  ROBOTA.(mega, behind)
  [ cut 3  cols 1-6, 3:4, tall  ]   [ cut1 cols 8-12, 1:1 ]
                                    [ design cols 9-12, small ]
          [ cut2 cols 4-8, 4:5, overlapping cut3 bottom by -12vh ]
  ```
  Different scales, deliberate overlaps, the word "ROBOTA." set behind the images (z-order; images cover parts of the word).
- **Mobile:** vertical sequence with varied widths: cut3 100%, cut1 82% right-aligned, cut2 82% left, design 64% right. "ROBOTA." above, not behind.
- **Note:** 4 images is thin proof. Ask for 6-10 more (originals of Instagram posts); the layout accepts up to 8 by repeating the 2-row pattern once.

### 8. 5098 (social proof)
- **Purpose:** the strongest trust beat: scale + perfection + principle.
- **Content (sequence):** "5098" (mega) + "opinii na Booksy." → "5,0" + "5093 razy pięć gwiazdek." → "JEDNA ZASADA. / JAKOŚĆ PONAD ILOŚĆ." Link: "Sprawdź na Booksy".
- **Layout:** black, type only. Each beat replaces the previous one in place (desktop pin, ≤ 150vh total).
- **Mobile:** no pin. The three beats stack vertically with large spacing.

### 9. Opinie
- **Purpose:** turn the number into voices. Real, short, named.
- **Content:** 24-30 verified Booksy reviews, each "quote" + "Imię, o: [barber]". Quotes verbatim (typos preserved, no edits), max 3 lines.
- **Layout:** two horizontal tracks, row 1 → left, row 2 → right, quotes in `title` size separated by a small hex glyph (LED-white). This is **the page's only marquee**. No cards, no portraits, no stars per quote (the 5.0 is already established).
- **Accessibility:** continues on hover (per brief), but **pauses on keyboard focus** and has a visible "Zatrzymaj" toggle (WCAG 2.2.2). Reduced motion = static two-row wrap. Screen readers get a plain list.

### 10. Crew moment
- **Purpose:** "these are real people, a real team". Warmth after numbers.
- **Content:** crew photo + "BYKUCUTZZ." + "Przychodzisz po dobre cięcie. My robimy resztę." Small caption under the photo: "4000 opinii. Świętowaliśmy." (historical milestone, clearly not the live number).
- **Layout (desktop):** photo at true size (~520-560 px wide, 3:4) left of centre, straight (no rotation gimmick). Type to the right, bottom-aligned. Lots of black.
- **Mobile:** photo full-width minus gutters, type below.

### 11. Finale
- **Purpose:** remove everything except the decision.
- **Content:** "CZAS NA / DOBRE CIĘCIE." + **UMÓW WIZYTĘ** (large). With two published salons, the button is replaced by two buttons: "Bałuty, Drewnowska" and "[Salon 02 district]".
- **Layout:** near-fullscreen black. The LED line from the top of the page returns as a single horizontal tube above the headline and "ignites" when the section enters (bookending the loader).
- **Mobile:** same, full-width button(s). The sticky bar hides here (no duplicate).

### 12. Kontakt + footer
- **Content (verified only):** per salon: address, hours (with breaks), Prowadź (Google Maps directions to 51.782902, 19.447082), Booksy. Social: Instagram (Phosphor icon). Phone and Facebook render **only if provided** in config. Footer: logo `mono-white`, "Jakość ponad ilość.", legal line (TO PROVIDE), privacy link.
- **Layout:** desktop 3 columns (Salon 01, Salon 02 or "Godziny", Social/Booking). Mobile stacked. Map: link-out button, **no Google iframe** (performance + GDPR cookies). Optional later: a static monochrome map image.

### Global: Nav + mobile booking
- **Academy addition (2026-10-09):** original CUTZ ACADEMY logo links to `/cutz-academy` in the desktop/mobile navbar and mobile menu. The supplied native white transparent PNG retains its scissors, type and texture and is shown directly on the dark header. Shared homepage links use `/#…` and remain valid from every route. Academy uses a solid header immediately; no homepage loader or sticky booking bar. Its own training CTAs use Instagram `@cutzzacademy`, independently of the shared salon booking action. Since the later 2026-10-09 rework the Header has a route-based Academy variant on `/cutz-academy` (Academy logo first, smaller BYKUCUTZZ logo home, START / SZKOLENIA / PRAKTYKA / ZAPISY, "Zapytaj o szkolenie"); the salon links and Booksy stay on the barbershop variant.
- **Desktop nav:** 64 px, transparent over the hero, `--carbon` at 92% after the hero (solid, no blur). Logo compact left, links centre-right, cyan **UMÓW WIZYTĘ** right. **Always visible** (fixed to the top on desktop and mobile, in both scroll directions; the earlier hide-on-scroll-down was removed). Only the background changes, transparent → solid after the hero (GSAP ScrollTrigger, not a scroll listener). Anchor jumps land below it (`scroll-padding-top: var(--nav-h)`); z-index scale: nav 40 < sticky bar 45 < mobile menu 60 < loader 100.
- **Mobile nav:** logo + "UMÓW" text button + menu (full-screen black sheet with large links, IG icon, address).
- **Mobile sticky booking bar:** appears after the hero leaves the viewport, hidden over Salony panels (they have their own CTAs), Finale and the footer. One full-width cyan button, 56 px, with safe-area inset. With two salons: the first tap opens a 2-option bottom sheet ("01 Bałuty" / "02 ..."); the choice is remembered (localStorage), so the next tap goes straight to that salon's Booksy.

---

## 9. MOTION BLUEPRINT

**Vocabulary (the whole system, nothing else):**
- **A. LED ignite:** SVG stroke draw (DrawSVG) + a 2-step tube flicker (opacity 0 → 1 → 0.4 → 1 over 180 ms, steps) + a brief 6 px blur pulse on ignition only.
- **B. Mask rise:** display lines revealed by SplitText lines inside `overflow: clip` (yPercent 105 → 0, 0.9 s, `expo.out`, 0.08 s stagger). Statement variant (`data-reveal="slide"`): a fast, decisive slide out of the line masks (y 60 px → 0, blur 10 → 0 px, opacity 0 → 1, 0.55 s `power4.out`, 0.08 s stagger). It plays **every time** the statement enters the viewport (its top reaching 90% from below, or its bottom reaching 10% from above) and is reset only once the statement has left the viewport completely; type that is still on screen never replays or hides, and one paused tween per statement keeps fast scrolling from stacking timelines. The split keeps the exact unsplit height (no layout shift).
- **C. Clip open:** images open with `clip-path: inset()` + inner scale 1.06 → 1 (1.1 s).
- **D. Split:** `--split` variable tween (salons).
- **E. Count roll:** number tween with tabular figures (5098).
- **F. Marquee:** constant linear translate (reviews only).
Ease: `expo.out` for reveals, `power2.inOut` for the split, `none` for scrubbed timelines. Only `transform`, `opacity`, `clip-path` and SVG stroke properties animate.

| Section | Entrance | Scroll behaviour | Transition out | Reduced motion |
|---|---|---|---|---|
| Loader | Black. Hex segments ignite in sequence (A) over 0.6 s, logo `fill` mask-reveals, cyan extrusion pulses once, tagline rises (B) | none | The hex SVG stays put while the overlay fades, and the hero photo fades in **under** it, so the drawn lines land on the real ceiling (shared cover-box). Then the SVG fades (0.3 s). Logo FLIPs into the nav slot | No loader. Hero shown immediately |
| Hero | Continues from the loader: headline lines rise (B, 0.12 s stagger), proof + CTAs fade/rise last (by ~1.6 s total). The CTA is clickable from frame 1 of the hero | Photo moves at 0.85× scroll (subtle parallax, desktop only); the ceiling stays dominant | Bottom-of-ceiling vertical LED line draws downward as the hero leaves (scrubbed) | Static, all visible |
| Manifest | Line pairs slide out of their masks (B, statement variant) each time they enter the viewport, in either scroll direction; reset once fully off screen | **LED wall powering on** (no pin; Manifest top at 72% → intro bottom at 72% of the viewport): scroll progress decides which hexagons have power, as a wave down the wall and out from the LED line, cells slightly out of step. A hexagon that gets power ignites in real time like an LED: the tube flicker (A), a hot white-cyan flash, then a steady CTA-cyan neon glow. Scrolling up powers hexagons off (short fade). (Scrubbing the flash itself was tried and read as a soft sweep, not a power-on.) The vertical LED line extends with scroll progress | The line reaches the bottom and holds centre as the intro text arrives | Wall simply on in cyan (no flicker), static text, static line |
| Dwa salony | Intro heading (two-salon "DWA MIEJSCA…" or single-salon "DREWNOWSKA 49A.") slides in like the Manifest statements (B, statement variant, replays on re-entry). Desktop pin (≤100vh): the line "ignites" (A), then both images clip-open outward from the line (C) | After un-pin, normal scroll. Hover/focus split (D) | Panels scroll away normally; no exit effect | No pin, images visible, split jumps instantly (no tween) |
| Cennik | Group names mask-rise; rows fade in per group (one stagger, not per row) | Sticky image slot on desktop; slot swaps via a clip wipe on group focus | none | Instant swaps |
| Przestrzeń | Traced hex overlay ignites over the photo (A) as the section reaches 40% of the viewport; headline B; three lines step in | Photo scale 1.08 → 1 scrubbed across the section | Hex lines dim to 20% as Ekipa approaches | Static photo, lines drawn |
| Ekipa | Hexagon portraits entering together rise out of a blur on a quick stagger (`data-reveal="rise"`: y 40 px → 0, blur 8 → 0 px, 0.6 s `power3.out`, 0.06 s stagger, once); names and reviews fade in under them | Pointer over the hexagon itself (its `clip-path` is the hit area) or keyboard focus on the barber's Booksy link: the cyan outline powers on (hot flash, flicker, steady glow, ~0.55 s, CSS); on pointer hover the photo also eases in to 1.03× | none | Portraits static and visible; the outline lights on hover/focus without the flicker |
| Robota | "ROBOTA." mask-rises; each image clip-opens (C) on its own trigger, at different speeds (subtle depth: ±8% y-offset scrub) | Light parallax differences between tiles (desktop) | none | Static |
| 5098 | Desktop pin ≤150vh: count rolls 4000 → 5098 (E, nod to the balloons), then "5,0" + "5093", then "JEDNA ZASADA..." replaces it (B) | Scrubbed through the pin | Un-pin into the reviews | No pin, no count. Final numbers static |
| Opinie | Tracks fade in | Marquee (F) at ~40 px/s; row 2 reversed. Tracks pause when offscreen (IntersectionObserver) | none | Static wrapped list, no movement |
| Crew | Photo clip-opens (C); type rises | none | none | Static |
| Finale | Horizontal LED tube ignites (A); headline B; CTA appears last | none | none | Static, tube drawn |
| Nav / sticky | Nav fades in with the hero intro after the loader; sticky bar slides up from the bottom | Nav: always visible in both directions, background turns solid after the hero (no hide on scroll). Sticky bar: shown/hidden by section (see Global) | | Nav always visible, instant background change |

Global rules: all ScrollTriggers created inside `useGSAP` with `gsap.matchMedia()` for `(prefers-reduced-motion: no-preference)` and `(min-width: 1024px)` splits, so mobile gets lighter variants (no pins, no parallax). `ScrollTrigger.refresh()` after fonts load. Nothing animates offscreen.

---

## 10. CRO PLAN

The visitor's questions, answered in the order they arise:
| Question | Answered by | How |
|---|---|---|
| Are they any good? | Hero | "5,0 na Booksy. 5098 opinii." in the first viewport. Specific numbers beat adjectives |
| Is this my kind of place? | Hero, Manifest | Identity: streetwear tone, their own phrase, real interior |
| Where are they? | Hero signal → Dwa salony | Choice made early, while motivation is high (brand first, location second, as the client wants) |
| How much? | Cennik | All prices visible, "z Byku" column turns the founder into an upgrade, not a mystery |
| Who will cut me? | Ekipa | Named barbers, each backed by a real client's words |
| What does their work look like? | Robota | Real photos, connected back from Cennik |
| Can I trust them? | 5098 + Opinie + Crew | Scale → voices → faces |
| How do I book? | Every high-intent point | One action, always the same words |

**CTA placement (only at decision points):** nav (persistent), hero, each salon panel, end of Cennik, end of Ekipa, Finale, mobile sticky bar. Not in Manifest, Przestrzeń, Robota, 5098, Opinie, Crew (those build intent; the sticky bar covers mobile there).
**One label per intent:** "UMÓW WIZYTĘ" (generic), "UMÓW W TYM SALONIE" (location-specific), "Prowadź" (directions), "Pełny cennik na Booksy" (info). Nothing else.
**Friction:** Booksy opens in a new tab on desktop (keeps the site), same tab on mobile (Booksy's app/universal link takes over). Remembered salon choice cuts one step for returning taps.
**Risk reduction:** exact prices + durations, exact hours (with breaks), exact address with LU11 directions, "Na Booksy wybierzesz barbera".
**Measurement:** every booking link carries `data-cta="hero|salon-01|salon-02|cennik|ekipa|finale|sticky|nav"`. Track outbound clicks (Plausible recommended: no cookie banner needed) and UTM tags on Booksy URLs if Booksy preserves them.
**Optional later:** Booksy's embeddable booking widget (from Booksy Biz) could open booking in an overlay. Needs the owner's widget code. Evaluate only after launch metrics.

---

## 11. SALON 02 DATA MODEL

```ts
// content/salons.ts
type Verified<T> = { value: T; status: 'verified' } | { status: 'TO_PROVIDE' | 'TO_VERIFY'; note?: string };

interface Salon {
  id: 'salon-01' | 'salon-02';
  number: '01' | '02';
  published: boolean;               // false => panel + nav + finale button + contact column are not rendered
  name: Verified<string>;           // display name, e.g. "Bałuty"
  district: Verified<string>;
  address: Verified<{ street: string; unit?: string; postcode: string; city: 'Łódź' }>;
  hours: Verified<Array<{ days: string; ranges: string[] }>>;
  phone: Verified<string>;
  bookingUrl: Verified<string>;     // falls back to NOTHING (never to salon 01's URL silently)
  mapUrl: Verified<string>;
  coords: Verified<{ lat: number; lng: number }>;
  image: { src: string; alt: string; desktopPosition: string; mobilePosition: string };
  description: Verified<string>;    // optional one-liner, client-written
  directionsNote: Verified<string>; // e.g. how to find LU11
}
```

**Salon 01:** name/district "Bałuty" ✓, address ✓, hours ✓, coords ✓, bookingUrl ✓ (main Booksy), mapUrl ✓ (derived from coords), phone TO_PROVIDE, description TO_PROVIDE (optional), directionsNote TO_PROVIDE.

**Salon 02, every field TO_PROVIDE / TO_VERIFY:** existence + opening status, name, district, address, hours, phone, Booksy URL (separate Booksy profile or same profile with a location choice?), map/coords, team (shared or separate), confirmation that `salon2.png` shows this salon, description.
Image is the only filled field (`salon2.png`, pending confirmation).

**Rendering rules (enforced in code, not by convention):**
- A component only renders fields with `status: 'verified'`. A dev-only overlay lists unverified fields; production builds **fail** if a `published: true` salon has a TO_PROVIDE `address`, `hours` or `bookingUrl`.
- `published: false` for Salon 02 → single-salon layout variant, hero signal shows the address instead of "2 salony", finale shows one button, sticky CTA skips the picker.
- No "Wkrótce / coming soon" copy unless the client provides an actual status.

---

## 12. COMPONENT ARCHITECTURE

The tree below is the **original planned architecture**, not a literal file inventory. The implementation uses `src/data` rather than `src/content`, `src/styles/globals.css`, `Header` rather than `Nav`, and `scripts/build-assets.mjs`. Current routes include `src/app/cutz-academy/page.tsx` and `src/app/polityka-prywatnosci/page.tsx`. Academy uses `scripts/build-academy-assets.mjs` and a separate image manifest; full current structure and differences are in `PROJECT_CONTEXT.md` and `docs/CUTZ-ACADEMY.md`.

```
src/
  app/
    layout.tsx            lang="pl", Archivo via next/font (wdth axis), metadata, JSON-LD (HairSalon/BarberShop per published salon)
    page.tsx              server: composes sections in order
    globals.css           Tailwind v4 @theme tokens (colors, type scale, z-index scale), base, focus styles
  content/                single source of truth, typed
    business.ts           brand, booking URL, socials, stats { rating, reviews, fiveStar, asOf, sourceUrl }
    salons.ts             Salon[] (§11)
    services.ts           groups → services { name, price, bykuPrice?, duration, workImage? }
    team.ts               { name, isFounder?, reviewRef?, portrait? }
    reviews.ts            { text, author, barber, service, source: 'booksy' }
    work.ts               { src, alt, caption?, layout slot }
  lib/
    booking.ts            getBookingUrl(salonId?, cta) + data-cta + UTM
    verified.ts           helpers + build-time assertion
    gsap.ts               register plugins once, shared eases, matchMedia presets
    useRememberedSalon.ts
  components/
    brand/   Logo.tsx (SVG; variants full|compact|mono), LedPath.tsx (stroke primitive + flicker), HexTrace.tsx (registered overlay on a cover-box), CoverBox.tsx
    ui/      BookingButton.tsx, TextLink.tsx, IconLink.tsx, Price.tsx
    layout/  Nav.tsx (client), MobileMenu.tsx, MobileBookingBar.tsx (client), SalonPicker.tsx (sheet), Footer.tsx
    sections/
      Loader.tsx (client, inline SVG, CSS fallback auto-exit at 2.5 s)
      Hero.tsx (server) + HeroMotion.tsx (client leaf)
      Manifest.tsx
      salons/ SalonsSection.tsx, SalonSplit.tsx (desktop client), SalonStack.tsx (mobile), SalonPanel.tsx, SalonsIntro.tsx
      Pricing.tsx + PricingImageSlot.tsx (client)
      Space.tsx
      Team.tsx + TeamIndex.tsx (client)
      Work.tsx
      Proof.tsx (client leaf for count/pin)
      Reviews.tsx + Marquee.tsx (client, pause control)
      Crew.tsx
      Finale.tsx
      Contact.tsx
scripts/
  optimize-images.mjs     sharp: crops (cut2 pole crop, design crop), masters, AVIF/WebP sets
  trace-logo.mjs          potrace fallback → two-layer SVG
public/img/…              processed assets (no spaces in filenames)
docs/PHASE-1-BLUEPRINT.md
```
Server Components by default; every GSAP consumer is an isolated client leaf. Static markup is complete without JS (motion is progressive enhancement).

---

## 13. IMPLEMENTATION ORDER

1. **Scaffold:** Next.js + TS + Tailwind v4 + Archivo (verify Polish glyphs at all axis extremes) + tokens + base styles + focus ring.
2. **Content layer:** `content/*` with verified data, TO_PROVIDE markers, build-time assertion, booking helper.
3. **Asset pipeline:** crops, responsive sets, logo SVG (vector from client or traced), hero + detail-bg hex traces as SVG paths registered to the images.
4. **Static page, mobile first:** every section in final order with real content and no motion. This is also the reduced-motion version. Review on a 390 px phone and 1440 px desktop.
5. **Booking UX:** nav, mobile menu, sticky bar, salon picker, remembered salon, `data-cta`.
6. **Dwa salony interaction:** desktop split (clip-path + `--split`), keyboard/tap behaviour, single-salon fallback.
7. **Motion, in story order:** loader → hero hand-off → manifest line → salon pin/split → section reveals → 5098 → marquee → finale tube. Reduced-motion + `matchMedia` variants alongside each step.
8. **Quality pass:** Lighthouse (LCP < 2.5 s on 4G mobile, CLS < 0.1), keyboard-only run, screen reader pass, contrast audit, Polish copy audit (zero em-dashes, no AI phrasing), `impeccable` finish review.
9. **Data fill + launch:** client answers, more reviews and work photos, Salon 02 publish switch, deploy.

---

## 14. RISKS / OPEN QUESTIONS

**Blocking (needed before the affected part can ship):**
1. **Salon 02:** does it exist / when does it open, and what are its name, address, hours, phone and Booksy link? Until answered, the site ships in single-salon mode (fully designed, no fake data).
2. **Is `salon2.png` really the second barbershop?** The image shows no barber chairs or stations; it reads as a coworking/event loft. If it is a render or a different venue, using it as "Salon 02" would mislead.
3. **Barber portraits:** will individual photos be provided? The Ekipa section is designed to work without them, but the client should choose knowingly.

**Needed before launch, not blocking the build:**
- Logo vector (AI/SVG/PDF); otherwise traced from the 687 px JPEG.
- Original crew photo (current one is 640 px wide).
- 6-10 more real work photos (originals) + confirmation of captions.
- Phone number and Facebook page to publish, if any.
- Whether to show the Orły Fryzjerstwa 2026 gold medal.
- Legal entity line for the footer, privacy policy owner.
- How to find LU11 (entrance directions).
- Confirmation that the generated interiors depict Salon 01 (Drewnowska).
- Hosting: Vercel recommended (affects the image pipeline).

**Risks:**
- The generated interiors are 1672 px wide → soft on large retina screens. Mitigation: 2× upscale (honest for generated imagery), dark scrims, `mega` type over them.
- The review count goes stale. Mitigation: one `asOf` field + the "Sprawdź na Booksy" link; optionally show "5000+" between updates.
- Pinned sections can feel like scroll-jacking. Mitigation: only two pins, desktop only, each ≤ 1.5 viewports, never blocking the CTA.
- Loader vs LCP. Mitigation: the hero image loads in parallel (priority), the loader is ≤ 1.4 s, skippable, skipped on repeat sessions and under reduced motion.
