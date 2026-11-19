import {expect, test} from '@playwright/test';

const base = process.env.VF_BASE_PATH || '';
const published = base + '/apps/storefront/app';
const product = 'VF-7K2M4Q';
const live = process.env.VF_TEST_LIVE === '1';

for (const [locale, direction] of [
  ['en', 'ltr'],
  ['fa', 'rtl']
]) {
  test('localized and published product routes load in ' + locale, async ({page, request}) => {
    const path = '/' + locale + '/product/' + product + '/';
    const canonical = published + path;
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));

    const response = await page.goto(base + path);
    expect(response.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('html')).toHaveAttribute('dir', direction);
    await expect(page.locator('main h1')).toContainText(product);
    await expect(page.locator('#root')).not.toHaveAttribute('inert', '');
    await expect(page).toHaveURL(new RegExp(base + path + '$'));
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      new RegExp(canonical + '$')
    );
    expect(errors).toEqual([]);

    const legacy = await request.get(canonical, {maxRedirects: 0});
    expect(legacy.status()).toBe(200);
    expect(await legacy.text()).toContain('<html lang="' + locale + '" dir="' + direction + '"');
  });

  test('missing routes return HTTP 404 in ' + locale, async ({page, request}) => {
    for (const prefix of [base, published]) {
      for (const segment of [
        'product/does-not-exist',
        'shop/does-not-exist',
        'journal/does-not-exist',
        'no-such-route'
      ]) {
        const path = prefix + '/' + locale + '/' + segment + '/';
        const response = await request.get(path, {maxRedirects: 0});
        expect(response.status(), path).toBe(404);
      }
    }
    // The live server retains the storefront's localized missing-page screen.
    if (live) {
      await page.goto(base + '/' + locale + '/product/does-not-exist/');
      await expect(page.locator('main h1')).toContainText(
        locale === 'fa' ? 'پژمرده شده.' : 'wilted.'
      );
    }
  });

  test('runtime tracking links open the lookup in ' + locale, async ({page}) => {
    const response = await page.goto(published + '/' + locale + '/track/DEMO1234/');
    expect(response.status()).toBe(live ? 200 : 404);
    await expect(page.locator('main h1')).toHaveText(
      locale === 'fa' ? 'پیگیری سفارش.' : 'Track an order.'
    );
  });
}
