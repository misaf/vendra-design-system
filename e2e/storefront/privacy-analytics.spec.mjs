import {test, expect} from '@playwright/test';
import {NO_CONSENT, choiceTile, openSite, openFooterGroup, scanAxe} from '../helpers.mjs';

test('shop price analytics report the settled range and cancel on navigation', async ({page}) => {
  const start = new Date('2026-10-05T09:00:00+03:30');
  await page.clock.install({time: start});
  await page.setViewportSize({width: 1280, height: 844});
  await openSite(page, 'shop', 'en');
  await page.clock.pauseAt(new Date(start.getTime() + 60_000));

  const priceEvents = () =>
    page.evaluate(() =>
      window.__vfRuntime.track.log.filter(
        event => event.event === 'filter' && event.filter_id === 'price'
      )
    );
  const minimum = page.getByRole('slider', {name: /Minimum/});
  await minimum.press('ArrowUp');
  await expect(page).toHaveURL(/min=100000/);
  await minimum.press('ArrowUp');
  await expect(page).toHaveURL(/min=200000/);
  await page.clock.runFor(799);
  expect(await priceEvents()).toEqual([]);
  await page.clock.runFor(1);
  const settled = {value: expect.stringMatching(/^200000-/), action: 'add'};
  expect(await priceEvents()).toMatchObject([settled]);

  await minimum.press('ArrowUp');
  await expect(page).toHaveURL(/min=300000/);
  await page.evaluate(() => window.__vfSite.navigate({view: 'home'}));
  await expect(page.locator('.vf-home-top')).toBeVisible();
  await page.clock.runFor(800);
  expect(await priceEvents()).toMatchObject([settled]);
});

test('product and recent-list analytics follow navigation across configuration changes', async ({
  page
}) => {
  await page.addInitScript(() =>
    localStorage.setItem('vendra-recently-viewed', JSON.stringify(['VF-8RD5WN', 'VF-3HX9TP']))
  );
  await openSite(page, 'product', 'en');
  const events = name =>
    page.evaluate(name => window.__vfRuntime.track.log.filter(event => event.event === name), name);
  const views = () => events('view_item');
  const recentLists = async () =>
    (await events('view_item_list')).filter(event => event.item_list_id === 'recent');
  await expect
    .poll(views)
    .toMatchObject([{items: [{item_id: 'VF-7K2M4Q'}], value: 41000000, currency: 'IRR'}]);
  const initialList = {
    items: [
      {item_id: 'VF-8RD5WN', index: 0},
      {item_id: 'VF-3HX9TP', index: 1}
    ]
  };
  await expect.poll(recentLists).toMatchObject([initialList]);

  await choiceTile(page.locator('.vf-product-sizes'), /^Classic/).click();
  await expect(page).toHaveURL(/size=classic/);
  await page.locator('.vf-product-recent').getByRole('link', {name: 'VF-8RD5WN'}).click();
  await expect(page.getByRole('heading', {level: 1})).toHaveText('VF-8RD5WN');
  await expect.poll(views).toMatchObject([
    {items: [{item_id: 'VF-7K2M4Q'}], value: 41000000, currency: 'IRR'},
    {items: [{item_id: 'VF-8RD5WN'}], value: 34000000, currency: 'IRR'}
  ]);
  await expect.poll(recentLists).toMatchObject([
    initialList,
    {
      items: [
        {item_id: 'VF-7K2M4Q', index: 0},
        {item_id: 'VF-3HX9TP', index: 1}
      ]
    }
  ]);
  expect(await events('select_item')).toMatchObject([
    {item_list_id: 'recent', items: [{item_id: 'VF-8RD5WN', index: 0}]}
  ]);
  expect(
    await page.evaluate(() => JSON.parse(localStorage.getItem('vendra-recently-viewed')))
  ).toEqual(['VF-8RD5WN', 'VF-7K2M4Q', 'VF-3HX9TP']);
});

