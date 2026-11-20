import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../../../e2e/component-test.mjs';

test.use({viewport: {width: 390, height: 844}});

const copy = {
  en: {
    total: 'Selection total',
    add: 'Add to bag',
    available: 'Design available',
    update: 'Update supplied total',
    one: '2,400,000 toman',
    two: '3,100,000 toman'
  },
  fa: {
    total: 'جمع انتخاب',
    add: 'افزودن به سبد',
    available: 'طرح موجود است',
    update: 'به‌روزرسانی جمع',
    one: '۲٬۴۰۰٬۰۰۰ تومان',
    two: '۳٬۱۰۰٬۰۰۰ تومان'
  }
};

for (const lang of ['en', 'fa']) {
  const t = copy[lang];

  test(`${lang}: compact total/status and availability follow props; add calls back`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontProductSticky', lang);
    const status = page.getByRole('status');
    await expect(status).toHaveAttribute('aria-atomic', 'true');
    await expect(status).toContainText(t.total);
    await expect(status).toContainText(t.one);
    const add = page.getByRole('button', {name: t.add, exact: true});
    await expect(add).toBeVisible();
    await expect(add).toBeDisabled();
    await page.getByRole('checkbox', {name: t.available, exact: true}).check();
    await expect(add).toBeEnabled();
    await add.click();
    await expect(page.locator('[data-test="adds"]')).toHaveText('1');
    await page.getByRole('button', {name: t.update, exact: true}).click();
    await expect(status).toContainText(t.two);
    await page.getByRole('checkbox', {name: t.available, exact: true}).uncheck();
    await expect(add).toBeDisabled();
  });

  test(`${lang}: disabled/enabled compact states pass axe without overflow`, async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontProductSticky', lang);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: t.available, exact: true}).check();
    expect(await scanAxe(page)).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      )
    ).toBeLessThanOrEqual(0);
  });
}
