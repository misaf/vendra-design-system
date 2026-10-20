import {test, expect} from '@playwright/test';
import {
  NO_CONSENT,
  openSite,
  openFooterGroup,
  pinDelivery,
  scanAxe,
  choiceTile
} from './helpers.mjs';

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
  await page.evaluate(() => {
    const site = window.__vfSite;
    site.setState({bag: [site.state.bag[0]]});
  });
  const days = page.getByRole('radiogroup', {name: 'Delivery day'});
  await expect(days.getByRole('radio')).toHaveCount(7);
  await expect(days.getByRole('radio', {name: /^Today/})).toBeChecked();
  // A tile is named by its day; why it can't be picked is its description.
  const soldOut = days.locator('label.ag-choice', {hasText: 'Sold out'}).getByRole('radio');
  await expect(soldOut).toBeDisabled();
  await expect(soldOut).toHaveAccessibleDescription(/Sold out/);
  await choiceTile(days, /^Thu/).click();
  await expect(days.getByRole('radio', {name: /^Thu/})).toBeChecked();
});

test('after the cut-off, today is closed', async ({page}) => {
  await page.clock.setFixedTime(new Date('2026-10-05T19:00:00+03:30'));
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  await page.evaluate(() => {
    const site = window.__vfSite;
    site.setState({bag: [site.state.bag[0]]});
  });
  const days = page.getByRole('radiogroup', {name: 'Delivery day'});
  const today = days.getByRole('radio', {name: 'Today', exact: true});
  await expect(today).toBeDisabled();
  await expect(today).toHaveAccessibleDescription(/Order by 18:00/);
  await expect(days.getByRole('radio', {name: /^Tomorrow/})).toBeChecked();
});

test('today’s slots close two hours before they end', async ({page}) => {
  await page.clock.setFixedTime(new Date('2026-10-05T14:30:00+03:30'));
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  await page.evaluate(() => {
    const site = window.__vfSite;
    site.setState({bag: [site.state.bag[0]]});
  });
  const slots = page.getByRole('radiogroup', {name: 'Time slot'});
  for (const name of ['08:00–12:00', '12:00–16:00']) {
    const slot = slots.getByRole('radio', {name, exact: true});
    await expect(slot).toBeDisabled();
    await expect(slot).toHaveAccessibleDescription(/Closed/);
  }
  await expect(slots.getByRole('radio', {name: /^16:00–20:00/})).toBeChecked();
  await choiceTile(page.getByRole('radiogroup', {name: 'Delivery day'}), /^Tomorrow/).click();
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
  const recent = page.getByRole('region', {name: /^Recently viewed\./});
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
  await expect(page.locator('#vf-zone')).toContainText('مرکز کرج، رایگان');
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
  await page.getByRole('radiogroup').getByText('Card-to-card transfer').click();
  await expect(page.locator('#vf-last4')).toBeVisible();
});

