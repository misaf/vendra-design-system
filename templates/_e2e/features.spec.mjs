import {test, expect} from '@playwright/test';
import {NO_CONSENT, openSite, pinDelivery, scanAxe} from './helpers.mjs';

// Delivery days, promo codes, shop occasions, recently viewed products, the delivery photo,
// delivery pins, saved addresses and products in the account, and the contact page, in the click-through site.
const MORNING = new Date('2026-10-05T09:00:00+03:30');

// Everything the delivery step needs apart from the recipient, pin and address.
async function fillSender(page) {
  await page.fill('#vf-sender', 'Sara Karimi');
  await page.fill('#vf-sender-phone', '09121112233');
}

test('the bag offers delivery days and skips sold-out ones', async ({page}) => {
  await page.clock.setFixedTime(MORNING);
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  const days = page.getByRole('radiogroup', {name: 'Delivery day'});
  await expect(days.getByRole('radio')).toHaveCount(7);
  await expect(days.getByRole('radio', {name: /^Today/})).toHaveAttribute('aria-checked', 'true');
  // A tile is named by its day; why it can't be picked is its description.
  const soldOut = days.getByRole('radio').filter({hasText: 'Sold out'});
  await expect(soldOut).toBeDisabled();
  await expect(soldOut).toHaveAccessibleDescription(/Sold out/);
  await days.getByRole('radio', {name: /^Thu/}).click();
  await expect(days.getByRole('radio', {name: /^Thu/})).toHaveAttribute('aria-checked', 'true');
});

test('after the cut-off, today is closed', async ({page}) => {
  await page.clock.setFixedTime(new Date('2026-10-05T19:00:00+03:30'));
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  const days = page.getByRole('radiogroup', {name: 'Delivery day'});
  const today = days.getByRole('radio', {name: 'Today', exact: true});
  await expect(today).toBeDisabled();
  await expect(today).toHaveAccessibleDescription(/Order by 18:00/);
  await expect(days.getByRole('radio', {name: /^Tomorrow/})).toHaveAttribute(
    'aria-checked',
    'true'
  );
});

test('today’s slots close two hours before they end', async ({page}) => {
  await page.clock.setFixedTime(new Date('2026-10-05T14:30:00+03:30'));
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  const slots = page.getByRole('radiogroup', {name: 'Time slot'});
  for (const name of ['08:00–12:00', '12:00–16:00']) {
    const slot = slots.getByRole('radio', {name, exact: true});
    await expect(slot).toBeDisabled();
    await expect(slot).toHaveAccessibleDescription(/Closed/);
  }
  await expect(slots.getByRole('radio', {name: /^16:00–20:00/})).toHaveAttribute(
    'aria-checked',
    'true'
  );
  await page
    .getByRole('radiogroup', {name: 'Delivery day'})
    .getByRole('radio', {name: /^Tomorrow/})
    .click();
  await expect(slots.getByRole('radio', {disabled: true})).toHaveCount(0);
});

test('the bag and delivery details are separate steps', async ({page}) => {
  await openSite(page, 'bag', 'en');
  await expect(page.locator('#vf-name')).toHaveCount(0);
  await page
    .getByRole('button', {name: 'Continue to delivery'})
    .locator('visible=true')
    .first()
    .click();
  await expect(page).toHaveURL(/step=delivery/);
  await expect(page.locator('main h1')).toHaveText('Delivery details.');
  await page.goBack();
  await expect(page.locator('main h1')).toHaveText('Your bag.');
});

