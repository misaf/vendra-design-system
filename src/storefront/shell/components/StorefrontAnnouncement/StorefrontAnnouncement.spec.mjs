import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          label: 'خبر فروشگاه',
          close: 'بستن خبر',
          text: 'ارسال امروز در کرج امکان‌پذیر است.',
          phone: 'ارسال امروز',
          link: 'خرید برای امروز'
        }
      : {
          label: 'Store news',
          close: 'Close news',
          text: 'Delivery is available today in Karaj.',
          phone: 'Delivery today',
          link: 'Shop today'
        };
  test('announcement uses supplied phone and wider messages (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontAnnouncement', lang);
    const region = page.getByRole('region', {name: t.label, exact: true});
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({width, height: 900});
      if (width < 768) {
        await expect(region.getByText(t.phone, {exact: true})).toBeVisible();
        await expect(region.getByText(t.text, {exact: true})).toBeHidden();
      } else {
        await expect(region.getByText(t.phone, {exact: true})).toBeHidden();
        await expect(region.getByText(t.text, {exact: true})).toBeVisible();
      }
      expect(await scanAxe(page)).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
    }
    await page.getByRole('checkbox', {name: 'Matching phone text', exact: true}).check();
    const message = region.locator('.ag-announce__text');
    await expect(message).toHaveText(t.text + ' ' + t.link);
    await expect(region.getByText(t.phone, {exact: true})).toHaveCount(0);
    await page.setViewportSize({width: 390, height: 844});
    await expect(message).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
  });
  test(
    'announcement action destination and independent visibility (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontAnnouncement', lang);
      const region = page.getByRole('region', {name: t.label, exact: true});
      const action = region.getByRole('link', {name: t.link, exact: true});
      await expect(action).toHaveAttribute('href', '#today');
      await expect(action.locator('.ag-icon')).toHaveClass(/ag-flip-rtl/);
      await expect(action.locator('.ag-icon')).toHaveAttribute('aria-hidden', 'true');
      await action.focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/#today$/);
      await expect(page.locator('[data-test=closed]')).toHaveText('0');
      await page.getByRole('checkbox', {name: 'Show action', exact: true}).uncheck();
      await expect(action).toHaveCount(0);
      await expect(region.getByRole('button', {name: t.close, exact: true})).toBeVisible();
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test('announcement close callback and optional dismissal (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontAnnouncement', lang);
    const region = page.getByRole('region', {name: t.label, exact: true});
    const close = region.getByRole('button', {name: t.close, exact: true});
    await close.click();
    await expect(page.locator('[data-test=closed]')).toHaveText('1');
    await close.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-test=closed]')).toHaveText('2');
    await page.keyboard.press('Space');
    await expect(page.locator('[data-test=closed]')).toHaveText('3');
    await expect(region).toBeVisible();
    await page.getByRole('checkbox', {name: 'Allow dismissal', exact: true}).uncheck();
    await expect(close).toHaveCount(0);
    await expect(region.getByRole('link', {name: t.link, exact: true})).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
  });
  test(
    'empty full announcement suppresses phone text and action (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      await openStorefrontComponent(page, 'StorefrontAnnouncement', lang);
      const region = page.getByRole('region', {name: t.label, exact: true});
      await page.getByRole('checkbox', {name: 'Empty message', exact: true}).check();
      await expect(region).toHaveCount(0);
      await expect(page.getByRole('link', {name: t.link, exact: true})).toHaveCount(0);
      await expect(page.locator('[data-test=closed]')).toHaveText('0');
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Empty message', exact: true}).uncheck();
      await expect(region).toBeVisible();
      await expect(region.getByText(t.phone, {exact: true})).toBeVisible();
    }
  );
}
