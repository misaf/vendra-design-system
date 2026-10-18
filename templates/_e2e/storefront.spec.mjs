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
    const link = page.locator('footer.ag-on-inverse a').first();
    await link.scrollIntoViewIfNeeded();
    await link.focus();
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Tab');
    await expect(link).toBeFocused();
    const ring = await link.evaluate(el => getComputedStyle(el).outlineColor);
    expect(contrast(ring, await backgroundBehind(link))).toBeGreaterThanOrEqual(3);
    // The weddings band's button: its ring sits outside the pink button, on the dark band.
    const button = page.locator('.vf-home-weddings').getByRole('link').first();
    await button.focus();
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
    const bandRing = await button.evaluate(el => getComputedStyle(el).outlineColor);
    const band = await backgroundBehind(button.locator('..'));
    expect(contrast(bandRing, band)).toBeGreaterThanOrEqual(3);
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

// In Persian, left-to-right fragments (product and order codes, phone numbers, times, emails,
// Latin words) are isolated (dir="ltr", <bdi>, unicode-bidi: isolate or isolate marks in the
// copy), so their digit groups and punctuation never reorder inside right-to-left text.
test.describe('bidi', () => {
  for (const view of Object.keys(VIEWS))
    test(`Persian ${view} isolates left-to-right fragments`, async ({page}) => {
      await openSite(page, view, 'fa');
      const loose = await page.evaluate(() => {
        const mixed =
          /(\+?[0-9۰-۹]{2,}[ \-/:][0-9۰-۹]{2,})|([A-Za-z]+[\-.@:/][A-Za-z0-9])|([A-Za-z]{2,}.*[؀-ۿ])|([؀-ۿ].*[A-Za-z]{2,})/;
        const found = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const text = walker.currentNode.textContent.trim();
          const element = walker.currentNode.parentElement;
          if (!mixed.test(text) || /[⁦-⁩]/.test(text) || !element.offsetParent) continue;
          let isolated = false;
          for (let node = element; node && node !== document.body; node = node.parentElement) {
            const dir = node.getAttribute('dir');
            if (dir === 'ltr' || dir === 'auto' || node.tagName === 'BDI') isolated = true;
            else if (/isolate|plaintext/.test(getComputedStyle(node).unicodeBidi)) isolated = true;
            if (isolated || dir === 'rtl') break;
          }
          if (!isolated) found.push(text.slice(0, 60));
        }
        return found;
      });
      expect(loose).toEqual([]);
    });
});
