import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          ready: 'آماده',
          sold: 'ناموجود',
          empty: 'طرحی پیدا نشد',
          body: 'دسته دیگری را امتحان کنید.',
          clear: 'پاک کردن فیلترها',
          star: 'انتخاب'
        }
      : {
          ready: 'Ready',
          sold: 'Sold out',
          empty: 'No designs',
          body: 'Try another category.',
          clear: 'Clear filters',
          star: 'Shortlist'
        };
  const codes = ['VF-7K2M4Q', 'VF-8P3N5R'];
  test(
    'catalog supplied tile order, labels, descriptions and images (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontPresentationCatalog', lang);
      const tiles = page.locator('.vf-presentation-tile');
      await expect(tiles).toHaveCount(2);
      for (const [index, code] of codes.entries()) {
        await expect(tiles.nth(index)).toContainText(code);
        await expect(tiles.nth(index)).toHaveAccessibleDescription(
          code + ' — ' + (index === 0 ? t.ready : t.sold)
        );
        const image = tiles.nth(index).locator('img');
        await expect(image).toHaveAttribute('alt', '');
        await expect(image).toHaveAttribute('src', '/assets/categories/bouquets.webp');
        await expect(image).toHaveAttribute('sizes', '(max-width: 767px) 100vw, 50vw');
        await expect(tiles.nth(index).locator('[dir=ltr]')).toHaveText(code);
      }
      await expect(tiles.nth(0).getByText(t.ready, {exact: true})).toBeVisible();
      await expect(tiles.nth(1).getByText(t.ready, {exact: true})).toHaveCount(0);
      await expect(page.locator('.ag-price')).toHaveText(['2,000,000', '3,000,000']);
      await page.getByRole('checkbox', {name: 'Show prices'}).uncheck();
      await expect(page.locator('.ag-price')).toHaveCount(0);
      await expect(tiles).toHaveCount(2);
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test('catalog open and shortlist callbacks remain isolated (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontPresentationCatalog', lang);
    const tiles = page.locator('.vf-presentation-tile');
    await tiles.nth(1).click();
    await expect(page.locator('[data-test=opened]')).toHaveText(codes[1]);
    await expect(page.locator('[data-test=open-count]')).toHaveText('1');
    const star = page.getByRole('button', {name: t.star + ' ' + codes[0], exact: true});
    await star.click();
    await expect(star).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-test=stars]')).toHaveText(codes[0]);
    await expect(page.locator('[data-test=open-count]')).toHaveText('1');
    await star.focus();
    await page.keyboard.press('Space');
    await expect(star).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('[data-test=star-count]')).toHaveText('2');
    await tiles.nth(0).focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-test=opened]')).toHaveText(codes[0]);
    await page.keyboard.press('Space');
    await expect(page.locator('[data-test=open-count]')).toHaveText('3');
    await expect(page.locator('[data-test=star-count]')).toHaveText('2');
  });
  test(
    'catalog no-results recovery and empty input are controlled independently (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontPresentationCatalog', lang);
      await page.getByRole('checkbox', {name: 'Show no results'}).check();
      await expect(page.locator('.vf-presentation-tile')).toHaveCount(0);
      await expect(page.getByText(t.empty, {exact: true})).toBeVisible();
      await expect(page.getByText(t.body, {exact: true})).toBeVisible();
      const clear = page.getByRole('button', {name: t.clear, exact: true});
      await clear.click();
      await clear.focus();
      await page.keyboard.press('Enter');
      await page.keyboard.press('Space');
      await expect(page.locator('[data-test=cleared]')).toHaveText('3');
      await expect(clear).toBeVisible();
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Empty tiles'}).check();
      await page.getByRole('checkbox', {name: 'Show no results'}).uncheck();
      await expect(page.getByRole('list')).toBeAttached();
      await expect(page.locator('.vf-presentation-tile')).toHaveCount(0);
      await expect(clear).toHaveCount(0);
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test('catalog compact populated and recovery accessibility (' + lang + ')', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await openStorefrontComponent(page, 'StorefrontPresentationCatalog', lang);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: 'Show no results'}).check();
    expect(await scanAxe(page)).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
  });
}
