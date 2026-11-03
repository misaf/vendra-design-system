import {expect} from '@playwright/test';
import {scanAxe} from './helpers.mjs';

// Scroll as a user can, then require the entire control to clear the shell and its center to
// receive input. tap() also performs Playwright's normal actionability checks; no force/JS clicks.
export async function reachable(control, {scroll = true} = {}) {
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
export async function tap(control) {
  await reachable(control);
  await control.tap();
}
export async function fill(page, selector, value) {
  const field = page.locator(selector);
  await tap(field);
  await expect(field).toBeFocused();
  await field.fill(value);
}
export async function shell(page, lang) {
  await expect(page.locator('html')).toHaveAttribute('lang', lang);
  await expect(page.locator('html')).toHaveAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.locator('.vf-shell-header')).toHaveCSS('position', 'sticky');
  await expect(page.locator('.vf-shell-bottom-bar')).toHaveCSS('position', 'sticky');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}
export async function finish(page, lang, info, control) {
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
