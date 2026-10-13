import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test.beforeEach(({page}) => openComponent(page, 'Radio'));

test('its label names it and its description describes it', async ({page}) => {
  const classic = page.getByRole('radio', {name: 'Classic'});
  await expect(classic).toBeChecked();
  await expect(classic).toHaveAccessibleDescription('12 stems');
});

test('clicking the label selects it; a disabled one cannot be chosen', async ({page}) => {
  await page.getByText('Generous').click();
  await expect(page.getByRole('radio', {name: 'Generous'})).toBeChecked();
  await expect(page.getByRole('radio', {name: 'Grand'})).toBeDisabled();
  await page.getByText('Grand').click({force: true});
  await expect(page.getByRole('radio', {name: 'Generous'})).toBeChecked();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Radio');
});
