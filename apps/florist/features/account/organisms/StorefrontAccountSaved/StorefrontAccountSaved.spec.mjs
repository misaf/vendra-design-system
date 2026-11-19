import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          sub: 'دسته‌گل فصل',
          price: '۴۹۰٬۰۰۰ تومان',
          badge: 'تازه رسیده',
          photo: 'عکس محصول',
          remove: 'حذف گل ذخیره‌شده',
          heading: 'گل‌های محبوب خود را ذخیره کنید',
          body: 'گل‌ها را برای دیدن در آینده انتخاب کنید.',
          browse: 'دیدن گل‌ها'
        }
      : {
          sub: 'Seasonal bouquet',
          price: '490,000 toman',
          badge: 'New arrival',
          photo: 'Product photo',
          remove: 'Remove saved flower',
          heading: 'Save your favorites',
          body: 'Choose flowers to find here later.',
          browse: 'Browse flowers'
        };
  test(
    'saved products forward supplied content, destinations and removal isolation (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontAccountSaved', lang);
      const cards = page.locator('.ag-product');
      await expect(cards).toHaveCount(2);
      for (const [index, id] of [
        [0, 'VF-7K2M4Q'],
        [1, 'VF-8P3N5R']
      ]) {
        await expect(
          cards.nth(index).getByRole('link', {name: id + ' — ' + t.price, exact: true})
        ).toHaveAttribute('href', '#' + id);
        await expect(cards.nth(index)).toContainText(t.sub);
        await expect(cards.nth(index)).toContainText(t.price);
        await expect(cards.nth(index).getByRole('button', {name: t.remove})).toHaveAttribute(
          'aria-pressed',
          'true'
        );
      }
      await expect(cards.nth(0).getByText(t.badge, {exact: true})).toBeVisible();
      await expect(cards.nth(0).getByRole('img', {name: 'VF-7K2M4Q'})).toHaveAttribute(
        'src',
        '/assets/categories/bouquets.webp'
      );
      await expect(cards.nth(1).getByText(t.photo, {exact: true})).toBeVisible();
      await cards.nth(1).getByRole('button', {name: t.remove}).click();
      await expect(page.locator('[data-test=action]')).toHaveText('VF-8P3N5R');
      await expect(cards).toHaveCount(1);
      await expect(cards.first().getByRole('heading', {level: 3})).toHaveText('VF-7K2M4Q');
      expect(new URL(page.url()).hash).toBe('');
      const remove = cards.first().getByRole('button', {name: t.remove});
      await remove.focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-test=action]')).toHaveText('VF-7K2M4Q');
      await expect(cards).toHaveCount(0);
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'saved empty feedback is independent and supplies browse recovery (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontAccountSaved', lang);
      const heading = page.getByRole('heading', {name: t.heading, exact: true});
      await expect(heading).toHaveCount(0);
      await page.getByRole('checkbox', {name: 'Empty feedback'}).check();
      await expect(heading).toBeVisible();
      await expect(page.locator('.ag-product')).toHaveCount(2);
      await page.getByRole('checkbox', {name: 'Show items'}).uncheck();
      await expect(page.locator('.ag-product')).toHaveCount(0);
      await expect(page.getByText(t.body, {exact: true})).toBeVisible();
      const browse = page.getByRole('link', {name: t.browse});
      await expect(browse).toHaveAttribute('href', '#shop');
      await browse.focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/#shop$/);
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Empty feedback'}).uncheck();
      await expect(heading).toHaveCount(0);
      await expect(browse).toHaveCount(0);
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'saved product keyboard navigation and compact containment (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      await openStorefrontComponent(page, 'StorefrontAccountSaved', lang);
      const product = page.getByRole('link', {name: 'VF-7K2M4Q — ' + t.price, exact: true});
      await product.focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/#VF-7K2M4Q$/);
      await expect(page.locator('[data-test=action]')).toHaveText('');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      expect(await scanAxe(page)).toEqual([]);
    }
  );
}
