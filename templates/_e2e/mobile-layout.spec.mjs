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
    [375, 2, 145],
    [390, 2, 155],
    [768, 2, 300],
    [1024, 4, 180],
    [1280, 4, 220]
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

// The shell's three tiers come from CSS breakpoints: phones get the compact header and the tab bar,
// portrait tablets (768–1023px) the menu header with room for the language switch and account and
// no tab bar, and 1024px up the desktop header. Resizing switches tiers without a reload.
const TIERS = [
  [320, 'phone'],
  [375, 'phone'],
  [768, 'tablet'],
  [1024, 'desktop'],
  [1280, 'desktop']
];
async function expectTier(page, width, tier, lang) {
  const en = lang === 'en';
  const header = page.locator('.vf-shell-header');
  const menu = header.getByRole('button', {name: en ? 'Menu' : 'منو', exact: true});
  const account = header.getByRole('link', {name: en ? 'Account' : 'حساب', exact: true});
  const tabs = page.locator('.ag-tabbar');
  await expect(header.locator('.vf-shell-desktop-header')).toBeVisible({
    visible: tier === 'desktop'
  });
  await expect(header.locator('.vf-shell-mobile-header')).toBeVisible({
    visible: tier !== 'desktop'
  });
  await expect(menu).toBeVisible({visible: tier !== 'desktop'});
  await expect(account).toBeVisible({visible: tier !== 'phone'});
  await expect(header.locator('.ag-lang:visible')).toHaveCount(tier === 'phone' ? 0 : 1);
  await expect(tabs).toBeVisible({visible: tier === 'phone'});
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    width
  );
}

for (const lang of ['en', 'fa']) {
  for (const [width, tier] of TIERS)
    test(`the shell shows its ${tier} layout at ${width}px (${lang})`, async ({page}) => {
      await page.setViewportSize({width, height: 900});
      await openSite(page, 'product', lang);
      await expectTier(page, width, tier, lang);
      // The product's own add-to-bag: a sticky bar above the tab bar on phones, in the buy box from 768px.
      await expect(page.locator('.vf-product-mobile-action')).toBeVisible({
        visible: tier === 'phone'
      });
      await expect(page.locator('.vf-product-add-button')).toBeVisible({
        visible: tier !== 'phone'
      });
      if (tier !== 'desktop') {
        await page
          .locator('.vf-shell-header')
          .getByRole('button', {name: lang === 'en' ? 'Menu' : 'منو', exact: true})
          .click();
        await expect(page.getByRole('dialog')).toBeVisible();
      }
    });

  test(`resizing moves between the tiers in place (${lang})`, async ({page}) => {
    await page.setViewportSize({width: 375, height: 900});
    await openSite(page, 'home', lang);
    // Mark the header: CSS switches tiers, so the same element stays through every width.
    await page.evaluate(() =>
      document.querySelector('.vf-shell-header').setAttribute('data-e2e', '1')
    );
    await page
      .locator('.vf-shell-header')
      .getByRole('button', {name: lang === 'en' ? 'Menu' : 'منو', exact: true})
      .click();
    await expect(page.getByRole('dialog')).toBeVisible();
    for (const [width, tier] of [...TIERS, ...[...TIERS].reverse()]) {
      await page.setViewportSize({width, height: 900});
      if (tier === 'desktop') await expect(page.getByRole('dialog')).toHaveCount(0);
      await expectTier(page, width, tier, lang);
    }
    await expect(page.locator('.vf-shell-header[data-e2e]')).toHaveCount(1);
  });
}

for (const lang of ['en', 'fa']) {
  for (const width of [320, 390, 768]) {
    test(`search controls and results fit at ${width}px (${lang})`, async ({page}) => {
      await page.setViewportSize({width, height: 844});
      await openSite(page, 'search', lang);
      const search = page.getByRole('searchbox');
      const close = page.locator('.vf-search-controls a');
      const fits = async () => {
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
          width
        );
        const box = await close.boundingBox();
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(width);
      };
      await fits();
      await search.fill('VF-7K2M4Q');
      await expect(page.locator('.vf-search-result').first()).toBeVisible();
      await fits();
      await expectPricesInsideCards(page.locator('.vf-search-result'));
      await page.locator('.ag-search__clear').tap();
      await expect(search).toHaveValue('');
      await fits();
      await close.tap();
      await expect(page.locator('.vf-home-top')).toBeVisible();
    });
  }
}
