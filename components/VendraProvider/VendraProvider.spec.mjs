import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test("navigate makes the components' links client-side", async ({page}) => {
  await openComponent(page, 'VendraProvider');
  const url = page.url();
  await page.getByRole('link', {name: 'Shop'}).click();
  await expect(page.locator('output[data-test=path]')).toHaveText('/shop');
  expect(page.url()).toBe(url);
});

test('locale picks the built-in wording, and messages override it', async ({page}) => {
  await openComponent(page, 'VendraProvider');
  await expect(page.getByRole('button', {name: 'بستن پیام'})).toBeVisible();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'VendraProvider');
});
