import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

const MORNING = new Date('2026-10-05T09:00:00+03:30');
const visibleButton = (page, name) =>
  page.getByRole('button', {name, exact: true}).filter({visible: true});
async function delivery(page, fa) {
  await page.locator('#vf-name').fill('Test Recipient');
  await page.locator('#vf-phone').fill('09120000000');
  const map = page.locator('#vf-map.leaflet-container');
  await expect(map).toBeVisible();
  await map.click({position: {x: 120, y: 100}});
  await expect(page.locator('#vf-map-status')).toHaveText(/[0-9۰-۹]{2}[.٫][0-9۰-۹]/);
  await page.locator('#vf-address').fill('Test street 12, unit 3');
  await page.locator('#vf-sender').fill('Test Sender');
  await page.locator('#vf-sender-phone').fill('09121111111');
  await visibleButton(page, fa ? 'ادامه و پرداخت' : 'Continue to payment').click();
  await expect(page.locator('.vf-checkout-summary')).toBeVisible();
}

// 'stall': the first checkout never answers and times out. 'pending': the server answers 409,
// meaning the first request with this key is still running there.
for (const [lang, first] of [
  ['en', 'stall'],
  ['fa', 'stall'],
  ['en', 'pending'],
  ['fa', 'pending']
]) {
  const fa = lang === 'fa';
  test(`an unanswered checkout (${first}) stays unconfirmed and the retry reuses its key (${lang})`, async ({
    page
  }) => {
    await page.clock.install({time: MORNING});
    await openSite(page, 'bag', lang, {step: 'delivery'});
    await delivery(page, fa);
    // A local stub: the first checkout never answers, the retry succeeds. Nothing leaves the test.
    let release;
    const held = new Promise(resolve => (release = resolve));
    const requests = [];
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/__slow-checkout-api/**', async route => {
      const request = route.request();
      if (request.method() !== 'POST' || !new URL(request.url()).pathname.endsWith('/checkout'))
        return route.fulfill({json: {}});
      requests.push({key: request.headers()['idempotency-key'], body: request.postDataJSON()});
      if (requests.length === 1 && first === 'pending')
        return route.fulfill({status: 409, json: {detail: 'In progress'}});
      if (requests.length === 1) {
        await held;
        return route.fulfill({json: null}).catch(() => {});
      }
      return route.fulfill({json: {number: 'VN-TEST'}});
    });
    await page.evaluate(() => window.__vfRuntime.api.setBase('/__slow-checkout-api'));
    try {
      const cod = page.getByRole('radio', {
        name: fa ? 'پرداخت در محل' : 'Pay on delivery',
        exact: true
      });
      // The payment step can still be mounting and render its default method again, so the
      // choice is retried until it holds.
      await expect(async () => {
        await cod.press('Space', {timeout: 2_000});
        await expect(cod).toBeChecked({timeout: 1_000});
      }).toPass({timeout: 15_000});
      const place = () => visibleButton(page, fa ? 'تأیید سفارش نمونه' : 'Confirm demo order');
      await place().click();
      await expect.poll(() => requests.length).toBe(1);
      expect(requests[0].key).toMatch(/^[0-9a-f-]{36}$/);
      if (first === 'stall') {
        await expect(place()).toBeDisabled();
        // Just before the write timeout nothing has changed; at it, the page stops waiting.
        await page.clock.runFor(19000);
        await expect(place()).toBeDisabled();
        await page.clock.runFor(1500);
      }
      const unconfirmed = page
        .getByRole('alert')
        .filter({hasText: fa ? 'ثبت سفارش شما تأیید نشد' : 'We couldn’t confirm your order'});
      await expect(unconfirmed).toBeVisible();
      await expect(unconfirmed).toContainText(
        fa ? 'پیام‌هایتان را بررسی کنید' : 'Check your messages before trying again'
      );
      // Switching method would send a different order under a new key, so it isn't offered here.
      await expect(
        visibleButton(page, fa ? 'انتخاب روش دیگر' : 'Choose another method')
      ).toHaveCount(0);
      const methods = page.getByRole('radiogroup').filter({has: cod}).getByRole('radio');
      for (const radio of await methods.all()) await expect(radio).toBeDisabled();
      await expect
        .poll(() => page.evaluate(() => window.__vfSite.state.checkoutPending))
        .toBe(false);
      expect(await page.evaluate(() => window.__vfSite.state.orders)).toHaveLength(0);
      expect(await scanAxe(page)).toEqual([]);
      await visibleButton(page, fa ? 'تلاش دوباره' : 'Try again').click();
      await expect(unconfirmed).toHaveCount(0);
      // Retrying keeps the method as sent until an attempt is answered.
      await expect(cod).toBeChecked();
      await expect(cod).toBeDisabled();
      await place().click();
      await expect.poll(() => requests.length).toBe(2);
      expect(requests[1].key).toBe(requests[0].key);
      expect(requests[1].body).toEqual(requests[0].body);
      await expect(page.getByRole('heading', {level: 1})).toContainText(fa ? 'سپاس' : 'Thank you');
      expect(await page.evaluate(() => window.__vfSite.state.orders)).toHaveLength(1);
      // Confirmed: the key is dropped, so a later order of the same bag is a new request.
      expect(
        await page.evaluate(() =>
          Object.keys(JSON.parse(localStorage.getItem('vendra-idempotency')))
        )
      ).toEqual([]);
      expect(errors).toEqual([]);
    } finally {
      release();
    }
  });
}
