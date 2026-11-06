import {test, expect} from '@playwright/test';
import {
  expectAccessible,
  openComponent
} from '../../../../../apps/storefront/_e2e/component-test.mjs';

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

for (const lang of ['en', 'fa']) {
  test(`keyboard tab order, submit and clear callbacks (${lang})`, async ({page}) => {
    await openComponent(page, 'SearchField', lang);
    const box = page.getByRole('searchbox', {name: 'Search the shop'});
    const orders = page.getByRole('searchbox', {name: 'Search orders'});
    const clear = page.locator('.ag-search__clear').first();
    const output = name => page.locator(`output[data-test="${name}"]`);
    await page.keyboard.press('Tab');
    await expect(box).toBeFocused();
    await expect(clear).toHaveAttribute('tabindex', '-1');
    await page.keyboard.press('Tab');
    await expect(orders).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(box).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(output('submitted')).toHaveText('peony');
    await expect(output('submissions')).toHaveText('1');
    await expect(output('clears')).toHaveText('0');
    await expect(box).toHaveValue('peony');
    await page.keyboard.press('Escape');
    await expect(box).toHaveValue('');
    await expect(box).toBeFocused();
    await expect(clear).toBeHidden();
    await expect(output('clears')).toHaveText('1');
    await expect(output('focused-on-clear')).toHaveText('true');
    await page.keyboard.press('Escape');
    await expect(output('clears')).toHaveText('1');
    await page.keyboard.type('rose');
    await clear.click();
    await expect(box).toHaveValue('');
    await expect(box).toBeFocused();
    await expect(output('clears')).toHaveText('2');
    await expect(output('submissions')).toHaveText('1');
    await expect(output('focused-on-clear')).toHaveText('true');
  });
}
