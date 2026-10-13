import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test('a toggle button whose pressed state follows selected', async ({page}) => {
  await openComponent(page, 'Chip');
  await expect(page.getByRole('button', {name: 'Dried'})).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', {name: 'Wild'})).toHaveAttribute('aria-pressed', 'false');
  await page.getByRole('button', {name: 'Wild'}).focus();
  await page.keyboard.press('Space');
  await expect(page.getByRole('button', {name: 'Wild'})).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', {name: 'Dried'})).toHaveAttribute('aria-pressed', 'false');
  await expect(page.getByRole('button', {name: 'Seasonal'})).toBeDisabled();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Chip');
});
