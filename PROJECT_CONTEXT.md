# PROJECT CONTEXT

Durable description of the project: what stays true between tasks. History of changes: `CHANGELOG_AI.md`; open work: `TASKS.md`; full design spec: `docs/PHASE-1-BLUEPRINT.md`.

## What it is
One-page site for BYKUCUTZZ Barbershop (Łódź, Drewnowska 49a, LU11), in Polish, dark streetwear look with an LED-hexagon motif. The only conversion is booking on Booksy. Second route: `/polityka-prywatnosci`.

## Stack and commands
- Next.js 16 (App Router, TypeScript, Turbopack), React 19, Tailwind CSS v4, GSAP 3 (ScrollTrigger, SplitText, `@gsap/react`), `@phosphor-icons/react`; `sharp` and `potrace` for assets.
- `npm run dev` (port 3000), `npm run build`, `npm run start`, `npm run lint` (= `tsc --noEmit`, no ESLint), `npm run assets` (builds `public/images` from `assets-src`).
- No automated tests: verification is lint, build and checks in a browser.

## Structure
- `src/app`: layout (fonts, JSON-LD, a boot script that sets `.js-motion` / `no-loader` before paint), page (section order), privacy page.
- `src/components/sections`: Hero, Manifest, Salons, Pricing, Space, Team (Ekipa), Work, SocialProof, Reviews, Crew, Finale, Contact.
- `src/components/brand`: Logo, LedTrace + `led-traces.json` (LED geometry traced from the salon photos), HexGrid (procedural LED wall), HexGlyph.
- `src/components/motion/MotionController.tsx`: the motion vocabulary, driven by data attributes (`data-reveal="lines|slide|fade|clip|rise"`, `data-led-draw`, `data-led-scrub`, `data-led-line`, `data-count`, `data-parallax` / `data-speed`).
- `src/data`: all content, typed. Facts are `verified` or `TO_PROVIDE`, never guessed; a published salon without its core facts fails the build.
- `src/styles/globals.css`: tokens (`--color-cyan` #61CCF0 is the CTA colour), type classes, section CSS.

## Conventions
- Motion runs only with `.js-motion` (absent under `prefers-reduced-motion` or without JS); then everything is visible and static.
- The hero loader plays once per browser session (`sessionStorage` `bk-loader`).
- The navbar is always visible (fixed to the top in both scroll directions); its background turns solid after the hero. Anchor jumps land below it (`scroll-padding-top: var(--nav-h)`). z-index scale: nav 40 < mobile sticky booking bar 45 < mobile menu 60 < loader 100.
- Salon 02 is unpublished; development shows a clearly marked preview (`NEXT_PUBLIC_SALON_02_PREVIEW`).

## Sections with custom behaviour (current state)
- **Booksy numbers (hero, social proof, Opinie, Crew):** one source, `site.stats` in `src/data/site.ts` (rating, reviews, five-star ratings, `asOf` shown in the footer, Booksy URL); never typed into components. Counters are displayed as confirmed minimums with a trailing "+" (`formatAtLeast`: "5098+", "5093+"); the 5,0 rating never gets one. In the social proof block the "+" is a separate, smaller, raised cyan element so the count roll (4000 milestone → today's value, once) still reads a plain number. Once rolled, the main review count itself beats calmly (`.review-pulse`, CSS: two soft beats with a light scale from its left edge and a faint cyan glow, then a rest; started by `data-counted`, which `MotionController` sets when a count finishes). Only that number moves; static under reduced motion. "Dziękujemy za każde zaufanie." sits under the counter.
- **Manifest + salons intro:** procedural LED wall (`HexGrid`) that powers on with scroll; compact statements with a repeatable slide reveal.
- **Ekipa:** 8 portraits clipped to pointy-top hexagons (`clip-path`, never stretched). ≥1024 px: Byku's large hexagon on the left as the anchor; on the right the other seven as a honeycomb ring, one in the middle (Kacper) and six around it at equal distance. 768–1023 px: Byku as a wide row on top, the ring below. Phones: Byku as a wide lead row, crew in 2 columns. Name, verified review, its author and the Booksy link sit under each portrait. A thin cyan LED outline powers on only while the pointer is over the hexagon itself or when the barber's Booksy link has keyboard focus.
