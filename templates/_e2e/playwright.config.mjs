import {defineConfig, devices} from '@playwright/test';

// Browser tests for the storefront and the design-system cards. They run on the
// installed Google Chrome (channel: 'chrome') because the Playwright browser CDN
// is not reachable from every region. Vite serves the repo root, so cards and
// fixtures load from their real paths.
export default defineConfig({
  testDir: '.',
  testMatch: '*.spec.mjs',
  outputDir: './test-results',
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}-{platform}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // One Vite dev server serves every page; more workers than this starts timing out.
  workers: 4,
  // A retry surfaces load-related flakes as "flaky" in the report instead of failing the run.
  retries: 1,
  reporter: [['list'], ['html', {outputFolder: './playwright-report', open: 'never'}]],
  // Exact colours, with a few pixels of slack for anti-aliasing. The default
  // per-pixel threshold (0.2) hid an 8,500-pixel shadow change.
  expect: {toHaveScreenshot: {animations: 'disabled', threshold: 0, maxDiffPixels: 25}},
  use: {
    baseURL: 'http://127.0.0.1:5173',
    // Every test starts with the cookie choice made, so the consent banner stays out of
    // screenshots and clicks. Consent tests opt out with test.use({storageState: NO_CONSENT}).
    storageState: {cookies: [], origins: [{origin: 'http://127.0.0.1:5173', localStorage: [{name: 'vf-consent', value: 'essential'}]}]},
    channel: 'chrome',
    trace: 'retain-on-failure'
  },
  projects: [
    {name: 'mobile', use: {...devices['Desktop Chrome'], channel: 'chrome', viewport: {width: 390, height: 844}, hasTouch: false}},
    {name: 'desktop', use: {...devices['Desktop Chrome'], channel: 'chrome', viewport: {width: 1280, height: 900}}}
  ],
  webServer: {
    command: 'npm run dev',
    cwd: '..',
    url: 'http://127.0.0.1:5173/templates/storefront-site/StorefrontSite.dc.html',
    reuseExistingServer: true,
    timeout: 120000
  }
});
