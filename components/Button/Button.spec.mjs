import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test.beforeEach(({page}) => openComponent(page, 'Button'));

test('a button presses with click, Enter and Space', async ({page}) => {
  const add = page.getByRole('button', {name: 'Add to bag'});
  await expect(add).toHaveAttribute('type', 'button');
  await add.click();
  await add.press('Enter');
  await add.press('Space');
  await expect(page.locator('output[data-test=presses]')).toHaveText('3');
});

test('href makes it a link; a new tab gets noopener', async ({page}) => {
  await expect(page.getByRole('link', {name: 'Shop'})).toHaveAttribute('href', '#shop');
  const whatsapp = page.getByRole('link', {name: 'WhatsApp'});
  await expect(whatsapp).toHaveAttribute('target', '_blank');
  await expect(whatsapp).toHaveAttribute('rel', 'noopener noreferrer');
});

test('loading keeps the label, announces loadingLabel and cannot be pressed', async ({page}) => {
  const pay = page.getByRole('button', {name: /Pay/});
  await expect(pay).toContainText('Pay');
  await expect(page.getByRole('status').filter({hasText: 'Paying…'})).toHaveCount(1);
  await expect(pay).toHaveAttribute('aria-disabled', 'true');
});

test('disabled: a button is disabled; a link loses its href', async ({page}) => {
  await expect(page.getByRole('button', {name: 'Sold out'})).toBeDisabled();
  const unavailable = page.getByText('Unavailable');
  await expect(unavailable).not.toHaveAttribute('href');
  await expect(unavailable).toHaveAttribute('aria-disabled', 'true');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Button');
});
