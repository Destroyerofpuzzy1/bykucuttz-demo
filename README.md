# BYKUCUTZZ

Polish barbershop homepage and CUTZ ACADEMY training page, built with Next.js App
Router, React, TypeScript, Tailwind v4 and GSAP. Start with `AGENTS.md` and
`PROJECT_CONTEXT.md` before making changes.

## Run locally

Use a current Node.js version compatible with Next.js 16 (the project was checked
with Node 24). Install the lockfile dependencies with `npm ci`.

```sh
npm run dev
npm run lint
npm run build
npm run start
```

Development and production servers use port 3000 by default. An isolated preview
can use `npm run start -- --port 3001` after a build. `lint` runs TypeScript
(`tsc --noEmit`); there is no ESLint or automated test suite.

## Routes

- `/`: barbershop homepage, booking through Booksy.
- `/cutz-academy`: training page, inquiries through Instagram `@cutzzacademy`.
- `/polityka-prywatnosci`: privacy policy, with visible missing legal details.

## Assets and content

`assets-src/` contains source materials and is not served by Next.js. Optimized
files in `public/images/` are served; `next/image` generates responsive variants.

- `npm run assets`: original homepage pipeline.
- `npm run assets:academy`: Academy-only optimization, transparent logo and
  `src/data/academy-images.json`. Requires `cutzacademy.jpg`, `cutzacademy2.jpg`
  through `cutzacademy12.jpg`, `academy5.jpg`, `cut4.jpeg`, `cut6.jpeg` (Fade/Shape
  card crops) and the supplied native `cutzacademylogo.png` in `assets-src/`. If the
  PNG is absent, the script can use `cutzacademylogo.jpg` as a fallback.
- `npm run assets:academy:videos -- "path/to/folder/with/the/mp4s"`: copies
  `academy.mp4` … `academy4.mp4` without re-encoding (needs `ffmpeg`/`ffprobe`), writes
  posters, the group still and `src/data/academy-videos.json`.

Do not rerun the homepage pipeline for Academy changes. Keep the originals
untouched and do not add unnecessary large duplicates to Git.

See `docs/CUTZ-ACADEMY.md` for the asset audit, content sources, page structure,
verification and information still needed from the business. `site.url` is still
unprovided; no sitemap/robots route or production canonical domain is configured.
