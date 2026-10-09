// Preserve the supplied silent H.264 clips; move MP4 metadata first for seeking.
// Usage: npm run assets:academy:videos -- "path/to/original/assets-src"
import { mkdir, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const sources = resolve(process.argv[2] ?? join(root, "assets-src"));
const output = join(root, "public/videos/academy");
await mkdir(output, { recursive: true });
const videos = [];
for (const name of ["academy", "academy2", "academy3", "academy4"]) {
  const source = join(sources, `${name}.mp4`);
  const probe = JSON.parse(execFileSync("ffprobe", ["-v", "error", "-show_streams", "-show_format", "-of", "json", source], { encoding: "utf8" }));
  const stream = probe.streams.find((s) => s.codec_type === "video");
  if (stream?.codec_name !== "h264" || probe.streams.some((s) => s.codec_type === "audio")) {
    throw new Error(`${name}: review changed codec/audio before publishing`);
  }
  execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-i", source, "-map", "0:v:0", "-c", "copy", "-movflags", "+faststart", join(output, `${name}.mp4`)]);
  execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-ss", "1", "-i", source, "-frames:v", "1", "-vf", "scale=720:-1", "-c:v", "libwebp", "-quality", "80", join(output, `${name}.webp`)]);
  videos.push({ src: `/videos/academy/${name}.mp4`, poster: `/videos/academy/${name}.webp`, width: stream.width, height: stream.height, duration: Number(probe.format.duration) });
  console.log(`${name}: ${stream.width} x ${stream.height}, ${probe.format.duration}s, silent H.264, no re-encoding`);
}

// Group-format photo: no separate photo of a group class was supplied, so one frame of academy2.mp4
// (six people around one chair, t = 6 s) is exported as a 4:3 still, cropped from the top of the frame.
const groupStill = { src: "/images/academy/group-practice.webp", width: 720, height: 540 };
await mkdir(join(root, "public/images/academy"), { recursive: true });
execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-ss", "6", "-i", join(sources, "academy2.mp4"), "-frames:v", "1", "-vf", `crop=${groupStill.width}:${groupStill.height}:0:60`, "-c:v", "libwebp", "-quality", "85", join(root, "public", groupStill.src)]);
console.log(`group still: academy2.mp4 @ 6 s -> ${groupStill.src}`);

await writeFile(join(root, "src/data/academy-videos.json"), `${JSON.stringify({ videos, groupStill }, null, 2)}\n`);
