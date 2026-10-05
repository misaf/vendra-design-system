import {test, expect} from '@playwright/test';
import {LANGS, VIEWS, openSite, settlePage} from './helpers.mjs';

// Full-page screenshots of every routed view in English and Persian at both
// widths, to catch RTL and responsive layout regressions. The clock is frozen
// so relative dates ("38 days away") and delivery slots stay stable.
const NOW = new Date('2026-10-05T09:00:00+03:30');

// Phone pages run to ~5,000px; with four workers sharing one dev server a capture can outlast 30s.
test.describe.configure({timeout: 60_000});

for (const lang of LANGS) {
  for (const view of Object.keys(VIEWS)) {
    test(`page: ${view} (${lang})`, async ({page}, info) => {
      await page.clock.setFixedTime(NOW);
      await openSite(page, view, lang);
      await settlePage(page);
      await expect(page).toHaveScreenshot(`page__${view}__${lang}__${info.project.name}.png`, {fullPage: true});
    });
  }
}
