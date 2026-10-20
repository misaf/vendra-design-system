import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

test('current is aria-current="page"; without href it is a button', async ({page}) => {
  await openComponent(page, 'NavLink');
  await expect(page.getByRole('link', {name: 'Shop'})).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('link', {name: 'Journal'})).not.toHaveAttribute('aria-current');
  await page.getByRole('button', {name: 'Weddings'}).click();
  await expect(page.locator('output[data-test=opened]')).toHaveText('weddings');
});

test("the menu style's chevron mirrors in Persian", async ({page}) => {
  await openComponent(page, 'NavLink', 'fa');
  await expect(page.locator('.ag-nav__chev')).not.toHaveCSS('transform', 'none');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'NavLink');
});
