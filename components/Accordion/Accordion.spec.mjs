import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

// The disclosure pattern: headings with buttons that show and hide their panels.
test.beforeEach(({page}) => openComponent(page, 'Accordion'));

test('buttons expose state, control their region and toggle from the keyboard', async ({page}) => {
  const care = page.getByRole('button', {name: 'Flower care'});
  const returns = page.getByRole('button', {name: 'Returns'});
  await expect(care).toHaveAttribute('aria-expanded', 'true');
  await expect(returns).toHaveAttribute('aria-expanded', 'false');
  const panel = page.locator(`[id="${await care.getAttribute('aria-controls')}"]`);
  await expect(panel).toHaveText('Trim the stems.');
  await expect(panel).toHaveAccessibleName('Flower care');
  // Real headings, so the page outline lists each question.
  await expect(page.getByRole('heading', {name: 'Returns', level: 3})).toBeVisible();
  await returns.focus();
  await page.keyboard.press('Enter');
  await expect(returns).toHaveAttribute('aria-expanded', 'true');
  // One panel at a time unless allowMultiple.
  await expect(care).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('output[data-test=panels]')).toHaveText('returns');
  await page.keyboard.press('Space');
  await expect(returns).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('output[data-test=panels]')).toHaveText('');
});

test('allowMultiple keeps several open; headingLevel sets the heading', async ({page}) => {
  await page.getByRole('button', {name: 'Water'}).click();
  await page.getByRole('button', {name: 'Light'}).click();
  await expect(page.getByRole('button', {name: 'Water'})).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('button', {name: 'Light'})).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('heading', {name: 'Water', level: 4})).toBeVisible();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Accordion');
});
