import {expect} from '@playwright/test';

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
