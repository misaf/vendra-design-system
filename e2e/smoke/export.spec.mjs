import {test, expect} from '@playwright/test';
import {chooseDeliveryTime, stubMapTiles} from '../helpers.mjs';

const app = (process.env.VF_BASE_PATH || '') + '/';
const product = 'VF-7K2M4Q';
const orderNumber = 'VN-PILOT-1042';

test('the static export serves the sitemap, robots file, and compressed copies', async ({
  request
}) => {
  const origin = process.env.VF_ORIGIN || '';
  const sitemapPath = app + 'sitemap.xml';
  const sitemap = await request.get(sitemapPath);
  await expect(sitemap).toBeOK();
  const xml = await sitemap.text();
  for (const lang of ['en', 'fa'])
    expect(xml).toContain('<loc>' + origin + app + lang + '/shop/</loc>');

  const robots = await request.get(app + 'robots.txt');
  await expect(robots).toBeOK();
  expect(await robots.text()).toContain('Sitemap: ' + origin + sitemapPath);

  for (const encoding of ['br', 'gzip']) {
    const result = await request.head(sitemapPath, {headers: {'Accept-Encoding': encoding}});
    await expect(result).toBeOK();
    expect(result.headers()['content-encoding']).toBe(encoding);
  }
});

async function replayCheckout(page) {
  const orders = new Map();
  const attempts = [];
  const failures = [];
  await page.route('**/__pilot-api/api/sales/checkout', async route => {
    const request = route.request();
    const key = request.headers()['idempotency-key'];
    attempts.push({key, body: request.postDataJSON()});
    const failure = failures.shift();
    if (failure) {
      await route.fulfill(failure);
      return;
    }
    if (!orders.has(key)) {
      orders.set(key, {number: orderNumber});
      // The order exists, but the first response never reaches the browser.
      await route.abort('connectionreset');
    } else await route.fulfill({json: orders.get(key)});
  });
  await page.evaluate(() => window.__vfRuntime.api.setBase('/__pilot-api'));
  return {orders, attempts, failures};
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
      const {orders, attempts, failures} = await replayCheckout(page);
      await place.click();
      await expect(changedAmount).toBeVisible();
      expect(attempts).toHaveLength(0);
      await changedAmount
        .getByRole('button', {
          name: fa ? 'مبلغ جدید را بررسی کردم' : 'I’ve checked the new total'
        })
        .click();

      const slotError = fa ? 'بازه ارسال پر شده است.' : 'The delivery slot is full.';
      failures.push(
        {
          status: 422,
          json: {violations: [{propertyPath: 'deliverySlotId', message: slotError}]}
        },
        {status: 409, json: {}},
        {status: 503, json: {}}
      );
      await place.click();
      await button(fa ? 'بررسی اطلاعات ارسال' : 'Review delivery details').click();
      await expect(page.locator('#vf-errors')).toBeFocused();
      await expect(slots).toContainText(slotError);
      await page.locator('#vf-errors').getByRole('link', {name: slotError}).click();
      await expect(slots).toBeFocused();
      await continueToPayment.click();
      await expect(page).toHaveURL(/\/bag\/\?step=delivery$/);
      // The rejected slot stays selected so the customer can see which one was rejected.
      await page
        .locator('#vf-date label.ag-choice:has(input:not(:checked):enabled)')
        .first()
        .click();
      await chooseDeliveryTime(page);
      await expect(slots).not.toContainText(slotError);
      await continueToPayment.click();

      const unconfirmed = page.getByRole('alert').filter({
        hasText: fa ? 'ثبت سفارش شما تأیید نشد' : 'We couldn’t confirm your order'
      });
      for (const message of [
        fa ? 'هنوز در حال پردازش باشد' : 'may still be processing',
        fa ? 'موقتاً در دسترس نیست' : 'temporarily unavailable',
        fa ? 'ارتباط قطع شد' : 'The connection was lost'
      ]) {
        await place.click();
        await expect(unconfirmed).toContainText(message);
        await expect(page.locator('#vf-last4')).toBeDisabled();
        await expect(page.locator('main')).not.toContainText(orderNumber);
        await button(fa ? 'تلاش دوباره' : 'Try again').click();
      }
      await place.click();
      await expect(page.locator('main h1')).toContainText(fa ? 'سپاس' : 'Thank you');
      await expect(page.locator('main')).toContainText(orderNumber);
      expect(attempts).toHaveLength(5);
      expect(attempts[1].key).toMatch(/^[0-9a-f-]{36}$/);
      expect(attempts[1].key).not.toBe(attempts[0].key);
      expect(attempts.slice(2)).toEqual(Array(3).fill(attempts[1]));
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

  test('contact routes validation and retryable failures in ' + lang, async ({page}) => {
    const phoneError = fa ? 'این شماره پذیرفته نمی‌شود.' : 'This number cannot be used.';
    const messageError = fa ? 'پیام را اصلاح کنید.' : 'Please revise your message.';
    const responses = [
      {
        status: 422,
        json: {
          violations: [
            {propertyPath: 'phone', message: phoneError},
            {propertyPath: 'message', message: messageError}
          ]
        }
      },
      {status: 409, json: {}},
      {status: 503, json: {}},
      {status: 204}
    ];
    const keys = [];
    await stubMapTiles(page);
    await page.route('**/__pilot-api/api/support/inquiries', route => {
      keys.push(route.request().headers()['idempotency-key']);
      return route.fulfill(responses.shift());
    });
    await page.goto(site + 'contact/');
    await page.waitForFunction(() => window.__vfRuntime?.rendered === 'hydrated');
    await page.evaluate(() => window.__vfRuntime.api.setBase('/__pilot-api'));
    const phone = page.locator('#vf-cphone');
    const message = page.locator('#vf-cmsg');
    const send = page.getByRole('button', {name: fa ? 'ارسال' : 'Send', exact: true});
    await phone.fill('09120000000');
    await message.fill('Please call me about my order.');
    await send.click();
    const summary = page.locator('#vf-contact-errors');
    await expect(summary.getByRole('link')).toHaveText([phoneError, messageError]);
    await expect(summary).toBeFocused();
    await summary.getByRole('link', {name: phoneError}).click();
    await expect(phone).toBeFocused();
    await expect(phone).toHaveAttribute('aria-invalid', 'true');
    await expect(message).toHaveAttribute('aria-invalid', 'true');
    await phone.fill('09121111111');
    await expect(summary).not.toContainText(phoneError);
    await expect(summary).toContainText(messageError);
    await message.fill('Please call me about tomorrow’s order.');
    await expect(summary).toHaveCount(0);

    for (const copy of [
      fa ? 'هنوز در حال پردازش باشد' : 'may still be processing',
      fa ? 'موقتاً در دسترس نیست' : 'temporarily unavailable'
    ]) {
      await send.click();
      const error = page.locator('#vf-contact-api-error');
      await expect(error).toContainText(copy);
      await expect(error).toBeFocused();
      await expect(message).toHaveValue('Please call me about tomorrow’s order.');
    }
    await send.click();
    await expect(page.locator('#vf-contact-success')).toBeVisible();
    expect(keys).toHaveLength(4);
    expect(keys[1]).not.toBe(keys[0]);
    expect(keys.slice(2)).toEqual([keys[1], keys[1]]);
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
