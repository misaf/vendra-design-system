import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

// A bag kept from an earlier visit holds the prices from when its lines were added. Opening it
// prices every line from the current catalog, says so beside each changed line and in the live
// region, and the totals follow the new prices.
for (const lang of ['en', 'fa']) {
  test(`a saved bag opens at current prices with a notice (${lang})`, async ({page}) => {
    const fa = lang === 'fa';
    await openSite(page, 'bag', lang);
    const rows = page.locator('.vf-bag-line');
    const current = await page.evaluate(() => window.__vfSite.state.bag);
    const line = rows.first().locator('.ag-linewrap');
    const before = await line.textContent();
    // Keep the bag as if it was added when the first line cost less, then come back.
    await page.evaluate(() => {
      const key = Object.keys(sessionStorage).find(name => name.startsWith('vendra-template:'));
      const saved = JSON.parse(sessionStorage.getItem(key));
      saved.bag[0].unit -= 100000;
      sessionStorage.setItem(key, JSON.stringify(saved));
    });
    await page.reload({waitUntil: 'domcontentloaded'});
    await page.waitForFunction(
      () => window.__vfRuntime?.rendered && !document.getElementById('root')?.inert
    );
    const notice = rows.first().locator('.ag-alert--info');
    await expect(notice).toBeVisible();
    await expect(notice).toContainText(fa ? 'قیمت هر عدد' : 'Price updated');
    expect(await page.evaluate(() => window.__vfSite.state.bag)).toEqual(current);
    await expect(line).toHaveText(before);
    await expect(
      page.getByRole('status').filter({hasText: fa ? 'قیمت‌های سبد' : 'Prices in your bag'})
    ).toHaveCount(1);
    expect(await scanAxe(page)).toEqual([]);
    // Continuing means the customer saw the new prices: their notices are done.
    await page
      .getByRole('button', {name: fa ? 'ادامه و ارسال' : 'Continue to delivery', exact: true})
      .filter({visible: true})
      .first()
      .click();
    await expect(page).toHaveURL(/step=delivery/);
    expect(await page.evaluate(() => window.__vfSite.state.priceChanges)).toEqual({});
  });
}
