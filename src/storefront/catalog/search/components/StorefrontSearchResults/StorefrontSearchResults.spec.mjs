import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../../e2e/component-test.mjs';

const codes = ['VF-7K2M4Q', 'VF-8P3N5R', 'VF-9A4B6C'];
for (const lang of ['en', 'fa']) {
  const fa = lang === 'fa';
  test(`${lang}: ordered rows preserve codes, subtitles, formatted prices and media`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontSearchResults', lang);
    await expect(page.getByRole('status')).toHaveText(fa ? '۳ نتیجه' : '3 results');
    const rows = page.locator('.vf-search-result');
    await expect(rows).toHaveCount(3);
    await expect(rows.locator('.vf-search-name')).toHaveText(codes);
    for (let index = 0; index < codes.length; index++) {
      const row = rows.nth(index);
      await expect(row).toHaveAttribute('href', '#' + codes[index]);
      await expect(row.locator('.vf-search-name')).toHaveAttribute('dir', 'ltr');
      await expect(row.locator('.vf-search-subtitle')).toHaveText(
        fa ? 'گل‌های فصل، ساخته‌شده در استودیو' : 'Seasonal flowers, made in the studio'
      );
      await expect(row.locator('.ag-price')).toHaveText(
        new Intl.NumberFormat(fa ? 'fa-IR' : 'en-US').format(490000 + index * 10000) +
          (fa ? ' تومان' : ' toman')
      );
    }
    const photo = rows
      .first()
      .getByRole('img', {name: (fa ? 'عکس ' : 'Photo ') + codes[0], exact: true});
    await expect(photo).toHaveAttribute('sizes', '48px');
    await expect(photo).toHaveAttribute('src', /bouquets.webp/);
    await expect(rows.first().locator('.ag-arch')).toHaveClass(/ag-arch--soft/);
    await expect(rows.nth(1).locator('.ag-arch__ph')).toHaveCount(1);
    await expect(rows.nth(2).locator('.ag-arch__ph')).toHaveCount(1);
  });

  test(`${lang}: each row forwards selection and keeps native pointer/keyboard navigation`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontSearchResults', lang);
    const rows = page.locator('.vf-search-result');
    await rows.nth(1).click();
    await expect(page.locator('[data-test=selected]')).toHaveText(codes[1]);
    await expect(page.locator('[data-test=calls]')).toHaveText('1');
    await expect(page).toHaveURL(new RegExp('#' + codes[1] + '$'));
    await rows.first().focus();
    await rows.first().press('Enter');
    await expect(page.locator('[data-test=selected]')).toHaveText(codes[0]);
    await expect(page.locator('[data-test=calls]')).toHaveText('2');
    await rows.first().press('Tab');
    await expect(rows.nth(1)).toBeFocused();
    await rows.nth(1).press('Tab');
    await expect(rows.nth(2)).toBeFocused();
    await rows.nth(2).press('Enter');
    await expect(page.locator('[data-test=selected]')).toHaveText(codes[2]);
    await expect(page.locator('[data-test=calls]')).toHaveText('3');
    await expect(page).toHaveURL(new RegExp('#' + codes[2] + '$'));
  });

  test(`${lang}: owner supplies single/empty results and counts without invoking selection`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontSearchResults', lang);
    await page
      .getByRole('checkbox', {name: fa ? 'یک نتیجه' : 'Single result', exact: true})
      .check();
    await expect(page.locator('.vf-search-name')).toHaveText(codes[0]);
    await expect(page.getByRole('status')).toHaveText(fa ? '۱ نتیجه' : '1 result');
    await page.getByRole('checkbox', {name: fa ? 'بدون نتیجه' : 'No results', exact: true}).check();
    await expect(page.locator('.vf-search-result')).toHaveCount(0);
    await expect(page.getByRole('status')).toHaveText(fa ? '۰ نتیجه' : '0 results');
    await expect(page.locator('[data-test=calls]')).toHaveText('0');
  });

  test(`${lang}: compact multiple/single/empty results pass axe and keep content contained`, async ({
    page
  }) => {
    await page.setViewportSize({width: 390, height: 844});
    await openStorefrontComponent(page, 'StorefrontSearchResults', lang);
    expect(await scanAxe(page)).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    const row = await page.locator('.vf-search-result').first().boundingBox();
    const price = await page.locator('.ag-price').first().boundingBox();
    expect(price.x).toBeGreaterThanOrEqual(row.x);
    expect(price.x + price.width).toBeLessThanOrEqual(row.x + row.width + 1);
    await page
      .getByRole('checkbox', {name: fa ? 'یک نتیجه' : 'Single result', exact: true})
      .check();
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: fa ? 'بدون نتیجه' : 'No results', exact: true}).check();
    expect(await scanAxe(page)).toEqual([]);
  });
}
