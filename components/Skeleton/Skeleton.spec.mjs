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

test('stays visible in forced colours, outlined instead of filled', async ({page}) => {
  await page.emulateMedia({forcedColors: 'active'});
  await openComponent(page, 'Skeleton');
  const circle = page.locator('.circle');
  await expect(circle).toHaveCSS('border-top-style', 'solid');
  await expect(circle).toHaveCSS('border-top-width', '1px');
  const shimmer = await circle.evaluate(node => getComputedStyle(node, '::after').display);
  expect(shimmer).toBe('none');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Skeleton');
});
