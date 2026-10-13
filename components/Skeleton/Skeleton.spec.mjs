import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test('hidden from screen readers, in the shapes asked for', async ({page}) => {
  await openComponent(page, 'Skeleton');
  for (const shape of ['lines', 'circle', 'card'])
    await expect(page.locator('.' + shape)).toHaveAttribute('aria-hidden', 'true');
  await expect(page.locator('.lines .ag-skel')).toHaveCount(3);
  await expect(page.locator('.circle')).toHaveCSS('height', '48px');
});

test('the shimmer stops with reduced motion', async ({page}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  await openComponent(page, 'Skeleton');
  const running = await page.evaluate(
    () => document.getAnimations().filter(animation => animation.playState === 'running').length
  );
  expect(running).toBe(0);
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Skeleton');
});
