import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';

for (const lang of ['en', 'fa']) {
  const label = lang === 'fa' ? 'کد تأیید' : 'Verification code';
  const action = lang === 'fa' ? 'تأیید کد' : 'Verify code';
  const error = lang === 'fa' ? 'این فیلد را بررسی کنید.' : 'Check this field.';
  test('code controlled value and explicit callback (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontSigninCodeControls', lang);
    const input = page.getByRole('textbox', {name: label, exact: true});
    await expect(input).toHaveAttribute('id', 'vf-code');
    await expect(input).toHaveAttribute('dir', 'ltr');
    await expect(input).toHaveAttribute('autocomplete', 'one-time-code');
    await expect(input).toHaveValue('12');
    await input.fill('۱۲۳');
    await expect(input).toHaveValue('123');
    await expect(page.locator('[data-test=changed]')).toHaveText('123');
    await expect(page.locator('[data-test=complete-count]')).toHaveText('0');
    const button = page.getByRole('button', {name: action, exact: true});
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-test=submitted]')).toHaveText('123');
    await expect(page.locator('[data-test=count]')).toHaveText('1');
    await button.click();
    await expect(page.locator('[data-test=count]')).toHaveText('2');
  });
  test('code validation summary targets input and clears (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontSigninCodeControls', lang);
    const input = page.getByRole('textbox', {name: label, exact: true});
    await expect(page.locator('#vf-code-errors')).toHaveCount(0);
    await page.getByRole('checkbox', {name: 'Show validation'}).check();
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    const summary = page.locator('#vf-code-errors');
    const link = summary.getByRole('link', {name: error});
    await expect(link).toHaveAttribute('href', '#vf-code');
    await link.focus();
    await page.keyboard.press('Enter');
    await expect(input).toBeFocused();
    await expect(input).toHaveAccessibleDescription(/(Check this field|این فیلد را بررسی کنید)/);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: 'Show validation'}).uncheck();
    await expect(summary).toHaveCount(0);
    await expect(input).not.toHaveAttribute('aria-invalid', 'true');
    expect(await scanAxe(page)).toEqual([]);
  });
  test('code five-digit completion is distinct from verify (' + lang + ')', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await openStorefrontComponent(page, 'StorefrontSigninCodeControls', lang);
    const input = page.getByRole('textbox', {name: label, exact: true});
    await expect(input).toHaveAttribute('maxlength', '5');
    await expect(input).toHaveAttribute('inputmode', 'numeric');
    await expect(input).toHaveAccessibleDescription(
      lang === 'fa' ? 'کد پیامک‌شده را وارد کنید.' : 'Use the code sent by SMS.'
    );
    await input.fill('۱۲۳۴۵');
    await expect(input).toHaveValue('12345');
    await expect(page.locator('[data-test=completed]')).toHaveText('12345');
    await expect(page.locator('[data-test=complete-count]')).toHaveText('1');
    await expect(page.locator('[data-test=count]')).toHaveText('0');
    await input.fill('12a۳');
    await expect(input).toHaveValue('123');
    await expect(page.locator('[data-test=complete-count]')).toHaveText('1');
    await page.getByRole('button', {name: action, exact: true}).click();
    await expect(page.locator('[data-test=submitted]')).toHaveText('123');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    expect(await scanAxe(page)).toEqual([]);
  });
}
