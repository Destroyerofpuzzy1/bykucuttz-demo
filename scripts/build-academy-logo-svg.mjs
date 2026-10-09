// Traces the supplied CUTZ ACADEMY mark into one scalable vector path.
//
//   input:  public/images/academy/logo.png  (the trimmed native PNG produced by build-academy-assets.mjs
//           from the client's transparent original; white mark on transparency, 1000 x 304)
//   output: src/components/brand/academy-logo.json  { viewBox, d }  -> rendered inline by AcademyLogo
//           with fill="currentColor", so the same geometry is black on the light Academy pages and
//           white on dark surfaces.
//
// The mark's silhouette (CUTZ lettering, ACADEMY, the scissors with rings, pivot and blade) is the
// alpha channel at 50 %. Only the near-invisible grunge of the PNG (background speckle below ~4 %
// opacity, slight variation inside the letters) is not carried over; nothing is redrawn by hand.
//
// Run: npm run assets:academy:logo
import sharp from "sharp";
import potrace from "potrace";
import { writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const trace = promisify(potrace.trace);
const p = (f) => fileURLToPath(new URL(`../${f}`, import.meta.url));
const SCALE = 4; // trace at 4x so curves (rings, pivot, the A/Y joints) stay smooth
// The PNG is trimmed to the mark, so the traced curves sit on (and slightly overshoot) the canvas
// edge; an SVG clips everything outside its viewBox. A small safe area around the canvas keeps every
// outer stroke, the scissors and the ACADEMY lettering whole. Geometry is unchanged.
const PAD = 16; // viewBox units (= 4 px of the 1000 px source)

const src = sharp(p("public/images/academy/logo.png"));
const { width, height } = await src.metadata();

// alpha -> black-on-white mask (potrace traces dark areas)
const alpha = await sharp(p("public/images/academy/logo.png"))
  .ensureAlpha()
  .extractChannel("alpha")
  .resize({ width: width * SCALE, kernel: "lanczos3" })
  .threshold(128)
  .negate()
  .png()
  .toBuffer();

const svg = await trace(alpha, { turdSize: 12 * SCALE, optTolerance: 0.25, alphaMax: 1, threshold: 128 });
const round = (d) => d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n) * 10) / 10));
const d = [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => round(m[1])).join(" ");

await writeFile(
  p("src/components/brand/academy-logo.json"),
  JSON.stringify({ viewBox: `${-PAD} ${-PAD} ${width * SCALE + 2 * PAD} ${height * SCALE + 2 * PAD}`, width, height, d })
);
console.log("academy logo svg:", width, "x", height, "path chars:", d.length);
