import {test, expect} from '@playwright/test';
import {
  expectAccessible,
  openComponent
} from '../../../../../apps/storefront/e2e/component-test.mjs';

for (const [lang, label, apply, remove, refused] of [
  ['en', 'Promo code', 'Apply', 'Remove code', 'We don’t recognise that code.'],
  ['fa', 'کد تخفیف', 'اعمال', 'حذف کد', 'این کد معتبر نیست.']
])
  test(`a refused code says why and keeps focus in the field (${lang})`, async ({page}) => {
    await openComponent(page, 'PromoCodeField', lang);
    const field = page.getByRole('textbox', {name: label});
    await expect(field).toHaveAttribute('dir', 'ltr');
    await field.fill('NOPE');
    await page.getByRole('button', {name: apply}).click();
    await expect(field).toHaveAccessibleDescription(refused);
    await expect(field).toHaveAttribute('aria-invalid', 'true');
    await expect(field).toBeFocused();
    // An applied code replaces the field with its status and Remove, which takes focus.
    await field.fill(' welcome10 ');
    await field.press('Enter');
    await expect(page.getByRole('status')).toHaveText(new RegExp('WELCOME10 · 10% off'));
    await expect(page.getByRole('button', {name: remove})).toBeFocused();
    await expect(page.locator('[data-test=submitted]')).toHaveText('0');
    // Removing it brings the field back, focused.
    await page.getByRole('button', {name: remove}).click();
    await expect(page.getByRole('textbox', {name: label})).toBeFocused();
  });

for (const [lang, reveal, label, remove] of [
  ['en', 'Have a promo code?', 'Promo code', 'Remove code'],
  ['fa', 'کد تخفیف دارید؟', 'کد تخفیف', 'حذف کد']
])
  test(`a collapsible field opens from its disclosure and focuses the input (${lang})`, async ({
    page
  }) => {
    await openComponent(page, 'PromoCodeField', lang);
    const panel = page.locator('#ag-promo-more-panel');
    const toggle = page.getByRole('button', {name: reveal});
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toHaveAttribute('aria-controls', 'ag-promo-more-panel');
    await expect(panel).toBeHidden();
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const field = panel.getByRole('textbox', {name: label});
    await expect(field).toBeFocused();
    // An applied code shows its status and Remove; removing it leaves the field open and focused.
    await field.fill('WELCOME10');
    await field.press('Enter');
    await expect(page.getByRole('status')).toHaveText(new RegExp('WELCOME10'));
    await page.getByRole('button', {name: remove}).click();
    await expect(page.locator('#ag-promo-more')).toBeFocused();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    // Pressing the disclosure again tucks the field away.
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(panel).toBeHidden();
    await expect(page.locator('[data-test=submitted-more]')).toHaveText('0');
  });

test('a refusal or an applied code reopens a field tucked away while it was checked', async ({
  page
}) => {
  await openComponent(page, 'PromoCodeField');
  const panel = page.locator('#ag-promo-more-panel');
  const toggle = page.getByRole('button', {name: 'Have a promo code?'});
  const field = page.locator('#ag-promo-more');
  await toggle.click();
  await field.fill('NOPE');
  await field.press('Enter');
  await toggle.click();
  await expect(panel).toBeHidden();
  // The refusal shows the field again, says why and takes focus.
  await expect(panel).toBeVisible();
  await expect(field).toHaveAccessibleDescription('We don’t recognise that code.');
  await expect(field).toBeFocused();
  await field.fill('WELCOME10');
  await field.press('Enter');
  await toggle.click();
  await expect(page.getByRole('status')).toHaveText(new RegExp('WELCOME10'));
  // Remove brings the field back open, not tucked away.
  await page.getByRole('button', {name: 'Remove code'}).click();
  await expect(field).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
});

test('an empty field applies nothing', async ({page}) => {
  await openComponent(page, 'PromoCodeField');
  await page.getByRole('button', {name: 'Apply'}).click();
  await expect(page.getByRole('textbox', {name: 'Promo code'})).not.toHaveAttribute(
    'aria-invalid',
    'true'
  );
  await expect(page.getByRole('status')).toHaveCount(0);
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'PromoCodeField');
});

test.describe('narrow touch field', () => {
  test.use({viewport: {width: 320, height: 720}, hasTouch: true});
  for (const [lang, label, apply] of [
    ['en', 'Promo code', 'Apply'],
    ['fa', 'کد تخفیف', 'اعمال']
  ]) {
    test(`the input and action fit without horizontal overflow (${lang})`, async ({page}) => {
      await openComponent(page, 'PromoCodeField', lang);
      await page.evaluate(() => document.fonts.ready);
      const field = page.getByRole('textbox', {name: label});
      const button = page.getByRole('button', {name: apply, exact: true});
      const row = await page.locator('.ag-promo__row').first().boundingBox();
      const shell = await page.locator('.ag-promo__row .ag-input').first().boundingBox();
      expect(shell.width).toBeLessThanOrEqual(row.width);
      expect((await button.boundingBox()).height).toBeGreaterThanOrEqual(44);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        320
      );
      await field.fill('WELCOME10');
      await field.press('Tab');
      await expect(button).toBeFocused();
      await button.press('Enter');
      await expect(page.getByRole('status')).toContainText('WELCOME10');
    });
  }
});
