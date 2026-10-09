// Builds every web asset from the untouched originals in /assets-src (never deployed).
//
//   public/images/salon|work|social|team/*.webp   processed photos
//   public/images/brand/logo-*.svg                 traced logo layers
//   src/data/images.json                           width/height manifest for next/image
//   src/components/brand/led-traces.json           LED ceiling geometry traced from photos
//
// Run: npm run assets            (everything)
//      npm run assets -- logo    (only the logo layers)
import sharp from "sharp";
import potrace from "potrace";
import { mkdir, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const trace = promisify(potrace.trace);
const ROOT = new URL("../", import.meta.url);
const p = (f) => fileURLToPath(new URL(f, ROOT));
const SRC = (f) => p(`assets-src/${f}`);
const IMG = (f) => p(`public/images/${f}`);

for (const dir of ["salon", "work", "social", "team", "brand"]) await mkdir(IMG(dir), { recursive: true });

const manifest = {};
async function out(pipeline, rel, quality = 84) {
  const info = await pipeline.webp({ quality, effort: 5 }).toFile(IMG(rel));
  manifest[`/images/${rel}`] = { width: info.width, height: info.height };
}

// ---------- photos ----------
async function photos() {
  // Hero: darken the TV screen (it pulls focus from the ceiling).
  const tv = Buffer.from(
    `<svg width="1672" height="941"><defs><filter id="b"><feGaussianBlur stdDeviation="14"/></filter></defs>
     <rect x="1262" y="250" width="236" height="150" fill="#000" fill-opacity=".86" filter="url(#b)"/>
     <rect x="955" y="365" width="100" height="95" fill="#000" fill-opacity=".7" filter="url(#b)"/></svg>`
  );
  await out(sharp(SRC("bykucutzz-hero-interior.png")).composite([{ input: tv }]), "salon/hero-interior.webp");
  await out(sharp(SRC("bykucutzz-salon-interior.png")), "salon/salon-01.webp");
  await out(sharp(SRC("salon2.png")), "salon/salon-02.webp");
  await out(sharp(SRC("bykucutzz-detail-bg.png")), "salon/space-detail.webp");
  await out(sharp(SRC("bykucutzz-chair-detail.png")), "salon/chair-portrait.webp");
  await out(sharp(SRC("crew.jpeg")), "social/crew-4000.webp");

  // Work: every frame normalised to 4:5 (lookbook consistency), crops chosen per photo.
  await out(sharp(SRC("cut 3.jpeg")).extract({ left: 120, top: 0, width: 1872, height: 2340 }).resize({ width: 1400 }), "work/taper.webp");
  await out(sharp(SRC("cut1.jpeg")).extract({ left: 150, top: 0, width: 914, height: 1143 }), "work/fade.webp");
  // cut2: crop out the barber pole (top-right)
  await out(sharp(SRC("cut2.jpeg")).extract({ left: 0, top: 160, width: 760, height: 950 }), "work/beard.webp");
  await out(sharp(SRC("design.jpeg")).extract({ left: 260, top: 170, width: 640, height: 800 }), "work/design.webp");

  // Team: 4:5 portraits, face in the upper-middle, gentle grade so the grey walls match.
  const team = [
    ["byku.jpeg", "byku"],
    ["kacper.jpeg", "kacper"],
    ["kamil.jpeg", "kamil"],
    ["kasyan.jpeg", "kasim"],
    ["macias.jpeg", "macias"],
    ["patryk.jpeg", "patryk"],
    ["rayan.jpeg", "ryan"],
    ["sandra.jpeg", "sandra"],
  ];
  for (const [file, name] of team) {
    // bake EXIF orientation first, so crop maths uses the real pixel grid
    const { data: upright, info: m } = await sharp(SRC(file)).rotate().toBuffer({ resolveWithObject: true });
    const w = Math.min(m.width, Math.round(m.height * 0.8));
    const h = Math.min(m.height, Math.round(w * 1.25));
    const left = Math.round((m.width - w) / 2);
    const top = Math.max(0, Math.round((m.height - h) * 0.2));
    await out(
      sharp(upright)
        .extract({ left, top, width: w, height: h })
        .resize({ width: Math.min(w, 1000) })
        .modulate({ saturation: 0.82 })
        .linear(1.04, -4),
      `team/${name}.webp`,
      82
    );
  }
  console.log("photos ok");
}

// ---------- helpers ----------
const round = (d) => d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n) * 10) / 10));
const pathsOf = (svg) => [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => round(m[1]));

