import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test('hidden until focused, then moves focus to the target without changing the URL', async ({
  page
}) => {
  await openComponent(page, 'SkipLink');
  const skip = page.getByRole('link', {name: 'Skip to content'});
  const hidden = await skip.boundingBox();
  expect(hidden === null || hidden.y + hidden.height <= 0 || hidden.width <= 1).toBe(true);
  await page.keyboard.press('Tab');
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  const url = page.url();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  await expect(page.locator('#main')).toHaveAttribute('tabindex', '-1');
  expect(page.url()).toBe(url);
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'SkipLink');
});
