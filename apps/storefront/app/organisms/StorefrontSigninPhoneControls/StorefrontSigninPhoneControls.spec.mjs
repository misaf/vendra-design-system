import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../e2e/component-test.mjs';

for (const lang of ['en', 'fa']) {
  const label = lang === 'fa' ? 'شماره همراه' : 'Mobile number';
  const action = lang === 'fa' ? 'ارسال کد' : 'Send code';
  const error = lang === 'fa' ? 'این فیلد را بررسی کنید.' : 'Check this field.';
  test('phone controlled value and explicit callback (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontSigninPhoneControls', lang);
    const input = page.getByRole('textbox', {name: label, exact: true});
    await expect(input).toHaveAttribute('id', 'vf-phone');
    await expect(input).toHaveAttribute('dir', 'ltr');
    await expect(input).toHaveAttribute('autocomplete', 'tel');
    await expect(input).toHaveValue('09120000000');
    await input.fill('۰۹۱۲ ۳۴۵ ۶۷۸۹');
    await expect(input).toHaveValue('۰۹۱۲ ۳۴۵ ۶۷۸۹');
    await expect(page.locator('[data-test=changed]')).toHaveText(
      JSON.stringify({value: '۰۹۱۲ ۳۴۵ ۶۷۸۹', number: '09123456789', mobile: true})
    );
    const button = page.getByRole('button', {name: action, exact: true});
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-test=submitted]')).toHaveText('۰۹۱۲ ۳۴۵ ۶۷۸۹');
    await expect(page.locator('[data-test=count]')).toHaveText('1');
    await button.click();
    await expect(page.locator('[data-test=count]')).toHaveText('2');
  });
  test('phone validation summary targets input and clears (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontSigninPhoneControls', lang);
    const input = page.getByRole('textbox', {name: label, exact: true});
    await expect(page.locator('#vf-signin-errors')).toHaveCount(0);
    await page.getByRole('checkbox', {name: 'Show validation'}).check();
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    const summary = page.locator('#vf-signin-errors');
    const link = summary.getByRole('link', {name: error});
    await expect(link).toHaveAttribute('href', '#vf-phone');
    await link.focus();
    await page.keyboard.press('Enter');
    await expect(input).toBeFocused();
    await expect(input).toHaveAccessibleDescription(error);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: 'Show validation'}).uncheck();
    await expect(summary).toHaveCount(0);
    await expect(input).not.toHaveAttribute('aria-invalid', 'true');
    expect(await scanAxe(page)).toEqual([]);
  });
  test('phone compact layout and supplied value update (' + lang + ')', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await openStorefrontComponent(page, 'StorefrontSigninPhoneControls', lang);
    const input = page.getByRole('textbox', {name: label, exact: true});
    await expect(input).toHaveAttribute('placeholder', '0912 000 0000');
    await input.fill('+98 912 345 6789');
    await expect(input).toHaveValue('+98 912 345 6789');
    await expect(page.locator('[data-test=changed]')).toHaveText(
      JSON.stringify({value: '+98 912 345 6789', number: '09123456789', mobile: true})
    );
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    expect(await scanAxe(page)).toEqual([]);
  });
}
