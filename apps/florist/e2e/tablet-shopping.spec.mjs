import {test, expect} from '@playwright/test';
import {openSite, choiceTile, scanAxe} from './helpers.mjs';

test.use({hasTouch: true});
const tablets = [
  {width: 768, height: 1024},
  {width: 834, height: 1112},
  {width: 1024, height: 768}
];
const amount = text =>
  Number(text.replace(/[۰-۹]/g, digit => '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)).replace(/\D/g, ''));

async function expectAboveBars(page, target) {
  const input = target.locator('input');
  await input.focus();
  await expect(input).toBeFocused();
  await expect
    .poll(() =>
      target.evaluate(el => {
        const box = el.getBoundingClientRect();
        const top = document.querySelector('.vf-shell-header').getBoundingClientRect().bottom;
        const bottom = document.querySelector('.vf-shell-bottom-bar').getBoundingClientRect().top;
        return box.top >= top && box.bottom <= bottom;
      })
    )
    .toBe(true);
}

for (const lang of ['en', 'fa']) {
  const fa = lang === 'fa';
  test(`tablet purchase action preserves configuration across rotation (${lang})`, async ({
    page
  }) => {
    await page.setViewportSize(tablets[0]);
    await openSite(page, 'product', lang);
    const bar = page.locator('.vf-product-mobile-action');
    await expect(bar).toBeVisible();
    const classic = choiceTile(page.locator('.vf-product-sizes'), fa ? /^کلاسیک/ : /^Classic/);
    await classic.tap();
    await page
      .locator('label.ag-check')
      .filter({has: page.getByRole('checkbox', {name: fa ? /کارت دست/ : /Handwritten card/})})
      .tap();
    await page.getByRole('button', {name: fa ? 'بیشتر' : 'More', exact: true}).tap();
    await page.locator('.ag-gallery__dot').nth(1).tap();
    for (const viewport of tablets) {
      await page.setViewportSize(viewport);
      await expect(bar).toBeVisible();
      await expect(bar.getByRole('button')).toBeInViewport({ratio: 1});
      await expect(
        page.getByRole('button', {name: fa ? 'افزودن به سبد' : 'Add to bag', exact: true})
      ).toHaveCount(1);
      await expect(page.locator('.vf-shell-phone-bar .ag-tabbar')).toBeHidden();
      await expect(classic).toHaveAttribute('data-selected', 'true');
      await expect(page.locator('.ag-gallery__dot').nth(1)).toHaveAttribute('aria-current', 'true');
      expect(amount(await bar.locator('.ag-price__now').textContent())).toBe(10100000);
      const panel = await page.locator('.vf-product-details').boundingBox();
      const gallery = await page.locator('.ag-gallery__track').boundingBox();
      expect(Math.abs(panel.y - gallery.y)).toBeLessThan(1);
      expect(panel.width).toBeGreaterThanOrEqual(340);
      if (viewport.width < 900) {
        const tiles = page.locator('.vf-product-sizes .ag-choice');
        const first = await tiles.first().boundingBox();
        const second = await tiles.nth(1).boundingBox();
        expect(second.y).toBeGreaterThanOrEqual(first.y + first.height);
      }
      await expectAboveBars(page, classic);
      expect((await bar.getByRole('button').boundingBox()).height).toBeGreaterThanOrEqual(44);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({path: `/tmp/vendra-tablet-purchase-${lang}-${viewport.width}.png`});
    }
    await bar.getByRole('button').tap();
    const confirmation = page.getByRole('dialog');
    await expect(confirmation).toBeVisible();
    await expect(confirmation.locator('.ag-osum__name')).toHaveText('VF-7K2M4Q');
    expect(amount(await confirmation.locator('.ag-osum__total').textContent())).toBe(10100000);
    expect(await scanAxe(page)).toEqual([]);
  });

  test(`tablet purchase and consent leave focused options accessible (${lang})`, async ({page}) => {
    await page.addInitScript(() => localStorage.removeItem('vf-consent'));
    await page.setViewportSize(tablets[2]);
    await openSite(page, 'product', lang);
    await expect(page.locator('.vf-shell-consent')).toBeVisible();
    const bar = page.locator('.vf-product-mobile-action');
    await expect(bar.getByRole('button')).toBeInViewport({ratio: 1});
    await expectAboveBars(
      page,
      choiceTile(page.locator('.vf-product-sizes'), fa ? /^کلاسیک/ : /^Classic/)
    );
    const card = page.getByRole('checkbox', {name: fa ? /کارت دست/ : /Handwritten card/});
    await expectAboveBars(page, page.locator('label.ag-check').filter({has: card}));
    await expect
      .poll(() =>
        page.evaluate(() =>
          parseFloat(document.documentElement.style.getPropertyValue('--vf-bottom-bar'))
        )
      )
      .toBeGreaterThan(100);
  });

  test(`tablet shop controls fit and keep sorting through rotation (${lang})`, async ({page}) => {
    await page.setViewportSize(tablets[0]);
    await openSite(page, 'shop', lang, {stock: '1'});
    const sort = page.locator('.vf-shop-mobile-bar .ag-select button');
    await sort.tap();
    await page
      .getByRole('option', {name: fa ? 'قیمت: کم به زیاد' : 'Price: low to high', exact: true})
      .tap();
    await expect(page).toHaveURL(/sort=low/);
    for (const viewport of tablets) {
      await page.setViewportSize(viewport);
      if (viewport.width < 1024) {
        await expect(page.locator('.vf-shop-sidebar')).toBeHidden();
        expect((await sort.boundingBox()).width).toBeLessThanOrEqual(280);
        const chips = page.locator('.vf-shop-quick-filters .ag-chip');
        const ys = await chips.evaluateAll(nodes =>
          nodes.map(node => node.getBoundingClientRect().y)
        );
        expect(Math.max(...ys) - Math.min(...ys)).toBeLessThan(1);
        await chips.last().focus();
        await expect(chips.last()).toBeInViewport({ratio: 1});
      } else await expect(page.locator('.vf-shop-sidebar')).toBeVisible();
      await expect(page).toHaveURL(/stock=1/);
      await expect(page).toHaveURL(/sort=low/);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({path: `/tmp/vendra-tablet-shop-${lang}-${viewport.width}.png`});
    }
    expect(await scanAxe(page)).toEqual([]);
  });
}
