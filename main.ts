// News-image entry (Node 22, standard library only): copy the pre-rendered
// broadsheet PNG beside this file to /output/entry.png. The program never
// deletes anything: it only creates the output directory and copies in.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const dst = join(outDir, 'entry.png');

// Validate the shipped image before copying: whole PNG, 768x1024, <= 1 MiB.
const buf = readFileSync(src);
if (buf.length > 1048576) throw new Error('entry.png exceeds 1 MiB: ' + buf.length);
if (!buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
  throw new Error('entry.png is not a PNG');
}
const w = buf.readUInt32BE(16);
const h = buf.readUInt32BE(20);
if (w !== 768 || h !== 1024) throw new Error('entry.png must be 768x1024, got ' + w + 'x' + h);
if (!buf.subarray(buf.length - 12).equals(Buffer.from([0, 0, 0, 0, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82]))) {
  throw new Error('entry.png is missing its IEND chunk');
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);
// Confirm the copy landed whole: same byte count as the validated source.
if (statSync(dst).size !== buf.length) throw new Error('copy size mismatch');
console.log('copied', statSync(dst).size, 'bytes to', dst);
