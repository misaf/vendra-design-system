import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

for (const lang of ['en', 'fa']) {
  test(`display presets start on a product without the catalog (${lang})`, async ({page}) => {
    await openSite(page, 'presentation', lang);
    await expect(page.locator('.vf-display-photo')).toBeVisible();
    await expect(page.locator('.vf-presentation-bar')).toBeHidden();
    await expect(page.locator('.vf-presentation-tile').first()).toBeHidden();
    expect(await scanAxe(page)).toEqual([]);
  });
}

test('TV preset plays immediately and persists across reload', async ({page}) => {
  await page.clock.install();
  await page.addInitScript(() =>
    localStorage.setItem('vf-presentation', JSON.stringify({displayMode: 'tv'}))
  );
  await openSite(page, 'presentation', 'en');
  await expect(page.locator('.vf-display-caption')).toContainText('VF-7K2M4Q');
  await page.clock.runFor(6_100);
  await expect(page.locator('.vf-display-caption')).toContainText('VF-3HX9TP');
  await expect(page.locator('.vf-display-navigation')).toHaveCount(0);
  await page.reload();
  await expect(page.locator('.vf-display-photo')).toBeVisible();
});
