# TASKS

Status as of 2026-10-09. Previous `feature/cinematic-intro-section` work is committed, pushed and merged into `origin/main` (`19ea293`). Academy is implemented locally in the approved isolated worktree, branch `codex/cutz-academy`, not committed. Details: `CHANGELOG_AI.md` and `docs/CUTZ-ACADEMY.md`.

## CUTZ ACADEMY: done locally, awaiting review
- [x] Read project documentation and Git state before changes; isolate from earlier untracked photos with user approval.
- [x] Audit the initial 12 photos/logo JPEG and late-added practice photo/native transparent logo PNG; produce 13 WebP masters and an optimized native PNG without redrawing the supplied mark.
- [x] Separate static `/cutz-academy`, own metadata, semantic headings, photo alt text, shared design tokens and GSAP reveals.
- [x] Clickable Academy logo in desktop/mobile navbar and mobile menu; homepage anchors preserved and navbar remains fixed.
- [x] Individual/group offer, beginner-to-advanced scope, Łódź, gallery, BYKUCUTZZ relationship and two Instagram inquiry CTAs.
- [x] No invented course facts, named instructors, backend, form, integration or new dependencies.
- [x] `npm run lint`, `npm run build`, responsive/navigation/menu/photo checks; reduced-motion code review.
- [x] Update project context, changelog, tasks and blueprint; add README, durable AGENTS rules and Academy audit.
- [x] Four silent clips (`academy4` added) as autoplay media tiles: muted, looped, inline, no controls, click to pause/resume, off-screen pause with resume on re-entry unless paused by hand.
- [x] Hero: logo, H1 (2 lines desktop/tablet, 3 on phones), one aligned row of copy | CTA | strip controls, full-width strip of all 12 post-training photos; separate "Ludzie. Kolejne kroki." section removed (no duplicated photos).
- [x] Photo strip: constant speed, no braking on hover, drag 1:1 without inertia, smooth return to autoplay, arrows, pause, seamless loop, reduced-motion native scroll.
- [x] "Szkolenia w praktyce": Fade Control / Shape Control cards with technique effects (fade mask, shape outline), four clips in one row, individual and group formats with photos of that format.
- [x] Separate Academy navbar: route-based variant of the shared Header and mobile menu (Academy links, Instagram CTA, BYKUCUTZZ logo as the way home); homepage navbar and Booksy unchanged.
- [x] Browser tests at 1440/768/390/375 on the dev server and a production build, incl. emulated `prefers-reduced-motion`.
- [ ] Client review of the page and logo treatment.
- [ ] Confirm the use of the `cut4` / `cut6` haircut photos on the Fade / Shape Control cards.
- [ ] Supply a real photo of a group class (the group format currently shows a still of `academy2.mp4`).
- [ ] Confirm which clip belongs to which programme before any clip is labelled Fade or Shape Control.
- [ ] Decide on `assets-src/podpisywanie.mp4` (CUTZ certificates being signed, participant names legible): unused until the certificate policy and the participants' consent are confirmed.
- [ ] Restart the earlier preview server on port 3001 after the latest build if it is still running (it serves the old build).
- [ ] Confirm prices, dates, duration, syllabus, group sizes, exact venue, course instructors and certificate policy before publishing any of those facts.
- [ ] Provide a production domain for sitemap/canonical configuration (no existing sitemap/robots setup).
- [ ] Review which source files should eventually be tracked; no commit/push/deployment authorized for this task.

## Previous homepage work: merged
- [x] Manifest LED wall (`HexGrid`): procedural honeycomb behind the Manifest and the salons intro, LED power-on driven by scroll, CTA cyan, reduced-motion fallback.
- [x] Manifest + salons intro typography and spacing (`.t-statement--compact`, tighter gaps, no layout shift on split).
- [x] Repeatable statement reveal (`data-reveal="slide"`): replays on every viewport entry, resets only off screen, incl. the single-salon heading.
- [x] Ekipa hexagon portraits: 8 pointy-top hexagons, cyan LED outline, `rise` entrance, mobile 2 columns.
- [x] Ekipa composition: Byku's large hexagon on the left, the other seven as a honeycomb ring on the right (1 in the middle, 6 around; tablets: Byku on top, ring below; phones: simple 2-column layout); the LED outline reacts only to the pointer over the hexagon (clip-path hit area) or keyboard focus on the barber's Booksy link.
- [x] Navbar always visible: hide-on-scroll-down removed; background still turns solid after the hero.
- [x] Hero LED animation check: no code regression (identical to `origin/main`); the loader plays once per browser session by design.

## Open decisions / follow-ups
- [x] Previous branch merged into `main` by PR #1 (`19ea293`, observed after fetch on 2026-10-09).
- [ ] Photos `assets-src/cut4.jpeg`, `cut5.jpeg`, `cut6.jpeg` (not committed): `cut4` and `cut6` are now cropped for the Academy programme cards (copied into the Academy worktree); `cut5` is unused.
- [ ] Hero loader: keep "once per browser session" or play it on every visit (owner's call; not changed).
- [ ] Next.js dev warnings when the page is opened scrolled down: `salon-01.webp` / `space-detail.webp` detected as LCP (pre-existing image settings, not changed).
- [x] Blueprint introduction/§1 corrected; original planning sections marked historical and current Academy architecture documented.
- [ ] Data still to be provided by the business (unchanged): Salon 02 details, phone, legal entity for the privacy policy, individual Booksy staff links.
