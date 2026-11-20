import {test, expect} from '@playwright/test';
import {NO_CONSENT, openSite} from '../helpers.mjs';
import {MORNING} from '../delivery-fixtures.mjs';

// Printed, a page is its content: no header, footer, tab bar or cookie notice.
test.describe('print', () => {
  test.use({storageState: NO_CONSENT});
  test('prints the page content without the site chrome', async ({page}) => {
    await openSite(page, 'faq', 'en');
    // The cookie notice: its own bar on desktop, docked in the bottom bar on mobile.
    await expect(page.locator('.vf-shell-consent-dock').first()).toBeVisible();
    await page.emulateMedia({media: 'print'});
    for (const chrome of [
      '.vf-shell-header',
      '.vf-shell-footer',
      '.vf-shell-bottom-bar',
      '.vf-shell-consent-dock'
    ])
      await expect(page.locator(chrome).first()).toBeHidden();
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('main').getByRole('button').first()).toBeVisible();
  });
});

// WCAG 2.4.11 Focus Not Obscured: tabbing through a long page never leaves the focused element
// under the sticky header or the sticky bars at the bottom of the screen.
async function focusObscured(page) {
  return page.evaluate(() => {
    const element = document.activeElement;
    const chrome = '.vf-shell-header, .vf-shell-bottom-bar, .vf-shell-consent-bar';
    if (!element || element === document.body || element.closest(chrome)) return null;
    // A visually hidden input (checkbox, radio) is seen as its label.
    const shown = element.offsetHeight > 2 ? element : element.closest('label') || element;
    const box = shown.getBoundingClientRect();
    if (!box.height || !box.width) return null;
    // What is painted at the element's centre (clamped to the viewport): a sticky bar there means
    // the focused element is hidden under it.
    const x = Math.min(innerWidth - 1, Math.max(0, box.left + box.width / 2));
    const y = Math.min(innerHeight - 1, Math.max(0, box.top + box.height / 2));
    const onTop = document.elementFromPoint(x, y);
    const hidden =
      box.bottom <= 0 ||
      box.top >= innerHeight ||
      (onTop && !element.contains(onTop) && onTop.closest(chrome));
    return hidden
      ? (
          element.textContent ||
          element.getAttribute('aria-label') ||
          shown.textContent ||
          element.tagName
        )
          .trim()
          .slice(0, 40)
      : null;
  });
}

test.describe('focus is never hidden under the sticky bars', () => {
  test.use({storageState: NO_CONSENT});
  for (const [view, lang] of [
    ['shop', 'en'],
    ['shop', 'fa'],
    ['bag', 'en'],
    ['product', 'fa']
  ])
    test(`tabbing through ${view} (${lang})`, async ({page}) => {
      await page.emulateMedia({reducedMotion: 'reduce'});
      await openSite(page, view, lang);
      const hidden = [];
      // The shell nudges the page a frame after focus moves.
      const settled = () =>
        page.evaluate(
          () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
        );
      for (let i = 0; i < 40; i++) {
        await page.keyboard.press('Tab');
        await settled();
        const name = await focusObscured(page);
        if (name) hidden.push(name);
      }
      for (let i = 0; i < 25; i++) {
        await page.keyboard.press('Shift+Tab');
        await settled();
        const name = await focusObscured(page);
        if (name) hidden.push(name);
      }
      expect(hidden).toEqual([]);
    });
});

test('the announcement says when an order placed now arrives, on every page', async ({
  page
}, info) => {
  await page.clock.setFixedTime(MORNING);
  await openSite(page, 'home', 'en');
  const bar = page.getByRole('region', {name: 'Store news'});
  // Phones get the store's shorter version: the delivery line without the free-delivery sentence.
  // Both versions are in the page and CSS shows one, so read the rendered text.
  const shown = {useInnerText: true};
  if (info.project.name === 'mobile') {
    await expect(bar).toContainText('Order by 18:00 for same-day delivery in Karaj.', shown);
    await expect(bar).not.toContainText('Free delivery', shown);
  } else
    await expect(bar).toContainText(
      'Order by 18:00 for same-day delivery in Karaj. Free delivery over 5,000,000 Toman.',
      shown
    );
  await expect(bar.getByRole('link', {name: 'Shop same-day'})).toHaveAttribute(
    'href',
    /\/shop\/\?.*filters=same/
  );
  // The home page opens on its heading and the categories.
  const main = page.getByRole('main');
  await expect(main.locator('section').first()).toHaveClass(/vf-home-top/);
  await expect(main.getByRole('heading', {level: 1})).toHaveText('Shop by category.');
  // After the cut-off, the next delivery day instead, and no same-day link.
  await page.clock.setFixedTime(new Date('2026-10-05T19:00:00+03:30'));
  await openSite(page, 'shop', 'fa');
  const faBar = page.getByRole('region', {name: 'خبر فروشگاه'});
  await expect(faBar).toContainText('نزدیک‌ترین تحویل در کرج: فردا، ۱۴ مهر.');
  await expect(faBar.getByRole('link')).toHaveCount(0);
});
