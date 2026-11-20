import {test, expect} from '@playwright/test';
import {openSite, pageChunk, routePayload, scanAxe} from '../helpers.mjs';

// A page shown on its own (?page=<name>) opens in the language asked for, wherever ?lang= sits.
for (const address of [
  '?page=presentation&lang=fa',
  '?lang=fa&page=presentation',
  '?page=shop&lang=fa',
  '?page=product&lang=fa',
  'fa/?page=shop'
]) {
  test(`the standalone page ${address} opens in Persian`, async ({page}) => {
    await page.goto('/' + address);
    await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page).toHaveTitle(/گل‌فروشی وندرا/);
  });
}

test('the site says when the connection drops and when it is back', async ({page, context}) => {
  await openSite(page, 'shop', 'fa');
  const band = page.locator('.ag-offline');
  await expect(band).toHaveText('');
  await context.setOffline(true);
  await expect(band).toContainText('اتصال اینترنت شما قطع است.');
  expect(await scanAxe(page)).toEqual([]);
  await context.setOffline(false);
  await expect(band).toHaveText('دوباره آنلاین هستید.');
});

test('the server-error page offers a retry, the way home and the phone', async ({page}) => {
  await openSite(page, 'error', 'en');
  const main = page.getByRole('main');
  await expect(main.getByRole('heading', {level: 1})).toContainText('Something went wrong');
  await expect(main.getByRole('link', {name: 'Back home'})).toBeVisible();
  await expect(main.getByRole('link', {name: /^Call /})).toHaveAttribute('href', /^tel:/);
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', /noindex/);
  // Try again reloads the page: wait for the reload before looking for the heading again.
  await Promise.all([
    page.waitForEvent('load'),
    main.getByRole('button', {name: 'Try again'}).click()
  ]);
  await expect(main.getByRole('heading', {level: 1})).toContainText('Something went wrong');
});

// A page whose Next.js chunk fails to load offers a reload while the rest of the site works.
test('a page that fails to load offers a reload', async ({page}) => {
  await page.route(pageChunk('shop'), route => route.abort());
  await openSite(page, 'home', 'en');
  await page.evaluate(() => window.__vfSite.navigate({view: 'shop'}));
  const alert = page.getByRole('alert').filter({hasText: 'This page didn’t load.'});
  await expect(alert).toBeVisible();
  await expect(alert.getByRole('button', {name: 'Reload'})).toBeVisible();
  await page.evaluate(() => window.__vfSite.navigate({view: 'faq'}));
  await expect(page.locator('h1')).toBeVisible();
  await expect(alert).toHaveCount(0);
});

test('a standalone page that fails to load offers a reload', async ({page}) => {
  await page.route(pageChunk('shop'), route => route.abort());
  await page.goto('/fa/?page=shop');
  await expect(page.getByRole('alert').filter({hasText: 'این صفحه بارگذاری نشد.'})).toBeVisible();
  await expect(page).toHaveTitle('این صفحه بارگذاری نشد. · گل‌فروشی وندرا');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
});

test('a page that fails to preload in the background never reloads the tab', async ({page}) => {
  let loads = 0;
  page.on('load', () => loads++);
  await page.route(pageChunk('shop'), route => route.abort());
  await openSite(page, 'checkout', 'en');
  await page.waitForTimeout(1500);
  expect(loads).toBe(1);
});

test('while a route payload loads, the current page stays on screen', async ({page}) => {
  let release;
  const held = new Promise(resolve => (release = resolve));
  await page.route(routePayload('shop'), async route => {
    await held;
    await route.continue();
  });
  await openSite(page, 'home', 'en');
  const home = await page.locator('h1').textContent();
  const url = page.url();
  await page.evaluate(() => window.__vfSite.navigate({view: 'shop'}));
  await page.waitForTimeout(300);
  await expect(page.locator('h1')).toHaveText(home);
  await expect(page.locator('#main')).toBeVisible();
  expect(page.url()).toBe(url);
  release();
  await expect(page.locator('.vf-shop-product-grid')).toBeVisible();
  expect(page.url()).toMatch(/\/shop\//);
});
