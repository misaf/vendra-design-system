import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test('a description list of its rows, skipping empty ones', async ({page}) => {
  await openComponent(page, 'DetailList');
  await expect(page.locator('dl dt')).toHaveText(['Order', 'Delivery', 'Total']);
  await expect(page.locator('dl dd')).toHaveText([
    'VN-10522',
    'Tomorrow, 09:00–12:00',
    '4,600,000 Toman'
  ]);
  await expect(page.locator('dt .ag-icon')).toHaveAttribute('aria-hidden', 'true');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'DetailList');
});
