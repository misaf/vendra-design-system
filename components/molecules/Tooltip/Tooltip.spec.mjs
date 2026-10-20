import {test, expect} from '@playwright/test';
import {expectAccessible, hover, openComponent} from '../../../templates/_e2e/component-test.mjs';

// WCAG 1.4.13 content on hover or focus, on React Aria's tooltip.
test.beforeEach(({page}) => openComponent(page, 'Tooltip'));

test('describes its trigger while shown', async ({page}) => {
  const trigger = page.getByRole('button', {name: 'Save'});
  await expect(page.getByRole('tooltip')).toHaveCount(0);
  await hover(page, trigger);
  await expect(page.getByRole('tooltip')).toHaveText('Save to favourites');
  await expect(trigger).toHaveAccessibleDescription('Save to favourites');
});

test('shows on hover, stays while hovering the bubble, Esc dismisses it', async ({page}) => {
  const trigger = page.getByRole('button', {name: 'Save'});
  const tip = page.getByRole('tooltip');
  await hover(page, trigger);
  await expect(tip).toBeVisible();
  await tip.hover();
  await expect(tip).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(tip).toHaveCount(0);
  await page.mouse.move(0, 0);
  await hover(page, trigger);
  await expect(tip).toBeVisible();
});

test('shows on keyboard focus and hides on blur', async ({page}) => {
  const tip = page.getByRole('tooltip');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', {name: 'Save'})).toBeFocused();
  await expect(tip).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(tip).toHaveCount(0);
  await page.keyboard.press('Tab');
  await expect(tip).toHaveCount(0);
  await page.keyboard.press('Shift+Tab');
  await expect(tip).toBeVisible();
});

test('a tap toggles it on touch screens', async ({browser}) => {
  const context = await browser.newContext({hasTouch: true});
  const page = await context.newPage();
  await openComponent(page, 'Tooltip');
  const tip = page.getByRole('tooltip');
  await page.getByRole('button', {name: 'Save'}).tap();
  await expect(tip).toBeVisible();
  await page.locator('body').tap({position: {x: 5, y: 5}});
  await expect(tip).toHaveCount(0);
  await context.close();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Tooltip');
});
