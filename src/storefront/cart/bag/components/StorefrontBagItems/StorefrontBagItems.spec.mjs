import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../../e2e/component-test.mjs';

const copy = {
  en: {
    remove: 'Remove design',
    more: 'More designs',
    less: 'Fewer designs',
    quantity: 'Design quantity',
    meta: 'Medium',
    note: 'Card: Happy birthday',
    priceNotice: 'This design has a new price',
    stockWarning: 'Only three of this design remain',
    unavailable: 'This design is unavailable',
    clear: 'Clear fixture lines'
  },
  fa: {
    remove: 'حذف طرح',
    more: 'افزایش تعداد طرح',
    less: 'کاهش تعداد طرح',
    quantity: 'تعداد طرح',
    meta: 'متوسط',
    note: 'کارت: تولدت مبارک',
    priceNotice: 'قیمت این طرح تغییر کرده است',
    stockWarning: 'فقط سه عدد از این طرح باقی مانده است',
    unavailable: 'این طرح موجود نیست',
    clear: 'پاک کردن ردیف‌های نمونه'
  }
};
const row = (page, code) =>
  page.locator('.vf-bag-line').filter({has: page.getByText(code, {exact: true})});

for (const lang of ['en', 'fa']) {
  const t = copy[lang];

  test(`${lang}: configured line content and bounded quantities stay independent`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontBagItems', lang);
    const first = row(page, 'VF-7K2M4Q');
    const second = row(page, 'VF-3P8R1T');
    await expect(first.getByText(t.meta, {exact: true})).toBeVisible();
    await expect(first.getByText(t.note, {exact: true})).toBeVisible();
    await expect(first.getByRole('button', {name: t.less, exact: true})).toBeDisabled();
    await first.getByRole('button', {name: t.more, exact: true}).click();
    await expect(first.getByRole('button', {name: t.more, exact: true})).toBeDisabled();
    await expect(first.getByRole('textbox', {name: t.quantity, exact: true})).toHaveValue(
      lang === 'fa' ? '۲' : '2'
    );
    await second.getByRole('button', {name: t.more, exact: true}).click();
    await expect(second.getByRole('button', {name: t.more, exact: true})).toBeDisabled();
    await expect(page.locator('[data-test="quantities"]')).toHaveText(
      '{"VF-7K2M4Q":2,"VF-3P8R1T":3,"VF-6MT3VY":1}'
    );
    await first.getByRole('button', {name: t.less, exact: true}).click();
    await expect(page.locator('[data-test="quantities"]')).toHaveText(
      '{"VF-7K2M4Q":1,"VF-3P8R1T":3,"VF-6MT3VY":1}'
    );
  });

  test(`${lang}: notices and unavailable state are per-line; remove targets the selected line`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontBagItems', lang);
    const first = row(page, 'VF-7K2M4Q');
    const second = row(page, 'VF-3P8R1T');
    const unavailable = row(page, 'VF-6MT3VY');
    await expect(first.getByText(t.priceNotice, {exact: true})).toBeVisible();
    await expect(first.getByText(t.stockWarning, {exact: true})).toHaveCount(0);
    await expect(second.getByText(t.stockWarning, {exact: true})).toBeVisible();
    await expect(second.getByText(t.priceNotice, {exact: true})).toHaveCount(0);
    await expect(unavailable.getByText(t.unavailable, {exact: true})).toBeVisible();
    await expect(unavailable.getByRole('textbox')).toHaveCount(0);
    await expect(unavailable.locator('.ag-price')).toHaveCount(0);
    await second.getByRole('button', {name: t.remove, exact: true}).click();
    await expect(second).toHaveCount(0);
    await expect(first).toBeVisible();
    await expect(page.locator('[data-test="removed"]')).toHaveText('VF-3P8R1T');
    await unavailable.getByRole('button', {name: t.remove, exact: true}).click();
    await expect(page.locator('[data-test="removed"]')).toHaveText('VF-6MT3VY');
    await expect(page.locator('[data-test="quantities"]')).toHaveText('{"VF-7K2M4Q":1}');
  });

  test(`${lang}: populated and empty lists pass axe and retain the focus-preservation target`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontBagItems', lang);
    await expect(page.locator('.vf-bag-line-list')).toHaveAttribute('data-vf-keep-focus', 'true');
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('button', {name: t.clear, exact: true}).click();
    await expect(page.locator('.vf-bag-line')).toHaveCount(0);
    expect(await scanAxe(page)).toEqual([]);
  });
}
