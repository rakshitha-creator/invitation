// Prepares the real temple photographs used as the journey's scenes.
// Grades them to one warm, cinematic palette and writes large/small WebP + a tiny
// backdrop. Usage: node scripts/prepare-temple.mjs <folder with the Unsplash originals>
import sharp from "sharp";
import path from "node:path";

const SRC = process.argv[2];
const OUT = new URL("../public/images/temple/", import.meta.url).pathname;

// name ← Unsplash id, warmth (0–1), brightness
const SHOTS = {
  entrance: ["QXIBCvvA_jc", 0.12, 0.92],
  gateway: ["XSuvSv5QkKI", 0.25, 0.9],
  light: ["S1Jn3FiENTk", 0.2, 1.0],
  corridor: ["CZcIjoQhWFk", 0.35, 0.95],
  colonnade: ["dxgIrClfpOc", 0.2, 0.9],
  mandapam: ["M6mFI1FhwpU", 0.6, 1.02],
  hall: ["2KY4GhCrpME", 0.25, 0.85],
  lamps: ["hswidm8bSJw", 0.05, 0.95],
  diyas: ["C47qFE13cz0", 0.1, 0.9],
  aarti: ["3KsDyEguPJ0", 0.1, 0.95],
};

async function grade(input, warmth, bright) {
  const img = sharp(input).rotate();
  const { width, height } = await img.metadata();
  const warm = await sharp({ create: { width, height, channels: 4, background: { r: 196, g: 112, b: 64, alpha: warmth } } }).png().toBuffer();
  return sharp(await img.modulate({ saturation: 0.88, brightness: bright }).composite([{ input: warm, blend: "soft-light" }]).toBuffer());
}

async function write(name, buf, alpha = false) {
  const s = sharp(buf);
  await s.clone().resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true }).webp({ quality: 72, alphaQuality: 80 }).toFile(path.join(OUT, `${name}-lg.webp`));
  await s.clone().resize({ width: 1100, height: 1100, fit: "inside", withoutEnlargement: true }).webp({ quality: 68, alphaQuality: 75 }).toFile(path.join(OUT, `${name}-sm.webp`));
  if (!alpha) await s.clone().resize({ width: 48 }).webp({ quality: 60 }).toFile(path.join(OUT, `${name}-blur.webp`));
}

for (const [name, [id, w, b]] of Object.entries(SHOTS)) {
  let src = path.join(SRC, id + ".jpg");
  let buf = await (await grade(src, w, b)).toBuffer();
  if (name === "gateway") {
    // soften a small modern sign at the foot of the doorway
    const patch = await sharp(buf).extract({ left: 760, top: 1950, width: 120, height: 190 }).flop().blur(6).toBuffer();
    buf = await sharp(buf).composite([{ input: patch, left: 880, top: 1950 }]).toBuffer();
  }
  await write(name, buf);
  console.log("wrote", name);
}

// the temple door: a frame with the leaves cut out, plus each leaf separately
{
  const graded = await (await grade(path.join(SRC, "CUwTntWeHv0.jpg"), 0.15, 0.95)).toBuffer();
  const L = 480, T = 810, R = 1320, B = 2292, SEAM = 900;
  const { width, height } = await sharp(graded).metadata();
  const mask = Buffer.from(
    `<svg width="${width}" height="${height}"><path fill-rule="evenodd" fill="#fff" d="M0 0H${width}V${height}H0Z M${L} ${T}V${B}H${R}V${T}Z"/></svg>`,
  );
  const framed = await sharp(graded).ensureAlpha().composite([{ input: await sharp(mask).png().toBuffer(), blend: "dest-in" }]).png().toBuffer();
  await write("door-frame", framed, true);
  await write("door-left", await sharp(graded).extract({ left: L, top: T, width: SEAM - L, height: B - T }).toBuffer(), true);
  await write("door-right", await sharp(graded).extract({ left: SEAM, top: T, width: R - SEAM, height: B - T }).toBuffer(), true);
  await sharp(graded).resize({ width: 48 }).webp({ quality: 60 }).toFile(path.join(OUT, "door-blur.webp"));
  console.log("door", width, height, { L: L / width, T: T / height, R: R / width, B: B / height });
}
