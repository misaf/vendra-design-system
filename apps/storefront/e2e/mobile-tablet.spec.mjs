import {test, expect} from '@playwright/test';
import {openSite, pinDelivery, scanAxe} from './helpers.mjs';

test.use({hasTouch: true});

async function expectTapTarget(target) {
  const box = await target.boundingBox();
  expect(box.width).toBeGreaterThanOrEqual(44);
  expect(box.height).toBeGreaterThanOrEqual(44);
}

async function expectFieldClearOfBars(field) {
  await field.focus();
  await expect
    .poll(() =>
      field.evaluate(el => {
        const box = el.getBoundingClientRect();
        const top = document.querySelector('.vf-shell-header').getBoundingClientRect().bottom;
        const bottom = document.querySelector('.vf-shell-bottom-bar').getBoundingClientRect().top;
        return box.top >= top && box.bottom <= bottom;
      })
    )
    .toBe(true);
}

async function swipe(page, target, rtl) {
  const box = await target.boundingBox();
  const session = await page.context().newCDPSession(page);
  const from = box.x + box.width * (rtl ? 0.2 : 0.8);
  const to = box.x + box.width * (rtl ? 0.8 : 0.2);
  const y = box.y + box.height / 2;
  await session.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{x: from, y}]
  });
  for (let step = 1; step <= 8; step++)
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{x: from + ((to - from) * step) / 8, y}]
    });
  await session.send('Input.dispatchTouchEvent', {type: 'touchEnd', touchPoints: []});
  await session.detach();
}

for (const lang of ['en', 'fa']) {
  test(`portrait tablet shows products before filters and preserves filtering on rotation (${lang})`, async ({
    page
  }) => {
    await page.setViewportSize({width: 768, height: 1024});
    await openSite(page, 'shop', lang);
    await expect(page.locator('.vf-shop-sidebar')).toBeHidden();
    await expectTapTarget(page.locator('.vf-shell-header .ag-lang:visible button').first());
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      768
    );
    const product = page.locator('.vf-shop-product-grid .ag-product').first();
    await expect(product).toBeVisible();
    expect((await product.boundingBox()).y).toBeLessThan(700);
    await expectTapTarget(page.locator('.vf-shop-mobile-categories .ag-chip').first());
    await expectTapTarget(product.locator('.ag-product__fav'));
    await page.locator('.vf-shop-mobile-bar button').first().tap();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    const birthday = dialog.getByRole('button', {
      name: lang === 'en' ? 'Birthday' : 'تولد',
      exact: true
    });
    await expectTapTarget(birthday);
    await birthday.tap();
    await page.setViewportSize({width: 1024, height: 768});
    await expect(dialog).toHaveCount(0);
    await expect(page.locator('.vf-shop-sidebar')).toBeVisible();
    await expect(page).toHaveURL(/occasion=birthday/);
    await expect(page.locator('.vf-shop-product-grid .ag-product')).toHaveCount(3);
    await page.setViewportSize({width: 768, height: 1024});
    await expect(page.locator('.vf-shop-mobile-bar')).toBeVisible();
    await expect(page).toHaveURL(/occasion=birthday/);
  });

  test(`touch gallery keeps the swiped photo when rotated and opened full screen (${lang})`, async ({
    page
  }) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    await page.setViewportSize({width: 360, height: 800});
    await openSite(page, 'product', lang);
    const dots = page.locator('.ag-gallery__dot');
    await expectTapTarget(dots.nth(1));
    await swipe(page, page.locator('.ag-gallery__track'), lang === 'fa');
    await expect(dots.nth(1)).toHaveAttribute('aria-current', 'true');
    await page.setViewportSize({width: 844, height: 390});
    await expect(dots.nth(1)).toHaveAttribute('aria-current', 'true');
    await page
      .getByRole('button', {
        name: lang === 'en' ? 'View full screen' : 'نمایش تمام‌صفحه',
        exact: true
      })
      .tap();
    await expect(page.locator('.ag-lightbox__position')).toHaveText(
      lang === 'en' ? '2 of 3' : '۲ از ۳'
    );
    await page.keyboard.press('Escape');
    await expect(dots.nth(1)).toHaveAttribute('aria-current', 'true');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      844
    );
  });

  test(`delivery fields stay clear of sticky bars in a reduced-height phone viewport (${lang})`, async ({
    page
  }) => {
    await page.setViewportSize({width: 390, height: 450});
    await openSite(page, 'bag', lang, {step: 'delivery'});
    await expectTapTarget(page.locator('.ag-location .leaflet-control-zoom a').first());
    for (const id of ['vf-name', 'vf-phone', 'vf-address', 'vf-sender', 'vf-sender-phone']) {
      await expectFieldClearOfBars(page.locator('#' + id));
    }
    await expectTapTarget(page.locator('.ag-btn--sm').first());
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      390
    );
  });

  test(`payment fields stay usable above the phone bars (${lang})`, async ({page}) => {
    await page.setViewportSize({width: 390, height: 450});
    await openSite(page, 'bag', lang, {step: 'delivery'});
    await page.locator('#vf-name').fill('Shirin Ahmadi');
    await page.locator('#vf-phone').fill('09121234567');
    await pinDelivery(page);
    await page.locator('#vf-address').fill('Plaque 12, unit 3');
    await page.locator('#vf-sender').fill('Sara Karimi');
    await page.locator('#vf-sender-phone').fill('09121112233');
    await page
      .getByRole('button', {name: lang === 'fa' ? 'ادامه و پرداخت' : 'Continue to payment'})
      .locator('visible=true')
      .first()
      .tap();
    await expect(page.locator('.vf-checkout-payment')).toBeVisible();
    for (const id of ['vf-last4', 'vf-ref']) {
      const field = page.locator('#' + id);
      await expectFieldClearOfBars(field);
      await expectTapTarget(field);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
    expect(await scanAxe(page)).toEqual([]);
  });

  test(`tablet presentation preserves the design across portrait and landscape (${lang})`, async ({
    page
  }) => {
    await page.addInitScript(() =>
      localStorage.setItem(
        'vf-presentation',
        JSON.stringify({displayMode: 'tablet', displayLayout: 'pair'})
      )
    );
    await page.setViewportSize({width: 1024, height: 768});
    await openSite(page, 'presentation', lang);
    await expect(page.locator('.vf-display-photo')).toHaveCount(2);
    const code = await page.locator('.vf-display-code').first().innerText();
    await page.setViewportSize({width: 768, height: 1024});
    await expect(page.locator('.vf-display-photo')).toHaveCount(1);
    await expect(page.locator('.vf-display-code')).toHaveText(code);
    await swipe(page, page.locator('.vf-display'), lang === 'fa');
    await expect(page.locator('.vf-display-code')).not.toHaveText(code);
    const next = await page.locator('.vf-display-code').innerText();
    await page.setViewportSize({width: 1024, height: 768});
    await expect(page.locator('.vf-display-photo')).toHaveCount(2);
    await expect(page.locator('.vf-display-code').first()).toHaveText(next);
    expect(await page.evaluate(() => document.documentElement.scrollHeight - innerHeight)).toBe(0);
  });
}
