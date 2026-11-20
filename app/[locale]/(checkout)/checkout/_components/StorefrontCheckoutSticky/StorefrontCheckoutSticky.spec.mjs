import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../../e2e/component-test.mjs';

test.use({viewport: {width: 390, height: 844}});

const copy = {
  en: {
    total: 'Total',
    one: '2,400,000 toman',
    two: '3,100,000 toman',
    place: 'Place order',
    receipt: 'Send receipt',
    update: 'Change supplied method and total',
    allow: 'Allow placement',
    complete: 'Complete fixture request'
  },
  fa: {
    total: 'جمع',
    one: '۲٬۴۰۰٬۰۰۰ تومان',
    two: '۳٬۱۰۰٬۰۰۰ تومان',
    place: 'ثبت سفارش',
    receipt: 'ارسال رسید',
    update: 'تغییر روش و جمع نمونه',
    allow: 'اجازه ثبت سفارش',
    complete: 'پایان درخواست نمونه'
  }
};

for (const lang of ['en', 'fa']) {
  const t = copy[lang];

  test(`${lang}: compact total, method wording, disabled state and place callback follow props`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontCheckoutSticky', lang);
    const bar = page.locator('.vf-mobile-action');
    await expect(bar.getByText(t.total, {exact: true})).toBeVisible();
    await expect(bar.locator('.ag-price')).toHaveText(t.one);
    await expect(bar.getByRole('button', {name: t.place, exact: true})).toBeDisabled();
    await page.getByRole('button', {name: t.update, exact: true}).click();
    await expect(bar.locator('.ag-price')).toHaveText(t.two);
    const place = bar.getByRole('button', {name: t.receipt, exact: true});
    await expect(place).toBeDisabled();
    await page.getByRole('checkbox', {name: t.allow, exact: true}).check();
    await place.click();
    await expect(page.locator('[data-test="requests"]')).toHaveText('1');
    await expect(place).toHaveAttribute('aria-disabled', 'true');
    await expect(place).toBeFocused();
  });

  test(`${lang}: pending blocks repeat keyboard/programmatic activation and completion restores placement`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontCheckoutSticky', lang);
    await page.getByRole('checkbox', {name: t.allow, exact: true}).check();
    const place = page.getByRole('button', {name: t.place, exact: true});
    await place.click();
    await expect(place).toHaveAttribute('aria-disabled', 'true');
    await place.press('Enter');
    await place.press('Space');
    await place.evaluate(button => button.click());
    await expect(page.locator('[data-test="requests"]')).toHaveText('1');
    await page.getByRole('button', {name: t.complete, exact: true}).click();
    await expect(place).not.toHaveAttribute('aria-disabled', 'true');
    await place.click();
    await expect(page.locator('[data-test="requests"]')).toHaveText('2');
  });

  test(`${lang}: disabled, enabled and pending compact states pass axe without overflow`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontCheckoutSticky', lang);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: t.allow, exact: true}).check();
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('button', {name: t.place, exact: true}).click();
    await expect(page.getByRole('button', {name: t.place, exact: true})).toHaveAttribute(
      'aria-disabled',
      'true'
    );
    expect(await scanAxe(page)).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      )
    ).toBeLessThanOrEqual(0);
  });
}
