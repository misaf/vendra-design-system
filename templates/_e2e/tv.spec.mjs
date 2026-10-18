// The storefront on a TV (?tv=1, see templates/README.md → TV mode): read from across the room
// and driven by a remote's arrow keys, in both languages.
import {test, expect} from '@playwright/test';
import {LANGS, openSite, settlePage} from './helpers.mjs';

test.beforeEach(({}, info) => {
  test.skip(info.project.name !== 'tv', 'the tv project');
});

// Every control a viewer can reach that is smaller than 48px either way, measured as it is shown:
// a checkbox or radio by its label, a visually hidden input (a slider's) by the thumb around it, and
// a stretched link (a card's title link, whose ::after covers the card) by the card.
function smallControls(page) {
  return page.evaluate(() => {
    const selector =
      'a[href], button, input:not([type="hidden"]), select, textarea, summary, [role="button"], [tabindex]';
    const clipped = element => getComputedStyle(element).clipPath === 'inset(50%)';
    const shownBox = element => {
      const label = element.tagName === 'INPUT' && element.closest('label');
      if (label) return label.getBoundingClientRect();
      if (element.tagName === 'INPUT' && (clipped(element) || clipped(element.parentElement))) {
        let shown = element.parentElement;
        while (shown && (clipped(shown) || shown.getBoundingClientRect().width <= 2))
          shown = shown.parentElement;
        return shown.getBoundingClientRect();
      }
      let target = element;
      if (getComputedStyle(element, '::after').position === 'absolute')
        while (target.parentElement && getComputedStyle(target).position === 'static')
          target = target.parentElement;
      return target.getBoundingClientRect();
    };
    return [...document.querySelectorAll(selector)]
      .filter(element => {
        if (element.getAttribute('tabindex') === '-1') return false;
        if (element.closest('[inert], [aria-hidden="true"]') || !element.checkVisibility())
          return false;
        const box = shownBox(element);
        return box.width > 2 && box.height > 2 && (box.width < 48 || box.height < 48);
      })
      .map(element => {
        const box = shownBox(element);
        const classes = [...element.classList].filter(name => !name.startsWith('tw:'));
        const name = (element.getAttribute('aria-label') || element.textContent || '').trim();
        return `${element.tagName.toLowerCase()}.${classes.join('.')} "${name.slice(0, 30)}" ${Math.round(box.width)}x${Math.round(box.height)}`;
      });
  });
}

// The bag badge's number, in Latin or Persian digits.
const badgeNumber = text =>
  Number(String(text).replace(/[۰-۹]/g, digit => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))));

for (const lang of LANGS) {
  for (const view of ['home', 'shop', 'product']) {
    test(`${view} reads from across the room (${lang})`, async ({page}) => {
      await openSite(page, view, lang, {tv: '1'});
      await expect(page.locator('html')).toHaveAttribute('data-density', 'tv');
      await settlePage(page);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
      expect(await smallControls(page)).toEqual([]);
    });
  }

  // A remote has only arrows and OK: from a fresh page, steer towards the add-to-bag button the way
  // a viewer would (the arrow pointing at it), then press OK on it.
  test(`the arrow keys reach add to bag (${lang})`, async ({page}) => {
    await openSite(page, 'product', lang, {tv: '1'});
    const add = page.locator('.vf-product-add-button button').first();
    await expect(add).toBeVisible();
    let reached = false;
    for (let step = 0; step < 30 && !reached; step++) {
      const arrow = await add.evaluate(button => {
        const target = button.getBoundingClientRect();
        const focused = document.activeElement;
        if (!focused || focused === document.body) return 'ArrowDown';
        const from = (focused.closest('label') || focused).getBoundingClientRect();
        if (target.top >= from.bottom) return 'ArrowDown';
        if (target.bottom <= from.top) return 'ArrowUp';
        return target.left >= from.right ? 'ArrowRight' : 'ArrowLeft';
      });
      await page.evaluate(() => (window.vfFocusedBefore = document.activeElement));
      await page.keyboard.press(arrow);
      // Every press moves focus somewhere new: nothing traps the remote.
      expect(await page.evaluate(() => document.activeElement !== window.vfFocusedBefore)).toBe(
        true
      );
      reached = await add.evaluate(button => button === document.activeElement);
    }
    expect(reached).toBe(true);
    // The focused button wears the TV ring: a thick outline and a glow around it.
    const ring = await add.evaluate(button => {
      const style = getComputedStyle(button);
      return {outline: parseFloat(style.outlineWidth), glow: style.boxShadow};
    });
    expect(ring.outline).toBeGreaterThanOrEqual(4);
    expect(ring.glow).not.toBe('none');
    // OK on a remote is Enter: one more bouquet in the bag.
    const badge = page.locator('.vf-shell-header .ag-iconbtn__count').filter({visible: true});
    const inBag = (await badge.count()) ? badgeNumber(await badge.textContent()) : 0;
    await page.keyboard.press('Enter');
    await expect.poll(async () => badgeNumber(await badge.textContent())).toBe(inBag + 1);
  });
}

for (const lang of LANGS) {
  test(`product code scales with TV type (${lang})`, async ({page}) => {
    await openSite(page, 'product', lang, {tv: '1'});
    expect(
      await page
        .locator('.vf-product-title h1')
        .evaluate(element => parseFloat(getComputedStyle(element).fontSize))
    ).toBeGreaterThanOrEqual(40);
  });
}
