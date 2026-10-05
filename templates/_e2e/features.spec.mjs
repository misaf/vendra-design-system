import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

// Delivery days, promo codes, shop occasions, recently viewed
// products and the delivery photo, in the click-through site.
const MORNING = new Date('2026-10-05T09:00:00+03:30');

test('the bag offers delivery days and skips sold-out ones', async ({page}) => {
  await page.clock.setFixedTime(MORNING);
  await openSite(page, 'bag', 'en');
  const days = page.getByRole('radiogroup', {name: 'Delivery day'});
  await expect(days.getByRole('radio')).toHaveCount(7);
  await expect(days.getByRole('radio', {name: /^Today/})).toHaveAttribute('aria-checked', 'true');
  await expect(days.getByRole('radio', {name: /Sold out/})).toBeDisabled();
  await days.getByRole('radio', {name: /^Thu/}).click();
  await expect(days.getByRole('radio', {name: /^Thu/})).toHaveAttribute('aria-checked', 'true');
});

test('after the cut-off, today is closed', async ({page}) => {
  await page.clock.setFixedTime(new Date('2026-10-05T19:00:00+03:30'));
  await openSite(page, 'bag', 'en');
  const days = page.getByRole('radiogroup', {name: 'Delivery day'});
  await expect(days.getByRole('radio', {name: /^Today Order by 18:00/})).toBeDisabled();
  await expect(days.getByRole('radio', {name: /^Tomorrow/})).toHaveAttribute('aria-checked', 'true');
});

test('a promo code discounts the bag and carries to checkout', async ({page}) => {
  await page.clock.setFixedTime(MORNING);
  await openSite(page, 'bag', 'en');
  const code = page.getByRole('textbox', {name: 'Promo code'});
  await code.fill('nope');
  await code.press('Enter');
  await expect(code).toHaveAccessibleDescription('We don’t recognise that code.');
  await code.fill('roses 15');
  await page.getByRole('button', {name: 'Apply', exact: true}).click();
  await expect(page.getByRole('status').filter({hasText: 'ROSES15 · 15% off'})).toBeVisible();
  const summary = page.locator('main aside');
  await expect(summary).toContainText('Discount · ROSES15');
  await expect(summary).toContainText(/−\u20681,245,000 Toman/);
  await expect(summary).toContainText('7,055,000 Toman');
  expect(await scanAxe(page)).toEqual([]);
  await page.fill('#vf-name', 'Shirin Ahmadi');
  await page.fill('#vf-phone', '09121234567');
  await page.fill('#vf-address', '12 Golestan St, Karaj');
  await page.getByRole('button', {name: 'Continue to payment'}).locator('visible=true').first().click();
  await expect(page.locator('#vf-last4')).toBeVisible();
  await expect(page.locator('main')).toContainText('Discount · ROSES15');
});

test('removing the code restores the total', async ({page}) => {
  await openSite(page, 'bag', 'fa');
  await page.getByRole('textbox', {name: 'کد تخفیف'}).fill('WELCOME۱۰');
  await page.getByRole('button', {name: 'اعمال'}).click();
  await expect(page.locator('main aside')).toContainText('تخفیف · WELCOME10');
  await page.getByRole('button', {name: 'حذف کد'}).click();
  await expect(page.locator('main aside')).not.toContainText('WELCOME10');
  await expect(page.getByRole('textbox', {name: 'کد تخفیف'})).toBeFocused();
});

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
  await page.getByRole('combobox', {name: 'Occasion'}).selectOption('anniversary');
  await expect(page).toHaveURL(/occasion=anniversary/);
  if (info.project.name === 'mobile') await page.keyboard.press('Escape');
  await expect(page.locator('main .ag-product')).toHaveCount(2);
});

test('the product page lists recently viewed products', async ({page}) => {
  await openSite(page, 'product', 'en', {id: 'orchid'});
  await expect(page.getByRole('heading', {name: /Recently viewed/})).toHaveCount(0);
  await openSite(page, 'product', 'en', {id: 'blush'});
  const recent = page.getByRole('region', {name: 'Recently viewed.'});
  await expect(recent.locator('.ag-product__name')).toHaveText(['Pearl orchid']);
  expect(await scanAxe(page)).toEqual([]);
});

test('a delivered order shows the delivery photo', async ({page}) => {
  await openSite(page, 'track', 'fa', {id: 'VN-10431'});
  const photo = page.locator('figure.vf-track-photo');
  await expect(photo.getByRole('img', {name: 'گل‌ها دمِ در، عکسِ لحظه تحویل'})).toBeVisible();
  await expect(photo).toContainText('پیک این عکس را هنگام تحویل دمِ در گرفته است.');
  await openSite(page, 'track', 'fa', {id: 'VN-10522'});
  await expect(page.locator('figure.vf-track-photo')).toHaveCount(0);
});
