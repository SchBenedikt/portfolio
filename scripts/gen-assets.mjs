// One-off script: generate missing PNG assets (favicons, OG image).
// Pure Node, no dependencies. Run: node scripts/gen-assets.mjs
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';

const CRC_TABLE = new Int32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  CRC_TABLE[n] = c;
}
function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}
function png(width, height, pixelAt) {
  const raw = Buffer.alloc((width * 3 + 1) * height);
  let o = 0;
  for (let y = 0; y < height; y++) {
    raw[o++] = 0; // filter: none
    for (let x = 0; x < width; x++) {
      const [r, g, b] = pixelAt(x, y);
      raw[o++] = r; raw[o++] = g; raw[o++] = b;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type RGB
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// Palette
const FOREST = [37, 59, 48];    // #253b30
const FOREST_DARK = [26, 40, 33]; // #1a2821
const MINT = [185, 203, 163];   // #b9cba3

// Gradient square (favicons, app icons)
function squarePng(size, filename) {
  const buf = png(size, size, (x, y) => {
    const t = y / (size - 1);
    const blend = (a, b) => Math.round(a + (b - a) * t);
    let r = blend(FOREST[0], FOREST_DARK[0]);
    let g = blend(FOREST[1], FOREST_DARK[1]);
    let b = blend(FOREST[2], FOREST_DARK[2]);
    // subtle mint dot center (rounded-rect like hint)
    const cx = size / 2, cy = size / 2, rad = size * 0.32;
    const d = Math.hypot(x - cx, y - cy);
    if (d < rad) {
      const edge = 1 - Math.min(1, (rad - d) / (size * 0.08));
      r = Math.round(r + (MINT[0] - r) * (0.9 - edge * 0.5));
      g = Math.round(g + (MINT[1] - g) * (0.9 - edge * 0.5));
      b = Math.round(b + (MINT[2] - b) * (0.9 - edge * 0.5));
    }
    return [r, g, b];
  });
  writeFileSync(`public/${filename}`, buf);
  console.log(`wrote public/${filename} (${size}x${size}, ${buf.length} bytes)`);
}

// OG image 1200x630 with gradient + diagonal accent
function ogImage() {
  const w = 1200, h = 630;
  const buf = png(w, h, (x, y) => {
    const t = y / (h - 1);
    let r = Math.round(FOREST[0] + (FOREST_DARK[0] - FOREST[0]) * t);
    let g = Math.round(FOREST[1] + (FOREST_DARK[1] - FOREST[1]) * t);
    let b = Math.round(FOREST[2] + (FOREST_DARK[2] - FOREST[2]) * t);
    // soft mint diagonal beam, bottom-right
    const beam = (x + y) / (w + h);
    if (beam > 0.62 && beam < 0.78) {
      const k = 1 - Math.abs(beam - 0.7) / 0.08;
      r = Math.round(r + (MINT[0] - r) * k * 0.35);
      g = Math.round(g + (MINT[1] - g) * k * 0.35);
      b = Math.round(b + (MINT[2] - b) * k * 0.35);
    }
    return [r, g, b];
  });
  writeFileSync('public/og-image.png', buf);
  console.log(`wrote public/og-image.png (1200x630, ${buf.length} bytes)`);
}

squarePng(16, 'favicon-16x16.png');
squarePng(32, 'favicon-32x32.png');
squarePng(150, 'mstile-150x150.png');
squarePng(180, 'apple-touch-icon.png');
squarePng(192, 'android-chrome-192x192.png');
squarePng(512, 'android-chrome-512x512.png');
ogImage();