import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../e2e/component-test.mjs';

const copy = {
  en: {
    total: 'Total',
    one: '2,400,000 toman',
    two: '3,100,000 toman',
    delivery: 'Delivery',
    payment: 'Payment',
    update: 'Update supplied total',
    showDelivery: 'Show delivery action',
    showPayment: 'Show payment action'
  },
  fa: {
    total: 'جمع',
    one: '۲٬۴۰۰٬۰۰۰ تومان',
    two: '۳٬۱۰۰٬۰۰۰ تومان',
    delivery: 'ارسال',
    payment: 'پرداخت',
    update: 'به‌روزرسانی جمع',
    showDelivery: 'نمایش دکمه ارسال',
    showPayment: 'نمایش دکمه پرداخت'
  }
};

for (const lang of ['en', 'fa']) {
  const t = copy[lang];

  test(`${lang}: total and independently visible delivery/payment actions follow props`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontBagSticky', lang);
    const bar = page.locator('.vf-mobile-action');
    await expect(bar.getByText(t.total, {exact: true})).toBeVisible();
    await expect(bar.locator('.ag-price')).toHaveText(t.one);
    await page.getByRole('button', {name: t.update, exact: true}).click();
    await expect(bar.locator('.ag-price')).toHaveText(t.two);
    await bar.getByRole('button', {name: t.delivery, exact: true}).click();
    await expect(page.locator('[data-test="action"]')).toHaveText('delivery');
    await expect(bar.getByRole('button', {name: t.payment, exact: true})).toHaveCount(0);
    await page.getByRole('checkbox', {name: t.showPayment, exact: true}).check();
    await expect(bar.getByRole('button', {name: t.delivery, exact: true})).toBeVisible();
    await bar.getByRole('button', {name: t.payment, exact: true}).click();
    await expect(page.locator('[data-test="action"]')).toHaveText('payment');
    await page.getByRole('checkbox', {name: t.showDelivery, exact: true}).uncheck();
    await expect(bar.getByRole('button', {name: t.delivery, exact: true})).toHaveCount(0);
    await expect(bar.getByRole('button', {name: t.payment, exact: true})).toBeVisible();
    await page.getByRole('checkbox', {name: t.showPayment, exact: true}).uncheck();
    await expect(bar.getByRole('button')).toHaveCount(0);
  });

  test(`${lang}: compact delivery and payment steps pass axe without overflow`, async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await openStorefrontComponent(page, 'StorefrontBagSticky', lang);
    expect(await scanAxe(page)).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      )
    ).toBeLessThanOrEqual(0);
    await page.getByRole('checkbox', {name: t.showDelivery, exact: true}).uncheck();
    await page.getByRole('checkbox', {name: t.showPayment, exact: true}).check();
    await expect(page.getByRole('button', {name: t.payment, exact: true})).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      )
    ).toBeLessThanOrEqual(0);
  });
}
