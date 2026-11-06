import {test, expect} from '@playwright/test';
import {openSite, pinDelivery} from './helpers.mjs';
import {captureImages} from './image-capture-helpers.mjs';
import {vfCopy} from '../pages/bag/copy.js';

test.use({reducedMotion: 'reduce'});
test.beforeEach(async ({page}, info) => {
  test.skip(info.project.name !== 'desktop', 'historical capture diagnostic, not device coverage');
  await page.clock.install({time: new Date('2026-10-05T09:00:00+03:30')});
});

async function focusSettled(page) {
  await expect(page.locator('main h1')).toBeFocused();
  await page.evaluate(
    () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  );
}

for (const [width, lang] of [
  [390, 'en'],
  [390, 'fa'],
  [768, 'en'],
  [1280, 'fa']
]) {
  test.describe(`order capture at ${width}px (${lang})`, () => {
    test.use({viewport: {width, height: 1000}, hasTouch: width <= 768});
    test('thumbnails survive delivery, payment edits and reload', async ({page}, info) => {
      const viewport = {width, height: 1000};
      const copy = vfCopy({lang});
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      const activate = async control => {
        await control.scrollIntoViewIfNeeded();
        if (width <= 768) await control.tap();
        else {
          await control.focus();
          await page.keyboard.press('Enter');
        }
      };
      const capture = (name, count) =>
        captureImages(page, info, name, viewport, {
          selector: 'main img',
          count,
          captureSelector: 'main img'
        });
      const summary = page.locator('main .ag-osum img');
      await openSite(page, 'bag', lang);
      await expect(summary).toHaveCount(2);
      await capture('bag', 4);
      await page.evaluate(() => {
        window.__orderCaptureDocument = true;
      });
      await activate(
        page
          .getByRole('button', {name: copy.toDelivery, exact: true})
          .filter({visible: true})
          .first()
      );
      await expect(page).toHaveURL(/step=delivery/);
      await focusSettled(page);
      // Restrict to order photos: map tiles belong to an independent map lifecycle test.
      const captureSummary = name =>
        captureImages(page, info, name, viewport, {
          selector: 'main .ag-osum img',
          count: 2,
          captureSelector: 'main .ag-osum img'
        });
      await captureSummary('delivery');
      await page.locator('#vf-name').fill('Test Recipient');
      await page.locator('#vf-phone').fill('09120000000');
      await pinDelivery(page);
      await page.locator('#vf-address').fill('Local test address, unit 3');
      await page.locator('#vf-sender').fill('Test Sender');
      await page.locator('#vf-sender-phone').fill('09121111111');
      const next = async () => {
        await activate(
          page.getByRole('button', {name: copy.next, exact: true}).filter({visible: true}).first()
        );
        await expect(page.locator('.vf-checkout-steps')).toBeVisible();
        await focusSettled(page);
      };
      await next();
      expect(await page.evaluate(() => window.__orderCaptureDocument)).toBe(true);
      const initial = await captureSummary('payment-initial');
      await page.locator('#vf-last4').fill('1234');
      await page.locator('#vf-ref').fill('567890');
      await activate(page.locator('.vf-checkout-steps button').filter({visible: true}).nth(1));
      await expect(page.locator('.vf-checkout-steps')).toHaveCount(0);
      await focusSettled(page);
      await expect(page.locator('#vf-address')).toHaveValue('Local test address, unit 3');
      await next();
      await expect(page.locator('#vf-last4')).toHaveValue('1234');
      await expect(page.locator('#vf-ref')).toHaveValue('567890');
      expect(await captureSummary('payment-restored')).toEqual(initial);
      await page.reload();
      await expect(page.locator('.vf-checkout-steps')).toBeVisible();
      await expect(page.locator('#vf-last4')).toHaveValue('1234');
      await expect(page.locator('#vf-ref')).toHaveValue('567890');
      expect(await captureSummary('payment-reload')).toEqual(initial);
      expect(errors).toEqual([]);
    });
  });
}
