import {test, expect} from '@playwright/test';
import {openSite} from './helpers.mjs';

// Counter workflows remain available from the display-first presentation.
async function openCounter(page, lang) {
  await openSite(page, 'presentation', lang);
  await page.locator('.vf-display').press('Enter');
  await page
    .getByRole('button', {name: lang === 'fa' ? 'ابزار فروشنده' : 'Seller tools', exact: true})
    .click();
  await page
    .getByRole('button', {name: lang === 'fa' ? 'مرور طرح‌ها' : 'Browse designs', exact: true})
    .click();
}

test('the counter presentation finds, quotes, shortlists and hands over an order', async ({
  page
}) => {
  await openCounter(page, 'en');
  // No site chrome: the page is the designs.
  await expect(page.locator('.vf-shell-header, .vf-shell-footer')).toHaveCount(0);
  // Part of a code and Enter open that design full screen.
  await page.getByLabel('Find a design').fill('7k2');
  await page.getByLabel('Find a design').press('Enter');
  const viewer = page.getByRole('dialog', {name: 'Designs'});
  await expect(viewer.getByText('VF-7K2M4Q')).toBeVisible();
  // Its sizes and extras, folded away until asked for, change the price it comes to.
  await expect(viewer.getByText('4,100,000 Toman')).toBeVisible();
  await expect(viewer.getByRole('button', {name: /Classic/})).toHaveCount(0);
  await viewer.getByRole('button', {name: 'Size and extras'}).click();
  await viewer.getByRole('button', {name: /Classic/}).click();
  await viewer.getByRole('button', {name: 'Glass vase'}).click();
  await expect(viewer.getByText('5,550,000 Toman')).toBeVisible();
  await viewer.getByRole('button', {name: 'Add to the order'}).click();
  await viewer.getByRole('button', {name: 'Add VF-7K2M4Q to the shortlist'}).click();
  await page.keyboard.press('Escape');
  await page.getByLabel('Find a design').fill('');
  await page.getByRole('button', {name: 'Add VF-8RD5WN to the shortlist'}).click();
  // The shortlist compares the starred designs and sends them as one link.
  await page.getByRole('button', {name: 'Shortlist, 2'}).click();
  const shortlist = page.getByRole('dialog', {name: 'Shortlist'});
  await expect(shortlist.getByRole('listitem')).toHaveCount(2);
  await shortlist.getByRole('button', {name: 'Send the shortlist'}).click();
  await expect(page.getByRole('dialog', {name: 'The customer’s shortlist'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'Share on WhatsApp'})).toHaveAttribute(
    'href',
    /%2Fsaved%2F%3Fids%3DVF-7K2M4Q%252CVF-8RD5WN/
  );
  await page.keyboard.press('Escape');
  // The order opens in the customer's own bag.
  await page.getByRole('button', {name: 'Order, 1'}).click();
  await page.getByRole('button', {name: 'Hand over the order'}).click();
  const link = await page.getByRole('link', {name: 'Share on WhatsApp'}).getAttribute('href');
  const handed = new URL(decodeURIComponent(link.split('?text=')[1]));
  expect(handed.searchParams.get('lines')).toBe('VF-7K2M4Q.classic.vase.1');
  const phone = await page.context().newPage();
  await phone.goto(handed.pathname + handed.search);
  await expect(phone).toHaveURL(/\/bag\/$/);
  await expect(phone.getByText('VF-7K2M4Q').first()).toBeVisible();
  await expect(phone.getByText(/Classic · 20 stems · Glass vase/).first()).toBeVisible();
});

