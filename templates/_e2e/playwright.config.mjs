import {defineConfig, devices} from '@playwright/test';
import {fileURLToPath} from 'node:url';

// Browser tests for the storefront and the design-system cards. Locally they run on the
// installed Google Chrome (channel: 'chrome') because the Playwright browser CDN
// is not reachable from every region. CI runs them inside Playwright's Linux image
// (.github/workflows/ci.yml), on the Chromium it ships, against the -linux screenshots.
// Vite serves the repo root, so cards and fixtures load from their real paths.
// E2E_TARGET=build runs the storefront specs against the production build (npm run build:app, served
// by vite preview); the cards, the component specs and the package and hydration fixtures need
// the dev server and are skipped.
const build = process.env.E2E_TARGET === 'build';
const origin = build ? 'http://127.0.0.1:4173' : 'http://127.0.0.1:5173';
const ci = !!process.env.CI;
const channel = ci ? undefined : 'chrome';

export default defineConfig({
  testDir: '.',
  testMatch: '*.spec.mjs',
  testIgnore: build ? ['cards.spec.mjs', 'package.spec.mjs', 'hydration.spec.mjs'] : [],
  outputDir: './test-results',
  // One screenshot folder for every project, whatever its testDir.
  snapshotDir: './__screenshots__',
  snapshotPathTemplate: '{snapshotDir}/{arg}-{platform}{ext}',
  fullyParallel: true,
  // A loaded machine runs the slowest flows (top-up then checkout) in up to ~40s.
  timeout: 60000,
  forbidOnly: ci,
  // One Vite dev server serves every page; more workers than this starts timing out. CI's
  // runners have fewer cores.
  workers: ci ? 2 : 4,
  // A retry surfaces load-related flakes as "flaky" in the report instead of failing the run.
  retries: 1,
  reporter: [['list'], ['html', {outputFolder: './playwright-report', open: 'never'}]],
  // Exact colours, with a few pixels of slack for anti-aliasing. The default
  // per-pixel threshold (0.2) hid an 8,500-pixel shadow change. Capturing a long page
  // under load can take longer than the default 5s; screenshot.css hides native select text.
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      threshold: 0,
      maxDiffPixels: 25,
      timeout: 15000,
      stylePath: fileURLToPath(new URL('./screenshot.css', import.meta.url))
    }
  },
  use: {
    baseURL: origin,
    // Every test starts with the cookie choice made, so the consent banner stays out of
    // screenshots and clicks. Consent tests opt out with test.use({storageState: NO_CONSENT}).
    storageState: {
      cookies: [],
      origins: [{origin, localStorage: [{name: 'vf-consent', value: 'essential'}]}]
    },
    channel,
    // The store is in Karaj: delivery days and cut-offs read the clock in Tehran time, whatever
    // the machine's own zone (CI runs in UTC).
    timezoneId: 'Asia/Tehran',
    locale: 'en-US',
    trace: 'retain-on-failure'
  },
  projects: [
    {
      name: 'mobile',
      use: {
        ...devices['Desktop Chrome'],
        channel,
        viewport: {width: 390, height: 844},
        hasTouch: false
      }
    },
    {
      name: 'desktop',
      use: {...devices['Desktop Chrome'], channel, viewport: {width: 1280, height: 900}}
    },
    ...[
      {name: 'touch-phone', viewport: {width: 390, height: 844}, hasTouch: true},
      {name: 'tablet', viewport: {width: 1180, height: 820}, hasTouch: true},
      {name: 'tv', viewport: {width: 1920, height: 1080}, hasTouch: false}
    ].map(device => ({
      name: device.name,
      // The tv project also opens the storefront in TV mode (tv.spec.mjs).
      testMatch: device.name === 'tv' ? ['devices.spec.mjs', 'tv.spec.mjs'] : 'devices.spec.mjs',
      use: {
        ...devices['Desktop Chrome'],
        channel,
        viewport: device.viewport,
        hasTouch: device.hasTouch
      }
    })),
    // Each component's own spec, beside it (components/<Name>/<Name>.spec.mjs), on the fixture
    // host page the dev server serves; a spec sets another viewport where it matters.
    ...(build
      ? []
      : [
          {
            name: 'components',
            testDir: '../../components',
            use: {...devices['Desktop Chrome'], channel, viewport: {width: 1280, height: 900}}
          }
        ])
  ],
  webServer: build
    ? {
        command: 'npm run build:app && npm run preview',
        cwd: '..',
        url: origin + '/templates/app/',
        reuseExistingServer: !ci,
        timeout: 180000
      }
    : {
        command: 'npm run dev',
        cwd: '..',
        url: origin + '/templates/app/',
        reuseExistingServer: !ci,
        timeout: 120000
      }
});
