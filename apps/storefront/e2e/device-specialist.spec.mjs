import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';
import {reachable, tap, fill, finish} from './device-helpers.mjs';
import {vfCopy as weddingCopy} from '../pages/weddings/copy.js';
import {vfCopy as presentationCopy} from '../pages/presentation/copy.js';

test.use({reducedMotion: 'reduce'});
test.beforeEach(async ({page}, info) => {
  test.skip(!['touch-phone', 'tablet'].includes(info.project.name), 'dedicated touch projects');
  await page.clock.install({time: new Date('2026-10-05T09:00:00+03:30')});
  expect(await page.evaluate(() => navigator.maxTouchPoints)).toBeGreaterThan(0);
});

async function counterShell(page, lang) {
  await expect(page.locator('html')).toHaveAttribute('lang', lang);
  await expect(page.locator('html')).toHaveAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
  await expect(page.getByRole('main')).toHaveCount(1);
  await expect(page.locator('.vf-shell-header, .vf-shell-bottom-bar')).toHaveCount(0);
  await expect(page.locator('.vf-presentation-bar')).toHaveCSS('position', 'sticky');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

for (const lang of ['en', 'fa']) {
  const fa = lang === 'fa';
  test(`touch wedding validation and inquiry anchor retain the draft (${lang})`, async ({
    page
  }, info) => {
    const copy = weddingCopy({lang});
    await openSite(page, 'weddings', lang);
    expect(await page.evaluate(() => window.VF_API.live)).toBe(false);
    await tap(page.getByRole('button', {name: copy.send, exact: true}));
    const summary = page.locator('#vf-wedding-errors');
    await expect(summary).toBeFocused();
    await reachable(summary, {scroll: false});
    await expect(summary.getByRole('link')).toHaveCount(2);
    await tap(summary.getByRole('link').last());
    await expect(page.locator('#vf-wphone')).toBeFocused();
    await reachable(page.locator('#vf-wphone'), {scroll: false});
    await fill(page, '#vf-wname', 'Touch Wedding Guest');
    await fill(page, '#vf-wphone', '09120000000');
    await fill(page, '#vf-wmsg', 'White flowers, garden venue.');
    const plan = page.getByRole('link', {name: copy.plan, exact: true});
    await tap(plan);
    await expect(page).toHaveURL(/#inquiry$/);
    await reachable(page.locator('#inquiry').getByRole('heading').first(), {scroll: false});
    await expect(page.locator('#vf-wname')).toHaveValue('Touch Wedding Guest');
    await expect(page.locator('#vf-wphone')).toHaveValue('09120000000');
    await finish(page, lang, info, page.locator('#vf-wmsg'));
    await expect(page.locator('#vf-wmsg')).toHaveValue('White flowers, garden venue.');
    // Stop before submitting a valid inquiry or opening any external contact action.
  });

  test(`touch presentation tools and shortlist undo remain usable (${lang})`, async ({
    page
  }, info) => {
    const copy = presentationCopy({lang, n: n => new Intl.NumberFormat(lang).format(n)});
    await openSite(page, 'presentation', lang);
    const stage = page.locator('.vf-display');
    await expect(page.locator('.vf-display-photo').first()).toBeVisible();
    await stage.tap({position: {x: 10, y: 10}});
    const tools = page.getByRole('button', {name: copy.sellerTools, exact: true});
    await tap(tools);
    const drawer = page.getByRole('dialog', {name: copy.sellerTools, exact: true});
    await expect(drawer).toBeVisible();
    const close = drawer.getByRole('button', {name: fa ? 'بستن' : 'Close', exact: true});
    await tap(close);
    await expect(drawer).toHaveCount(0);
    await expect(tools).toBeFocused();
    await reachable(tools, {scroll: false});
    await tap(tools);
    await tap(drawer.getByRole('button', {name: copy.browse, exact: true}));
    const search = page.getByRole('searchbox');
    await expect(search).toBeFocused();
    await reachable(search, {scroll: false});
    await counterShell(page, lang);
    // Names come from all visible caption text; the photo adds no duplicate spoken code.
    for (const tile of await page.locator('.vf-presentation-tile').all()) {
      const visible = (await tile.innerText()).replace(/\s+/g, ' ').trim();
      await expect(tile).toHaveAccessibleName(visible, {ignoreCase: true});
    }
    const ids = ['VF-7K2M4Q', 'VF-8RD5WN'];
    for (const id of ids) {
      await tap(
        page.getByRole('button', {name: copy.addShortlist.replace('{code}', id), exact: true})
      );
    }
    const shortlist = page
      .locator('.vf-presentation-tools')
      .getByRole('button', {name: copy.shortlistCount(2), exact: true});
    await tap(shortlist);
    const dialog = page.getByRole('dialog', {name: copy.shortlist, exact: true});
    const items = dialog.getByRole('listitem');
    await expect(items).toHaveCount(2);
    await expect(items.nth(0)).toContainText(ids[0]);
    await expect(items.nth(1)).toContainText(ids[1]);
    await tap(items.first().getByRole('button', {name: copy.remove, exact: true}));
    await expect(items).toHaveCount(1);
    await expect(items.first()).toContainText(ids[1]);
    await tap(dialog.getByRole('button', {name: copy.clear, exact: true}));
    await expect(dialog).toHaveCount(0);
    await tap(page.getByRole('button', {name: copy.undo, exact: true}));
    const restored = page
      .locator('.vf-presentation-tools')
      .getByRole('button', {name: copy.shortlistCount(1), exact: true});
    await tap(restored);
    await expect(items).toHaveCount(1);
    await expect(items.first()).toContainText(ids[1]);
    await tap(dialog.getByRole('button', {name: fa ? 'بستن' : 'Close', exact: true}));
    await expect(restored).toBeFocused();
    await reachable(restored, {scroll: false});
    await page.evaluate(() => scrollTo({top: 0, behavior: 'instant'}));
    expect(await scanAxe(page, {restoreBottomBar: true})).toEqual([]);
    await counterShell(page, lang);
    await reachable(restored);
    if (info.project.name === 'tablet') {
      await page.setViewportSize({width: 768, height: 1024});
      await counterShell(page, lang);
      await reachable(restored);
    }
    // Shortlists are local customer-session state. No send/order handoff is activated.
  });
}
