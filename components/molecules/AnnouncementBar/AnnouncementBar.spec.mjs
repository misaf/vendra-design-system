import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

test('a named region; the close button dismisses it', async ({page}) => {
  await openComponent(page, 'AnnouncementBar');
  const bar = page.getByRole('region', {name: 'Announcement'});
  await expect(bar).toContainText('Free delivery in Karaj');
  await bar.getByRole('button', {name: 'Dismiss'}).click();
  await expect(bar).toHaveCount(0);
  await expect(page.getByRole('region', {name: 'Opening hours'}).getByRole('button')).toHaveCount(
    0
  );
});

test('the close button is named in the page language', async ({page}) => {
  await openComponent(page, 'AnnouncementBar', 'fa');
  await expect(page.getByRole('button', {name: 'بستن'})).toBeVisible();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'AnnouncementBar');
});
