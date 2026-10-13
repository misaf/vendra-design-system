import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test('a heading at its level, the body and the actions; the icon is decorative', async ({page}) => {
  await openComponent(page, 'EmptyState');
  await expect(page.getByRole('heading', {level: 1})).toHaveText('Nothing savedyet');
  await expect(page.getByText('Tap the heart on a design to keep it here.')).toBeVisible();
  await expect(page.getByRole('link', {name: 'Browse the shop'})).toBeVisible();
  await expect(page.locator('.ag-empty__icon .ag-icon')).toHaveAttribute('aria-hidden', 'true');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'EmptyState');
});