test('presentation sharing preserves the quoted size and extras on the customer’s phone', async ({
  page
}) => {
  await openCounter(page, 'en');
  await page.getByRole('button', {name: /^VF-7K2M4Q /}).click();
  const viewer = page.getByRole('dialog', {name: 'Designs'});
  await viewer.getByRole('button', {name: 'Size and extras'}).click();
  await viewer.getByRole('button', {name: /Classic/}).click();
  await viewer.getByRole('button', {name: 'Glass vase', exact: true}).click();
  await expect(viewer.getByText('5,550,000 Toman')).toBeVisible();
  await viewer.getByRole('button', {name: 'Send to customer'}).click();
  const href = await page.getByRole('link', {name: 'Share on WhatsApp'}).getAttribute('href');
  const shared = new URL(new URL(href).searchParams.get('text').split('\n').pop());
  expect(shared.searchParams.get('size')).toBe('classic');
  expect(shared.searchParams.get('addons')).toBe('vase');
  const phone = await page.context().newPage();
  await phone.goto(shared.href);
  await expect(phone.getByRole('radio', {name: 'Classic', exact: true})).toBeChecked();
  await expect(phone.getByRole('checkbox', {name: /Glass vase/})).toBeChecked();
  await expect(
    phone
      .getByText(/5,550,000 Toman/)
      .locator('visible=true')
      .first()
  ).toBeVisible();
  await phone.reload();
  await expect(
    phone
      .getByText(/5,550,000 Toman/)
      .locator('visible=true')
      .first()
  ).toBeVisible();
  // The same product opens with the quote's choices in Persian too.
  shared.pathname = shared.pathname.replace('/en/', '/fa/');
  await phone.goto(shared.href);
  await expect(phone.locator('html')).toHaveAttribute('lang', 'fa');
  await expect(phone.getByRole('radio', {name: /کلاسیک/})).toBeChecked();
});

test('presentation wake-lock rejection waits for a visibility change before retrying', async ({
  page
}) => {
  await page.clock.install();
  await page.addInitScript(() => {
    window.__vfWakeRequests = 0;
    Object.defineProperty(navigator, 'wakeLock', {
      value: {
        request: async () => {
          window.__vfWakeRequests++;
          await new Promise(resolve => setTimeout(resolve, 10));
          throw new DOMException('Screen lock denied', 'NotAllowedError');
        }
      }
    });
  });
  await openCounter(page, 'en');
  await page.clock.runFor(1_000);
  expect(await page.evaluate(() => window.__vfWakeRequests)).toBe(1);
  await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
  await page.clock.runFor(1_000);
  expect(await page.evaluate(() => window.__vfWakeRequests)).toBe(2);
});

