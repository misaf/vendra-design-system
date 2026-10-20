import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

test('queued toasts appear in a named region and close', async ({page}) => {
  await openComponent(page, 'ToastRegion');
  await page.getByRole('button', {name: 'Add'}).click();
  const region = page.getByRole('region', {name: 'Notifications'});
  const toast = region.getByRole('alertdialog');
  await expect(toast).toContainText('Added to your bag');
  await toast.getByRole('button', {name: 'Dismiss'}).click();
  await expect(region.getByRole('alertdialog')).toHaveCount(0);
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'ToastRegion');
  await page.getByRole('button', {name: 'Add'}).click();
  await expect(page.getByRole('alertdialog')).toBeVisible();
});
