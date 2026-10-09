// Optimises the placeholder photos into public/images/wedding and writes
// blur placeholders to src/content/photo-blur.json.
// Usage: node scripts/prepare-photos.mjs <source-dir>
import sharp from "sharp";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const SRC = process.argv[2];
const OUT = new URL("../public/images/wedding/", import.meta.url).pathname;
const MAP = {
  "bride.jpg": "j7Ljsqhnwag",
  "groom.jpg": "mab4JkLEe80",
  "couple-01.jpg": "OzyvCE9a60M",
  "couple-02.jpg": "z3rzhRweKB4",
  "couple-03.jpg": "m0J-phz_lSo",
  "pre-wedding.jpg": "XrbofN77emw",
  "family.jpg": "oJof1JomJ3g",
  "ceremony.jpg": "v5sG5-zYthE",
  "rings.jpg": "jWjdetjUMjk",
  "temple.jpg": "QXIBCvvA_jc",
  "mandap.jpg": "7O422yG_b80",
  "mehendi.jpg": "5EfVgcZYi3s",
};
const blur = {};
for (const [name, id] of Object.entries(MAP)) {
  const src = path.join(SRC, id + ".jpg");
  if (!existsSync(src)) { console.warn("missing", src); continue; }
  const img = sharp(readFileSync(src)).rotate();
  await img.clone().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(path.join(OUT, name));
  const tiny = await img.clone().resize(16, 16, { fit: "inside" }).jpeg({ quality: 50 }).toBuffer();
  blur[name] = "data:image/jpeg;base64," + tiny.toString("base64");
  console.log("wrote", name);
}
writeFileSync(new URL("../src/content/photo-blur.json", import.meta.url), JSON.stringify(blur, null, 1));
