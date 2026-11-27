// Render broadsheet.html to a square 1024x1024 entry.png with Playwright
// and the local Chromium build. Deterministic on purpose: file:// only
// (no network), system fonts only, fixed viewport, no animations, no
// random input — two runs must produce byte-identical PNGs.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('/home/hatch/workspace/playwright-automation/node_modules/playwright');

const here = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(here, 'broadsheet.html');
const outPath = join(here, 'entry.png');
const SIDE = 1024;

const browser = await chromium.launch({
  executablePath: process.env.HOME + '/.cache/ms-playwright/chromium-1148/chrome-linux/chrome',
  args: ['--no-sandbox', '--force-device-scale-factor=1'],
});
const page = await browser.newPage({ viewport: { width: SIDE, height: SIDE } });
await page.goto('file://' + htmlPath, { waitUntil: 'load' });
await page.waitForTimeout(400);
// Guard against overflow: the page must fit the square exactly.
const overflow = await page.evaluate(() => ({
  scrollW: document.documentElement.scrollWidth,
  scrollH: document.documentElement.scrollHeight,
}));
if (overflow.scrollW > SIDE || overflow.scrollH > SIDE) {
  throw new Error(`page overflows the ${SIDE}x${SIDE} canvas: ${overflow.scrollW}x${overflow.scrollH}`);
}
await page.screenshot({ path: outPath });
await browser.close();
console.log('wrote', outPath);
