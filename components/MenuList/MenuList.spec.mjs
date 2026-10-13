import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test('a navigation landmark named by its title, one list item per child', async ({page}) => {
  await openComponent(page, 'MenuList');
  const explore = page.getByRole('navigation', {name: 'Explore'});
  await expect(explore.getByRole('listitem')).toHaveCount(2);
  await expect(explore.getByRole('link')).toHaveText(['Weddings', 'Journal']);
  await expect(page.getByRole('navigation', {name: 'Help pages'})).toBeVisible();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'MenuList');
});
