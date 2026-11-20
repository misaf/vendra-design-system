import {test, expect} from '@playwright/test';
import {
  expectStorefrontAccessible,
  openStorefrontComponent
} from '../../../../../../e2e/component-test.mjs';

test('the controlled method follows the choice and reveals the unavailable notice', async ({
  page
}) => {
  await openStorefrontComponent(page, 'StorefrontCheckoutMethods');
  const group = page.getByRole('radiogroup', {name: 'Payment method'});
  await expect(group.getByRole('radio', {name: /Card to card/})).toBeChecked();
  await expect(page.getByText('Online payment is unavailable right now')).toHaveCount(0);
  await group.getByText('Online bank gateway').click();
  await expect(page.getByLabel('Chosen method')).toHaveText('bank');
  await expect(page.getByRole('link', {name: 'Call the studio'})).toHaveAttribute(
    'href',
    'tel:+982612345678'
  );
});

test('a disabled method cannot be chosen; wallet hint and top-up stay available', async ({
  page
}) => {
  await openStorefrontComponent(page, 'StorefrontCheckoutMethods');
  await expect(page.getByRole('radio', {name: /Store balance/})).toBeDisabled();
  await expect(page.getByText('Your balance is 1,200,000 toman.')).toBeVisible();
  await expect(page.getByRole('link', {name: 'Top up balance'})).toHaveAttribute('href', '#top-up');
  await expect(page.getByText('Balance after this order')).toHaveCount(0);
});

test('passes axe in English and Persian', async ({page}) => {
  await expectStorefrontAccessible(page, 'StorefrontCheckoutMethods');
});
