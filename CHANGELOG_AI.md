# CHANGELOG (AI-assisted changes)

Changes made with an AI coding assistant, newest first. Branch: `feature/cinematic-intro-section`; the 2026-10-08 entries are committed together in one commit and pushed to `origin`.

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
