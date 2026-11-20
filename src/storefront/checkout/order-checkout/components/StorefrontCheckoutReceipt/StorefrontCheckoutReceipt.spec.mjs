import {test, expect} from '@playwright/test';
import {
  expectStorefrontAccessible,
  openStorefrontComponent
} from '../../../../../../e2e/component-test.mjs';

test('confirming the changed amount hides the notice', async ({page}) => {
  await openStorefrontComponent(page, 'StorefrontCheckoutReceipt');
  await page.getByRole('button', {name: 'Confirm new amount'}).click();
  await expect(page.getByText('The total changed to 4,600,000 toman')).toHaveCount(0);
});

test('the receipt inputs are controlled and show their error', async ({page}) => {
  await openStorefrontComponent(page, 'StorefrontCheckoutReceipt');
  const last4 = page.getByLabel('Last four digits of your card');
  await last4.fill('12');
  await expect(last4).toHaveValue('12');
  await expect(page.getByText('Enter four digits')).toBeVisible();
  await last4.fill('1234');
  await expect(page.getByText('Enter four digits')).toHaveCount(0);
  await page.getByLabel('Transfer reference').fill('998877');
  await expect(page.getByLabel('Transfer reference')).toHaveValue('998877');
});

test('the Sheba number stays LTR and its copy button calls back', async ({page}) => {
  await openStorefrontComponent(page, 'StorefrontCheckoutReceipt', 'fa');
  await expect(page.locator('.vf-checkout-sheba bdi')).toHaveAttribute('dir', 'ltr');
  await page.locator('.vf-checkout-sheba + .ag-btn').click();
  await expect(page.getByLabel('Sheba copies')).toHaveText('1');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectStorefrontAccessible(page, 'StorefrontCheckoutReceipt');
});
