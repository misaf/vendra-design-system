import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          title: 'فیلترهای فروشگاه',
          open: 'باز کردن فیلترها',
          occasion: 'مناسبت',
          all: 'همه مناسبت‌ها',
          birthday: 'تولد',
          date: 'تاریخ تحویل',
          hint: 'یک روز موجود انتخاب کنید.',
          any: 'هر روز',
          unavailable: 'امروز ناموجود',
          tomorrow: 'فردا',
          price: 'بازه قیمت',
          stock: 'فقط موجودها',
          show: 'نمایش نتایج',
          clear: 'پاک کردن فیلترها'
        }
      : {
          title: 'Shop filters',
          open: 'Open filters',
          occasion: 'Occasion',
          all: 'Any occasion',
          birthday: 'Birthday',
          date: 'Delivery date',
          hint: 'Choose an available day.',
          any: 'Any day',
          unavailable: 'Today unavailable',
          tomorrow: 'Tomorrow',
          price: 'Price range',
          stock: 'In stock only',
          show: 'Show results',
          clear: 'Clear filters'
        };
  const formatted = value =>
    new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US').format(value) + ' T';
  test('sidebar occasion and stock callbacks are controlled (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontShopSidebarFilters', lang);
    const scope = page.locator('main');
    const group = scope.getByRole('group', {name: t.occasion, exact: true});
    const all = group.getByRole('button', {name: t.all, exact: true});
    const birthday = group.getByRole('button', {name: t.birthday, exact: true});
    await expect(all).toHaveAttribute('aria-pressed', 'true');
    await birthday.focus();
    await page.keyboard.press('Enter');
    await expect(birthday).toHaveAttribute('aria-pressed', 'true');
    await expect(all).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('[data-test=action]')).toHaveText('occasion:birthday');
    const stock = scope.getByRole('switch', {name: t.stock});
    await expect(stock).not.toBeChecked();
    await stock.focus();
    await page.keyboard.press('Space');
    await expect(stock).toBeChecked();
    await expect(page.locator('[data-test=action]')).toHaveText('stock:true');
    await all.click();
    await expect(page.locator('[data-test=state]')).toHaveText(
      JSON.stringify({occasion: 'all', date: 'any', price: [20, 80], stock: true})
    );
    expect(await scanAxe(page)).toEqual([]);
  });
  test('sidebar delivery options and disabled date (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontShopSidebarFilters', lang);
    const trigger = page.locator('#vf-shop-date');
    await expect(trigger).toHaveAccessibleName(new RegExp(t.date));
    await expect(trigger).toHaveAccessibleDescription(t.hint);
    await expect(trigger).toHaveText(t.any);
    await trigger.focus();
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('option', {name: t.unavailable, exact: true})).toHaveAttribute(
      'aria-disabled',
      'true'
    );
    await page.keyboard.press('End');
    await page.keyboard.press('Enter');
    await expect(trigger).toHaveText(t.tomorrow);
    await expect(trigger).toBeFocused();
    await expect(page.locator('[data-test=action]')).toHaveText('date:tomorrow');
    await expect(page.locator('[data-test=state]')).toHaveText(
      JSON.stringify({occasion: 'all', date: 'tomorrow', price: [20, 80], stock: false})
    );
    expect(await scanAxe(page)).toEqual([]);
  });
  test(
    'sidebar price descriptors, step bounds and compact containment (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 700});
      await openStorefrontComponent(page, 'StorefrontShopSidebarFilters', lang);
      const scope = page.locator('main');
      await expect(scope.locator('#vf-price-label')).toHaveText(t.price);
      const sliders = scope.getByRole('slider');
      await expect(sliders).toHaveCount(2);
      const low = sliders.nth(0),
        high = sliders.nth(1);
      await expect(low).toHaveAccessibleName(new RegExp(t.price));
      await expect(high).toHaveAccessibleName(new RegExp(t.price));
      await expect(low).toHaveAttribute('aria-valuetext', formatted(20));
      await expect(high).toHaveAttribute('aria-valuetext', formatted(80));
      await low.focus();
      await page.keyboard.press(lang === 'fa' ? 'ArrowLeft' : 'ArrowRight');
      await expect(page.locator('[data-test=action]')).toHaveText('price:30-80');
      await expect(low).toHaveAttribute('aria-valuetext', formatted(30));
      await page.keyboard.press('End');
      await expect(low).toHaveAttribute('aria-valuetext', formatted(70));
      await high.focus();
      await page.keyboard.press('End');
      await expect(high).toHaveAttribute('aria-valuetext', formatted(100));
      await expect(page.locator('[data-test=state]')).toHaveText(
        JSON.stringify({occasion: 'all', date: 'any', price: [70, 100], stock: false})
      );
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      expect(await scanAxe(page)).toEqual([]);
    }
  );
}
