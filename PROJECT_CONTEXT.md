# PROJECT CONTEXT

Durable description of the project: what stays true between tasks. History of changes: `CHANGELOG_AI.md`; open work: `TASKS.md`; full design spec: `docs/PHASE-1-BLUEPRINT.md`.

## What it is
Polish site for BYKUCUTZZ Barbershop (Łódź, Drewnowska 49a, LU11), with a dark streetwear look and an LED-hexagon motif. Homepage conversion: booking on Booksy. `/cutz-academy`: a separate barber-training page, inquiries through official Instagram `@cutzzacademy`. `/polityka-prywatnosci`: privacy policy.

## Stack and commands
- Next.js 16 (App Router, TypeScript, Turbopack), React 19, Tailwind CSS v4, GSAP 3 (ScrollTrigger, SplitText, `@gsap/react`), `@phosphor-icons/react`; `sharp` and `potrace` for assets.
- `npm run dev` (port 3000), `npm run build`, `npm run start`, `npm run lint` (= `tsc --noEmit`, no ESLint), `npm run assets` (homepage assets), `npm run assets:academy` (Academy photos, logo and the Fade/Shape card crops, from untouched `assets-src`), `npm run assets:academy:videos -- "<folder with the mp4 originals>"` (Academy clips without re-encoding, posters, group still).
- No automated tests: verification is lint, build and checks in a browser.

## Structure
- `src/app`: layout (fonts, JSON-LD, a boot script that sets `.js-motion` / `no-loader` before paint), homepage (section order), `cutz-academy/page.tsx` + scoped `academy.css`, privacy page.
- `src/components/academy`: `AcademyGallery` (hero photo strip), `AcademyVideos` (clip tiles), `ProgramMedia` (Fade/Shape card photos and effects), `AcademyCta` (every training inquiry).
- `src/components/sections`: Hero, Manifest, Salons, Pricing, Space, Team (Ekipa), Work, SocialProof, Reviews, Crew, Finale, Contact.
- `src/components/brand`: Logo, LedTrace + `led-traces.json` (LED geometry traced from the salon photos), HexGrid (procedural LED wall), HexGlyph.
- `src/components/motion/MotionController.tsx`: the motion vocabulary, driven by data attributes (`data-reveal="lines|slide|fade|clip|rise"`, `data-led-draw`, `data-led-scrub`, `data-led-line`, `data-count`, `data-parallax` / `data-speed`).
- `src/data`: all content, typed. Facts are `verified` or `TO_PROVIDE`, never guessed; a published salon without its core facts fails the build. `academy.ts` uses client/profile-confirmed facts and a separate `academy-images.json` manifest.
- `src/styles/globals.css`: tokens (`--color-cyan` #61CCF0 is the CTA colour), type classes, section CSS.

## Conventions
- Motion runs only with `.js-motion` (absent under `prefers-reduced-motion` or without JS); then everything is visible and static.
- The hero loader plays once per browser session (`sessionStorage` `bk-loader`).
- The navbar is always visible (fixed to the top in both scroll directions); its background turns solid after the homepage hero and is solid from the start on subpages. One shared `Header` (and `MobileNavigation`) with two variants chosen by the route (`usePathname`, rendered on the server, no flash): the barbershop variant (BYKUCUTZZ logo, CUTZ ACADEMY logo link, salon links, "Umów wizytę" → Booksy) everywhere except `/cutz-academy`, which gets the Academy variant (Academy logo first, smaller BYKUCUTZZ logo as the link home, START / SZKOLENIA / PRAKTYKA / ZAPISY, "Zapytaj o szkolenie" → Instagram `@cutzzacademy`). Booksy is never the training CTA. Homepage anchors use `/#…` so they work from subpages. Anchor jumps land below it (`scroll-padding-top: var(--nav-h)`). z-index scale: nav 40 < mobile sticky booking bar 45 < mobile menu 60 < loader 100.
- Salon 02 is unpublished; development shows a clearly marked preview (`NEXT_PUBLIC_SALON_02_PREVIEW`).
- Read `AGENTS.md` before each task; update context, tasks and changelog after changes. The Phase 1 blueprint is a historical design proposal; this file and current code describe the implementation.
- No sitemap/robots files or production canonical domain are configured (`site.url` is null). Do not invent a deployment URL.

## CUTZ ACADEMY
- Static `/cutz-academy`, sections: hero (`#start`: logo, H1, one row of copy | CTA | strip controls, full-width strip of all 12 post-training photos) → "Szkolenia w praktyce" (`#szkolenia`: Fade Control / Shape Control cards with their photo effects, the four clips `#praktyka`, individual and group formats with photos of that format, details to confirm) → BYKUCUTZZ relationship (text) → Instagram inquiries (`#zapisy`). Shared Header (Academy variant) and Footer; no homepage Loader or sticky booking bar.
- Media, each used once on the page: 12 post-training photos in the strip; `academy5.jpg` (practice) for the individual format, also the homepage teaser; a still of `academy2.mp4` for the group format; 4:5 crops of the haircut photos `cut4.jpeg` (fade) and `cut6.jpeg` (shape) on the programme cards; four silent clips. Original logo PNG retained (trimmed/resized, no redraw). Responsive Next Image at quality 80.
- Motion: existing GSAP vocabulary (`slide`, `rise`, `fade`, `clip`, `data-led-line`) plus self-contained components: the strip (constant 34 px/s endless loop, no hover braking, drag 1:1 without inertia, eased return to autoplay, arrows, pause), clip tiles (play in view, click to pause/resume), Fade mask boundary and Shape outline draw. Reduced motion: native scroll strip, finished card states, clips start on click. `MotionController` skips homepage parallax only when `heroParallax={false}`.
- No assumed prices, dates, duration, group size, syllabus, certificates or instructor assignments. Missing offer details visibly require confirmation. Full audit and sources: `docs/CUTZ-ACADEMY.md`.

## Sections with custom behaviour (current state)
- **Manifest + salons intro:** procedural LED wall (`HexGrid`) that powers on with scroll; compact statements with a repeatable slide reveal.
- **Ekipa:** 8 portraits clipped to pointy-top hexagons (`clip-path`, never stretched). ≥1024 px: Byku's large hexagon on the left as the anchor; on the right the other seven as a honeycomb ring, one in the middle (Kacper) and six around it at equal distance. 768–1023 px: Byku as a wide row on top, the ring below. Phones: Byku as a wide lead row, crew in 2 columns. Name, verified review, its author and the Booksy link sit under each portrait. A thin cyan LED outline powers on only while the pointer is over the hexagon itself or when the barber's Booksy link has keyboard focus.
