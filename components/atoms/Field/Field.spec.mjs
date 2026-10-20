import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

// useField and FieldMessage: the wiring every form control shares.
test.beforeEach(({page}) => openComponent(page, 'Field'));

test('a hint describes the control', async ({page}) => {
  const note = page.getByRole('textbox', {name: 'Card note'});
  await expect(note).toHaveAccessibleDescription('Up to 200 characters');
  await expect(note).not.toHaveAttribute('aria-invalid');
});

test('an error replaces the hint, marks the control invalid and is its error message', async ({
  page
}) => {
  const phone = page.getByRole('textbox', {name: 'Phone'});
  await expect(phone).toHaveAccessibleDescription('Enter a mobile number');
  await expect(phone).toHaveAttribute('aria-invalid', 'true');
  await expect(phone).toHaveAttribute('aria-errormessage', 'phone-hint');
  await expect(page.locator('#phone-hint')).toHaveClass(/ag-field__hint--error/);
});

test('no message, no description', async ({page}) => {
  await expect(page.getByRole('textbox', {name: 'Name'})).not.toHaveAttribute('aria-describedby');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Field');
});
