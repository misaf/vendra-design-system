import {test, expect} from '@playwright/test';
import {openSite, settlePage} from './helpers.mjs';

test.use({reducedMotion: 'reduce'});
test.beforeEach(async ({page}, info) => {
  test.skip(info.project.name !== 'desktop', 'historical capture diagnostic, not device coverage');
  await page.clock.install({time: new Date('2026-10-05T09:00:00+03:30')});
});

const photos = '.vf-shop-product-grid .ag-product img';
async function state(page) {
  return page.locator(photos).evaluateAll(images =>
    images.map(image => {
      const box = image.getBoundingClientRect();
      const style = getComputedStyle(image);
      return {
        src: image.currentSrc.replaceAll(location.origin, 'PREVIEW_ORIGIN'),
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        loading: image.loading,
        decoding: image.decoding,
        waiting: image.classList.contains('ag-picture--waiting'),
        opacity: style.opacity,
        width: box.width,
        height: box.height
      };
    })
  );
}

async function capture(page, info, name, viewport) {
  await expect(page.locator(photos)).toHaveCount(4);
  await settlePage(page);
  const settled = await state(page);
  const main = page.locator('main');
  const initial = await main.boundingBox();
  try {
    // A locator screenshot can scroll/resize its capture surface. Make the whole main visible
    // before decoding so offscreen async images are painted at the final capture dimensions.
    await page.setViewportSize({width: viewport.width, height: Math.ceil(initial.height) + 1000});
    await settlePage(page);
    const enlarged = await main.boundingBox();
    expect([enlarged.width, enlarged.height]).toEqual([initial.width, initial.height]);
    await main.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    await page.locator(photos).evaluateAll(async images => {
      await Promise.all(images.map(image => image.decode()));
      await Promise.all(
        document
          .getAnimations()
          .filter(animation => animation.effect?.getComputedTiming().endTime !== Infinity)
          .map(animation => animation.finished.catch(() => {}))
      );
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    });
    const decoded = await state(page);
    for (const image of decoded) {
      expect(image.complete).toBe(true);
      expect(image.naturalWidth).toBeGreaterThan(0);
      expect(image.naturalHeight).toBeGreaterThan(0);
      expect(image.waiting).toBe(false);
      expect(image.opacity).toBe('1');
      expect(image.width).toBeGreaterThan(0);
      expect(image.height).toBeGreaterThan(0);
    }
    const first = await main.screenshot({animations: 'disabled'});
    const second = await main.screenshot({animations: 'disabled'});
    await info.attach(name + '-images', {
      body: JSON.stringify({settled, decoded, viewport, capture: enlarged}, null, 2),
      contentType: 'application/json'
    });
    await info.attach(name + '-first', {body: first, contentType: 'image/png'});
    await info.attach(name + '-second', {body: second, contentType: 'image/png'});
    // Same-page repeatability only; this is not a comparison with a baseline or another commit.
    expect(first.equals(second), name + ' consecutive decoded captures').toBe(true);
    return decoded;
  } finally {
    await page.setViewportSize(viewport);
    await page.evaluate(() => scrollTo(0, 0));
  }
}

for (const width of [768, 1920]) {
  test.describe(`shop capture at ${width}px`, () => {
    test.use({viewport: {width, height: 1000}, hasTouch: width === 768});
    for (const lang of ['en', 'fa']) {
      test(`decoded photos survive direct, reload and routed capture (${lang})`, async ({
        page
      }, info) => {
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        const viewport = {width, height: 1000};
        const extra = width === 1920 ? {tv: '1'} : {};
        await openSite(page, 'shop', lang, extra);
        const direct = await capture(page, info, 'direct', viewport);
        await page.reload();
        expect(await capture(page, info, 'reload', viewport)).toEqual(direct);
        await openSite(page, 'home', lang, extra);
        await page.evaluate(() => {
          window.__shopCaptureDocument = true;
        });
        const entry = page.locator('.vf-home-arrivals .ag-sechead a[href*="view=shop"]').first();
        await entry.scrollIntoViewIfNeeded();
        if (width === 768) await entry.tap();
        else await entry.click();
        await expect(page.locator('main h1')).toBeFocused();
        await page.evaluate(
          () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
        );
        expect(await page.evaluate(() => window.__shopCaptureDocument)).toBe(true);
        expect(await capture(page, info, 'routed', viewport)).toEqual(direct);
        expect(errors).toEqual([]);
      });
    }
  });
}
