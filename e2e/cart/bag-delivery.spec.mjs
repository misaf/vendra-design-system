import {test, expect} from '@playwright/test';
import {openSite, pinDelivery, scanAxe, choiceTile, chooseDeliveryTime} from '../helpers.mjs';
import {MORNING, fillSender} from '../delivery-fixtures.mjs';

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
  await expect(slots.getByRole('radio', {checked: true})).toHaveCount(0);
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
  await chooseDeliveryTime(page);
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
  await expect(summary).toContainText('Check 7 details to continue.');
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
  await expect(zone).toContainText('Set from the pin.');
  // The orchid needs preparation, so the bag promises no same-day cut-off.
  await expect(zone).not.toContainText('Same day before');
});

test('a promo code discounts the bag and carries to checkout', async ({page}) => {
  // Time keeps running from 09:00: the map's pan animation needs a moving clock.
  await page.clock.setSystemTime(MORNING);
  await openSite(page, 'bag', 'en');
  // The field waits behind its disclosure, which opens it and moves focus into it.
  const reveal = page.getByRole('button', {name: 'Have a promo code?'});
  await expect(reveal).toHaveAttribute('aria-expanded', 'false');
  await reveal.click();
  await expect(reveal).toHaveAttribute('aria-expanded', 'true');
  const code = page.getByRole('textbox', {name: 'Promo code'});
  await expect(code).toBeFocused();
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
  await chooseDeliveryTime(page);
  await page
    .getByRole('button', {name: 'Continue to payment'})
    .locator('visible=true')
    .first()
    .click();
  await expect(page.locator('#vf-last4')).toBeVisible();
  await expect(page.locator('main')).toContainText('Discount · ROSES15');
});

for (const lang of ['en', 'fa']) {
  test(`removing the code restores the total (${lang})`, async ({page}, info) => {
    const fa = lang === 'fa';
    await openSite(page, 'bag', lang);
    const summary = page.locator('main aside');
    const total = summary.locator('.ag-osum__sum--strong dd .ag-price__now');
    const code = page.getByRole('textbox', {name: fa ? 'کد تخفیف' : 'Promo code'});
    // Independent expected amounts for the sample bag and WELCOME10's ten-percent discount.
    const original = fa ? '۸٬۴۵۰٬۰۰۰ تومان' : '8,450,000 Toman';
    const discounted = fa ? '۷٬۶۰۵٬۰۰۰ تومان' : '7,605,000 Toman';
    await expect(total).toHaveCount(1);
    await expect(total).toHaveText(original);
    await page.getByRole('button', {name: fa ? 'کد تخفیف دارید؟' : 'Have a promo code?'}).click();
    await code.fill(fa ? 'WELCOME۱۰' : 'welcome 10');
    await page.getByRole('button', {name: fa ? 'اعمال' : 'Apply', exact: true}).click();
    await expect(summary).toContainText(fa ? 'تخفیف · WELCOME10' : 'Discount · WELCOME10');
    await expect(total).toHaveText(discounted);
    await page.getByRole('button', {name: fa ? 'حذف کد' : 'Remove code', exact: true}).click();
    await expect(summary).not.toContainText('WELCOME10');
    await expect(total).toHaveText(original);
    await expect(code).toBeFocused();
    await info.attach('promo-total-restoration', {
      body: JSON.stringify(
        {lang, original, discounted, restored: await total.innerText()},
        null,
        2
      ),
      contentType: 'application/json'
    });
  });
}

test('the delivery pin is required and travels with the order', async ({page}) => {
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  await fillSender(page);
  await chooseDeliveryTime(page);
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
    () => JSON.parse(sessionStorage.getItem('vendra-template:/') || '{}').delivery?.location
  );
  expect(location).toEqual({lat: expect.any(Number), lng: expect.any(Number)});
});

test('without a map, a full typed address is enough', async ({page}) => {
  await page.addInitScript(() => {
    // Fail Leaflet module initialization without depending on a generated chunk filename.
    Object.defineProperty(window, 'L', {
      configurable: true,
      set() {
        throw new Error('Leaflet failed to load');
      }
    });
  });
  await openSite(page, 'bag', 'fa', {step: 'delivery'});
  await expect(page.locator('#vf-map')).toHaveCount(0);
  await expect(page.locator('main')).toContainText('نقشه بارگذاری نشد');
  // Without the pin, the zone is chosen from the list; zones that deliver free say so.
  await expect(page.locator('#vf-zone')).toContainText('مرکز کرج، رایگان');
  await fillSender(page);
  await page.fill('#vf-name', 'شیرین احمدی');
  await page.fill('#vf-phone', '09121234567');
  await page.fill('#vf-address', 'کرج، عظیمیه، خیابان گلستان، پلاک ۱۲');
  await chooseDeliveryTime(page);
  await page.getByRole('button', {name: 'ادامه و پرداخت'}).locator('visible=true').first().click();
  await expect(page.locator('#vf-last4')).toBeVisible();
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
  await chooseDeliveryTime(page);
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

test('a guest sees no saved addresses in the bag', async ({page}) => {
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  await expect(page.getByRole('group', {name: 'Send to a saved address'})).toHaveCount(0);
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
