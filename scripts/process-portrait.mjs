// One-off asset script: builds the editorial portrait from the original photo.
// Crops to 4:5, softens the busy mall background (the subject stays untouched),
// then applies a warm monochrome grade. Usage:
//   node scripts/process-portrait.mjs <input.jpg> [outDir]
import sharp from "sharp";

const [, , input, outDir = "public/images"] = process.argv;
if (!input) throw new Error("Usage: node scripts/process-portrait.mjs <input.jpg> [outDir]");

const crop = { left: 160, top: 120, width: 960, height: 1200 };
const { width: w, height: h } = crop;

// Subject mask (crop space): head ellipse + shoulders/torso shape, feathered.
const maskSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs><filter id="f" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="16"/></filter></defs>
  <rect width="100%" height="100%" fill="#000"/>
  <g filter="url(#f)" fill="#fff">
    <ellipse cx="475" cy="300" rx="175" ry="215"/>
    <path d="M135 1200 L115 760 Q150 545 330 505 L620 505 Q815 545 850 760 L870 1200 Z"/>
    <rect x="390" y="440" width="180" height="140"/>
  </g></svg>`;

const sharpBuf = await sharp(input).extract(crop).removeAlpha().toBuffer();
// Background: heavier blur so signage and lights fall away.
const blurBuf = await sharp(sharpBuf).blur(16).toBuffer();
const alpha = await sharp(Buffer.from(maskSvg)).greyscale().extractChannel(0).raw().toBuffer();
const subject = await sharp(sharpBuf)
  .joinChannel(alpha, { raw: { width: w, height: h, channels: 1 } })
  .png()
  .toBuffer();
// Soft vignette applied to the whole frame (avoids halos around the subject).
const vignette = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs><radialGradient id="v" cx="48%" cy="55%" r="75%"><stop offset="45%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.55"/></radialGradient></defs>
  <rect width="100%" height="100%" fill="url(#v)"/></svg>`);
const merged = await sharp(blurBuf).composite([{ input: subject }, { input: vignette }]).toBuffer();

await sharp(merged)
  .resize(1120, 1400)
  .greyscale()
  .linear(1.14, -14)
  .toColourspace("srgb")
  .tint({ r: 236, g: 222, b: 204 })
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(`${outDir}/omar-nabelsi-portrait.jpg`);
console.log("portrait written");
