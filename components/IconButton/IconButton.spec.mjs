import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test.beforeEach(({page}) => openComponent(page, 'IconButton'));

test('named by its label, which is also its tooltip; active is pressed', async ({page}) => {
  const save = page.getByRole('button', {name: 'Save'});
  await expect(save).toHaveAttribute('title', 'Save');
  await expect(save).toHaveAttribute('aria-pressed', 'false');
  await save.click();
  await expect(save).toHaveAttribute('aria-pressed', 'true');
});

test('a 44px target', async ({page}) => {
  const box = await page.getByRole('button', {name: 'Save'}).boundingBox();
  expect(Math.round(box.width)).toBeGreaterThanOrEqual(44);
  expect(Math.round(box.height)).toBeGreaterThanOrEqual(44);
});

test('href makes a link with its count badge; disabled cannot be pressed', async ({page}) => {
  const bag = page.getByRole('link', {name: 'Bag, 2 items'});
  await expect(bag).toHaveAttribute('href', '#bag');
  await expect(bag.locator('.ag-iconbtn__count')).toHaveText('2');
  await expect(page.getByRole('button', {name: 'Close'})).toBeDisabled();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'IconButton');
});
