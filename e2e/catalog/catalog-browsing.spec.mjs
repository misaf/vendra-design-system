import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from '../helpers.mjs';
import {MORNING} from '../delivery-fixtures.mjs';

test('home occasions open the shop filtered', async ({page}) => {
  await openSite(page, 'home', 'en');
  await page.getByRole('link', {name: /Sympathy/}).click();
  await expect(page).toHaveURL(/occasion=sympathy/);
  await expect(page.locator('main .ag-product')).toHaveCount(2);
  const tag = page.getByRole('button', {name: /Sympathy/}).first();
  await expect(tag).toBeVisible();
});

test('the shop filters by occasion', async ({page}, info) => {
  await openSite(page, 'shop', 'en');
  if (info.project.name === 'mobile') await page.getByRole('button', {name: 'Filters'}).click();
  const occasions = page.getByRole('group', {name: 'Occasion'}).locator('visible=true');
  await expect(occasions.getByRole('button', {name: 'All', exact: true})).toHaveAttribute(
    'aria-pressed',
    'true'
  );
  await occasions.getByRole('button', {name: 'Anniversary'}).click();
  await expect(page).toHaveURL(/occasion=anniversary/);
  await expect(occasions.getByRole('button', {name: 'Anniversary'})).toHaveAttribute(
    'aria-pressed',
    'true'
  );
  expect(await scanAxe(page)).toEqual([]);
  if (info.project.name === 'mobile') await page.keyboard.press('Escape');
  await expect(page.locator('main .ag-product')).toHaveCount(2);
});

test('the product page lists recently viewed products', async ({page}) => {
  await openSite(page, 'product', 'en', {id: 'VF-8RD5WN'});
  await expect(page.getByRole('heading', {name: /Recently viewed/})).toHaveCount(0);
  await openSite(page, 'product', 'en', {id: 'VF-9FA2KE'});
  const recent = page.getByRole('region', {name: /^Recently viewed\./});
  await expect(recent.locator('.ag-product__name')).toHaveText(['VF-8RD5WN']);
  expect(await scanAxe(page)).toEqual([]);
});

test('the shop filters by delivery day', async ({page}, info) => {
  await page.clock.setFixedTime(MORNING);
  await openSite(page, 'shop', 'en');
  if (info.project.name === 'mobile') await page.getByRole('button', {name: 'Filters'}).click();
  // A React Aria Select: a button that opens a listbox.
  await page
    .getByRole('button', {name: /Delivery day/})
    .locator('visible=true')
    .click();
  await expect(page.getByRole('option', {name: /sold out/}).first()).toHaveAttribute(
    'aria-disabled',
    'true'
  );
  await page.getByRole('option', {name: 'Today · 5 October'}).click();
  await expect(page).toHaveURL(/date=2026-10-05/);
  if (info.project.name === 'mobile') {
    await expect(page.getByRole('button', {name: 'Show 3 designs'})).toBeVisible();
    await page.getByRole('button', {name: 'Show 3 designs'}).click();
  }
  // Only same-day designs go today.
  await expect(page.locator('main .ag-product')).toHaveCount(3);
  await page
    .getByRole('button', {name: /Delivers Today/})
    .first()
    .click();
  // Every design again: all six fit on the first page, so there is nothing to show more of.
  await expect(page.locator('main .ag-product')).toHaveCount(6);
  await expect(page.locator('#vf-shop-count')).toContainText('6 designs');
  await expect(page.getByRole('link', {name: 'Show more'})).toHaveCount(0);
  // Filters replace the history entry, so Back leaves the shop instead of undoing each one.
  expect(await page.evaluate(() => history.length)).toBeLessThanOrEqual(2);
});

test('products are known by their code, and the code finds them', async ({page}) => {
  await openSite(page, 'product', 'en', {id: 'VF-8RD5WN'});
  await expect(page.locator('main h1')).toHaveText('VF-8RD5WN');
  await expect(page.locator('.vf-product-subtitle')).toHaveText('Orchid');
  await expect(page.getByRole('link', {name: 'Ask about this design on WhatsApp'})).toHaveAttribute(
    'href',
    /text=.*code%20VF-8RD5WN/
  );
  // An old link by name opens the product, and the address is rewritten with its category and code.
  await openSite(page, 'product', 'en', {id: 'orchid'});
  await expect(page).toHaveURL(/\/product\/VF-8RD5WN\//);
  // The bag and the order are titled by code.
  await openSite(page, 'bag', 'en');
  await expect(page.locator('.ag-line__name').first()).toHaveText('VF-7K2M4Q');
  // Search finds a product by its code, however it is typed.
  await openSite(page, 'search', 'fa');
  await page.fill('#vf-q', 'vf ۸rd');
  await expect(page.getByRole('main').getByRole('link', {name: /VF-8RD5WN/})).toHaveCount(1);
  await expect(page.getByRole('main').getByRole('link', {name: /VF-8RD5WN/})).toHaveAttribute(
    'href',
    /\/product\/VF-8RD5WN\//
  );
});

// A sorted shop is noindex; clearing the sort in place (same h1) makes it indexable again, with its
// canonical address and alternates (issue 151).
test('shop head follows sorting changes made in place', async ({page}, info) => {
  test.skip(info.project.name !== 'desktop', 'desktop only');
  await openSite(page, 'shop', 'en', {sort: 'low'});
  const robots = page.locator('meta[name=robots]');
  await expect(robots).toHaveAttribute('content', 'noindex, follow');
  await expect(page.locator('link[rel=alternate]')).toHaveCount(0);
  await page.locator('.vf-shop-sorting:visible .ag-select button').first().click();
  await page.getByRole('option', {name: 'Featured', exact: true}).click();
  await expect(page).not.toHaveURL(/sort=/);
  await expect(robots).toHaveCount(0);
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
    'href',
    new URL('/en/shop/', page.url()).href
  );
  await expect(page.locator('link[rel=alternate][hreflang=fa]')).toHaveAttribute(
    'href',
    new URL('/fa/shop/', page.url()).href
  );
});

