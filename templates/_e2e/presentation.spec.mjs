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

for (const lang of ['en', 'fa']) {
  test(`seller tools stay in a drawer and return focus when closed (${lang})`, async ({page}) => {
    await openSite(page, 'presentation', lang);
    const tools = lang === 'en' ? 'Seller tools' : 'ابزار فروشنده';
    const browse = lang === 'en' ? 'Browse designs' : 'مرور طرح‌ها';
    await expect(page.getByRole('button', {name: browse, exact: true})).toHaveCount(0);
    await page.getByRole('button', {name: tools, exact: true}).click();
    await expect(page.getByRole('dialog', {name: tools})).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', {name: tools, exact: true})).toBeFocused();
    await page.getByRole('button', {name: tools, exact: true}).click();
    await page.getByRole('button', {name: browse, exact: true}).click();
    await expect(page.getByRole('searchbox')).toBeFocused();
    await expect(page.locator('.vf-display')).toHaveCount(0);
  });
}
