import {test, expect} from '@playwright/test';
import {
  expectStorefrontAccessible,
  openStorefrontComponent
} from '../../../../../e2e/component-test.mjs';

test('lines show the product code and removing one updates the order', async ({page}) => {
  await openStorefrontComponent(page, 'StorefrontPresentationOrder');
  const dialog = page.getByRole('dialog', {name: 'Order'});
  await expect(dialog.getByText('VF-7K2M4Q')).toBeVisible();
  await expect(dialog.getByText('VF-3P8R1T')).toBeVisible();
  await expect(dialog.getByText('Total')).toBeVisible();
  await dialog
    .getByRole('button', {name: /remove/i})
    .first()
    .click();
  await expect(dialog.getByText('VF-7K2M4Q')).toHaveCount(0);
});

test('hand over calls back; clearing shows the empty message without actions', async ({page}) => {
  await openStorefrontComponent(page, 'StorefrontPresentationOrder');
  const dialog = page.getByRole('dialog', {name: 'Order'});
  await dialog.getByRole('button', {name: 'Hand over'}).click();
  await expect(page.getByLabel('Handed over')).toHaveText('true');
  await dialog.getByRole('button', {name: 'Clear order'}).click();
  await expect(dialog.getByText('No designs in the order yet.')).toBeVisible();
  await expect(dialog.getByRole('button', {name: 'Hand over'})).toHaveCount(0);
});

test('Escape closes the dialog through onClose', async ({page}) => {
  await openStorefrontComponent(page, 'StorefrontPresentationOrder');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('passes axe in English and Persian', async ({page}) => {
  await expectStorefrontAccessible(page, 'StorefrontPresentationOrder');
});
