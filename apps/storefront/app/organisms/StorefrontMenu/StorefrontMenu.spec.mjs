import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../e2e/component-test.mjs';

for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          brand: 'وندرا',
          title: 'منوی اصلی',
          menu: 'باز کردن منو',
          close: 'بستن منو',
          nav: 'پیمایش اصلی',
          shop: 'فروشگاه',
          journal: 'مجله',
          search: 'جستجو',
          account: 'حساب',
          bag: 'سبد',
          language: 'زبان',
          whatsapp: 'سفارش در واتساپ'
        }
      : {
          brand: 'Vendra',
          title: 'Main menu',
          menu: 'Open menu',
          close: 'Close menu',
          nav: 'Main navigation',
          shop: 'Shop',
          journal: 'Journal',
          search: 'Search',
          account: 'Account',
          bag: 'Bag',
          language: 'Language',
          whatsapp: 'Order on WhatsApp'
        };

  test(
    'menu named navigation, order, current route and external action (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      await openStorefrontComponent(page, 'StorefrontMenu', lang);
      await expect(page.getByRole('dialog')).toHaveCount(0);
      await page.getByRole('button', {name: t.menu, exact: true}).click();
      const dialog = page.getByRole('dialog', {name: t.title, exact: true});
      const nav = dialog.getByRole('navigation', {name: t.nav, exact: true});
      await expect(nav.getByRole('link')).toHaveText([t.shop, t.journal]);
      await expect(nav.getByRole('link', {name: t.shop, exact: true})).toHaveAttribute(
        'aria-current',
        'page'
      );
      await expect(nav.getByRole('link', {name: t.journal, exact: true})).not.toHaveAttribute(
        'aria-current'
      );
      const whatsapp = dialog.getByRole('link', {name: t.whatsapp, exact: true});
      await expect(whatsapp).toHaveAttribute('href', 'https://wa.me/989120000000');
      await expect(whatsapp).toHaveAttribute('target', '_blank');
      await expect(whatsapp).toHaveAttribute('rel', 'noopener noreferrer');
      expect(await scanAxe(page)).toEqual([]);
      expect(
        await dialog.evaluate(element => {
          const r = element.getBoundingClientRect();
          return r.left >= 0 && r.right <= innerWidth;
        })
      ).toBe(true);
    }
  );

  test(
    'menu current and other links close exactly once with pointer and keyboard (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontMenu', lang);
      let count = 0;
      for (const [label, hash, method] of [
        [t.shop, 'shop', 'click'],
        [t.shop, 'shop', 'Enter'],
        [t.journal, 'journal', 'click'],
        [t.journal, 'journal', 'Enter']
      ]) {
        await page.getByRole('button', {name: t.menu, exact: true}).click();
        const link = page.getByRole('dialog').getByRole('link', {name: label, exact: true});
        await expect(link).toHaveAttribute('href', '#' + hash);
        if (method === 'click') await link.click();
        else {
          await link.focus();
          await page.keyboard.press('Enter');
        }
        await expect(page.getByRole('dialog')).toHaveCount(0);
        await expect(page.locator('[data-test=closed]')).toHaveText(String(++count));
        await expect(page).toHaveURL(new RegExp('#' + hash + '$'));
      }
      await expect(page.locator('[data-test=changes]')).toHaveText('0');
    }
  );

  test(
    'menu traps keyboard focus and restores its trigger after dismissal (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      await openStorefrontComponent(page, 'StorefrontMenu', lang);
      const trigger = page.getByRole('button', {name: t.menu, exact: true});
      for (const method of ['Escape', 'close', 'outside']) {
        await trigger.click();
        const dialog = page.getByRole('dialog', {name: t.title, exact: true});
        const close = dialog.getByRole('button', {name: t.close, exact: true});
        await close.focus();
        const controlCount = await dialog.locator('button, a[href]').count();
        for (let index = 0; index < controlCount + 1; index++) {
          await page.keyboard.press('Tab');
          expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(
            true
          );
        }
        await close.focus();
        await page.keyboard.press('Shift+Tab');
        expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(
          true
        );
        if (method === 'Escape') await page.keyboard.press('Escape');
        else if (method === 'close') await close.click();
        else {
          // The sheet slides in from the logical start; measure its settled edge.
          await page.evaluate(() =>
            Promise.all(
              document.getAnimations().map(animation => animation.finished.catch(() => {}))
            )
          );
          const box = await page.locator('.ag-dialog--sheet').boundingBox();
          await page.mouse.click(lang === 'en' ? box.x + box.width + 10 : box.x - 10, 20);
        }
        await expect(dialog).toHaveCount(0);
        await expect(trigger).toBeFocused();
      }
      await expect(page.locator('[data-test=closed]')).toHaveText('3');
    }
  );

  test(
    'menu language changes retain the open drawer and selection (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontMenu', lang);
      await page.getByRole('button', {name: t.menu, exact: true}).click();
      const dialog = page.getByRole('dialog');
      const group = dialog.getByRole('group', {name: t.language, exact: true});
      const alternative = group.getByRole('button', {
        name: lang === 'en' ? 'فا' : 'EN',
        exact: true
      });
      await alternative.focus();
      await page.keyboard.press('Space');
      await expect(alternative).toHaveAttribute('aria-pressed', 'true');
      await expect(page.locator('[data-test=changed]')).toHaveText(lang === 'en' ? 'fa' : 'en');
      await expect(page.locator('[data-test=changes]')).toHaveText('1');
      await expect(dialog).toBeVisible();
      await expect(page.locator('[data-test=closed]')).toHaveText('0');
      expect(await scanAxe(page)).toEqual([]);
      await page.keyboard.press('Escape');
      await page.getByRole('button', {name: t.menu, exact: true}).click();
      await expect(alternative).toHaveAttribute('aria-pressed', 'true');
    }
  );

  test(
    'menu optional language, WhatsApp and empty navigation are independent (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 768, height: 900});
      await openStorefrontComponent(page, 'StorefrontMenu', lang);
      const trigger = page.getByRole('button', {name: t.menu, exact: true});
      await page.getByRole('checkbox', {name: 'Show language', exact: true}).uncheck();
      await trigger.click();
      const dialog = page.getByRole('dialog');
      await expect(dialog.getByRole('group')).toHaveCount(0);
      await expect(dialog.getByRole('link', {name: t.whatsapp, exact: true})).toBeVisible();
      expect(await scanAxe(page)).toEqual([]);
      await page.keyboard.press('Escape');
      await page.getByRole('checkbox', {name: 'Show language', exact: true}).check();
      await page.getByRole('checkbox', {name: 'Show WhatsApp', exact: true}).uncheck();
      await trigger.click();
      await expect(dialog.getByRole('group', {name: t.language, exact: true})).toBeVisible();
      await expect(dialog.getByRole('link', {name: t.whatsapp, exact: true})).toHaveCount(0);
      expect(await scanAxe(page)).toEqual([]);
      await page.keyboard.press('Escape');
      await page.getByRole('checkbox', {name: 'Show language', exact: true}).uncheck();
      await page.getByRole('checkbox', {name: 'Empty navigation', exact: true}).check();
      await trigger.click();
      await expect(dialog.getByRole('navigation', {name: t.nav, exact: true})).toBeAttached();
      await expect(dialog.getByRole('link')).toHaveCount(0);
      expect(await scanAxe(page)).toEqual([]);
    }
  );
}
