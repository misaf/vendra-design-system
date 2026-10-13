import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test('polite is a status, assertive an alert; both stay off screen', async ({page}) => {
  await openComponent(page, 'LiveRegion');
  const status = page.locator('#bag-status');
  await expect(status).toHaveAttribute('role', 'status');
  await expect(status).toHaveAttribute('aria-live', 'polite');
  await expect(status).toHaveAttribute('aria-atomic', 'true');
  const errors = page.locator('#errors');
  await expect(errors).toHaveAttribute('role', 'alert');
  await expect(errors).toHaveAttribute('aria-atomic', 'false');
  await expect(status).toHaveCSS('position', 'absolute');
});

test('stays mounted and changes its text to announce', async ({page}) => {
  await openComponent(page, 'LiveRegion');
  const status = page.locator('#bag-status');
  await expect(status).toHaveText('');
  await page.getByRole('button', {name: 'Add to bag'}).click();
  await expect(status).toHaveText('1 in your bag');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'LiveRegion');
});
