# TASKS

Status as of 2026-10-09; details per change in `CHANGELOG_AI.md`. The 2026-10-08 work (`feature/cinematic-intro-section`) is merged into `main` (PR #1, `19ea293`). Local and not pushed: Booksy counters on `feature/booksy-opinie-plus` (`e7f05c9`), CUTZ ACADEMY on `codex/cutz-academy` (`58d2f1a`), both merged on `preview/integracja` in the main checkout `C:\Users\lukas\Documents\bykucuttz-demo`, the local preview at `http://localhost:3000` (workflow rules: `AGENTS.md`).

## Local integration preview (`preview/integracja`)
- [x] Backups of both worktrees (tracked diffs and untracked files, SHA-256 verified) outside the repository before any Git change.
- [x] Local commits after `git diff --check`, file review and a secret/asset check: `e7f05c9` (Booksy) and `58d2f1a` (Academy: code, docs, optimized images, four clips; `assets-src` originals not tracked). Commit security review: no issues.
- [x] `preview/integracja` from `feature/booksy-opinie-plus`, `codex/cutz-academy` merged into it. Conflicts only in `CHANGELOG_AI.md` and `TASKS.md`, resolved by hand (both entries kept); `MotionController.tsx` (`heroParallax` + `data-counted`), `globals.css` (Academy navbar/teaser classes + Booksy block), `PROJECT_CONTEXT.md` and the blueprint merged automatically and were checked.
- [x] `AGENTS.md`: single preview checkout and multi-agent rules; `CLAUDE.md` points to it.
- [x] Lint, build and browser checks of the integrated state at `http://localhost:3000` (homepage and `/cutz-academy`, 1440 and 390 px): both navbar variants, Booksy and the "5098+" heartbeat, hero/LED/HexGrid, Ekipa, both salons in the dev preview, Academy strip, clips and CTAs; no console errors, no horizontal overflow.
- [x] Integration merge committed locally on `preview/integracja` (separately approved; no push).
- [ ] Bring both features into `main` through separate pull requests (push not authorised yet). The second one needs the same `CHANGELOG_AI.md` / `TASKS.md` / `PROJECT_CONTEXT.md` merge as here. Afterwards switch the preview checkout to `main` and retire `preview/integracja`.
- [ ] Port 3000: another local project ("Lead Finder", `node server/app.js`) used to listen on IPv4 `0.0.0.0:3000` next to Next.js on IPv6; it stopped during the integration (not by an agent), so `localhost` and `127.0.0.1` now both reach the BYKUCUTZZ preview. If Lead Finder is started again, give it another port.
- [ ] Stop the Codex preview servers (3001: old production build, 3002: dev) once the integrated preview is accepted; remove the Codex worktree only after `codex/cutz-academy` is merged into `main`.

## Booksy counters (`feature/booksy-opinie-plus`), done, awaiting review
- [x] Counters shown as confirmed minimums ("5098+", "5093+") in the hero, social proof, Opinie and Crew; the 5,0 rating, data values and `asOf` unchanged.
- [x] The main review count "5098+" itself beats calmly after its roll (light scale + faint cyan glow, nothing else moves; the earlier heart icon was removed); "Dziękujemy za każde zaufanie." under the counter; static under reduced motion.
- [x] Lint, build, `git diff --check`, browser tests at 1440/1280/1024/768/390/375 incl. reduced motion.
- [x] Committed locally (`e7f05c9`); no push, merge into `main` or deployment.
- [ ] Review and pull request into `main`.
- [ ] Re-read the Booksy profile from time to time and update `site.stats` together with `asOf` (the "+" does not replace that date).

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
- [x] Committed locally (`58d2f1a`): code, docs, `public/images/academy`, `public/videos/academy`; no push, merge into `main` or deployment.
- [ ] Client review of the page and logo treatment.
- [ ] Confirm the use of the `cut4` / `cut6` haircut photos on the Fade / Shape Control cards.
- [ ] Supply a real photo of a group class (the group format currently shows a still of `academy2.mp4`).
- [ ] Confirm which clip belongs to which programme before any clip is labelled Fade or Shape Control.
- [ ] Decide on `assets-src/podpisywanie.mp4` (CUTZ certificates being signed, participant names legible): unused until the certificate policy and the participants' consent are confirmed.
- [ ] Confirm prices, dates, duration, syllabus, group sizes, exact venue, course instructors and certificate policy before publishing any of those facts.
- [ ] Provide a production domain for sitemap/canonical configuration (no existing sitemap/robots setup).
- [ ] Decide whether any `assets-src` originals should eventually be tracked (Academy photos, clips, `cut4–6`; none committed so far; `npm run assets:academy` needs them locally).

## Previous homepage work: merged
- [x] Manifest LED wall (`HexGrid`): procedural honeycomb behind the Manifest and the salons intro, LED power-on driven by scroll, CTA cyan, reduced-motion fallback.
- [x] Manifest + salons intro typography and spacing (`.t-statement--compact`, tighter gaps, no layout shift on split).
- [x] Repeatable statement reveal (`data-reveal="slide"`): replays on every viewport entry, resets only off screen, incl. the single-salon heading.
- [x] Ekipa hexagon portraits: 8 pointy-top hexagons, cyan LED outline, `rise` entrance, mobile 2 columns.
- [x] Ekipa composition: Byku's large hexagon on the left, the other seven as a honeycomb ring on the right (1 in the middle, 6 around; tablets: Byku on top, ring below; phones: simple 2-column layout); the LED outline reacts only to the pointer over the hexagon (clip-path hit area) or keyboard focus on the barber's Booksy link.
- [x] Navbar always visible: hide-on-scroll-down removed; background still turns solid after the hero.
- [x] Hero LED animation check: no code regression (identical to `origin/main`); the loader plays once per browser session by design.

## Open decisions / follow-ups
- [x] Review the branch and open a pull request into `main` (merged as PR #1, `19ea293`).
- [ ] Photos `assets-src/cut4.jpeg`, `cut5.jpeg`, `cut6.jpeg` (not committed): `cut4` and `cut6` are cropped for the Academy programme cards (`public/images/academy/fade.webp`, `shape.webp`); `cut5` is unused.
- [ ] Hero loader: keep "once per browser session" or play it on every visit (owner's call; not changed).
- [ ] Next.js dev warnings when the page is opened scrolled down: `salon-01.webp` / `space-detail.webp` detected as LCP (pre-existing image settings, not changed).
- [x] Blueprint introduction/§1 corrected; original planning sections marked historical and current Academy architecture documented.
- [ ] Data still to be provided by the business (unchanged): Salon 02 details, phone, legal entity for the privacy policy, individual Booksy staff links.
