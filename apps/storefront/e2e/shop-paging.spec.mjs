// "Show more" in the shop. The store shows VF_STORE.shopPageSize (12) designs per page, more than
// the six sample designs, so these tests serve the store config with four per page. The development
// server serves the source module the app imports, so this spec runs with E2E_TARGET=dev.
import {test, expect} from '@playwright/test';
import {openSite, routeOf} from './helpers.mjs';
import {reachable, tap, finish} from './device-helpers.mjs';
import {vfCopy} from '../pages/shop/copy.js';

async function shopPageSize(page, size) {
  await page.route('**/apps/storefront/shared/domain/store-config.js*', async route => {
    const response = await route.fetch();
    const source = await response.text();
    const body = source.replace(/shopPageSize: \d+/, `shopPageSize: ${size}`);
    if (body === source) throw new Error('store-config.js no longer sets shopPageSize');
    await route.fulfill({response, body});
  });
}

const params = page => new Map(Object.entries(routeOf(page.url())));
const sortControl = page =>
  page
    .locator(
      '.vf-shop-sorting:visible .ag-select button, .vf-shop-mobile-bar:visible .ag-select button'
    )
    .first();
const prices = page =>
  page
    .locator('.vf-shop-product-grid .ag-price__now')
    .allTextContents()
    .then(values =>
      values.map(value =>
        Number(value.replace(/[۰-۹]/g, digit => '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)).replace(/\D/g, ''))
      )
    );

test.use({reducedMotion: 'reduce'});
test.beforeEach(async ({page}) => {
  await shopPageSize(page, 4);
});

test('the shop shows a page of designs, then the rest, keeping the page in the URL', async ({
  page
}) => {
  await openSite(page, 'shop', 'en');
  const grid = page.locator('.vf-shop-product-grid .ag-product__link');
  await expect(grid).toHaveCount(4);
  await expect(page.getByText('Showing 4 of 6 designs')).toBeVisible();
  const more = page.getByRole('link', {name: 'Show more'});
  await expect(more).toHaveAttribute('href', /page=2/);
  await more.click();
  await expect(grid).toHaveCount(6);
  await expect(page.getByText('Showing all 6 designs')).toBeVisible();
  await expect(page.getByRole('link', {name: 'Show more'})).toHaveCount(0);
  // Focus moves to the first design that was just loaded.
  await expect(grid.nth(4)).toBeFocused();
  expect(page.url()).toMatch(/page=2/);
  await page.reload();
  await expect(grid).toHaveCount(6);
  // A new filter starts again from the first page.
  await page.getByRole('button', {name: 'Same day'}).first().click();
  expect(page.url()).not.toMatch(/page=/);
});

// The touch-phone and tablet projects run on the build only: these run the phone and desktop
// viewports with touch instead.
test.describe('touch', () => {
  test.use({hasTouch: true});
  for (const lang of ['en', 'fa']) {
    const copy = vfCopy({lang, n: n => new Intl.NumberFormat(lang).format(n)});
    test(`touch sort and load-more survive reload (${lang})`, async ({page}, info) => {
      await page.clock.install({time: new Date('2026-10-05T09:00:00+03:30')});
      await openSite(page, 'shop', lang);
      const cards = page.locator('.vf-shop-product-grid .ag-product');
      await expect(cards).toHaveCount(4);
      await tap(sortControl(page));
      await tap(page.getByRole('option', {name: copy.sortOptions[1].label, exact: true}));
      await expect(page).toHaveURL(/sort=low/);
      const initial = await prices(page);
      expect(initial).toEqual([...initial].sort((a, b) => a - b));
      const more = page.getByRole('link', {name: copy.showMore, exact: true});
      await tap(more);
      await expect(cards).toHaveCount(6);
      const added = page.locator('.vf-shop-product-grid .ag-product__link').nth(4);
      await expect(added).toBeFocused();
      await reachable(added, {scroll: false});
      const all = await prices(page);
      expect(all).toHaveLength(6);
      expect(all).toEqual([...all].sort((a, b) => a - b));
      const names = await cards.locator('.ag-product__name').allTextContents();
      await page.reload();
      await expect(cards).toHaveCount(6);
      await expect(cards.locator('.ag-product__name')).toHaveText(names);
      expect(params(page).get('sort')).toBe('low');
      await tap(sortControl(page));
      await tap(page.getByRole('option', {name: copy.sortOptions[2].label, exact: true}));
      await expect(cards).toHaveCount(4);
      expect(params(page).get('sort')).toBe('high');
      expect(params(page).has('page')).toBe(false);
      await finish(page, lang, info, sortControl(page));
    });
  }
});
