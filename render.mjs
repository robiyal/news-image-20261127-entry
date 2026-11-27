// Render broadsheet.html to entry.png (768x1024) with Playwright + Chromium 1148.
// Deterministic: no network, system fonts only, fixed viewport, no animations.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('/home/hatch/workspace/playwright-automation/node_modules/playwright');
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(here, 'broadsheet.html');
const outPath = join(here, 'entry.png');

const browser = await chromium.launch({
  executablePath: process.env.HOME + '/.cache/ms-playwright/chromium-1148/chrome-linux/chrome',
  args: ['--no-sandbox', '--force-device-scale-factor=1'],
});
const page = await browser.newPage({ viewport: { width: 768, height: 1024 } });
await page.goto('file://' + htmlPath, { waitUntil: 'load' });
await page.waitForTimeout(400);
await page.screenshot({ path: outPath });
await browser.close();
console.log('wrote', outPath);
