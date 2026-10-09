# Industrial visual system

Local continuation of Claude's unfinished homepage work, 2026-10-09.
Checkout: `feature/hex-3d-backgrounds`, preview `http://localhost:3000`.
Implementation did not include Git publication. The client subsequently authorised commit and push on 2026-10-09; branch merge, dependency installation and deployment remain outside scope.

## Direction and placement

Readability, concrete content and usable links come first. Black remains the base.
Fittings refer to a physical barbershop: dark steel, edge reflections, mounted LED
tubes and recognisable tools. They are accents in selected sections, not backgrounds
behind every block of text.

- **Cennik:** `BarberTools` replaces the corner hex panel. A cordless clipper hangs
  from its handle loop; cutting shears have two blades, finger rings, pivot and
  finger rest. Both are drawn in SVG and suspended from a small rail. The artwork
  sits in the free header space. Prices, service names, Byku note and booking links
  are unchanged. The tablet fitting is smaller to clear the note.
- **SocialProof:** the existing `HexLamps` wall cluster remains at the right edge.
  Its lower mask clears the Booksy link before the section ends. The counters,
  heartbeat and their original code are untouched.
- **Crew:** the existing `NeonSign` is a physical steel-backed sign with a recessed
  face, visible side/bottom thickness, screws and two eye bolts. Two chains attach
  to a ceiling rail. `/images/brand/logo-fill.svg` is the supplied logo, unchanged;
  no replacement lettering. A quiet hex lamp sits behind the sign. All parts sit
  above the heading in a reserved aspect-ratio box, clear of the photo and copy.
- **Finale:** the existing wide overhead panel remains above the LED line. The
  projected geometry is retained, now with dark metal channels and a back face.
  It is visually different from the wall cluster and the sign's single hexagon.

`SteelChain` shares the linked geometry between the sign and tools. Alternating
broad and edge-on capsules, dark back strokes, a metallic gradient and selective
edge highlights replace the previous repeated CSS image. The objects remain
still; no swinging, decorative parallax or flashing sign. An extra third tool
and another Cennik hex panel were omitted to avoid crowding the page.

## Implementation boundaries

Components are server-rendered React/SVG. No client hooks, canvas, WebGL or new
library. Each fitting is `aria-hidden`, unfocusable and ignores pointer events.
`useId` namespaces the SVG gradients and filters. The tools and chains need no
blur filters. Hex lamps share their tube paths with `<use>`; the sign uses one
small blur for the logo light. Reserved SVG ratios prevent image-loading shifts.
Static artwork behaves the same with and without reduced motion.

The obsolete corner-lamp variant, CSS chain/sign layers and `data-neon` flicker
handler were removed. The shared reveal parameters, including `academy-hero`, are
unchanged. A pre-existing deep-scroll reload error was reproduced before edits and
again during regression checks. Clip and LED timelines now refresh their own
ScrollTrigger as soon as their children are added, before subsequent triggers are
created. This resolves the initialization ordering issue without changing targets,
durations or easing. This follows the [GSAP timeline refresh guidance](https://gsap.com/docs/v3/Plugins/ScrollTrigger/refresh()/). No Academy code/assets, Hero, Manifest HexGrid, Booksy/heartbeat data,
salon publication flags, original media, ENV or server process was changed.

## Safety and verification

Additional backup outside the repository:
`C:/Users/lukas/.codex/backups/bykucuttz-industrial-20261009-1315`.
It holds 49 SHA-256 verified files, all 25 original untracked files, a Git status
snapshot and the pre-edit binary diff. The 23 untracked media originals remain
untouched; the two untracked decoration components are the explicitly requested
continuation of Claude's work.

- Lint (TypeScript), production build and diff check passed. All routes remain static.
- Homepage and Academy at 1440/768/390/375 px: no horizontal overflow; the 17 price
  rows and booking links remain intact. Tools clear the Byku note; on tablet their
  painted lower edge is about 15 px above it. Sign/heading have separate reserved
  areas. Overhead light stays above the final heading, wall light fades before the link.
- All four decorative roots have aria-hidden and pointer-events none. No duplicate
  SVG IDs or CSS animations in the fitting trees. Artwork is static, with no new
  runtime effects or loading-dependent dimensions; no numeric CLS score was measured.
- Academy: correct centred heading, 12-photo full-width strip and controls below,
  pause/next/previous/resume, Instagram CTA, navigation home, two single-image programme
  cards without SVG overlays and no final contact CTA. No industrial components on this route.
- Reduced motion: the actual boot script and MotionController bailout passed an
  isolated Node VM check (zero animation setup calls). New fittings are static in
  both modes. Browser preference emulation is unavailable; no emulated visual claim.
- Final browser console checks exclude the deliberately reproduced pre-fix GSAP error;
  cold deep-anchor reload at Crew (1440 px), Finale (375 px) and normal route
  navigation were checked after the fix: no errors or warnings. Mobile Cennik menu
  navigation closes the menu and lands at about 64 px below the fixed header.
- SHA-256 checks preserve all 15 protected source files and all 23 media originals.
  Global CSS outside the decoration blocks is unchanged. Existing server PIDs remain
  36372 (3000) and 1848 (3003); no restart, new server, ENV or dependency change.
- Screenshots are saved outside Git in the Codex visualization directory.
- Git state at the end of implementation, before the subsequent commit request: the same branch/HEAD, 17 modified tracked files, 28 untracked
  (the original 25 plus SteelChain, BarberTools and this document), nothing staged.
