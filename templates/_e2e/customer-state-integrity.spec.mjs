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
async function blockStorage(page, block) {
  await page.evaluate(block => {
    window.__vfStorageSet ||= Storage.prototype.setItem;
    Storage.prototype.setItem = block
      ? function (key, value) {
          if (key.startsWith('vf-account:'))
            throw new DOMException('Test storage failure', 'QuotaExceededError');
          return window.__vfStorageSet.call(this, key, value);
        }
      : window.__vfStorageSet;
  }, block);
}
for (const lang of ['en', 'fa']) {
  const fa = lang === 'fa';
  test(`late checkout responses keep newer bag changes (${lang})`, async ({page}) => {
    await page.clock.install({time: MORNING});
    await openSite(page, 'bag', lang, {step: 'delivery'});
    await delivery(page, fa);
    await page.evaluate(() => {
      window.VF_API.setBase('/__test-api');
      window.__vfCheckoutCalls = 0;
      window.VF_API.checkout = () => {
        window.__vfCheckoutCalls++;
        return new Promise(resolve => (window.__vfFinishCheckout = resolve));
      };
    });
    await page
      .getByRole('radio', {name: fa ? 'پرداخت در محل' : 'Pay on delivery', exact: true})
      .press('Space');
    await visibleButton(page, fa ? 'تأیید سفارش نمونه' : 'Confirm demo order').click();
    await expect.poll(() => page.evaluate(() => window.__vfSite.state.checkoutPending)).toBe(true);
    await page
      .getByRole('link', {name: fa ? 'ویرایش اطلاعات ارسال' : 'Edit delivery details', exact: true})
      .click();
    await page.getByRole('link', {name: fa ? 'بازگشت به سبد' : 'Back to bag', exact: true}).click();
    await page
      .locator('.vf-bag-line')
      .first()
      .getByRole('button', {name: fa ? 'بیشتر' : 'More', exact: true})
      .click();
    await page.evaluate(() => window.__vfFinishCheckout(null));
    await expect.poll(() => page.evaluate(() => window.__vfSite.state.checkoutPending)).toBe(false);
    expect(await page.evaluate(() => window.__vfSite.state.bag[0].qty)).toBe(2);
    expect(await page.evaluate(() => window.__vfSite.state.lastOrder.lines[0].qty)).toBe(1);
    expect(await page.evaluate(() => window.__vfCheckoutCalls)).toBe(1);
    const notice = page
      .getByRole('status')
      .filter({has: page.getByRole('link')})
      .filter({hasText: fa ? 'تغییرات تازه سبد' : 'newer bag changes'});
    await expect(notice).toBeVisible();
    await notice.getByRole('link', {name: fa ? 'مشاهده سفارش' : 'View order'}).click();
    await expect(page).toHaveURL(/view=track/);
    // Pending-button announcements expire after navigation; audit the settled page.
    await expect(page.locator('[data-live-announcer] [role="img"]')).toHaveCount(0, {
      timeout: 10000
    });
    expect(await scanAxe(page)).toEqual([]);
  });

  test(`changed receipt totals require confirmation (${lang})`, async ({page}, info) => {
    await page.clock.install({time: MORNING});
    await openSite(page, 'bag', lang, {step: 'delivery'});
    await delivery(page, fa);
    await page.locator('#vf-last4').fill('1234');
    await page.locator('#vf-ref').fill('567890');
    await page
      .getByRole('link', {name: fa ? 'ویرایش اطلاعات ارسال' : 'Edit delivery details', exact: true})
      .click();
    await page.getByRole('link', {name: fa ? 'بازگشت به سبد' : 'Back to bag', exact: true}).click();
    await page
      .locator('.vf-bag-line')
      .first()
      .getByRole('button', {name: fa ? 'بیشتر' : 'More', exact: true})
      .click();
    await visibleButton(page, fa ? 'ادامه و ارسال' : 'Continue to delivery').click();
    await visibleButton(page, fa ? 'ادامه و پرداخت' : 'Continue to payment').click();
    await page.reload();
    const warning = page.locator('#vf-receipt-changed');
    await expect(warning).toBeVisible();
    await expect(page.locator('#vf-last4')).toHaveValue('1234');
    await expect(page.locator('#vf-ref')).toHaveValue('567890');
    await visibleButton(page, fa ? 'پرداخت کردم — ثبت سفارش' : 'I’ve paid — place order').click();
    await expect(warning).toBeFocused();
    expect(await page.evaluate(() => window.__vfSite.state.order)).toBeNull();
    expect(await scanAxe(page)).toEqual([]);
    await page.screenshot({
      path: `/tmp/vendra-receipt-change-${lang}-${info.project.name}.png`,
      fullPage: true
    });
    await warning
      .getByRole('button', {name: fa ? 'مبلغ جدید را بررسی کردم' : 'I’ve checked the new total'})
      .click();
    await expect(warning).toHaveCount(0);
    await visibleButton(page, fa ? 'پرداخت کردم — ثبت سفارش' : 'I’ve paid — place order').click();
    await expect.poll(() => page.evaluate(() => window.__vfSite.state.order?.ref)).toBe('567890');
  });

  test(`earlier orders remain available after reload (${lang})`, async ({page}) => {
    await openSite(page, 'account', lang);
    await page.evaluate(() => {
      const site = window.__vfSite;
      const order = {
        method: 'cod',
        status: 'received',
        createdAt: '2026-10-05T09:00:00+03:30',
        lines: site.state.bag,
        delivery: {
          ...site.state.delivery,
          name: 'Test Recipient',
          phone: '09120000000',
          senderPhone: '09121111111',
          address: 'Street 12',
          date: '2026-10-06'
        },
        totals: {sub: 8450000, fee: 0, total: 8450000}
      };
      const older = {...order, id: 'VN-20001'},
        newer = {...order, id: 'VN-20002'};
      site.setState({orders: [newer, older], lastOrder: newer, order: null});
    });
    await expect(page.locator('main')).toContainText('VN-20001');
    await expect(page.locator('main')).toContainText('VN-20002');
    await page.reload();
    await page.locator('main a[href*="id=VN-20001"]').click();
    await expect(page.locator('main')).toContainText('VN-20001');
    await expect(page).toHaveURL(/id=VN-20001/);
    expect(await scanAxe(page)).toEqual([]);
  });

  test(`failed profile and address saves retain entries for retry (${lang})`, async ({page}) => {
    await openSite(page, 'account', lang, {tab: 'profile'});
    await page.locator('#vf-pname').fill('Keep my entry');
    await blockStorage(page, true);
    await visibleButton(page, fa ? 'ذخیره تغییرات' : 'Save changes').click();
    await expect(page.getByRole('alert')).toContainText(
      fa ? 'مرورگر نتوانست' : 'browser couldn’t save'
    );
    await expect(page.locator('#vf-pname')).toHaveValue('Keep my entry');
    await blockStorage(page, false);
    await visibleButton(page, fa ? 'ذخیره تغییرات' : 'Save changes').click();
    await expect(page.getByRole('alert')).toHaveCount(0);
    await page.getByRole('tab', {name: fa ? 'آدرس‌ها' : 'Addresses', exact: true}).click();
    await page
      .getByRole('button', {name: fa ? 'ویرایش خانه' : 'Edit Home', exact: true})
      .and(page.locator('button'))
      .click();
    const dialog = page.getByRole('dialog');
    await dialog.locator('#vf-address-line').fill('Keep this address, unit 5');
    await blockStorage(page, true);
    await dialog.getByRole('button', {name: fa ? 'ذخیره' : 'Save', exact: true}).click();
    await expect(dialog.getByRole('alert')).toContainText(
      fa ? 'مرورگر نتوانست' : 'browser couldn’t save'
    );
    await expect(dialog.locator('#vf-address-line')).toHaveValue('Keep this address, unit 5');
    expect(await scanAxe(page)).toEqual([]);
    await blockStorage(page, false);
    await dialog.getByRole('button', {name: fa ? 'ذخیره' : 'Save', exact: true}).click();
    await expect(dialog).toHaveCount(0);
  });

  test(`wallet top-up returns to the waiting checkout (${lang})`, async ({page}) => {
    await page.clock.install({time: MORNING});
    await page.addInitScript(lang => {
      localStorage.setItem('vf-account-phone', '09120000000');
      localStorage.setItem(
        'vf-account:09120000000',
        JSON.stringify({
          profile: {name: 'Test Sender', locale: lang, email: '', sms: true},
          addresses: [],
          reminders: [],
          wallet: {balance: 100000, history: []}
        })
      );
    }, lang);
    await openSite(page, 'bag', lang, {step: 'delivery'});
    await delivery(page, fa);
    await page
      .getByRole('radio', {name: fa ? 'کارت به کارت' : 'Card-to-card transfer', exact: true})
      .press('Space');
    await page.locator('#vf-last4').fill('1234');
    await page.locator('#vf-ref').fill('567890');
    await page
      .getByRole('link', {name: fa ? 'افزایش موجودی' : 'Top up your balance', exact: true})
      .click();
    await expect(page).toHaveURL(/next=checkout/);
    await page.reload();
    await page.locator('#vf-topup-amount').fill('20000000');
    await page.getByRole('button', {name: fa ? /^افزایش موجودی / : /^Top up /}).click();
    await expect(page.locator('#vf-topup-done')).toBeVisible();
    // React Aria's pending-button announcement refers to the top-up button for seven seconds.
    // Let that announcement finish while its label is still mounted before auditing the next page.
    await expect(page.locator('[data-live-announcer] [role="img"]')).toHaveCount(0, {
      timeout: 10000
    });
    await page
      .getByRole('link', {name: fa ? 'بازگشت به پرداخت' : 'Back to checkout', exact: true})
      .click();
    await expect(page.locator('#vf-last4')).toHaveValue('1234');
    await expect(page.locator('#vf-ref')).toHaveValue('567890');
    await expect(
      page.getByRole('radio', {name: fa ? 'کیف پول' : 'Account balance', exact: true})
    ).toBeEnabled();
    expect(await scanAxe(page)).toEqual([]);
  });

  test(`initial saved-list loading keeps newer customer actions (${lang})`, async ({page}) => {
    await page.addInitScript(() => {
      window.VF_API = {
        live: true,
        loadSaved: () => new Promise(resolve => (window.__vfHydrateSaved = resolve)),
        saveItem: () => Promise.resolve(),
        unsaveItem: () => Promise.resolve()
      };
    });
    await openSite(page, 'product', lang, {id: 'VF-7K2M4Q'});
    await page
      .getByRole('button', {name: fa ? 'ذخیره این طرح' : 'Save this design', exact: true})
      .click();
    await page.evaluate(() => window.__vfHydrateSaved(['VF-3HX9TP']));
    await expect
      .poll(() => page.evaluate(() => window.__vfSite.state.saved.includes('VF-7K2M4Q')))
      .toBe(true);
    await expect
      .poll(() => page.evaluate(() => window.__vfSite.state.saved.includes('VF-3HX9TP')))
      .toBe(true);
  });
}
