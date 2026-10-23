import {test, expect} from '@playwright/test';
import {openSite, scanAxe, choiceTile, settlePage} from './helpers.mjs';

const MORNING = new Date('2026-10-05T09:00:00+03:30');
async function deliveryDetails(page) {
  await page.locator('#vf-name').fill('Test Recipient');
  await page.locator('#vf-phone').fill('09120000000');
  const map = page.locator('#vf-map.leaflet-container');
  await expect(map).toBeVisible();
  await map.click({position: {x: 120, y: 100}});
  await expect(page.locator('#vf-map-status')).toHaveText(/[0-9۰-۹]{2}[.٫][0-9۰-۹]/);
  await page.locator('#vf-address').fill('Test street 12, unit 3');
  await page.locator('#vf-sender').fill('Test Sender');
  await page.locator('#vf-sender-phone').fill('09121111111');
}
const continueToPayment = (page, fa) =>
  page
    .getByRole('button', {name: fa ? 'ادامه و پرداخت' : 'Continue to payment', exact: true})
    .filter({visible: true})
    .click();

for (const lang of ['en', 'fa']) {
  const fa = lang === 'fa';
  test(`stock limits hold in the product and bag (${lang})`, async ({page}) => {
    await openSite(page, 'product', lang, {id: 'VF-9FA2KE', cat: 'bouquets'});
    await page.getByRole('button', {name: fa ? 'بیشتر' : 'More', exact: true}).click();
    await expect(
      page.getByRole('button', {name: fa ? 'بیشتر' : 'More', exact: true})
    ).toBeDisabled();
    await page
      .getByRole('button', {name: fa ? 'افزودن به سبد' : 'Add to bag', exact: true})
      .filter({visible: true})
      .click();
    await page.getByRole('dialog').getByRole('link').click();
    const line = page.locator('.vf-bag-line').filter({hasText: 'VF-9FA2KE'});
    await expect(
      line.getByRole('button', {name: fa ? 'بیشتر' : 'More', exact: true})
    ).toBeDisabled();
    const input = line.locator('input');
    await input.fill('3');
    await input.press('Tab');
    expect(
      await page.evaluate(
        () => window.__vfSite.state.bag.find(line => line.token === 'VF-9FA2KE').qty
      )
    ).toBe(2);
    expect(await scanAxe(page)).toEqual([]);
  });

  test(`changed delivery windows need explicit confirmation (${lang})`, async ({page}) => {
    await page.clock.install({time: MORNING});
    await openSite(page, 'bag', lang, {step: 'delivery'});
    await page.evaluate(() => {
      const site = window.__vfSite;
      site.setState({bag: [site.state.bag[0]]});
    });
    await deliveryDetails(page);
    const days = page.getByRole('radiogroup', {name: fa ? 'روز ارسال' : 'Delivery day'});
    // Commit an explicit date, rather than the untouched first-visit default.
    await choiceTile(days, fa ? /^فردا/ : /^Tomorrow/).click();
    await choiceTile(days, fa ? /^امروز/ : /^Today/).click();
    await page.clock.setSystemTime(new Date('2026-10-05T19:00:00+03:30'));
    await continueToPayment(page, fa);
    const changed = page.locator('#vf-delivery-changed');
    await expect(changed).toBeVisible();
    await expect(changed).toBeFocused();
    expect(await page.evaluate(() => window.__vfSite.state.delivery.date)).toBe('2026-10-05');
    await changed.getByRole('button').click();
    await expect(changed).toHaveCount(0);
    expect(await page.evaluate(() => window.__vfSite.state.delivery.date)).toBe('2026-10-06');
    await continueToPayment(page, fa);
    await expect(
      page.getByRole('region', {name: fa ? 'مرور اطلاعات ارسال' : 'Delivery review'})
    ).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
  });

  test(`an unpinned saved address cannot reuse another address's pin (${lang})`, async ({page}) => {
    await page.addInitScript(() => {
      localStorage.setItem('vf-account-phone', '09120000000');
      localStorage.setItem(
        'vf-account:09120000000',
        JSON.stringify({
          profile: {},
          reminders: [],
          addresses: [
            {
              id: 'office',
              label: 'Office',
              line: 'Office street 42',
              recipient: 'Test Recipient',
              phone: '09120000000',
              zone: 'tehran'
            }
          ]
        })
      );
    });
    await openSite(page, 'bag', lang, {step: 'delivery'});
    await deliveryDetails(page);
    await page.getByRole('button', {name: 'Office', exact: true}).click();
    expect(await page.evaluate(() => window.__vfSite.state.delivery.location)).toBeNull();
    await continueToPayment(page, fa);
    await expect(page.locator('#vf-map-error')).toBeVisible();
    await expect(page.locator('#vf-address')).toHaveValue('Office street 42');
  });

  test(`repeat order reviews changes and keeps the bag until confirmed (${lang})`, async ({
    page
  }) => {
    await openSite(page, 'track', lang);
    await page.evaluate(() => {
      const site = window.__vfSite;
      const line = site.state.bag[0];
      site.setState({
        lastOrder: {
          id: 'VN-REPEAT',
          status: 'received',
          method: 'card',
          lines: [
            {...line, unit: 1},
            {...line, id: 'VF-6MT3VY', productId: 'VF-6MT3VY', token: 'VF-6MT3VY'}
          ],
          delivery: {...site.state.delivery},
          totals: {sub: 2, fee: 0, total: 2}
        }
      });
    });
    const before = await page.evaluate(() => window.__vfSite.state.bag);
    await page
      .getByRole('button', {name: fa ? 'سفارش دوباره' : 'Order again', exact: true})
      .click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toContainText('VF-6MT3VY');
    await expect(dialog).toContainText('VF-7K2M4Q');
    expect(await page.evaluate(() => window.__vfSite.state.bag)).toEqual(before);
    expect(await scanAxe(page)).toEqual([]);
    await page.screenshot({path: `/tmp/vendra-repeat-review-${lang}.png`, fullPage: true});
    await dialog.getByRole('button', {name: fa ? 'انصراف' : 'Cancel', exact: true}).click();
    expect(await page.evaluate(() => window.__vfSite.state.bag)).toEqual(before);
    await page
      .getByRole('button', {name: fa ? 'سفارش دوباره' : 'Order again', exact: true})
      .click();
    await dialog
      .getByRole('radio', {name: fa ? 'جایگزینی سبد فعلی' : 'Replace current bag', exact: true})
      .press('Space');
    await dialog
      .getByRole('button', {name: fa ? 'جایگزینی سبد فعلی' : 'Replace current bag', exact: true})
      .click();
    await expect(page.locator('.vf-bag-line')).toHaveCount(1);
    expect((await page.evaluate(() => window.__vfSite.state.bag[0])).unit).toBe(before[0].unit);
  });

  test(`keyboard repeat order requires review before changing the bag (${lang})`, async ({
    page
  }) => {
    await openSite(page, 'track', lang);
    await page.evaluate(() => {
      const site = window.__vfSite;
      site.setState({
        lastOrder: {
          id: 'VN-KEYBOARD',
          status: 'received',
          method: 'cod',
          lines: [{...site.state.bag[0]}],
          delivery: {...site.state.delivery},
          totals: {sub: 8450000, fee: 0, total: 8450000}
        }
      });
      window.__vfKeyboardRepeatDocument = 'kept';
    });
    await expect(page.locator('.vf-track-eyebrow')).toContainText('VN-KEYBOARD');
    await settlePage(page);
    const before = await page.evaluate(() => ({
      bag: window.__vfSite.state.bag,
      delivery: window.__vfSite.state.delivery
    }));
    const repeat = page.locator('.vf-track-details .ag-btn--secondary');
    const dialog = page.getByRole('dialog');
    await repeat.press('Enter');
    await expect(dialog).toBeVisible();
    await expect(page).toHaveURL(/view=track/);
    await expect(repeat).toHaveJSProperty('tagName', 'BUTTON');
    expect(await page.evaluate(() => window.__vfSite.state.bag)).toEqual(before.bag);
    expect(await page.evaluate(() => window.__vfSite.state.delivery)).toEqual(before.delivery);
    expect(await scanAxe(page)).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(repeat).toBeFocused();
    expect(await page.evaluate(() => window.__vfSite.state.bag)).toEqual(before.bag);
    await repeat.press('Space');
    await expect(dialog).toBeVisible();
    expect(await page.evaluate(() => window.__vfSite.state.bag)).toEqual(before.bag);
    await dialog
      .getByRole('button', {name: fa ? 'افزودن به سبد فعلی' : 'Add to current bag', exact: true})
      .press('Enter');
    await expect(page.locator('.vf-bag-line')).toHaveCount(before.bag.length);
    await expect(page).toHaveURL(/view=bag/);
    const after = await page.evaluate(() => window.__vfSite.state.bag);
    expect(after[0].qty).toBe(before.bag[0].qty * 2);
    expect(after.slice(1)).toEqual(before.bag.slice(1));
    expect(await page.evaluate(() => window.__vfSite.state.delivery)).toEqual(before.delivery);
    expect(await page.evaluate(() => window.__vfKeyboardRepeatDocument)).toBe('kept');
  });

  test(`WhatsApp receives the reviewed order details (${lang})`, async ({page}) => {
    await page.clock.install({time: MORNING});
    await openSite(page, 'bag', lang, {step: 'delivery'});
    await deliveryDetails(page);
    await continueToPayment(page, fa);
    await page
      .getByRole('radio', {name: fa ? 'تأیید در واتس‌اپ' : 'Confirm on WhatsApp', exact: true})
      .press('Space');
    const link = page.getByRole('link', {
      name: fa ? 'باز کردن سفارش در واتس‌اپ' : 'Open order in WhatsApp',
      exact: true
    });
    const message = new URL(await link.getAttribute('href')).searchParams.get('text');
    for (const value of [
      'VF-7K2M4Q',
      'Test Recipient',
      '09120000000',
      'Test Sender',
      '09121111111',
      'Test street 12, unit 3',
      'Happy birthday, Shirin.'
    ])
      expect(message).toContain(value);
    expect(message).toContain(fa ? 'زمان ارسال:' : 'Delivery window:');
    expect(message).toContain(fa ? 'جمع کل:' : 'Total:');
    // Inspect the composed URL only; never send a message.
  });
}
