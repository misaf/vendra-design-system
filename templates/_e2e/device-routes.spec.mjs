// Core routes with real Chromium touch input and the normal sticky shell geometry.
import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

test.use({reducedMotion: 'reduce'});
test.beforeEach(async ({page}, info) => {
  test.skip(!['touch-phone', 'tablet'].includes(info.project.name), 'dedicated touch projects');
  await page.clock.install({time: new Date('2026-10-05T09:00:00+03:30')});
  expect(await page.evaluate(() => navigator.maxTouchPoints)).toBeGreaterThan(0);
});

// Scroll as a user can, then require the entire control to clear the shell and its center to
// receive input. tap() also performs Playwright's normal actionability checks; no force/JS clicks.
async function reachable(control, {scroll = true} = {}) {
  await expect(control).toBeVisible();
  if (scroll)
    await control.evaluate(node => node.scrollIntoView({block: 'center', behavior: 'instant'}));
  await expect
    .poll(() =>
      control.evaluate(node => {
        const r = node.getBoundingClientRect();
        if (r.left < 0 || r.right > innerWidth || r.top < 0 || r.bottom > innerHeight) return false;
        for (const selector of ['.vf-shell-header', '.vf-shell-bottom-bar']) {
          const shell = document.querySelector(selector);
          if (!shell || shell.contains(node)) continue;
          const s = shell.getBoundingClientRect();
          if (!s.height || s.bottom <= 0 || s.top >= innerHeight) continue;
          if (r.top < s.bottom && r.bottom > s.top && r.left < s.right && r.right > s.left)
            return false;
        }
        const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
        return hit === node || node.contains(hit);
      })
    )
    .toBe(true);
}
const button = (page, name) =>
  page.getByRole('button', {name, exact: true}).filter({visible: true}).last();
async function tap(control) {
  await reachable(control);
  await control.tap();
}
async function fill(page, selector, value) {
  const field = page.locator(selector);
  await tap(field);
  await expect(field).toBeFocused();
  await field.fill(value);
}
async function shell(page, lang) {
  await expect(page.locator('html')).toHaveAttribute('lang', lang);
  await expect(page.locator('html')).toHaveAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.locator('.vf-shell-header')).toHaveCSS('position', 'sticky');
  await expect(page.locator('.vf-shell-bottom-bar')).toHaveCSS('position', 'sticky');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}
async function finish(page, lang, info, control) {
  await shell(page, lang);
  await reachable(control);
  // Keep the established content scan policy; actual sticky reachability is checked separately.
  await page.evaluate(() => scrollTo({top: 0, behavior: 'instant'}));
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  expect(await scanAxe(page, {restoreBottomBar: true})).toEqual([]);
  await shell(page, lang);
  await reachable(control);
  if (info.project.name === 'tablet') {
    await page.setViewportSize({width: 768, height: 1024});
    await shell(page, lang);
    await reachable(control);
  }
}
async function delivery(page) {
  await fill(page, '#vf-name', 'Touch Recipient');
  await fill(page, '#vf-phone', '09120000000');
  const map = page.locator('#vf-map.leaflet-container');
  await reachable(map);
  await map.tap({position: {x: 120, y: 100}});
  await expect(page.locator('#vf-map-status')).toHaveText(/[0-9۰-۹]{2}[.٫][0-9۰-۹]/);
  await fill(page, '#vf-address', 'Test street 12, unit 3');
  await fill(page, '#vf-sender', 'Touch Sender');
  await fill(page, '#vf-sender-phone', '09121111111');
}

for (const lang of ['en', 'fa']) {
  const fa = lang === 'fa';
  test(`touch product action remains reachable (${lang})`, async ({page}, info) => {
    await openSite(page, 'product', lang);
    await shell(page, lang);
    await tap(button(page, fa ? 'افزودن به سبد' : 'Add to bag'));
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await reachable(button(page, fa ? 'افزودن به سبد' : 'Add to bag'));
    await finish(page, lang, info, page.locator('.vf-product-ask'));
  });

  test(`touch bag and delivery validation remain reachable (${lang})`, async ({page}, info) => {
    await openSite(page, 'bag', lang);
    await tap(button(page, fa ? 'ادامه و ارسال' : 'Continue to delivery'));
    await expect(page).toHaveURL(/step=delivery/);
    await expect(page.locator('main h1')).toBeFocused();
    await tap(button(page, fa ? 'ادامه و پرداخت' : 'Continue to payment'));
    const summary = page.locator('#vf-errors');
    await expect(summary).toBeFocused();
    await reachable(summary, {scroll: false});
    const link = summary.getByRole('link').first();
    const target = page.locator(await link.getAttribute('href'));
    await tap(link);
    await expect(target).toBeFocused();
    await reachable(target, {scroll: false});
    await finish(page, lang, info, target);
  });

  test(`touch checkout receipt survives reload (${lang})`, async ({page}, info) => {
    await openSite(page, 'bag', lang, {step: 'delivery'});
    await delivery(page);
    await tap(button(page, fa ? 'ادامه و پرداخت' : 'Continue to payment'));
    await expect(page).toHaveURL(/view=checkout/);
    await expect(page.locator('main h1')).toBeFocused();
    await fill(page, '#vf-last4', '1234');
    await fill(page, '#vf-ref', '567890');
    await reachable(button(page, fa ? 'پرداخت کردم — ثبت سفارش' : 'I’ve paid — place order'));
    await page.reload();
    await expect(page.locator('#vf-last4')).toHaveValue('1234');
    await expect(page.locator('#vf-ref')).toHaveValue('567890');
    await finish(page, lang, info, page.locator('#vf-ref'));
    await expect(page.locator('#vf-last4')).toHaveValue('1234');
    await expect(page.locator('#vf-ref')).toHaveValue('567890');
    // Reachability is checked without submitting an order or starting payment.
    await reachable(button(page, fa ? 'پرداخت کردم — ثبت سفارش' : 'I’ve paid — place order'));
  });

  test(`touch contact validation links reach their fields (${lang})`, async ({page}, info) => {
    await openSite(page, 'contact', lang);
    await reachable(page.locator('.leaflet-control-zoom-in'));
    await fill(page, '#vf-cemail', 'shirin@');
    await tap(button(page, fa ? 'ارسال' : 'Send'));
    const summary = page.locator('#vf-contact-errors');
    await expect(summary).toBeFocused();
    await reachable(summary, {scroll: false});
    await expect(summary.getByRole('link')).toHaveCount(2);
    await tap(summary.getByRole('link').last());
    await expect(page.locator('#vf-cmsg')).toBeFocused();
    await reachable(page.locator('#vf-cmsg'), {scroll: false});
    await finish(page, lang, info, page.locator('#vf-cmsg'));
    await expect(page.locator('#vf-cemail')).toHaveValue('shirin@');
  });
}