test('a bought card needs its message, and any item can add one', async ({page}) => {
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  const ivory = page.getByRole('textbox', {name: /^Card for \u2066?VF-7K2M4Q/});
  await expect(ivory).toHaveValue('Happy birthday, Shirin.');
  await page
    .getByRole('button', {name: /^Add a card · \+150,000 Toman, for \u2066?VF-8RD5WN/})
    .click();
  const orchid = page.getByRole('textbox', {name: /^Card for \u2066?VF-8RD5WN/});
  await expect(orchid).toBeFocused();
  await expect(page.locator('main aside')).toContainText('8,600,000 Toman');
  await page.fill('#vf-name', 'Shirin Ahmadi');
  await page.fill('#vf-phone', '09121234567');
  await pinDelivery(page);
  await page.fill('#vf-address', 'Plaque 12, unit 3');
  await fillSender(page);
  await page
    .getByRole('button', {name: 'Continue to payment'})
    .locator('visible=true')
    .first()
    .click();
  await expect(orchid).toBeFocused();
  await expect(orchid).toHaveAccessibleDescription(/Write what the card should say\./);
  expect(await scanAxe(page)).toEqual([]);
  await orchid.fill('Get well soon');
  await page
    .getByRole('button', {name: 'Continue to payment'})
    .locator('visible=true')
    .first()
    .click();
  await expect(page.locator('#vf-last4')).toBeVisible();
});

test('several problems are listed together, each linking to its field', async ({page}) => {
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  await page
    .getByRole('button', {name: 'Continue to payment'})
    .locator('visible=true')
    .first()
    .click();
  const summary = page.locator('#vf-errors');
  await expect(summary).toBeFocused();
  await expect(summary).toContainText('Check 6 details to continue.');
  await summary.getByRole('link', {name: 'Enter your name.'}).click();
  await expect(page.locator('#vf-sender')).toBeFocused();
  expect(await scanAxe(page)).toEqual([]);
});

test('the delivery pin sets the zone and fee', async ({page}) => {
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  const zone = page.locator('.vf-bag-zone');
  await expect(zone).toContainText('Place the pin to see the zone and delivery fee.');
  await pinDelivery(page);
  // The sample bag is over the free-delivery threshold, so the zone shows Free rather than its fee.
  await expect(zone).toContainText('Karaj central · Free');
  await expect(zone).toContainText('Set from the pin. Same day before 18:00');
});

test('the shop shows a page of designs, then the rest, keeping the page in the URL', async ({
  page
}) => {
  await openSite(page, 'shop', 'en');
  const grid = page.locator('.vf-shop-product-grid .ag-product__link');
  await expect(grid).toHaveCount(4);
  await expect(page.getByText('Showing 4 of 6 designs')).toBeVisible();
  const more = page.getByRole('link', {name: 'Show more'});
  await expect(more).toHaveAttribute('href', /page=2/);
  await more.click();
  await expect(grid).toHaveCount(6);
  await expect(page.getByText('Showing all 6 designs')).toBeVisible();
  await expect(page.getByRole('link', {name: 'Show more'})).toHaveCount(0);
  // Focus moves to the first design that was just loaded.
  await expect(grid.nth(4)).toBeFocused();
  expect(page.url()).toMatch(/page=2/);
  await page.reload();
  await expect(grid).toHaveCount(6);
  // A new filter starts again from the first page.
  await page.getByRole('button', {name: 'Same day'}).first().click();
  expect(page.url()).not.toMatch(/page=/);
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
  await expect(summary).toContainText(/−\u20681,267,500 Toman/);
  await expect(summary).toContainText('7,182,500 Toman');
  expect(await scanAxe(page)).toEqual([]);
  await page
    .getByRole('button', {name: 'Continue to delivery'})
    .locator('visible=true')
    .first()
    .click();
  await expect(summary).toContainText('Discount · ROSES15');
  await fillSender(page);
  await page.fill('#vf-name', 'Shirin Ahmadi');
  await page.fill('#vf-phone', '09121234567');
  await pinDelivery(page);
  await page.fill('#vf-address', 'Plaque 12, unit 3');
  await page
    .getByRole('button', {name: 'Continue to payment'})
    .locator('visible=true')
    .first()
    .click();
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
  const recent = page.getByRole('region', {name: 'Recently viewed.'});
  await expect(recent.locator('.ag-product__name')).toHaveText(['VF-8RD5WN']);
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
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  await fillSender(page);
  await page.fill('#vf-name', 'Shirin Ahmadi');
  await page.fill('#vf-phone', '09121234567');
  await page.fill('#vf-address', 'Plaque 12, unit 3');
  const next = page
    .getByRole('button', {name: 'Continue to payment'})
    .locator('visible=true')
    .first();
  await next.click();
  // The pin is the only problem, so the map takes focus and is described by the error.
  await expect(page.locator('#vf-map')).toBeFocused();
  await expect(page.locator('#vf-map')).toHaveAccessibleDescription(
    /Place the pin on the delivery address\./
  );
  expect(await scanAxe(page)).toEqual([]);
  await pinDelivery(page);
  await expect(page.locator('#vf-map-error')).toHaveCount(0);
  await next.click();
  await expect(page.locator('#vf-last4')).toBeVisible();
  const location = await page.evaluate(
    () =>
      JSON.parse(sessionStorage.getItem('vendra-template:' + location.pathname) || '{}').delivery
        ?.location
  );
  expect(location).toEqual({lat: expect.any(Number), lng: expect.any(Number)});
});

