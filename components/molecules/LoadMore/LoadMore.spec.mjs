import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

test('a status of what shows, and a button until everything does', async ({page}) => {
  await openComponent(page, 'LoadMore');
  const status = page.getByRole('status').filter({hasText: 'designs'});
  await expect(status).toHaveText('Showing 4 of 6 designs');
  await page.getByRole('button', {name: 'Show more'}).click();
  await expect(status).toHaveText('Showing 6 of 6 designs');
  await expect(page.getByRole('button', {name: 'Show more'})).toHaveCount(0);
});

test('busy keeps the button but it cannot be pressed', async ({page}) => {
  await openComponent(page, 'LoadMore');
  await expect(page.getByRole('button', {name: 'Loading more'})).toHaveAttribute(
    'aria-disabled',
    'true'
  );
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'LoadMore');
});
