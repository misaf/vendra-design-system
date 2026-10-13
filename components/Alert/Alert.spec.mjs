import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test('danger and warning interrupt (alert); the rest wait (status)', async ({page}) => {
  await openComponent(page, 'Alert');
  await expect(page.getByRole('alert')).toContainText('Payment failed');
  await expect(page.getByRole('status').first()).toContainText('Order placed');
  await expect(page.getByRole('alert').getByRole('link', {name: 'Try again'})).toBeVisible();
});

test('the close button is named in the page language and dismisses it', async ({page}) => {
  await openComponent(page, 'Alert', 'fa');
  await page.getByRole('button', {name: 'بستن'}).click();
  await expect(page.getByText('Same-day delivery ends at 18:00.')).toHaveCount(0);
});

test('icon={false} leaves the icon out', async ({page}) => {
  await openComponent(page, 'Alert');
  await expect(page.locator('.ag-alert--info .ag-alert__icon')).toHaveCount(0);
  await expect(page.locator('.ag-alert--success .ag-alert__icon')).toHaveCount(1);
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Alert');
});