for (const lang of ['en', 'fa']) {
  const labels =
    lang === 'en'
      ? {
          settings: 'Presentation settings',
          prices: 'Show prices',
          done: 'Done',
          order: 'Order, 1',
          viewer: 'Designs',
          add: 'Add to the order',
          search: 'Find a design',
          clear: 'Clear search and category',
          unlock: 'Enter the PIN'
        }
      : {
          settings: 'تنظیمات نمایش',
          prices: 'نمایش قیمت‌ها',
          done: 'انجام شد',
          order: 'سفارش، ۱',
          viewer: 'طرح‌ها',
          add: 'افزودن به سفارش',
          search: 'پیدا کردن طرح',
          clear: 'پاک کردن جست‌وجو و نوع',
          unlock: 'رمز را وارد کنید'
        };

  test(`presentation hides order prices and restores them when enabled (${lang})`, async ({
    page
  }) => {
    await openCounter(page, lang);
    await page.locator('.vf-presentation-tile').first().click();
    await page
      .getByRole('dialog', {name: labels.viewer})
      .getByRole('button', {name: labels.add, exact: true})
      .click();
    await page.keyboard.press('Escape');
    await page.getByRole('button', {name: labels.settings}).click();
    await page.getByRole('switch', {name: labels.prices, exact: true}).press('Space');
    await page.getByRole('button', {name: labels.done, exact: true}).click();
    await page.getByRole('button', {name: labels.order, exact: true}).click();
    const order = page.getByRole('dialog');
    await expect(order.locator('.ag-price')).toHaveText(['']);
    await expect(
      order.getByRole('textbox', {name: lang === 'en' ? 'Quantity' : 'تعداد'})
    ).toBeVisible();
    await page.keyboard.press('Escape');
    await page.getByRole('button', {name: labels.settings}).click();
    await page.getByRole('switch', {name: labels.prices, exact: true}).press('Space');
    await page.getByRole('button', {name: labels.done, exact: true}).click();
    await page.getByRole('button', {name: labels.order, exact: true}).click();
    await expect(order.locator('.ag-price')).toHaveCount(2);
    await expect(order.locator('.ag-price').first()).not.toHaveText('');
  });

  test(`presentation search recovery preserves PIN-protected device filters (${lang})`, async ({
    page
  }) => {
    await page.addInitScript(() =>
      localStorage.setItem(
        'vf-presentation',
        JSON.stringify({readyOnly: true, hideSoldOut: true, pin: '2468'})
      )
    );
    await openCounter(page, lang);
    await page.getByLabel(labels.search).fill('nonexistent');
    await page.getByRole('button', {name: labels.clear, exact: true}).click();
    await expect(page.locator('.vf-presentation-tile')).toHaveCount(4);
    await page.getByRole('button', {name: labels.settings}).click();
    await expect(page.getByRole('dialog', {name: labels.unlock, exact: true})).toBeVisible();
    await page.keyboard.press('Escape');
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('vf-presentation')))).toEqual({
      readyOnly: true,
      hideSoldOut: true,
      pin: '2468'
    });
    await page.reload();
    await expect(page.locator('.vf-presentation-tile')).toHaveCount(4);
  });

  test(`presentation keeps search usable with every customer tool on narrow screens (${lang})`, async ({
    page
  }) => {
    await page.addInitScript(() => {
      window.BarcodeDetector = class {};
    });
    await openCounter(page, lang);
    await page.locator('.vf-presentation-tile').first().click();
    await page
      .getByRole('dialog', {name: labels.viewer})
      .getByRole('button', {name: labels.add, exact: true})
      .click();
    await page.keyboard.press('Escape');
    for (const width of [320, 390]) {
      await page.setViewportSize({width, height: 844});
      await expect
        .poll(() => page.getByLabel(labels.search).evaluate(el => el.getBoundingClientRect().width))
        .toBeGreaterThan(150);
      await expect
        .poll(() =>
          page.locator('.vf-presentation-search').evaluate(el => el.getBoundingClientRect().width)
        )
        .toBeGreaterThanOrEqual(width - 48);
      await page.getByLabel(labels.search).fill('7k2');
      await expect(page.locator('.vf-presentation-tile')).toHaveCount(1);
      await expect(page.getByRole('button', {name: labels.settings})).toBeInViewport();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        )
      ).toBe(0);
    }
  });
}

test('the presentation settings sit behind their PIN once one is set', async ({page}) => {
  await openCounter(page, 'fa');
  await page.getByRole('button', {name: 'تنظیمات نمایش'}).click();
  await page.getByLabel('رمز تنظیمات').fill('2468');
  await expect(page.getByText('رمز تعیین شد')).toBeVisible();
  await page.getByRole('button', {name: 'انجام شد', exact: true}).click();
  await page.getByRole('button', {name: 'تنظیمات نمایش'}).click();
  await page.getByLabel('تنظیمات قفل است.').fill('1111');
  await expect(page.getByText('رمز درست نیست.')).toBeVisible();
  await page.getByLabel('تنظیمات قفل است.').fill('2468');
  await expect(page.getByRole('dialog', {name: 'تنظیمات نمایش'})).toBeVisible();
});

test('untouched, the presentation plays its designs; a touch keeps the one on screen', async ({
  page
}) => {
  await page.clock.install();
  await page.addInitScript(() =>
    localStorage.setItem('vf-presentation', JSON.stringify({slideshow: true}))
  );
  await openCounter(page, 'en');
  const viewer = page.getByRole('dialog', {name: 'Designs'});
  // Photos only: each design's code and price, without the controls.
  await page.clock.runFor(61_000);
  await expect(viewer.getByText('VF-7K2M4Q')).toBeVisible();
  await expect(viewer.getByText('1 of 6')).toBeHidden();
  await expect(viewer.getByRole('button', {name: 'Send to customer'})).toBeHidden();
  await page.clock.runFor(6_000);
  await expect(viewer.getByText('VF-3HX9TP')).toBeVisible();
  // A touch stops it on that design and brings the controls back.
  await page.mouse.click(5, 300);
  await expect(viewer.getByText('2 of 6')).toBeVisible();
  await page.clock.runFor(12_000);
  await expect(viewer.getByText('VF-3HX9TP')).toBeVisible();
});

