import {test, expect} from '@playwright/test';
import {
  expectAccessible,
  openComponent,
  stubMapTiles
} from '../../../apps/storefront/_e2e/component-test.mjs';

test.beforeEach(({page}) => stubMapTiles(page));

test('a named, left-to-right map with a labelled marker per pinned place', async ({page}) => {
  await openComponent(page, 'PlacesMap');
  const map = page.getByRole('region', {name: 'Saved addresses'});
  await expect(map).toHaveAttribute('dir', 'ltr');
  await expect(map.locator('.ag-place-label')).toHaveText(['Home', 'Office']);
});

test('a marker opens its place with a pointer, Enter or Space', async ({page}) => {
  await openComponent(page, 'PlacesMap');
  const output = page.locator('output[data-test=opened]');
  await page.getByRole('button', {name: 'Open Office'}).click();
  await expect(output).toHaveText('office');
  await page.getByRole('button', {name: 'Open Home'}).focus();
  await page.keyboard.press('Enter');
  await expect(output).toHaveText('home');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'PlacesMap');
});

async function observeMap(page) {
  await page.addInitScript(() => {
    document.addEventListener(
      'load',
      event => {
        if (event.target.tagName === 'SCRIPT' && event.target.src.includes('/leaflet.js'))
          window.L.Map.addInitHook(function () {
            window.__fontMap = this;
          });
      },
      true
    );
  });
}

async function lateFont(page, lang, cycle) {
  const file = lang === 'fa' ? 'vazirmatn-var-arabic' : 'jost-var-latin';
  const url = `/assets/fonts/${file}.woff2?map-font-cycle=${cycle}`;
  let release, requested;
  const held = new Promise(resolve => {
    release = resolve;
  });
  const started = new Promise(resolve => {
    requested = resolve;
  });
  await page.route('**/*map-font-cycle=' + cycle, async route => {
    requested();
    await held;
    await route.continue();
  });
  await page.evaluate(
    ({url, cycle}) => {
      const family = 'MapLateFont' + cycle;
      const face = new FontFace(family, `url("${url}")`, {weight: '100 900', display: 'swap'});
      document.fonts.add(face);
      window.__lateMapFont = face;
      document.querySelectorAll('.ag-place-label').forEach(label => {
        label.style.fontFamily = `"${family}", monospace`;
        label.style.fontSize = '24px';
      });
      void face.load();
      // Establish correct fallback positions first; the loaded face must recenter them again.
      window.__fontMap.eachLayer(layer => layer.getTooltip?.()?.update());
    },
    {url, cycle}
  );
  await started;
  return release;
}

for (const lang of ['en', 'fa']) {
  test(`recenters permanent labels after successive font loads (${lang})`, async ({page}) => {
    await observeMap(page);
    await openComponent(page, 'PlacesMap', lang);
    await expect(page.locator('.ag-place-label')).toHaveCount(2);
    await expect(page.locator('.leaflet-zoom-anim')).toHaveCount(0);
    await page.evaluate(() => document.fonts.ready);
    for (const cycle of [1, 2]) {
      const release = await lateFont(page, lang, cycle);
      try {
        const before = await page
          .locator('.ag-place-label')
          .evaluateAll(labels => labels.map(label => label.offsetWidth));
        release();
        await page.evaluate(async () => {
          await window.__lateMapFont.loaded;
          await document.fonts.ready;
        });
        const after = await page
          .locator('.ag-place-label')
          .evaluateAll(labels => labels.map(label => label.offsetWidth));
        expect(after).not.toEqual(before);
        await expect
          .poll(() =>
            page.evaluate(() => {
              let error = 0;
              window.__fontMap.eachLayer(layer => {
                if (!layer.getTooltip?.()) return;
                const label = layer.getTooltip().getElement().getBoundingClientRect();
                const marker = layer.getElement().getBoundingClientRect();
                error = Math.max(
                  error,
                  Math.abs(label.x + label.width / 2 - marker.x - marker.width / 2)
                );
              });
              return error;
            })
          )
          .toBeLessThanOrEqual(1);
      } finally {
        release();
      }
    }
  });
}

test('releases the font listener when unmounted during a pending font load', async ({page}) => {
  await observeMap(page);
  await page.addInitScript(() => {
    const fonts = document.fonts,
      add = fonts.addEventListener.bind(fonts),
      remove = fonts.removeEventListener.bind(fonts);
    window.__mapFontListeners = new Set();
    fonts.addEventListener = (type, listener, options) => {
      if (type === 'loadingdone') window.__mapFontListeners.add(listener);
      return add(type, listener, options);
    };
    fonts.removeEventListener = (type, listener, options) => {
      if (type === 'loadingdone') window.__mapFontListeners.delete(listener);
      return remove(type, listener, options);
    };
  });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await openComponent(page, 'PlacesMap');
  await expect(page.locator('.ag-place-label')).toHaveCount(2);
  const release = await lateFont(page, 'en', 3);
  try {
    await page.getByRole('button', {name: 'Toggle map'}).click();
    await expect(page.locator('.leaflet-container')).toHaveCount(0);
    expect(await page.evaluate(() => window.__mapFontListeners.size)).toBe(0);
    release();
    await page.evaluate(async () => {
      await window.__lateMapFont.loaded;
      await document.fonts.ready;
    });
    await page.getByRole('button', {name: 'Toggle map'}).click();
    await expect(page.locator('.ag-place-label')).toHaveCount(2);
    expect(await page.evaluate(() => window.__mapFontListeners.size)).toBe(1);
    await page.getByRole('button', {name: 'Toggle map'}).click();
    await expect(page.locator('.leaflet-container')).toHaveCount(0);
    expect(await page.evaluate(() => window.__mapFontListeners.size)).toBe(0);
    expect(errors).toEqual([]);
  } finally {
    release();
  }
});