test('the storefront reports the contract’s events, and nothing personal', async ({page}, info) => {
  // On phones the shop's filters are in a dialog; the events are the same.
  test.skip(info.project.name !== 'desktop', 'desktop only');
  const warnings = [];
  page.on('console', message => {
    if (message.text().startsWith('VF_TRACK')) warnings.push(message.text());
  });
  const names = () => page.evaluate(() => window.__vfRuntime.track.log.map(event => event.event));
  // The latest event of one kind: page views and product lists follow renders, so other
  // events may come after it.
  const last = name =>
    page.evaluate(
      name => window.__vfRuntime.track.log.findLast(event => event.event === name),
      name
    );
  await openSite(page, 'product', 'en');
  expect(await last('view_item')).toMatchObject({items: [{item_id: 'VF-7K2M4Q'}]});
  // The site changes routes in place, so it reports each page itself: the path, no query.
  expect(await last('page_view')).toMatchObject({language: 'en', page_type: 'product'});
  await page
    .getByRole('button', {name: /^Add to bag/})
    .locator('visible=true')
    .first()
    .click();
  await expect.poll(names).toContain('add_to_cart');
  await page.evaluate(() => window.__vfSite.navigate({view: 'bag'}));
  await expect.poll(names).toContain('view_cart');
  await page.evaluate(() => window.__vfSite.navigate({view: 'search'}));
  await page.getByRole('searchbox').fill('orchid');
  // Once the typing settles, with how many it found.
  await expect
    .poll(() =>
      page.evaluate(() => window.__vfRuntime.track.log.find(event => event.event === 'search'))
    )
    .toMatchObject({search_term: 'orchid', results: 1});
  await page.getByRole('searchbox').fill('09121234567');
  await expect.poll(() => last('search')).toMatchObject({search_term: '(personal data)'});
  // The settled search's results, as a list of product codes.
  expect(await last('view_item_list')).toMatchObject({
    item_list_id: 'search',
    items: [{item_id: 'VF-8RD5WN', index: 0}]
  });
  await page.evaluate(() => window.__vfSite.navigate({view: 'shop'}));
  await expect.poll(() => last('page_view')).toMatchObject({page_type: 'shop'});
  await expect
    .poll(async () => {
      const list = await last('view_item_list');
      return [list?.item_list_id, list?.items.map(item => item.index)];
    })
    .toEqual(['shop', [0, 1, 2, 3, 4, 5]]);
  await page
    .locator('.ag-switch', {hasText: 'In stock only'})
    .locator('visible=true')
    .first()
    .click();
  await expect.poll(() => last('filter')).toMatchObject({filter_id: 'stock', action: 'add'});
  await page.getByRole('button', {name: 'Remove In stock only'}).click();
  await expect.poll(() => last('filter')).toMatchObject({filter_id: 'stock', action: 'remove'});
  // Opening a card says which list it came from and where in it.
  const opened = await page.locator('.vf-shop-product-grid .ag-product__link').nth(1);
  const code = (await opened.textContent()).trim();
  await opened.click();
  await expect
    .poll(() => last('select_item'))
    .toMatchObject({item_list_id: 'shop', items: [{item_id: code, index: 1}]});
  await expect.poll(() => last('page_view')).toMatchObject({page_type: 'product'});
  expect(warnings).toEqual([]);
});

