import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

// React Aria's NumberField with − and + buttons.
for (const lang of ['en', 'fa'])
  test(`arrows, buttons and bounds (${lang})`, async ({page}) => {
    await openComponent(page, 'QuantityInput', lang);
    const count = page.getByRole('textbox', {name: 'Quantity'}).first();
    const result = page.locator('output[data-test=quantity]');
    await expect(count).toHaveValue(lang === 'fa' ? '۲' : '2');
    await count.focus();
    await page.keyboard.press('ArrowUp');
    await expect(result).toHaveText('3');
    await expect(page.getByRole('button', {name: 'More'})).toBeDisabled();
    await page.keyboard.press('Home');
    await expect(result).toHaveText('1');
    await expect(page.getByRole('button', {name: 'Fewer'})).toBeDisabled();
    await page.getByRole('button', {name: 'More'}).click();
    await expect(result).toHaveText('2');
  });

test('built-in names follow the page language; disabled turns everything off', async ({page}) => {
  await openComponent(page, 'QuantityInput', 'fa');
  const disabled = page.locator('.ag-qty').nth(1);
  await expect(disabled.getByRole('button', {name: 'کم کردن'})).toBeDisabled();
  await expect(disabled.getByRole('button', {name: 'افزودن'})).toBeDisabled();
  await expect(disabled.getByRole('textbox', {name: 'تعداد'})).toBeDisabled();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'QuantityInput');
});
