import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

// A 1×1 PNG for every photo request; `held` waits until the test releases it.
const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
  'base64'
);
async function servePhotos(page) {
  let release;
  const held = new Promise(resolve => (release = resolve));
  const requested = [];
  await page.route('**/photo/**', async route => {
    const url = new URL(route.request().url()).pathname;
    requested.push(url);
    if (url.includes('held')) await held;
    await route.fulfill({contentType: 'image/png', body: PNG});
  });
  return {release, requested};
}

test('offers AVIF, then WebP, then the original widths, at the size the layout shows', async ({
  page
}) => {
  const photos = await servePhotos(page);
  photos.release();
  await openComponent(page, 'Picture');
  const picture = page.locator('picture').filter({has: page.locator('.lazy')});
  const sources = picture.locator('source');
  await expect(sources).toHaveCount(2);
  await expect(sources.nth(0)).toHaveAttribute('type', 'image/avif');
  await expect(sources.nth(1)).toHaveAttribute('type', 'image/webp');
  await expect(sources.nth(0)).toHaveAttribute('sizes', '200px');
  const img = page.locator('.lazy');
  await expect(img).toHaveAttribute('srcset', /480w, .*960w/);
  await expect(img).toHaveAttribute('sizes', '200px');
  // The intrinsic size reserves the space before the photo arrives.
  await expect(img).toHaveAttribute('width', '1200');
  await expect(img).toHaveAttribute('height', '1500');
  // Chrome reads AVIF, so it never asks for the JPEG.
  await expect.poll(() => photos.requested.some(url => url.endsWith('-480.avif'))).toBe(true);
  expect(photos.requested.filter(url => url.endsWith('.jpg'))).toEqual([]);
});

test('loads lazily unless it is the photo a page shows first', async ({page}) => {
  (await servePhotos(page)).release();
  await openComponent(page, 'Picture');
  await expect(page.locator('.lazy')).toHaveAttribute('loading', 'lazy');
  await expect(page.locator('.lazy')).toHaveAttribute('decoding', 'async');
  await expect(page.locator('.held')).toHaveAttribute('loading', 'eager');
  await expect(page.locator('.held')).toHaveAttribute('fetchpriority', 'high');
});

test('shows the blurred placeholder until the photo has loaded', async ({page}) => {
  const photos = await servePhotos(page);
  await openComponent(page, 'Picture');
  const held = page.locator('.held');
  await expect(held).toHaveClass(/ag-picture--waiting/);
  await expect(held).toHaveCSS('background-image', /^url\("data:image\/svg\+xml/);
  photos.release();
  await expect(held).not.toHaveClass(/ag-picture--waiting/);
  await expect(held).toHaveCSS('background-image', 'none');
});

test('a URL alone is a plain img; alt comes from the photo unless given, and no src renders nothing', async ({
  page
}) => {
  (await servePhotos(page)).release();
  await openComponent(page, 'Picture');
  const plain = page.locator('.plain');
  await expect(plain).toHaveAttribute('src', '/photo/plain.png');
  await expect(plain).toHaveAttribute('alt', '');
  await expect(plain).not.toHaveAttribute('srcset');
  await expect(page.locator('picture .plain')).toHaveCount(0);
  await expect(page.getByRole('img', {name: 'Ivory roses in a linen box'})).toHaveClass(/held/);
  await expect(page.locator('.lazy')).toHaveAttribute('alt', '');
  await expect(page.locator('.empty')).toHaveCount(0);
});

test('passes axe in English and Persian', async ({page}) => {
  (await servePhotos(page)).release();
  await expectAccessible(page, 'Picture');
});
