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

test('aspect sets the photo’s shape; 4:5 by default', async ({page}) => {
  await openComponent(page, 'CategoryCard');
  const ratio = async name =>
    page
      .getByRole(name === 'Orchids' ? 'link' : 'button', {name: new RegExp(name)})
      .locator('.ag-cat__media')
      .evaluate(media => media.clientWidth / media.clientHeight);
  expect(await ratio('Orchids')).toBeCloseTo(0.8, 1);
  expect(await ratio('Dried')).toBeCloseTo(1, 1);
});

test('the circle frame is round, centred and has no arrow', async ({page}) => {
  await openComponent(page, 'CategoryCard');
  const card = page.getByRole('link', {name: /Bouquets/});
  await expect(card).toHaveAttribute('href', '#bouquets');
  await expect(card.locator('.ag-cat__media')).toHaveCSS('border-radius', '50%');
  await expect(card.locator('.ag-cat__arrow')).toHaveCount(0);
  await expect(card).toHaveCSS('text-align', 'center');
});

test('the arrow mirrors in Persian', async ({page}) => {
  await openComponent(page, 'CategoryCard', 'fa');
  await expect(page.locator('.ag-cat__arrow').first()).not.toHaveCSS('transform', 'none');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'CategoryCard');
});
