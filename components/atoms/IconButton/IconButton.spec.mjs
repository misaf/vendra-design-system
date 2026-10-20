import {test, expect} from '@playwright/test';
import {
  backgroundBehind,
  contrast,
  expectAccessible,
  openComponent
} from '../../../templates/_e2e/component-test.mjs';

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
  await expect(page.getByRole('button', {name: 'Close', exact: true})).toBeDisabled();
});

test('inverse is light on a dark surface, its edge and focus ring visible there', async ({
  page
}) => {
  const outlined = page.getByRole('link', {name: 'Instagram'});
  const ghost = page.getByRole('button', {name: 'Close banner'});
  const dark = await backgroundBehind(page.locator('.dark'));
  for (const button of [outlined, ghost]) {
    const color = await button.evaluate(node => getComputedStyle(node).color);
    expect(contrast(color, dark)).toBeGreaterThanOrEqual(4.5);
  }
  // Secondary keeps its edge; ghost has none.
  const edge = await outlined.evaluate(node => getComputedStyle(node).borderTopColor);
  expect(contrast(edge, dark)).toBeGreaterThan(1.2);
  await expect(ghost).toHaveCSS('border-top-color', 'rgba(0, 0, 0, 0)');
  await ghost.focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  const ring = await ghost.evaluate(node => getComputedStyle(node).outlineColor);
  expect(contrast(ring, dark)).toBeGreaterThanOrEqual(3);
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'IconButton');
});