test('the product page saves the design to the saved list', async ({page}) => {
  await openSite(page, 'product', 'en', {id: 'VF-7K2M4Q'});
  const save = page.getByRole('button', {name: 'Save this design'});
  await expect(save).toHaveAttribute('aria-pressed', 'false');
  await save.click();
  await expect(save).toHaveAttribute('aria-pressed', 'true');
  expect(await scanAxe(page)).toEqual([]);
  await openSite(page, 'saved', 'en');
  await expect(page.locator('main .ag-product__name')).toContainText(['VF-7K2M4Q']);
});

test('the shop clears every filter at once', async ({page}, info) => {
  const mobile = info.project.name === 'mobile';
  await openSite(page, 'shop', 'en', {stock: '1'});
  if (mobile) await page.getByRole('button', {name: 'Filters (1)'}).click();
  const occasions = page.getByRole('group', {name: 'Occasion'}).locator('visible=true');
  await occasions.getByRole('button', {name: 'Anniversary', exact: true}).click();
  await expect(page).toHaveURL(/occasion=anniversary/);
  await expect(occasions.getByRole('button', {name: 'Anniversary', exact: true})).toHaveAttribute(
    'aria-pressed',
    'true'
  );
  expect(await scanAxe(page)).toEqual([]);
  if (mobile) {
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', {name: 'Filters (2)'})).toBeVisible();
  }
  await expect(page.locator('main .ag-product__name')).toHaveText(['VF-4CJ6ZB', 'VF-9FA2KE']);
  await page.getByRole('button', {name: 'Clear all'}).click();
  await expect(page).not.toHaveURL(/occasion=|stock=/);
  // Every design again: all six fit on the first page, so there is nothing to show more of.
  await expect(page.locator('main .ag-product')).toHaveCount(6);
  await expect(page.locator('#vf-shop-count')).toContainText('6 designs');
  await expect(page.getByRole('link', {name: 'Show more'})).toHaveCount(0);
  await expect(page.locator('#vf-shop-count')).toBeFocused();
});

test('each filter that is on removes itself, and focus stays in the row', async ({page}) => {
  await openSite(page, 'shop', 'en', {stock: '1', occasion: 'anniversary'});
  const active = page.getByRole('group', {name: 'Active filters'});
  await expect(active.getByRole('button')).toHaveText([
    'Anniversary',
    'In stock only',
    'Clear all'
  ]);
  await expect(active.getByRole('button', {name: 'Remove Anniversary'})).not.toHaveAttribute(
    'aria-pressed'
  );
  expect(await scanAxe(page)).toEqual([]);
  await active.getByRole('button', {name: 'Remove Anniversary'}).click();
  await expect(page).not.toHaveURL(/occasion=/);
  await expect(active.getByRole('button', {name: 'Remove In stock only'})).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).not.toHaveURL(/stock=/);
  await expect(active).toHaveCount(0);
  await expect(page.locator('#vf-shop-count')).toBeFocused();
});

test('the search field clears with its button or Esc', async ({page}) => {
  await openSite(page, 'search', 'en');
  const box = page.getByRole('searchbox', {name: 'Search the shop'});
  const clear = page.getByRole('button', {name: 'Clear search'});
  await expect(clear).toBeHidden();
  await box.fill('rose');
  await expect(clear).toBeVisible();
  await clear.click();
  await expect(box).toHaveValue('');
  await expect(box).toBeFocused();
  await box.fill('rose');
  await box.press('Escape');
  await expect(box).toHaveValue('');
});

