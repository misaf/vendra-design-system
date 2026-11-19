import {defineConfig} from '@playwright/test';
import {fileURLToPath} from 'node:url';

const url = 'http://127.0.0.1:3034';
const base = process.env.VF_BASE_PATH || '';
const live = process.env.VF_TEST_LIVE === '1';
const catalog = process.env.VF_TEST_CATALOG === '1';
const catalogApi = 'http://127.0.0.1:3035';
const storefront = {
  cwd: fileURLToPath(new URL('../../', import.meta.url)),
  command: `npm run ${live || catalog ? 'start:live' : 'start:next'} -- --port 3034 --hostname 127.0.0.1`,
  url: url + base + '/',
  reuseExistingServer: false,
  ...(catalog ? {env: {VF_API_BASE: catalogApi + '/tenant'}} : {})
};

export default defineConfig({
  testMatch: catalog
    ? 'live-catalog.spec.mjs'
    : live
      ? 'localized-routes.spec.mjs'
      : ['export.spec.mjs', 'localized-routes.spec.mjs'],
  outputDir: '../../e2e/test-results/next',
  use: {
    baseURL: url,
    viewport: {width: 1280, height: 900},
    timezoneId: 'Asia/Tehran',
    channel: process.env.VF_BROWSER_CHANNEL || undefined
  },
  webServer: catalog
    ? [
        {
          cwd: storefront.cwd,
          command: 'node tests/e2e/mock-catalog-api.mjs 3035',
          url: catalogApi
        },
        storefront
      ]
    : storefront
});
