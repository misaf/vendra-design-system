import {test, expect} from '@playwright/test';
import {LANGS, VIEWS, openSite, scanAxe, contrast, backgroundBehind} from './helpers.mjs';

// axe checks every routed view in both languages at both widths (mobile/desktop projects).
for (const lang of LANGS) {
  for (const view of Object.keys(VIEWS)) {
    test(`axe: ${view} (${lang})`, async ({page}) => {
      await openSite(page, view, lang);
      expect(await scanAxe(page)).toEqual([]);
    });
  }
}

test.describe('shell', () => {
  for (const lang of LANGS) {
    test(`direction and language (${lang})`, async ({page}) => {
      await openSite(page, 'home', lang);
      await expect(page.locator('html')).toHaveAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
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

  test('first load leaves focus at the top; in-site navigation focuses the heading', async ({
    page
  }, info) => {
    test.skip(info.project.name !== 'desktop', 'uses the desktop header links');
    await openSite(page, 'home', 'en');
    await page.waitForTimeout(200);
    await page.keyboard.press('Tab');
    await expect(page.locator('.ag-skip')).toBeFocused();
    // Keep tabbing (as a keyboard user would) to the header's Shop link.
    const shop = page
      .getByRole('navigation')
      .getByRole('link', {name: 'Shop', exact: true})
      .first();
    for (let i = 0; i < 10 && !(await shop.evaluate(el => el === document.activeElement)); i++)
      await page.keyboard.press('Tab');
    await expect(shop).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/view=shop/);
    await expect(page.locator('main h1')).toBeFocused();
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
