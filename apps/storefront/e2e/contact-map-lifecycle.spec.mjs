import {test, expect} from '@playwright/test';
import {openSite} from './helpers.mjs';
import {tap} from './device-helpers.mjs';

test.use({reducedMotion: 'reduce'});
test.beforeEach(async ({page}, info) => {
  test.skip(!['touch-phone', 'tablet'].includes(info.project.name), 'dedicated touch projects');
  await page.clock.install({time: new Date('2026-10-05T09:00:00+03:30')});
  // Observe public Leaflet lifecycle events; do not change map options or tile behavior.
  await page.addInitScript(() => {
    window.__contactMapLifecycle = {created: 0, removed: 0, active: new Set()};
    document.addEventListener(
      'load',
      event => {
        if (event.target.tagName !== 'SCRIPT' || !event.target.src.includes('/leaflet.js')) return;
        window.L.Map.addInitHook(function () {
          const state = window.__contactMapLifecycle;
          state.created++;
          state.active.add(this);
          this.on('unload', () => {
            state.removed++;
            state.active.delete(this);
          });
        });
      },
      true
    );
  });
});

async function ready(page, zoom, created) {
  const map = page.locator('#vf-contact-map.leaflet-container');
  await expect(map).toHaveCount(1);
  await expect(map.locator('.leaflet-tile-pane')).toHaveCount(1);
  await expect(map.locator('.leaflet-control-zoom')).toHaveCount(1);
  await expect(map.locator('.ag-place-marker')).toHaveCount(1);
  await expect(map.locator('.ag-place-label')).toHaveCount(1);
  await expect(map).toHaveAttribute('dir', 'ltr');
  await expect(page.locator('script[src$="/leaflet.js"]')).toHaveCount(1);
  await expect(page.locator('#vf-leaflet-css')).toHaveCount(1);
  await expect
    .poll(() =>
      map.evaluate(
        (node, {zoom, created}) => {
          const state = window.__contactMapLifecycle;
          if (state.created !== created || state.active.size !== 1 || state.removed !== created - 1)
            return false;
          const instance = [...state.active][0];
          if (instance.getContainer() !== node || instance.getZoom() !== zoom) return false;
          if (node.querySelector('.leaflet-zoom-anim')) return false;
          const layers = [];
          instance.eachLayer(layer => {
            if (layer instanceof window.L.GridLayer) layers.push(layer);
          });
          if (layers.length !== 1 || layers[0].isLoading()) return false;
          // The highest z-index is the current zoom level. Outgoing empty levels are legitimate:
          // Leaflet prunes their tiles separately and may keep the empty div until another level update.
          const levels = [...node.querySelectorAll('.leaflet-tile-container')];
          const current = levels.sort((a, b) => Number(b.style.zIndex) - Number(a.style.zIndex))[0];
          const tiles = [...(current?.querySelectorAll('img.leaflet-tile') || [])];
          if (
            !tiles.length ||
            tiles.some(
              tile =>
                !tile.complete ||
                !tile.naturalWidth ||
                !tile.classList.contains('leaflet-tile-loaded')
            )
          )
            return false;
          const box = node.getBoundingClientRect();
          const marker = node.querySelector('.ag-place-marker').getBoundingClientRect();
          return (
            Math.abs(marker.x + marker.width / 2 - box.x - box.width / 2) <= 2 &&
            Math.abs(marker.y + marker.height / 2 - box.y - box.height / 2) <= 2
          );
        },
        {zoom, created}
      )
    )
    .toBe(true);
}

async function routeFocus(page) {
  await expect(page.locator('main h1')).toBeFocused();
  // Shell clears focused headings from sticky bars on the next frame. Let that move finish
  // before scrolling to the next route link; do not race it with a corrective test scroll.
  await page.evaluate(
    () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  );
}

async function leave(page, fa, removed) {
  const footer = page.getByRole('contentinfo');
  const help = fa ? 'راهنما' : 'Help';
  const toggle = footer.getByRole('button', {name: help, exact: true});
  if ((await toggle.isVisible()) && (await toggle.getAttribute('aria-expanded')) === 'false')
    await tap(toggle);
  await tap(
    footer
      .getByRole('navigation', {name: help, exact: true})
      .getByRole('link', {name: fa ? 'پرسش‌های متداول' : 'FAQ', exact: true})
  );
  await expect(page).toHaveURL(/\/faq\//);
  await expect(page.locator('#vf-contact-map')).toHaveCount(0);
  await routeFocus(page);
  await expect
    .poll(() =>
      page.evaluate(() => ({
        removed: window.__contactMapLifecycle.removed,
        active: window.__contactMapLifecycle.active.size
      }))
    )
    .toEqual({removed, active: 0});
}

for (const lang of ['en', 'fa']) {
  test(`contact map loads, resizes and releases each mounted instance (${lang})`, async ({
    page
  }, info) => {
    const fa = lang === 'fa';
    const viewport =
      info.project.name === 'tablet' ? {width: 768, height: 1000} : {width: 390, height: 844};
    await page.setViewportSize(viewport);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await openSite(page, 'contact', lang);
    await ready(page, 15, 1);
    // Reproduce the historical full-main capture's viewport enlargement without screenshot masking.
    const height = Math.ceil((await page.locator('main').boundingBox()).height) + 1000;
    await page.setViewportSize({width: viewport.width, height});
    await ready(page, 15, 1);
    await page.setViewportSize({width: 1024, height: 768});
    await ready(page, 15, 1);
    await page.setViewportSize(viewport);
    await ready(page, 15, 1);
    await tap(page.locator('#vf-contact-map .leaflet-control-zoom-in'));
    await ready(page, 16, 1);
    await tap(page.locator('#vf-contact-map .leaflet-control-zoom-out'));
    await ready(page, 15, 1);
    await leave(page, fa, 1);
    for (const created of [2, 3]) {
      await tap(
        page
          .getByRole('main')
          .getByRole('link', {name: fa ? 'تماس با ما' : 'Contact us', exact: true})
      );
      await expect(page).toHaveURL(/\/contact\//);
      await routeFocus(page);
      await ready(page, 15, created);
      await leave(page, fa, created);
    }
    await page.goBack();
    await expect(page).toHaveURL(/\/contact\//);
    await routeFocus(page);
    await ready(page, 15, 4);
    await page.reload();
    await ready(page, 15, 1);
    await leave(page, fa, 1);
    expect(errors).toEqual([]);
  });
}
