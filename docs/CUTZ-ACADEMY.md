# CUTZ ACADEMY

Implemented locally on 2026-10-09, branch `codex/cutz-academy`, based on
`origin/main` (`19ea293`), in a separate Codex-managed worktree outside the main
checkout. Committed locally as `58d2f1a`; merged with the Booksy counters on
`preview/integracja` in the main checkout, the local preview at
`http://localhost:3000/cutz-academy`. Merged into `main` through PR #2 (merge commit
`7502eb5`, 2026-10-09) together with the Booksy work. No deployment, DNS or ENV
change was made; a production deployment has not been confirmed.

Current local version (2026-10-09): both approved corrections are combined in the
main checkout, feature/hex-3d-backgrounds, at http://localhost:3000/cutz-academy.
The centred hero/controls/quick reveals/final-CTA cleanup from the Codex worktree
was selectively integrated with the existing plain Fade/Shape photos. Claude's
homepage work was continued as the industrial visual system. The combined changes are included in the client-authorised feature commit; no Git branch merge or deployment.
The Codex code at port 3003 remains a reference version and still has the old photo overlays.

## Confirmed content and boundaries

Client instructions and the official [Instagram profile](https://www.instagram.com/cutzzacademy/),
read in the browser on 2026-10-09, confirm individual/group training, beginner to
advanced levels, Łódź and registration via private message. The profile's shared
posts with BYKUCUTZZ corroborate the brand relationship stated by the client.
No named barber is presented as an instructor. Post-specific course names or
durations were not generalized into the current offer.

Missing information: prices, dates, duration, syllabus, group sizes, exact training
venue, who leads each course and whether a certificate is issued. The offer visibly
marks its missing details as requiring confirmation at registration; the brand
section asks visitors to confirm the instructor directly. Certificates visible in
photographs are not presented as a promise of certification. No job guarantee.

## Route and design

`src/app/cutz-academy/page.tsx` is a static Server Component route with its own
title, description and Open Graph text. One H1, two H2s, offer H3s, semantic
sections, figures and descriptive image alt text. Page CSS is scoped to `.academy`
and uses the shared black/graphite/cyan tokens and Archivo font.

Current state (updated 2026-10-09, later the same day; the gallery/video layout described in
earlier notes was replaced):

1. Hero (`#start`), in order: centred H1 "Technika buduje przewagę." → the supplied Academy logo
   → centred "Szkolenia barberskie · Łódź" caption below it → short description of individual/group training,
   beginner-to-advanced scope and practice at the model → "Zapytaj o szkolenie" + the offer
   link → full-width strip of all 12 post-training photos (`AcademyGallery`). Controls sit
   below the photographs on the right, inside the carousel block: counter, pause, previous,
   next. The three buttons are 48 × 48 px and never cover faces. Below 640 px the counter
   sits above the button row; without motion only the two arrows remain. The hero stacks
   naturally on phones; "Poznaj ofertę" stays available. The upper container is centred,
   with a 56ch description, 16 px brand/copy spacing and an 8 px logo/caption gap. CTA and
   offer link sit side by side, centred, including at 375/390 px (compact 13/14 px link
   typography and 48 px heights). Flex wrapping handles narrower screens. The photo strip
   remains outside the centred container and keeps the full available viewport width.
   No training statistics are added.
2. "Szkolenia w praktyce" (`#szkolenia`): Fade Control and Shape Control cards (copy + a photo
   panel with a plain haircut photo, server component `ProgramMedia`), the four clips in one row (`#praktyka`,
   `AcademyVideos`), the individual and group formats with a photo of that format, and the note on
   details to confirm at registration (programme, date, duration, price, group size, venue,
   certificates).
3. Brand/instructors (`#prowadzacy`): relationship with BYKUCUTZZ as text, no assigned instructor
   roles, link to `/#ekipa`.
The complete final "Zrób kolejny krok" section is removed, including its description,
CTA, Instagram handle, homepage-return link, LED element and section-specific CSS.
The brand section ends with 40–64 px of bottom padding and is followed immediately
by the unchanged shared Footer. `#zapisy` now identifies the hero CTA group, so the
existing desktop/mobile navbar link works without a new bottom section.

**Navbar.** The shared `Header` and `MobileNavigation` pick their variant from the route
(`usePathname()`, rendered on the server, so the right variant is in the HTML). On
`/cutz-academy`: the Academy logo first and larger (`aria-current="page"`), a smaller BYKUCUTZZ
logo as the link home, START / SZKOLENIA / PRAKTYKA / ZAPISY (`/cutz-academy#start`, `#szkolenia`,
`#praktyka`, `#zapisy`) and the CTA "Zapytaj o szkolenie". The mobile menu shows the same links,
"Szkolenia barberskie · Łódź", `@cutzzacademy` and the CTA. Everywhere else the barbershop
variant is unchanged (salon links, "Umów wizytę" → Booksy). The navbar stays fixed in both scroll
directions; Academy uses the solid `page` style and no homepage Loader or MobileBookingBar.

**CTA logic.** Every training inquiry (hero, navbar, mobile menu) is the shared
`AcademyCta`: `https://www.instagram.com/cutzzacademy/`, new tab, `noopener noreferrer`, an
accessible destination note, `data-cta="academy-hero|nav|menu"`. Booksy is never used as
the training CTA; it stays the salon booking action on the barbershop navbar. No form, backend,
embed or integration.

## Asset audit

Initially found twelve photos and one logo JPEG. During final verification the
client added `academy5.jpg` (practice at the chair), `cutzacademylogo.png` (native
transparent white textured artwork) and video files in the original checkout.
The new practice photo and native logo are used. (Later the same day the clips were processed
too, see "Clips" below.)
All source photos are client-supplied JPEGs, with no alpha channel.
There were no Academy derivatives in `public/images` before this task. The five
1440-pixel JPEG photos are compressed source exports, but were not web-pipeline
assets. Larger files are downscaled without enlargement. No generated or stock
photos and no colour grading. Each photo is used only once on the Academy page.

| Source | Dimensions | Source bytes | Use / optimized WebP bytes |
|---|---|---:|---|
| cutzacademy.jpg | 1440 × 1917 | 196552 | Hero strip / 106534 |
| cutzacademy2.jpg | 1440 × 1440 | 119052 | Hero strip / 61096 |
| cutzacademy3.jpg | 1440 × 1920 | 148931 | Hero strip / 74038 |
| cutzacademy4.jpg | 1440 × 1920 | 161713 | Hero strip / 82328 |
| cutzacademy5.jpg | 1440 × 1916 | 199132 | Hero strip / 110462 |
| cutzacademy6.jpg | 3144 × 3269 | 536535 | Hero strip / 108228 |
| cutzacademy7.jpg | 3024 × 4032 | 1192721 | Hero strip / 85194 |
| cutzacademy8.jpg | 3072 × 4096 | 600258 | Hero strip / 124182 |
| cutzacademy9.jpg | 3072 × 4096 | 1978299 | Hero strip / 143764 |
| cutzacademy10.jpg | 3095 × 4096 | 1767624 | Hero strip / 145248 |
| cutzacademy11.jpg | 3072 × 4096 | 1704293 | Hero strip / 148036 |
| cutzacademy12.jpg | 3072 × 4096 | 1462636 | Hero strip / 113252 |
| academy5.jpg | 3072 × 4096 | 1442391 | Individual format + homepage teaser (practice.webp) / 131888 |
| cutzacademylogo.png | 1959 × 803, alpha | 402043 | Native logo PNG 1000 × 304 / 122671 |
| cutzacademylogo.jpg | 1080 × 1080 | 23147 | Fallback source only, not served |

Current use (each photo once on the page): `cutzacademy*.jpg` (12 posed post-training
photos, incl. photo 11 in front of a venue that is not claimed as the training address) form the
hero strip; `academy5.jpg` (two people at one chair with a model, an action shot) illustrates the
individual format and the homepage teaser; no named instructor role is inferred from it.

Programme card photos: `cut4.jpeg` (a fade seen from behind, 1998 × 2664) and `cut6.jpeg`
(longer textured hair in profile, 1984 × 2660), client-supplied BYKUCUTZZ haircut photos, copied
from the original checkout (SHA-256 identical) and cropped 4:5 around the head in source pixels
(`fade.webp`, `shape.webp`, 800 × 1000, 48 274 / 70 918 bytes). They illustrate the technique and
are not presented as work from a training. Both images are now shown without drawings, masks,
filters or photo overlays. The original assets, crops, dimensions and responsive sizing are
unchanged; Shape Control's alt text describes the plain photo. `cut5.jpeg` is unused.

Clips: `academy.mp4`, `academy2.mp4`, `academy3.mp4`, `academy4.mp4` from the original checkout,
720 × 960, silent H.264 (6.8 / 10.5 / 7.6 / 9.9 s), copied without re-encoding with the MP4 index
moved to the front, plus WebP posters (frame at 1 s). Content checked frame by frame: in all four
someone works on a model while several people watch; none shows something identifiable as Fade
Control or Shape Control, so no clip is labelled with a programme. Group format photo: a still of
`academy2.mp4` at 6 s, cropped 4:3 (`group-practice.webp`, 720 × 540), because no separate photo
of a group class exists. `podpisywanie.mp4` (CUTZ certificates being signed, participant names
legible) is not used: certificate policy unconfirmed, names would need consent.

`scripts/build-academy-assets.mjs` produces one WebP master per photo, width 1200
(hero 1600), quality 82. Outputs: `public/images/academy/academy-01.webp` through
`academy-12.webp`, plus `practice.webp`. Next Image supplies responsive AVIF/WebP at quality 80, preloading only the
hero; remaining photos are lazy loaded. Dimensions are in the separate
`src/data/academy-images.json`, content in `src/data/academy.ts`.

The final logo pipeline prefers the supplied native transparent PNG, trims empty
alpha margins and downscales to width 1000 without enlargement. White scissors,
typography and the supplied distressed texture are retained, with no recolouring
or redraw and no white mount. Lossless PNG encoding, about 123 KB, bypasses Next
Image conversion. A native vector could improve future larger uses. The original
JPEG fallback is retained in the script: inverse-luminance alpha, 800 × 285 black
mark on a white mount; it is not used in the final build.

Total audited source bytes (photos + both logos): 11935327; deployed masters +
logo: 1556921 bytes (~87% smaller).
Originals copied into the isolated worktree remain untracked. Original tracked
files and `cut4–6.jpeg` were not changed by this task; other newly added media in
that checkout remain there. Optimized assets were committed with 58d2f1a; originals were not. This integration changes no media or asset pipeline.

## Motion and SEO

Existing GSAP MotionController retains the homepage presets and Claude's data-neon logic.
Academy hero uses data-reveal="academy-hero": whole elements, 0.35 s / 8 px / power2.out,
once, without blur or SplitText. Hero CTA and controls are immediately available.
Other Academy headings/cards/format photos retain slide/rise/clip. Self-contained components:
the photo strip (simultaneous 0.4 s entrance, 12% clip / 1.03 scale, then an endless drift at a constant
34 px/s; hovering does not change it; dragging holds it and moves the strip 1:1 without inertia;
after a drag or an arrow glide the drift eases back in; arrows, pause, keyboard ← →, stop while
its controls have keyboard focus; seamless loop through copies of the set), clip tiles (play
while ≥35 % visible, click to pause/resume, a clip paused by hand stays paused).
Programme cards retain the existing `rise` entrance reveal, but their photos are static.
`ProgramMedia` renders one Next Image per card, without client hooks, GSAP timelines, SVG paths,
duplicate photo layers or drawing effects. Their dedicated CSS variables, masks, hover effects
and drawing keyframes have been removed, rather than hidden.
Reduced motion: no automatic movement, strip as native scroll with arrows, cards in their static
state, clips start on click. `heroParallax={false}` marks
motion ready without a Loader and skips only the homepage-specific selector on
Academy; its default remains true for the homepage. No pins, gallery parallax or
new library. Existing media queries respect `prefers-reduced-motion`; Academy's
reduced-motion CSS also ensures visible static content when that preference changes.
SSR content is complete without JavaScript.

Homepage metadata, Hero, HexGrid and Team code were not changed. Existing shared
BarberShop JSON-LD is inherited from the root layout; no training/course structured
data was added. No sitemap/robots files existed. `src/data/site.ts` still has a
null production URL, so no domain was invented. After the production domain is
confirmed, configure sitemap/canonical URLs for all public routes together.

## Verification

- `npm run lint`: passed (TypeScript).
- `npm run build`: passed; `/cutz-academy` statically prerendered.
- Production preview: `npm run start -- --port 3001`.
- Browser: 375/390/768/1440 CSS px; navbar/logo, text, gallery, CTA and horizontal
  overflow checks. Gallery images loaded successfully during scrolling.
- Mobile menu: open, Escape, focus trap in both directions, focus return,
  scroll locking, Academy logo navigation and homepage Cennik anchor.
- Internal Academy offer anchor and homepage Cennik land at ~64 px, below nav.
- `prefers-reduced-motion`: code/media-query review (no browser preference
  emulation API was available); no claim of an emulated runtime test.
- Final browser and Git checks are recorded in `CHANGELOG_AI.md`.
- After the native PNG/practice photo update, repeated lint/build and rapid
  375 → 390 → 768 → 1440 resizing: passed. All thirteen photo elements loaded;
  Academy console warnings/errors: none. Source SHA-256 comparison: all fifteen
  copied files match the original checkout. Screenshots saved outside the repo.

### Verification of the 2026-10-09 rework (hero strip, trainings in practice, navbar)

`npm run lint`, `npm run build` and `git diff --check` passed. Headless Chrome on the dev server
and on a production build at 1440/768/390/375 CSS px: Academy navbar already in the server HTML,
navbar switching via both logos, section anchors below the navbar from links and menus, menus and
Escape, homepage Booksy CTA; hero alignment (one centre line for copy, CTA and controls at 1440);
strip speed equal with and without the pointer, drag 1:1 without inertia, eased return, arrows,
pause, seamless wrap; Fade/Shape reveal and hover; all four clips play and pause/resume on click;
no horizontal overflow, CLS 0, no console errors or warnings on the production build; emulated
`prefers-reduced-motion`. Details and numbers: `CHANGELOG_AI.md`.

### Verification of the plain programme photos (2026-10-09)

`npm run lint`, `npm run build` and `git diff --check` passed. Browser checks on the
existing dev preview at port 3000, 1440/768/390/375 px: one loaded image in each photo
panel, no SVG/line overlays, no image filter or mask, no horizontal overflow.
At 1440 px card and photo dimensions, plus visible programme copy, match the pre-change
measurements. Desktop and mobile visual checks cover both photos; no console errors.
Next.js emitted a dev LCP warning for the lazy Fade photo after reloading directly at
`#szkolenia`; its loading policy remains unchanged because the photo is below the normal hero.
The port 3000 process remains running without restart; no ENV or asset changes.

### Verification of the combined main preview (2026-10-09)

The approved Codex hero/gallery changes and the main checkout's plain programme photos
are combined at `http://localhost:3000/cutz-academy`. Lint, build and `git diff --check`
passed. Browser checks at 1440/768/390/375 px cover the homepage and Academy: centred
hero, full-width strip, controls below the photos on the right, 48 px control buttons,
pause/resume, previous/next, keyboard navigation and mobile drag (170 px input produced
170 px movement). Hero CTA and offer link align on one centre line; mobile menu anchors
close the menu and land below the navbar. Both programme photos load as a single image,
without SVG, filter or mask. The removed final CTA leaves no gap before the footer.
No horizontal overflow or console errors/warnings were captured in this integration session.
The homepage retains all three HexLamps instances, NeonSign and Salon 02.

Reduced motion was checked against the actual layout boot script and MotionController
in an isolated Node VM: no `js-motion` class and no animations created. Native gallery,
CSS and video guards were reviewed. The browser API has no preference emulation,
so this is a logic check, not an emulated browser visual test. Source hashes confirm
Claude's protected files, clean ProgramMedia and corrected alt text were preserved.
Both dev server processes (3000 and 3003) stayed running without restart or ENV changes.

## Before deployment

Review the isolated change and confirm the missing course details with the client
if they should be published. This inquiry-based page works without inventing them.
Provide a production domain before sitemap/canonical work; resolve the existing
privacy-policy legal data before launching the site. Any commit or deployment
requires a separate user instruction.
