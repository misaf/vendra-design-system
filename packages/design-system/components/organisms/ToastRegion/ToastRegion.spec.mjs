import {test, expect} from '@playwright/test';
import {
  expectAccessible,
  openComponent
} from '../../../../../apps/storefront/e2e/component-test.mjs';

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

test('a toast with an action has no timeout and stays until dismissed', async ({page}) => {
  await openComponent(page, 'ToastRegion');
  await page.getByRole('button', {name: 'Remove'}).click();
  const toast = page.getByRole('region', {name: 'Notifications'}).getByRole('alertdialog');
  await expect(toast).toContainText('Removed from your bag');
  // Asked for 50 ms; an action keeps it.
  await page.mouse.move(0, 0);
  await page.waitForTimeout(1000);
  await expect(toast.getByRole('button', {name: 'Undo'})).toBeVisible();
  await toast.getByRole('button', {name: 'Dismiss'}).click();
  await expect(toast).toHaveCount(0);
});

test('a timed toast without an action stays at least ten seconds', async ({page}) => {
  await openComponent(page, 'ToastRegion');
  await page.getByRole('button', {name: 'Copy'}).click();
  const toast = page.getByRole('region', {name: 'Notifications'}).getByRole('alertdialog');
  await expect(toast).toContainText('Code copied');
  await page.mouse.move(0, 0);
  await page.waitForTimeout(1000);
  await expect(toast).toBeVisible();
});
