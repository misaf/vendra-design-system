import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../../e2e/component-test.mjs';
const ids = ['VF-7K2M4Q', 'VF-8P3N5R', 'VF-9A4B6C', 'VF-2D5E7F'];
for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          sub: 'گل‌های فصل',
          price: '۴۹۰٬۰۰۰ تومان',
          badge: 'تازه رسیده',
          photo: 'عکس محصول',
          unsave: 'حذف طرح ذخیره‌شده',
          add: 'افزودن به سبد',
          size: 'انتخاب اندازه',
          unavailable: 'ناموجود'
        }
      : {
          sub: 'Seasonal flowers',
          price: '490,000 toman',
          badge: 'New arrival',
          photo: 'Product photo',
          unsave: 'Remove saved design',
          add: 'Add to bag',
          size: 'Choose a size',
          unavailable: 'Unavailable'
        };
  test(
    'saved result cards forward ordered product content and destinations (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontSavedResults', lang);
      const cards = page.locator('.vf-saved-card');
      await expect(cards).toHaveCount(4);
      for (const [index, id] of ids.entries()) {
        const card = cards.nth(index);
        await expect(card.getByRole('heading', {level: 3})).toHaveText(id);
        await expect(card).toContainText(t.sub);
        await expect(card).toContainText(t.price);
        await expect(
          card.getByRole('link', {name: id + ' — ' + t.price, exact: true})
        ).toHaveAttribute('href', '#' + id);
        await expect(card.getByRole('button', {name: t.unsave})).toHaveAttribute(
          'aria-pressed',
          'true'
        );
        await expect(card.locator('.ag-product__media--soft')).toHaveCount(1);
      }
      await expect(cards.nth(0).getByText(t.badge, {exact: true})).toBeVisible();
      await expect(cards.nth(0).getByRole('img', {name: ids[0]})).toHaveAttribute(
        'src',
        '/assets/categories/bouquets.webp'
      );
      await expect(cards.nth(1).getByText(t.photo, {exact: true})).toBeVisible();
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'saved result bag actions distinguish add, choose-size, unavailable and absent (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontSavedResults', lang);
      const cards = page.locator('.vf-saved-card');
      const add = cards.nth(0).getByRole('button', {name: t.add + ' ' + ids[0], exact: true});
      await expect(add).toHaveText(t.add);
      await add.focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-test=action]')).toHaveText('add:' + ids[0]);
      const size = cards.nth(1).getByRole('link', {name: t.size + ' ' + ids[1], exact: true});
      await expect(size).toHaveText(t.size);
      await expect(size).toHaveAttribute('href', '#' + ids[1] + '-size');
      await size.focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/#VF-8P3N5R-size$/);
      await expect(page.locator('[data-test=action]')).toHaveText('add:' + ids[0]);
      const unavailable = cards.nth(2).getByRole('button', {name: t.unavailable, exact: true});
      await expect(unavailable).toBeDisabled();
      await unavailable.click({force: true});
      await expect(page.locator('[data-test=action]')).toHaveText('add:' + ids[0]);
      await expect(cards.nth(3).locator('.vf-saved-bag-action')).toHaveCount(0);
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'saved result removal callbacks stay isolated through final item (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontSavedResults', lang);
      for (const id of [ids[1], ids[0], ids[3], ids[2]]) {
        const card = page
          .locator('.vf-saved-card')
          .filter({has: page.getByRole('link', {name: id + ' — ' + t.price, exact: true})});
        const remove = card.getByRole('button', {name: t.unsave});
        await remove.focus();
        await page.keyboard.press('Enter');
        await expect(page.locator('[data-test=action]')).toHaveText('remove:' + id);
        await expect(page.getByRole('link', {name: id + ' — ' + t.price, exact: true})).toHaveCount(
          0
        );
        expect(new URL(page.url()).hash).toBe('');
      }
      await expect(page.locator('.vf-saved-card')).toHaveCount(0);
      await expect(page.locator('.vf-saved-bag-action')).toHaveCount(0);
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'saved result compact product navigation and supplied empty list (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      await openStorefrontComponent(page, 'StorefrontSavedResults', lang);
      const product = page.getByRole('link', {name: ids[0] + ' — ' + t.price, exact: true});
      await product.focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/#VF-7K2M4Q$/);
      await expect(page.locator('[data-test=action]')).toHaveText('');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Empty products'}).check();
      await expect(page.locator('.vf-saved-card')).toHaveCount(0);
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Empty products'}).uncheck();
      await expect(page.locator('.vf-saved-card')).toHaveCount(4);
    }
  );
}
