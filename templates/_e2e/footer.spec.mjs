import {test, expect} from '@playwright/test';
import {openSite, openFooterGroup, scanAxe} from './helpers.mjs';

for (const lang of ['en', 'fa']) {
  for (const width of [390, 768, 1280, 1920]) {
    test.describe(`footer ${lang} ${width}`, () => {
      test.use({viewport: {width, height: 900}, hasTouch: width < 1024});
      test('compact navigation keeps contact details and every link accessible', async ({page}) => {
        const fa = lang === 'fa';
        const shop = fa ? 'فروشگاه' : 'Shop';
        const studio = fa ? 'استودیو' : 'The studio';
        const help = fa ? 'راهنما' : 'Help';
        await openSite(page, 'search', lang, width === 1920 ? {tv: '1'} : {});
        const footer = page.getByRole('contentinfo');
        await expect(footer.locator('.vf-shell-footer-details')).toBeVisible();
        await expect(
          footer.getByRole('link', {name: fa ? 'مسیریابی' : 'Get directions'})
        ).toBeVisible();
        await expect(footer.locator('a[href^="tel:"]')).toHaveCount(2);
        await expect(footer.locator('.vf-shell-footer-seals')).toBeVisible();
        if (width === 390) {
          await expect(footer.getByRole('navigation')).toHaveCount(0);
          const shopButton = footer.getByRole('button', {name: shop, exact: true});
          const helpButton = footer.getByRole('button', {name: help, exact: true});
          for (const button of await footer.locator('.ag-acc__btn').all()) {
            await expect(button).toHaveAttribute('aria-expanded', 'false');
            expect((await button.boundingBox()).height).toBeGreaterThanOrEqual(44);
          }
          await shopButton.focus();
          await shopButton.press('Enter');
          await expect(shopButton).toHaveAttribute('aria-expanded', 'true');
          await expect(footer.getByRole('navigation', {name: shop, exact: true})).toBeVisible();
          await helpButton.focus();
          await helpButton.press('Space');
          await expect(helpButton).toHaveAttribute('aria-expanded', 'true');
          await expect(shopButton).toHaveAttribute('aria-expanded', 'true');
          const settings = footer.getByRole('button', {
            name: fa ? 'تنظیمات کوکی' : 'Cookie settings'
          });
          await settings.click();
          const privacy = page.getByRole('region', {name: fa ? 'حریم خصوصی شما' : 'Your privacy'});
          await expect(privacy).toBeFocused();
          await privacy.getByRole('button', {name: fa ? 'فقط ضروری' : 'Essential only'}).click();
          await expect(settings).toBeFocused();
          for (const link of await footer.locator('.vf-shell-footer-compact nav a:visible').all())
            expect((await link.boundingBox()).height).toBeGreaterThanOrEqual(44);
          expect(await scanAxe(page)).toEqual([]);
          await shopButton.press('Enter');
          await expect(shopButton).toHaveAttribute('aria-expanded', 'false');
          await shopButton.press('Tab');
          await expect(footer.getByRole('button', {name: studio, exact: true})).toBeFocused();
          await page.setViewportSize({width: 768, height: 1024});
          await expect(footer.locator('.vf-shell-footer-compact')).toBeHidden();
          await expect(footer.getByRole('navigation', {name: shop, exact: true})).toBeVisible();
          await page.setViewportSize({width: 390, height: 900});
          await expect(shopButton).toHaveAttribute('aria-expanded', 'false');
          await expect(helpButton).toHaveAttribute('aria-expanded', 'true');
          await helpButton.click();
        } else {
          await expect(footer.locator('.vf-shell-footer-compact')).toBeHidden();
          for (const name of [shop, studio, help])
            await expect(footer.getByRole('navigation', {name, exact: true})).toBeVisible();
          if (width === 1920) expect(await scanAxe(page)).toEqual([]);
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(
          0
        );
        await footer.screenshot({path: `/tmp/vendra-footer-${lang}-${width}.png`});
        const navigation = await openFooterGroup(page, shop);
        await navigation.getByRole('link', {name: fa ? 'ارکیده' : 'Orchids', exact: true}).click();
        await expect(page).toHaveURL(/view=shop&cat=orchids/);
      });
    });
  }
}
