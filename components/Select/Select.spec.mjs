import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

// React Aria's Select: a button and a listbox.
test('keyboard opens, skips disabled options, chooses and returns focus', async ({page}) => {
  await openComponent(page, 'Select');
  const trigger = page.locator('#city');
  await expect(trigger).toHaveText('Choose a city');
  await trigger.focus();
  await page.keyboard.press('ArrowDown');
  const list = page.getByRole('listbox');
  await expect(list).toBeVisible();
  await expect(page.getByRole('option', {name: 'Qom'})).toHaveAttribute('aria-disabled', 'true');
  await page.keyboard.press('End');
  await page.keyboard.press('Enter');
  await expect(list).toBeHidden();
  await expect(page.locator('output[data-test=city]')).toHaveText('Shiraz');
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveText('Shiraz');
  await trigger.click();
  await page.keyboard.press('Escape');
  await expect(list).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Select');
});
