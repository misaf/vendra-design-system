import {test, expect} from '@playwright/test';
import {SITE} from './helpers.mjs';
import {storefrontRoutes} from '../_build/routes.mjs';

// The production build prerenders every public address (_build/vite.config.mjs): a first-time
// visitor's browser adopts that markup (hydration, app/main.jsx) instead of rendering it again. A
// difference between the build's render and the browser's first one (a clock, a stored value, an
// origin) makes React log an error and render the page again: none may.
test.skip(process.env.E2E_TARGET !== 'build', 'Only the production build is prerendered');
test.beforeEach(({}, info) => test.skip(info.project.name !== 'desktop', 'viewport plays no part'));
// A first-time visitor: no cookie choice, no bag, no customer.
test.use({storageState: {cookies: [], origins: []}});

for (const route of storefrontRoutes())
  test(`${route.path} hydrates its prerendered page`, async ({page}) => {
    const problems = [];
    // Failed requests are reported by URL below (the browser's own favicon request is not the page's).
    page.on('console', message => {
      if (message.type() === 'error' && !message.text().startsWith('Failed to load resource'))
        problems.push(message.text());
    });
    page.on('pageerror', error => problems.push(error.message));
    page.on('response', response => {
      if (response.status() >= 400 && !response.url().endsWith('/favicon.ico'))
        problems.push(response.status() + ' ' + response.url());
    });
    const response = await page.goto(SITE + route.path);
    expect(response.status()).toBe(200);
    // The prerendered heading is in the page's own source, before any script runs.
    expect(await response.text()).toMatch(/<main[\s\S]*<h1/);
    await page.waitForFunction(() => window.VF_RENDERED);
    expect(await page.evaluate(() => window.VF_RENDERED)).toBe('hydrated');
    // Effects after hydration (focus, head tags, deferred values) have run.
    await expect(page.locator('main h1').first()).toBeVisible();
    await page.waitForTimeout(300);
    expect(problems).toEqual([]);
  });

test('a page with no script shows its prerendered content and head', async ({browser}) => {
  const context = await browser.newContext({javaScriptEnabled: false});
  const page = await context.newPage();
  await page.goto(SITE + 'fa/product/VF-7K2M4Q/');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('main h1')).toHaveText('VF-7K2M4Q');
  await expect(page).toHaveTitle('VF-7K2M4Q · گل‌فروشی وندرا');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /assets\/products\/.+\.webp$/
  );
  await context.close();
});

test('a returning visitor gets the page rendered afresh in place of the prerendered one', async ({
  page
}) => {
  await page.goto(SITE + 'en/shop/');
  await page.waitForFunction(() => window.VF_RENDERED);
  // The site keeps its session in storage from the first visit on.
  await page.reload();
  await page.waitForFunction(() => window.VF_RENDERED);
  expect(await page.evaluate(() => window.VF_RENDERED)).toBe('rendered');
  await expect(page.locator('main h1')).toContainText('The shop');
});

test('an address with no page of its own opens in the app, not as not-found', async ({page}) => {
  const response = await page.goto(SITE + 'en/track/VF-1234/');
  expect(response.status()).toBe(404);
  await page.waitForFunction(() => window.VF_RENDERED);
  await expect(page.locator('main h1')).toContainText('Track');
  await expect(page.locator('#root')).toBeVisible();
});
