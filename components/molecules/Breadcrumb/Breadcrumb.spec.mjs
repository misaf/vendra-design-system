import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

test('a named navigation of links; the last item is the current page', async ({page}) => {
  await openComponent(page, 'Breadcrumb');
  const trail = page.getByRole('navigation', {name: 'Breadcrumb'});
  await expect(trail.getByRole('link', {name: 'Shop'})).toHaveAttribute('href', '#shop');
  const current = trail.getByText('Ivory Morning box');
  await expect(current).toHaveAttribute('aria-current', 'page');
  await trail.getByRole('link', {name: 'Flower boxes'}).click();
  await expect(page.locator('output[data-test=opened]')).toHaveText('boxes');
});

test('named in the page language, separators mirrored', async ({page}) => {
  await openComponent(page, 'Breadcrumb', 'fa');
  const trail = page.getByRole('navigation', {name: 'مسیر صفحه'});
  await expect(trail).toBeVisible();
  await expect(trail.locator('.ag-flip-rtl').first()).not.toHaveCSS('transform', 'none');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Breadcrumb');
});
