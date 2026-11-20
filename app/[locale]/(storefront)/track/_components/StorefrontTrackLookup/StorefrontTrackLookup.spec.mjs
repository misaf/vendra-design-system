import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../../e2e/component-test.mjs';

for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          heading: 'پیگیری سفارش',
          intro: 'شماره سفارش و همراه گیرنده را وارد کنید.',
          order: 'شماره سفارش',
          hint: 'در تأیید سفارش نوشته شده است.',
          phone: 'همراه گیرنده',
          submit: 'یافتن سفارش',
          browse: 'دیدن گل‌ها',
          error: 'این فیلد را بررسی کنید.',
          failure: 'سفارش مطابق پیدا نشد.'
        }
      : {
          heading: 'Track your order',
          intro: 'Use the order number and recipient phone.',
          order: 'Order number',
          hint: 'Find it in your confirmation.',
          phone: 'Recipient mobile',
          submit: 'Find order',
          browse: 'Browse flowers',
          error: 'Check this field.',
          failure: 'No matching order was found.'
        };
  test('lookup controlled fields, metadata and form submission (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontTrackLookup', lang);
    await expect(page.getByRole('heading', {level: 1, name: t.heading})).toBeVisible();
    await expect(page.getByText(t.intro, {exact: true})).toBeVisible();
    const order = page.getByRole('textbox', {name: t.order});
    const phone = page.getByRole('textbox', {name: t.phone});
    await expect(order).toHaveValue('VD-12345');
    await expect(phone).toHaveValue('09120000000');
    await expect(order).toHaveAttribute('id', 'vf-lookup-id');
    await expect(order).toHaveAttribute('dir', 'ltr');
    await expect(order).toHaveAttribute('autocomplete', 'off');
    await expect(order).toHaveAttribute('autocapitalize', 'characters');
    await expect(order).toHaveAccessibleDescription(t.hint);
    await expect(phone).toHaveAttribute('id', 'vf-lookup-phone');
    await expect(phone).toHaveAttribute('dir', 'ltr');
    await expect(phone).toHaveAttribute('autocomplete', 'tel');
    await expect(phone).toHaveAttribute('placeholder', '0912 000 0000');
    await expect(order).toHaveAttribute('required', '');
    await expect(phone).toHaveAttribute('required', '');
    await order.fill('VD-۵۶۷۸۹');
    await phone.fill('۰۹۱۲ ۳۴۵ ۶۷۸۹');
    await expect(order).toHaveValue('VD-۵۶۷۸۹');
    await expect(phone).toHaveValue('۰۹۱۲ ۳۴۵ ۶۷۸۹');
    await expect(page.locator('[data-test=metadata]')).toHaveText(
      JSON.stringify({number: '09123456789', mobile: true})
    );
    await phone.press('Enter');
    await expect(page.locator('[data-test=count]')).toHaveText('1');
    await expect(page.locator('[data-test=submitted]')).toHaveText(
      JSON.stringify({order: 'VD-۵۶۷۸۹', phone: '۰۹۱۲ ۳۴۵ ۶۷۸۹'})
    );
    await page.getByRole('button', {name: t.submit}).click();
    await expect(page.locator('[data-test=count]')).toHaveText('2');
  });
  test(
    'lookup native validation is delegated to submit callback (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontTrackLookup', lang);
      await expect(page.locator('form')).toHaveAttribute('novalidate', '');
      await page.getByRole('textbox', {name: t.order}).fill('');
      await page.getByRole('textbox', {name: t.phone}).fill('');
      await page.getByRole('button', {name: t.submit}).click();
      await expect(page.locator('[data-test=count]')).toHaveText('1');
      await expect(page.locator('[data-test=submitted]')).toHaveText(
        JSON.stringify({order: '', phone: ''})
      );
    }
  );
  test('lookup field errors and independent failure target (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontTrackLookup', lang);
    const order = page.getByRole('textbox', {name: t.order});
    const phone = page.getByRole('textbox', {name: t.phone});
    const failure = page.locator('#vf-lookup-failed');
    await expect(failure).toHaveCount(0);
    await page.getByRole('checkbox', {name: 'Field errors'}).check();
    for (const field of [order, phone]) {
      await expect(field).toHaveAttribute('aria-invalid', 'true');
      await expect(field).toHaveAccessibleDescription(t.error);
    }
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: 'Lookup failure'}).check();
    await expect(failure).toHaveText(t.failure);
    await expect(failure).toHaveAttribute('tabindex', '-1');
    await failure.focus();
    await expect(failure).toBeFocused();
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: 'Field errors'}).uncheck();
    await expect(order).not.toHaveAttribute('aria-invalid', 'true');
    await expect(phone).not.toHaveAttribute('aria-invalid', 'true');
    await expect(order).toHaveAccessibleDescription(t.hint);
    await expect(failure).toBeVisible();
    await page.getByRole('checkbox', {name: 'Lookup failure'}).uncheck();
    await expect(failure).toHaveCount(0);
    expect(await scanAxe(page)).toEqual([]);
  });
  test(
    'lookup compact browse destination and keyboard navigation (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      await openStorefrontComponent(page, 'StorefrontTrackLookup', lang);
      const browse = page.getByRole('link', {name: t.browse});
      await expect(browse).toHaveAttribute('href', '#shop');
      await browse.focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/#shop$/);
      await expect(page.locator('[data-test=count]')).toHaveText('0');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      expect(await scanAxe(page)).toEqual([]);
    }
  );
}
