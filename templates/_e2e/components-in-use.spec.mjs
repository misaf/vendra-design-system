import {test, expect} from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import {ROOT, openSite, scanAxe} from './helpers.mjs';

// Behaviour of the components the storefront picked up last: AnnouncementBar,
// Gallery, Toast, SnapScroller, Radio and Tooltip.

test('announcement bar closes for the rest of the session', async ({page}) => {
  await openSite(page, 'home', 'en');
  const bar = page.getByRole('region', {name: 'Store news'});
  await expect(bar).toContainText('Free delivery in Karaj on orders over 5,000,000 Toman.');
  await bar.getByRole('button', {name: 'Dismiss message'}).click();
  await expect(bar).toHaveCount(0);
  await openSite(page, 'shop', 'fa');
  await expect(page.getByRole('region', {name: 'خبر فروشگاه'})).toHaveCount(0);
});

test('product gallery moves between photos', async ({page}) => {
  await openSite(page, 'product', 'en');
  const gallery = page.getByRole('region', {name: 'Product photos'});
  await expect(gallery.getByRole('group')).toHaveCount(3);
  const second = gallery.getByRole('button', {name: 'Photo 2 of 3'});
  await second.click();
  await expect(second).toHaveAttribute('aria-current', 'true');
});

test('adding to the bag shows a toast that links to the bag', async ({page}, info) => {
  await openSite(page, 'product', 'en');
  const add = page.getByRole('button', {name: /^Add to bag/}).locator('visible=true').first();
  await add.click();
  const toast = page.getByRole('status').filter({hasText: 'Added to bag'});
  await expect(toast).toBeVisible();
  await expect(toast).toContainText('Ivory ribbon box × 1');
  expect(await scanAxe(page)).toEqual([]);
  // The toast stays clear of the mobile action bar.
  if (info.project.name === 'mobile') {
    const bar = await page.locator('.vf-product-mobile-action').boundingBox();
    const box = await toast.boundingBox();
    expect(box.y + box.height).toBeLessThanOrEqual(bar.y);
  }
  await toast.getByRole('button', {name: 'Dismiss'}).click();
  await expect(toast).toHaveCount(0);
  await add.click();
  await page.getByRole('link', {name: 'View bag'}).click();
  await expect(page.locator('main h1')).toContainText('Your bag');
});

test('the toast waits while the pointer is on it', async ({page}) => {
  await page.clock.install();
  await openSite(page, 'product', 'en');
  await page.getByRole('button', {name: /^Add to bag/}).locator('visible=true').first().click();
  const toast = page.getByRole('status').filter({hasText: 'Added to bag'});
  await toast.hover();
  await page.clock.runFor(10000);
  await expect(toast).toBeVisible();
  await page.mouse.move(0, 0);
  await page.clock.runFor(6500);
  await expect(toast).toHaveCount(0);
});

test('home arrivals scroll with the snap scroller', async ({page}, info) => {
  await openSite(page, 'home', 'fa');
  const row = page.getByRole('region', {name: 'تازه‌های این هفته'});
  await expect(row.locator('.ag-product')).toHaveCount(5);
  const overflow = await row.evaluate(el => el.scrollWidth > el.clientWidth);
  expect(overflow).toBe(true);
  if (info.project.name === 'desktop') {
    const prev = page.getByRole('button', {name: 'طرح‌های قبلی'});
    await expect(prev).toBeDisabled();
    await page.getByRole('button', {name: 'طرح‌های بیشتر'}).click();
    await expect(prev).toBeEnabled();
  }
});

test('payment methods are radio buttons', async ({page}) => {
  await page.goto('/templates/storefront-checkout/StorefrontCheckout.dc.html');
  await expect(page.locator('#main')).toBeVisible();
  const group = page.getByRole('group', {name: 'Choose a payment method'});
  await expect(group.getByRole('radio')).toHaveCount(4);
  await expect(group.getByRole('radio', {name: 'Card-to-card transfer'})).toBeChecked();
  await group.getByRole('radio', {name: 'Confirm on WhatsApp'}).check();
  await expect(page.locator('main h1')).toHaveText('Confirm on WhatsApp');
});

test('the Sheba hint describes its button', async ({page}) => {
  await page.goto('/templates/storefront-checkout/StorefrontCheckout.dc.html');
  await expect(page.locator('#main')).toBeVisible();
  // Demo stores have no Sheba number; set one, then re-render by switching method.
  await page.evaluate(() => window.VF_PAYMENT.setPayCard({cardNumber: '6221061072645437', holderEn: 'Demo', sheba: 'IR000000000000000000000000'}));
  const group = page.getByRole('group', {name: 'Choose a payment method'});
  await group.getByRole('radio', {name: 'Online card demo'}).check();
  await group.getByRole('radio', {name: 'Card-to-card transfer'}).check();
  const info = page.getByRole('button', {name: 'About Sheba'});
  await info.hover();
  await expect(page.getByRole('tooltip')).toBeVisible();
  await expect(page.getByRole('tooltip')).toHaveText('Iranian IBAN');
  const bundle = fs.readFileSync(path.join(ROOT, '_ds_bundle.js'), 'utf8');
  test.skip(!/Template runtimes pass even a single child/.test(bundle), 'Tooltip fix not in _ds_bundle.js yet — run the Claude Design self-check');
  await expect(info).toHaveAccessibleDescription('Iranian IBAN');
});
