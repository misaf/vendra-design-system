import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

for (const device of [
  {name: 'phone', width: 390, height: 844, hasTouch: true},
  {name: 'tablet', width: 768, height: 1024, hasTouch: true},
  {name: 'desktop', width: 1280, height: 900, hasTouch: false},
  {name: 'TV', width: 1920, height: 1080, hasTouch: false}
]) {
  test.describe(device.name, () => {
    // Each path loads a destination and returns home; TV fonts and imagery take longer.
    test.describe.configure({timeout: 120_000});
    test.use({viewport: {width: device.width, height: device.height}, hasTouch: device.hasTouch});
    for (const lang of ['en', 'fa']) {
      test(`home discovery paths lead to shopping, inquiries and stories (${lang})`, async ({
        page
      }) => {
        const extra = device.name === 'TV' ? {tv: '1'} : {};
        await openSite(page, 'home', lang, extra);
        const sections = [
          '.vf-home-categories',
          '.vf-home-arrivals',
          '.vf-home-weddings',
          '.vf-home-journal'
        ];
        let bottom = 0;
        for (const selector of sections) {
          const section = page.locator(selector);
          await expect(section).toHaveAccessibleName(/.+/);
          const box = await section.boundingBox();
          expect(box.y).toBeGreaterThanOrEqual(bottom);
          bottom = box.y + box.height;
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(
          0
        );
        expect(await scanAxe(page)).toEqual([]);
        const paths = [
          ['.vf-home-categories .ag-cat', 'shop', 'occasion'],
          ['.vf-home-arrivals .ag-sechead__actions a', 'shop'],
          ['.vf-home-weddings .ag-btn', 'weddings'],
          ['.vf-home-weddings a:not(.ag-btn)', 'contact'],
          ['.vf-home-journal .ag-sechead__actions a', 'journal']
        ];
        for (const [selector, view, filter] of paths) {
          const link = page.locator(selector).first();
          await link.scrollIntoViewIfNeeded();
          const box = await link.boundingBox();
          expect(box.height).toBeGreaterThanOrEqual(44);
          await link.click();
          await expect(page).toHaveURL(new RegExp(`[?&]view=${view}(?:&|$)`));
          if (filter) expect(new URL(page.url()).searchParams.get(filter)).toBeTruthy();
          await expect(page.locator('#main')).toBeVisible();
          await openSite(page, 'home', lang, extra);
        }
      });
    }
  });
}
