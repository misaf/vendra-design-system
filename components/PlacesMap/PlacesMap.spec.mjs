import {test, expect} from '@playwright/test';
import {
  expectAccessible,
  openComponent,
  stubMapTiles
} from '../../templates/_e2e/component-test.mjs';

test.beforeEach(({page}) => stubMapTiles(page));

test('a named, left-to-right map with a labelled marker per pinned place', async ({page}) => {
  await openComponent(page, 'PlacesMap');
  const map = page.getByRole('region', {name: 'Saved addresses'});
  await expect(map).toHaveAttribute('dir', 'ltr');
  await expect(map.locator('.ag-place-label')).toHaveText(['Home', 'Office']);
});

test('a marker opens its place with a pointer, Enter or Space', async ({page}) => {
  await openComponent(page, 'PlacesMap');
  const output = page.locator('output[data-test=opened]');
  await page.getByRole('button', {name: 'Open Office'}).click();
  await expect(output).toHaveText('office');
  await page.getByRole('button', {name: 'Open Home'}).focus();
  await page.keyboard.press('Enter');
  await expect(output).toHaveText('home');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'PlacesMap');
});
