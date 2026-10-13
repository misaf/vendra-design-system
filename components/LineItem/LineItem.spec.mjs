import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test('a bag row changes quantity and removes itself', async ({page}) => {
  await openComponent(page, 'LineItem');
  await expect(page.locator('.ag-line__price').first()).toHaveText('2400000 Toman');
  await page.getByRole('button', {name: 'More'}).click();
  await expect(page.locator('.ag-line__price').first()).toHaveText('4800000 Toman');
  await page.getByRole('button', {name: 'Remove'}).first().click();
  await expect(page.getByText('Lavender Whisper')).toHaveCount(0);
});

test('a summary row shows ×quantity; an unavailable one hides its price and says so', async ({
  page
}) => {
  await openComponent(page, 'LineItem');
  await expect(page.locator('.ag-line--sm .ag-line__qty')).toHaveText('×2');
  const gone = page.locator('.ag-line--unavailable');
  await expect(gone).toContainText('No longer available');
  await expect(gone.locator('.ag-line__price')).toHaveCount(0);
  await expect(gone).toHaveAttribute('aria-busy', 'true');
});

test('built-in wording follows the page language', async ({page}) => {
  await openComponent(page, 'LineItem', 'fa');
  await expect(page.getByText('دیگر موجود نیست')).toBeVisible();
  await expect(page.getByRole('button', {name: 'حذف'}).first()).toBeVisible();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'LineItem');
});
