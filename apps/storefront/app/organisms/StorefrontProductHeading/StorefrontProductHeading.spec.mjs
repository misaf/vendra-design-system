import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../e2e/component-test.mjs';

const copy = {
  en: {
    subtitle: 'Bouquets',
    badge: 'Ready today',
    unit: 'Unit price',
    description: 'A seasonal arrangement prepared by the studio.',
    copy: 'Copy design code',
    updated: 'A second supplied description.',
    in: 'In stock',
    low: 'Only 2 left',
    soon: 'Back on 12 October',
    out: 'Sold out'
  },
  fa: {
    subtitle: 'دسته‌گل‌ها',
    badge: 'آماده امروز',
    unit: 'قیمت واحد',
    description: 'چیدمان فصلی آماده‌شده در استودیو.',
    copy: 'کپی کد طرح',
    updated: 'توضیح دوم ارائه‌شده.',
    in: 'موجود',
    low: 'فقط ۲ عدد مانده',
    soon: 'موجود از ۲۰ مهر',
    out: 'ناموجود'
  }
};
for (const lang of ['en', 'fa']) {
  const t = copy[lang];
  test(`${lang}: supplied code, category, badge, price and description update without firing copy`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontProductHeading', lang);
    const heading = page.getByRole('heading', {level: 1, name: 'VF-7K2M4Q', exact: true});
    await expect(heading).toHaveAttribute('id', 'vf-product-code');
    for (const text of [t.subtitle, t.badge, t.unit, t.description])
      await expect(page.getByText(text, {exact: true})).toBeVisible();
    await expect(page.locator('.vf-product-price')).toHaveText('2,000,000');
    await page.getByRole('button', {name: 'Update content', exact: true}).click();
    await expect(page.getByRole('heading', {level: 1})).toHaveText('VF-8P3N5R');
    await expect(page.locator('.vf-product-price')).toHaveText('3,000,000');
    await expect(page.getByText(t.updated, {exact: true})).toBeVisible();
    await expect(page.locator('[data-test="copies"]')).toHaveText('0');
  });
  test(`${lang}: copy action delegates pointer, Enter and Space once per activation`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontProductHeading', lang);
    const copy = page.getByRole('button', {name: t.copy, exact: true});
    await copy.click();
    await expect(page.locator('[data-test="copies"]')).toHaveText('1');
    await copy.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-test="copies"]')).toHaveText('2');
    await page.keyboard.press('Space');
    await expect(page.locator('[data-test="copies"]')).toHaveText('3');
    await expect(page.getByRole('heading', {level: 1})).toHaveText('VF-7K2M4Q');
  });
  test(`${lang}: supplied stock descriptors render localized availability and pass compact axe`, async ({
    page
  }) => {
    await page.setViewportSize({width: 390, height: 844});
    await openStorefrontComponent(page, 'StorefrontProductHeading', lang);
    for (const status of ['in', 'low', 'soon', 'out']) {
      await page.getByRole('combobox', {name: 'Stock', exact: true}).selectOption(status);
      await expect(page.locator('.ag-stock')).toHaveText(t[status]);
      await expect(page.locator('.ag-stock')).toHaveClass(new RegExp('ag-stock--' + status));
      expect(await scanAxe(page)).toEqual([]);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
  });
}
