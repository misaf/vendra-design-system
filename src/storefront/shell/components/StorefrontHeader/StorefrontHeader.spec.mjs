import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../e2e/component-test.mjs';

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
          bag: 'سبد، ۳ کالا',
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
          bag: 'Bag, 3 items',
          language: 'Language',
          whatsapp: 'Order on WhatsApp'
        };

  test('desktop header navigation, tools and supplied count (' + lang + ')', async ({page}) => {
    await page.setViewportSize({width: 1440, height: 900});
    await openStorefrontComponent(page, 'StorefrontHeader', lang);
    const header = page.getByRole('banner');
    const nav = header.getByRole('navigation');
    await expect(nav.getByRole('link')).toHaveText([t.shop, t.journal]);
    await expect(nav.getByRole('link', {name: t.shop, exact: true})).toHaveAttribute(
      'aria-current',
      'page'
    );
    await expect(nav.getByRole('link', {name: t.journal, exact: true})).not.toHaveAttribute(
      'aria-current'
    );
    for (const [label, hash] of [
      [t.brand, 'home'],
      [t.shop, 'shop'],
      [t.journal, 'journal'],
      [t.search, 'search'],
      [t.account, 'account'],
      [t.bag, 'bag']
    ]) {
      const link = header.getByRole('link', {name: label, exact: true});
      await expect(link).toHaveAttribute('href', '#' + hash);
      await link.focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(new RegExp('#' + hash + '$'));
    }
    const bag = header.locator('a[href="#bag"]:visible');
    await expect(bag).toHaveText(lang === 'fa' ? '۳' : '3');
    await page.getByRole('checkbox', {name: 'Show bag count'}).uncheck();
    await expect(bag).toHaveText('');
    await expect(bag).toHaveAccessibleName(lang === 'fa' ? 'سبد' : 'Bag');
    await expect(header.getByRole('button', {name: t.menu, exact: true})).toHaveCount(0);
    expect(await scanAxe(page)).toEqual([]);
  });

  test(
    'desktop language callbacks remain controlled across tablet layout (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 1440, height: 900});
      await openStorefrontComponent(page, 'StorefrontHeader', lang);
      const header = page.getByRole('banner');
      const group = header.getByRole('group', {name: t.language, exact: true});
      await expect(
        group.getByRole('button', {name: lang === 'en' ? 'EN' : 'فا', exact: true})
      ).toHaveAttribute('aria-pressed', 'true');
      const alternative = group.getByRole('button', {
        name: lang === 'en' ? 'فا' : 'EN',
        exact: true
      });
      await expect(alternative).toHaveAttribute('lang', lang === 'en' ? 'fa' : 'en');
      await alternative.focus();
      await page.keyboard.press('Space');
      await expect(page.locator('[data-test=changed]')).toHaveText(lang === 'en' ? 'fa' : 'en');
      await expect(page.locator('[data-test=changes]')).toHaveText('1');
      await expect(alternative).toHaveAttribute('aria-pressed', 'true');
      await page.setViewportSize({width: 768, height: 900});
      await expect(
        group.getByRole('button', {name: lang === 'en' ? 'فا' : 'EN', exact: true})
      ).toHaveAttribute('aria-pressed', 'true');
      await group.getByRole('button', {name: lang === 'en' ? 'EN' : 'فا', exact: true}).click();
      await expect(page.locator('[data-test=changes]')).toHaveText('2');
      await expect(page.locator('[data-test=changed]')).toHaveText(lang);
      await expect(page.locator('[data-test=opened]')).toHaveText('0');
    }
  );

  test('phone header menu and alternative-language activation (' + lang + ')', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await openStorefrontComponent(page, 'StorefrontHeader', lang);
    const header = page.getByRole('banner');
    const menu = header.getByRole('button', {name: t.menu, exact: true});
    const alternative = header.getByRole('button', {
      name: lang === 'en' ? 'فا، فارسی' : 'EN, English',
      exact: true
    });
    await expect(alternative).toHaveAttribute('lang', lang === 'en' ? 'fa' : 'en');
    await menu.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-test=opened]')).toHaveText('1');
    await page.keyboard.press('Space');
    await expect(page.locator('[data-test=opened]')).toHaveText('2');
    await menu.click();
    await expect(page.locator('[data-test=opened]')).toHaveText('3');
    await page.keyboard.press('Tab');
    await expect(alternative).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-test=changed]')).toHaveText(lang === 'en' ? 'fa' : 'en');
    await expect(page.locator('[data-test=changes]')).toHaveText('1');
    await expect(
      header.getByRole('button', {name: lang === 'en' ? 'EN, English' : 'فا، فارسی', exact: true})
    ).toHaveAttribute('lang', lang);
    await expect(header.getByRole('link', {name: t.account, exact: true})).toHaveCount(0);
    await expect(header.getByRole('navigation')).toHaveCount(0);
    await expect(header.getByRole('group')).toHaveCount(0);
    for (const label of [t.brand, t.search, t.bag])
      await expect(header.getByRole('link', {name: label, exact: true})).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
  });

  for (const width of [390, 768, 1024, 1440]) {
    test(`header breakpoint at ${width}px (${lang})`, async ({page}) => {
      await page.setViewportSize({width, height: 900});
      await openStorefrontComponent(page, 'StorefrontHeader', lang);
      const header = page.getByRole('banner');
      await expect(header.getByRole('button', {name: t.menu, exact: true})).toHaveCount(
        width < 1024 ? 1 : 0
      );
      await expect(header.getByRole('link', {name: t.account, exact: true})).toHaveCount(
        width >= 768 ? 1 : 0
      );
      await expect(header.getByRole('group', {name: t.language, exact: true})).toHaveCount(
        width >= 768 ? 1 : 0
      );
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      expect(await scanAxe(page)).toEqual([]);
    });
  }

  for (const width of [390, 768, 1440]) {
    test(`header without language or navigation links at ${width}px (${lang})`, async ({page}) => {
      await page.setViewportSize({width, height: 900});
      await openStorefrontComponent(page, 'StorefrontHeader', lang);
      await page.getByRole('checkbox', {name: 'Show language', exact: true}).uncheck();
      await page.getByRole('checkbox', {name: 'Empty navigation', exact: true}).check();
      const header = page.getByRole('banner');
      await expect(header.getByRole('group')).toHaveCount(0);
      await expect(header.getByRole('button', {name: /^(فا، فارسی|EN, English)$/})).toHaveCount(0);
      await expect(header.getByRole('link', {name: t.shop, exact: true})).toHaveCount(0);
      expect(await scanAxe(page)).toEqual([]);
    });
  }

  test('header selects supplied desktop logo and compact mark (' + lang + ')', async ({page}) => {
    await page.setViewportSize({width: 1440, height: 900});
    await openStorefrontComponent(page, 'StorefrontHeader', lang);
    await page.getByRole('checkbox', {name: 'Show brand images'}).check();
    const header = page.getByRole('banner');
    const logo = header.getByRole('link', {
      name: lang === 'fa' ? 'نشان وندرا' : 'Vendra logo',
      exact: true
    });
    await expect(logo).toHaveAttribute('href', '#home');
    await expect(logo.getByRole('img')).toHaveAttribute('src', '/assets/categories/bouquets.webp');
    await expect(logo.getByRole('img')).toHaveJSProperty('naturalWidth', 640);
    await page.setViewportSize({width: 390, height: 844});
    const mark = header.getByRole('link', {
      name: lang === 'fa' ? 'نماد وندرا' : 'Vendra mark',
      exact: true
    });
    await expect(mark).toHaveAttribute('href', '#home');
    await expect(mark.getByRole('img')).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: 'Show brand images'}).uncheck();
    await expect(header.getByRole('link', {name: t.brand, exact: true})).toBeVisible();
  });
}
