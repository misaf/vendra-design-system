import {test, expect} from '@playwright/test';
import {openSite} from './helpers.mjs';

// Product.token is the customer-facing name in every storefront collection.
// Localized descriptions remain searchable, but must never replace this identity.
for (const lang of ['en', 'fa']) {
  test(`product codes remain the names across every collection (${lang})`, async ({page}) => {
    test.setTimeout(120000);
    await page.addInitScript(() => {
      localStorage.setItem('vendra-recently-viewed', JSON.stringify(['VF-8RD5WN']));
    });
    for (const view of ['home', 'shop', 'saved', 'notfound', 'post', 'product', 'account']) {
      await openSite(page, view, lang, {id: 'VF-7K2M4Q'});
      if (view === 'account') {
        await page
          .getByRole('tab', {name: lang === 'fa' ? 'ذخیره‌ها' : 'Saved', exact: true})
          .click();
      }
      const cards = page.locator('main .ag-product');
      await expect(cards.first(), view).toBeAttached();
      for (const card of await cards.all()) {
        const link = card.locator('.ag-product__link');
        const code = new URL(await link.getAttribute('href'), page.url()).searchParams.get('id');
        expect(code, view).toMatch(/^VF-[A-Z0-9]+$/);
        await expect(card.locator('.ag-product__name'), view).toHaveText(code);
        await expect(link, view).toHaveAccessibleName(new RegExp(`^${code}(?: —|$)`));
        expect(await link.evaluate(element => getComputedStyle(element).direction)).toBe('ltr');
      }
    }
  });
}
