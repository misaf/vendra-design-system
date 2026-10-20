import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

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
      const row = await page.locator('.ag-promo__row').boundingBox();
      const shell = await page.locator('.ag-promo__row .ag-input').boundingBox();
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
