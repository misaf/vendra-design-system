import {test, expect} from '@playwright/test';
import {VISUAL_BROWSER} from '../visual-browser.mjs';
import {LANGS, VIEWS, chooseDeliveryTime, openSite, pinDelivery, settlePage} from '../helpers.mjs';

test.use(VISUAL_BROWSER);

// Full-page screenshots of every routed view in English and Persian at both
// widths, to catch RTL and responsive layout regressions. The clock is frozen
// so relative dates ("38 days away") and delivery slots stay stable.
const NOW = new Date('2026-10-05T09:00:00+03:30');

// Phone pages run to ~5,000px; with four workers sharing one dev server a capture can outlast 30s.
test.describe.configure({timeout: 60_000});

for (const lang of LANGS) {
  for (const view of Object.keys(VIEWS)) {
    test(`page: ${view} (${lang})`, async ({page}, info) => {
      // React Aria warns when a field has no label it can see (a <label for> outside the component
      // counts for the browser but not for React Aria): pass `label` or `aria-labelledby`.
      const labelWarnings = [];
      page.on('console', message => {
        if (message.type() === 'warning' && /visible label/.test(message.text()))
          labelWarnings.push(message.text());
      });
      if (view === 'checkout') {
        // A fresh tab at /checkout/ is sent to delivery until the bag has a valid delivery draft.
        // Leaflet needs time to advance while choosing the pin.
        await page.clock.setSystemTime(NOW);
        await openSite(page, 'bag', lang, {step: 'delivery'});
        await page.locator('#vf-name').fill('Shirin Ahmadi');
        await page.locator('#vf-phone').fill('09121234567');
        await pinDelivery(page);
        await page.locator('#vf-address').fill('Plaque 12, unit 3');
        await page.locator('#vf-sender').fill('Sara Karimi');
        await page.locator('#vf-sender-phone').fill('09121112233');
        await chooseDeliveryTime(page);
        await page
          .getByRole('button', {name: lang === 'fa' ? 'ادامه و پرداخت' : 'Continue to payment'})
          .locator('visible=true')
          .click();
        await expect(page).toHaveURL(/\/checkout\//);
        await expect(page.locator('main h1')).toBeFocused();
      } else {
        await page.clock.setFixedTime(NOW);
        await openSite(page, view, lang);
      }
      await settlePage(page);
      expect(labelWarnings, 'React Aria label warnings').toEqual([]);
      await expect(page).toHaveScreenshot(`page__${view}__${lang}__${info.project.name}.png`, {
        fullPage: true
      });
    });
  }
}
