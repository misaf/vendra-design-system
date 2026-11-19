import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';

const copy = {
  en: {
    title: 'Bag summary',
    total: 'Total',
    amount: '2,400,000 toman',
    note: 'Payment is confirmed after review.',
    meter: 'Free delivery',
    meterValue: '60 of 100',
    meterDone: 'Free delivery reached',
    complete: 'Complete the delivery meter',
    error: 'This fixture code was refused',
    applied: 'SAVE · Fixture discount',
    delivery: 'Delivery',
    payment: 'Payment',
    back: 'Back to bag',
    showMeter: 'Show delivery meter',
    showPromo: 'Show promo',
    showDelivery: 'Show delivery action',
    showPayment: 'Show payment action',
    showBack: 'Show back link',
    reveal: 'Have a promo code?',
    promo: 'Promo code',
    apply: 'Apply',
    remove: 'Remove code'
  },
  fa: {
    title: 'خلاصه سبد',
    total: 'جمع',
    amount: '۲٬۴۰۰٬۰۰۰ تومان',
    note: 'پرداخت پس از بررسی تأیید می‌شود.',
    meter: 'ارسال رایگان',
    meterValue: '۶۰ از ۱۰۰',
    meterDone: 'ارسال رایگان شد',
    complete: 'تکمیل نوار ارسال',
    error: 'این کد نمونه پذیرفته نشد',
    applied: 'SAVE · تخفیف نمونه',
    delivery: 'ارسال',
    payment: 'پرداخت',
    back: 'بازگشت به سبد',
    showMeter: 'نمایش نوار ارسال',
    showPromo: 'نمایش کد تخفیف',
    showDelivery: 'نمایش دکمه ارسال',
    showPayment: 'نمایش دکمه پرداخت',
    showBack: 'نمایش پیوند بازگشت',
    reveal: 'کد تخفیف دارید؟',
    promo: 'کد تخفیف',
    apply: 'اعمال',
    remove: 'حذف کد'
  }
};

for (const lang of ['en', 'fa']) {
  const t = copy[lang];

  test(`${lang}: supplied summary, payment note and optional meter render their values`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontBagSummary', lang);
    await expect(page.getByRole('heading', {name: t.title, exact: true})).toBeVisible();
    await expect(page.getByText('VF-7K2M4Q', {exact: true})).toBeVisible();
    await expect(page.locator('.ag-osum__sum--strong .ag-price')).toHaveText(t.amount);
    await expect(page.getByText(t.note, {exact: true})).toBeVisible();
    const meter = page.getByRole('meter', {name: t.meter, exact: true});
    await expect(meter).toHaveAttribute('aria-valuenow', '60');
    await expect(meter).toHaveAttribute('aria-valuemax', '100');
    await expect(meter).toHaveAttribute('aria-valuetext', t.meterValue);
    await page.getByRole('button', {name: t.complete, exact: true}).click();
    await expect(meter).toHaveAttribute('aria-valuenow', '100');
    await expect(meter).toHaveAttribute('aria-valuetext', t.meterDone);
    await expect(meter).toHaveClass(/ag-meter--done/);
    await page.getByRole('checkbox', {name: t.showMeter, exact: true}).uncheck();
    await expect(meter).toHaveCount(0);
  });

  test(`${lang}: promo disclosure, controlled draft, refused/applied/remove callbacks and focus`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontBagSummary', lang);
    expect(await scanAxe(page)).toEqual([]);
    const reveal = page.getByRole('button', {name: t.reveal, exact: true});
    await expect(reveal).toHaveAttribute('aria-expanded', 'false');
    await expect(reveal).toHaveAttribute('aria-controls', 'vf-promo-panel');
    await reveal.click();
    const promo = page.getByRole('textbox', {name: t.promo, exact: true});
    await expect(promo).toBeFocused();
    await expect(promo).toHaveAttribute('dir', 'ltr');
    await promo.fill('NOPE');
    await expect(page.locator('[data-test="promo-draft"]')).toHaveText('NOPE');
    await page.getByRole('button', {name: t.apply, exact: true}).click();
    await expect(page.locator('[data-test="last-apply"]')).toHaveText('NOPE');
    await expect(promo).toHaveAccessibleDescription(t.error);
    await expect(promo).toHaveAttribute('aria-invalid', 'true');
    await expect(promo).toBeFocused();
    expect(await scanAxe(page)).toEqual([]);
    await promo.fill(' SAVE ');
    await promo.press('Enter');
    await expect(page.locator('[data-test="last-apply"]')).toHaveText('SAVE');
    await expect(page.getByRole('status')).toContainText(t.applied);
    await expect(page.getByRole('button', {name: t.remove, exact: true})).toBeFocused();
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('button', {name: t.remove, exact: true}).click();
    await expect(page.locator('[data-test="action"]')).toHaveText('remove');
    await expect(promo).toHaveValue('');
    await expect(promo).toBeFocused();
    await expect(page.getByRole('status')).toHaveCount(0);
  });

  test(`${lang}: delivery/payment/back visibility and callbacks remain independent`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontBagSummary', lang);
    await page.getByRole('button', {name: t.delivery, exact: true}).click();
    await expect(page.locator('[data-test="action"]')).toHaveText('delivery');
    await expect(page.getByRole('button', {name: t.payment, exact: true})).toHaveCount(0);
    await page.getByRole('checkbox', {name: t.showPayment, exact: true}).check();
    await expect(page.getByRole('button', {name: t.delivery, exact: true})).toBeVisible();
    await page.getByRole('button', {name: t.payment, exact: true}).click();
    await expect(page.locator('[data-test="action"]')).toHaveText('payment');
    const back = page.getByRole('link', {name: t.back, exact: true});
    await expect(back).toHaveAttribute('href', '#bag');
    await back.click();
    await expect(page.locator('[data-test="action"]')).toHaveText('back');
    for (const [flag, role, label] of [
      [t.showDelivery, 'button', t.delivery],
      [t.showPayment, 'button', t.payment],
      [t.showBack, 'link', t.back]
    ]) {
      await page.getByRole('checkbox', {name: flag, exact: true}).uncheck();
      await expect(page.getByRole(role, {name: label, exact: true})).toHaveCount(0);
    }
  });

  test(`${lang}: optional controls can be hidden; compact view keeps the back link and passes axe`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontBagSummary', lang);
    await page.getByRole('checkbox', {name: t.showMeter, exact: true}).uncheck();
    await page.getByRole('checkbox', {name: t.showPromo, exact: true}).uncheck();
    await expect(page.getByRole('meter')).toHaveCount(0);
    await expect(page.getByRole('button', {name: t.reveal, exact: true})).toHaveCount(0);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: t.showPayment, exact: true}).check();
    await page.setViewportSize({width: 390, height: 844});
    for (const label of [t.delivery, t.payment])
      await expect(page.getByRole('button', {name: label, exact: true})).toHaveCount(0);
    await expect(page.getByRole('link', {name: t.back, exact: true})).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
  });
}
