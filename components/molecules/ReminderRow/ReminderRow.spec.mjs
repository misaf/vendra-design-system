import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

test('controls are named after the person; pausing hides "Send flowers"', async ({page}) => {
  await openComponent(page, 'ReminderRow');
  await expect(page.getByRole('link', {name: 'Send flowers'})).toHaveAttribute('href', '#shop');
  const toggle = page.getByRole('switch', {name: 'Reminder for Sara'});
  await expect(toggle).toBeChecked();
  await page.getByRole('button', {name: 'Edit reminder for Sara'}).click();
  await expect(page.locator('output[data-test=action]')).toHaveText('edit');
  // The visible track is the target; the switch input itself sits under it.
  await page.locator('.ag-rem__controls .ag-switch').click();
  await expect(toggle).not.toBeChecked();
  await expect(page.getByText('Paused')).toBeVisible();
  await expect(page.getByRole('link', {name: 'Send flowers'})).toHaveCount(0);
});

test('the date tile is decorative (the date is also in the text)', async ({page}) => {
  await openComponent(page, 'ReminderRow');
  await expect(page.locator('.ag-rem__tile')).toHaveAttribute('aria-hidden', 'true');
  await expect(page.locator('.ag-rem__meta')).toContainText('12 Oct');
});

test('wording follows the page language', async ({page}) => {
  await openComponent(page, 'ReminderRow', 'fa');
  await expect(page.getByRole('switch', {name: 'یادآور برای Sara'})).toBeVisible();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'ReminderRow');
});
