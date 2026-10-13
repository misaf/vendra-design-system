import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test('the whole card is one link, or a button without href', async ({page}) => {
  await openComponent(page, 'CategoryCard');
  const orchids = page.getByRole('link', {name: /Orchids/});
  await expect(orchids).toHaveAttribute('href', '#orchids');
  await expect(orchids).toContainText('12 designs');
  await page.getByRole('button', {name: 'Dried'}).click();
  await expect(page.locator('output[data-test=opened]')).toHaveText('dried');
});

test('the arrow mirrors in Persian', async ({page}) => {
  await openComponent(page, 'CategoryCard', 'fa');
  await expect(page.locator('.ag-cat__arrow').first()).not.toHaveCSS('transform', 'none');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'CategoryCard');
});
