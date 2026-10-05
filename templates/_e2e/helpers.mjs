import {expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

// Every tenant theme in tokens/tenants/ (the _template file is a .txt, so it is skipped).
export const TENANTS = fs.readdirSync(path.join(ROOT, 'tokens/tenants'))
  .filter(f => f.endsWith('.css')).map(f => f.slice(0, -4)).sort();

// A fresh visitor who has not made a cookie choice yet (the config pre-sets one for every other test).
export const NO_CONSENT = {cookies: [], origins: []};

export const SITE = '/templates/storefront-site/StorefrontSite.dc.html';
export const LANGS = ['en', 'fa'];

// Every routed view, with the parameters a view needs to render instead of falling back to notfound.
export const VIEWS = {
  home: {}, shop: {}, product: {id: 'ivory'}, bag: {}, checkout: {}, saved: {}, search: {},
  account: {}, signin: {}, track: {}, contact: {}, faq: {}, journal: {},
  post: {post: 'morning-at-the-studio'}, policy: {}, weddings: {}, notfound: {}
};

export function siteUrl(view, lang, extra = {}) {
  const q = new URLSearchParams({lang, ...(view === 'home' ? {} : {view}), ...VIEWS[view], ...extra});
  return SITE + '?' + q;
}

// Waits for the DC runtime to render the page shell and settle the language.
export async function openSite(page, view, lang, extra) {
  await stubMapTiles(page);
  await page.goto(siteUrl(view, lang, extra));
  await expect(page.locator('#main')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', lang);
  await page.waitForLoadState('networkidle');
  await expectNoViteError(page);
  await page.evaluate(() => document.fonts.ready);
}

// Vite reports transform errors as an overlay element (pushed to every open page).
export async function expectNoViteError(page) {
  await expect(page.locator('vite-error-overlay'), 'Vite error overlay').toHaveCount(0);
}

const lum = rgb => rgb.map(x => x / 255).map(x => x <= .03928 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4).reduce((s, x, i) => s + x * [.2126, .7152, .0722][i], 0);
export const parseRgb = s => s.match(/[\d.]+/g).slice(0, 3).map(Number);
export function contrast(a, b) {
  const x = lum(parseRgb(a)), y = lum(parseRgb(b));
  return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
}

// The first opaque background behind an element.
export function backgroundBehind(locator) {
  return locator.evaluate(el => {
    for (let n = el; n; n = n.parentElement) {
      const bg = getComputedStyle(n).backgroundColor;
      if (!/rgba\(.*,\s*0\)$|transparent/.test(bg)) return bg;
    }
    return getComputedStyle(document.body).backgroundColor;
  });
}

// WCAG 2.2 A/AA scan, one line per violation for readable diffs.
export async function scanAxe(page) {
  // The sticky mobile tab bar overlaps whatever sits at the bottom of a single
  // static viewport, which axe reads as obscured targets. Unstick it so content
  // is judged on its own; the bar itself is still scanned.
  await page.addStyleTag({content: '.vf-shell-bottom-bar{position:static!important}'});
  // Let dialog and accordion transitions finish so axe sees final colours.
  // Infinite ones (skeleton shimmer) are skipped.
  await page.evaluate(() => Promise.all(document.getAnimations()
    .filter(a => a.effect?.getComputedTiming().endTime !== Infinity)
    .map(a => a.finished.catch(() => {}))));
  const {violations} = await new AxeBuilder({page})
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  return violations.map(v => `${v.id} (${v.impact}): ${v.nodes.length}× ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(' | ')}`);
}

// Map tiles come from the network; serve one blank tile instead so runs are offline and screenshots stable.
const BLANK_TILE = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/6XqTHQAAAAASUVORK5CYII=', 'base64');
export async function stubMapTiles(page) {
  if (page.vfTilesStubbed) return;
  page.vfTilesStubbed = true;
  await page.route(/tile\.openstreetmap\.org/, route => route.fulfill({contentType: 'image/png', body: BLANK_TILE}));
}

// Drops the delivery pin the way a keyboard user would: focus the map and nudge it.
export async function pinDelivery(page) {
  const map = page.locator('#vf-map.leaflet-container');
  await expect(map).toBeVisible();
  await map.focus();
  await page.keyboard.press('ArrowUp');
  // Only a placed pin shows coordinates (Latin or Persian digits); the instructions have none.
  await expect(page.locator('#vf-pin-status')).toHaveText(/[0-9۰-۹]{2}[.٫][0-9۰-۹]/);
}
