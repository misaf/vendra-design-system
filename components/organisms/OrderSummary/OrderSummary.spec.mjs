import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

test('a titled list of lines, linked where they have a page, then the sums', async ({page}) => {
  await openComponent(page, 'OrderSummary');
  await expect(page.getByRole('heading', {level: 2})).toHaveText('Your order');
  await expect(page.getByRole('listitem')).toHaveCount(2);
  await expect(page.getByRole('link', {name: 'Lavender Whisper'})).toHaveAttribute(
    'href',
    '#product'
  );
  await expect(page.locator('dt')).toHaveText(['Subtotal', 'Total']);
  await expect(page.locator('.ag-osum__sum--strong dd')).toHaveText('2,480,000 Toman');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'OrderSummary');
});
