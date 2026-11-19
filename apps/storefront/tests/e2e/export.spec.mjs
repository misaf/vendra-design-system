import {test, expect} from '@playwright/test';
import {chooseDeliveryTime, stubMapTiles} from '../../e2e/helpers.mjs';

const app = (process.env.VF_BASE_PATH || '') + '/apps/storefront/app/';
const product = 'VF-7K2M4Q';
const orderNumber = 'VN-PILOT-1042';

async function replayCheckout(page) {
  const orders = new Map();
  const attempts = [];
  await page.route('**/__pilot-api/api/sales/checkout', async route => {
    const request = route.request();
    const key = request.headers()['idempotency-key'];
    attempts.push({key, body: request.postDataJSON()});
    if (!orders.has(key)) {
      orders.set(key, {number: orderNumber});
      // The order exists, but the first response never reaches the browser.
      await route.abort('connectionreset');
    } else await route.fulfill({json: orders.get(key)});
  });
  await page.evaluate(() => window.__vfRuntime.api.setBase('/__pilot-api'));
  return {orders, attempts};
}

for (const lang of ['en', 'fa']) {
  const fa = lang === 'fa';
  const site = app + lang + '/';

  test.describe('mobile pilot flow in ' + lang, () => {
    test.use({
      viewport: {width: 390, height: 844},
      isMobile: true,
      hasTouch: true,
      timezoneId: fa ? 'Asia/Tehran' : 'America/Los_Angeles'
    });

    test('a bank return stays pending until the order API reports payment', async ({page}) => {
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
      await page.goto(site + 'checkout/?payment=return&order=' + orderNumber + '&result=paid');
      const heading = page.getByRole('heading', {level: 1});
      await expect(heading).toHaveText(
        fa ? 'پرداخت شما هنوز تأیید نشده' : 'Your payment isn’t confirmed yet'
      );
      await expect(page.locator('main')).toContainText(orderNumber);
      paymentStatus = 'paid';
      await page.getByRole('button', {name: fa ? 'بررسی دوباره' : 'Check again'}).click();
      await expect(heading).toHaveText(fa ? 'پرداخت انجام شد' : 'Payment received');
      expect(lookups).toEqual([orderNumber, orderNumber]);
    });

    test('exported product, bag, delivery, checkout recovery and tracking', async ({
      page,
      request
    }) => {
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
      await page.clock.install({time: new Date('2026-10-05T14:30:00+03:30')});
      const button = name => page.getByRole('button', {name, exact: true}).filter({visible: true});
      await page.goto(site + 'bag/');
      const remove = button(fa ? 'حذف' : 'Remove');
      await expect(remove).toHaveCount(2);
      await remove.first().click();
      await remove.click();
      await expect(remove).toHaveCount(0);
      await page.goto(site + 'shop/?stock=1');
      await page
        .locator('main')
        .locator('a[href="' + productPath + '"]')
        .first()
        .click();
      await expect(page).toHaveURL(new RegExp(productPath + '$'));
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
      const languageButton = code =>
        page.locator('.vf-shell-mobile-lang[lang="' + code + '"]:visible');
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
      await page.locator('#vf-map.leaflet-container').tap({position: {x: 120, y: 100}});
      await expect(page.locator('#vf-map-status')).toHaveText(/[0-9۰-۹]{2}[.٫][0-9۰-۹]/);
      await page.locator('#vf-address').fill('Test street 12, unit 3');
      const continueToPayment = button(fa ? 'ادامه و پرداخت' : 'Continue to payment');
      const slots = page.locator('#vf-slot');
      await expect(slots.locator('input[value="08"]')).toBeDisabled();
      await expect(slots.locator('input[value="12"]')).toBeDisabled();
      await expect(slots.locator('input[value="16"]')).toBeEnabled();
      await expect(slots.locator('input:checked')).toHaveCount(0);
      await continueToPayment.click();
      await expect(page.locator('#vf-errors')).toBeFocused();
      await expect(page).toHaveURL(/\/bag\/\?step=delivery$/);
      await chooseDeliveryTime(page);
      await continueToPayment.click();
      await page.locator('#vf-last4').fill('1234');
      await page.reload();
      await expect(page.locator('#vf-last4')).toHaveValue('1234');

      const place = button(fa ? 'پرداخت کردم — ثبت سفارش' : 'I’ve paid — place order');
      await page
        .getByRole('link', {
          name: fa ? 'ویرایش اطلاعات ارسال' : 'Edit delivery details',
          exact: true
        })
        .click();
      await page
        .getByRole('banner')
        .getByRole('link', {
          name: fa ? 'بازگشت به سبد' : 'Back to bag',
          exact: true
        })
        .click();
      await button(fa ? 'بیشتر' : 'More').click();
      await button(fa ? 'ادامه و ارسال' : 'Continue to delivery').click();
      await continueToPayment.click();
      // This is the demo's local amount review. Laravel quote changes are a separate pilot gate.
      const changedAmount = page.locator('#vf-receipt-changed');
      await expect(changedAmount).toBeVisible();
      const {orders, attempts} = await replayCheckout(page);
      await place.click();
      await expect(changedAmount).toBeVisible();
      expect(attempts).toHaveLength(0);
      await changedAmount
        .getByRole('button', {
          name: fa ? 'مبلغ جدید را بررسی کردم' : 'I’ve checked the new total'
        })
        .click();

      await place.click();
      const unconfirmed = page.getByRole('alert').filter({
        hasText: fa ? 'ثبت سفارش شما تأیید نشد' : 'We couldn’t confirm your order'
      });
      await expect(unconfirmed).toBeVisible();
      await expect(page.locator('main')).not.toContainText(orderNumber);
      await button(fa ? 'تلاش دوباره' : 'Try again').click();
      await place.click();
      await expect(page.locator('main h1')).toContainText(fa ? 'سپاس' : 'Thank you');
      await expect(page.locator('main')).toContainText(orderNumber);
      expect(attempts).toHaveLength(2);
      expect(attempts[0].key).toMatch(/^[0-9a-f-]{36}$/);
      expect(attempts[1]).toEqual(attempts[0]);
      expect(orders.size).toBe(1);
      await page
        .getByRole('link', {name: fa ? 'پیگیری سفارش' : 'Track order', exact: true})
        .click();
      await expect(page).toHaveURL(new RegExp(site + 'track/$'));
      await expect(page.locator('main')).toContainText(orderNumber);

      const directTracking = await page.goto(site + 'track/DEMO1234/');
      expect(directTracking.status()).toBe(404);
      await expect(page.locator('main h1')).toHaveText(fa ? 'پیگیری سفارش.' : 'Track an order.');
      expect(errors).toEqual([]);
    });
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