test.describe('a first visit', () => {
  test.use({storageState: NO_CONSENT});

  test('asks about visit counts and remembers the choice', async ({page}) => {
    await openSite(page, 'home', 'en');
    const banner = page.getByRole('region', {name: 'Your privacy'});
    await expect(banner).toBeVisible();
    await expect(banner.getByRole('link', {name: 'Privacy policy'})).toHaveAttribute(
      'href',
      /\/policy\/privacy\//
    );
    expect(await scanAxe(page)).toEqual([]);
    await banner.getByRole('button', {name: 'Essential only'}).click();
    await expect(banner).toHaveCount(0);
    expect(await page.evaluate(() => localStorage.getItem('vf-consent'))).toBe('essential');
    await page.reload();
    await expect(page.locator('#main')).toBeVisible();
    await expect(banner).toHaveCount(0);
    // Cookie settings in the footer asks again and hands focus back afterwards.
    await openFooterGroup(page, 'Help');
    const settings = page.getByRole('button', {name: 'Cookie settings'});
    await settings.click();
    await expect(banner).toBeFocused();
    await banner.getByRole('button', {name: 'Allow visit counts'}).click();
    await expect(settings).toBeFocused();
    expect(
      await page.evaluate(() => [
        localStorage.getItem('vf-consent'),
        (() => {
          const sent = [];
          const stop = window.__vfRuntime.track.subscribe(event => sent.push(event));
          window.__vfRuntime.track.event('search', {});
          stop();
          return sent.length;
        })()
      ])
    ).toEqual(['all', 1]);
  });

  test('can be closed without choosing, for this session only', async ({page}) => {
    await openSite(page, 'home', 'en');
    const banner = page.getByRole('region', {name: 'Your privacy'});
    await banner.getByRole('button', {name: 'Close without choosing'}).click();
    await expect(banner).toHaveCount(0);
    expect(
      await page.evaluate(() => [
        localStorage.getItem('vf-consent'),
        (() => {
          const sent = [];
          const stop = window.__vfRuntime.track.subscribe(event => sent.push(event));
          window.__vfRuntime.track.event('search', {});
          stop();
          return sent.length;
        })()
      ])
    ).toEqual([null, 0]);
    await page.reload();
    await expect(page.locator('#main')).toBeVisible();
    await expect(banner).toHaveCount(0);
    await page.evaluate(() => sessionStorage.clear());
    await page.reload();
    await expect(banner).toBeVisible();
  });

  test('a standalone preview restores focus when reopened consent is dismissed', async ({page}) => {
    await page.goto('/?page=faq');
    const heading = page.getByRole('heading', {level: 1, name: /^Answers,/});
    await expect(heading).toBeVisible();
    const banner = page.getByRole('region', {name: 'Your privacy'});
    const close = banner.getByRole('button', {name: 'Close without choosing'});
    await close.click();
    await expect(banner).toHaveCount(0);
    await page.reload();
    await expect(heading).toBeVisible();
    const settings = page.getByRole('button', {name: 'Cookie settings'});
    await openFooterGroup(page, 'Help');
    await expect(banner).toHaveCount(0);
    await settings.press('Enter');
    await expect(banner).toBeFocused();
    await close.press('Enter');
    await expect(banner).toHaveCount(0);
    await expect(settings).toBeFocused();
    expect(await page.evaluate(() => localStorage.getItem('vf-consent'))).toBeNull();
  });

  test('on desktop the banner is a bar along the bottom that leaves the shop uncovered', async ({
    page
  }, info) => {
    test.skip(info.project.name !== 'desktop', 'desktop layout');
    await openSite(page, 'shop', 'en');
    const banner = page.getByRole('region', {name: 'Your privacy'});
    await expect(banner).toBeVisible();
    const bar = await banner.boundingBox(),
      view = page.viewportSize();
    expect(bar.height).toBeLessThan(120);
    expect(bar.y + bar.height).toBeGreaterThanOrEqual(view.height - 1);
    // The filters sit above it: the sidebar's first controls are not underneath the bar.
    const filters = await page.locator('.vf-shop-sidebar').boundingBox();
    expect(filters.y).toBeLessThan(bar.y);
    expect(await scanAxe(page)).toEqual([]);
  });

  test('a dialog dims the consent bar and keeps clicks off it', async ({page}, info) => {
    test.skip(info.project.name !== 'desktop', 'desktop layout');
    await openSite(page, 'product', 'en');
    await page
      .getByRole('button', {name: /^Add to bag/})
      .locator('visible=true')
      .first()
      .click();
    await expect(page.getByRole('dialog', {name: 'Added to your bag'})).toBeVisible();
    const hit = await page.evaluate(() => {
      const r = document.querySelector('.vf-shell-consent-bar').getBoundingClientRect();
      return document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2).className;
    });
    expect(hit).toContain('ag-dialog__overlay');
  });

  test('sends nothing to analytics before a choice', async ({page}) => {
    await openSite(page, 'home', 'fa');
    await expect(page.getByRole('region', {name: 'حریم خصوصی شما'})).toBeVisible();
    expect(
      await page.evaluate(() =>
        (() => {
          const sent = [];
          const stop = window.__vfRuntime.track.subscribe(event => sent.push(event));
          window.__vfRuntime.track.event('search', {});
          stop();
          return sent.length;
        })()
      )
    ).toBe(0);
  });
});
