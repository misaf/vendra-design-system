import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';
const MORNING = new Date('2026-10-05T09:00:00+03:30');
const button = (page, name) =>
  page.getByRole('button', {name, exact: true}).filter({visible: true});
async function fillDelivery(page) {
  await page.locator('#vf-name').fill('Private recipient A');
  await page.locator('#vf-phone').fill('09120000000');
  const map = page.locator('#vf-map.leaflet-container');
  await expect(map).toBeVisible();
  await map.click({position: {x: 120, y: 100}});
  await expect(page.locator('#vf-map-status')).toHaveText(/[0-9۰-۹]{2}[.٫][0-9۰-۹]/);
  await page.locator('#vf-address').fill('Private street A, unit 3');
  await page.locator('#vf-sender').fill('Private sender A');
  await page.locator('#vf-sender-phone').fill('09120000000');
}
async function payStep(page, fa) {
  await button(page, fa ? 'ادامه و پرداخت' : 'Continue to payment').click();
  await expect(page.locator('.vf-checkout-summary')).toBeVisible();
}
async function signIn(page, fa, phone) {
  await page.locator('#vf-phone').fill(phone);
  await button(page, fa ? 'ارسال کد' : 'Send code').click();
  await page.locator('#vf-code').fill('12345');
}
for (const lang of ['en', 'fa']) {
  const fa = lang === 'fa';
  test(`profile edits preserve newer wallet and account data (${lang})`, async ({page}) => {
    await openSite(page, 'account', lang, {tab: 'profile'});
    await page.locator('#vf-pname').fill('First name');
    await button(page, fa ? 'ذخیره تغییرات' : 'Save changes').click();
    await page.locator('#vf-pname').fill('New name');
    const balance = await page.evaluate(() => {
      const key = 'vf-account:' + localStorage.getItem('vf-account-phone');
      const account = JSON.parse(localStorage.getItem(key));
      account.wallet.balance += 1000000;
      account.wallet.history.unshift({
        id: 'W-OTHER-TAB',
        kind: 'topup',
        amount: 1000000,
        at: new Date().toISOString()
      });
      account.profile.email = 'newer@example.com';
      localStorage.setItem(key, JSON.stringify(account));
      return account.wallet.balance;
    });
    await button(page, fa ? 'ذخیره تغییرات' : 'Save changes').click();
    await page.reload();
    await expect(page.locator('#vf-pname')).toHaveValue('New name');
    await expect(page.locator('#vf-pemail')).toHaveValue('newer@example.com');
    expect(
      await page.evaluate(
        () =>
          JSON.parse(localStorage.getItem('vf-account:' + localStorage.getItem('vf-account-phone')))
            .wallet.balance
      )
    ).toBe(balance);
    expect(await scanAxe(page)).toEqual([]);
  });

  test(`online payment waits for a durable recovery record (${lang})`, async ({page}) => {
    await page.clock.install({time: MORNING});
    await openSite(page, 'bag', lang, {step: 'delivery'});
    await fillDelivery(page);
    await payStep(page, fa);
    await page
      .getByRole('radio', {name: fa ? 'نمونه پرداخت آنلاین' : 'Online card demo', exact: true})
      .press('Space');
    await page.evaluate(() => {
      window.__vfSessionSet = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key, value) {
        if (key.startsWith('vf-online-payment:'))
          throw new DOMException('Full', 'QuotaExceededError');
        return window.__vfSessionSet.call(this, key, value);
      };
    });
    await button(page, fa ? 'رفتن به درگاه بانک' : 'Continue to the bank').click();
    await expect(page.getByRole('alert')).toContainText(
      fa ? 'اطلاعات بازیابی پرداخت' : 'payment recovery details'
    );
    await expect(
      page.getByRole('radio', {name: fa ? 'نمونه پرداخت آنلاین' : 'Online card demo', exact: true})
    ).toBeChecked();
    expect(await page.evaluate(() => window.__vfSite.state.order)).toBeNull();
    expect(await scanAxe(page)).toEqual([]);
    await page.evaluate(() => (Storage.prototype.setItem = window.__vfSessionSet));
    await button(page, fa ? 'رفتن به درگاه بانک' : 'Continue to the bank').click();
    await expect(page.locator('main h1')).toContainText(fa ? 'سپاس' : 'Thank you', {
      timeout: 20000
    });
    await page.reload();
    await expect(page.locator('main h1')).toContainText(fa ? 'سپاس' : 'Thank you');
  });

  test(`guest continuation and customer switches isolate private data (${lang})`, async ({
    page
  }) => {
    await page.clock.install({time: MORNING});
    await openSite(page, 'bag', lang, {step: 'delivery'});
    await fillDelivery(page);
    await page
      .locator('.vf-bag-signin')
      .getByRole('link', {name: fa ? 'ورود' : 'Sign in', exact: true})
      .click();
    await signIn(page, fa, '09120000000');
    await page
      .getByRole('link', {name: fa ? 'بازگشت به ادامه خرید' : 'Back to checkout', exact: true})
      .click();
    await expect(page.locator('#vf-name')).toHaveValue('Private recipient A');
    await expect(page.locator('#vf-address')).toHaveValue('Private street A, unit 3');
    await page.evaluate(() => {
      const site = window.__vfSite;
      const order = {
        id: 'VN-51001',
        customerId: '09120000000',
        method: 'cod',
        status: 'received',
        createdAt: new Date().toISOString(),
        lines: site.state.bag,
        delivery: site.state.delivery,
        totals: {sub: 8450000, fee: 0, total: 8450000}
      };
      site.setState({
        orders: [order],
        lastOrder: order,
        paymentDraft: {method: 'card', last4: '1234', ref: 'PRIVATE-A', receiptAmount: 8450000}
      });
      site.navigate({view: 'account'});
    });
    await expect(page.locator('main')).toContainText('VN-51001');
    await button(page, fa ? 'خروج' : 'Sign out').click();
    expect(await page.evaluate(() => window.__vfSite.state.paymentDraft.ref)).toBe('');
    expect(await page.evaluate(() => window.__vfSite.state.delivery.address)).toBe('');
    await page.evaluate(() => window.__vfSite.navigate({view: 'signin'}));
    await signIn(page, fa, '09121111111');
    await page
      .getByRole('link', {name: fa ? 'رفتن به حساب' : 'Go to my account', exact: true})
      .click();
    await expect(page.locator('main')).not.toContainText('VN-51001');
    await page.reload();
    await expect.poll(() => page.evaluate(() => window.__vfSite?.state.orders)).toEqual([]);
    await button(page, fa ? 'خروج' : 'Sign out').click();
    await page.evaluate(() => window.__vfSite.navigate({view: 'signin'}));
    await signIn(page, fa, '09120000000');
    await page
      .getByRole('link', {name: fa ? 'رفتن به حساب' : 'Go to my account', exact: true})
      .click();
    await expect(page.locator('main')).toContainText('VN-51001');
    expect(await scanAxe(page)).toEqual([]);
  });

  test(`expired payment retries return to delivery review (${lang})`, async ({page}) => {
    await page.clock.install({time: MORNING});
    await openSite(page, 'bag', lang, {step: 'delivery'});
    await fillDelivery(page);
    await payStep(page, fa);
    await page.evaluate(() => window.__vfSite.navigate({view: 'checkout', demo: 'error'}));
    await page
      .getByRole('radio', {name: fa ? 'نمونه پرداخت آنلاین' : 'Online card demo', exact: true})
      .press('Space');
    await button(page, fa ? 'رفتن به درگاه بانک' : 'Continue to the bank').click();
    await expect(
      page.getByRole('button', {name: fa ? 'پرداخت دوباره' : 'Pay again', exact: true})
    ).toBeVisible({timeout: 20000});
    await page.clock.setSystemTime(new Date('2026-10-08T19:00:00+03:30'));
    await button(page, fa ? 'پرداخت دوباره' : 'Pay again').click();
    const warning = page.locator('#vf-payment-review');
    await expect(warning).toBeVisible();
    await expect(warning).toBeFocused();
    expect(await page.evaluate(() => window.__vfSite.state.order)).toBeNull();
    await warning
      .getByRole('button', {
        name: fa ? 'بررسی ارسال و سبد' : 'Review delivery and bag',
        exact: true
      })
      .click();
    await expect(page).toHaveURL(/step=delivery/);
    await expect(page.locator('#vf-delivery-changed')).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
  });

  test(`product choices survive reload and back navigation (${lang})`, async ({page}) => {
    await openSite(page, 'product', lang, {id: 'VF-7K2M4Q', date: '2026-10-21'});
    await page.getByRole('radio', {name: fa ? /^بزرگ/ : /^Generous/}).press('Space');
    await page
      .getByRole('checkbox', {name: fa ? /کارت دست‌نویس/ : /Handwritten card/})
      .press('Space');
    await button(page, fa ? 'بیشتر' : 'More').click();
    await expect(page).toHaveURL(/qty=2/);
    await page.reload();
    await expect(page.getByRole('radio', {name: fa ? /^بزرگ/ : /^Generous/})).toBeChecked();
    await expect(
      page.getByRole('checkbox', {name: fa ? /کارت دست‌نویس/ : /Handwritten card/})
    ).toBeChecked();
    await expect(
      page.getByRole('textbox', {name: fa ? 'تعداد' : 'Quantity', exact: true})
    ).toHaveValue(fa ? '۲' : '2');
    await page
      .locator('main')
      .getByRole('link', {name: fa ? 'فروشگاه' : 'Shop', exact: true})
      .click();
    await page.goBack();
    await expect(page.getByRole('radio', {name: fa ? /^بزرگ/ : /^Generous/})).toBeChecked();
    await expect(page).toHaveURL(/qty=2/);
    expect(await scanAxe(page)).toEqual([]);
  });
}
