import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../e2e/component-test.mjs';

for (const lang of ['en', 'fa']) {
  const fa = lang === 'fa';
  const labels = fa
    ? ['دسته گل', 'ارکیده', 'گل‌های فصل']
    : ['Bouquet', 'Orchid', 'Seasonal flowers'];
  test(`${lang}: supplied title/order and individual callbacks stay isolated`, async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontSearchPopular', lang);
    await expect(
      page.getByText(fa ? 'جستجوهای پرطرفدار' : 'Popular searches', {exact: true})
    ).toBeVisible();
    await expect(page.locator('.ag-chip')).toHaveText(labels);
    for (let index = 0; index < labels.length; index++) {
      const chip = page.getByRole('button', {name: labels[index], exact: true});
      await expect(chip).toHaveAttribute('aria-pressed', 'false');
      await chip.click();
      await expect(page.locator('[data-test=selected]')).toHaveText(labels[index]);
      await expect(page.locator('[data-test=calls]')).toHaveText(String(index + 1));
      await expect(chip).toHaveAttribute('aria-pressed', 'false');
    }
  });

  test(`${lang}: keyboard order and Enter/Space invoke supplied term callbacks`, async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontSearchPopular', lang);
    const first = page.getByRole('button', {name: labels[0], exact: true});
    await first.focus();
    await first.press('Enter');
    await expect(page.locator('[data-test=selected]')).toHaveText(labels[0]);
    await first.press('Tab');
    const second = page.getByRole('button', {name: labels[1], exact: true});
    await expect(second).toBeFocused();
    await second.press('Space');
    await expect(page.locator('[data-test=selected]')).toHaveText(labels[1]);
    await expect(page.locator('[data-test=calls]')).toHaveText('2');
  });

  test(`${lang}: compact populated and empty arrays pass axe without overflow`, async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await openStorefrontComponent(page, 'StorefrontSearchPopular', lang);
    expect(await scanAxe(page)).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    const empty = page.getByRole('checkbox', {name: fa ? 'بدون عبارت' : 'No terms', exact: true});
    await empty.check();
    await expect(page.locator('.ag-chip')).toHaveCount(0);
    await expect(
      page.getByText(fa ? 'جستجوهای پرطرفدار' : 'Popular searches', {exact: true})
    ).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
    await empty.uncheck();
    await expect(page.locator('.ag-chip')).toHaveText(labels);
    await expect(page.locator('[data-test=calls]')).toHaveText('0');
  });
}
