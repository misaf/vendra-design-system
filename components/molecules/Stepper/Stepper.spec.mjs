import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

test('an ordered list; the current step is marked; done steps are buttons', async ({page}) => {
  await openComponent(page, 'Stepper');
  const steps = page.getByRole('list', {name: 'Checkout', exact: true});
  await expect(steps.getByRole('listitem')).toHaveCount(3);
  await expect(steps.locator('[aria-current=step]')).toContainText('Payment');
  await steps.getByRole('button', {name: 'Bag done'}).click();
  await expect(page.locator('output[data-test=current]')).toHaveText('0');
  await expect(steps.getByRole('button')).toHaveCount(0);
});

test('compact shows a caption and keeps the labels for screen readers', async ({page}) => {
  await openComponent(page, 'Stepper');
  await expect(page.locator('.ag-steps__caption')).toHaveText('Step 2 of 3 · Delivery');
  const compact = page.getByRole('list', {name: 'Checkout, compact'});
  await expect(compact.locator('[aria-current=step]')).toContainText('Delivery');
});

test('numbers follow formatNumber', async ({page}) => {
  await openComponent(page, 'Stepper', 'fa');
  await expect(page.locator('.ag-steps__item--current .ag-steps__dot').first()).toHaveText('۳');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Stepper');
});
