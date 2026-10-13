import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test('is plain text with its tone; uppercase in English only', async ({page}) => {
  await openComponent(page, 'Badge');
  const badge = page.getByText('Sold out');
  await expect(badge).toHaveClass(/ag-badge--danger/);
  await expect(badge).toHaveCSS('text-transform', 'uppercase');
  await expect(page.locator('[data-test=solid]')).toHaveClass(/ag-badge--solid/);
  await openComponent(page, 'Badge', 'fa');
  await expect(page.getByText('Sold out')).toHaveCSS('text-transform', 'none');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Badge');
});
