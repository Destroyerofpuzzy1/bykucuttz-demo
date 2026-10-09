# CHANGELOG (AI-assisted changes)

Changes made with an AI coding assistant, newest first. The 2026-10-08 entries were committed on `feature/cinematic-intro-section` and merged into `main` (PR #1, `19ea293`). The 2026-10-09 entry is local and uncommitted on `feature/booksy-opinie-plus`, branched from `origin/main`. (CUTZ ACADEMY is developed separately on `codex/cutz-academy` in its own worktree.)

## 2026-10-09

### Booksy counters as confirmed minimums, a heartbeat on the review count, thanks line
- Status: done, tested, not committed. New branch `feature/booksy-opinie-plus` from `origin/main` (same tree as the merged `feature/cinematic-intro-section`; no files changed by the switch).
- Source of the numbers, unchanged: `site.stats` in `src/data/site.ts`, read from the Booksy profile on 2026-10-06 (`asOf`, shown in the footer as "stan na 6 października 2026"): rating 5.0, reviews 5098, five-star ratings 5093. Checked before relabelling: 5098 is the total number of reviews and 5093 the number of 5/5 ratings (recorded distribution 5★ 5093 + 4★ 2 + 3★ 1 + 2★ 1 + 1★ 1 = 5098, `docs/PHASE-1-BLUEPRINT.md`).
- Counters are shown as confirmed minimums with a trailing "+" (`formatAtLeast` in `src/lib/utils.ts`): hero "5098+ opinii"; social proof "5098+" and "5093+" (the "+" is smaller, raised and CTA cyan, in its own element, so the 4000 → 5098 count roll still reads a plain number); Opinie "5,0 na Booksy, 5098+ opinii"; Crew caption "Dziś jest ich 5098+."; screen-reader summary "5098+ opinii na Booksy, średnia ocena 5,0, 5093+ ocen pięciogwiazdkowych". Unchanged: the 5,0 rating (not a counter), the historical 4000 milestone, the data values, `asOf`, the count roll; no automatic incrementing. The page description already says "ponad 5000 opinii" and was left as is.
- Heartbeat on the number itself, only there: once the main review count has rolled to 5098 (`MotionController` now marks a finished count with `data-counted`), "5098+" (`.review-pulse`) beats like a calm pulse. CSS keyframes, 2.4 s cycle: two soft beats (scale 1.026, then 1.015, from its left edge so it stays aligned with the label) with a faint cyan glow (text-shadow, alpha 0.34 at the peak), then a rest with no glow. Nothing else in the section moves (label, thanks, right column), the hero count stays static; static under `prefers-reduced-motion` (no roll, no beat). A first version put a small pulsing heart icon under the number; it was removed at the client's request so that only the number beats.
- Thanks line "Dziękujemy za każde zaufanie." under "opinii na Booksy", plain and discreet, read by screen readers (the visual number block stays `aria-hidden`, summarised by the hidden heading).
- Layout: at ≥1024 px the rating / five-star list spans five grid columns instead of four (starts one column earlier, still flush right), because "5093" already filled its 201 px cell and the "+" wrapped onto a second line; `whitespace-nowrap` keeps a "+" from ever wrapping alone. Typography and section order unchanged.
- Files: `src/lib/utils.ts`, `src/data/site.ts` (comment only), `src/components/sections/SocialProof.tsx`, `Hero.tsx`, `Reviews.tsx`, `Crew.tsx`, `src/components/motion/MotionController.tsx` (one line: `data-counted` when a count finishes), `src/styles/globals.css` (new SOCIAL PROOF block), `CHANGELOG_AI.md`, `TASKS.md`, `PROJECT_CONTEXT.md`, `docs/PHASE-1-BLUEPRINT.md`.
- Tests: `npm run lint`, `npm run build`, `git diff --check` passed. Production build (`next start`) in headless Chrome at 1440, 1280, 1024, 768, 390 and 375 px: "5098+" and "5093+" each on one line with the "+" right after the number; list content inside its cells (231 / 258 px at 1440, 165 / 177 at 1024, 112 / 160 at 375) and flush with the container edge; hero "5098+ opinii" on one line; count roll 4000 → 5098 with the "+" visible throughout. Heartbeat (1440/390/375): no beat during the roll, beat after it; the only animated element in the section is "5098+"; scale 1–1.026, two beats per cycle, at most 0.0023 per frame (smooth); left edge drift 0 px, label below unmoved, peak right edge inside the container; glow only at the beats. No horizontal overflow, CLS 0, no console errors. Emulated `prefers-reduced-motion`: the counter shows 5098 at once and does not beat.

## 2026-10-08

### Navbar always visible
- Status: done, tested, awaiting review.
- Removed only the hide-on-scroll-down mechanism from `Header.tsx` (the `hidden` state set from the ScrollTrigger direction and the `-translate-y-full` class). The bar stays fixed at the top in both scroll directions on desktop and mobile; the transparent → solid background change after the hero, the logo, links, "UMÓW WIZYTĘ", the mobile menu and the loader hand-off are unchanged.
- Anchor jumps already land below the bar (`scroll-padding-top: var(--nav-h)`); z-index scale unchanged (nav 40 < sticky bar 45 < mobile menu 60 < loader 100).
- Tested at 1440/390/375: visible at every scroll position down and up, during 20 fast jumps, over the Manifest LED wall; menu navigation (desktop link and mobile menu) lands with the section heading below the bar; mobile menu opens above the bar and closes on a link; no overflow, no errors.
- Files: `src/components/layout/Header.tsx`, `docs/PHASE-1-BLUEPRINT.md`, `PROJECT_CONTEXT.md`.

### Ekipa: Byku on the left + honeycomb ring of the crew (supersedes the "Byku in the centre" layout below)
- Status: done, tested, awaiting review.
- ≥1024 px: Byku's large hexagon on the left (name, his Booksy price line, review, author, Booksy link below); on the right the other seven as an exact honeycomb ring: Kacper in the middle, Kamil, Sandra, Kasim, Patryk, Ryan, Macias around him (all at the same distance, 60° apart; measured spread 0 px). Text stays under every hexagon; a collision test found no caption touching a hexagon or another caption. 768–1023 px: Byku as a wide row on top, the ring below. Phones: unchanged simple layout (Byku first and largest, crew in 2 columns).
- Hover stays limited to the hexagon itself (clip-path hit area) plus keyboard focus on the barber's link; re-tested.
- Section height at 1440: 1174 → 1314 px. No connecting lines: any line through the ring would cross a caption.
- Unchanged: names, reviews, authors, Booksy links, colours, HexGrid, hero, other sections.
- Files: `src/components/sections/Team.tsx`, `src/styles/globals.css` (TEAM LINEUP), `docs/PHASE-1-BLUEPRINT.md`, `PROJECT_CONTEXT.md`, `TASKS.md`.

### Ekipa: Byku in the centre, LED outline only over the hexagon
- Status: done, tested, awaiting review.
- Desktop (≥1280 px): Byku's large hexagon sits in the middle across two rows (exactly centred on the page); the crew stand around him: three on the left (the outer one between the rows, a triangle pointing at him), four on the right (2 × 2, outer column a quarter hexagon lower). Grid placement only, DOM order unchanged. Section height at 1440: 994 → 1174 px (allowed: desktop richer); 768–1279 px and mobile layouts unchanged.
- Hover: the outline and the photo zoom react only to the pointer over the hexagon itself (the photo's `clip-path` is the hit area), no longer to the whole card or the text below. Keyboard focus on the barber's Booksy link (`:focus-visible`) still lights it; a mouse click on the link does not.
- Unchanged: names, reviews, authors, Booksy links, colours, HexGrid, hero, other sections.
- Files: `src/components/sections/Team.tsx`, `src/styles/globals.css` (TEAM LINEUP, hex portraits), `docs/PHASE-1-BLUEPRINT.md`, `PROJECT_CONTEXT.md` (new), `TASKS.md`.

### Ekipa: hexagon portraits
- Status: done, tested, awaiting review.
- The 8 portraits are clipped to regular pointy-top hexagons (CSS `clip-path`, `object-fit: cover`, no distortion; pointy-top chosen over flat-top because it keeps whole faces). Byku stays the larger, raised hexagon in the middle; every second crew portrait sits a quarter hexagon lower (honeycomb hint, visual offset only: the section did not grow, 1021 → 994 px at 1440, 2103 → 2063 px at 390).
- Thin CTA-cyan outline (SVG on the hexagon edge); on hover/focus it powers on like an LED (flash, flicker, glow), CSS only, without the flicker under `prefers-reduced-motion`.
- Entrance: new `data-reveal="rise"` (MotionController, `ScrollTrigger.batch`): portraits entering together rise out of a blur on a 0.06 s stagger. It replaces the rectangular `clip` reveal on these photos, which would have overwritten the hexagon mask.
- Mobile: Byku's lead row now 3:2, so his hexagon is larger than the crew's; crew in 2 columns, right column lowered.
- Unchanged: team data, reviews, Booksy links, other sections, HexGrid, hero.
- Files: `src/components/sections/Team.tsx`, `src/styles/globals.css` (TEAM LINEUP), `src/components/motion/MotionController.tsx`, `docs/PHASE-1-BLUEPRINT.md`, `TASKS.md`.

### Statement reveal: repeatable cinematic slide (Manifest + salons intro)
- Status: done, tested, awaiting review.
- `data-reveal="slide"` (MotionController): fast slide out of the line masks, y 60 px → 0, blur 10 → 0 px, opacity 0 → 1, 0.55 s `power4.out`, 0.08 s stagger.
- Plays every time a statement enters the viewport (top at 90% from below / bottom at 10% from above), resets only when it is completely off screen, replays on re-entry in both directions. One paused tween per statement plus a `shown` guard: no replay while visible, no stacked timelines on fast scroll.
- Covers "NIE ROBIMY TEGO NA ILOŚĆ.", "ROBIMY TO DOBRZE." and the salons intro heading, including the single-salon variant ("DREWNOWSKA 49A.").
- Files: `src/components/motion/MotionController.tsx`, `docs/PHASE-1-BLUEPRINT.md`.

### Typography and spacing of the Manifest and salons intro
- Status: done, tested.
- New `.t-statement--compact` (`clamp(1.75rem, 4.5vw, 5.1rem)`): about 27% smaller on desktop (89 → 65 px at 1440), 36 → 28 px on phones; `.t-statement` itself (used elsewhere) unchanged. Line breaks: "NIE ROBIMY / TEGO NA ILOŚĆ.", "ROBIMY TO / DOBRZE.", "DWA MIEJSCA. / JEDEN STANDARD." on desktop and on 375/390.
- Tighter gap between the statements (48 → 29 px desktop, 24 → 16 px mobile) and between the Manifest and the salons heading (208 → 130 px desktop, 128 → 104 px mobile); LED stretch (Manifest + intro) 1149 → 808 px at 1440 and 677 → 494 px on phones, still a full scroll sequence.
- Line masks of these statements keep the exact unsplit height (no layout shift on split; CLS 0).
- Files: `src/styles/globals.css`, `src/components/sections/Manifest.tsx`, `src/components/sections/Salons.tsx`, `src/components/motion/MotionController.tsx`.

### Manifest LED wall (`HexGrid`)
- Status: done, tested.
- Procedural flat-top honeycomb behind the Manifest that runs on behind the salons intro (decorative; not a photo trace, `led-traces.json` untouched). Dark blue tubes; scroll decides which hexagons have power, each powers on in real time (tube flicker, hot flash, steady CTA-cyan neon), scrolling up powers them off. `prefers-reduced-motion`: the wall is simply on.
- Files: `src/components/brand/HexGrid.tsx` (new), `src/styles/globals.css`, `src/components/sections/Manifest.tsx`, `src/components/sections/Salons.tsx`, `docs/PHASE-1-BLUEPRINT.md`.

### Hero LED animation: regression check
- Status: no code regression found. Hero, Loader, layout and `led-traces.json` are identical to `origin/main`; side-by-side tests show the same behaviour on both. The loader plays on the first visit of a browser session and is skipped on reloads in the same tab (`sessionStorage` `bk-loader`), by design.

### Earlier iterations on this branch (superseded)
- A single traced-ceiling crop above the Manifest, then repeated ceiling fragments behind it: both replaced by the procedural LED wall above.
