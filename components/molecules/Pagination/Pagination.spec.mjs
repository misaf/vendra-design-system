import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

test('buttons change the page; the current page is marked; ends are disabled', async ({page}) => {
  await openComponent(page, 'Pagination');
  const pages = page.getByRole('navigation', {name: 'Pages'});
  await expect(pages.getByRole('button', {name: 'Page 1'})).toHaveAttribute('aria-current', 'page');
  await expect(pages.getByRole('button', {name: 'Previous page'})).toBeDisabled();
  await pages.getByRole('button', {name: 'Next page'}).click();
  await expect(page.locator('output[data-test=page]')).toHaveText('2');
  await expect(pages.getByRole('button', {name: 'Page 2'})).toHaveAttribute('aria-current', 'page');
  await pages.getByRole('button', {name: 'Page 9'}).click();
  await expect(pages.getByRole('button', {name: 'Next page'})).toBeDisabled();
});

test('with href every page is a real link', async ({page}) => {
  await openComponent(page, 'Pagination');
  const pages = page.getByRole('navigation', {name: 'Linked pages'});
  await expect(pages.getByRole('link', {name: 'Page 5'})).toHaveAttribute('href', '?page=5');
  await expect(pages.getByRole('link', {name: 'Next page'})).toHaveAttribute('href', '?page=5');
  await expect(pages.getByRole('link', {name: 'Page 4'})).toHaveAttribute('aria-current', 'page');
});

test('page numbers and names follow the page language', async ({page}) => {
  await openComponent(page, 'Pagination', 'fa');
  const pages = page.getByRole('navigation', {name: 'صفحه‌ها'});
  await expect(pages.getByRole('button', {name: 'صفحهٔ ۱'})).toHaveText('۱');
  await expect(pages.getByRole('button', {name: 'صفحهٔ بعد'})).toBeEnabled();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Pagination');
});
