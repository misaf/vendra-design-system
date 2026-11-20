import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../../e2e/component-test.mjs';

const copy = {
  en: {
    title: 'Review your delivery before trying again',
    review: 'Review delivery',
    error: 'Payment recovery could not be saved on this device',
    showReview: 'Show retry review',
    showError: 'Show storage error'
  },
  fa: {
    title: 'پیش از تلاش دوباره ارسال را بررسی کنید',
    review: 'بررسی ارسال',
    error: 'بازیابی پرداخت در این دستگاه ذخیره نشد',
    showReview: 'نمایش بررسی دوباره',
    showError: 'نمایش خطای ذخیره‌سازی'
  }
};

for (const lang of ['en', 'fa']) {
  const t = copy[lang];

  test(`${lang}: review target is focusable and its callback preserves the storage error`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontCheckoutNotices', lang);
    const target = page.locator('#vf-payment-review');
    await expect(target).toHaveAttribute('tabindex', '-1');
    await expect(target).toHaveAttribute('data-vf-keep-focus', 'true');
    await target.focus();
    await expect(target).toBeFocused();
    await target.getByRole('button', {name: t.review, exact: true}).click();
    await expect(page.locator('[data-test="reviews"]')).toHaveText('1');
    await expect(target).toHaveCount(0);
    await expect(page.getByText(t.error, {exact: true})).toBeVisible();
  });

  test(`${lang}: review and storage-error branches are independent and preserve notice order`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontCheckoutNotices', lang);
    await expect(page.locator('.ag-alert').first()).toContainText(t.title);
    await expect(page.locator('.ag-alert').nth(1)).toContainText(t.error);
    await page.getByRole('checkbox', {name: t.showReview, exact: true}).uncheck();
    await expect(page.getByText(t.title, {exact: true})).toHaveCount(0);
    await expect(page.getByText(t.error, {exact: true})).toBeVisible();
    await page.getByRole('checkbox', {name: t.showError, exact: true}).uncheck();
    await expect(page.locator('.ag-alert')).toHaveCount(0);
    await page.getByRole('checkbox', {name: t.showReview, exact: true}).check();
    await expect(page.getByText(t.title, {exact: true})).toBeVisible();
    await expect(page.getByText(t.error, {exact: true})).toHaveCount(0);
  });

  test(`${lang}: combined, review-only and error-only states pass axe`, async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontCheckoutNotices', lang);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: t.showError, exact: true}).uncheck();
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: t.showReview, exact: true}).uncheck();
    await page.getByRole('checkbox', {name: t.showError, exact: true}).check();
    expect(await scanAxe(page)).toEqual([]);
  });
}
