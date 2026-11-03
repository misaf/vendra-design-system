// Browsing and recovery with actual touch taps inside the normal sticky shell.
import {test, expect} from '@playwright/test';
import {openSite} from './helpers.mjs';
import {reachable, tap, shell, finish} from './device-helpers.mjs';

test.use({reducedMotion: 'reduce'});
test.beforeEach(async ({page}, info) => {
  test.skip(!['touch-phone', 'tablet'].includes(info.project.name), 'dedicated touch projects');
  await page.clock.install({time: new Date('2026-10-05T09:00:00+03:30')});
  expect(await page.evaluate(() => navigator.maxTouchPoints)).toBeGreaterThan(0);
});

const params = page => Object.fromEntries(new URL(page.url()).searchParams);
const homeLink = (page, fa) =>
  page.getByRole('main').getByRole('link', {name: fa ? 'صفحه اصلی' : 'Back home', exact: true});

for (const lang of ['en', 'fa']) {
  const fa = lang === 'fa';
  test(`touch search restores its filtered shop origin (${lang})`, async ({page}, info) => {
    await openSite(page, 'shop', lang, {cat: 'bouquets', filters: 'roses', sort: 'low'});
    const origin = params(page);
    await shell(page, lang);
    await tap(page.locator('.vf-shell-header a[href*="view=search"]:visible').first());
    const field = page.getByRole('searchbox');
    await tap(field);
    await expect(field).toBeFocused();
    const historyLength = await page.evaluate(() => history.length);
    await field.fill('VF-8RD5WN');
    await expect(page.locator('.vf-search-name')).toHaveText(['VF-8RD5WN']);
    expect(params(page).q).toBe('VF-8RD5WN');
    expect(await page.evaluate(() => history.length)).toBe(historyLength);
    await tap(page.locator('.vf-search-result'));
    await expect(page.locator('.vf-product-title h1')).toHaveText('VF-8RD5WN');
    await expect(page.locator('main h1')).toBeFocused();
    await page.goBack();
    await expect(field).toHaveValue('VF-8RD5WN');
    await page.reload();
    await expect(field).toHaveValue('VF-8RD5WN');
    await tap(page.locator('.ag-search__clear'));
    await expect(field).toHaveValue('');
    await expect(field).toBeFocused();
    expect(params(page).q).toBeUndefined();
    await field.fill('no-such-flower & + گل');
    await expect(page.locator('.vf-search-result')).toHaveCount(0);
    await page.reload();
    await expect(field).toHaveValue('no-such-flower & + گل');
    expect(params(page).q).toBe('no-such-flower & + گل');
    const close = page.getByRole('link', {name: fa ? 'بستن جستجو' : 'Close search', exact: true});
    await finish(page, lang, info, close);
    await tap(close);
    await expect(page.locator('.vf-shop-results')).toBeVisible();
    expect(params(page)).toEqual(origin);
  });

  test(`touch saved undo restores only the last removal (${lang})`, async ({page}, info) => {
    await openSite(page, 'saved', lang);
    const cards = page.locator('main .ag-product');
    const names = page.locator('main .ag-product__name');
    const initial = await names.allTextContents();
    expect(initial).toHaveLength(3);
    const remove = () =>
      tap(
        cards.first().getByRole('button', {
          name: fa ? 'حذف از ذخیره‌ها' : 'Remove from saved',
          exact: true
        })
      );
    const undo = page.getByRole('button', {name: fa ? 'بازگردانی' : 'Undo', exact: true});
    await remove();
    await expect(names).toHaveText(initial.slice(1));
    await remove();
    await expect(names).toHaveText(initial.slice(2));
    await expect(undo).toBeFocused();
    await reachable(undo, {scroll: false});
    await tap(undo);
    await expect(names).toHaveText(initial.slice(1));
    await expect(cards.first().locator('.ag-product__fav')).toBeFocused();
    await reachable(cards.first().locator('.ag-product__fav'), {scroll: false});
    await remove();
    await remove();
    await expect(cards).toHaveCount(0);
    await expect(page.locator('.vf-saved-empty')).toBeVisible();
    await expect(undo).toBeFocused();
    await reachable(undo, {scroll: false});
    await finish(page, lang, info, undo);
    await tap(undo);
    await expect(names).toHaveText(initial.slice(-1));
    await expect(page.locator('.vf-saved-empty')).toHaveCount(0);
    await page.reload();
    await expect(names).toHaveText(initial.slice(-1));
    await shell(page, lang);
    await reachable(cards.first().locator('.ag-product__fav'));
  });

  test(`touch missing-page recovery returns home (${lang})`, async ({page}, info) => {
    await openSite(page, 'notfound', lang);
    await expect(page.locator('main h1')).toContainText(fa ? 'پژمرده شده.' : 'wilted.');
    const home = homeLink(page, fa);
    await finish(page, lang, info, home);
    await tap(home);
    await expect(page.locator('.vf-shopping--home')).toBeVisible();
    await expect(page.locator('main h1')).toBeFocused();
    await shell(page, lang);
  });

  test(`touch error retry preserves the recovery path (${lang})`, async ({page}, info) => {
    await openSite(page, 'error', lang);
    const retry = page.getByRole('button', {name: fa ? 'تلاش دوباره' : 'Try again', exact: true});
    await reachable(retry);
    await Promise.all([page.waitForEvent('load'), retry.tap()]);
    await expect(page.locator('main h1')).toContainText(
      fa ? 'مشکلی پیش آمد' : 'Something went wrong'
    );
    expect(params(page)).toMatchObject({view: 'error', lang});
    await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', /noindex/);
    // Inspect the telephone fallback without opening an external handler.
    const phone = page.locator('main a[href^="tel:"]');
    await reachable(phone);
    await finish(page, lang, info, retry);
    await tap(homeLink(page, fa));
    await expect(page.locator('.vf-shopping--home')).toBeVisible();
    await expect(page.locator('main h1')).toBeFocused();
    await shell(page, lang);
  });
}