test('without a map, a full typed address is enough', async ({page}) => {
  await page.route(/_vendor\/leaflet\/leaflet\.js/, route => route.abort());
  await openSite(page, 'bag', 'fa', {step: 'delivery'});
  await expect(page.locator('#vf-map')).toHaveCount(0);
  await expect(page.locator('main')).toContainText('نقشه بارگذاری نشد');
  // Without the pin, the zone is chosen from the list; zones that deliver free say so.
  await expect(page.locator('#vf-zone')).toContainText('مرکز کرج · رایگان');
  await fillSender(page);
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
  await expect(dialog.locator('#vf-address-map-status')).toContainText('35.81620, 50.93910');
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
  await expect(page.locator('#vf-address-map-status')).toHaveText(/Pin placed at/);
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
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  // The signed-in mobile fills the customer's own details.
  await expect(page.locator('#vf-sender-phone')).toHaveValue('09125649438');
  await page.fill('#vf-sender', 'Shirin Ahmadi');
  const saved = page.getByRole('group', {name: 'Send to a saved address'});
  await expect(saved.getByRole('button', {name: 'Office'})).toHaveAttribute(
    'aria-pressed',
    'false'
  );
  await saved.getByRole('button', {name: 'Office'}).click();
  await expect(saved.getByRole('button', {name: 'Office'})).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#vf-name')).toHaveValue('Shirin Ahmadi');
  await expect(page.locator('#vf-address')).toHaveValue('40 Moazen Blvd, Gohardasht');
  await expect(page.locator('#vf-map-status')).toContainText('35.81620, 50.93910');
  expect(await scanAxe(page)).toEqual([]);
  await page
    .getByRole('button', {name: 'Continue to payment'})
    .locator('visible=true')
    .first()
    .click();
  // The sample account's balance covers the order, so it pays from the balance by default.
  await expect(page.getByRole('radio', {name: 'Account balance'})).toBeChecked();
  await page.getByRole('radio', {name: 'Card-to-card transfer'}).check();
  await expect(page.locator('#vf-last4')).toBeVisible();
});

test('a guest can sign in from checkout and come back to it', async ({page}) => {
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  await page.locator('.vf-bag-signin').getByRole('link', {name: 'Sign in'}).click();
  await expect(page).toHaveURL(/view=signin&next=delivery/);
  await page.fill('#vf-phone', '09125649438');
  await page.locator('main').getByRole('button', {name: 'Send code'}).click();
  await page.fill('#vf-code', '12345');
  await page.locator('main').getByRole('button', {name: 'Sign in', exact: true}).click();
  await page.getByRole('link', {name: 'Back to checkout'}).click();
  await expect(page).toHaveURL(/step=delivery/);
  await expect(page.getByRole('group', {name: 'Send to a saved address'})).toBeVisible();
  await expect(page.locator('#vf-sender-phone')).toHaveValue('09125649438');
  await expect(page.locator('.vf-bag-signin')).toHaveCount(0);
});

