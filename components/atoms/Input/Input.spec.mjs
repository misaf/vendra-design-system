import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

test.beforeEach(({page}) => openComponent(page, 'Input'));

test('label, hint and onChange events', async ({page}) => {
  const field = page.getByRole('textbox', {name: 'Note'});
  await expect(field).toHaveAttribute('id', 'note');
  await expect(field).toHaveAttribute('aria-describedby', 'note-hint');
  await expect(field).toHaveAccessibleDescription('Optional');
  await field.fill('Roses');
  await expect(page.locator('output[data-test=note]')).toHaveText('Roses');
});

test('an error marks the field invalid and describes it', async ({page}) => {
  const field = page.getByRole('textbox', {name: 'Email'});
  await expect(field).toHaveAttribute('aria-invalid', 'true');
  await expect(field).toHaveAccessibleDescription('Enter an email address');
});

test('multiline is a textarea; the start icon is decorative', async ({page}) => {
  await expect(page.getByRole('textbox', {name: 'Message'})).toHaveJSProperty(
    'tagName',
    'TEXTAREA'
  );
  await expect(page.getByRole('textbox', {name: 'Find'})).toHaveAccessibleName('Find');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Input');
});
