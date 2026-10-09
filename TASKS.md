# TASKS

Status as of 2026-10-09; details per change in `CHANGELOG_AI.md`. Integrated in `main`: the 2026-10-08 work (`feature/cinematic-intro-section`) through PR #1 (`19ea293`), and through PR #2 (merge commit `7502eb5`, from `feature/booksy-heartbeat-enhancement`) the Booksy counters (`e7f05c9`), CUTZ ACADEMY (`58d2f1a`), their integration merge (`f1dd9e8`) and the heartbeat refinement (`3a118ad`). The main checkout `C:\Users\lukas\Documents\bykucuttz-demo` currently uses `feature/hex-3d-backgrounds` (`9a87c6e`) and stays the local preview at `http://localhost:3000` (workflow rules: `AGENTS.md`). Production deployment: not confirmed. Claude's continued homepage work and the combined Academy hero/photo cleanup are included in the client-authorised feature commit (commit and push requested on 2026-10-09; no merge or deployment).

## Cleanup: logo cropping and dashes (working tree on `main`, not committed)
- [x] Root cause of the BYKUCUTZZ logo cropping (asset trace window) fixed and re-traced; Academy mark given a viewBox safe area; loader clip cleared after the wipe.
- [x] Every logo occurrence checked at 375-1920 (navbars, mobile menus, loader, footers, hero, teaser).
- [x] Visible dash separators removed (opening hours); postcode, verbatim review and "e-mail" kept.
- [ ] Client visual review. Commit / push: not authorised.

## Homepage micro-polish (working tree on `main`, not committed)
- [x] Facebook (client-supplied URL) in `site.socials`; Kontakt, footer, JSON-LD and the privacy policy read it from there.
- [x] Kontakt social block and Salon 01 links as ruled rows with cyan Phosphor icons and external arrows; cyan label rules.
- [x] Footer icon-only Instagram/Facebook signature with accessible names.
- [x] Shared link language (`.link-line` cyan rule, `.link-arrow`, `.link-icon`); nav link rule; Academy switch hover; Ekipa link arrow; Robota hover.
- [x] Lint, build, diff check; QA at 375/390/430/768/1366/1440/1920, hover/focus, touch targets, reduced-motion fallbacks.
- [ ] Client visual review. Commit / push: not authorised for this pass.

## CUTZ ACADEMY: white-dominant identity (working tree on `main`, not committed)
- [x] Read the docs and Git state; inspect the route, components, assets and how the logo was rendered (raster PNG via next/image).
- [x] Vector logo: traced from the supplied transparent PNG into one inline currentColor path; one `AcademyLogo` for navbar, hero, footer and the homepage (white there).
- [x] Scoped Academy palette under `.academy-theme`; paper/white/mist surfaces, ink type, blue only as a detail; one black band (clips).
- [x] Light navbar, mobile menu and footer variants; BYKUCUTZZ secondary in the Academy navbar.
- [x] Hero led by the mark; editorial programmes, featured clip layout, ruled formats, closing inquiry with one statement about unconfirmed details; numbered labels and "+" chips removed.
- [x] Black CTA system with a blue arrow; Instagram only.
- [x] Lint, build, diff check; QA at 375-1920 incl. reduced motion; homepage regression and client-side navigation checked.
- [ ] Client visual review (mark size, hero composition, the black clip band, closing section).
- [ ] Optional: the client's native vector logo, if one exists, can replace the traced path 1:1.
- [ ] Commit / push: not authorised for this task.

## Homepage PASS A1: simplification and booking flow (working tree on `main`, not committed)
- [x] Read AGENTS/context/tasks/changelog/industrial doc; `main` @ `37a0514`, clean tree before edits.
- [x] Remove BarberTools, HexLamps (SocialProof, Finale), NeonSign, SteelChain and their CSS; no replacement decoration. Mobile overflow (NeonSign ring) gone.
- [x] Merge SocialProof into Opinie (`Reviews`, `#opinie`): 5098+ / 5,0 + stars / 5093+ / marquee / one Booksy CTA; repeated tagline statement removed; numbers from `site.stats`.
- [x] Heartbeat: 3 cycles after the count roll, then still.
- [x] Academy teaser after Crew, before the Finale.
- [x] Barber links: "Wybierz {imię} na Booksy" (accusative forms in `team.ts`); Kasim's emoji-only review omitted.
- [x] Sticky bar clearance token (`--sticky-cta-h`) and bar hidden over the reviews CTA.
- [x] Lint, build, diff check; production-build QA at 375/390/430/768/1366/1440/1920 incl. emulated reduced motion; `/cutz-academy` unaffected.
- [ ] Client visual review (Crew without the sign, Finale without the lamp, merged Opinie hierarchy, teaser position).
- [ ] Evaluate the Manifest HexGrid separately (unchanged in this pass).
- [ ] Commit / push / pull request: not authorised for this pass.

