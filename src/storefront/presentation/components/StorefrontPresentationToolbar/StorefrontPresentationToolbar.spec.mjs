import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          query: 'یافتن طرح',
          placeholder: 'کد محصول را وارد کنید',
          category: 'دسته‌ها',
          all: 'همه',
          ready: 'آماده',
          count: '۲ طرح',
          resume: 'ادامه نمایش',
          scan: 'اسکن کد',
          shortlist: 'انتخاب‌ها، ۲',
          order: 'سفارش، ۳',
          startOver: 'مشتری بعدی',
          settings: 'تنظیمات'
        }
      : {
          query: 'Find designs',
          placeholder: 'Enter a product code',
          category: 'Categories',
          all: 'All',
          ready: 'Ready',
          count: '2 designs',
          resume: 'Resume display',
          scan: 'Scan code',
          shortlist: 'Shortlist, 2',
          order: 'Order, 3',
          startOver: 'Next customer',
          settings: 'Settings'
        };
  test(
    'presentation search controlled value, submit, clear and Escape (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontPresentationToolbar', lang);
      const input = page.getByRole('searchbox', {name: t.query, exact: true});
      await expect(input).toHaveAttribute('id', 'vf-presentation-q');
      await expect(input).toHaveAttribute('placeholder', t.placeholder);
      await page.getByRole('button', {name: 'Set supplied query'}).click();
      await expect(input).toHaveValue('VF-7K2M4Q');
      await expect(page.locator('[data-test=changed]')).toHaveText('0');
      await input.fill('VF-8P3N5R');
      await expect(page.locator('[data-test=changed]')).toHaveText('1');
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-test=submitted]')).toHaveText('VF-8P3N5R');
      await page
        .getByRole('button', {name: lang === 'fa' ? 'پاک کردن جستجو' : 'Clear search', exact: true})
        .click();
      await expect(input).toHaveValue('');
      await expect(input).toBeFocused();
      await input.fill('VF');
      await page.keyboard.press('Escape');
      await expect(input).toHaveValue('');
      await expect(page.locator('[data-test=calls]')).toHaveText('0');
    }
  );
  test(
    'presentation category order and controlled keyboard selection (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontPresentationToolbar', lang);
      const group = page.getByRole('group', {name: t.category, exact: true});
      await expect(group.getByRole('button')).toHaveText([t.all, t.ready]);
      const all = group.getByRole('button', {name: t.all, exact: true});
      const ready = group.getByRole('button', {name: t.ready, exact: true});
      await expect(all).toHaveAttribute('aria-pressed', 'true');
      await all.focus();
      await page.keyboard.press('Tab');
      await expect(ready).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(ready).toHaveAttribute('aria-pressed', 'true');
      await expect(all).toHaveAttribute('aria-pressed', 'false');
      await expect(page.locator('[data-test=action]')).toHaveText('kind:ready');
      await all.click();
      await expect(page.locator('[data-test=action]')).toHaveText('kind:all');
      await expect(page.locator('[data-test=calls]')).toHaveText('2');
    }
  );
  test(
    'presentation customer actions, count labels and optional controls (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontPresentationToolbar', lang);
      await expect(page.getByRole('status')).toHaveText(t.count);
      let calls = 0;
      for (const key of ['resume', 'scan', 'shortlist', 'order', 'startOver', 'settings']) {
        const button = page.getByRole('button', {name: t[key], exact: true});
        await button.click();
        await expect(page.locator('[data-test=action]')).toHaveText(key);
        await expect(page.locator('[data-test=calls]')).toHaveText(String(++calls));
      }
      await expect(page.getByRole('button', {name: t.shortlist, exact: true})).toContainText(
        lang === 'fa' ? '۲' : '2'
      );
      await expect(page.getByRole('button', {name: t.order, exact: true})).toContainText(
        lang === 'fa' ? '۳' : '3'
      );
      await page.getByRole('checkbox', {name: 'Show optional actions'}).uncheck();
      await expect(page.getByRole('button', {name: t.scan, exact: true})).toHaveCount(0);
      await expect(page.getByRole('button', {name: t.startOver, exact: true})).toHaveCount(0);
      for (const key of ['resume', 'shortlist', 'order', 'settings'])
        await expect(page.getByRole('button', {name: t[key], exact: true})).toBeVisible();
    }
  );
  test(
    'presentation toolbar responsive keyboard and empty categories accessibility (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontPresentationToolbar', lang);
      for (const width of [390, 768, 1440]) {
        await page.setViewportSize({width, height: 900});
        expect(await scanAxe(page)).toEqual([]);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
          true
        );
      }
      const resume = page.getByRole('button', {name: t.resume, exact: true});
      await resume.focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-test=action]')).toHaveText('resume');
      await page.getByRole('checkbox', {name: 'Empty categories'}).check();
      await expect(
        page.getByRole('group', {name: t.category, exact: true}).getByRole('button')
      ).toHaveCount(0);
      expect(await scanAxe(page)).toEqual([]);
    }
  );
}
