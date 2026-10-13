import {test, expect} from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import {ROOT as root, TENANTS, expectNoViteError, waitForQuiet} from './helpers.mjs';

// Every @dsCard in guidelines/ and components/, at the viewport its header declares.
function cards() {
  const found = [];
  for (const dir of ['guidelines', 'components']) {
    for (const file of fs.readdirSync(path.join(root, dir), {recursive: true})) {
      if (!file.endsWith('.html')) continue;
      const first = fs.readFileSync(path.join(root, dir, file), 'utf8').split('\n', 1)[0];
      const m = first.match(/@dsCard\b.*?viewport="(\d+)x(\d+)"/);
      if (m)
        found.push({file: dir + '/' + file.split(path.sep).join('/'), width: +m[1], height: +m[2]});
    }
  }
  return found.sort((a, b) => a.file.localeCompare(b.file));
}

// Cards set their own viewport, so they run once.
test.beforeEach(({}, info) =>
  test.skip(info.project.name !== 'desktop', 'cards run in the desktop project only')
);

async function openCard(page, card, tenant) {
  if (tenant)
    await page.addInitScript(t => document.documentElement.setAttribute('data-tenant', t), tenant);
  await page.setViewportSize({width: card.width, height: card.height});
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/' + card.file);
  await waitForQuiet(page);
  await expectNoViteError(page);
  await page.evaluate(() => document.fonts.ready);
  return errors;
}

for (const tenant of [null, ...TENANTS]) {
  test(`contrast card passes (${tenant || 'default'} tenant)`, async ({page}) => {
    await openCard(
      page,
      {file: 'guidelines/colors-contrast.html', width: 700, height: 2320},
      tenant
    );
    await expect(page.locator('#rows .r.pass').first()).toBeVisible();
    const fails = await page.locator('#rows tr:has(.r.fail) code').allTextContents();
    expect(fails).toEqual([]);
  });
}

for (const card of cards()) {
  test(`card: ${card.file}`, async ({page}) => {
    const errors = await openCard(page, card);
    expect(errors, 'no runtime errors').toEqual([]);
    await expect(page).toHaveScreenshot(
      card.file.replace(/\.html$/, '').replaceAll('/', '__') + '.png',
      {fullPage: true}
    );
  });
}

// Forced-colour modes (Windows High Contrast) drop backgrounds and shadows. The component cards are
// checked there too: every visible icon differs from the colour behind it, and selected,
// checked and error states keep a visible difference (screenshot).
for (const card of cards().filter(card => card.file.startsWith('guidelines/components/'))) {
  test(`forced colours: ${card.file}`, async ({page}) => {
    await page.emulateMedia({forcedColors: 'active', colorScheme: 'dark'});
    const errors = await openCard(page, card);
    expect(errors, 'no runtime errors').toEqual([]);
    const invisible = await page.evaluate(() => {
      // The colour behind an icon: its nearest ancestor with a painted background.
      const backdrop = element => {
        for (let ancestor = element.parentElement; ancestor; ancestor = ancestor.parentElement) {
          const color = getComputedStyle(ancestor).backgroundColor;
          if (color !== 'rgba(0, 0, 0, 0)') return color;
        }
        return getComputedStyle(document.documentElement).backgroundColor;
      };
      return [...document.querySelectorAll('.ag-icon')]
        .filter(
          icon => icon.getClientRects().length && getComputedStyle(icon).visibility !== 'hidden'
        )
        .filter(icon => getComputedStyle(icon).backgroundColor === backdrop(icon))
        .map(icon => icon.parentElement.className || icon.parentElement.tagName);
    });
    expect(invisible, 'icons drawn in the colour behind them').toEqual([]);
    await expect(page).toHaveScreenshot(
      'forced-colors__' + card.file.replace(/\.html$/, '').replaceAll('/', '__') + '.png',
      {fullPage: true}
    );
  });
}
