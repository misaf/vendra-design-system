import {test, expect} from '@playwright/test';
import {
  expectStorefrontAccessible,
  openStorefrontComponent
} from '../../../../e2e/component-test.mjs';

test('saving an invalid draft shows the alert and error summary inside the dialog', async ({
  page
}) => {
  await openStorefrontComponent(page, 'StorefrontAccountEditorDialog');
  const dialog = page.getByRole('dialog', {name: 'Edit address'});
  await dialog.getByRole('button', {name: 'Save address'}).click();
  await expect(dialog.getByText('We could not save your changes on this device')).toBeVisible();
  await expect(dialog.getByRole('link', {name: 'Enter a label'})).toHaveAttribute(
    'href',
    '#vf-address-label'
  );
});

test('a valid draft saves through the save callback and closes', async ({page}) => {
  await openStorefrontComponent(page, 'StorefrontAccountEditorDialog');
  const dialog = page.getByRole('dialog', {name: 'Edit address'});
  await dialog.getByLabel('Label').fill('Home');
  await dialog.getByRole('button', {name: 'Save address'}).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByLabel('Saved label')).toHaveText('Home');
});

test('cancel closes through onClose', async ({page}) => {
  await openStorefrontComponent(page, 'StorefrontAccountEditorDialog', 'fa');
  await page
    .getByRole('dialog', {name: 'ویرایش نشانی'})
    .getByRole('button', {name: 'انصراف'})
    .click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('passes axe in English and Persian', async ({page}) => {
  await expectStorefrontAccessible(page, 'StorefrontAccountEditorDialog');
});
