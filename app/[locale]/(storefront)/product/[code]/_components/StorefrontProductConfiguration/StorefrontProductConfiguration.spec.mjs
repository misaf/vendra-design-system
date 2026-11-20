import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../../../e2e/component-test.mjs';

const copy = {
  en: {
    size: 'Size',
    extras: 'Extras',
    medium: 'Medium',
    large: 'Large',
    largeHint: 'A fuller arrangement',
    card: 'Gift card',
    vase: 'Glass vase',
    showSizes: 'Show sizes',
    showAddons: 'Show extras'
  },
  fa: {
    size: 'اندازه',
    extras: 'افزودنی‌ها',
    medium: 'متوسط',
    large: 'بزرگ',
    largeHint: 'چیدمان پُرتر',
    card: 'کارت هدیه',
    vase: 'گلدان شیشه‌ای',
    showSizes: 'نمایش اندازه‌ها',
    showAddons: 'نمایش افزودنی‌ها'
  }
};

for (const lang of ['en', 'fa']) {
  const t = copy[lang];

  test(`${lang}: size and individual extras are controlled through their callbacks`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontProductConfiguration', lang);
    const group = page.getByRole('radiogroup', {name: t.size, exact: true});
    const medium = group.getByRole('radio', {name: t.medium, exact: true});
    const large = group.getByRole('radio', {name: t.large, exact: true});
    await expect(medium).toBeChecked();
    await expect(large).toHaveAccessibleDescription(t.largeHint);
    await medium.focus();
    await page.keyboard.press('ArrowDown');
    await expect(large).toBeChecked();
    await expect(page.locator('[data-test="size"]')).toHaveText('large');
    await group.getByText(t.medium, {exact: true}).click();
    await expect(page.locator('[data-test="size"]')).toHaveText('medium');
    const extras = page.getByRole('group', {name: t.extras, exact: true});
    await expect(extras.getByRole('checkbox', {name: t.card, exact: true})).not.toBeChecked();
    await expect(extras.getByRole('checkbox', {name: t.vase, exact: true})).toBeChecked();
    await extras.getByText(t.card, {exact: true}).click();
    await extras.getByText(t.vase, {exact: true}).click();
    await expect(extras.getByRole('checkbox', {name: t.card, exact: true})).toBeChecked();
    await expect(extras.getByRole('checkbox', {name: t.vase, exact: true})).not.toBeChecked();
    await expect(page.locator('[data-test="extras"]')).toHaveText('{"card":true,"vase":false}');
  });

  test(`${lang}: size and extras visibility are independent and preserve controlled values`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontProductConfiguration', lang);
    await page.getByRole('checkbox', {name: t.showSizes, exact: true}).uncheck();
    await expect(page.getByRole('radiogroup', {name: t.size, exact: true})).toHaveCount(0);
    await expect(page.getByRole('group', {name: t.extras, exact: true})).toBeVisible();
    await page.getByRole('checkbox', {name: t.showAddons, exact: true}).uncheck();
    await expect(page.getByRole('group', {name: t.extras, exact: true})).toHaveCount(0);
    await page.getByRole('checkbox', {name: t.showSizes, exact: true}).check();
    await expect(page.getByRole('radio', {name: t.medium, exact: true})).toBeChecked();
    await page.getByRole('checkbox', {name: t.showAddons, exact: true}).check();
    await expect(page.getByRole('checkbox', {name: t.vase, exact: true})).toBeChecked();
  });

  test(`${lang}: combined, extras-only and sizes-only states pass axe`, async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontProductConfiguration', lang);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: t.showSizes, exact: true}).uncheck();
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: t.showSizes, exact: true}).check();
    await page.getByRole('checkbox', {name: t.showAddons, exact: true}).uncheck();
    expect(await scanAxe(page)).toEqual([]);
  });
}
