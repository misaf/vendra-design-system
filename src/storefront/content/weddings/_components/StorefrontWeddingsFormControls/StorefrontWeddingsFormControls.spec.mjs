import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          name: 'نام',
          email: 'ایمیل',
          phone: 'شماره همراه',
          event: 'مراسم',
          reception: 'جشن',
          guests: 'تعداد مهمان',
          budget: 'بودجه',
          large: 'زیاد',
          message: 'پیام',
          hint: 'از برنامه خود بگویید.',
          send: 'ارسال درخواست',
          error: 'این فیلد را بررسی کنید.'
        }
      : {
          name: 'Name',
          email: 'Email',
          phone: 'Mobile number',
          event: 'Event',
          reception: 'Reception',
          guests: 'Guest count',
          budget: 'Budget',
          large: 'Large',
          message: 'Message',
          hint: 'Tell us about your plans.',
          send: 'Send inquiry',
          error: 'Check this field.'
        };
  test('wedding field metadata and external controlled values (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontWeddingsFormControls', lang);
    const name = page.getByRole('textbox', {name: t.name, exact: true});
    const phone = page.getByRole('textbox', {name: t.phone, exact: true});
    const email = page.getByRole('textbox', {name: t.email, exact: true});
    const message = page.getByRole('textbox', {name: t.message, exact: true});
    await expect(name).toHaveAttribute('id', 'vf-wname');
    await expect(name).toHaveAttribute('required', '');
    await expect(name).toHaveAttribute('autocomplete', 'name');
    await expect(phone).toHaveAttribute('id', 'vf-wphone');
    await expect(phone).toHaveAttribute('required', '');
    await expect(phone).toHaveAttribute('dir', 'ltr');
    await expect(phone).toHaveAttribute('autocomplete', 'tel');
    await expect(email).toHaveAttribute('type', 'email');
    await expect(email).toHaveAttribute('dir', 'ltr');
    await expect(email).toHaveAttribute('autocomplete', 'email');
    await expect(page.getByRole('textbox', {name: t.guests, exact: true})).toHaveAttribute(
      'inputmode',
      'numeric'
    );
    await expect(message).toHaveAttribute('id', 'vf-wmsg');
    await expect(message).toHaveAttribute('rows', '4');
    await expect(message).toHaveAccessibleDescription(t.hint);
    await page.getByRole('button', {name: 'Set supplied values'}).click();
    await expect(name).toHaveValue(lang === 'fa' ? 'مینا' : 'Mina');
    await expect(phone).toHaveValue('09120000000');
    await expect(email).toHaveValue('mina@example.com');
    await expect(page.locator('[data-test=changed]')).toHaveText('');
  });
  test(
    'wedding editing, select callbacks and supplied submission (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontWeddingsFormControls', lang);
      const values = {
        name: 'Sara',
        email: 'sara@example.com',
        phone: '۰۹۱۲ ۳۴۵ ۶۷۸۹',
        event: 'reception',
        guests: '۸۰',
        date: '2026-10-08',
        budget: 'large',
        message: 'A garden wedding'
      };
      for (const key of ['name', 'email', 'phone', 'guests', 'message']) {
        await page.getByRole('textbox', {name: t[key], exact: true}).fill(values[key]);
        await expect(page.locator('[data-test=changed]')).toHaveText(key);
      }
      await expect(page.locator('[data-test=metadata]')).toHaveText(
        JSON.stringify({value: values.phone, number: '09123456789', mobile: true})
      );
      for (const [id, key, label] of [
        ['vf-wtype', 'event', t.reception],
        ['vf-wbudget', 'budget', t.large]
      ]) {
        const trigger = page.locator('#' + id);
        await trigger.click();
        await page.getByRole('option', {name: label, exact: true}).click();
        await expect(trigger).toContainText(label);
        await expect(page.locator('[data-test=changed]')).toHaveText(key);
      }
      await expect(page.locator('[data-test=values]')).toHaveText(JSON.stringify(values));
      const send = page.getByRole('button', {name: t.send, exact: true});
      await send.focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-test=sent]')).toHaveText('1');
      await expect(page.locator('[data-test=submitted]')).toHaveText(JSON.stringify(values));
      await page.keyboard.press('Space');
      await send.click();
      await expect(page.locator('[data-test=sent]')).toHaveText('3');
    }
  );
  test('wedding supplied date language, minimum and selection (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontWeddingsFormControls', lang);
    await page
      .getByRole('button', {name: new RegExp(lang === 'fa' ? 'انتخاب از تقویم' : 'Choose a date')})
      .click();
    const grid = page.getByRole('grid');
    await expect(page.locator('.ag-cal__title')).toHaveText(
      lang === 'fa' ? /۱۴۰۵ مهر/ : /October 2026/
    );
    await expect(grid.locator('[data-selected]')).toHaveText(lang === 'fa' ? '۱۶' : '8');
    await expect(
      grid
        .locator('.ag-cal__cell[data-disabled]')
        .filter({hasText: new RegExp('^' + (lang === 'fa' ? '۱۲' : '4') + '$')})
    ).toHaveCount(1);
    expect(await scanAxe(page)).toEqual([]);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(grid).toBeHidden();
    await expect(page.locator('[data-test=changed]')).toHaveText('date');
    await expect(page.locator('[data-test=values]')).toContainText('"date":"2026-10-15"');
  });
  test(
    'wedding summary focuses required fields and errors clear (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontWeddingsFormControls', lang);
      await page.getByRole('checkbox', {name: 'Show validation'}).check();
      for (const [key, id] of [
        ['name', 'vf-wname'],
        ['phone', 'vf-wphone']
      ]) {
        const link = page
          .locator('#vf-wedding-errors')
          .getByRole('link', {name: t[key] + ': ' + t.error, exact: true});
        await expect(link).toHaveAttribute('href', '#' + id);
        await link.focus();
        await page.keyboard.press('Enter');
        const field = page.getByRole('textbox', {name: t[key], exact: true});
        await expect(field).toBeFocused();
        await expect(field).toHaveAttribute('aria-invalid', 'true');
        await expect(field).toHaveAccessibleDescription(t.error);
      }
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Show validation'}).uncheck();
      await expect(page.locator('#vf-wedding-errors')).toHaveCount(0);
      for (const key of ['name', 'phone'])
        await expect(page.getByRole('textbox', {name: t[key], exact: true})).not.toHaveAttribute(
          'aria-invalid',
          'true'
        );
    }
  );
  test('wedding busy recovery and compact accessibility (' + lang + ')', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await openStorefrontComponent(page, 'StorefrontWeddingsFormControls', lang);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('button', {name: 'Set supplied values'}).click();
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: 'Busy submission'}).check();
    const send = page.getByRole('button', {name: t.send, exact: true});
    await expect(send).toBeDisabled();
    await expect(send).toHaveClass(/ag-btn--loading/);
    await send.click({force: true});
    await expect(page.locator('[data-test=sent]')).toHaveText('0');
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: 'Busy submission'}).uncheck();
    await send.click();
    await expect(page.locator('[data-test=sent]')).toHaveText('1');
    await expect(page.locator('[data-test=submitted]')).toContainText('"guests":"80"');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
  });
}
