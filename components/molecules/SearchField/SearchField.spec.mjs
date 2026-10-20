import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

test('a labelled search box: Enter submits, Esc and the clear button empty it', async ({page}) => {
  await openComponent(page, 'SearchField');
  const box = page.getByRole('searchbox', {name: 'Search the shop'});
  await expect(box).toHaveValue('peony');
  await expect(box).toHaveAccessibleDescription('Name, colour or code');
  await box.press('Enter');
  await expect(page.locator('output[data-test=submitted]')).toHaveText('peony');
  await box.press('Escape');
  await expect(page.locator('output[data-test=query]')).toHaveText('');
  await box.fill('rose');
  await page.getByRole('button', {name: 'Clear search'}).first().click();
  await expect(box).toHaveValue('');
  await expect(box).toBeFocused();
});

test('the clear button is named in the page language; an error marks it invalid', async ({
  page
}) => {
  await openComponent(page, 'SearchField', 'fa');
  await expect(page.getByRole('button', {name: 'پاک کردن جستجو'}).first()).toBeAttached();
  const orders = page.getByRole('searchbox', {name: 'Search orders'});
  await expect(orders).toHaveAttribute('aria-invalid', 'true');
  await expect(orders).toHaveAccessibleDescription('Nothing matches');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'SearchField');
});
