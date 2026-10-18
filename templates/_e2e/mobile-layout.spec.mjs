import {test, expect} from '@playwright/test';
import {openSite} from './helpers.mjs';

test.use({hasTouch: true});

async function expectPricesInsideCards(cards) {
  expect(
    await cards.evaluateAll(elements =>
      elements.every(card => {
        const box = card.getBoundingClientRect();
        const price = card.querySelector('.ag-price__now');
        const range = document.createRange();
        range.selectNodeContents(price);
        return [...range.getClientRects()].every(
          rect => rect.left >= box.left - 1 && rect.right <= box.right + 1
        );
      })
    )
  ).toBe(true);
}

for (const lang of ['en', 'fa']) {
  for (const [width, columns, minimumPhoto] of [
    [258, 1, 190],
    [320, 2, 120],
    [360, 2, 140],
    [390, 2, 155],
    [768, 2, 300],
    [1024, 4, 180]
  ]) {
    test(`readable featured products and compact shop layout at ${width}px (${lang})`, async ({
      page
    }) => {
      await page.setViewportSize({width, height: 900});
      await openSite(page, 'home', lang);
      await page.evaluate(() => document.fonts.ready);
      const grid = page.locator('.vf-home-featured-grid');
      expect(
        await grid.evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length)
      ).toBe(columns);
      const cards = grid.locator('.ag-product');
      expect((await cards.first().boundingBox()).width).toBeGreaterThanOrEqual(minimumPhoto);
      await expectPricesInsideCards(cards);
      if (width >= 320 && width < 768) {
        expect(
          await page
            .locator('.vf-home-featured .ag-sechead__title')
            .evaluate(
              el => el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).fontSize)
            )
        ).toBeLessThan(1.6);
        expect(
          await page
            .locator('.vf-home-featured .ag-eyebrow')
            .evaluate(
              el => el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight)
            )
        ).toBeLessThan(1.1);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        width
      );

      await openSite(page, 'shop', lang);
      await page.evaluate(() => document.fonts.ready);
      const products = page.locator('.vf-shop-product-grid .ag-product');
      await expectPricesInsideCards(products);
      if (width < 1024) {
        expect(
          await products.first().evaluate(el => {
            const title = el.querySelector('.ag-product__name').getBoundingClientRect();
            const sub = el.querySelector('.ag-product__sub').getBoundingClientRect();
            const price = el.querySelector('.ag-product__price').getBoundingClientRect();
            return Math.max(sub.top - title.bottom, price.top - sub.bottom);
          })
        ).toBeLessThanOrEqual(10);
      }
      if (width < 768) {
        const filters = page.getByRole('group', {
          name: lang === 'en' ? 'Quick filters' : 'فیلترهای سریع',
          exact: true
        });
        expect(
          await filters
            .locator('button')
            .evaluateAll(
              buttons =>
                new Set(buttons.map(button => Math.round(button.getBoundingClientRect().top))).size
            )
        ).toBe(1);
        const last = filters.locator('button').last();
        await last.focus();
        await expect
          .poll(() =>
            last.evaluate(el => {
              const box = el.getBoundingClientRect();
              const rail = el.parentElement.getBoundingClientRect();
              return box.left >= rail.left - 1 && box.right <= rail.right + 1;
            })
          )
          .toBe(true);
        await last.tap();
        await expect(last).toHaveAttribute('aria-pressed', 'true');
        await expect(page).toHaveURL(/filters=roses/);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        width
      );
    });
  }
}
