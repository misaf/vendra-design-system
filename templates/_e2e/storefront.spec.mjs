import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {LANGS, VIEWS, openSite, contrast, backgroundBehind} from './helpers.mjs';

// axe checks every routed view in both languages at both widths (mobile/desktop projects).
for (const lang of LANGS) {
  for (const view of Object.keys(VIEWS)) {
    test(`axe: ${view} (${lang})`, async ({page}) => {
      await openSite(page, view, lang);
      // The sticky mobile tab bar overlaps whatever sits at the bottom of a single
      // static viewport, which axe reads as obscured targets. Unstick it so content
      // is judged on its own; the bar itself is still scanned.
      await page.addStyleTag({content: '.vf-shell-bottom-bar{position:static!important}'});
      const {violations} = await new AxeBuilder({page})
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      const summary = violations.map(v => `${v.id} (${v.impact}): ${v.nodes.length}× ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(' | ')}`);
      expect(summary).toEqual([]);
    });
  }
}

test.describe('shell', () => {
  for (const lang of LANGS) {
    test(`direction and language (${lang})`, async ({page}) => {
      await openSite(page, 'home', lang);
      await expect(page.locator('html')).toHaveAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, 'no horizontal page scroll').toBeLessThanOrEqual(0);
    });
  }

  test('footer links use the on-inverse focus ring at 3:1', async ({page}) => {
    await openSite(page, 'home', 'en');
    const link = page.locator('.ag-on-inverse a').first();
    await link.scrollIntoViewIfNeeded();
    await link.focus();
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Tab');
    await expect(link).toBeFocused();
    const ring = await link.evaluate(el => getComputedStyle(el).outlineColor);
    expect(contrast(ring, await backgroundBehind(link))).toBeGreaterThanOrEqual(3);
  });

  test('account tabs drive a linked tabpanel', async ({page}) => {
    await openSite(page, 'account', 'en');
    const tablist = page.getByRole('tablist');
    await tablist.getByRole('tab', {selected: true}).focus();
    await page.keyboard.press('ArrowRight');
    const selected = tablist.getByRole('tab', {selected: true});
    await expect(selected).toBeFocused();
    const panel = page.getByRole('tabpanel');
    await expect(panel).toHaveAttribute('id', await selected.getAttribute('aria-controls'));
    await expect(panel).toHaveAttribute('aria-labelledby', await selected.getAttribute('id'));
  });
});