test('the product page shows where it sits in the shop', async ({page}) => {
  await openSite(page, 'product', 'en', {id: 'VF-7K2M4Q'});
  const crumbs = page.getByRole('navigation', {name: 'Breadcrumb'});
  await expect(crumbs.getByRole('listitem')).toHaveCount(3);
  await expect(crumbs.getByRole('link', {name: 'Shop'})).toHaveAttribute('href', /\/shop\//);
  await expect(crumbs.getByRole('link', {name: 'Flower boxes'})).toHaveAttribute(
    'href',
    /\/shop\/boxes\//
  );
  await expect(crumbs.locator('[aria-current="page"]')).toHaveText('VF-7K2M4Q');
});

test('ready-made designs: a shop filter, the Ready badge everywhere and a link from home', async ({
  page
}) => {
  await openSite(page, 'home', 'en');
  await page.locator('.vf-home-featured').getByRole('link', {name: 'All ready to send'}).click();
  await expect(page).toHaveURL(/\/shop\/\?.*filters=ready/);
  const main = page.getByRole('main');
  await expect(
    main.getByRole('button', {name: 'Ready to send', pressed: true}).locator('visible=true')
  ).toHaveCount(1);
  // The four ready-made designs, each marked Ready in place of New or Bestseller.
  const cards = main.locator('.ag-product');
  await expect(cards).toHaveCount(4);
  await expect(cards.getByText('Ready', {exact: true})).toHaveCount(4);
  await openSite(page, 'product', 'en', {id: 'VF-4CJ6ZB'});
  await expect(page.locator('.vf-product-heading .ag-badge')).toHaveText('Ready');
  await openSite(page, 'product', 'en', {id: 'VF-7K2M4Q'});
  await expect(page.locator('.vf-product-heading .ag-badge')).toHaveText('New');
});

test('the shop names the open category above its title', async ({page}) => {
  await openSite(page, 'shop', 'en');
  await expect(page.locator('main .ag-sechead__eyebrow')).toHaveText('All flowers');
  await openSite(page, 'shop', 'fa', {cat: 'orchids'});
  await expect(page.locator('main .ag-sechead__eyebrow')).toHaveText('ارکیده');
});

test('the shop lists only categories with designs, and still opens an empty one', async ({
  page
}) => {
  await openSite(page, 'shop', 'en');
  const main = page.getByRole('main');
  await expect(main.getByRole('button', {name: /^Bouquets/}).locator('visible=true')).toHaveCount(
    1
  );
  await expect(main.getByRole('button', {name: /^Plants/})).toHaveCount(0);
  await openSite(page, 'shop', 'en', {cat: 'plants'});
  await expect(
    main.getByRole('button', {name: /^Plants/, pressed: true}).locator('visible=true')
  ).toHaveCount(1);
  await expect(page.getByRole('heading', {name: /Nothing here/})).toBeVisible();
});

test('products say when few are left or when they come back', async ({page}) => {
  await openSite(page, 'product', 'en', {id: 'VF-9FA2KE'});
  const main = page.getByRole('main');
  await expect(main.locator('.vf-product-details .ag-stock')).toHaveText('Only 2 left');
  // The quantity stops at what is left.
  await expect(main.getByRole('button', {name: 'More', exact: true})).toBeEnabled();
  await main.getByRole('button', {name: 'More', exact: true}).click();
  await expect(main.getByRole('button', {name: 'More', exact: true})).toBeDisabled();
  await openSite(page, 'product', 'en', {id: 'VF-6MT3VY'});
  await expect(main.locator('.vf-product-details .ag-stock')).toHaveText('Back on 12 October');
  await openSite(page, 'product', 'fa', {id: 'VF-6MT3VY'});
  await expect(main.locator('.vf-product-details .ag-stock')).toHaveText('موجود از ۲۰ مهر');
  // Cards call out only the products that need attention.
  await openSite(page, 'shop', 'en');
  await expect(page.locator('.vf-shop-product-grid .ag-stock')).toHaveText([
    'Only 2 left',
    'Back on 12 October'
  ]);
  // Each note has its own line under the price, never on top of it.
  for (const card of await page.locator('.vf-shop-product-grid .ag-product:has(.ag-stock)').all()) {
    const price = await card.locator('.ag-product__price').boundingBox();
    const stock = await card.locator('.ag-stock').boundingBox();
    expect(stock.y).toBeGreaterThanOrEqual(price.y + price.height);
  }
});

test('the product page shows its photos full screen', async ({page}) => {
  await openSite(page, 'product', 'en');
  const gallery = page.getByRole('region', {name: 'Product photos'});
  const second = gallery.getByRole('button', {name: 'Photo 2 of 3'});
  await second.click();
  await expect(second).toHaveAttribute('aria-current', 'true');
  const trigger = page.getByRole('button', {name: 'View full screen'});
  await trigger.click();
  const viewer = page.getByRole('dialog', {name: 'Product photos'});
  await expect(viewer.getByText('2 of 3')).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(viewer.getByText('3 of 3')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(second).toHaveAttribute('aria-current', 'true');
  await trigger.click();
  await expect(viewer.getByText('2 of 3')).toBeVisible();
});