test('a new code can be sent once the countdown ends', async ({page}) => {
  await page.clock.install();
  await openSite(page, 'signin', 'en');
  await page.fill('#vf-phone', '09125649438');
  await page.locator('main').getByRole('button', {name: 'Send code'}).click();
  await expect(page.locator('main')).toContainText('You can ask for a new code in 1:00.');
  await expect(page.getByRole('button', {name: 'Send a new code'})).toHaveCount(0);
  await page.clock.runFor(61000);
  await page.getByRole('button', {name: 'Send a new code'}).click();
  await expect(page.getByRole('status').filter({hasText: 'We sent a new code.'})).toBeVisible();
  await expect(page.locator('#vf-code')).toBeFocused();
  await expect(page.locator('main')).toContainText('You can ask for a new code in 1:00.');
  expect(await scanAxe(page)).toEqual([]);
});

test('a guest finds an order with its number and mobile', async ({page}) => {
  await openSite(page, 'track', 'en');
  await expect(page.locator('main h1')).toHaveText('Track an order.');
  await page.getByRole('button', {name: 'Find my order'}).click();
  await expect(page.locator('#vf-lookup-id')).toBeFocused();
  expect(await scanAxe(page)).toEqual([]);
  await page.fill('#vf-lookup-id', 'vn-10522');
  await page.fill('#vf-lookup-phone', '09120000000');
  await page.getByRole('button', {name: 'Find my order'}).click();
  await expect(page.locator('#vf-lookup-failed')).toBeFocused();
  await expect(page.locator('#vf-lookup-failed')).toContainText('We couldn’t find an order');
  await page.fill('#vf-lookup-phone', '0912 564 9438');
  await page.getByRole('button', {name: 'Find my order'}).click();
  await expect(page).toHaveURL(/view=track&id=VN-10522/);
  await expect(page.locator('main h1')).toHaveText('On its way.');
  // The new view moves focus to its heading first; wait so that doesn't race the next click.
  await expect(page.locator('main h1')).toBeFocused();
  await page.getByRole('button', {name: 'Track another order'}).click();
  await expect(page.locator('#vf-lookup-id')).toBeFocused();
  // It keeps focus once the heading has changed too.
  await page.waitForTimeout(300);
  await expect(page.locator('#vf-lookup-id')).toBeFocused();
});

test('a card-to-card order says its payment is being confirmed, and offers an account', async ({
  page
}) => {
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  await page.fill('#vf-name', 'Shirin Ahmadi');
  await page.fill('#vf-phone', '09121234567');
  await pinDelivery(page);
  await page.fill('#vf-address', 'Plaque 12, unit 3');
  await fillSender(page);
  await page
    .getByRole('button', {name: 'Continue to payment'})
    .locator('visible=true')
    .first()
    .click();
  await page.fill('#vf-last4', '6037');
  await page
    .getByRole('button', {name: 'I’ve paid — place order'})
    .locator('visible=true')
    .first()
    .click();
  await expect(page.locator('.vf-checkout-account')).toContainText(
    'Sign in with \u206809121112233\u2069'
  );
  await page.getByRole('link', {name: 'Track order'}).click();
  const pending = page.getByRole('status').filter({hasText: 'Payment being confirmed'});
  await expect(pending).toContainText('card ending 6037');
  await expect(pending).toContainText('09121112233');
  expect(await scanAxe(page)).toEqual([]);
  // Signing in from there fills the mobile the order used.
  await page.goto(page.url().replace(/view=track.*/, 'view=signin'));
  await expect(page.locator('#vf-phone')).toHaveValue('09121112233');
});

