import {test, expect} from '@playwright/test';
import {openSite} from './helpers.mjs';

for (const lang of ['en', 'fa']) {
  test(`routed controls work while an unrelated image is still loading (${lang})`, async ({
    page
  }) => {
    let release;
    const held = new Promise(resolve => (release = resolve));
    let requested = false;
    await page.route('**/__readiness-image.png', async route => {
      requested = true;
      await held;
      await route.abort();
    });
    await page.addInitScript(() => {
      document.addEventListener('DOMContentLoaded', () => {
        const image = document.createElement('img');
        image.src = '/__readiness-image.png';
        image.hidden = true;
        document.body.append(image);
      });
    });
    try {
      // The image stays pending until the assertions finish: waiting for load/network quiet
      // would prevent openSite from returning despite the storefront already being usable.
      await openSite(page, 'product', lang);
      expect(await page.evaluate(() => window.VF_RENDERED)).toBeTruthy();
      expect(await page.locator('#root').evaluate(root => root.inert)).toBe(false);
      expect(requested).toBe(true);
      expect(await page.evaluate(() => document.readyState)).not.toBe('complete');
      const care = page.getByRole('button', {
        name: lang === 'fa' ? 'نگهداری' : 'Care',
        exact: true
      });
      const region = page.getByRole('region', {
        name: lang === 'fa' ? 'نگهداری' : 'Care',
        exact: true
      });
      await expect(region).toBeVisible();
      await care.click();
      await expect(region).toBeHidden();
    } finally {
      release();
      await page.unrouteAll({behavior: 'wait'});
    }
  });
}
