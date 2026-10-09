import {test, expect} from '@playwright/test';
import {contrast, backgroundBehind} from './helpers.mjs';

const FIXTURE = '/templates/_e2e/fixtures/components.html';
const LILAC_300 = 'rgb(169, 155, 221)';

test.beforeEach(async ({page}) => {
  await page.goto(FIXTURE);
  await expect(page.getByRole('tablist')).toBeVisible();
});

test.describe('Tooltip (WCAG 1.4.13)', () => {
  test('describes its trigger', async ({page}) => {
    const trigger = page.getByRole('button', {name: 'Save'});
    const tip = page.getByRole('tooltip');
    await expect(trigger).toHaveAttribute('aria-describedby', await tip.getAttribute('id'));
    await expect(trigger).toHaveAccessibleDescription('Save to favourites');
  });

  test('shows on hover, stays while hovering the bubble, Esc dismisses until the pointer leaves', async ({
    page
  }) => {
    const trigger = page.getByRole('button', {name: 'Save'});
    const tip = page.getByRole('tooltip');
    await expect(tip).toHaveCSS('opacity', '0');
    await trigger.hover();
    await expect(tip).toHaveCSS('opacity', '1');
    await tip.hover();
    await expect(tip).toHaveCSS('opacity', '1');
    await page.keyboard.press('Escape');
    await expect(tip).toHaveCSS('opacity', '0');
    await trigger.hover();
    await expect(tip).toHaveCSS('opacity', '0');
    await page.mouse.move(0, 0);
    await trigger.hover();
    await expect(tip).toHaveCSS('opacity', '1');
  });

  test('shows on keyboard focus and hides on blur', async ({page}) => {
    const tip = page.getByRole('tooltip');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', {name: 'Save'})).toBeFocused();
    await expect(tip).toHaveCSS('opacity', '1');
    await page.keyboard.press('Escape');
    await expect(tip).toHaveCSS('opacity', '0');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await expect(tip).toHaveCSS('opacity', '1');
  });
});

test.describe('Tabs (ARIA tabs pattern)', () => {
  for (const lang of ['en', 'fa']) {
    test(`arrow keys, Home and End move selection (${lang})`, async ({page}) => {
      await page.goto(FIXTURE + '?lang=' + lang);
      const tab = name => page.getByRole('tab', {name});
      const next = lang === 'fa' ? 'ArrowLeft' : 'ArrowRight';
      await tab('Orders').focus();
      await page.keyboard.press(next);
      await expect(tab('Addresses')).toBeFocused();
      await expect(tab('Addresses')).toHaveAttribute('aria-selected', 'true');
      await page.keyboard.press('End');
      await expect(tab('Profile')).toHaveAttribute('aria-selected', 'true');
      await page.keyboard.press(next);
      await expect(tab('Orders')).toHaveAttribute('aria-selected', 'true');
      await page.keyboard.press('Home');
      await expect(tab('Orders')).toBeFocused();
    });
  }

  test('roving tabindex and panel linkage', async ({page}) => {
    const selected = page.getByRole('tab', {selected: true});
    await expect(page.getByRole('tab')).toHaveCount(3);
    await expect(page.locator('[role=tab][tabindex="0"]')).toHaveCount(1);
    await page.getByRole('tab', {name: 'Profile'}).click();
    // The selected tab controls the visible panel, and the panel is named by that tab.
    const panelId = await selected.getAttribute('aria-controls');
    const panel = page.locator('[id="' + panelId + '"]');
    await expect(panel).toHaveAttribute('role', 'tabpanel');
    await expect(panel).toHaveAttribute('aria-labelledby', await selected.getAttribute('id'));
    await expect(page.getByRole('tabpanel', {name: 'Profile'})).toHaveText('profile panel');
  });
});

test.describe('Toast', () => {
  test('close button is a 44px target and works', async ({page}) => {
    const close = page.getByRole('button', {name: 'Dismiss'});
    const box = await close.boundingBox();
    expect(Math.round(box.width)).toBeGreaterThanOrEqual(44);
    expect(Math.round(box.height)).toBeGreaterThanOrEqual(44);
    await close.click();
    await expect(page.locator('[data-test=closed]')).toHaveText('1');
  });

  test('focus ring uses the on-inverse ring at 3:1', async ({page}) => {
    const close = page.getByRole('button', {name: 'Dismiss'});
    await close.focus();
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Tab');
    await expect(close).toBeFocused();
    await expect(close).toHaveCSS('outline-color', LILAC_300);
    const ring = await close.evaluate(el => getComputedStyle(el).outlineColor);
    const bg = await backgroundBehind(page.locator('.ag-toast'));
    expect(contrast(ring, bg)).toBeGreaterThanOrEqual(3);
  });
});

test.describe('Reduced motion', () => {
  const tipDuration = page =>
    page.getByRole('tooltip').evaluate(el => getComputedStyle(el).transitionDuration);

  test('motion tokens keep their durations by default', async ({page}) => {
    await expect.poll(() => tipDuration(page)).toBe('0.14s, 0.14s');
  });

  test('every token-based transition becomes instant', async ({page}) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    await expect.poll(() => tipDuration(page)).toBe('1e-05s, 1e-05s');
    const slow = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--dur-slow').trim()
    );
    expect(slow).toBe('.01ms');
  });
});
