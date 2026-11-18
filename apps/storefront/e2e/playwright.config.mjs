import {defineConfig, devices} from '@playwright/test';
import {fileURLToPath} from 'node:url';

// Browser tests use Playwright's bundled Chromium locally and in CI.
// Install it locally with `npm exec --workspace apps/storefront -- playwright install chromium`.
// CI runs inside Playwright's Linux image against the -linux screenshots.
// The Next.js development server serves guideline and component fixtures and lets tests
// configure a sample store. The remaining storefront tests use the production export.
const build = process.env.E2E_TARGET !== 'dev';
const devSpecs = [
  'cards.spec.mjs',
  'package.spec.mjs',
  'hydration.spec.mjs',
  'tenant-fixtures.spec.mjs',
  'payment-live.spec.mjs',
  'shop-paging.spec.mjs',
  'refs.spec.mjs',
  'attributes.spec.mjs'
];
const origin = build ? 'http://127.0.0.1:4173' : 'http://127.0.0.1:5173';
const ci = !!process.env.CI;

// The combined runner uses the same project definitions when routing CLI filters.
export function projectsForTarget(build) {
  return [
    {
      name: 'mobile',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {width: 390, height: 844},
        hasTouch: false
      }
    },
    {
      name: 'desktop',
      use: {...devices['Desktop Chrome'], viewport: {width: 1280, height: 900}}
    },
    ...(build
      ? [
          {name: 'touch-phone', viewport: {width: 390, height: 844}, hasTouch: true},
          {name: 'tablet', viewport: {width: 1180, height: 820}, hasTouch: true},
          {name: 'tv', viewport: {width: 1920, height: 1080}, hasTouch: false}
        ].map(device => ({
          name: device.name,
          // The tv project also opens the storefront in TV mode (tv.spec.mjs).
          testMatch:
            device.name === 'tv'
              ? ['devices.spec.mjs', 'tv.spec.mjs']
              : [
                  'devices.spec.mjs',
                  'device-routes.spec.mjs',
                  'device-browsing.spec.mjs',
                  'device-customer.spec.mjs',
                  'device-editorial.spec.mjs',
                  'device-specialist.spec.mjs',
                  'device-catalog.spec.mjs',
                  'contact-map-lifecycle.spec.mjs'
                ],
          use: {
            ...devices['Desktop Chrome'],
            viewport: device.viewport,
            hasTouch: device.hasTouch
          }
        }))
      : []),
    // Each component's own spec, beside it (components/<Name>/<Name>.spec.mjs), on the fixture
    // host page the dev server serves; a spec sets another viewport where it matters.
    ...(build
      ? []
      : [
          {
            name: 'components',
            testDir: '../design-system/components',
            testMatch: '*.spec.mjs',
            use: {...devices['Desktop Chrome'], viewport: {width: 1280, height: 900}}
          },
          // Storefront molecules, organisms and layouts with their own spec
          // (app/<layer>/<Name>/<Name>.spec.mjs), on the storefront fixture host page.
          {
            name: 'storefront-components',
            testDir: '../app',
            testMatch: '*.spec.mjs',
            use: {...devices['Desktop Chrome'], viewport: {width: 1280, height: 900}}
          }
        ])
  ];
}

export default defineConfig({
  testDir: '.',
  testMatch: build ? '*.spec.mjs' : devSpecs,
  testIgnore: build ? devSpecs : [],
  outputDir: build ? './test-results/build' : './test-results/dev',
  // One screenshot folder for every project, whatever its testDir.
  snapshotDir: './__screenshots__',
  snapshotPathTemplate: '{snapshotDir}/{arg}-{platform}{ext}',
  fullyParallel: true,
  // A loaded machine runs the slowest flows (top-up then checkout) in up to ~40s.
  timeout: 60000,
  forbidOnly: ci,
  // One Next.js dev server serves every page; more workers than this starts timing out.
  // E2E_WORKERS overrides it on a bigger machine (test:e2e:remote).
  workers: Number(process.env.E2E_WORKERS) || 2,
  // A retry surfaces load-related flakes as "flaky" in the report instead of failing the run.
  retries: 1,
  reporter: [
    ['list'],
    [
      'html',
      {outputFolder: build ? './playwright-report/build' : './playwright-report/dev', open: 'never'}
    ]
  ],
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
    channel: process.env.VF_BROWSER_CHANNEL || undefined,
    // Every test starts with the cookie choice made, so the consent banner stays out of
    // screenshots and clicks. Consent tests opt out with test.use({storageState: NO_CONSENT}).
    storageState: {
      cookies: [],
      origins: [{origin, localStorage: [{name: 'vf-consent', value: 'essential'}]}]
    },
    // Keep visual baselines in the store's zone. delivery-time-zone.spec.mjs
    // overrides this to simulate a customer abroad.
    timezoneId: 'Asia/Tehran',
    locale: 'en-US',
    trace: 'retain-on-failure'
  },
  projects: projectsForTarget(build),
  webServer: build
    ? {
        command: 'npm run build:next && npm run start:next -- --port 4173',
        cwd: '..',
        url: origin + '/apps/storefront/app/',
        reuseExistingServer: false,
        timeout: 180000
      }
    : {
        command: 'npm run dev:next -- --hostname 127.0.0.1 --port 5173',
        cwd: '..',
        url: origin + '/apps/storefront/app/',
        reuseExistingServer: false,
        timeout: 120000
      }
});
