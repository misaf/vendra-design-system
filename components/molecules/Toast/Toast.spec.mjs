import {test, expect} from '@playwright/test';
import {
  backgroundBehind,
  contrast,
  expectAccessible,
  openComponent
} from '../../../templates/_e2e/component-test.mjs';

const LILAC_300 = 'rgb(169, 155, 221)';

test.beforeEach(({page}) => openComponent(page, 'Toast'));

test('close button is a 44px target and works', async ({page}) => {
  const close = page.getByRole('button', {name: 'Dismiss'});
  const box = await close.boundingBox();
  expect(Math.round(box.width)).toBeGreaterThanOrEqual(44);
  expect(Math.round(box.height)).toBeGreaterThanOrEqual(44);
  await close.click();
  await expect(page.locator('[data-test=closed]')).toHaveText('1');
});

test('focus ring uses the on-inverse ring at 3:1', async ({page}) => {
  const close = page.getByRole('button', {name: 'Dismiss'});
  await close.focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  await expect(close).toBeFocused();
  await expect(close).toHaveCSS('outline-color', LILAC_300);
  const ring = await close.evaluate(el => getComputedStyle(el).outlineColor);
  const background = await backgroundBehind(page.locator('.ag-toast'));
  expect(contrast(ring, background)).toBeGreaterThanOrEqual(3);
});

test('the action is a link; the close button is named in the page language', async ({page}) => {
  await expect(page.getByRole('link', {name: 'View bag'})).toHaveAttribute('href', '#bag');
  await openComponent(page, 'Toast', 'fa');
  await expect(page.getByRole('button', {name: 'بستن'})).toBeVisible();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Toast');
});
