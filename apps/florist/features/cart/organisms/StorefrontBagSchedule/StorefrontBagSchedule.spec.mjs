import {test, expect} from '@playwright/test';
import {
  expectStorefrontAccessible,
  openStorefrontComponent
} from '../../../../e2e/component-test.mjs';

test('the section is named by its heading and day/time are controlled', async ({page}) => {
  await openStorefrontComponent(page, 'StorefrontBagSchedule');
  await expect(page.getByRole('region', {name: 'When should it arrive?'})).toBeVisible();
  const days = page.getByRole('radiogroup', {name: 'Day'});
  const times = page.getByRole('radiogroup', {name: 'Time'});
  const chosenTime = times.getByRole('radio', {checked: true});
  await expect(chosenTime).toHaveCount(0);
  await times.getByText('10:00–13:00').click();
  await expect(page.getByLabel('Chosen time')).toHaveText('tomorrow morning');
  await days.getByText('Wednesday').click();
  await expect(chosenTime).toHaveCount(0);
  await times.getByText('13:00–16:00').click();
  await expect(page.getByLabel('Chosen time')).toHaveText('wed afternoon');
});

test('unavailable days and times are disabled', async ({page}) => {
  await openStorefrontComponent(page, 'StorefrontBagSchedule');
  await expect(page.getByRole('radio', {name: /Today/})).toBeDisabled();
  await expect(page.getByRole('radio', {name: /16:00–19:00/})).toBeDisabled();
});

test('choosing a new time clears the availability warning', async ({page}) => {
  await openStorefrontComponent(page, 'StorefrontBagSchedule');
  await expect(page.getByText('Your delivery time is no longer available')).toBeVisible();
  await page.getByRole('radio', {name: '10:00–13:00'}).press('Space');
  await expect(page.getByLabel('Chosen time')).toHaveText('tomorrow morning');
  await expect(page.getByText('Your delivery time is no longer available')).toHaveCount(0);
});

test('passes axe in English and Persian', async ({page}) => {
  await expectStorefrontAccessible(page, 'StorefrontBagSchedule');
});
