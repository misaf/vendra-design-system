import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          message: 'VF-7K2M4Q از طرح‌های ذخیره‌شده حذف شد.',
          other: 'VF-8P3N5R از طرح‌های ذخیره‌شده حذف شد.',
          undo: 'بازگرداندن طرح',
          otherUndo: 'بازگرداندن آخرین طرح'
        }
      : {
          message: 'VF-7K2M4Q was removed from saved designs.',
          other: 'VF-8P3N5R was removed from saved designs.',
          undo: 'Restore design',
          otherUndo: 'Restore latest design'
        };
  test(
    'removal notice announces message and forwards pointer/keyboard Undo (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontSavedRemovalNotice', lang);
      const status = page.getByRole('status');
      await expect(status).toHaveCount(1);
      await expect(status).toContainText(t.message);
      const undo = status.getByRole('button', {name: t.undo, exact: true});
      await expect(undo).toHaveAttribute('id', 'vf-saved-undo');
      await expect(undo).toHaveAttribute('data-vf-keep-focus', 'true');
      await undo.focus();
      await expect(undo).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-test=count]')).toHaveText('1');
      await expect(page.locator('[data-test=restored]')).toHaveText('VF-7K2M4Q');
      await undo.click();
      await expect(page.locator('[data-test=count]')).toHaveText('2');
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'removal notice rerenders supplied message and latest Undo callback (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontSavedRemovalNotice', lang);
      await page.getByRole('checkbox', {name: 'Latest removed design'}).check();
      await expect(page.getByRole('status')).toContainText(t.other);
      await expect(page.getByText(t.message, {exact: true})).toHaveCount(0);
      await expect(page.getByRole('button', {name: t.undo, exact: true})).toHaveCount(0);
      await expect(page.locator('[data-test=count]')).toHaveText('0');
      const undo = page.getByRole('button', {name: t.otherUndo, exact: true});
      await expect(undo).toHaveAttribute('id', 'vf-saved-undo');
      await undo.focus();
      await page.keyboard.press('Space');
      await expect(page.locator('[data-test=count]')).toHaveText('1');
      await expect(page.locator('[data-test=restored]')).toHaveText('VF-8P3N5R');
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'removal notice compact containment and owner-controlled visibility (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      await openStorefrontComponent(page, 'StorefrontSavedRemovalNotice', lang);
      await expect(page.getByRole('button', {name: t.undo, exact: true})).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Show removal notice'}).uncheck();
      await expect(page.getByRole('status')).toHaveCount(0);
      await expect(page.locator('#vf-saved-undo')).toHaveCount(0);
      await expect(page.locator('[data-test=count]')).toHaveText('0');
      await page.getByRole('checkbox', {name: 'Show removal notice'}).check();
      await expect(page.getByRole('status')).toContainText(t.message);
      await expect(page.locator('#vf-saved-undo')).toHaveCount(1);
      expect(await scanAxe(page)).toEqual([]);
    }
  );
}
