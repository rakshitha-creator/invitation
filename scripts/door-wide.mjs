import sharp from "sharp";
const OUT = "/home/claude/sitaram/public/images/temple/";
const W = 1800, H = 2406, WW = 4320, pad = (WW - W) / 2;
// colour: the frame with its hole, set into a soft, darkened, blurred extension of the same wall
const frame = await sharp(OUT + "door-frame-lg.webp").resize(W, H).png().toBuffer();
const wall = await sharp(frame).flatten({ background: "#3a2418" }).resize(WW, H, { fit: "fill" }).blur(40).modulate({ brightness: 0.55, saturation: 0.8 }).png().toBuffer();
// knock the hole out of the extension too
const hole = Buffer.from(`<svg width="${WW}" height="${H}"><path fill-rule="evenodd" fill="#fff" d="M0 0H${WW}V${H}H0Z M${pad + 480} 810V2292H${pad + 1320}V810Z"/></svg>`);
const wallCut = await sharp(wall).ensureAlpha().composite([{ input: await sharp(hole).png().toBuffer(), blend: "dest-in" }]).png().toBuffer();
// soften the seam between wall and photo
const fade = Buffer.from(`<svg width="${W}" height="${H}"><defs><linearGradient id="g"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.08" stop-color="#fff"/><stop offset="0.92" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`);
const frameFaded = await sharp(frame).composite([{ input: await sharp(fade).png().toBuffer(), blend: "dest-in" }]).png().toBuffer();
const wide = await sharp(wallCut).composite([{ input: frameFaded, left: pad, top: 0 }]).png().toBuffer();
await sharp(wide).resize({ width: 3200 }).webp({ quality: 72, alphaQuality: 80 }).toFile(OUT + "door-wide-lg.webp");
await sharp(wide).resize({ width: 1800 }).webp({ quality: 68, alphaQuality: 75 }).toFile(OUT + "door-wide-sm.webp");
// depth: pad with a flat mid value, blurred into the photo's depth
const depth = await sharp(OUT + "door-depth.webp").resize(574, 768).greyscale().png().toBuffer();
const dw = Math.round(574 * WW / W);
const dWide = await sharp({ create: { width: dw, height: 768, channels: 3, background: { r: 150, g: 150, b: 150 } } }).composite([{ input: depth, left: Math.round((dw - 574) / 2), top: 0 }]).greyscale().blur(1.2).webp({ quality: 88 }).toFile(OUT + "door-wide-depth.webp");
console.log("hole", (pad + 480) / WW, (pad + 1320) / WW, 810 / H, 2292 / H, dWide.width);
