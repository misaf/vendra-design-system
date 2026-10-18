import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

const history = ['VF-8RD5WN', 'VF-3HX9TP', 'VF-4CJ6ZB', 'VF-9FA2KE'];

for (const width of [258, 390, 768, 1280, 1920]) {
  test.describe(`recent products at ${width}px`, () => {
    test.use({viewport: {width, height: 1000}, hasTouch: width < 1280});
    for (const lang of ['en', 'fa']) {
      test(`readable cards and navigation follow overflow (${lang})`, async ({page}) => {
        await page.emulateMedia({reducedMotion: 'reduce'});
        await page.addInitScript(
          ids => localStorage.setItem('vendra-recently-viewed', JSON.stringify(ids)),
          history
        );
        await openSite(page, 'product', lang, width === 1920 ? {tv: '1'} : {});
        const section = page.locator('.vf-product-recent');
        const track = section.getByRole('region');
        const cards = track.locator('.ag-product');
        await expect(cards.locator('.ag-product__name')).toHaveText(history);
        await expect(track).toHaveAccessibleName(lang === 'fa' ? /۴ طرح/ : /4 designs/);
        expect((await cards.first().boundingBox()).width).toBeGreaterThanOrEqual(
          width === 258 ? 165 : width === 390 ? 260 : 220
        );
        const previous = section.getByRole('button', {includeHidden: true}).first();
        const next = section.getByRole('button', {includeHidden: true}).nth(1);
        if (width < 1024) {
          await expect(previous).toBeDisabled();
          await expect(next).toBeVisible();
          expect((await next.boundingBox()).width).toBeGreaterThanOrEqual(44);
          await next.tap();
          await expect(previous).toBeEnabled();
          await previous.tap();
          await expect(previous).toBeDisabled();
        } else {
          await expect(previous).toBeHidden();
          await expect(next).toBeHidden();
          await expect(section.locator('.vf-collection-count')).toBeHidden();
        }
        const last = cards.last().locator('.ag-product__link');
        await last.focus();
        await expect(last).toBeFocused();
        expect(
          await last.evaluate(element => {
            const card = element.closest('.ag-product').getBoundingClientRect();
            const viewport = element.closest('.ag-carousel__track').getBoundingClientRect();
            return card.left >= viewport.left - 1 && card.right <= viewport.right + 1;
          })
        ).toBe(true);
        expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(
          0
        );
        if (width === 390 || width === 1920) expect(await scanAxe(page)).toEqual([]);
        if (width === 390) {
          await page.setViewportSize({width: 1280, height: 900});
          await expect(next).toBeHidden();
          await page.setViewportSize({width: 390, height: 1000});
          await expect(previous).toBeVisible();
        }
      });
    }
  });
}

for (const lang of ['en', 'fa']) {
  test(`a single recent product has no empty navigation row (${lang})`, async ({page}) => {
    await page.setViewportSize({width: 390, height: 1000});
    await page.addInitScript(() =>
      localStorage.setItem('vendra-recently-viewed', JSON.stringify(['VF-8RD5WN']))
    );
    await openSite(page, 'product', lang);
    const section = page.locator('.vf-product-recent');
    await expect(section.locator('.ag-product')).toHaveCount(1);
    await expect(section.locator('.ag-carousel__nav')).toBeHidden();
    await expect(section.locator('.vf-collection-count')).toBeHidden();
    expect((await section.locator('.ag-product').boundingBox()).width).toBeGreaterThanOrEqual(350);
    await section.locator('.ag-product__link').click();
    await expect(page).toHaveURL(/id=VF-8RD5WN/);
    await expect(page.getByRole('heading', {level: 1})).toHaveText('VF-8RD5WN');
  });
}
