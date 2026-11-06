import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

test.use({hasTouch: true});

for (const lang of ['en', 'fa']) {
  for (const width of [320, 390, 768]) {
    test(`search results keep codes and prices readable (${lang}, ${width}px touch)`, async ({
      page
    }) => {
      await page.setViewportSize({width, height: 844});
      await openSite(page, 'search', lang, {q: 'rose'});
      const results = page.locator('.vf-search-result');
      expect(await results.count()).toBeGreaterThanOrEqual(2);
      const containerWidth = await page
        .locator('.vf-search-results')
        .evaluate(el => el.clientWidth);
      for (const result of await results.all()) {
        const code = result.locator('.vf-search-name');
        await expect(code).toHaveText(/^VF-[A-Z0-9]{6}$/);
        await expect(code).toHaveAttribute('dir', 'ltr');
        expect(await code.evaluate(el => getComputedStyle(el).fontFamily)).toMatch(/monospace/);
        const row = await result.boundingBox();
        const details = await result.locator('.vf-search-details').boundingBox();
        const price = await result.locator('.vf-price').boundingBox();
        const image = await result.locator('.vf-search-thumbnail').boundingBox();
        expect(image.width).toBe(48);
        for (const selector of ['.vf-search-name', '.vf-search-subtitle', '.vf-price']) {
          const box = await result.locator(selector).boundingBox();
          expect(box.x).toBeGreaterThanOrEqual(row.x - 1);
          expect(box.x + box.width).toBeLessThanOrEqual(row.x + row.width + 1);
          expect(
            await result.locator(selector).evaluate(el => el.scrollWidth <= el.clientWidth)
          ).toBe(true);
        }
        if (containerWidth < 560) {
          expect(price.y).toBeGreaterThanOrEqual(details.y + details.height);
          const start = box => (lang === 'fa' ? box.x + box.width : box.x);
          expect(Math.abs(start(price) - start(details))).toBeLessThan(1);
          expect(row.height).toBeLessThanOrEqual(112);
        } else {
          expect(
            Math.abs(price.y + price.height / 2 - (details.y + details.height / 2))
          ).toBeLessThan(1);
        }
      }
      expect(await scanAxe(page)).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({path: `/tmp/vendra-search-results-${lang}-${width}.png`});
      const firstCode = await results.first().locator('.vf-search-name').textContent();
      await results.first().focus();
      await expect(results.first()).toBeFocused();
      await results.first().press('Enter');
      await expect(page.locator('.vf-product-title h1')).toHaveText(firstCode);
      await page.goBack();
      await expect(page.getByRole('searchbox')).toHaveValue('rose');
      await expect(page.locator('.vf-search-name').first()).toHaveText(firstCode);
    });
  }
}
