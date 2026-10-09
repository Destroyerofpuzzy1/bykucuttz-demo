# TASKS

Status as of 2026-10-09; details per change in `CHANGELOG_AI.md`. The 2026-10-08 work (`feature/cinematic-intro-section`) is merged into `main` (PR #1, `19ea293`). Current homepage work: `feature/booksy-opinie-plus` (uncommitted). CUTZ ACADEMY: separate worktree on `codex/cutz-academy` (uncommitted).

## Booksy counters (`feature/booksy-opinie-plus`), done, awaiting review
- [x] Counters shown as confirmed minimums ("5098+", "5093+") in the hero, social proof, Opinie and Crew; the 5,0 rating, data values and `asOf` unchanged.
- [x] The main review count "5098+" itself beats calmly after its roll (light scale + faint cyan glow, nothing else moves; the earlier heart icon was removed); "Dziękujemy za każde zaufanie." under the counter; static under reduced motion.
- [x] Lint, build, `git diff --check`, browser tests at 1440/1280/1024/768/390/375 incl. reduced motion.
- [ ] Review and commit when approved (no commit, push, merge or deployment so far).
- [ ] Re-read the Booksy profile from time to time and update `site.stats` together with `asOf` (the "+" does not replace that date).
- [ ] When this branch and `codex/cutz-academy` both land, merge their edits of `CHANGELOG_AI.md`, `TASKS.md` and `PROJECT_CONTEXT.md` (both change these files).

## Done, awaiting review
- [x] Manifest LED wall (`HexGrid`): procedural honeycomb behind the Manifest and the salons intro, LED power-on driven by scroll, CTA cyan, reduced-motion fallback.
- [x] Manifest + salons intro typography and spacing (`.t-statement--compact`, tighter gaps, no layout shift on split).
- [x] Repeatable statement reveal (`data-reveal="slide"`): replays on every viewport entry, resets only off screen, incl. the single-salon heading.
- [x] Ekipa hexagon portraits: 8 pointy-top hexagons, cyan LED outline, `rise` entrance, mobile 2 columns.
- [x] Ekipa composition: Byku's large hexagon on the left, the other seven as a honeycomb ring on the right (1 in the middle, 6 around; tablets: Byku on top, ring below; phones: simple 2-column layout); the LED outline reacts only to the pointer over the hexagon (clip-path hit area) or keyboard focus on the barber's Booksy link.
- [x] Navbar always visible: hide-on-scroll-down removed; background still turns solid after the hero.
- [x] Hero LED animation check: no code regression (identical to `origin/main`); the loader plays once per browser session by design.

## Open decisions / follow-ups
- [x] Review the branch and open a pull request into `main` (merged as PR #1, `19ea293`).
- [ ] New photos `assets-src/cut4.jpeg`, `cut5.jpeg`, `cut6.jpeg` were added outside this work and are not committed; not processed into `public/images` or used anywhere yet.
- [ ] Hero loader: keep "once per browser session" or play it on every visit (owner's call; not changed).
- [ ] Next.js dev warnings when the page is opened scrolled down: `salon-01.webp` / `space-detail.webp` detected as LCP (pre-existing image settings, not changed).
- [ ] `docs/PHASE-1-BLUEPRINT.md` §1 still says nothing is implemented; outdated, not changed.
- [ ] Data still to be provided by the business (unchanged): Salon 02 details, phone, legal entity for the privacy policy, individual Booksy staff links.
