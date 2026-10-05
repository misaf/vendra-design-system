import {test, expect} from '@playwright/test';
import {LANGS, VIEWS, openSite} from './helpers.mjs';

// Full-page screenshots of every routed view in English and Persian at both
// widths, to catch RTL and responsive layout regressions. The clock is frozen
// so relative dates ("38 days away") and delivery slots stay stable.
const NOW = new Date('2026-10-05T09:00:00+03:30');

for (const lang of LANGS) {
  for (const view of Object.keys(VIEWS)) {
    test(`page: ${view} (${lang})`, async ({page}, info) => {
      await page.clock.setFixedTime(NOW);
      await openSite(page, view, lang);
      // Load lazy images so the full-page capture never catches them half-loaded.
      await page.evaluate(async () => {
        const imgs = [...document.images];
        imgs.forEach(img => { img.loading = 'eager'; });
        await Promise.all(imgs.map(img => img.complete ? null : new Promise(r => { img.onload = img.onerror = r; })));
      });
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveScreenshot(`page__${view}__${lang}__${info.project.name}.png`, {fullPage: true});
    });
  }
}