test('the shop filters by delivery day', async ({page}, info) => {
  await page.clock.setFixedTime(MORNING);
  await openSite(page, 'shop', 'en');
  if (info.project.name === 'mobile') await page.getByRole('button', {name: 'Filters'}).click();
  const day = page.getByRole('combobox', {name: 'Delivery day'}).locator('visible=true');
  await expect(day.locator('option', {hasText: 'sold out'})).toBeDisabled();
  await day.selectOption({label: 'Today · 5 October'});
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
  // Every design again: the first page of four, out of six.
  await expect(page.locator('main .ag-product')).toHaveCount(4);
  await expect(page.getByText('Showing 4 of 6 designs')).toBeVisible();
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
  await expect(page).toHaveURL(/view=product&id=VF-8RD5WN&cat=orchids/);
  // The bag and the order are titled by code.
  await openSite(page, 'bag', 'en');
  await expect(page.locator('.ag-line__name').first()).toHaveText('VF-7K2M4Q');
  // Search finds a product by its code, however it is typed.
  await openSite(page, 'search', 'fa');
  await page.fill('#vf-q', 'vf ۸rd');
  await expect(page.getByRole('main').getByRole('link', {name: /VF-8RD5WN/})).toHaveCount(1);
  await expect(page.getByRole('main').getByRole('link', {name: /VF-8RD5WN/})).toHaveAttribute(
    'href',
    /id=VF-8RD5WN&cat=orchids/
  );
});

test('a customer tops up their balance, then pays from it with the balance discount', async ({
  page
}) => {
  await openSite(page, 'account', 'en', {tab: 'balance'});
  await expect(page.getByRole('tab', {name: 'Balance'})).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#vf-balance-amount')).toHaveText('120,000,000 Toman');
  await expect(page.locator('.vf-account-balance-status')).toContainText('you get 5% off products');
  // An empty amount is caught; a quick amount fills it.
  await page.getByRole('button', {name: 'Top up', exact: true}).click();
  await expect(page.locator('#vf-topup-amount')).toBeFocused();
  await expect(page.locator('#vf-topup-amount')).toHaveAccessibleDescription(/Enter an amount\./);
  await page
    .getByRole('group', {name: 'Quick amounts'})
    .getByRole('button', {name: '10,000,000 Toman'})
    .click();
  await page.getByRole('button', {name: 'Top up 10,000,000 Toman'}).click();
  await expect(page.locator('#vf-topup-done')).toBeFocused();
  await expect(page.locator('#vf-topup-done')).toHaveText(
    '10,000,000 Toman added to your balance.'
  );
  await expect(page.locator('#vf-balance-amount')).toHaveText('130,000,000 Toman');
  expect(await scanAxe(page)).toEqual([]);
  // Checkout picks the balance, takes 5% off the products, and says what's left.
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  await page.fill('#vf-name', 'Mina Rahimi');
  await page.fill('#vf-phone', '09121234567');
  await pinDelivery(page);
  await page.fill('#vf-address', 'Plaque 12, unit 3');
  await page.fill('#vf-sender', 'Shirin Ahmadi');
  await page
    .getByRole('button', {name: 'Continue to payment'})
    .locator('visible=true')
    .first()
    .click();
  await expect(page.getByRole('radio', {name: 'Account balance'})).toBeChecked();
  const summary = page.locator('.ag-osum__sums');
  await expect(summary).toContainText('Balance discount · 5%');
  expect(await scanAxe(page)).toEqual([]);
  await page
    .getByRole('button', {name: 'Pay from balance'})
    .locator('visible=true')
    .first()
    .click();
  await expect(page.locator('main')).toContainText('Paid from balance');
  await expect(page.locator('main')).toContainText('Balance left');
  await openSite(page, 'account', 'en', {tab: 'balance'});
  await expect(page.locator('.vf-account-balance-history li').first()).toContainText(
    /Order \u2068?VN-/
  );
});

test('a guest is asked to sign in before paying from a balance', async ({page}) => {
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  await page.fill('#vf-name', 'Mina Rahimi');
  await page.fill('#vf-phone', '09121234567');
  await pinDelivery(page);
  await page.fill('#vf-address', 'Plaque 12, unit 3');
  await fillSender(page);
  await page
    .getByRole('button', {name: 'Continue to payment'})
    .locator('visible=true')
    .first()
    .click();
  const balance = page.getByRole('radio', {name: 'Account balance', exact: true});
  await expect(balance).toBeDisabled();
  // The option is named by its label alone; the reason is its description.
  await expect(balance).toHaveAccessibleName('Account balance');
  await expect(balance).toHaveAccessibleDescription('Sign in to pay from your account balance.');
  await expect(page.getByRole('radio', {name: 'Card-to-card transfer'})).toBeChecked();
  await expect(page.locator('.vf-checkout-wallet-hint')).toHaveCount(0);
});

