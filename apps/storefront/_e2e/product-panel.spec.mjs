import {test, expect} from '@playwright/test';
import {openSite, scanAxe, settlePage} from './helpers.mjs';

for (const width of [258, 390, 768, 1280, 1920]) {
  test.describe(`purchase panel at ${width}px`, () => {
    test.use({viewport: {width, height: 1000}, hasTouch: width < 1280});
    for (const lang of ['en', 'fa']) {
      test(`code, price and availability remain readable (${lang})`, async ({page}) => {
        await openSite(page, 'product', lang, width === 1920 ? {tv: '1'} : {});
        await settlePage(page);
        const panel = page.locator('.vf-product-details');
        await expect(panel.getByRole('heading', {level: 1})).toHaveText('VF-7K2M4Q');
        expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(
          0
        );
        const contained = await panel.evaluate(element => {
          const panel = element.getBoundingClientRect();
          return [...element.querySelectorAll('h1, .ag-price__now, .ag-stock, .ag-choice')].every(
            item => {
              const range = document.createRange();
              range.selectNodeContents(item);
              return [...range.getClientRects()].every(
                rect => rect.left >= panel.left - 1 && rect.right <= panel.right + 1
              );
            }
          );
        });
        expect(contained).toBe(true);
        const copy = panel.locator('.vf-product-title .ag-btn');
        expect((await copy.boundingBox()).height).toBeGreaterThanOrEqual(width === 1920 ? 64 : 44);
        await copy.focus();
        await expect(copy).toBeFocused();
        if (width === 390 || width === 768) expect(await scanAxe(page)).toEqual([]);
      });
    }
  });
}
