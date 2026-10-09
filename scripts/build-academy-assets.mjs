// Academy-only pipeline. Originals stay untouched; no homepage assets are rebuilt.
import sharp from "sharp";
import { access, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const path = (file) => fileURLToPath(new URL(file, root));
await mkdir(path("public/images/academy"), { recursive: true });
const manifest = {};

for (let number = 1; number <= 12; number++) {
  const source = `cutzacademy${number === 1 ? "" : number}.jpg`;
  const src = `/images/academy/academy-${String(number).padStart(2, "0")}.webp`;
  const info = await sharp(path(`assets-src/${source}`))
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(path(`public${src}`));
  manifest[number] = { src, width: info.width, height: info.height };
  console.log(`${source}: ${info.width} x ${info.height}, ${info.size} bytes`);
}

const practice = await sharp(path("assets-src/academy5.jpg"))
  .rotate()
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 82, effort: 5 })
  .toFile(path("public/images/academy/practice.webp"));
manifest.practice = { src: "/images/academy/practice.webp", width: practice.width, height: practice.height };
console.log(`academy5.jpg: ${practice.width} x ${practice.height}, ${practice.size} bytes`);

// Programme cards: client-supplied BYKUCUTZZ haircut photos (cut4 = a fade seen from behind,
// cut6 = longer textured hair in profile), cropped 4:5 around the head (source pixels), so the
// card shows the haircut itself. The Shape Control contour lines are drawn in this crop's 800 x 1000
// space (src/components/academy/ProgramMedia.tsx): change a crop and the lines must be redrawn.
const crops = {
  fade: { source: "cut4.jpeg", left: 480, top: 839, width: 1119, height: 1399 },
  shape: { source: "cut6.jpeg", left: 298, top: 456, width: 1428, height: 1785 },
};
for (const [key, { source, ...region }] of Object.entries(crops)) {
  const info = await sharp(path(`assets-src/${source}`))
    .rotate()
    .extract(region)
    .resize({ width: 800, height: 1000, fit: "fill" })
    .webp({ quality: 82, effort: 5 })
    .toFile(path(`public/images/academy/${key}.webp`));
  manifest[key] = { src: `/images/academy/${key}.webp`, width: info.width, height: info.height };
  console.log(`${source}: ${info.width} x ${info.height}, ${info.size} bytes`);
}

// Prefer the client's native transparent PNG, preserving the supplied texture.
const nativeLogo = path("assets-src/cutzacademylogo.png");
const hasNativeLogo = await access(nativeLogo).then(() => true, () => false);
if (hasNativeLogo) {
  const logo = await sharp(nativeLogo).trim().resize({ width: 1000, withoutEnlargement: true })
    .png({ compressionLevel: 9 }).toFile(path("public/images/academy/logo.png"));
  manifest.logo = { src: "/images/academy/logo.png", width: logo.width, height: logo.height, native: true };
} else {
// Fallback: remove only the white backing and empty margins of the supplied JPEG.
// Inverse luminance preserves the original raster edges, scissors and letterforms.
const { data, info } = await sharp(path("assets-src/cutzacademylogo.jpg"))
  .extract({ left: 140, top: 400, width: 800, height: 285 })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const rgba = Buffer.alloc(info.width * info.height * 4);
for (let pixel = 0; pixel < info.width * info.height; pixel++) {
  const offset = pixel * 3;
  const luminance = Math.round(data[offset] * 0.2126 + data[offset + 1] * 0.7152 + data[offset + 2] * 0.0722);
  rgba[pixel * 4 + 3] = 255 - luminance;
}
await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(path("public/images/academy/logo.png"));
manifest.logo = { src: "/images/academy/logo.png", width: info.width, height: info.height, native: false };
}
await writeFile(path("src/data/academy-images.json"), `${JSON.stringify(manifest, null, 2)}\n`);
