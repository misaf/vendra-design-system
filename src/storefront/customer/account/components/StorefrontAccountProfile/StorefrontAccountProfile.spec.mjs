import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../../e2e/component-test.mjs';

for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          name: 'نام شما',
          phone: 'شماره همراه',
          phoneHint: 'برای تغییر شماره با ما تماس بگیرید.',
          email: 'ایمیل',
          emailHint: 'برای رسید سفارش.',
          error: 'ایمیل معتبر وارد کنید.',
          language: 'زبان ترجیحی',
          sms: 'دریافت پیامک',
          save: 'ذخیره پروفایل'
        }
      : {
          name: 'Your name',
          phone: 'Mobile number',
          phoneHint: 'Contact us to change your number.',
          email: 'Email',
          emailHint: 'For order receipts.',
          error: 'Enter a valid email.',
          language: 'Preferred language',
          sms: 'Receive SMS updates',
          save: 'Save profile'
        };
  test(
    'profile controlled edits, language and SMS save callback (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontAccountProfile', lang);
      const name = page.getByRole('textbox', {name: t.name, exact: true});
      const email = page.getByRole('textbox', {name: t.email, exact: true});
      await expect(name).toHaveValue('Mina');
      await expect(name).toHaveAttribute('id', 'vf-pname');
      await expect(name).toHaveAttribute('autocomplete', 'name');
      await expect(email).toHaveAttribute('id', 'vf-pemail');
      await expect(email).toHaveAttribute('type', 'email');
      await expect(email).toHaveAttribute('dir', 'ltr');
      await expect(email).toHaveAccessibleDescription(t.emailHint);
      await name.fill('مینا رضایی');
      await email.fill('new@example.test');
      await page.getByRole('button', {name: new RegExp(t.language)}).click();
      await page.getByRole('option', {name: 'English', exact: true}).click();
      await expect(page.getByRole('button', {name: new RegExp(t.language)})).toContainText(
        'English'
      );
      const sms = page.getByRole('switch', {name: t.sms});
      await expect(sms).toBeChecked();
      await sms.focus();
      await page.keyboard.press('Space');
      await expect(sms).not.toBeChecked();
      const save = page.getByRole('button', {name: t.save});
      await save.focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-test=saved]')).toHaveText(
        JSON.stringify({name: 'مینا رضایی', email: 'new@example.test', language: 'en', sms: false})
      );
      await expect(page.locator('[data-test=count]')).toHaveText('1');
      await save.click();
      await expect(page.locator('[data-test=count]')).toHaveText('2');
    }
  );
  test('profile invalid email summary focuses field and clears (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontAccountProfile', lang);
    const email = page.getByRole('textbox', {name: t.email, exact: true});
    await expect(page.locator('#vf-profile-errors')).toHaveCount(0);
    await page.getByRole('checkbox', {name: 'Email error'}).check();
    await expect(email).toHaveAttribute('aria-invalid', 'true');
    await expect(email).toHaveAccessibleDescription(t.error);
    const link = page.locator('#vf-profile-errors').getByRole('link', {name: t.error});
    await expect(link).toHaveAttribute('href', '#vf-pemail');
    await link.focus();
    await page.keyboard.press('Enter');
    await expect(email).toBeFocused();
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: 'Email error'}).uncheck();
    await expect(page.locator('#vf-profile-errors')).toHaveCount(0);
    await expect(email).not.toHaveAttribute('aria-invalid', 'true');
    await expect(email).toHaveAccessibleDescription(t.emailHint);
    expect(await scanAxe(page)).toEqual([]);
  });
  test(
    'profile phone stays disabled and compact layout is contained (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      await openStorefrontComponent(page, 'StorefrontAccountProfile', lang);
      const phone = page.getByRole('textbox', {name: t.phone, exact: true});
      await expect(phone).toHaveAttribute('id', 'vf-pphone');
      await expect(phone).toHaveAttribute('dir', 'ltr');
      await expect(phone).toBeDisabled();
      await expect(phone).toHaveValue('09123456789');
      await expect(phone).toHaveAccessibleDescription(t.phoneHint);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      expect(await scanAxe(page)).toEqual([]);
    }
  );
}
