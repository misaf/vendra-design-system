import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

test('a named switch that toggles by click, Space and its label', async ({page}) => {
  await openComponent(page, 'Switch');
  const stock = page.getByRole('switch', {name: 'In stock only'});
  await expect(stock).not.toBeChecked();
  await page.getByText('In stock only').click();
  await expect(stock).toBeChecked();
  await expect(page.locator('output[data-test=on]')).toHaveText('true');
  await stock.focus();
  await page.keyboard.press('Space');
  await expect(stock).not.toBeChecked();
});

test('disabled keeps its state and cannot change', async ({page}) => {
  await openComponent(page, 'Switch');
  const sms = page.getByRole('switch', {name: 'SMS reminders'});
  await expect(sms).toBeChecked();
  await expect(sms).toBeDisabled();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Switch');
});
