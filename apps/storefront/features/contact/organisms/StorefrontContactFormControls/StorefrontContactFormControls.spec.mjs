import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          name: 'نام',
          phone: 'شماره همراه',
          hint: 'شماره‌ای برای پاسخ به شما.',
          email: 'ایمیل',
          message: 'پیام',
          send: 'ارسال پیام',
          error: 'این فیلد را بررسی کنید.'
        }
      : {
          name: 'Name',
          phone: 'Mobile number',
          hint: 'A number for your reply.',
          email: 'Email',
          message: 'Message',
          send: 'Send message',
          error: 'Check this field.'
        };
  const supplied = {
    name: lang === 'fa' ? 'مینا' : 'Mina',
    phone: '09120000000',
    email: 'mina@example.com',
    message: lang === 'fa' ? 'زمان بازدید؟' : 'When can I visit?'
  };
  const zero = {name: 0, phone: 0, email: 0, message: 0};
  const ids = {name: 'vf-cname', phone: 'vf-cphone', email: 'vf-cemail', message: 'vf-cmsg'};
  test('contact field labels, metadata and supplied values (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontContactFormControls', lang);
    for (const key of Object.keys(ids)) {
      const field = page.getByRole('textbox', {name: t[key], exact: true});
      await expect(field).toHaveAttribute('id', ids[key]);
      await expect(field).toHaveValue('');
      if (key !== 'message') await expect(field).not.toHaveAttribute('required');
    }
    const name = page.getByRole('textbox', {name: t.name, exact: true});
    const phone = page.getByRole('textbox', {name: t.phone, exact: true});
    const email = page.getByRole('textbox', {name: t.email, exact: true});
    const message = page.getByRole('textbox', {name: t.message, exact: true});
    await expect(name).toHaveAttribute('autocomplete', 'name');
    await expect(phone).toHaveAttribute('autocomplete', 'tel');
    await expect(phone).toHaveAttribute('inputmode', 'tel');
    await expect(phone).toHaveAttribute('dir', 'ltr');
    await expect(phone).toHaveAccessibleDescription(t.hint);
    await expect(email).toHaveAttribute('type', 'email');
    await expect(email).toHaveAttribute('autocomplete', 'email');
    await expect(email).toHaveAttribute('dir', 'ltr');
    await expect(message).toHaveJSProperty('tagName', 'TEXTAREA');
    await expect(message).toHaveAttribute('required', '');
    await expect(message).toHaveAttribute('rows', '5');
    await page.getByRole('button', {name: 'Set supplied values'}).click();
    for (const key of Object.keys(ids))
      await expect(page.getByRole('textbox', {name: t[key], exact: true})).toHaveValue(
        supplied[key]
      );
    await expect(page.locator('[data-test=changes]')).toHaveText(JSON.stringify(zero));
  });
  test('contact editing callbacks and keyboard field order (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontContactFormControls', lang);
    const values = {
      name: 'Sara',
      phone: '۰۹۱۲ ۳۴۵ ۶۷۸۹',
      email: 'sara@example.com',
      message: 'Hello\nA studio visit'
    };
    const changes = {...zero};
    const keys = Object.keys(ids);
    for (const [index, key] of keys.entries()) {
      const field = page.getByRole('textbox', {name: t[key], exact: true});
      await field.fill(values[key]);
      changes[key]++;
      await expect(page.locator('[data-test=changes]')).toHaveText(JSON.stringify(changes));
      if (index < keys.length - 1) {
        await page.keyboard.press('Tab');
        await expect(
          page.getByRole('textbox', {name: t[keys[index + 1]], exact: true})
        ).toBeFocused();
      }
    }
    await expect(page.locator('[data-test=values]')).toHaveText(JSON.stringify(values));
    await expect(page.locator('[data-test=metadata]')).toHaveText(
      JSON.stringify({value: values.phone, number: '09123456789', mobile: true})
    );
    await page.keyboard.press('Tab');
    const send = page.getByRole('button', {name: t.send, exact: true});
    await expect(send).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-test=sent]')).toHaveText('1');
    await expect(page.locator('[data-test=submitted]')).toHaveText(JSON.stringify(values));
    await page.keyboard.press('Space');
    await send.click();
    await expect(page.locator('[data-test=sent]')).toHaveText('3');
  });
  test(
    'contact summary links focus each invalid field and errors clear (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontContactFormControls', lang);
      await page.getByRole('button', {name: 'Set supplied values'}).click();
      await expect(page.locator('#vf-contact-errors')).toHaveCount(0);
      await page.getByRole('checkbox', {name: 'Show validation'}).check();
      const summary = page.locator('#vf-contact-errors');
      for (const key of ['phone', 'email', 'message']) {
        const field = page.getByRole('textbox', {name: t[key], exact: true});
        const link = summary.getByRole('link', {name: t[key] + ': ' + t.error, exact: true});
        await expect(link).toHaveAttribute('href', '#' + ids[key]);
        await link.focus();
        await page.keyboard.press('Enter');
        await expect(field).toBeFocused();
        await expect(field).toHaveAttribute('aria-invalid', 'true');
        await expect(field).toHaveAccessibleDescription(t.error);
      }
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Show validation'}).uncheck();
      await expect(summary).toHaveCount(0);
      for (const key of ['phone', 'email', 'message']) {
        const field = page.getByRole('textbox', {name: t[key], exact: true});
        await expect(field).not.toHaveAttribute('aria-invalid', 'true');
        await expect(field).toHaveValue(supplied[key]);
        await expect(field).toHaveAccessibleDescription(key === 'phone' ? t.hint : '');
      }
    }
  );
  test(
    'busy contact send blocks activation and recovers without losing values (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontContactFormControls', lang);
      await page.getByRole('button', {name: 'Set supplied values'}).click();
      await page.getByRole('checkbox', {name: 'Busy submission'}).check();
      const send = page.getByRole('button', {name: t.send, exact: true});
      await expect(send).toBeDisabled();
      await expect(send).toHaveClass(/ag-btn--loading/);
      await send.click({force: true});
      await expect(page.locator('[data-test=sent]')).toHaveText('0');
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Busy submission'}).uncheck();
      await expect(send).toBeEnabled();
      await send.click();
      await expect(page.locator('[data-test=sent]')).toHaveText('1');
      await expect(page.locator('[data-test=submitted]')).toHaveText(JSON.stringify(supplied));
    }
  );
  test('contact compact empty, filled and error accessibility (' + lang + ')', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await openStorefrontComponent(page, 'StorefrontContactFormControls', lang);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('button', {name: 'Set supplied values'}).click();
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: 'Show validation'}).check();
    expect(await scanAxe(page)).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
  });
}