## Industrial visual system: local continuation of Claude's work
- [x] Check Git/docs and idle project activity; create and verify an additional backup outside the repository.
- [x] Develop and visually inspect one representative scene first: real logo, steel sign frame, linked chains, mounting rail and rear hex lamp.
- [x] Extend the existing projected lamps with metal housings; keep wall/ceiling compositions different and static.
- [x] Add a clipper and shears in the Cennik header; keep prices and copy clear, including tablet/mobile.
- [x] Remove sign flicker, decorative parallax and obsolete styles/variant; retain Academy, Hero, HexGrid, Booksy/heartbeat and original assets.
- [x] Lint/build/diff check and responsive regression checks; repair the reproduced deep-scroll GSAP initialization error. Results and reduced-motion testing limits: docs/INDUSTRIAL-VISUAL-SYSTEM.md.
- [ ] Client visual review. Commit and push explicitly authorised on 2026-10-09; branch merge and deployment remain outside scope.

## CUTZ ACADEMY: combined local preview on port 3000
- [x] Client approved local integration without Git merge, branch switch or commit; both worktrees checked and backed up (52 SHA-256 verified files, including 25 untracked).
- [x] Integrate centred hero, new heading, logo/caption/copy/CTA, full-width strip with controls below/right, quick reveals and removal of the final CTA. #zapisy targets the hero.
- [x] Preserve clean Fade/Shape photos, accurate alt text, all Claude homepage source and existing data-neon code.
- [x] Lint, build, diff check and responsive/browser verification; reduced-motion boot/controller test plus code review, without browser preference emulation.
- [x] Reconcile current docs in both checkouts and retain all historical entries. Full approved version at http://localhost:3000/cutz-academy; Codex source at 3003 unchanged.
- [ ] Client review, followed by separately authorised Git operations/deployment if requested.

## CUTZ ACADEMY: plain Fade Control / Shape Control photos, done locally
- [x] Read the project documentation and Git state; verify that port 3000 serves the main checkout. Preserve existing uncommitted homepage changes and separate worktrees.
- [x] Replace the Fade duplicate-photo/mask/line and Shape SVG contour/guides/nodes with one plain Next Image per card; remove dedicated GSAP hooks and drawing CSS, including hover and reduced-motion exceptions.
- [x] Keep the same assets, crop, card layout, visible copy, links and other sections; update only Shape's alternative text to match the clean photo.
- [x] Lint, build, `git diff --check`; browser checks at 1440/768/390/375 px, both photos loaded, no overlays, image masks/filters, horizontal overflow or console errors.
- [x] Update `PROJECT_CONTEXT.md`, `docs/CUTZ-ACADEMY.md` and `CHANGELOG_AI.md`. Changes visible at `http://localhost:3000/cutz-academy`; server not restarted, ENV unchanged. No commit or push.

## Hex lamp ceiling accents (`feature/hex-3d-backgrounds`), done locally, not committed
- [x] Homepage assessed at 1440: Cennik (long text menu) and Finale (empty right half, free band above the LED tube) were the flattest black areas; Opinie (marquee), Kontakt (right after Finale) and the photo, HexGrid, Ekipa and heartbeat sections left alone; Academy untouched.
- [x] `HexLampCeiling`: perspective lamp panel modelled on the salon ceiling (frame + honeycomb of white tubes, connector gaps, tubes tapering and dimming with distance, soft cool glow), server-rendered SVG, placements `corner` and `overhead`, slight desktop parallax via `data-speed`.
- [x] Cennik: panel in the top-right corner beside the heading; Finale: wide panel above the LED tube. Hero, HexGrid, Academy, navbars, heartbeat, Ekipa and the CTAs unchanged.
- [x] `npm run lint`, `npm run build`, `git diff --check`; headless Chrome at 1440/768/390/375 and with reduced motion: no horizontal overflow, no console errors (only the known dev LCP warnings), lamps clear of the text, parallax desktop-only.
- [ ] Client review of the look (glow strength, panel size, the two placements).
- [ ] Commit and pull request into `main` (not authorised yet).

