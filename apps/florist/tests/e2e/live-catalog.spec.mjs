import {expect, test} from '@playwright/test';
import {randomUUID} from 'node:crypto';

const base = (process.env.VF_BASE_PATH || '') + '/apps/storefront/app';

for (const locale of ['en', 'fa']) {
  const fa = locale === 'fa';
  const path = base + '/' + locale;
  const product = fa ? 'ارکیدهٔ استودیو' : 'Studio orchid';
  const unavailable = fa ? 'ثبت سفارش آنلاین در دسترس نیست.' : 'Online ordering is unavailable.';

  test(
    'serves backend catalog and blocks sample ordering in ' + locale,
    async ({page, request}) => {
      await page.goto(path + '/shop/');
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('html')).toHaveAttribute('dir', fa ? 'rtl' : 'ltr');
      await expect(page.getByRole('link', {name: fa ? 'رز استودیو' : 'Studio rose'})).toBeVisible();
      await page.getByRole('link', {name: fa ? 'ارکیده‌ها' : 'Orchids'}).click();
      await expect(page.getByRole('link', {name: fa ? 'رز استودیو' : 'Studio rose'})).toHaveCount(
        0
      );
      await page.getByRole('link', {name: product}).click();
      await expect(page.getByRole('heading', {level: 1})).toHaveText(product);
      await expect(page.locator('main')).toContainText(fa ? '۲۴۵٬۰۰۰ تومان' : '245,000 Toman');

      for (const prefix of [process.env.VF_BASE_PATH || '', base]) {
        const root = prefix + '/' + locale;
        const sample = await request.get(root + '/product/VF-7K2M4Q/');
        expect(sample.status()).toBe(404);
        for (const route of ['bag', 'checkout', 'contact', 'journal', 'presentation']) {
          const response = await request.get(root + '/' + route + '/');
          expect(response.status(), route).toBe(200);
          expect(await response.text(), route).toContain(unavailable);
        }
      }
    }
  );

  test('recovers from a backend outage without showing the demo in ' + locale, async ({page}) => {
    const token = 'LIVE-RETRY-' + randomUUID();
    await page.goto(path + '/product/' + token + '/');
    await expect(page.getByRole('heading', {level: 1})).toHaveText(
      fa ? 'فهرست محصولات موقتاً در دسترس نیست.' : 'The catalog is temporarily unavailable.'
    );
    await expect(page.getByRole('link', {name: product})).toHaveCount(0);
    await page.getByRole('link', {name: fa ? 'تلاش دوباره' : 'Try again'}).click();
    await expect(page.getByRole('heading', {level: 1})).toHaveText(product);
  });
}
