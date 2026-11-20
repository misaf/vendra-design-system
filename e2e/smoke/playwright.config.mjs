import {defineConfig} from '@playwright/test';
import {fileURLToPath} from 'node:url';

const url = 'http://127.0.0.1:3034';
const base = process.env.VF_BASE_PATH || '';
const live = process.env.VF_TEST_LIVE === '1';

export default defineConfig({
  testMatch: live ? 'localized-routes.spec.mjs' : ['export.spec.mjs', 'localized-routes.spec.mjs'],
  outputDir: '../test-results/next',
  use: {
    baseURL: url,
    viewport: {width: 1280, height: 900},
    timezoneId: 'Asia/Tehran',
    channel: process.env.VF_BROWSER_CHANNEL || undefined
  },
  webServer: {
    cwd: fileURLToPath(new URL('../../', import.meta.url)),
    command: `npm ${live ? 'start' : 'run preview:demo'} -- --port 3034 --hostname 127.0.0.1`,
    url: url + base + '/',
    reuseExistingServer: false
  }
});
