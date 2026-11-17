import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../e2e/component-test.mjs';

for (const lang of ['en', 'fa']) {
  const title = lang === 'fa' ? 'فرستنده' : 'Sender';
  const nameLabel = lang === 'fa' ? 'نام کامل' : 'Full name';
  const phoneLabel = lang === 'fa' ? 'شماره همراه' : 'Mobile number';
  const error = lang === 'fa' ? 'این فیلد را بررسی کنید.' : 'Check this field.';
  test('sender labels, required fields and supplied values (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontBagSender', lang);
    const region = page.getByRole('region', {name: title, exact: true});
    await expect(region.getByRole('heading', {name: title, exact: true})).toHaveAttribute(
      'id',
      'vf-you-title'
    );
    const name = region.getByRole('textbox', {name: nameLabel, exact: true});
    const phone = region.getByRole('textbox', {name: phoneLabel, exact: true});
    await expect(name).toHaveAttribute('id', 'vf-sender');
    await expect(phone).toHaveAttribute('id', 'vf-sender-phone');
    await expect(name).toHaveAttribute('autocomplete', 'name');
    await expect(phone).toHaveAttribute('autocomplete', 'tel');
    for (const field of [name, phone]) {
      await expect(field).toHaveAttribute('required', '');
      await expect(field).toHaveValue('');
    }
    await expect(phone).toHaveAttribute('type', 'tel');
    await expect(phone).toHaveAttribute('inputmode', 'tel');
    await expect(phone).toHaveAttribute('dir', 'ltr');
    await expect(phone).toHaveAttribute('placeholder', '0912 000 0000');
    await expect(
      region.getByText(
        lang === 'fa'
          ? 'از شماره شما برای اطلاع‌رسانی ارسال استفاده می‌کنیم.'
          : 'We use your number for delivery updates.',
        {exact: true}
      )
    ).toBeVisible();
    await page.getByRole('button', {name: 'Set supplied values'}).click();
    await expect(name).toHaveValue(lang === 'fa' ? 'مینا' : 'Mina');
    await expect(phone).toHaveValue('09120000000');
    await expect(page.locator('[data-test=name-calls]')).toHaveText('0');
    await expect(page.locator('[data-test=phone-calls]')).toHaveText('0');
  });

  test('sender controlled editing and phone metadata (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontBagSender', lang);
    const name = page.getByRole('textbox', {name: nameLabel, exact: true});
    const phone = page.getByRole('textbox', {name: phoneLabel, exact: true});
    await name.fill(lang === 'fa' ? 'سارا' : 'Sara');
    await expect(page.locator('[data-test=name]')).toHaveText(lang === 'fa' ? 'سارا' : 'Sara');
    await expect(page.locator('[data-test=name-calls]')).toHaveText('1');
    await expect(page.locator('[data-test=phone-calls]')).toHaveText('0');
    await page.keyboard.press('Tab');
    await expect(phone).toBeFocused();
    for (const value of ['۰۹۱۲ ۳۴۵ ۶۷۸۹', '+98 912 345 6789']) {
      await phone.fill(value);
      await expect(phone).toHaveValue(value);
      await expect(page.locator('[data-test=phone]')).toHaveText(value);
      await expect(page.locator('[data-test=changed]')).toHaveText(
        JSON.stringify({value, number: '09123456789', mobile: true})
      );
    }
    await expect(page.locator('[data-test=name-calls]')).toHaveText('1');
    await expect(page.locator('[data-test=phone-calls]')).toHaveText('2');
    await name.fill('');
    await phone.fill('');
    await expect(page.locator('[data-test=changed]')).toHaveText(
      JSON.stringify({value: '', number: '', mobile: false})
    );
  });

  test('sender supplied errors clear without changing values (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontBagSender', lang);
    await page.getByRole('button', {name: 'Set supplied values'}).click();
    const fields = [
      page.getByRole('textbox', {name: nameLabel, exact: true}),
      page.getByRole('textbox', {name: phoneLabel, exact: true})
    ];
    await page.getByRole('checkbox', {name: 'Show validation', exact: true}).check();
    for (const field of fields) {
      await expect(field).toHaveAttribute('aria-invalid', 'true');
      await expect(field).toHaveAccessibleDescription(error);
    }
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: 'Show validation', exact: true}).uncheck();
    for (const field of fields) {
      await expect(field).not.toHaveAttribute('aria-invalid', 'true');
      await expect(field).toHaveAccessibleDescription('');
    }
    await expect(fields[0]).toHaveValue(lang === 'fa' ? 'مینا' : 'Mina');
    await expect(fields[1]).toHaveValue('09120000000');
    expect(await scanAxe(page)).toEqual([]);
  });

  test('sender compact empty, filled and error accessibility (' + lang + ')', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await openStorefrontComponent(page, 'StorefrontBagSender', lang);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('button', {name: 'Set supplied values'}).click();
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: 'Show validation', exact: true}).check();
    expect(await scanAxe(page)).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
  });
}
