import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test('a named navigation of links and buttons; the current one is marked', async ({page}) => {
  await openComponent(page, 'BottomTabBar');
  const bar = page.getByRole('navigation', {name: 'Main'});
  await expect(bar.getByRole('listitem')).toHaveCount(4);
  await expect(bar.getByRole('link', {name: 'Home'})).toHaveAttribute('aria-current', 'page');
  await expect(bar.getByRole('link', {name: /Bag/})).toContainText('2');
  await bar.getByRole('button', {name: 'Menu'}).click();
  await expect(page.locator('output[data-test=opened]')).toHaveText('menu');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'BottomTabBar');
});
