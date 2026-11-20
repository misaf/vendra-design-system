import {test, expect} from '@playwright/test';
import {openSite} from './helpers.mjs';
import {captureImages} from './image-capture-helpers.mjs';

test.use({reducedMotion: 'reduce'});
test.beforeEach(async ({page}, info) => {
  test.skip(info.project.name !== 'desktop', 'historical capture diagnostic, not device coverage');
  await page.clock.install({time: new Date('2026-10-05T09:00:00+03:30')});
});

const photos = '.vf-shop-product-grid .ag-product img';
const capture = (page, info, name, viewport) =>
  captureImages(page, info, name, viewport, {selector: photos, count: 6});

for (const width of [768, 1920]) {
  test.describe(`shop capture at ${width}px`, () => {
    test.use({viewport: {width, height: 1000}, hasTouch: width === 768});
    for (const lang of ['en', 'fa']) {
      test(`decoded photos survive direct, reload and routed capture (${lang})`, async ({
        page
      }, info) => {
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        const viewport = {width, height: 1000};
        const extra = width === 1920 ? {tv: '1'} : {};
        await openSite(page, 'shop', lang, extra);
        const direct = await capture(page, info, 'direct', viewport);
        await page.reload();
        expect(await capture(page, info, 'reload', viewport)).toEqual(direct);
        await openSite(page, 'home', lang, extra);
        await page.evaluate(() => {
          window.__shopCaptureDocument = true;
        });
        const entry = page.locator('.vf-home-arrivals .ag-sechead a[href*="/shop/"]').first();
        await entry.scrollIntoViewIfNeeded();
        if (width === 768) await entry.tap();
        else await entry.click();
        await expect(page.locator('main h1')).toBeFocused();
        await page.evaluate(
          () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
        );
        expect(await page.evaluate(() => window.__shopCaptureDocument)).toBe(true);
        expect(await capture(page, info, 'routed', viewport)).toEqual(direct);
        expect(errors).toEqual([]);
      });
    }
  });
}
