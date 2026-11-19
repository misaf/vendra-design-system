import {defineConfig} from '@playwright/test';

const url = 'http://127.0.0.1:3034';
const base = process.env.VF_BASE_PATH || '';

export default defineConfig({
  testMatch: 'export.spec.mjs',
  outputDir: '../e2e/test-results/next',
  use: {
    baseURL: url,
    viewport: {width: 1280, height: 900},
    timezoneId: 'Asia/Tehran',
    channel: process.env.VF_BROWSER_CHANNEL || undefined
  },
  webServer: {
    command: 'node serve-export.mjs --port 3034',
    url: url + base + '/',
    reuseExistingServer: false
  }
});
