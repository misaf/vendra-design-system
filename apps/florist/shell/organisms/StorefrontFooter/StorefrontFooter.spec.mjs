import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          brand: 'وندرا',
          tagline: 'گل برای هر روز.',
          social: 'شبکه‌های اجتماعی',
          shop: 'فروشگاه',
          help: 'راهنما',
          bouquets: 'دسته‌گل',
          orchids: 'ارکیده',
          policy: 'سیاست حریم خصوصی',
          cookies: 'تنظیمات کوکی',
          address: 'کرج، خیابان باغ، پلاک ۱۲',
          find: 'ورودی کنار باغ است.',
          directions: 'مسیریابی',
          hours: 'هر روز، ۹ تا ۱۸',
          copyright: '© وندرا'
        }
      : {
          brand: 'Vendra',
          tagline: 'Flowers for the everyday.',
          social: 'Social links',
          shop: 'Shop',
          help: 'Help',
          bouquets: 'Bouquets',
          orchids: 'Orchids',
          policy: 'Privacy policy',
          cookies: 'Cookie settings',
          address: '12 Garden Street, Karaj',
          find: 'Entrance beside the garden.',
          directions: 'Get directions',
          hours: 'Daily, 9–18',
          copyright: '© Vendra'
        };
  test(
    'footer supplied content, navigation and native destinations (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 1440, height: 1000});
      await openStorefrontComponent(page, 'StorefrontFooter', lang);
      const footer = page.getByRole('contentinfo');
      for (const text of [t.tagline, t.address, t.find, t.hours, t.copyright])
        await expect(footer.getByText(text, {exact: true})).toBeVisible();
      const shop = footer.getByRole('navigation', {name: t.shop, exact: true});
      await expect(shop.getByRole('link')).toHaveText([t.bouquets, t.orchids]);
      await expect(shop.getByRole('link', {name: t.bouquets, exact: true})).toHaveAttribute(
        'aria-current',
        'page'
      );
      await expect(shop.getByRole('link', {name: t.orchids, exact: true})).not.toHaveAttribute(
        'aria-current'
      );
      for (const [name, hash] of [
        [t.brand, 'home'],
        [t.bouquets, 'bouquets'],
        [t.orchids, 'orchids'],
        [t.policy, 'privacy']
      ]) {
        const link = footer.getByRole('link', {name, exact: true});
        await expect(link).toHaveAttribute('href', '#' + hash);
        await link.focus();
        await page.keyboard.press('Enter');
        await expect(page).toHaveURL(new RegExp('#' + hash + '$'));
      }
      const settings = footer.getByRole('button', {name: t.cookies, exact: true});
      await expect(settings).toHaveAttribute('id', 'vf-consent-settings');
      await settings.click();
      await settings.focus();
      await page.keyboard.press('Enter');
      await page.keyboard.press('Space');
      await expect(page.locator('[data-test=opened]')).toHaveText('3');
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'footer social, directions, contact, credit and trust descriptors (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 1440, height: 1000});
      await openStorefrontComponent(page, 'StorefrontFooter', lang);
      const footer = page.getByRole('contentinfo');
      const socials = footer.getByRole('list', {name: t.social, exact: true}).getByRole('link');
      await expect(socials).toHaveCount(2);
      for (const [index, name, href] of [
        [0, 'Instagram', 'https://instagram.com/'],
        [1, 'WhatsApp', 'https://wa.me/989120000000']
      ]) {
        await expect(socials.nth(index)).toHaveAccessibleName(name);
        await expect(socials.nth(index)).toHaveAttribute('href', href);
        await expect(socials.nth(index)).toHaveAttribute('target', '_blank');
        await expect(socials.nth(index)).toHaveAttribute('rel', 'noopener noreferrer');
      }
      const directions = footer
        .getByRole('list', {name: t.directions, exact: true})
        .getByRole('link');
      await expect(directions).toHaveText(
        lang === 'fa' ? ['Neshan', 'Balad', 'Maps'] : ['Maps', 'Balad', 'Neshan']
      );
      for (const link of await directions.all()) {
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      }
      const phone = footer.getByRole('link', {name: '+98 912 000 0000', exact: true});
      await expect(phone).toHaveAttribute('href', 'tel:+989120000000');
      await expect(phone).toHaveAttribute('dir', 'ltr');
      const email = footer.getByRole('link', {name: 'hello@example.com', exact: true});
      await expect(email).toHaveAttribute('href', 'mailto:hello@example.com');
      await expect(email).toHaveAttribute('dir', 'ltr');
      const credit = footer.getByRole('link', {name: 'Studio', exact: true});
      await expect(credit).toHaveAttribute('href', 'https://studio.example.com/');
      await expect(credit).toHaveAttribute('target', '_blank');
      await expect(credit).toHaveAttribute('rel', 'noopener noreferrer');
      const seal = footer.locator('.ag-seal');
      await expect(seal).toHaveAttribute('href', 'https://seal.example.com/');
      await expect(seal).toHaveAttribute('referrerpolicy', 'origin');
      await expect(seal).toHaveAttribute('rel', 'noopener');
      await expect(seal).toHaveAccessibleName(
        lang === 'fa' ? 'نماد اعتماد الکترونیکی' : 'eNamad trust seal'
      );
    }
  );
  test(
    'phone footer disclosures retain independent state and consent target (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 1000});
      await openStorefrontComponent(page, 'StorefrontFooter', lang);
      const footer = page.getByRole('contentinfo');
      await expect(footer.getByRole('navigation')).toHaveCount(0);
      const shop = footer.getByRole('button', {name: t.shop, exact: true});
      const help = footer.getByRole('button', {name: t.help, exact: true});
      await expect(shop).toHaveAttribute('aria-expanded', 'false');
      await shop.focus();
      await page.keyboard.press('Enter');
      await expect(shop).toHaveAttribute('aria-expanded', 'true');
      await help.focus();
      await page.keyboard.press('Space');
      await expect(help).toHaveAttribute('aria-expanded', 'true');
      await expect(shop).toHaveAttribute('aria-expanded', 'true');
      await expect(
        footer.getByRole('navigation', {name: t.shop, exact: true}).getByRole('link')
      ).toHaveText([t.bouquets, t.orchids]);
      const settings = footer.getByRole('button', {name: t.cookies, exact: true});
      await expect(settings).toHaveAttribute('id', 'vf-consent-settings-mobile');
      await settings.focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-test=opened]')).toHaveText('1');
      expect(await scanAxe(page)).toEqual([]);
      await shop.click();
      await expect(shop).toHaveAttribute('aria-expanded', 'false');
      await expect(help).toHaveAttribute('aria-expanded', 'true');
      await page.setViewportSize({width: 768, height: 1000});
      await expect(footer.getByRole('navigation', {name: t.shop, exact: true})).toBeVisible();
      await expect(footer.getByRole('button', {name: t.cookies, exact: true})).toHaveAttribute(
        'id',
        'vf-consent-settings'
      );
      await page.setViewportSize({width: 390, height: 1000});
      await expect(shop).toHaveAttribute('aria-expanded', 'false');
      await expect(help).toHaveAttribute('aria-expanded', 'true');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
    }
  );
  test(
    'footer optional content and empty collections preserve core details (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontFooter', lang);
      const footer = page.getByRole('contentinfo');
      await page.getByRole('checkbox', {name: 'Show optional content', exact: true}).uncheck();
      for (const text of [t.find, 'hello@example.com', 'Studio'])
        await expect(footer.getByText(text, {exact: true})).toHaveCount(0);
      await expect(footer.getByRole('list', {name: t.directions, exact: true})).toHaveCount(0);
      await expect(footer.locator('.ag-seal')).toHaveCount(0);
      await expect(
        footer.getByRole('list', {name: t.social, exact: true}).getByRole('link')
      ).toHaveCount(2);
      await page.getByRole('checkbox', {name: 'Empty collections', exact: true}).check();
      for (const width of [390, 768, 1440]) {
        await page.setViewportSize({width, height: 1000});
        await expect(footer.getByRole('navigation')).toHaveCount(0);
        await expect(footer.getByRole('button', {name: t.cookies, exact: true})).toHaveCount(0);
        await expect(
          footer.getByRole('list', {name: t.social, exact: true}).getByRole('link')
        ).toHaveCount(0);
        await expect(footer.getByText(t.address, {exact: true})).toBeVisible();
        await expect(
          footer.getByRole('link', {name: '+98 912 000 0000', exact: true})
        ).toBeVisible();
        expect(await scanAxe(page)).toEqual([]);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
          true
        );
      }
    }
  );
  test('footer supplied dark logo and responsive accessibility (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontFooter', lang);
    await page.getByRole('checkbox', {name: 'Show brand image', exact: true}).check();
    const footer = page.getByRole('contentinfo');
    const brand = footer.getByRole('link', {
      name: lang === 'fa' ? 'نشان وندرا روی تیره' : 'Vendra on dark',
      exact: true
    });
    await expect(brand).toHaveAttribute('href', '#home');
    await expect(brand.getByRole('img')).toHaveAttribute('src', '/assets/categories/bouquets.webp');
    await expect(brand.getByRole('img')).toHaveJSProperty('naturalWidth', 640);
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({width, height: 1000});
      expect(await scanAxe(page)).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
    }
    await page.getByRole('checkbox', {name: 'Show brand image', exact: true}).uncheck();
    await expect(footer.getByRole('link', {name: t.brand, exact: true})).toBeVisible();
  });
}
