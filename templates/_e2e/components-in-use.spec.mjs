import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

// Behaviour of the components the storefront picked up last: AnnouncementBar,
// Gallery, Toast, Dialog, SnapScroller, Radio and Tooltip.

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

test('adding to the bag opens a bag panel that leads to checkout', async ({page}) => {
  await openSite(page, 'product', 'en');
  const add = page.getByRole('button', {name: /^Add to bag/}).locator('visible=true').first();
  await add.click();
  const panel = page.getByRole('dialog', {name: 'Added to your bag'});
  await expect(panel).toContainText('VF-7K2M4Q');
  await expect(panel).toContainText('Flower box · Petite · 12 stems · × 1');
  await expect(panel).toContainText('Bag subtotal · 3 items');
  await expect(panel.getByRole('link', {name: 'View bag and check out'})).toBeFocused();
  expect(await scanAxe(page)).toEqual([]);
  // Keep shopping closes it and hands focus back to the button that opened it.
  await panel.getByRole('button', {name: 'Keep shopping'}).click();
  await expect(panel).toHaveCount(0);
  await expect(add).toBeFocused();
  await add.click();
  await panel.getByRole('link', {name: 'View bag and check out'}).click();
  await expect(page.locator('main h1')).toContainText('Your bag');
});

test('saving a design shows a toast that waits while the pointer is on it', async ({page}, info) => {
  await page.clock.install();
  await openSite(page, 'product', 'en');
  await page.getByRole('button', {name: 'Save this design'}).click();
  const toast = page.getByRole('status').filter({hasText: 'Saved to your list'});
  await expect(toast).toBeVisible();
  await expect(toast.getByRole('link', {name: 'View saved'})).toHaveAttribute('href', /view=saved/);
  // The toast stays clear of the mobile action bar.
  if (info.project.name === 'mobile') {
    const bar = await page.locator('.vf-product-mobile-action').boundingBox();
    const box = await toast.boundingBox();
    expect(box.y + box.height).toBeLessThanOrEqual(bar.y);
  }
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
  await expect(group.getByRole('radio')).toHaveCount(5);
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
  await expect(info).toHaveAccessibleDescription('Iranian IBAN');
});

test('the bag icon shows and announces how many items are in the bag', async ({page}) => {
  await openSite(page, 'home', 'en');
  const bag = page.locator('header').getByRole('link', {name: 'Bag, 2 items'}).locator('visible=true');
  await expect(bag).toHaveCount(1);
  await expect(bag.locator('.ag-iconbtn__count')).toHaveText('2');
  await openSite(page, 'home', 'fa');
  const sabad = page.locator('header').getByRole('link', {name: 'سبد، ۲ کالا'}).locator('visible=true');
  await expect(sabad).toHaveCount(1);
  await expect(sabad.locator('.ag-iconbtn__count')).toHaveText('۲');
});

test('the header switches language and keeps the page', async ({page}, info) => {
  await openSite(page, 'shop', 'en', {cat: 'orchids'});
  if (info.project.name === 'mobile') {
    await page.locator('header').getByRole('button', {name: 'فارسی'}).click();
  } else {
    const lang = page.locator('header').getByRole('group', {name: 'Language'});
    await expect(lang.getByRole('button', {name: 'EN'})).toHaveAttribute('aria-pressed', 'true');
    await lang.getByRole('button', {name: 'فا'}).click();
  }
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page).toHaveURL(/cat=orchids/);
  expect(await scanAxe(page)).toEqual([]);
});

test('a standalone page opens itself in the other language', async ({page}, info) => {
  test.skip(info.project.name === 'mobile', 'Same link on both; desktop covers it');
  await page.goto('/templates/storefront-faq/StorefrontFaq.dc.html');
  await expect(page.locator('#main')).toBeVisible();
  await page.locator('header').getByRole('group', {name: 'Language'}).getByRole('button', {name: 'فا'}).click();
  await expect(page).toHaveURL(/StorefrontSite\.dc\.html\?.*lang=fa/);
  await expect(page).toHaveURL(/view=faq/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
});
