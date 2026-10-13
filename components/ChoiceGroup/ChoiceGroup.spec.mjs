import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

// ChoiceGroup and ChoiceTile: React Aria's radiogroup drawn as tiles.
test('one Tab stop; arrows move and select, skipping disabled tiles', async ({page}) => {
  await openComponent(page, 'ChoiceGroup');
  const group = page.getByRole('radiogroup', {name: 'Delivery time'});
  const morning = group.getByRole('radio', {name: 'Morning'});
  const evening = group.getByRole('radio', {name: 'Evening'});
  await expect(morning).toBeChecked();
  await expect(group.getByRole('radio', {name: 'Noon'})).toBeDisabled();
  await morning.focus();
  await page.keyboard.press('ArrowDown');
  await expect(evening).toBeFocused();
  await expect(evening).toBeChecked();
  await expect(page.locator('output[data-test=slot]')).toHaveText('evening');
  // The description is read after the name, not as part of it.
  await expect(evening).toHaveAccessibleDescription('17:00–20:00');
  // Tab leaves the group: one Tab stop for the whole set.
  await page.keyboard.press('Tab');
  expect(await group.evaluate(el => el.contains(document.activeElement))).toBe(false);
});

test('clicking a tile selects it', async ({page}) => {
  await openComponent(page, 'ChoiceGroup');
  await page.getByText('Evening').click();
  await expect(page.locator('output[data-test=slot]')).toHaveText('evening');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'ChoiceGroup');
});
