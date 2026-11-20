import {expect, test} from '@playwright/test';
import {scanAxe} from './helpers.mjs';

test('shared controls work in both directions and tenant themes', async ({page}) => {
  const accents = new Set();
  for (const tenant of ['clay', 'fern']) {
    for (const lang of ['en', 'fa']) {
      const fa = lang === 'fa';
      await page.goto(`/guidelines/ui-gallery.html?tenant=${tenant}&lang=${lang}`);
      const root = page.locator('html');
      await expect(root).toHaveAttribute('dir', fa ? 'rtl' : 'ltr');
      await expect(root).toHaveAttribute('lang', lang);
      await expect(root).toHaveAttribute('data-tenant', tenant);

      const input = page.getByRole('textbox', {name: fa ? 'نام گیرنده' : 'Recipient name'});
      await expect(input).toHaveAttribute('name', 'recipient');
      await expect(input).toHaveAttribute('autocomplete', 'name');
      await input.fill(fa ? 'سارا' : 'Sara');
      await expect(input).toHaveValue(fa ? 'سارا' : 'Sara');

      const date = page.getByRole('button', {name: fa ? 'انتخاب از تقویم' : 'Choose a date'});
      await date.focus();
      await page.keyboard.press('Enter');
      const grid = page.getByRole('grid');
      await expect(grid).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(grid).toBeHidden();

      const title = fa ? 'جزئیات تحویل' : 'Delivery details';
      const opener = page.getByRole('button', {name: title});
      await expect(opener).toHaveAttribute('aria-haspopup', 'dialog');
      accents.add(await opener.evaluate(button => getComputedStyle(button).backgroundColor));
      await opener.focus();
      await page.keyboard.press('Enter');
      const dialog = page.getByRole('dialog', {name: title});
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole('button', {name: fa ? 'بستن' : 'Close'})).toBeVisible();
      await expect
        .poll(() => dialog.evaluate(el => el.contains(document.activeElement)))
        .toBe(true);
      expect(await scanAxe(page), `${tenant}, ${lang}, open dialog`).toEqual([]);
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
      await expect(opener).toBeFocused();
      expect(await scanAxe(page), `${tenant}, ${lang}, gallery`).toEqual([]);
    }
  }
  expect(accents.size).toBe(2);
});
