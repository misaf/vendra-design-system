import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test('the card number in groups of four, left to right; copy gives the bare digits', async ({
  page,
  context
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await openComponent(page, 'PaymentCard', 'fa');
  const number = page.locator('.ag-pay__num');
  await expect(number).toHaveText('6037 9912 3456 7890');
  await expect(number).toHaveAttribute('dir', 'ltr');
  await page.getByRole('button', {name: 'کپی'}).click();
  await expect(page.locator('output[data-test=copied]')).toHaveText('6037991234567890');
  await expect(page.getByRole('button', {name: 'کپی شد'})).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('6037991234567890');
});

test('holder, bank and amount as a description list', async ({page}) => {
  await openComponent(page, 'PaymentCard');
  await expect(page.locator('dt')).toHaveText(['Card holder', 'Bank', 'Amount']);
  await expect(page.locator('dd')).toHaveText(['Vendra Florist', 'Melli', '4,600,000 Toman']);
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'PaymentCard');
});
