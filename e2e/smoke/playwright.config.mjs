import {defineConfig} from '@playwright/test';
import {fileURLToPath} from 'node:url';

const url = 'http://127.0.0.1:3034';
const base = process.env.VF_BASE_PATH || '';
const live = process.env.VF_TEST_LIVE === '1';
const catalog = process.env.VF_TEST_LIVE === 'catalog';
const fixturePort = 3035;
const fixtureUrl = 'http://127.0.0.1:' + fixturePort;
const cwd = fileURLToPath(new URL('../../', import.meta.url));

export default defineConfig({
  testMatch: catalog
    ? 'product-lookup.spec.mjs'
    : live
      ? 'localized-routes.spec.mjs'
      : ['export.spec.mjs', 'localized-routes.spec.mjs'],
  outputDir: '../test-results/next',
  use: {
    baseURL: url,
    viewport: {width: 1280, height: 900},
    timezoneId: 'Asia/Tehran',
    channel: process.env.VF_BROWSER_CHANNEL || undefined
  },
  webServer: [
    ...(catalog
      ? [{cwd, command: 'node e2e/smoke/catalog-fixture.mjs ' + fixturePort, url: fixtureUrl}]
      : []),
    {
      cwd,
      command: `npm ${live || catalog ? 'start' : 'run preview:demo'} -- --port 3034 --hostname 127.0.0.1`,
      url: url + base + (catalog ? '/en/product/PRICED/' : '/'),
      ...(catalog ? {env: {VF_API_BASE: fixtureUrl}} : {}),
      reuseExistingServer: false
    }
  ]
});