test('presentation tiles are named with their price and Ready', async ({page}) => {
  await openCounter(page, 'en');
  const tile = page.getByRole('button', {name: 'Ready VF-3HX9TP 2,800,000 Toman'});
  await expect(tile).toBeVisible();
  await expect(tile).toHaveAccessibleDescription('Show VF-3HX9TP full screen');
});

test('a sold-out design is shown and starred, but not offered for sale', async ({page}) => {
  await openCounter(page, 'en');
  await page.getByRole('button', {name: /^VF-6MT3VY Sold out /}).click();
  const viewer = page.getByRole('dialog', {name: 'Designs'});
  await expect(viewer.getByText('Sold out')).toBeVisible();
  await expect(viewer.getByRole('button', {name: 'Add VF-6MT3VY to the shortlist'})).toBeVisible();
  await expect(viewer.getByRole('button', {name: 'Send to customer'})).toHaveCount(0);
  await expect(viewer.getByRole('button', {name: 'Add to the order'})).toHaveCount(0);
  await expect(viewer.getByRole('button', {name: 'Size and extras'})).toHaveCount(0);
});

test('a design that sells out after it was ordered is not handed over', async ({page}) => {
  // A live API that, from the next stock check, has VF-7K2M4Q sold out.
  let soldOut = false;
  await page.route('https://api.test/**', route =>
    route.fulfill({
      json: route.request().url().includes('/api/catalog/products?')
        ? {member: [{token: 'VF-7K2M4Q', inStock: !soldOut}]}
        : {}
    })
  );
  await page.addInitScript(() => {
    let runtime;
    Object.defineProperty(window, '__vfRuntime', {
      configurable: true,
      get: () => runtime,
      set: value => {
        runtime = value;
        const api = value.api;
        api.setBase('https://api.test');
      }
    });
  });
  await page.clock.install();
  await openCounter(page, 'en');
  await page.getByRole('button', {name: /^VF-7K2M4Q /}).click();
  const viewer = page.getByRole('dialog', {name: 'Designs'});
  await viewer.getByRole('button', {name: 'Add to the order'}).click();
  await page.keyboard.press('Escape');
  await page.getByRole('button', {name: /^Ready VF-8RD5WN /}).click();
  await viewer.getByRole('button', {name: 'Add to the order'}).click();
  await page.keyboard.press('Escape');
  soldOut = true;
  await page.clock.runFor(121_000);
  await expect(page.getByRole('button', {name: /^VF-7K2M4Q Sold out /})).toBeVisible();
  await page.getByRole('button', {name: 'Order, 2'}).click();
  const order = page.getByRole('dialog', {name: 'The customer’s order'});
  await expect(order.getByText(/Sold out/)).toBeVisible();
  await order.getByRole('button', {name: 'Hand over the order'}).click();
  const link = await page.getByRole('link', {name: 'Share on WhatsApp'}).getAttribute('href');
  const handed = new URL(decodeURIComponent(link.split('?text=')[1]));
  expect(handed.searchParams.get('lines')).toMatch(/^VF-8RD5WN\.[^,]*$/);
});

test('clearing the presentation’s shortlist can be undone', async ({page}) => {
  await openCounter(page, 'en');
  await page.getByRole('button', {name: 'Add VF-7K2M4Q to the shortlist'}).click();
  await page.getByRole('button', {name: 'Add VF-8RD5WN to the shortlist'}).click();
  await page.getByRole('button', {name: 'Shortlist, 2'}).click();
  await page.getByRole('dialog', {name: 'Shortlist'}).getByRole('button', {name: 'Clear'}).click();
  await expect(page.getByRole('button', {name: 'Shortlist, 0'})).toBeVisible();
  await page.getByRole('button', {name: 'Undo'}).click();
  await expect(page.getByRole('button', {name: 'Shortlist, 2'})).toBeVisible();
});

