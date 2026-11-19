import {expect, test} from '@playwright/test';

const base = process.env.VF_BASE_PATH || '';
const legacyBase = base + '/apps/storefront/app';
const product = 'VF-7K2M4Q';
const orderNumber = 'VN-PILOT-1042';
const live = process.env.VF_TEST_LIVE === '1';

for (const [locale, direction] of [
  ['en', 'ltr'],
  ['fa', 'rtl']
]) {
  const fa = locale === 'fa';

  test('localized and published product routes load in ' + locale, async ({page, request}) => {
    const path = '/' + locale + '/product/' + product + '/';
    const canonical = base + path;
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));

    const response = await page.goto(canonical);
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

    const legacy = await request.get(legacyBase + path, {maxRedirects: 0});
    expect(legacy.status()).toBe(200);
    const legacyHtml = await legacy.text();
    expect(legacyHtml).toContain('<html lang="' + locale + '" dir="' + direction + '"');
    expect(legacyHtml).toMatch(new RegExp('<link rel="canonical" href="[^"]*' + canonical + '"'));
  });

  test('missing routes return HTTP 404 in ' + locale, async ({page, request}) => {
    for (const prefix of [base, legacyBase]) {
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
    // Check the rendered fallback, including the demo's base-prefixed published URLs.
    await page.goto(legacyBase + '/' + locale + '/product/does-not-exist/');
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('main h1')).toContainText(fa ? 'پژمرده شده.' : 'wilted.');
  });

  test(
    'a bank return stays pending until the order API reports payment in ' + locale,
    async ({page}) => {
      let paymentStatus = 'awaiting';
      const lookups = [];
      await page.route('**/__pilot-api/api/sales/orders?**', route => {
        const number = new URL(route.request().url()).searchParams.get('number');
        lookups.push(number);
        return route.fulfill({json: {member: [{number: orderNumber, paymentStatus}]}});
      });
      await page.addInitScript(() => {
        let runtime;
        Object.defineProperty(window, '__vfRuntime', {
          configurable: true,
          get: () => runtime,
          set: value => {
            runtime = value;
            value.api.setBase('/__pilot-api');
          }
        });
      });
      const path =
        legacyBase +
        '/' +
        locale +
        '/checkout/?payment=return&order=' +
        orderNumber +
        '&result=paid';
      const response = await page.goto(path);
      expect(response.status()).toBe(200);
      await expect(page).toHaveURL(url => url.pathname + url.search === path);
      const heading = page.getByRole('heading', {level: 1});
      await expect(heading).toHaveText(
        fa ? 'پرداخت شما هنوز تأیید نشده' : 'Your payment isn’t confirmed yet'
      );
      await expect(page.locator('main')).toContainText(orderNumber);
      paymentStatus = 'paid';
      await page.getByRole('button', {name: fa ? 'بررسی دوباره' : 'Check again'}).click();
      await expect(heading).toHaveText(fa ? 'پرداخت انجام شد' : 'Payment received');
      expect(lookups).toEqual([orderNumber, orderNumber]);
    }
  );

  test('runtime tracking links open the lookup in ' + locale, async ({page}) => {
    const response = await page.goto(base + '/' + locale + '/track/DEMO1234/');
    expect(response.status()).toBe(live ? 200 : 404);
    await expect(page.locator('main h1')).toHaveText(
      locale === 'fa' ? 'پیگیری سفارش.' : 'Track an order.'
    );
  });
}
