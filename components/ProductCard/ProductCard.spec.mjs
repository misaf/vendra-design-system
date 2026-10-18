import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test('the name is the one link, named with the price; the whole card is its target', async ({
  page
}) => {
  await openComponent(page, 'ProductCard');
  const link = page.getByRole('link', {name: 'Lavender Whisper — 490,000 Toman'});
  await expect(link).toHaveAttribute('href', '#lavender');
  // The link's ::after stretches over the card, so the photo opens it too.
  const card = await page.locator('.ag-product').first().boundingBox();
  const target = await link.evaluate(el => {
    const after = getComputedStyle(el, '::after');
    return after.position + ' ' + after.inset;
  });
  expect(target).toContain('absolute');
  expect(card.height).toBeGreaterThan(200);
});

test('save toggles, apart from the link; stock shows unless in stock', async ({page}) => {
  await openComponent(page, 'ProductCard');
  const save = page.getByRole('button', {name: 'Save'});
  await expect(save).toHaveAttribute('aria-pressed', 'false');
  await save.click();
  await expect(save).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.ag-product').first()).toContainText('Only 2 left');
  await expect(page.locator('.ag-product').nth(1).locator('.ag-stock')).toHaveCount(0);
  await expect(page.locator('.ag-product').first().locator('s')).toContainText('560,000 Toman');
});

test('without href the name is a button', async ({page}) => {
  await openComponent(page, 'ProductCard');
  await page.getByRole('button', {name: /Garden Rose/}).click();
  await expect(page.locator('output[data-test=opened]')).toHaveText('garden');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'ProductCard');
});

for (const lang of ['en', 'fa']) {
  test(`named designs keep their code and stock readable in a narrow card (${lang})`, async ({
    page
  }) => {
    await openComponent(page, 'ProductCard', lang);
    await page.addStyleTag({content: '.ag-product--with-code{inline-size:160px}'});
    const card = page.locator('.ag-product--with-code');
    const code = card.locator('.ag-product__code');
    await expect(card.getByRole('link')).toHaveAccessibleName(/VF-7K2M4Q/);
    await expect(code).toHaveText('VF-7K2M4Q');
    await expect(code).toHaveCSS('direction', 'ltr');
    await expect(card.locator('.ag-stock')).toContainText(lang === 'fa' ? 'ناموجود' : 'Sold out');
    const bounds = await card.boundingBox();
    for (const selector of ['.ag-product__name', '.ag-product__code', '.ag-product__price']) {
      const text = await card.locator(selector).boundingBox();
      expect(text.x).toBeGreaterThanOrEqual(bounds.x - 1);
      expect(text.x + text.width).toBeLessThanOrEqual(bounds.x + bounds.width + 1);
    }
    await card.getByRole('link').focus();
    await expect(card.getByRole('link')).toBeFocused();
  });
}
