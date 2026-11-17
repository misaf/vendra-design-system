import {test, expect} from '@playwright/test';
import {expectStorefrontAccessible, openStorefrontComponent} from '../../../e2e/component-test.mjs';

test('placing shows the processing status', async ({page}) => {
  await openStorefrontComponent(page, 'StorefrontCheckoutSubmission');
  await expect(page.getByRole('status').filter({hasText: 'Placing your order'})).toHaveCount(0);
  await page.getByRole('button', {name: 'Place order'}).click();
  await expect(page.getByText('Placing your order…')).toBeVisible();
});

test('a failure offers retry and another method through their callbacks', async ({page}) => {
  await openStorefrontComponent(page, 'StorefrontCheckoutSubmission');
  await page.getByRole('button', {name: 'Fail the request'}).click();
  await expect(page.getByRole('alert')).toContainText('We could not place your order');
  await page.getByRole('button', {name: 'Choose another method'}).click();
  await expect(page.getByLabel('Last action')).toHaveText('other');
  await page.getByRole('button', {name: 'Try again'}).click();
  await expect(page.getByRole('alert')).toHaveCount(0);
});

test('WhatsApp opens a new tab safely and back calls its callback', async ({page}) => {
  await openStorefrontComponent(page, 'StorefrontCheckoutSubmission');
  const whatsapp = page.getByRole('link', {name: 'Send the receipt on WhatsApp'});
  await expect(whatsapp).toHaveAttribute('target', '_blank');
  await expect(whatsapp).toHaveAttribute('rel', 'noopener noreferrer');
  await page.getByRole('link', {name: 'Back to delivery'}).click();
  await expect(page.getByLabel('Last action')).toHaveText('back');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectStorefrontAccessible(page, 'StorefrontCheckoutSubmission');
});
