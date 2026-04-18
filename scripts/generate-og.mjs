// Generates og.png (1200x630) and apple-touch-icon.png (180x180)
// from og-generator.html and favicon.svg.
//
// Usage: node scripts/generate-og.mjs
// Requires: npm install --no-save playwright

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

const browser = await chromium.launch();

// OG image — exact 1200x630 spec
{
  const context = await browser.newContext({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.goto('file://' + path.join(projectRoot, 'og-generator.html'));
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(projectRoot, 'og.png'),
    fullPage: false,
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });
  await context.close();
  console.log('Wrote og.png');
}

// apple-touch-icon — exact 180x180 spec
{
  const context = await browser.newContext({
    viewport: { width: 180, height: 180 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.goto('file://' + path.join(projectRoot, 'favicon.svg'));
  await page.waitForTimeout(200);
  await page.screenshot({
    path: path.join(projectRoot, 'apple-touch-icon.png'),
    omitBackground: false,
  });
  await context.close();
  console.log('Wrote apple-touch-icon.png');
}

await browser.close();