async function mask(input, { extract, scale = 1, test }) {
  let img = sharp(input);
  if (extract) img = img.extract(extract);
  if (scale !== 1) img = img.resize({ width: Math.round(extract.width * scale), kernel: "lanczos3" });
  const { data, info } = await img.removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height);
  for (let i = 0, px = 0; i < data.length; i += 3, px++) out[px] = test(data[i], data[i + 1], data[i + 2]) ? 0 : 255;
  return {
    png: await sharp(out, { raw: { width: info.width, height: info.height, channels: 1 } }).png().toBuffer(),
    width: info.width,
    height: info.height,
  };
}

// ---------- logo ----------
async function logo() {
  // Script lockup only (the tagline is live type). In logo.jpeg the lockup's black outline spans
  // x 66-619, y 85-269 and the tagline's accents start at y 276: the window keeps ~10 px of blue
  // around the outline on the top, left and right and stops just above the accents. (The former
  // 60/80/560x180 window ended at y 260 and x 620 and cut the outline flat at the bottom/right.)
  const extract = { left: 56, top: 76, width: 572, height: 196 };
  const white = await mask(SRC("logo.jpeg"), { extract, scale: 4, test: (r, g, b) => r > 185 && g > 185 && b > 185 });
  const silhouette = await mask(SRC("logo.jpeg"), { extract, scale: 4, test: (r, g, b) => !(b - r > 70) });
  const opts = { turdSize: 40, optTolerance: 0.4, alphaMax: 1 };
  const fill = pathsOf(await trace(white.png, opts)).join(" ");
  const sil = pathsOf(await trace(silhouette.png, opts)).join(" ");
  const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${white.width} ${white.height}">${body}</svg>`;
  await writeFile(IMG("brand/logo-fill.svg"), svg(`<path fill="#EEF2F4" fill-rule="evenodd" d="${fill}"/>`));
  await writeFile(IMG("brand/logo-silhouette.svg"), svg(`<path fill="#61CCF0" fill-rule="evenodd" d="${sil}"/>`));
  await writeFile(
    IMG("brand/logo-full.svg"),
    svg(`<path fill="#61CCF0" fill-rule="evenodd" d="${sil}"/><path fill="#EEF2F4" fill-rule="evenodd" d="${fill}"/>`)
  );
  console.log("logo ok");
}

// ---------- LED ceiling traces ----------
async function led(file, { maxY, maxX = Infinity }) {
  const { data, info } = await sharp(SRC(file)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const buf = Buffer.alloc(W * H, 255);
  for (let y = 0; y < Math.min(maxY, H); y++) {
    for (let x = 0; x < Math.min(maxX, W); x++) {
      const i = (y * W + x) * 3;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      if (lum > 205 && Math.max(r, g, b) - Math.min(r, g, b) < 45) buf[y * W + x] = 0;
    }
  }
  const png = await sharp(buf, { raw: { width: W, height: H, channels: 1 } }).png().toBuffer();
  const svg = await trace(png, { turdSize: 60, optTolerance: 0.6, threshold: 128 });
  const first = (d) => Number(d.match(/M\s*([\d.]+)/)[1]);
  const segments = pathsOf(svg).join(" ").split(/(?=M)/).map((d) => d.trim()).filter(Boolean).sort((a, b) => first(a) - first(b));
  return { viewBox: `0 0 ${W} ${H}`, width: W, height: H, segments };
}

async function leds() {
  const json = {
    hero: await led("bykucutzz-hero-interior.png", { maxY: 262 }),
    chair: await led("bykucutzz-chair-detail.png", { maxY: 200, maxX: 420 }),
    space: await led("bykucutzz-detail-bg.png", { maxY: 180, maxX: 660 }),
  };
  await writeFile(p("src/components/brand/led-traces.json"), JSON.stringify(json));
  console.log("led ok");
}

if (process.argv[2] === "logo") {
  await logo();
} else {
  await Promise.all([photos(), logo(), leds()]);
  await writeFile(p("src/data/images.json"), JSON.stringify(manifest, null, 2));
  console.log("manifest ok", Object.keys(manifest).length);
}
