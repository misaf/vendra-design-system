import {test, expect} from '@playwright/test';
import {openSite} from './helpers.mjs';

// Performance budgets, measured on the production build (E2E_TARGET=build) on the phone profile.
// They sit about 10–15% above today's numbers, so a heavy component, image or dependency fails
// here before it reaches customers. Raise one only on purpose, with the reason in the commit.
const BUDGET = {
  // Compressed JS / CSS / font bytes a page loads before the site starts preloading other pages.
  firstPageJsKb: 240,
  firstPageCssKb: 20,
  firstPageFontKb: 110,
  // Cumulative layout shift while the web fonts arrive 1.2s late (metric-matched fallbacks).
  fontSwapCls: 0.05,
  // Largest contentful paint on slow 4G (150ms, 1.6Mbps) with a 4x slower CPU. Generous: it
  // catches large regressions, not small timing noise.
  slowLcpMs: 5000
};
const PAGES = [
  ['home', 'en'],
  ['shop', 'fa'],
  ['product', 'en'],
  ['bag', 'fa'],
  ['checkout', 'en'],
  ['account', 'fa']
];

test.describe('performance budgets', () => {
  test.skip(process.env.E2E_TARGET !== 'build', 'Budgets apply to the production build');
  test.beforeEach(({}, testInfo) =>
    test.skip(testInfo.project.name !== 'mobile', 'Measured on the phone profile')
  );

  for (const [view, lang] of PAGES) {
    test(`${view} (${lang}) loads within its byte budget`, async ({page}) => {
      await openSite(page, view, lang);
      const used = await page.evaluate(() => {
        const mark = performance.getEntriesByName('vf-preload-pages')[0];
        const first = performance
          .getEntriesByType('resource')
          .filter(entry => !mark || entry.startTime < mark.startTime);
        const kb = pattern =>
          Math.round(
            first
              .filter(entry => pattern.test(entry.name))
              .reduce((sum, entry) => sum + entry.encodedBodySize, 0) / 1024
          );
        return {js: kb(/\.js(\?|$)/), css: kb(/\.css(\?|$)/), font: kb(/\.woff2(\?|$)/)};
      });
      expect(used.js, 'first-page JS (KB)').toBeLessThanOrEqual(BUDGET.firstPageJsKb);
      expect(used.css, 'first-page CSS (KB)').toBeLessThanOrEqual(BUDGET.firstPageCssKb);
      expect(used.font, 'first-page fonts (KB)').toBeLessThanOrEqual(BUDGET.firstPageFontKb);
    });

    test(`${view} (${lang}) barely shifts while fonts load`, async ({page}) => {
      await page.route(/\.woff2$/, async route => {
        await new Promise(resolve => setTimeout(resolve, 1200));
        await route.continue();
      });
      await page.addInitScript(() => {
        window.__vfShift = 0;
        new PerformanceObserver(list => {
          for (const entry of list.getEntries())
            if (!entry.hadRecentInput) window.__vfShift += entry.value;
        }).observe({type: 'layout-shift', buffered: true});
      });
      await openSite(page, view, lang);
      await page.waitForTimeout(1500);
      expect(await page.evaluate(() => window.__vfShift)).toBeLessThanOrEqual(BUDGET.fontSwapCls);
    });
  }

  test('the home page paints within budget on a slow phone', async ({page}) => {
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 150,
      downloadThroughput: 1.6e6 / 8,
      uploadThroughput: 750e3 / 8
    });
    await cdp.send('Emulation.setCPUThrottlingRate', {rate: 4});
    await page.addInitScript(() => {
      window.__vfLcp = 0;
      new PerformanceObserver(list => {
        for (const entry of list.getEntries()) window.__vfLcp = entry.startTime;
      }).observe({type: 'largest-contentful-paint', buffered: true});
    });
    await openSite(page, 'home', 'en');
    expect(await page.evaluate(() => window.__vfLcp)).toBeLessThanOrEqual(BUDGET.slowLcpMs);
  });
});
