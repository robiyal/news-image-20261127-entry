// News-image V2 entry (Node 22, standard library only).
// Copies the pre-rendered square broadsheet PNG next to this file into
// /output/entry.png. The program only creates the output directory and
// copies one file in — it never deletes, moves or rewrites anything, so a
// bind-mounted /output (the grader's setup) is safe.
//
// Local check: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const PNG_IEND = Buffer.from([0, 0, 0, 0, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82]);
const MAX_BYTES = 1048576; // 1 MiB gate
const SIDE = 1024; // square format, 1024x1024

const src = new URL('./entry.png', import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const dst = join(outDir, 'entry.png');

// Read and validate the shipped image before touching /output.
const buf = readFileSync(src);
if (buf.length > MAX_BYTES) {
  throw new Error(`entry.png exceeds 1 MiB: ${buf.length} bytes`);
}
if (!buf.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error('entry.png is not a PNG file');
}
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
if (width !== SIDE || height !== SIDE) {
  throw new Error(`entry.png must be ${SIDE}x${SIDE}, got ${width}x${height}`);
}
if (!buf.subarray(buf.length - 12).equals(PNG_IEND)) {
  throw new Error('entry.png is missing its IEND chunk');
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);

// Confirm the copy landed whole before reporting success.
const landed = statSync(dst).size;
if (landed !== buf.length) {
  throw new Error(`copy size mismatch: ${landed} vs ${buf.length}`);
}
console.log(`copied ${landed} bytes to ${dst}`);