## Local integration preview (`preview/integracja`), merged into `main`
- [x] Backups of both worktrees (tracked diffs and untracked files, SHA-256 verified) outside the repository before any Git change.
- [x] Local commits after `git diff --check`, file review and a secret/asset check: `e7f05c9` (Booksy) and `58d2f1a` (Academy: code, docs, optimized images, four clips; `assets-src` originals not tracked). Commit security review: no issues.
- [x] `preview/integracja` from `feature/booksy-opinie-plus`, `codex/cutz-academy` merged into it. Conflicts only in `CHANGELOG_AI.md` and `TASKS.md`, resolved by hand (both entries kept); `MotionController.tsx` (`heroParallax` + `data-counted`), `globals.css` (Academy navbar/teaser classes + Booksy block), `PROJECT_CONTEXT.md` and the blueprint merged automatically and were checked.
- [x] `AGENTS.md`: single preview checkout and multi-agent rules; `CLAUDE.md` points to it.
- [x] Lint, build and browser checks of the integrated state at `http://localhost:3000` (homepage and `/cutz-academy`, 1440 and 390 px): both navbar variants, Booksy and the "5098+" heartbeat, hero/LED/HexGrid, Ekipa, both salons in the dev preview, Academy strip, clips and CTAs; no console errors, no horizontal overflow.
- [x] Integration merge committed locally on `preview/integracja` (`f1dd9e8`, separately approved); it reached GitHub later in the history of `feature/booksy-heartbeat-enhancement`.
- [x] Both features in `main`: not through separate pull requests as planned, but together with the heartbeat in PR #2 (merge commit `7502eb5`, 2026-10-09 09:40). `main` has exactly the tree tested on `3a118ad`.
- [x] Preview checkout switched to `main`: local `main` fast-forwarded `f50dd1c` → `7502eb5` (no reset, stash, force or merge commit; `assets-src` originals untouched).
- [ ] Docs sync after PR #2 on `docs/post-pr2-sync`: pull request into `main`, review, merge (not merged yet).
- [ ] Retire the merged branches (`preview/integracja`, `feature/booksy-opinie-plus`, `codex/cutz-academy`, `feature/booksy-heartbeat-enhancement`, locally and on `origin` where they exist): awaiting approval; nothing deleted so far.
- [ ] Port 3000: another local project ("Lead Finder", `node server/app.js`) used to listen on IPv4 `0.0.0.0:3000` next to Next.js on IPv6; it stopped during the integration (not by an agent), so `localhost` and `127.0.0.1` now both reach the BYKUCUTZZ preview. If Lead Finder is started again, give it another port.
- [ ] Stop the Codex preview servers (3001: old production build, 3002: dev) and remove the Codex worktree: possible now that `codex/cutz-academy` is in `main`, but only with the client's approval; not done.

## Booksy heartbeat enhancement (`feature/booksy-heartbeat-enhancement`, from `preview/integracja` `f1dd9e8`), done, merged into `main` (PR #2)
- [x] "5098+" beats clearly but calmly ("BAM BAM": 1.08 → 1.015 → 1.11 → 1, pause, 2.4 s) with a neon `#61ccf0` halo synced to each beat; starts after the count roll; static under reduced motion.
- [x] Small cyan heart inline before "Dziękujemy za każde zaufanie.", beating in lockstep with "5098+" (same trigger, timing and keyframes, slightly less scale, glow flaring together); the text and everything else in the section stay still.
- [x] Lint, build, `git diff --check`, browser tests at 1440/390/375 (dev preview and production build), incl. reduced motion, overflow and CLS.
- [x] Committed with the client's approval as `3a118ad` (`feat: refine Booksy heartbeat and synchronized heart animation`) and pushed (no force); commit and push security reviews: no findings.
- [x] Merged into `main` through PR #2 (merge commit `7502eb5`), together with the Booksy, Academy and integration commits in its history. No deployment.

## Booksy counters (`feature/booksy-opinie-plus`), done, merged into `main` (PR #2)
- [x] Counters shown as confirmed minimums ("5098+", "5093+") in the hero, social proof, Opinie and Crew; the 5,0 rating, data values and `asOf` unchanged.
- [x] The main review count "5098+" itself beats calmly after its roll (light scale + faint cyan glow, nothing else moves; the earlier heart icon was removed); "Dziękujemy za każde zaufanie." under the counter; static under reduced motion.
- [x] Lint, build, `git diff --check`, browser tests at 1440/1280/1024/768/390/375 incl. reduced motion.
- [x] Committed (`e7f05c9`); in `main` through PR #2 (no separate pull request). No deployment.
- [ ] Re-read the Booksy profile from time to time and update `site.stats` together with `asOf` (the "+" does not replace that date).

## CUTZ ACADEMY: in `main` (PR #2), awaiting client review
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
- [x] Committed (`58d2f1a`): code, docs, `public/images/academy`, `public/videos/academy`; in `main` through PR #2 (no separate pull request). No deployment.
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
- [ ] Production deployment: not confirmed. The repository has no hosting configuration and GitHub lists no deployments or commit statuses for `7502eb5`; whether a hosting service is connected outside the repository is unknown. Deploy only on the client's explicit instruction.
- [ ] Photos `assets-src/cut4.jpeg`, `cut5.jpeg`, `cut6.jpeg` (not committed): `cut4` and `cut6` are cropped for the Academy programme cards (`public/images/academy/fade.webp`, `shape.webp`); `cut5` is unused.
- [ ] Hero loader: keep "once per browser session" or play it on every visit (owner's call; not changed).
- [ ] Next.js dev warnings when the page is opened scrolled down: `salon-01.webp` / `space-detail.webp` detected as LCP (pre-existing image settings, not changed).
- [x] Blueprint introduction/§1 corrected; original planning sections marked historical and current Academy architecture documented.
- [ ] Data still to be provided by the business (unchanged): Salon 02 details, phone, legal entity for the privacy policy, individual Booksy staff links.
