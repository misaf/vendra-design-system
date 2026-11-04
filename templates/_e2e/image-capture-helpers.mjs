import {expect} from '@playwright/test';
import {settlePage} from './helpers.mjs';

async function state(page, selector) {
  return page.locator(selector).evaluateAll(images =>
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

export async function captureImages(
  page,
  info,
  name,
  viewport,
  {selector, count, captureSelector = 'main'}
) {
  await expect(page.locator(selector)).toHaveCount(count);
  await settlePage(page);
  const settled = await state(page, selector);
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
    await page.locator(selector).evaluateAll(async images => {
      await Promise.all(images.map(image => image.decode()));
      await Promise.all(
        document
          .getAnimations()
          .filter(animation => animation.effect?.getComputedTiming().endTime !== Infinity)
          .map(animation => animation.finished.catch(() => {}))
      );
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    });
    const decoded = await state(page, selector);
    for (const image of decoded) {
      expect(image.complete).toBe(true);
      expect(image.naturalWidth).toBeGreaterThan(0);
      expect(image.naturalHeight).toBeGreaterThan(0);
      expect(image.waiting).toBe(false);
      expect(image.opacity).toBe('1');
      expect(image.width).toBeGreaterThan(0);
      expect(image.height).toBeGreaterThan(0);
    }
    await info.attach(name + '-images', {
      body: JSON.stringify({settled, decoded, viewport, capture: enlarged}, null, 2),
      contentType: 'application/json'
    });
    const regions = page.locator(captureSelector);
    await expect(regions).not.toHaveCount(0);
    for (let index = 0; index < (await regions.count()); index++) {
      const region = regions.nth(index);
      const first = await region.screenshot({animations: 'disabled'});
      const second = await region.screenshot({animations: 'disabled'});
      await info.attach(`${name}-${index}-first`, {body: first, contentType: 'image/png'});
      await info.attach(`${name}-${index}-second`, {body: second, contentType: 'image/png'});
      // Same-page repeatability only; not a baseline or cross-commit comparison.
      expect(first.equals(second), `${name} region ${index} consecutive decoded captures`).toBe(
        true
      );
    }
    return decoded;
  } finally {
    await page.setViewportSize(viewport);
    await page.evaluate(() => scrollTo(0, 0));
  }
}
