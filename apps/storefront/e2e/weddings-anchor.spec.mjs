import {test, expect} from '@playwright/test';
import {openSite} from './helpers.mjs';

for (const lang of ['en', 'fa']) {
  test(`weddings plan link reaches the inquiry without resetting its draft (${lang})`, async ({
    page
  }) => {
    await openSite(page, 'weddings', lang);
    await page.locator('#vf-wname').fill('Anchor Guest');
    await page.locator('#vf-wphone').fill('09120000000');
    await page.locator('#vf-wmsg').fill('Keep this inquiry draft.');
    await page.evaluate(() => {
      window.__weddingAnchorDocument = true;
      window.scrollTo({top: 0, left: 0, behavior: 'instant'});
    });
    await page
      .getByRole('link', {
        name: lang === 'fa' ? 'برنامه‌ریزی گل‌ها' : 'Plan your flowers',
        exact: true
      })
      .click();
    await expect(page).toHaveURL(/#inquiry$/);
    await expect(page.locator('#inquiry')).toBeInViewport();
    await expect(page.locator('#vf-wname')).toHaveValue('Anchor Guest');
    await expect(page.locator('#vf-wphone')).toHaveValue('09120000000');
    await expect(page.locator('#vf-wmsg')).toHaveValue('Keep this inquiry draft.');
    expect(await page.evaluate(() => window.__weddingAnchorDocument)).toBe(true);
  });
}
