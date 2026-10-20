import {test, expect} from '@playwright/test';
import {
  expectAccessible,
  openComponent,
  stubMapTiles
} from '../../../templates/_e2e/component-test.mjs';

test.beforeEach(({page}) => stubMapTiles(page));

test('the map is labelled and described by its status and error', async ({page}) => {
  await openComponent(page, 'LocationPicker');
  const map = page.getByRole('region', {name: 'Delivery pin'});
  await expect(map).toHaveAccessibleDescription(
    'Move the map to put the pin on the door Pin the address to continue'
  );
  await expect(map).toHaveAttribute('dir', 'ltr');
});

test('moving the map with the keyboard sets the pin under the centre', async ({page}) => {
  await openComponent(page, 'LocationPicker');
  const map = page.locator('#pin.leaflet-container');
  await expect(map).toBeVisible();
  await map.focus();
  await page.keyboard.press('ArrowUp');
  await expect(page.locator('output[data-test=location]')).toHaveText(/^35\.\d{4},50\.\d{4}$/);
  await expect(page.getByRole('region', {name: 'Delivery pin'})).toHaveAccessibleDescription(
    'Pinned'
  );
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'LocationPicker');
});
