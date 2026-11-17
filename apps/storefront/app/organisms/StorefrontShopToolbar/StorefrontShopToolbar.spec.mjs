import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          filters: 'باز کردن فیلترها',
          quick: 'فیلترهای سریع',
          count: '۱۲ طرح',
          filteredCount: '۳ طرح مطابق',
          sort: 'مرتب‌سازی طرح‌ها',
          recommended: 'پیشنهادی',
          price: 'قیمت از کم',
          recent: 'جدیدترین',
          ready: 'آماده ارسال',
          stock: 'موجود',
          birthday: 'تولد',
          tomorrow: 'فردا',
          active: 'فیلترهای فعال',
          remove: 'حذف ',
          clear: 'پاک کردن همه'
        }
      : {
          filters: 'Open filters',
          quick: 'Quick filters',
          count: '12 designs',
          filteredCount: '3 matching designs',
          sort: 'Sort designs',
          recommended: 'Recommended',
          price: 'Price: low first',
          recent: 'Newest',
          ready: 'Ready to send',
          stock: 'In stock',
          birthday: 'Birthday',
          tomorrow: 'Tomorrow',
          active: 'Active filters',
          remove: 'Remove ',
          clear: 'Clear all'
        };
  test('toolbar sort value follows compact and desktop controls (' + lang + ')', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await openStorefrontComponent(page, 'StorefrontShopToolbar', lang);
    const compact = page
      .locator('.vf-shop-mobile-bar')
      .getByRole('button', {name: new RegExp(t.sort)});
    await expect(compact).toContainText(t.recommended);
    await compact.focus();
    await page.keyboard.press('ArrowDown');
    await page.getByRole('option', {name: t.price, exact: true}).click();
    await expect(compact).toContainText(t.price);
    await expect(page.locator('[data-test=action]')).toHaveText('sort:price');
    await expect(page.locator('[data-test=sort]')).toHaveText('price');
    await page.setViewportSize({width: 1280, height: 900});
    const desktop = page
      .locator('.vf-shop-sorting')
      .getByRole('button', {name: new RegExp(t.sort)});
    await expect(desktop).toContainText(t.price);
    await desktop.focus();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('End');
    await page.keyboard.press('Enter');
    await expect(desktop).toContainText(t.recent);
    await expect(page.locator('[data-test=action]')).toHaveText('sort:recent');
    await page.setViewportSize({width: 390, height: 844});
    await expect(compact).toContainText(t.recent);
    expect(await scanAxe(page)).toEqual([]);
  });
  test('toolbar active-filter remove and Clear callbacks (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontShopToolbar', lang);
    const bar = page.getByRole('group', {name: t.active});
    const remove = bar.getByRole('button', {name: t.remove + t.birthday, exact: true});
    await remove.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-test=action]')).toHaveText('remove:birthday');
    await expect(remove).toHaveCount(0);
    await expect(bar.getByRole('button', {name: t.remove + t.tomorrow, exact: true})).toBeFocused();
    await bar.getByRole('button', {name: t.clear, exact: true}).click();
    await expect(page.locator('[data-test=action]')).toHaveText('clear');
    await expect(bar).toHaveCount(0);
    await expect(page.getByRole('group', {name: t.quick})).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
  });
  test(
    'toolbar quick-filter focus and controlled pressed state update count (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontShopToolbar', lang);
      const group = page.getByRole('group', {name: t.quick});
      const ready = group.getByRole('button', {name: t.ready, exact: true});
      const stock = group.getByRole('button', {name: t.stock, exact: true});
      const count = page.locator('#vf-shop-count');
      await expect(count).toHaveAttribute('role', 'status');
      await expect(count).toHaveAttribute('tabindex', '-1');
      await expect(count).toHaveText(t.count);
      await expect(ready).toHaveAttribute('aria-pressed', 'false');
      await expect(stock).toHaveAttribute('aria-pressed', 'true');
      await ready.focus();
      await expect(page.locator('[data-test=focused]')).toHaveText(t.ready);
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-test=action]')).toHaveText('quick:ready');
      await expect(ready).toHaveAttribute('aria-pressed', 'true');
      await expect(stock).toHaveAttribute('aria-pressed', 'true');
      await expect(count).toHaveText(t.filteredCount);
      await stock.focus();
      await expect(page.locator('[data-test=focused]')).toHaveText(t.stock);
      await stock.click();
      await expect(stock).toHaveAttribute('aria-pressed', 'false');
      await expect(page.locator('[data-test=action]')).toHaveText('quick:stock');
      await count.focus();
      await expect(count).toBeFocused();
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test('toolbar compact filter opener and containment (' + lang + ')', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await openStorefrontComponent(page, 'StorefrontShopToolbar', lang);
    const open = page.getByRole('button', {name: t.filters, exact: true});
    await open.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-test=action]')).toHaveText('open');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    expect(await scanAxe(page)).toEqual([]);
    await page.setViewportSize({width: 1280, height: 900});
    await expect(open).toHaveCount(0);
    await expect(page.locator('.vf-shop-sorting').getByRole('button')).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
  });
}