test('a balance below the discount line says what a top-up would save', async ({page}) => {
  await page.addInitScript(() => {
    localStorage.setItem('vf-account-phone', '09125649438');
    localStorage.setItem(
      'vf-account:09125649438',
      JSON.stringify({
        profile: {name: 'Shirin', email: 'shirin@example.com', locale: 'en', sms: true},
        addresses: [],
        reminders: [],
        wallet: {balance: 20_000_000, history: []}
      })
    );
  });
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  await page.fill('#vf-name', 'Mina Rahimi');
  await page.fill('#vf-phone', '09121234567');
  await pinDelivery(page);
  await page.fill('#vf-address', 'Plaque 12, unit 3');
  await fillSender(page);
  await page
    .getByRole('button', {name: 'Continue to payment'})
    .locator('visible=true')
    .first()
    .click();
  await expect(page.locator('.vf-checkout-wallet-hint')).toHaveText(
    /^Top up 80,000,000 Toman and pay from your balance to get 5% off the products: [\d,]+ Toman off this order\.$/
  );
  await expect(
    page.getByRole('link', {name: 'Top up your balance'}).locator('visible=true').first()
  ).toHaveAttribute('href', /tab=balance/);
  // The discount isn't taken until the balance reaches the line.
  await expect(page.locator('.ag-osum__sums')).not.toContainText('Balance discount');
  expect(await scanAxe(page)).toEqual([]);
});

test('signing out leaves the account behind it', async ({page}) => {
  await openSite(page, 'account', 'en');
  await page.getByRole('button', {name: 'Sign out'}).click();
  await expect(page).toHaveURL(/^(?!.*view=account)/);
  expect(await page.evaluate(() => localStorage.getItem('vf-account-phone'))).toBeNull();
  // Back to the account, by link or by history, asks the customer to sign in again.
  await page.goBack();
  await expect(page).toHaveURL(/view=signin/);
  await expect(page.locator('#vf-phone')).toBeVisible();
  await page.goto(page.url().replace('view=signin', 'view=account'));
  await expect(page).toHaveURL(/view=signin/);
  await expect(page.locator('#vf-phone')).toBeVisible();
});

