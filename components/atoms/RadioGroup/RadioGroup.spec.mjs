import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

// React Aria's RadioGroup.
test.beforeEach(({page}) => openComponent(page, 'RadioGroup'));

test('one Tab stop; arrows skip disabled radios; label alone names a radio', async ({page}) => {
  const group = page.getByRole('radiogroup', {name: 'Payment'});
  const card = group.getByRole('radio', {name: 'Card', exact: true});
  await expect(card).toBeChecked();
  await expect(card).toHaveAccessibleDescription('Transfer');
  await card.focus();
  await page.keyboard.press('ArrowDown');
  await expect(group.getByRole('radio', {name: 'WhatsApp'})).toBeChecked();
  await expect(page.locator('output[data-test=pay]')).toHaveText('wa');
  // Tab leaves the group: the radios are one stop.
  await page.keyboard.press('Tab');
  await expect(group.getByRole('radio', {name: 'Card', exact: true})).not.toBeFocused();
  await expect(group.locator('input:focus')).toHaveCount(0);
  await group.getByText('Card').click();
  await expect(page.locator('output[data-test=pay]')).toHaveText('card');
});

test('the error replaces the hint and describes the group, which is required and invalid', async ({
  page
}) => {
  const group = page.getByRole('radiogroup', {name: 'Gift wrap'});
  await expect(group).toHaveAccessibleDescription('Choose one');
  await expect(group).toHaveAttribute('aria-invalid', 'true');
  await expect(group).toHaveAttribute('aria-required', 'true');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'RadioGroup');
});
