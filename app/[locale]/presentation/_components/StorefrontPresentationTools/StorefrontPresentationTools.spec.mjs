import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          title: 'ابزارهای فروشنده',
          offline: 'آفلاین هستید',
          photoIssue: 'بعضی عکس‌ها بارگذاری نشد',
          stockIssue: 'موجودی به‌روز نشد',
          retryPhotos: 'تلاش دوباره برای عکس‌ها',
          setupIntro: 'این نمایشگر را تنظیم کنید.',
          setupTitle: 'راه‌اندازی نمایشگر',
          reviewSetup: 'بررسی راه‌اندازی',
          stockDemo: 'موجودی نمایشی',
          browse: 'مرور طرح‌ها',
          settings: 'تنظیمات',
          shortlist: 'انتخاب‌ها',
          order: 'سفارش',
          scan: 'اسکن کد',
          startOver: 'مشتری بعدی',
          progress: 'آماده‌سازی عکس‌ها',
          screen: 'تبلت',
          wake: 'فعال',
          open: 'باز کردن ابزارها',
          close: 'بستن'
        }
      : {
          title: 'Seller tools',
          offline: 'You are offline',
          photoIssue: 'Some photos failed',
          stockIssue: 'Stock refresh failed',
          retryPhotos: 'Retry photos',
          setupIntro: 'Set up this display.',
          setupTitle: 'Display setup',
          reviewSetup: 'Review setup',
          stockDemo: 'Demo stock',
          browse: 'Browse designs',
          settings: 'Settings',
          shortlist: 'Shortlist',
          order: 'Order',
          scan: 'Scan code',
          startOver: 'Next customer',
          progress: 'Preparing photos',
          screen: 'Tablet',
          wake: 'Active',
          open: 'Open tools',
          close: 'Close'
        };
  test(
    'seller tools supplied status, timestamp and device content (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontPresentationTools', lang);
      await expect(page.getByRole('dialog')).toHaveCount(0);
      await page.getByRole('button', {name: t.open, exact: true}).click();
      const dialog = page.getByRole('dialog', {name: t.title, exact: true});
      await expect(dialog.getByRole('status')).toHaveAttribute('data-offline-status', 'preparing');
      await expect(dialog.getByRole('status')).toHaveText(t.progress + ' 2/3');
      await expect(dialog.locator('bdi')).toHaveText('2026-11-17 09:30');
      await expect(dialog.getByRole('definition')).toHaveText([t.screen, t.wake]);
      await expect(dialog.getByText(t.setupIntro, {exact: true})).toBeVisible();
      await expect(dialog.getByText(t.stockDemo, {exact: true})).toHaveCount(0);
      await expect(dialog.getByText(t.photoIssue, {exact: true})).toBeVisible();
      await expect(dialog.getByText(t.stockIssue, {exact: true})).toBeVisible();
      await expect(dialog.getByText(t.offline, {exact: true})).toHaveCount(0);
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test('seller tools action order and isolated callbacks (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontPresentationTools', lang);
    await page.getByRole('button', {name: t.open, exact: true}).click();
    const dialog = page.getByRole('dialog');
    const actions = [
      ['retryPhotos', 'retry'],
      ['setupTitle', 'setup'],
      ['reviewSetup', 'settings'],
      ['browse', 'browse'],
      ['shortlist', 'shortlist'],
      ['order', 'order'],
      ['scan', 'scan'],
      ['startOver', 'startOver'],
      ['settings', 'settings']
    ];
    await expect(dialog.getByRole('button')).toHaveCount(actions.length + 1);
    await expect(dialog.getByRole('button').first()).toHaveAccessibleName(t.close);
    for (const [index, [label, key]] of actions.entries()) {
      const button = dialog.getByRole('button', {name: t[label], exact: true});
      await expect(dialog.getByRole('button').nth(index + 1)).toHaveAccessibleName(t[label]);
      await button.click();
      await expect(page.locator('[data-test=action]')).toHaveText(key);
      await expect(page.locator('[data-test=calls]')).toHaveText(String(index + 1));
    }
    await expect(page.locator('[data-test=closed]')).toHaveText('0');
    await expect(dialog).toBeVisible();
  });
  test(
    'seller tools offline warnings disable retry while preserving other actions (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      await openStorefrontComponent(page, 'StorefrontPresentationTools', lang);
      await page.getByRole('checkbox', {name: 'Online', exact: true}).uncheck();
      await page.getByRole('checkbox', {name: 'Stock timestamp', exact: true}).uncheck();
      await page.getByRole('button', {name: t.open, exact: true}).click();
      const dialog = page.getByRole('dialog');
      for (const text of [t.offline, t.photoIssue, t.stockIssue, t.stockDemo])
        await expect(dialog.getByText(text, {exact: true})).toBeVisible();
      await expect(dialog.locator('bdi')).toHaveCount(0);
      const retry = dialog.getByRole('button', {name: t.retryPhotos, exact: true});
      await expect(retry).toBeDisabled();
      await retry.click({force: true});
      await expect(page.locator('[data-test=calls]')).toHaveText('0');
      await dialog.getByRole('button', {name: t.browse, exact: true}).focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-test=action]')).toHaveText('browse');
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'seller tools optional warnings, setup and capability branches (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontPresentationTools', lang);
      for (const name of [
        'Photo issue',
        'Stock issue',
        'Can review',
        'Scan available',
        'Start over available'
      ])
        await page.getByRole('checkbox', {name, exact: true}).uncheck();
      await page.getByRole('checkbox', {name: 'Setup done', exact: true}).check();
      await page.getByRole('button', {name: t.open, exact: true}).click();
      const dialog = page.getByRole('dialog');
      for (const text of [t.photoIssue, t.stockIssue, t.setupIntro])
        await expect(dialog.getByText(text, {exact: true})).toHaveCount(0);
      for (const key of ['retryPhotos', 'reviewSetup', 'scan', 'startOver'])
        await expect(dialog.getByRole('button', {name: t[key], exact: true})).toHaveCount(0);
      await expect(dialog.getByRole('button', {name: t.setupTitle, exact: true})).toBeVisible();
      await expect(dialog.getByRole('button', {name: t.settings, exact: true})).toBeVisible();
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'seller tools keyboard containment, dismissal and trigger focus (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      await openStorefrontComponent(page, 'StorefrontPresentationTools', lang);
      const trigger = page.getByRole('button', {name: t.open, exact: true});
      await trigger.click();
      const dialog = page.getByRole('dialog', {name: t.title, exact: true});
      const close = dialog.getByRole('button', {name: t.close, exact: true});
      await close.focus();
      for (let index = 0; index < 12; index++) {
        await page.keyboard.press('Tab');
        expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(
          true
        );
      }
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
      await expect(trigger).toBeFocused();
      await expect(page.locator('[data-test=closed]')).toHaveText('1');
      await trigger.click();
      await dialog.getByRole('button', {name: t.settings, exact: true}).focus();
      await page.keyboard.press('Space');
      await expect(page.locator('[data-test=action]')).toHaveText('settings');
      await close.click();
      await expect(dialog).toHaveCount(0);
      await expect(trigger).toBeFocused();
      await expect(page.locator('[data-test=closed]')).toHaveText('2');
    }
  );
}