test('a guest sees no saved addresses in the bag', async ({page}) => {
  await openSite(page, 'bag', 'en', {step: 'delivery'});
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

test('contact shows the studio on a map and needs a way to reply', async ({page}) => {
  await openSite(page, 'contact', 'en');
  const map = page.getByRole('region', {name: 'The studio on the map'});
  await expect(map.locator('.leaflet-tooltip')).toHaveText(['Vendra Florist']);
  await expect(page.getByRole('main').getByRole('link', {name: 'Get directions'})).toHaveAttribute(
    'href',
    /destination=35\.8352,50\.975/
  );
  await page.fill('#vf-cmsg', 'Do you deliver to Fardis?');
  await page.getByRole('button', {name: 'Send', exact: true}).click();
  await expect(page.locator('#vf-cphone')).toBeFocused();
  await expect(page.locator('#vf-cphone')).toHaveAccessibleDescription(/or leave an email instead/);
  expect(await scanAxe(page)).toEqual([]);
  await page.fill('#vf-cemail', 'shirin@example.com');
  await page.getByRole('button', {name: 'Send', exact: true}).click();
  await expect(page.getByRole('region', {name: 'Message sent.'})).toBeFocused();
});

test('contact fills in a signed-in customer', async ({page}) => {
  await page.addInitScript(() => {
    localStorage.setItem('vf-account-phone', '09125649438');
    const key = 'vf-account:09125649438';
    if (!localStorage.getItem(key))
      localStorage.setItem(
        key,
        JSON.stringify({
          profile: {name: 'شیرین احمدی', email: 'shirin@example.com', locale: 'fa', sms: true},
          addresses: [],
          reminders: []
        })
      );
  });
  await openSite(page, 'contact', 'fa');
  await expect(page.locator('#vf-cname')).toHaveValue('شیرین احمدی');
  await expect(page.locator('#vf-cphone')).toHaveValue('09125649438');
  await expect(page.locator('#vf-cemail')).toHaveValue('shirin@example.com');
  await expect(page.getByRole('combobox')).toHaveCount(0);
});

test('a guest gets an empty contact form', async ({page}) => {
  await openSite(page, 'contact', 'en');
  await expect(page.locator('#vf-cname')).toHaveValue('');
  await expect(page.locator('#vf-cphone')).toHaveValue('');
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

test('home occasions scroll as a carousel', async ({page}, info) => {
  await openSite(page, 'home', 'en');
  const row = page.getByRole('region', {name: 'Occasions'});
  await expect(row.locator('.ag-cat')).not.toHaveCount(0);
  if (info.project.name === 'desktop') {
    await expect(page.getByRole('button', {name: 'More occasions'})).toBeVisible();
  }
  expect(await scanAxe(page)).toEqual([]);
});

test('the footer opens each policy and the policy page switches between them', async ({page}) => {
  await openSite(page, 'home', 'fa');
  const help = page.getByRole('navigation', {name: 'راهنما'});
  for (const name of ['ارسال و تحویل', 'بازگشت و بازپرداخت', 'حریم خصوصی', 'شرایط استفاده'])
    await expect(help.getByRole('link', {name})).toBeVisible();
  await help.getByRole('link', {name: 'شرایط استفاده'}).click();
  await expect(page).toHaveURL(/view=policy&id=terms/);
  await expect(page.getByRole('heading', {level: 1})).toHaveText('شرایط استفاده');
  const switcher = page.getByRole('navigation', {name: 'قوانین'});
  await expect(switcher.getByRole('link', {name: 'شرایط استفاده'})).toHaveAttribute(
    'aria-current',
    'page'
  );
  expect(await scanAxe(page)).toEqual([]);
  await switcher.getByRole('link', {name: 'بازگشت و بازپرداخت'}).click();
  await expect(page.getByRole('heading', {level: 1})).toHaveText('بازگشت و بازپرداخت');
  await expect(page.locator('main')).toContainText('۲۴ ساعت');
});

test('policies quote the live delivery rules', async ({page}) => {
  await openSite(page, 'policy', 'en', {id: 'shipping'});
  await expect(page.locator('main li')).toContainText([
    'Karaj central: 80,000 Toman, same day when you order by 18:00'
  ]);
  await expect(page.locator('main')).toContainText('on orders over 5,000,000 Toman');
});

test('an unknown policy is not found', async ({page}) => {
  await openSite(page, 'policy', 'en', {id: 'nope'});
  await expect(page.getByRole('link', {name: 'Terms of use'})).toBeVisible();
  await expect(page.getByRole('heading', {level: 1})).not.toHaveText(/Shipping/);
});

test('sign-in links to the terms and privacy policy', async ({page}) => {
  await openSite(page, 'signin', 'en');
  await page.getByRole('main').getByRole('link', {name: 'privacy policy'}).click();
  await expect(page.getByRole('heading', {level: 1})).toHaveText('Privacy');
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
  // Every design again: the first page of four, out of six.
  await expect(page.locator('main .ag-product')).toHaveCount(4);
  await expect(page.getByText('Showing 4 of 6 designs')).toBeVisible();
  await expect(page.locator('#vf-shop-count')).toBeFocused();
});

test('the footer newsletter checks the address and confirms the sign-up', async ({page}) => {
  await openSite(page, 'home', 'en');
  const form = page.getByRole('region', {name: 'Letters from the studio'});
  await form.getByRole('button', {name: 'Subscribe'}).click();
  const email = page.locator('#vf-news-email');
  await expect(email).toBeFocused();
  await expect(email).toHaveAttribute('aria-invalid', 'true');
  expect(await scanAxe(page)).toEqual([]);
  await email.fill('rose@example.com');
  await email.press('Enter');
  // The address is wrapped in bidi isolates so it reads correctly inside Persian text.
  const done = page.locator('#vf-news-done');
  await expect(done).toHaveText(/rose@example\.com\u2069? is on the list/);
  await expect(done).toBeFocused();
  await page.reload();
  await expect(done).toBeVisible();
  await expect(page.locator('#vf-news-email')).toHaveCount(0);
});

test('the newsletter fills in a signed-in customer’s email', async ({page}) => {
  await page.addInitScript(() => {
    localStorage.setItem('vf-account-phone', '09125649438');
    localStorage.setItem(
      'vf-account:09125649438',
      JSON.stringify({
        profile: {name: 'Shirin', email: 'shirin@example.com', locale: 'en', sms: true},
        addresses: [],
        reminders: []
      })
    );
  });
  await openSite(page, 'home', 'fa');
  await expect(page.locator('#vf-news-email')).toHaveValue('shirin@example.com');
  await expect(page.getByRole('heading', {name: 'نامه‌های استودیو'})).toBeVisible();
});

test.describe('a first visit', () => {
  test.use({storageState: NO_CONSENT});

  test('asks about visit counts and remembers the choice', async ({page}) => {
    await openSite(page, 'home', 'en');
    const banner = page.getByRole('region', {name: 'Your privacy'});
    await expect(banner).toBeVisible();
    await expect(banner.getByRole('link', {name: 'Privacy policy'})).toHaveAttribute(
      'href',
      /view=policy&id=privacy/
    );
    expect(await scanAxe(page)).toEqual([]);
    await banner.getByRole('button', {name: 'Essential only'}).click();
    await expect(banner).toHaveCount(0);
    expect(await page.evaluate(() => localStorage.getItem('vf-consent'))).toBe('essential');
    await page.reload();
    await expect(page.locator('#main')).toBeVisible();
    await expect(banner).toHaveCount(0);
    // Cookie settings in the footer asks again and hands focus back afterwards.
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
          const stop = AG_TRACK.subscribe(event => sent.push(event));
          AG_TRACK.event('search', {});
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
          const stop = AG_TRACK.subscribe(event => sent.push(event));
          AG_TRACK.event('search', {});
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
          const stop = AG_TRACK.subscribe(event => sent.push(event));
          AG_TRACK.event('search', {});
          stop();
          return sent.length;
        })()
      )
    ).toBe(0);
  });
});

