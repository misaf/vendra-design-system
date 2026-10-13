import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test('phone keypad, left-to-right digits and a normalised mobile number', async ({page}) => {
  await openComponent(page, 'PhoneInput');
  const field = page.getByRole('textbox', {name: 'Phone'});
  await expect(field).toHaveAttribute('type', 'tel');
  await expect(field).toHaveAttribute('inputmode', 'tel');
  await expect(field).toHaveAttribute('dir', 'ltr');
  await field.fill('۰۹۱۲ ۱۱۱ ۲۲۳۳');
  await expect(page.locator('output[data-test=phone]')).toHaveText('09121112233 mobile');
  await field.fill('021-8888 1234');
  await expect(page.locator('output[data-test=phone]')).toHaveText('02188881234');
});

test('stays left to right on a Persian page', async ({page}) => {
  await openComponent(page, 'PhoneInput', 'fa');
  await expect(page.getByRole('textbox', {name: 'Phone'})).toHaveAttribute('dir', 'ltr');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'PhoneInput');
});
