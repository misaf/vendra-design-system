import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

for (const lang of ['en', 'fa']) {
  for (const width of [390, 768]) {
    test.describe(`compact menu ${lang} ${width}`, () => {
      test.use({viewport: {width, height: 900}, hasTouch: true});

      test('dismissal restores focus, language preserves context, and links navigate', async ({
        page
      }) => {
        const text =
          lang === 'en'
            ? {
                menu: 'Menu',
                close: 'Close menu',
                navigation: 'Main',
                shop: 'Shop',
                language: 'Language',
                whatsapp: 'Order on WhatsApp'
              }
            : {
                menu: 'منو',
                close: 'بستن منو',
                navigation: 'منوی اصلی',
                shop: 'فروشگاه',
                language: 'زبان',
                whatsapp: 'سفارش در واتساپ'
              };
        await openSite(page, 'shop', lang, {cat: 'orchids'});
        const trigger = page
          .locator('.vf-shell-header')
          .getByRole('button', {name: text.menu, exact: true});
        const dialog = page.getByRole('dialog');
        await trigger.tap();
        await expect(dialog).toBeVisible();
        const navigation = dialog.getByRole('navigation', {name: text.navigation, exact: true});
        await expect(navigation.getByRole('link', {name: text.shop, exact: true})).toHaveAttribute(
          'aria-current',
          'page'
        );
        const whatsapp = dialog.getByRole('link', {name: text.whatsapp, exact: true});
        await expect(whatsapp).toHaveAttribute('href', /^https:\/\/wa\.me\//);
        await expect(whatsapp).toHaveAttribute('target', '_blank');
        await expect(whatsapp).toHaveAttribute('rel', 'noopener noreferrer');
        expect(await scanAxe(page)).toEqual([]);
        // Traverse past both ends of the drawer's controls: focus must stay in the modal.
        const controlCount = await dialog.locator('a[href], button').count();
        for (let index = 0; index < controlCount + 2; index++) {
          await page.keyboard.press('Tab');
          expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(
            true
          );
        }
        await page.keyboard.press('Escape');
        await expect(dialog).toHaveCount(0);
        await expect(trigger).toBeFocused();
        await trigger.tap();
        await dialog.getByRole('button', {name: text.close, exact: true}).tap();
        await expect(dialog).toHaveCount(0);
        await expect(trigger).toBeFocused();
        await trigger.tap();
        await navigation.getByRole('link', {name: text.shop, exact: true}).tap();
        await expect(page).toHaveURL(/view=shop/);
        await expect(dialog).toHaveCount(0);
        await openSite(page, 'shop', lang, {cat: 'orchids'});
        await trigger.tap();
        await dialog
          .getByRole('group', {name: text.language, exact: true})
          .getByRole('button', {name: lang === 'en' ? 'فا' : 'EN', exact: true})
          .tap();
        await expect(page.locator('html')).toHaveAttribute('lang', lang === 'en' ? 'fa' : 'en');
        await expect(page).toHaveURL(/cat=orchids/);
        await expect(page).toHaveURL(/view=shop/);
      });
    });
  }
}
