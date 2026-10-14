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

test('onEvent receives the events the components report, in the contract’s shape', async ({
  page
}) => {
  await openComponent(page, 'VendraProvider');
  const events = async () =>
    JSON.parse(await page.locator('output[data-test=events]').textContent());
  await page.getByRole('button', {name: 'Remove occasion'}).click();
  await page.getByRole('button', {name: 'Clear all'}).click();
  await page.getByRole('button', {name: 'فا'}).click();
  // Pressing the language already chosen changes nothing, so it reports nothing.
  await page.getByRole('button', {name: 'فا'}).click();
  expect(await events()).toEqual([
    {event: 'filter', filter_id: 'occasion', action: 'remove'},
    {event: 'filter', action: 'clear'},
    {event: 'language_switch', to: 'fa'}
  ]);
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'VendraProvider');
});
