import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

const headerSearch = page =>
  page.locator('.vf-shell-header a[href*="view=search"]').locator('visible=true').first();
const closeSearch = (page, fa) =>
  page.getByRole('link', {name: fa ? 'بستن جستجو' : 'Close search', exact: true});
const params = page => Object.fromEntries(new URL(page.url()).searchParams);

for (const lang of ['en', 'fa']) {
  test(`search survives product exploration and closes to the filtered shop (${lang})`, async ({
    page
  }) => {
    const fa = lang === 'fa';
    await openSite(page, 'shop', lang, {cat: 'bouquets', filters: 'roses', sort: 'low'});
    const origin = params(page);
    await headerSearch(page).click();
    const field = page.getByRole('searchbox');
    const length = await page.evaluate(() => history.length);
    await field.pressSequentially('VF-8RD5WN');
    await expect(field).toHaveValue('VF-8RD5WN');
    await expect(field).toBeFocused();
    expect(params(page).q).toBe('VF-8RD5WN');
    expect(await page.evaluate(() => history.length)).toBe(length);
    await expect(page.locator('.vf-search-name')).toHaveText(['VF-8RD5WN']);
    await page.locator('.vf-search-result').click();
    await expect(page.locator('.vf-product-title h1')).toHaveText('VF-8RD5WN');
    await page.goBack();
    await expect(field).toHaveValue('VF-8RD5WN');
    await expect(page.locator('.vf-search-name')).toHaveText(['VF-8RD5WN']);
    await page.goForward();
    await expect(page.locator('.vf-product-title h1')).toHaveText('VF-8RD5WN');
    await page.goBack();
    await expect(field).toHaveValue('VF-8RD5WN');
    await page.reload();
    await expect(field).toHaveValue('VF-8RD5WN');
    const close = closeSearch(page, fa);
    await close.focus();
    await expect(close).toBeFocused();
    expect(await scanAxe(page)).toEqual([]);
    await close.press('Enter');
    await expect(page.locator('.vf-shop-results')).toBeVisible();
    expect(params(page)).toEqual(origin);
  });

  test(`shared queries survive language changes and clear without history churn (${lang})`, async ({
    page
  }) => {
    const query = lang === 'fa' ? 'ارکیده' : 'Orchid';
    await openSite(page, 'search', lang, {q: query});
    const field = page.getByRole('searchbox');
    await expect(field).toHaveValue(query);
    await expect(page.locator('.vf-search-name')).toHaveText(['VF-8RD5WN']);
    const nextLang = lang === 'fa' ? 'en' : 'fa';
    await page
      .locator(
        `.vf-shell-mobile-lang:visible, .vf-shell-header .ag-lang:visible button[lang="${nextLang}"]`
      )
      .click();
    await expect(page.locator('html')).toHaveAttribute('lang', nextLang);
    await expect(field).toHaveValue(query);
    expect(params(page).q).toBe(query);
    const length = await page.evaluate(() => history.length);
    await field.fill('no-such-flower & + گل');
    await expect(page.locator('.vf-search-result')).toHaveCount(0);
    expect(params(page).q).toBe('no-such-flower & + گل');
    await page.reload();
    await expect(field).toHaveValue('no-such-flower & + گل');
    await field.press('Escape');
    await expect(field).toHaveValue('');
    await expect(field).toBeFocused();
    expect(params(page).q).toBeUndefined();
    const popular = page.locator('main .ag-chip').first();
    const term = await popular.textContent();
    await popular.click();
    await expect(field).toHaveValue(term);
    expect(params(page).q).toBe(term);
    expect(await page.evaluate(() => history.length)).toBe(length);
    expect(await scanAxe(page)).toEqual([]);
    await closeSearch(page, nextLang === 'fa').click();
    await expect(page.locator('.vf-shopping--home')).toBeVisible();
    expect(params(page).lang).toBe(nextLang);
  });

  test(`closing search restores the delivery step and its entered details (${lang})`, async ({
    page
  }) => {
    const fa = lang === 'fa';
    await openSite(page, 'bag', lang, {step: 'delivery'});
    await page.locator('#vf-name').fill('Shirin Ahmadi');
    await headerSearch(page).click();
    await page.getByRole('searchbox').fill('VF-7K2M4Q ');
    await expect(page.getByRole('searchbox')).toHaveValue('VF-7K2M4Q ');
    await closeSearch(page, fa).click();
    await expect(page.locator('#vf-name')).toHaveValue('Shirin Ahmadi');
    expect(params(page)).toMatchObject({view: 'bag', step: 'delivery', lang});
  });
}
