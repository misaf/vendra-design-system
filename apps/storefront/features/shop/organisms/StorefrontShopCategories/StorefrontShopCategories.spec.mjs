import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {label: 'دسته‌ها', all: 'همه گل‌ها', bouquets: 'دسته‌گل‌ها', plants: 'گیاهان و هدایای فصلی'}
      : {
          label: 'Categories',
          all: 'All flowers',
          bouquets: 'Bouquets',
          plants: 'Plants and seasonal gifts'
        };
  const number = value => new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US').format(value);
  test(
    'sidebar categories preserve order, counts and controlled selection (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontShopCategories', lang);
      await expect(page.getByText(t.label, {exact: true})).toBeVisible();
      const buttons = page.locator('.vf-shop-category, .vf-shop-category-selected');
      await expect(buttons).toHaveText([
        t.all + number(12),
        t.bouquets + number(8),
        t.plants + number(0)
      ]);
      await expect(buttons.nth(0)).toHaveAttribute('aria-pressed', 'true');
      await expect(buttons.nth(1)).toHaveAttribute('type', 'button');
      await buttons.nth(1).focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-test=action]')).toHaveText('bouquets');
      await expect(buttons.nth(1)).toHaveAttribute('aria-pressed', 'true');
      await expect(buttons.nth(0)).toHaveAttribute('aria-pressed', 'false');
      await buttons.nth(2).click();
      await expect(page.locator('[data-test=action]')).toHaveText('plants');
      await expect(buttons.nth(2)).toHaveAttribute('aria-pressed', 'true');
      await buttons.nth(0).click();
      await expect(page.locator('[data-test=action]')).toHaveText('all');
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'compact categories expose named group and chip callbacks (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      await openStorefrontComponent(page, 'StorefrontShopCategories', lang);
      await page.getByRole('checkbox', {name: 'Compact categories'}).check();
      const group = page.getByRole('group', {name: t.label});
      const all = group.getByRole('button', {name: t.all + ' · ' + number(12), exact: true});
      const plants = group.getByRole('button', {name: t.plants + ' · ' + number(0), exact: true});
      await expect(all).toHaveAttribute('aria-pressed', 'true');
      await plants.focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-test=action]')).toHaveText('plants');
      await expect(plants).toHaveAttribute('aria-pressed', 'true');
      await expect(all).toHaveAttribute('aria-pressed', 'false');
      await all.click();
      await expect(page.locator('[data-test=action]')).toHaveText('all');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'empty category records keep supplied sidebar/group label (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      await openStorefrontComponent(page, 'StorefrontShopCategories', lang);
      await page.getByRole('checkbox', {name: 'Empty categories'}).check();
      await expect(page.locator('.vf-shop-category, .vf-shop-category-selected')).toHaveCount(0);
      await expect(page.getByText(t.label, {exact: true})).toBeVisible();
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Compact categories'}).check();
      await expect(page.getByRole('group', {name: t.label}).getByRole('button')).toHaveCount(0);
      expect(await scanAxe(page)).toEqual([]);
    }
  );
}
