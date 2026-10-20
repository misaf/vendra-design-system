import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

test('variant and padding; other props reach the element', async ({page}) => {
  await openComponent(page, 'Card');
  await expect(page.locator('[data-test=default]')).toHaveCSS('padding-top', '24px');
  const sunken = page.locator('[data-test=sunken]');
  await expect(sunken).toHaveClass(/ag-card--sunken/);
  await expect(sunken).toHaveCSS('padding-top', '16px');
  await expect(page.getByRole('region', {name: 'Summary'})).toHaveCSS('padding-top', '8px');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Card');
});
