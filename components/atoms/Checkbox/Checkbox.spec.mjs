import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

test.beforeEach(({page}) => openComponent(page, 'Checkbox'));

test('the label is the target; Space toggles it', async ({page}) => {
  const card = page.getByRole('checkbox', {name: 'Add a card'});
  await page.getByText('Add a card').click();
  await expect(card).toBeChecked();
  await expect(page.locator('output[data-test=agreed]')).toHaveText('true');
  await card.focus();
  await page.keyboard.press('Space');
  await expect(card).not.toBeChecked();
});

test('an error makes it invalid and describes it; required is exposed', async ({page}) => {
  const terms = page.getByRole('checkbox', {name: 'I accept the terms'});
  await expect(terms).toHaveAttribute('aria-invalid', 'true');
  await expect(terms).toHaveAccessibleDescription('Accept the terms to continue');
  await expect(terms).toHaveAttribute('required', '');
});

test('a hint describes it; disabled cannot change', async ({page}) => {
  const wrap = page.getByRole('checkbox', {name: 'Gift wrap'});
  await expect(wrap).toHaveAccessibleDescription('Free');
  await expect(wrap).toBeChecked();
  await expect(wrap).toBeDisabled();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Checkbox');
});
