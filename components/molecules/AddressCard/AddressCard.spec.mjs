import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

test('edit and delete are named after the address; the default is marked', async ({page}) => {
  await openComponent(page, 'AddressCard');
  await expect(page.getByText('Default', {exact: true})).toBeVisible();
  await page.getByRole('button', {name: 'Edit Home'}).click();
  await expect(page.locator('output[data-test=action]')).toHaveText('edit home');
  await page.getByRole('button', {name: 'Delete Home'}).click();
  await expect(page.locator('output[data-test=action]')).toHaveText('delete home');
  await page.getByRole('button', {name: 'Set as default'}).click();
  await expect(page.locator('output[data-test=action]')).toHaveText('default office');
});

test('the phone stays left to right; names follow the page language', async ({page}) => {
  await openComponent(page, 'AddressCard', 'fa');
  await expect(page.getByText('0912 564 9438')).toHaveAttribute('dir', 'ltr');
  await expect(page.getByRole('button', {name: 'ویرایش Home'})).toBeVisible();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'AddressCard');
});
