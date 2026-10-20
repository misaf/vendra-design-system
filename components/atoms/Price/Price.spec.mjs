import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

for (const [lang, said] of [
  ['en', 'Was 560,000 Toman Now 490,000 Toman'],
  ['fa', 'قیمت قبلی 560,000 Toman قیمت فعلی 490,000 Toman']
])
  test(`a reduced price says which is which (${lang})`, async ({page}) => {
    await openComponent(page, 'Price', lang);
    const price = page.locator('.reduced');
    // Screen readers read the hidden words; the strikethrough alone says nothing to them.
    await expect(price).toHaveText(said);
    await expect(price.locator('s')).toHaveCSS('text-decoration-line', 'line-through');
  });

test('a plain price is only the amount, at its size', async ({page}) => {
  await openComponent(page, 'Price');
  const plain = page.locator('.plain');
  await expect(plain).toHaveText('2,400,000 Toman');
  await expect(plain).toHaveCSS('font-size', '22px');
  await expect(plain).toHaveCSS('font-variant-numeric', 'tabular-nums');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Price');
});