test('“Next customer” clears the last one’s search and shortlist, with an Undo', async ({page}) => {
  await openCounter(page, 'en');
  await expect(page.getByRole('button', {name: 'Next customer'})).toHaveCount(0);
  await page.getByRole('button', {name: 'Add VF-7K2M4Q to the shortlist'}).click();
  await page.getByLabel('Find a design').fill('orchid');
  await page.getByRole('button', {name: 'Next customer'}).click();
  await expect(page.getByRole('button', {name: 'Shortlist, 0'})).toBeVisible();
  await expect(page.getByLabel('Find a design')).toHaveValue('');
  await expect(page.getByRole('button', {name: 'Next customer'})).toHaveCount(0);
  await page.getByRole('button', {name: 'Undo'}).click();
  await expect(page.getByRole('button', {name: 'Shortlist, 1'})).toBeVisible();
  await expect(page.getByLabel('Find a design')).toHaveValue('orchid');
});

test('the slideshow clears a shortlist handed over, and keeps one that wasn’t', async ({page}) => {
  await page.clock.install();
  await page.addInitScript(() =>
    localStorage.setItem('vf-presentation', JSON.stringify({slideshow: true}))
  );
  await openCounter(page, 'en');
  // Not handed over: the seller may only have stepped away.
  await page.getByRole('button', {name: 'Add VF-7K2M4Q to the shortlist'}).click();
  await page.clock.runFor(61_000);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', {name: 'Shortlist, 1'})).toBeVisible();
  // Handed over: it is on the customer's phone now.
  await page.getByRole('button', {name: 'Shortlist, 1'}).click();
  await page.getByRole('button', {name: 'Send the shortlist'}).click();
  await page.keyboard.press('Escape');
  await page.clock.runFor(61_000);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', {name: 'Shortlist, 0'})).toBeVisible();
});

test('the slideshow shows each design at its own price', async ({page}) => {
  await page.clock.install();
  await page.addInitScript(() =>
    localStorage.setItem('vf-presentation', JSON.stringify({slideshow: true}))
  );
  await openCounter(page, 'en');
  await page.getByLabel('Find a design').fill('7k2');
  await page.getByLabel('Find a design').press('Enter');
  const viewer = page.getByRole('dialog', {name: 'Designs'});
  await viewer.getByRole('button', {name: 'Size and extras'}).click();
  await viewer.getByRole('button', {name: /Classic/}).click();
  await viewer.getByRole('button', {name: 'Glass vase'}).click();
  await expect(viewer.getByText('5,550,000 Toman')).toBeVisible();
  await page.clock.runFor(61_000);
  await expect(viewer.getByText('4,100,000 Toman')).toBeVisible();
});

test('untouched, the full-screen view leaves only the photo, code and price', async ({page}) => {
  await page.clock.install();
  await openCounter(page, 'en');
  await page.getByRole('button', {name: /^VF-7K2M4Q /}).click();
  const viewer = page.getByRole('dialog', {name: 'Designs'});
  await expect(viewer.getByText('1 of 6')).toBeVisible();
  await page.clock.runFor(4_500);
  await expect(viewer.getByText('1 of 6')).toBeHidden();
  await expect(viewer.getByRole('button', {name: 'Send to customer'})).toBeHidden();
  await expect(viewer.getByText('VF-7K2M4Q')).toBeVisible();
  await expect(viewer.getByText('4,100,000 Toman')).toBeVisible();
  // A touch brings the controls back.
  await page.mouse.click(5, 300);
  await expect(viewer.getByText('1 of 6')).toBeVisible();
});

test('scanning a design’s tag opens it full screen', async ({page}) => {
  // A stand-in camera and QR reader: the tag holds the design's product page address.
  await page.addInitScript(() => {
    const canvas = document.createElement('canvas');
    canvas.getContext('2d').fillRect(0, 0, 10, 10);
    navigator.mediaDevices.getUserMedia = async () => canvas.captureStream();
    // @ts-ignore
    window.BarcodeDetector = class {
      async detect() {
        return [{rawValue: location.origin + '/en/product/VF-8RD5WN/'}];
      }
    };
  });
  await openCounter(page, 'en');
  await page
    .locator('.vf-presentation-bar')
    .getByRole('button', {name: 'Scan a tag', exact: true})
    .click();
  const viewer = page.getByRole('dialog', {name: 'Designs'});
  await expect(viewer.getByText('VF-8RD5WN')).toBeVisible();
  await expect(viewer.getByText('1 of 1')).toBeVisible();
});
