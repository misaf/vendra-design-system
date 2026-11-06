import {test, expect} from '@playwright/test';
import {openSite, routeOf} from './helpers.mjs';
import {reachable, tap, shell, finish} from './device-helpers.mjs';
import {vfCopy} from '../storefront-shop/copy.js';
import {VF_MONEY} from '../_shared/domain/formatting.js';

test.use({reducedMotion: 'reduce'});
test.beforeEach(async ({page}, info) => {
  test.skip(!['touch-phone', 'tablet'].includes(info.project.name), 'dedicated touch projects');
  await page.clock.install({time: new Date('2026-10-05T09:00:00+03:30')});
  expect(await page.evaluate(() => navigator.maxTouchPoints)).toBeGreaterThan(0);
});

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

for (const lang of ['en', 'fa']) {
  const fa = lang === 'fa';
  const copy = vfCopy({lang, n: n => new Intl.NumberFormat(lang).format(n)});
  test(`touch home categories lead to a product and back (${lang})`, async ({page}, info) => {
    await openSite(page, 'home', lang);
    const category = page.locator('.vf-home-category-circles').getByRole('link').first();
    const cat = routeOf(await category.getAttribute('href')).cat;
    expect(cat).toBeTruthy();
    await finish(page, lang, info, category);
    await tap(category);
    expect(params(page).get('view')).toBe('shop');
    expect(params(page).get('cat')).toBe(cat);
    await expect(page.locator('main h1')).toBeFocused();
    const product = page.locator('.vf-shop-product-grid .ag-product__link').first();
    const id = routeOf(await product.getAttribute('href')).id;
    expect(id).toMatch(/^VF-[A-Z0-9]{6}$/);
    await tap(product);
    await expect(page.locator('main h1')).toHaveText(id);
    await expect(page.locator('main h1')).toBeFocused();
    expect(params(page).get('id')).toBe(id);
    await page.goBack();
    await expect(page.locator('.vf-shop-product-grid')).toBeVisible();
    expect(params(page).get('cat')).toBe(cat);
    await shell(page, lang);
    await reachable(product);
  });

  test(`touch sort and load-more survive reload (${lang})`, async ({page}, info) => {
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
    const descending = await prices(page);
    expect(descending).toEqual([...descending].sort((a, b) => b - a));
    await finish(page, lang, info, sortControl(page));
    expect(params(page).get('sort')).toBe('high');
  });

  test(`touch stock and quick filters recover without history churn (${lang})`, async ({
    page
  }, info) => {
    await openSite(page, 'shop', lang);
    const historyLength = await page.evaluate(() => history.length);
    const phone = info.project.name === 'touch-phone';
    const opener = page
      .locator('.vf-shop-mobile-bar')
      .getByRole('button', {name: fa ? /^فیلترها/ : /^Filters/});
    const dialog = page.getByRole('dialog', {name: copy.migration.filters, exact: true});
    if (phone) await tap(opener);
    const scope = phone ? dialog : page.locator('.vf-shop-sidebar');
    const stock = scope.getByRole('switch', {name: copy.migration.stock, exact: true});
    await tap(
      scope.locator('label.ag-switch').filter({
        has: page.getByRole('switch', {name: copy.migration.stock, exact: true})
      })
    );
    await expect(stock).toBeChecked();
    expect(params(page).get('stock')).toBe('1');
    if (phone) {
      const show = dialog.locator('.vf-shop-dialog-actions').getByRole('button').first();
      await expect(show).toContainText(copy.designCount(5));
      await tap(show);
      await expect(dialog).toHaveCount(0);
      await expect(opener).toBeFocused();
      await reachable(opener, {scroll: false});
    }
    await expect(page.locator('#vf-shop-count')).toHaveText(copy.designCount(5));
    await page.reload();
    expect(params(page).get('stock')).toBe('1');
    await expect(page.locator('#vf-shop-count')).toHaveText(copy.designCount(5));
    await tap(
      page
        .locator('.vf-shop-active-filters')
        .getByRole('button', {name: fa ? 'پاک کردن همه' : 'Clear all', exact: true})
    );
    await expect(page.locator('#vf-shop-count')).toBeFocused();
    await reachable(page.locator('#vf-shop-count'), {scroll: false});
    expect(params(page).has('stock')).toBe(false);
    const under = page.locator('.vf-shop-quick-filters').getByRole('button', {
      name: copy.chipLabels.under3.replace('{price}', VF_MONEY(3000000, fa)),
      exact: true
    });
    await tap(under);
    await expect(under).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.vf-shop-product-grid .ag-product')).toHaveCount(2);
    expect(params(page).get('filters')).toBe('under3');
    await tap(under);
    await expect(under).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('.vf-shop-product-grid .ag-product')).toHaveCount(4);
    expect(params(page).has('filters')).toBe(false);
    expect(await page.evaluate(() => history.length)).toBe(historyLength);
    await finish(page, lang, info, under);
  });
}
