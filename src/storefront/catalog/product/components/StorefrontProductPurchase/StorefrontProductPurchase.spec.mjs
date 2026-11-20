import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../../e2e/component-test.mjs';

const copy = {
  en: {
    total: 'Selection total',
    hint: 'Includes the selected size and extras',
    quantity: 'Design quantity',
    less: 'Fewer designs',
    more: 'More designs',
    save: 'Save design',
    unsave: 'Unsave design',
    add: 'Add to bag',
    unavailable: 'Design unavailable',
    one: '2,400,000 toman',
    two: '4,800,000 toman',
    three: '7,200,000 toman'
  },
  fa: {
    total: 'جمع انتخاب',
    hint: 'شامل اندازه و افزودنی‌های انتخاب‌شده',
    quantity: 'تعداد طرح',
    less: 'کاهش تعداد طرح',
    more: 'افزایش تعداد طرح',
    save: 'ذخیره طرح',
    unsave: 'حذف طرح از ذخیره‌ها',
    add: 'افزودن به سبد',
    unavailable: 'طرح ناموجود است',
    one: '۲٬۴۰۰٬۰۰۰ تومان',
    two: '۴٬۸۰۰٬۰۰۰ تومان',
    three: '۷٬۲۰۰٬۰۰۰ تومان'
  }
};

for (const lang of ['en', 'fa']) {
  const t = copy[lang];

  test(`${lang}: controlled quantity respects bounds and updates the supplied total/status`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontProductPurchase', lang);
    const status = page.getByRole('status');
    await expect(status).toHaveAttribute('aria-atomic', 'true');
    await expect(status).toContainText(t.total);
    await expect(status).toContainText(t.one);
    await expect(page.getByText(t.hint, {exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: t.less, exact: true})).toBeDisabled();
    await page.getByRole('button', {name: t.more, exact: true}).click();
    await expect(page.locator('[data-test="quantity"]')).toHaveText('2');
    await expect(status).toContainText(t.two);
    const quantity = page.getByRole('textbox', {name: t.quantity, exact: true});
    await expect(quantity).toHaveValue(lang === 'fa' ? '۲' : '2');
    await quantity.focus();
    await page.keyboard.press('End');
    await expect(page.locator('[data-test="quantity"]')).toHaveText('3');
    await expect(page.getByRole('button', {name: t.more, exact: true})).toBeDisabled();
    await expect(status).toContainText(t.three);
    await page.keyboard.press('Home');
    await expect(page.locator('[data-test="quantity"]')).toHaveText('1');
    await expect(page.getByRole('button', {name: t.less, exact: true})).toBeDisabled();
  });

  test(`${lang}: save state and availability control actions; add sees the current values`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontProductPurchase', lang);
    await page.getByRole('button', {name: t.save, exact: true}).click();
    await expect(page.getByRole('button', {name: t.unsave, exact: true})).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    await expect(page.locator('[data-test="saved"]')).toHaveText('true');
    await page.getByRole('checkbox', {name: t.unavailable, exact: true}).check();
    await expect(page.getByRole('button', {name: t.add, exact: true})).toBeDisabled();
    await expect(page.locator('[data-test="added"]')).toBeEmpty();
    await page.getByRole('checkbox', {name: t.unavailable, exact: true}).uncheck();
    await page.getByRole('button', {name: t.more, exact: true}).click();
    await page.getByRole('button', {name: t.add, exact: true}).click();
    await expect(page.locator('[data-test="added"]')).toHaveText('{"quantity":2,"saved":true}');
    await page.getByRole('button', {name: t.unsave, exact: true}).click();
    await expect(page.getByRole('button', {name: t.save, exact: true})).toHaveAttribute(
      'aria-pressed',
      'false'
    );
    await expect(page.locator('[data-test="saved"]')).toHaveText('false');
  });

  test(`${lang}: available/unavailable states pass axe and compact view keeps quantity/save`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontProductPurchase', lang);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: t.unavailable, exact: true}).check();
    expect(await scanAxe(page)).toEqual([]);
    await page.setViewportSize({width: 390, height: 844});
    await expect(page.getByRole('button', {name: t.add, exact: true})).toHaveCount(0);
    await expect(page.getByRole('status')).toHaveCount(0);
    await expect(page.getByRole('textbox', {name: t.quantity, exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: t.save, exact: true})).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
  });
}