test('a guest can sign in from checkout and come back to it', async ({page}) => {
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  await page.locator('.vf-bag-signin').getByRole('link', {name: 'Sign in'}).click();
  await expect(page).toHaveURL(/view=signin&next=delivery/);
  await page.fill('#vf-phone', '09125649438');
  await page.locator('main').getByRole('button', {name: 'Send code'}).click();
  // The code is checked as soon as it is complete.
  await page.fill('#vf-code', '12345');
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

test('on Android the code fills itself from the SMS and signs in', async ({page}) => {
  // Chrome on Android hands over the code from an SMS ending "@<domain> #<code>" (Web OTP).
  await page.addInitScript(() => {
    window.OTPCredential = function OTPCredential() {};
    const asked = (window.__otpAsked = []);
    Object.defineProperty(navigator, 'credentials', {
      value: {
        get: options => {
          asked.push(options.otp.transport.join());
          return new Promise(resolve => setTimeout(() => resolve({code: '۱۲۳۴۵'}), 300));
        }
      }
    });
  });
  await openSite(page, 'signin', 'en');
  await page.fill('#vf-phone', '۰۹۱۲۵۶۴۹۴۳۸');
  await page.locator('main').getByRole('button', {name: 'Send code'}).click();
  await expect(page.locator('main h1')).toContainText('Welcome back');
  expect(await page.evaluate(() => window.__otpAsked)).toEqual(['sms']);
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
  // The phone on the order can be typed another way, such as with +98.
  await page.fill('#vf-lookup-phone', '+98 912 564 9438');
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

// Online, the customer pays on the bank's page and comes back. The sample store's bank is
// simulated: it answers through the return link (VF_STORE.paymentDemo.online, or "failed" with
// ?demo=error).
async function toOnlinePayment(page) {
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
  await chooseOnlinePayment(page);
}

// The checkout step can still be mounting (after "Continue to payment" or a navigate()) and render
// the method again with its default, so the choice is retried until it holds.
async function chooseOnlinePayment(page) {
  const online = page.getByRole('radio', {name: 'Online card demo'});
  await expect(async () => {
    await online.check({force: true, timeout: 2_000});
    await expect(online).toBeChecked({timeout: 1_000});
  }).toPass({timeout: 15_000});
}

test('an online payment goes to the bank and comes back paid', async ({page}) => {
  await toOnlinePayment(page);
  const loads = [];
  page.on('load', () => loads.push(page.url()));
  await page
    .getByRole('button', {name: 'Continue to the bank'})
    .locator('visible=true')
    .first()
    .click();
  await expect(page.getByRole('heading', {level: 1})).toHaveText('Taking you to the bank');
  await expect(page.locator('.vf-mobile-action')).toBeHidden();
  // The browser leaves for the bank, which sends it back to checkout with its answer. PaymentStatus
  // waits 1.5s before it leaves, then a full page load follows: more than the default 5s under load.
  await expect
    .poll(() => loads.some(url => url.includes('payment=return')), {timeout: 20_000})
    .toBe(true);
  await expect(page.locator('main h1')).toContainText('Thank you');
  await expect(page).not.toHaveURL(/payment=return/);
  await expect(page.locator('main')).toContainText('Paid online');
  await expect(page.locator('main dl')).toContainText(/Tracking number.*\d{12}/s);
  // A reload doesn't ask the bank again or place a second order.
  await page.reload();
  await expect(page.locator('main h1')).toContainText('Thank you');
});

test('a payment the bank refuses keeps the bag and can be paid again', async ({page}) => {
  await toOnlinePayment(page);
  await page.evaluate(() => window.__vfSite.navigate({view: 'checkout', demo: 'error'}));
  await chooseOnlinePayment(page);
  const refusedReturn = page.waitForURL(
    url =>
      url.searchParams.get('payment') === 'return' && url.searchParams.get('result') === 'failed',
    {waitUntil: 'load', timeout: 20_000}
  );
  await page
    .getByRole('button', {name: 'Continue to the bank'})
    .locator('visible=true')
    .first()
    .click();
  await refusedReturn;
  const heading = page.getByRole('heading', {level: 1});
  await expect(heading).toHaveText('The payment didn’t go through');
  // The bank's answer takes focus, so a screen reader reads it.
  await expect(heading).toBeFocused();
  await expect(page.locator('main')).toContainText('within 72 hours');
  expect(await scanAxe(page)).toEqual([]);
  const paidReturn = page.waitForURL(
    url =>
      url.searchParams.get('payment') === 'return' && url.searchParams.get('result') === 'paid',
    {waitUntil: 'load', timeout: 20_000}
  );
  await page.getByRole('button', {name: 'Pay again'}).click();
  await paidReturn;
  await expect(page.locator('main h1')).toContainText('Thank you');
});

test('a return link for an order this tab doesn’t hold says not to pay twice', async ({page}) => {
  await openSite(page, 'checkout', 'fa', {payment: 'return', order: 'VN-1', result: 'paid'});
  await expect(page.getByRole('heading', {level: 1})).toHaveText('پرداخت شما هنوز تأیید نشده');
  await expect(page.locator('main')).toContainText('لطفاً دوباره پرداخت نکنید');
  await expect(page.getByRole('link', {name: 'تماس با ما'})).toHaveAttribute(
    'href',
    'tel:+989129333034'
  );
  expect(await scanAxe(page)).toEqual([]);
});

test('the storefront reports the contract’s events, and nothing personal', async ({page}, info) => {
  // On phones the shop's filters are in a dialog; the events are the same.
  test.skip(info.project.name !== 'desktop', 'desktop only');
  const warnings = [];
  page.on('console', message => {
    if (message.text().startsWith('VF_TRACK')) warnings.push(message.text());
  });
  const names = () => page.evaluate(() => window.VF_TRACK.log.map(event => event.event));
  await openSite(page, 'product', 'en');
  const viewed = await page.evaluate(() => window.VF_TRACK.log.at(-1));
  expect(viewed).toMatchObject({event: 'view_item', items: [{item_id: 'VF-7K2M4Q'}]});
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
    .poll(() => page.evaluate(() => window.VF_TRACK.log.find(event => event.event === 'search')))
    .toMatchObject({search_term: 'orchid', results: 1});
  await page.getByRole('searchbox').fill('09121234567');
  await expect
    .poll(() => page.evaluate(() => window.VF_TRACK.log.at(-1)))
    .toMatchObject({event: 'search', search_term: '(personal data)'});
  await page.evaluate(() => window.__vfSite.navigate({view: 'shop'}));
  await page
    .locator('.ag-switch', {hasText: 'In stock only'})
    .locator('visible=true')
    .first()
    .click();
  await expect
    .poll(() => page.evaluate(() => window.VF_TRACK.log.at(-1)))
    .toMatchObject({event: 'filter', filter_id: 'stock', action: 'add'});
  await page.getByRole('button', {name: 'Remove In stock only'}).click();
  await expect
    .poll(() => page.evaluate(() => window.VF_TRACK.log.at(-1)))
    .toMatchObject({event: 'filter', filter_id: 'stock', action: 'remove'});
  expect(warnings).toEqual([]);
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
  await expect(page.getByRole('region', {name: 'Demo preview complete'})).toBeFocused();
});

test('several contact problems are listed together, each linking to its field', async ({page}) => {
  await openSite(page, 'contact', 'en');
  await page.fill('#vf-cemail', 'shirin@');
  await page.getByRole('button', {name: 'Send', exact: true}).click();
  const summary = page.locator('#vf-contact-errors');
  await expect(summary).toBeFocused();
  await expect(summary).toContainText('Check 2 details to continue.');
  await expect(summary.getByRole('link')).toHaveCount(2);
  expect(await scanAxe(page)).toEqual([]);
  await summary.getByRole('link').last().click();
  await expect(page.locator('#vf-cmsg')).toBeFocused();
});

test('a wedding inquiry lists what it still needs, each linking to its field', async ({page}) => {
  await openSite(page, 'weddings', 'en');
  await page.getByRole('button', {name: 'Send inquiry'}).click();
  const summary = page.locator('#vf-wedding-errors');
  await expect(summary).toBeFocused();
  await expect(summary.getByRole('link')).toHaveCount(2);
  expect(await scanAxe(page)).toEqual([]);
  await summary.getByRole('link').last().click();
  await expect(page.locator('#vf-wphone')).toBeFocused();
});

test('a sign-in problem shows above the field, and the field takes focus', async ({page}) => {
  await openSite(page, 'signin', 'en');
  await page.getByRole('button', {name: 'Send code'}).click();
  await expect(page.locator('#vf-phone')).toBeFocused();
  await expect(page.locator('#vf-signin-errors').getByRole('link')).toHaveCount(1);
  expect(await scanAxe(page)).toEqual([]);
});

test('the address editor lists every problem before it saves', async ({page}) => {
  await openSite(page, 'account', 'en');
  await page.getByRole('tab', {name: 'Addresses'}).click();
  await page.getByRole('button', {name: 'Add an address'}).click();
  await page.fill('#vf-address-phone', '');
  await page.getByRole('dialog').getByRole('button', {name: 'Save'}).click();
  const summary = page.locator('#vf-editor-errors');
  await expect(summary).toBeFocused();
  await expect(summary.getByRole('link')).toHaveCount(3);
  expect(await scanAxe(page)).toEqual([]);
  await summary.getByRole('link').nth(1).click();
  await expect(page.locator('#vf-address-line')).toBeFocused();
});

test('the site says when the connection drops and when it is back', async ({page, context}) => {
  await openSite(page, 'shop', 'fa');
  const band = page.locator('.ag-offline');
  await expect(band).toHaveText('');
  await context.setOffline(true);
  await expect(band).toContainText('اتصال اینترنت شما قطع است.');
  expect(await scanAxe(page)).toEqual([]);
  await context.setOffline(false);
  await expect(band).toHaveText('دوباره آنلاین هستید.');
});

test('the server-error page offers a retry, the way home and the phone', async ({page}) => {
  await openSite(page, 'error', 'en');
  const main = page.getByRole('main');
  await expect(main.getByRole('heading', {level: 1})).toContainText('Something went wrong');
  await expect(main.getByRole('link', {name: 'Back home'})).toBeVisible();
  await expect(main.getByRole('link', {name: /^Call /})).toHaveAttribute('href', /^tel:/);
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', /noindex/);
  // Try again reloads the page: wait for the reload before looking for the heading again.
  await Promise.all([
    page.waitForEvent('load'),
    main.getByRole('button', {name: 'Try again'}).click()
  ]);
  await expect(main.getByRole('heading', {level: 1})).toContainText('Something went wrong');
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
  await expect(page.locator('.ag-select')).toHaveCount(0);
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
  const row = page.getByRole('region', {name: /^Occasions/});
  await expect(row.locator('.ag-cat')).not.toHaveCount(0);
  if (info.project.name === 'desktop') {
    await expect(
      page.getByRole('button', {name: 'More occasions', includeHidden: true})
    ).toBeHidden();
  }
  expect(await scanAxe(page)).toEqual([]);
});

test('the footer opens each policy and the policy page switches between them', async ({page}) => {
  await openSite(page, 'home', 'fa');
  const help = await openFooterGroup(page, 'راهنما');
  for (const name of [
    'ارسال و تحویل',
    'بازگشت و بازپرداخت',
    'حریم خصوصی',
    'شرایط استفاده',
    'دسترس‌پذیری'
  ])
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

test('the accessibility statement says what we aim for and how to reach us', async ({page}) => {
  await openSite(page, 'policy', 'en', {id: 'accessibility'});
  await expect(page.getByRole('heading', {level: 1})).toHaveText('Accessibility');
  const main = page.getByRole('main');
  await expect(main).toContainText('WCAG) 2.2 at level AA');
  await expect(main.getByRole('heading', {name: 'Known limits'})).toBeVisible();
  await expect(main).toContainText('+98 912 933 3034');
  expect(await scanAxe(page)).toEqual([]);
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
  await expect(page.getByRole('heading', {level: 1})).toHaveText(/^This page has\s*wilted\.$/);
  const help = await openFooterGroup(page, 'Help');
  await expect(help.getByRole('link', {name: 'Terms of use', exact: true})).toBeVisible();
});

test('sign-in links to the terms and privacy policy', async ({page}) => {
  await openSite(page, 'signin', 'en');
  // A plain link to another view switches it in place, without reloading the site.
  await page.evaluate(() => (window.__vfSameDocument = true));
  await page.getByRole('main').getByRole('link', {name: 'privacy policy'}).click();
  await expect(page.getByRole('heading', {level: 1})).toHaveText('Privacy');
  expect(await page.evaluate(() => window.__vfSameDocument)).toBe(true);
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

test('the home page shows the categories, ready-made designs, weddings and the latest posts', async ({
  page
}) => {
  await openSite(page, 'home', 'en');
  // The categories, the ready-made designs, occasions, new designs, weddings, the journal and the
  // newsletter
  // (the announcement carries the delivery line).
  const order = await page
    .locator('main > section')
    .evaluateAll(sections => sections.map(section => section.className.match(/vf-home-[a-z]+/)[0]));
  expect(order).toEqual([
    'vf-home-top',
    'vf-home-featured',
    'vf-home-categories',
    'vf-home-arrivals',
    'vf-home-weddings',
    'vf-home-journal',
    'vf-home-newsletter'
  ]);
  const featured = page.locator('.vf-home-featured');
  await expect(featured.getByRole('heading', {name: 'Ready to send.'})).toBeVisible();
  await expect(featured.getByText('Ready', {exact: true})).toHaveCount(4);
  await expect(featured.locator('.ag-product')).toHaveCount(4);
  await expect(featured.locator('.ag-product').first()).toContainText('VF-4CJ6ZB');
  const journal = page.locator('.vf-home-journal');
  await expect(journal.getByRole('heading', {level: 3})).toHaveText([
    'What’s in season this autumn',
    'Five ways to keep a bouquet fresh',
    'Choosing your bridal bouquet'
  ]);
  // Every category, in the store's order, as a row of circles; each opens its shop filter.
  const categories = page.getByRole('region', {name: /^Categories/});
  await expect(categories.getByRole('link')).toHaveCount(12);
  await expect(categories.getByRole('link').first()).toHaveAccessibleName('Bouquets');
  await expect(categories.getByRole('link', {name: 'Plants'})).toHaveAttribute(
    'href',
    /cat=plants/
  );
  await expect(
    page.locator('.vf-home-weddings').getByRole('link', {name: 'Plan your wedding flowers'})
  ).toHaveAttribute('href', /view=weddings/);
  expect(await scanAxe(page)).toEqual([]);
  await journal.getByRole('link', {name: /Five ways to keep a bouquet fresh/}).click();
  await expect(page).toHaveURL(/view=post&post=care/);
});

test('the home page newsletter checks the address and confirms the sign-up', async ({page}) => {
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
  await expect(done).toHaveText(/rose@example\.com\u2069? was not subscribed/);
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
          const stop = VF_TRACK.subscribe(event => sent.push(event));
          VF_TRACK.event('search', {});
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
          const stop = VF_TRACK.subscribe(event => sent.push(event));
          VF_TRACK.event('search', {});
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
          const stop = VF_TRACK.subscribe(event => sent.push(event));
          VF_TRACK.event('search', {});
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
  await openFooterGroup(page, 'Shop');
  await footer.getByRole('navigation', {name: 'Shop'}).getByRole('link', {name: 'Orchids'}).click();
  await expect(page).toHaveURL(/view=shop&cat=orchids/);
  await openFooterGroup(page, 'The studio');
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
  // The issuers check the referring site, so the seals keep it.
  for (const name of ['eNamad trust seal', 'Samandehi registration']) {
    const seal = footer.getByRole('link', {name});
    await expect(seal).toHaveAttribute('referrerpolicy', 'origin');
    await expect(seal).toHaveAttribute('rel', 'noopener');
  }
  // Check the page's stretched product-card hit targets with its content on screen, rather than
  // clipped under the sticky header after navigating through the footer. Footer controls also
  // have their own keyboard, touch and axe coverage in footer.spec.mjs.
  await page.evaluate(() => window.scrollTo(0, 0));
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

// A page whose code fails to load (dev: its Page.jsx; build: its page-<name> chunk) shows a reload
// alert, in the site and on its own, and the rest of the site keeps working.
const SHOP_CODE = /storefront-shop\/Page\.jsx|\/page-shop-[\w-]+\.js/;

test('a page that fails to load offers a reload', async ({page}) => {
  await page.route(SHOP_CODE, route => route.abort());
  await openSite(page, 'home', 'en');
  await page.evaluate(() => window.__vfSite.navigate({view: 'shop'}));
  const alert = page.getByRole('alert').filter({hasText: 'This page didn’t load.'});
  await expect(alert).toBeVisible();
  await expect(alert.getByRole('button', {name: 'Reload'})).toBeVisible();
  await page.evaluate(() => window.__vfSite.navigate({view: 'faq'}));
  await expect(page.locator('h1')).toBeVisible();
  await expect(alert).toHaveCount(0);
});

test('a standalone page that fails to load offers a reload', async ({page}) => {
  await page.route(SHOP_CODE, route => route.abort());
  await page.goto('/templates/app/?page=shop&lang=fa');
  await expect(page.getByRole('alert').filter({hasText: 'این صفحه بارگذاری نشد.'})).toBeVisible();
  await expect(page).toHaveTitle('این صفحه بارگذاری نشد. · گل‌فروشی وندرا');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
});

test('a page that fails to preload in the background never reloads the tab', async ({page}) => {
  let loads = 0;
  page.on('load', () => loads++);
  await page.route(SHOP_CODE, route => route.abort());
  await openSite(page, 'checkout', 'en');
  await page.waitForTimeout(1500);
  expect(loads).toBe(1);
});

// The storefront shows its own field errors, so its forms turn the browser's popups off.
test('forms leave validation to the storefront', async ({page}) => {
  await openSite(page, 'track', 'en');
  await expect(page.locator('form')).not.toHaveCount(0);
  await expect(page.locator('form:not([novalidate])')).toHaveCount(0);
});

test('while a page’s code loads, the current page stays on screen', async ({page}) => {
  let release;
  const held = new Promise(resolve => (release = resolve));
  await page.route(SHOP_CODE, async route => {
    await held;
    await route.continue();
  });
  await openSite(page, 'home', 'en');
  const home = await page.locator('h1').textContent();
  const url = page.url();
  await page.evaluate(() => window.__vfSite.navigate({view: 'shop'}));
  await page.waitForTimeout(300);
  await expect(page.locator('h1')).toHaveText(home);
  await expect(page.locator('#main')).toBeVisible();
  expect(page.url()).toBe(url);
  release();
  await expect(page.locator('.vf-shop-product-grid')).toBeVisible();
  expect(page.url()).toMatch(/view=shop/);
});

// Printed, a page is its content: no header, footer, tab bar or cookie notice.
test.describe('print', () => {
  test.use({storageState: NO_CONSENT});
  test('prints the page content without the site chrome', async ({page}) => {
    await openSite(page, 'faq', 'en');
    // The cookie notice: its own bar on desktop, docked in the bottom bar on mobile.
    await expect(page.locator('.vf-shell-consent-dock').first()).toBeVisible();
    await page.emulateMedia({media: 'print'});
    for (const chrome of [
      '.vf-shell-header',
      '.vf-shell-footer',
      '.vf-shell-bottom-bar',
      '.vf-shell-consent-dock'
    ])
      await expect(page.locator(chrome).first()).toBeHidden();
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('main').getByRole('button').first()).toBeVisible();
  });
});

// WCAG 2.4.11 Focus Not Obscured: tabbing through a long page never leaves the focused element
// under the sticky header or the sticky bars at the bottom of the screen.
async function focusObscured(page) {
  return page.evaluate(() => {
    const element = document.activeElement;
    const chrome = '.vf-shell-header, .vf-shell-bottom-bar, .vf-shell-consent-bar';
    if (!element || element === document.body || element.closest(chrome)) return null;
    // A visually hidden input (checkbox, radio) is seen as its label.
    const shown = element.offsetHeight > 2 ? element : element.closest('label') || element;
    const box = shown.getBoundingClientRect();
    if (!box.height || !box.width) return null;
    // What is painted at the element's centre (clamped to the viewport): a sticky bar there means
    // the focused element is hidden under it.
    const x = Math.min(innerWidth - 1, Math.max(0, box.left + box.width / 2));
    const y = Math.min(innerHeight - 1, Math.max(0, box.top + box.height / 2));
    const onTop = document.elementFromPoint(x, y);
    const hidden =
      box.bottom <= 0 ||
      box.top >= innerHeight ||
      (onTop && !element.contains(onTop) && onTop.closest(chrome));
    return hidden
      ? (
          element.textContent ||
          element.getAttribute('aria-label') ||
          shown.textContent ||
          element.tagName
        )
          .trim()
          .slice(0, 40)
      : null;
  });
}

test.describe('focus is never hidden under the sticky bars', () => {
  test.use({storageState: NO_CONSENT});
  for (const [view, lang] of [
    ['shop', 'en'],
    ['shop', 'fa'],
    ['bag', 'en'],
    ['product', 'fa']
  ])
    test(`tabbing through ${view} (${lang})`, async ({page}) => {
      await page.emulateMedia({reducedMotion: 'reduce'});
      await openSite(page, view, lang);
      const hidden = [];
      // The shell nudges the page a frame after focus moves.
      const settled = () =>
        page.evaluate(
          () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
        );
      for (let i = 0; i < 40; i++) {
        await page.keyboard.press('Tab');
        await settled();
        const name = await focusObscured(page);
        if (name) hidden.push(name);
      }
      for (let i = 0; i < 25; i++) {
        await page.keyboard.press('Shift+Tab');
        await settled();
        const name = await focusObscured(page);
        if (name) hidden.push(name);
      }
      expect(hidden).toEqual([]);
    });
});

test('the journal splits its stories across pages, keeping the page in the URL', async ({page}) => {
  await openSite(page, 'journal', 'en');
  const stories = page.locator('main .ag-blog');
  const pages = page.getByRole('navigation', {name: 'Pages'});
  await expect(stories).toHaveCount(7);
  await expect(pages.getByRole('link', {name: 'Page 1'})).toHaveAttribute('aria-current', 'page');
  await expect(pages.getByRole('link', {name: 'Previous page'})).toHaveAttribute(
    'aria-disabled',
    'true'
  );
  await pages.getByRole('link', {name: 'Page 2'}).click();
  await expect(page).toHaveURL(/view=journal.*page=2/);
  await expect(stories).toHaveCount(3);
  await expect(pages.getByRole('link', {name: 'Page 2'})).toHaveAttribute('aria-current', 'page');
  await page.reload();
  await expect(stories).toHaveCount(3);
  // A search starts again from the first page.
  await page.getByRole('searchbox', {name: 'Search stories'}).fill('a');
  await expect(page).not.toHaveURL(/page=/);
  // Persian pages count in Persian digits.
  await openSite(page, 'journal', 'fa');
  await expect(
    page.getByRole('navigation', {name: 'صفحه‌ها'}).getByRole('link', {name: 'صفحهٔ ۲'})
  ).toHaveText('۲');
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
  await expect(crumbs.getByRole('link', {name: 'Shop'})).toHaveAttribute('href', /view=shop/);
  await expect(crumbs.getByRole('link', {name: 'Flower boxes'})).toHaveAttribute(
    'href',
    /cat=boxes/
  );
  await expect(crumbs.locator('[aria-current="page"]')).toHaveText('VF-7K2M4Q');
});

test('ready-made designs: a shop filter, the Ready badge everywhere and a link from home', async ({
  page
}) => {
  await openSite(page, 'home', 'en');
  await page.locator('.vf-home-featured').getByRole('link', {name: 'All ready to send'}).click();
  await expect(page).toHaveURL(/view=shop.*filters=ready/);
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

test('the bag shows how far the order is from free delivery', async ({page}) => {
  await openSite(page, 'bag', 'en');
  const meter = page.getByRole('meter');
  await expect(meter).toHaveCount(0);
  await page
    .getByRole('button', {name: 'Continue to delivery', exact: true})
    .filter({visible: true})
    .click();
  await pinDelivery(page);
  await page.goBack();
  await expect(page).not.toHaveURL(/step=delivery/);
  await expect(meter).toHaveAccessibleName(
    /more for free delivery in Karaj|Free delivery in Karaj/
  );
  await expect(meter).toHaveAttribute('aria-valuetext', /of 5,000,000 Toman$/);
  await expect(meter).toHaveAttribute('aria-valuemax', '5000000');
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
  await page.getByRole('link', {name: 'Show more'}).click();
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

test('the announcement says when an order placed now arrives, on every page', async ({
  page
}, info) => {
  await page.clock.setFixedTime(MORNING);
  await openSite(page, 'home', 'en');
  const bar = page.getByRole('region', {name: 'Store news'});
  // Phones get the store's shorter version: the delivery line without the free-delivery sentence.
  // Both versions are in the page and CSS shows one, so read the rendered text.
  const shown = {useInnerText: true};
  if (info.project.name === 'mobile') {
    await expect(bar).toContainText('Order by 18:00 for same-day delivery in Karaj.', shown);
    await expect(bar).not.toContainText('Free delivery', shown);
  } else
    await expect(bar).toContainText(
      'Order by 18:00 for same-day delivery in Karaj. Free delivery over 5,000,000 Toman.',
      shown
    );
  await expect(bar.getByRole('link', {name: 'Shop same-day'})).toHaveAttribute(
    'href',
    /view=shop.*filters=same/
  );
  // The home page opens on its heading and the categories.
  const main = page.getByRole('main');
  await expect(main.locator('section').first()).toHaveClass(/vf-home-top/);
  await expect(main.getByRole('heading', {level: 1})).toHaveText('Shop by category.');
  // After the cut-off, the next delivery day instead, and no same-day link.
  await page.clock.setFixedTime(new Date('2026-10-05T19:00:00+03:30'));
  await openSite(page, 'shop', 'fa');
  const faBar = page.getByRole('region', {name: 'خبر فروشگاه'});
  await expect(faBar).toContainText('نزدیک‌ترین تحویل در کرج: فردا، ۱۴ مهر.');
  await expect(faBar.getByRole('link')).toHaveCount(0);
});

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
    /view%3Dsaved%26ids%3DVF-7K2M4Q%252CVF-8RD5WN/
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
  await expect(phone).toHaveURL(/view=bag$/);
  await expect(phone.getByText('VF-7K2M4Q').first()).toBeVisible();
  await expect(phone.getByText(/Classic · 20 stems · Glass vase/).first()).toBeVisible();
});

test('presentation sharing preserves the quoted size and extras on the customer’s phone', async ({
  page
}) => {
  await openCounter(page, 'en');
  await page.getByRole('button', {name: /Show VF-7K2M4Q full screen/}).click();
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
  shared.searchParams.set('lang', 'fa');
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
  await expect(
    page.getByRole('button', {name: 'Show VF-3HX9TP full screen, 2,800,000 Toman, Ready'})
  ).toBeVisible();
});

test('a sold-out design is shown and starred, but not offered for sale', async ({page}) => {
  await openCounter(page, 'en');
  await page.getByRole('button', {name: /Show VF-6MT3VY full screen, .*, Sold out/}).click();
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
    let api;
    Object.defineProperty(window, 'VF_API', {
      configurable: true,
      get: () => api,
      set: value => {
        api = value;
        api.setBase('https://api.test');
      }
    });
  });
  await page.clock.install();
  await openCounter(page, 'en');
  await page.getByRole('button', {name: /Show VF-7K2M4Q full screen/}).click();
  const viewer = page.getByRole('dialog', {name: 'Designs'});
  await viewer.getByRole('button', {name: 'Add to the order'}).click();
  await page.keyboard.press('Escape');
  await page.getByRole('button', {name: /Show VF-8RD5WN full screen/}).click();
  await viewer.getByRole('button', {name: 'Add to the order'}).click();
  await page.keyboard.press('Escape');
  soldOut = true;
  await page.clock.runFor(121_000);
  await expect(
    page.getByRole('button', {name: /Show VF-7K2M4Q full screen, .*Sold out/})
  ).toBeVisible();
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
  await page.getByRole('button', {name: /Show VF-7K2M4Q full screen/}).click();
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
        return [{rawValue: location.origin + '/templates/app/?view=product&id=VF-8RD5WN'}];
      }
    };
  });
  await openCounter(page, 'en');
  await page.getByRole('button', {name: 'Scan a tag'}).click();
  const viewer = page.getByRole('dialog', {name: 'Designs'});
  await expect(viewer.getByText('VF-8RD5WN')).toBeVisible();
  await expect(viewer.getByText('1 of 1')).toBeVisible();
});

test('the product page shows its photos full screen', async ({page}) => {
  await openSite(page, 'product', 'en');
  await page.getByRole('button', {name: 'View full screen'}).click();
  const viewer = page.getByRole('dialog', {name: 'Product photos'});
  await expect(viewer.getByText('1 of 3')).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(viewer.getByText('2 of 3')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', {name: 'View full screen'})).toBeFocused();
});
