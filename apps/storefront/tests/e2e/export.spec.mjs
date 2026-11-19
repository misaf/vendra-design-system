import {test, expect} from '@playwright/test';
import {chooseDeliveryTime, pinDelivery, stubMapTiles} from '../../e2e/helpers.mjs';

const app = (process.env.VF_BASE_PATH || '') + '/apps/storefront/app/';
const product = 'VF-7K2M4Q';

for (const lang of ['en', 'fa']) {
  const fa = lang === 'fa';
  const site = app + lang + '/';

  test('exported catalog, checkout and tracking work in ' + lang, async ({page, request}) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const productPath = site + 'product/' + product + '/';
    const initial = await request.get(productPath);
    expect(initial.status()).toBe(200);
    const html = await initial.text();
    expect(html).toContain('<html lang="' + lang + '" dir="' + (fa ? 'rtl' : 'ltr') + '"');
    expect(html).toMatch(/<h1[^>]*>[\s\S]*?VF-7K2M4Q/);
    expect(html).toContain('rel="canonical"');
    expect(html).toContain('application/ld+json');
    const journal = await request.get(site + 'journal/');
    expect(journal.status()).toBe(200);
    expect(await journal.text()).toMatch(/<main[\s\S]*?<h1/);

    await stubMapTiles(page);
    await page.clock.setSystemTime(new Date('2026-10-05T09:00:00+03:30'));
    await page.goto(productPath);
    await page
      .getByRole('button', {name: fa ? 'افزودن به سبد' : 'Add to bag', exact: true})
      .filter({visible: true})
      .click();
    const confirmation = page.getByRole('dialog', {
      name: fa ? 'به سبد شما اضافه شد' : 'Added to your bag'
    });
    await confirmation.locator('a[href*="/bag/"]').click();
    await expect(page).toHaveURL(new RegExp(site + 'bag/$'));
    // A language switch is a Next.js navigation inside the same checkout session.
    await page.evaluate(() => {
      window.__sessionBeforeLanguageChange = window.__vfSite;
    });
    const other = fa ? 'en' : 'fa';
    const languageButton = code => page.locator('.ag-lang button[lang="' + code + '"]:visible');
    await languageButton(other).click();
    await expect(page).toHaveURL(new RegExp(app + other + '/bag/$'));
    await expect(page.locator('html')).toHaveAttribute('lang', other);
    expect(
      await page.evaluate(() => window.__vfSite === window.__sessionBeforeLanguageChange)
    ).toBe(true);
    await languageButton(lang).click();
    await expect(page).toHaveURL(new RegExp(site + 'bag/$'));
    await page.reload();
    await expect(page.locator('main').getByText(product, {exact: true}).first()).toBeVisible();

    await page.goto(site + 'bag/?step=delivery');
    await page.locator('#vf-sender').fill('Test Sender');
    await page.locator('#vf-sender-phone').fill('09121111111');
    await page.locator('#vf-name').fill('Test Recipient');
    await page.locator('#vf-phone').fill('09120000000');
    await pinDelivery(page);
    await page.locator('#vf-address').fill('Test street 12, unit 3');
    await chooseDeliveryTime(page);
    await page
      .getByRole('button', {name: fa ? 'ادامه و پرداخت' : 'Continue to payment', exact: true})
      .filter({visible: true})
      .click();
    await page.locator('#vf-last4').fill('1234');
    await page.reload();
    await expect(page.locator('#vf-last4')).toHaveValue('1234');

    const directTracking = await page.goto(site + 'track/DEMO1234/');
    expect(directTracking.status()).toBe(404);
    await expect(page.locator('main h1')).toHaveText(fa ? 'پیگیری سفارش.' : 'Track an order.');
    expect(errors).toEqual([]);
  });

  test('offline presentation reloads in ' + lang, async ({page, context}) => {
    test.setTimeout(60000);
    await page.goto(site + 'presentation/');
    await expect(page.locator('#root')).not.toHaveAttribute('inert', '');
    await expect(page.locator('.vf-display-photo').first()).toBeVisible();
    await page.locator('.vf-display').press('Enter');
    await page
      .getByRole('button', {name: fa ? 'ابزار فروشنده' : 'Seller tools', exact: true})
      .click();
    await expect(page.locator('[data-offline-status="ready"]')).toBeVisible({timeout: 45000});
    await page.keyboard.press('Escape');
    await context.setOffline(true);
    await page.reload();
    const image = page.locator('.vf-display-photo').first();
    const code = page.locator('.vf-display-code').first();
    await expect(code).toBeVisible();
    const first = await code.textContent();
    await page.keyboard.press(fa ? 'ArrowLeft' : 'ArrowRight');
    await expect(code).not.toHaveText(first);
    await expect
      .poll(() => image.evaluate(photo => photo.complete && photo.naturalWidth > 0))
      .toBe(true);
  });
}
