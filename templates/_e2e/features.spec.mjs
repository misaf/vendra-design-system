import {test, expect} from '@playwright/test';
import {openSite, pinDelivery, scanAxe} from './helpers.mjs';

// Delivery days, promo codes, shop occasions, recently viewed products, the delivery photo,
// delivery pins and saved addresses and products in the account, in the click-through site.
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
  // Time keeps running from 09:00: the map's pan animation needs a moving clock.
  await page.clock.setSystemTime(MORNING);
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
  await pinDelivery(page);
  await page.fill('#vf-address', 'Plaque 12, unit 3');
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
  const occasions = page.getByRole('group', {name: 'Occasion'}).locator('visible=true');
  await expect(occasions.getByRole('button', {name: 'All', exact: true})).toHaveAttribute('aria-pressed', 'true');
  await occasions.getByRole('button', {name: 'Anniversary'}).click();
  await expect(page).toHaveURL(/occasion=anniversary/);
  await expect(occasions.getByRole('button', {name: 'Anniversary'})).toHaveAttribute('aria-pressed', 'true');
  expect(await scanAxe(page)).toEqual([]);
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

test('the delivery pin is required and travels with the order', async ({page}) => {
  await openSite(page, 'bag', 'en');
  await page.fill('#vf-name', 'Shirin Ahmadi');
  await page.fill('#vf-phone', '09121234567');
  await page.fill('#vf-address', 'Plaque 12, unit 3');
  const next = page.getByRole('button', {name: 'Continue to payment'}).locator('visible=true').first();
  await next.click();
  // The pin is the only problem, so the map takes focus and is described by the error.
  await expect(page.locator('#vf-map')).toBeFocused();
  await expect(page.locator('#vf-map')).toHaveAccessibleDescription(/Place the pin on the delivery address\./);
  expect(await scanAxe(page)).toEqual([]);
  await pinDelivery(page);
  await expect(page.locator('#vf-pin-error')).toHaveCount(0);
  await next.click();
  await expect(page.locator('#vf-last4')).toBeVisible();
  const location = await page.evaluate(() => JSON.parse(sessionStorage.getItem('vendra-template:' + location.pathname) || '{}').delivery?.location);
  expect(location).toEqual({lat: expect.any(Number), lng: expect.any(Number)});
});

test('without a map, a full typed address is enough', async ({page}) => {
  await page.route(/_vendor\/leaflet\/leaflet\.js/, route => route.abort());
  await openSite(page, 'bag', 'fa');
  await expect(page.locator('#vf-map')).toHaveCount(0);
  await expect(page.locator('main')).toContainText('نقشه بارگذاری نشد');
  await page.fill('#vf-name', 'شیرین احمدی');
  await page.fill('#vf-phone', '09121234567');
  await page.fill('#vf-address', 'کرج، عظیمیه، خیابان گلستان، پلاک ۱۲');
  await page.getByRole('button', {name: 'ادامه و پرداخت'}).locator('visible=true').first().click();
  await expect(page.locator('#vf-last4')).toBeVisible();
});

test('the account maps saved addresses and the editor pins new ones', async ({page}) => {
  await openSite(page, 'account', 'en');
  await page.getByRole('tab', {name: 'Addresses'}).click();
  const map = page.getByRole('region', {name: 'Your saved addresses on the map'});
  await expect(map.locator('.leaflet-tooltip')).toHaveText(['Home', 'Office']);
  expect(await scanAxe(page)).toEqual([]);
  // A marker is a keyboard-reachable way into that address.
  await map.getByRole('button', {name: 'Edit Office'}).press('Enter');
  const dialog = page.getByRole('dialog', {name: 'Edit address'});
  await expect(dialog.locator('#vf-address-pin-status')).toContainText('35.81620, 50.93910');
  await dialog.getByRole('button', {name: 'Cancel'}).click();
  // A new address needs a pin before it saves.
  await page.getByRole('button', {name: 'Add an address'}).click();
  await page.fill('#vf-address-label', 'Studio');
  await page.fill('#vf-address-line', '7 Talaghani St, unit 2');
  await page.fill('#vf-address-phone', '09121234567');
  await page.getByRole('dialog').getByRole('button', {name: 'Save'}).click();
  const pin = page.locator('#vf-address-map');
  await expect(pin).toBeFocused();
  await expect(pin).toHaveAccessibleDescription(/Place the pin on the address\./);
  expect(await scanAxe(page)).toEqual([]);
  await page.keyboard.press('ArrowUp');
  await expect(page.locator('#vf-address-pin-status')).toHaveText(/Pin placed at/);
  await page.getByRole('dialog').getByRole('button', {name: 'Save'}).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(map.locator('.leaflet-tooltip')).toHaveText(['Home', 'Office', 'Studio']);
});

test('the account lists saved products, shared with the saved page', async ({page}) => {
  await openSite(page, 'account', 'fa');
  await page.getByRole('tab', {name: 'ذخیره‌ها'}).click();
  const panel = page.getByRole('tabpanel');
  await expect(panel.locator('.ag-product')).toHaveCount(3);
  expect(await scanAxe(page)).toEqual([]);
  await panel.getByRole('button', {name: 'حذف از ذخیره‌ها'}).first().click();
  await expect(panel.locator('.ag-product')).toHaveCount(2);
  await openSite(page, 'saved', 'fa');
  await expect(page.locator('main .ag-product')).toHaveCount(2);
});

test('a signed-in customer can send to a saved address', async ({page}) => {
  await page.addInitScript(() => localStorage.setItem('vf-account-phone', '09125649438'));
  await openSite(page, 'bag', 'en');
  const saved = page.getByRole('group', {name: 'Send to a saved address'});
  await expect(saved.getByRole('button', {name: 'Office'})).toHaveAttribute('aria-pressed', 'false');
  await saved.getByRole('button', {name: 'Office'}).click();
  await expect(saved.getByRole('button', {name: 'Office'})).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#vf-name')).toHaveValue('Shirin Ahmadi');
  await expect(page.locator('#vf-address')).toHaveValue('40 Moazen Blvd, Gohardasht');
  await expect(page.locator('#vf-pin-status')).toContainText('35.81620, 50.93910');
  expect(await scanAxe(page)).toEqual([]);
  await page.getByRole('button', {name: 'Continue to payment'}).locator('visible=true').first().click();
  await expect(page.locator('#vf-last4')).toBeVisible();
});

test('a guest sees no saved addresses in the bag', async ({page}) => {
  await openSite(page, 'bag', 'en');
  await expect(page.getByRole('group', {name: 'Send to a saved address'})).toHaveCount(0);
});

test('profile edits are kept', async ({page}) => {
  await openSite(page, 'account', 'en');
  await page.getByRole('tab', {name: 'Profile'}).click();
  await page.fill('#vf-pname', 'Shirin A.');
  await expect(page.locator('#vf-pname')).toHaveValue('Shirin A.');
  await page.getByRole('button', {name: 'Save changes'}).click();
  await expect(page.getByRole('status').filter({hasText: 'Changes saved'})).toBeVisible();
  await page.reload();
  await page.getByRole('tab', {name: 'Profile'}).click();
  await expect(page.locator('#vf-pname')).toHaveValue('Shirin A.');
});
