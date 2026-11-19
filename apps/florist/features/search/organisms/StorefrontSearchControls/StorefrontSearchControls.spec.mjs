import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';

for (const lang of ['en', 'fa']) {
  const fa = lang === 'fa';
  const label = fa ? 'جستجوی طرح‌ها' : 'Search designs';
  test(`${lang}: supplied query metadata, controlled typing and external value`, async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontSearchControls', lang);
    const box = page.getByRole('searchbox', {name: label, exact: true});
    await expect(box).toHaveAttribute('id', 'vf-q');
    await expect(box).toHaveAttribute('placeholder', fa ? 'کد یا نوع گل' : 'Code or flower type');
    await box.fill(fa ? 'ارکیده' : 'orchid');
    await expect(page.locator('[data-test=value]')).toHaveText(fa ? 'ارکیده' : 'orchid');
    await expect(page.locator('[data-test=changes]')).toHaveText('1');
    await page.getByRole('button', {name: fa ? 'تنظیم جستجو' : 'Set query', exact: true}).click();
    await expect(box).toHaveValue('VF-7K2M4Q');
    await expect(page.locator('[data-test=changes]')).toHaveText('1');
  });

  test(`${lang}: clear and Escape forward an empty query and retain input focus`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontSearchControls', lang);
    const box = page.getByRole('searchbox', {name: label, exact: true});
    await box.fill('VF-7K2M4Q');
    await page
      .getByRole('button', {name: fa ? 'پاک کردن جستجو' : 'Clear search', exact: true})
      .click();
    await expect(box).toHaveValue('');
    await expect(box).toBeFocused();
    await expect(page.locator('[data-test=value]')).toHaveText('');
    await expect(page.locator('[data-test=changes]')).toHaveText('2');
    await box.fill('VF-8P3N5R');
    await box.press('Escape');
    await expect(box).toHaveValue('');
    await expect(box).toBeFocused();
    await expect(page.locator('[data-test=changes]')).toHaveText('4');
  });

  test(`${lang}: compact empty/populated controls pass axe and close navigates by keyboard`, async ({
    page
  }) => {
    await page.setViewportSize({width: 390, height: 844});
    await openStorefrontComponent(page, 'StorefrontSearchControls', lang);
    expect(await scanAxe(page)).toEqual([]);
    const box = page.getByRole('searchbox', {name: label, exact: true});
    await box.fill('VF-7K2M4Q');
    expect(await scanAxe(page)).toEqual([]);
    await box.press('Tab');
    const close = page.getByRole('link', {name: fa ? 'بستن جستجو' : 'Close search', exact: true});
    await expect(close).toBeFocused();
    await expect(close).toHaveAttribute('href', '#search-origin');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    await close.press('Enter');
    await expect(page).toHaveURL(/#search-origin$/);
  });
}
