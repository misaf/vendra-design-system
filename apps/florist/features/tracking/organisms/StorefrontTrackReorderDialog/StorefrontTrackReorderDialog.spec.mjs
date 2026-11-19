import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';

for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          open: 'بررسی سفارش دوباره',
          title: 'تکرار این سفارش',
          cancel: 'لغو بررسی',
          confirm: 'تأیید سفارش دوباره',
          legend: 'سبد فعلی',
          add: 'افزودن به سبد',
          addHint: 'کالاهای فعلی حفظ می‌شوند.',
          replace: 'جایگزینی سبد',
          replaceHint: 'کالاهای فعلی حذف می‌شوند.',
          intro: 'کالاهای موجود به سبد جدید اضافه می‌شوند.',
          changes: ['قیمت VF-7K2M4Q تغییر کرده است.', 'VF-8P3N5R موجود نیست.'],
          empty: 'هیچ کالایی برای سفارش دوباره موجود نیست.'
        }
      : {
          open: 'Review repeat order',
          title: 'Repeat this order',
          cancel: 'Cancel review',
          confirm: 'Confirm repeat order',
          legend: 'Existing bag',
          add: 'Add to bag',
          addHint: 'Keep the current items.',
          replace: 'Replace bag',
          replaceHint: 'Remove the current items.',
          intro: 'The available items will start a new bag.',
          changes: ['VF-7K2M4Q has a new price.', 'VF-8P3N5R is unavailable.'],
          empty: 'No items can be ordered again.'
        };
  test(
    'reorder controlled choice, ordered warnings and confirm callback (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontTrackReorderDialog', lang);
      await expect(page.getByRole('dialog')).toHaveCount(0);
      await page.getByRole('button', {name: t.open}).click();
      const dialog = page.getByRole('dialog', {name: t.title});
      await expect(dialog).toBeVisible();
      const group = dialog.getByRole('radiogroup', {name: t.legend});
      const add = group.getByRole('radio', {name: t.add, exact: true});
      const replace = group.getByRole('radio', {name: t.replace, exact: true});
      await expect(add).toBeChecked();
      await expect(add).toHaveAccessibleDescription(t.addHint);
      await expect(replace).toHaveAccessibleDescription(t.replaceHint);
      await expect(dialog.locator('li')).toHaveText(t.changes);
      await expect(dialog.getByText(t.intro, {exact: true})).toHaveCount(0);
      await expect(dialog.getByText(t.empty, {exact: true})).toHaveCount(0);
      await add.focus();
      await page.keyboard.press('ArrowDown');
      await expect(replace).toBeChecked();
      await expect(page.locator('[data-test=mode]')).toHaveText('replace');
      const confirm = dialog.getByRole('button', {name: t.confirm});
      await confirm.focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-test=confirmed]')).toHaveText('replace');
      await expect(page.locator('[data-test=confirm-count]')).toHaveText('1');
      await dialog.getByText(t.add, {exact: true}).click();
      await expect(add).toBeChecked();
      await confirm.click();
      await expect(page.locator('[data-test=confirmed]')).toHaveText('add');
      await expect(page.locator('[data-test=confirm-count]')).toHaveText('2');
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'reorder without existing bag or changes uses supplied intro (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      await openStorefrontComponent(page, 'StorefrontTrackReorderDialog', lang);
      await page.getByRole('checkbox', {name: 'Existing bag', exact: true}).uncheck();
      await page.getByRole('checkbox', {name: 'Changed items'}).uncheck();
      await page.getByRole('button', {name: t.open}).click();
      const dialog = page.getByRole('dialog', {name: t.title});
      await expect(dialog.getByRole('radiogroup')).toHaveCount(0);
      await expect(dialog.getByRole('list')).toHaveCount(0);
      await expect(dialog.getByText(t.intro, {exact: true})).toBeVisible();
      await dialog.getByRole('button', {name: t.confirm}).click();
      await expect(page.locator('[data-test=confirm-count]')).toHaveText('1');
      expect(await dialog.evaluate(el => el.getBoundingClientRect().width <= innerWidth)).toBe(
        true
      );
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'reorder unavailable message and disabled confirm remain independent (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontTrackReorderDialog', lang);
      await page.getByRole('checkbox', {name: 'Unavailable order'}).check();
      await page.getByRole('checkbox', {name: 'Disable confirmation'}).check();
      await page.getByRole('button', {name: t.open}).click();
      const dialog = page.getByRole('dialog', {name: t.title});
      const confirm = dialog.getByRole('button', {name: t.confirm});
      await expect(confirm).toBeDisabled();
      await expect(dialog.getByText(t.empty, {exact: true})).toBeVisible();
      await expect(dialog.locator('li')).toHaveText(t.changes);
      await confirm.click({force: true});
      await expect(page.locator('[data-test=confirm-count]')).toHaveText('0');
      expect(await scanAxe(page)).toEqual([]);
      await dialog.getByRole('button', {name: t.cancel}).click();
      await page.getByRole('checkbox', {name: 'Unavailable order'}).uncheck();
      await page.getByRole('button', {name: t.open}).click();
      await expect(dialog.getByText(t.empty, {exact: true})).toHaveCount(0);
      await expect(confirm).toBeDisabled();
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'reorder cancel, Escape and close return focus without confirming (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontTrackReorderDialog', lang);
      const opener = page.getByRole('button', {name: t.open});
      const dialog = page.getByRole('dialog', {name: t.title});
      for (const method of ['cancel', 'escape', 'close']) {
        await opener.click();
        await expect
          .poll(() => dialog.evaluate(el => el.contains(document.activeElement)))
          .toBe(true);
        if (method === 'cancel') await dialog.getByRole('button', {name: t.cancel}).click();
        else if (method === 'escape') await page.keyboard.press('Escape');
        else
          await dialog
            .getByRole('button', {name: lang === 'fa' ? 'بستن' : 'Close', exact: true})
            .click();
        await expect(dialog).toHaveCount(0);
        await expect(opener).toBeFocused();
      }
      await expect(page.locator('[data-test=closed]')).toHaveText('3');
      await expect(page.locator('[data-test=confirm-count]')).toHaveText('0');
    }
  );
}