test('the footer lists shop and studio links, social links, contact details and the credit', async ({
  page
}) => {
  await openSite(page, 'home', 'en');
  const footer = page.getByRole('contentinfo');
  await footer.getByRole('navigation', {name: 'Shop'}).getByRole('link', {name: 'Orchids'}).click();
  await expect(page).toHaveURL(/view=shop&cat=orchids/);
  await expect(
    footer.getByRole('navigation', {name: 'The studio'}).getByRole('link', {name: 'Journal'})
  ).toBeVisible();
  const social = footer.getByRole('list', {name: 'Follow and message us'});
  await expect(social.getByRole('link')).toHaveCount(3);
  await expect(social.getByRole('link', {name: /^Instagram/})).toHaveAttribute('target', '_blank');
  await expect(footer.getByRole('link', {name: 'Get directions'})).toHaveAttribute(
    'href',
    /destination=35\.8352,50\.975/
  );
  await expect(footer).toContainText(
    '© ' + new Date().getFullYear() + ' Vendra Florist. All rights reserved.'
  );
  await expect(footer.getByRole('link', {name: 'Misaf', exact: true})).toHaveAttribute(
    'href',
    'https://github.com/misaf'
  );
  expect(await scanAxe(page)).toEqual([]);
});

test('the Persian footer dates the copyright in the Persian calendar', async ({page}) => {
  await openSite(page, 'home', 'fa');
  const year = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {year: 'numeric'}).format(new Date());
  await expect(page.getByRole('contentinfo')).toContainText(
    '© ' + year + ' گل‌فروشی وندرا. همه حقوق محفوظ است.'
  );
  expect(await scanAxe(page)).toEqual([]);
});
