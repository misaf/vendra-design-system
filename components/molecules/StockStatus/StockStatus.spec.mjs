import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

for (const [lang, lines] of [
  ['en', ['In stock', 'Only 2 left', 'Back on 12 October', 'Back soon', 'Sold out']],
  ['fa', ['موجود', 'فقط ۲ عدد مانده', 'موجود از ۲۰ مهر', 'به‌زودی موجود می‌شود', 'ناموجود']]
])
  test(`each status in words, with Persian digits and Shamsi dates (${lang})`, async ({page}) => {
    await openComponent(page, 'StockStatus', lang);
    await expect(page.locator('.ag-stock')).toHaveText(lines);
    await expect(page.locator('.hidden-in-stock')).toHaveCount(0);
  });

test('the icons are decorative; only they take the status colour', async ({page}) => {
  await openComponent(page, 'StockStatus');
  await expect(page.locator('.ag-stock__icon').first()).toHaveAttribute('aria-hidden', 'true');
  const low = page.locator('.ag-stock--low');
  const icon = await low.locator('.ag-stock__icon').evaluate(el => getComputedStyle(el).color);
  const words = await low.evaluate(el => getComputedStyle(el).color);
  expect(icon).not.toBe(words);
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'StockStatus');
});
