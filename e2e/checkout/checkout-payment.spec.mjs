import {test, expect} from '@playwright/test';
import {openSite, pinDelivery, scanAxe, chooseDeliveryTime} from '../helpers.mjs';
import {fillSender} from '../delivery-fixtures.mjs';

test('a card-to-card order says its payment is being confirmed, and offers an account', async ({
  page
}) => {
  await openSite(page, 'bag', 'en', {step: 'delivery'});
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
  await page.goto(page.url().replace(/\/track\/.*/, '/signin/'));
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
  await chooseDeliveryTime(page);
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
  await expect(page.locator('.ag-announce, .ag-tabbar')).toHaveCount(0);
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
  await expect(page.locator('.ag-announce, .ag-tabbar')).toHaveCount(0);
  await expect(page.getByRole('banner').getByRole('link', {name: 'Back to bag'})).toBeVisible();
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
  await chooseDeliveryTime(page);
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
  await chooseDeliveryTime(page);
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
  await chooseDeliveryTime(page);
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
