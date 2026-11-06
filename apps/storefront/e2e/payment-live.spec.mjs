// A live store (an API base) never takes the simulated bank's word: online payment needs a connected
// gateway, the redirect and order number come from the API's checkout result, and a return from the
// bank is confirmed by asking the API, in whichever tab it lands (apps/storefront/API.md B3, B30).
import {test, expect} from '@playwright/test';
import {openSite, pinDelivery, scanAxe} from './helpers.mjs';

const API = 'https://api.test';
const BANK = 'https://bank.test/pay';
const NUMBER = 'VF-1042';

// Sends the storefront's API calls to the mock `api` ({orderPayment, payAgain}) from the first load.
async function liveStore(page, api) {
  const calls = {checkout: [], orders: [], payments: []};
  await page.route(API + '/**', route => {
    const request = route.request();
    const url = new URL(request.url());
    if (request.method() === 'POST' && url.pathname === '/api/sales/checkout') {
      calls.checkout.push(request.postDataJSON());
      return route.fulfill({
        status: 201,
        json: {
          number: NUMBER,
          itemsAmount: 2_000_000,
          deliveryAmount: 150_000,
          totalAmount: 2_150_000,
          payment: {url: BANK, method: 'POST', fields: {token: 'T-123'}}
        }
      });
    }
    if (request.method() === 'GET' && url.pathname === '/api/sales/orders') {
      calls.orders.push(url.searchParams.get('number'));
      return route.fulfill({json: {member: [{number: NUMBER, ...api.orderPayment}]}});
    }
    if (request.method() === 'POST' && url.pathname === '/api/sales/payments') {
      calls.payments.push(request.postDataJSON());
      return route.fulfill({
        status: 201,
        // A StartPay-style link: the token is in the URL, not in `fields`.
        json: {payment: {url: BANK + '?token=T-124', method: 'GET'}}
      });
    }
    return route.fulfill({json: {}});
  });
  await page.addInitScript(base => {
    let runtime;
    Object.defineProperty(window, '__vfRuntime', {
      configurable: true,
      get: () => runtime,
      set: value => {
        runtime = value;
        const api = value.api;
        api.setBase(base);
      }
    });
  }, API);
  return calls;
}

// A connected gateway (VF_STORE.gateway); the dev server serves the module the app imports.
async function connectGateway(page) {
  await page.evaluate(async () => {
    const {VF_STORE} = await import('/apps/storefront/shared/domain/store-config.js');
    VF_STORE.gateway = {en: 'Test Bank', fa: 'بانک آزمایشی'};
  });
}

async function toPayment(page) {
  await page.fill('#vf-name', 'Shirin Ahmadi');
  await page.fill('#vf-phone', '09121234567');
  await pinDelivery(page);
  await page.fill('#vf-address', 'Plaque 12, unit 3');
  await page.fill('#vf-sender', 'Sara Karimi');
  await page.fill('#vf-sender-phone', '09121112233');
  await page
    .getByRole('button', {name: 'Continue to payment'})
    .locator('visible=true')
    .first()
    .click();
  await expect(page.getByRole('radiogroup').first()).toBeVisible();
}

test.skip(process.env.E2E_TARGET === 'build', 'connects the gateway through the dev server');

test('without a gateway a live store offers neither online payment nor top-ups', async ({page}) => {
  await liveStore(page, {});
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  await toPayment(page);
  await expect(page.getByRole('radio', {name: 'Pay on delivery', exact: true})).toBeVisible();
  await expect(page.getByRole('radio', {name: 'Online card demo'})).toHaveCount(0);
  await openSite(page, 'account', 'en', {tab: 'balance'});
  await expect(page.locator('.vf-account-balance')).toBeVisible();
  await expect(page.locator('#vf-topup-amount')).toHaveCount(0);
});

test('a live payment goes where the API says, and only the API confirms it', async ({page}) => {
  const api = {orderPayment: {paymentStatus: 'awaiting'}};
  const calls = await liveStore(page, api);
  const posted = [];
  // The bank takes the POSTed form and sends the customer back, claiming `result=paid`.
  await page.route(BANK, route => {
    posted.push({method: route.request().method(), body: route.request().postData()});
    const back = new URL('/apps/storefront/app/en/checkout/', page.url());
    back.search = new URLSearchParams({
      payment: 'return',
      order: NUMBER,
      result: 'paid'
    }).toString();
    return route.fulfill({status: 302, headers: {location: back.href}});
  });
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  await connectGateway(page);
  await toPayment(page);
  const online = page.getByRole('radio', {name: 'Online card demo'});
  await expect(async () => {
    await online.check({force: true, timeout: 2_000});
    await expect(online).toBeChecked({timeout: 1_000});
  }).toPass({timeout: 15_000});
  const returned = page.waitForURL(url => url.searchParams.get('payment') === 'return', {
    waitUntil: 'load',
    timeout: 20_000
  });
  await page
    .getByRole('button', {name: 'Continue to the bank'})
    .locator('visible=true')
    .first()
    .click();
  await expect(page.getByRole('heading', {level: 1})).toHaveText('Taking you to the bank');
  await expect(page.locator('main')).toContainText('Test Bank');
  await returned;
  expect(calls.checkout).toHaveLength(1);
  expect(calls.checkout[0].gateway).toBe('online');
  expect(posted).toEqual([{method: 'POST', body: 'token=T-123'}]);
  // The return link says paid; the API says the bank hasn't confirmed it.
  const heading = page.getByRole('heading', {level: 1});
  await expect(heading).toHaveText('Your payment isn’t confirmed yet');
  expect(calls.orders).toEqual([NUMBER]);
  await expect(page.locator('main')).toContainText(NUMBER);
  await expect(page.locator('main')).not.toContainText('Thank you');
  expect(await scanAxe(page)).toEqual([]);
  // Once the API reports it paid, the order is placed under the server's number and reference.
  api.orderPayment = {paymentStatus: 'paid', paymentTrackingCode: '778899001122'};
  await page.getByRole('button', {name: 'Check again'}).click();
  await expect(page.locator('main h1')).toContainText('Thank you');
  await expect(page.locator('main')).toContainText(NUMBER);
  await expect(page.locator('main dl')).toContainText('778899001122');
  await expect(page).not.toHaveURL(/payment=return/);
  expect(calls.orders).toEqual([NUMBER, NUMBER]);
});

test('a return in another tab is confirmed by the API', async ({page}) => {
  const calls = await liveStore(page, {
    orderPayment: {paymentStatus: 'paid', paymentTrackingCode: '778899001122', paidAmount: 2150000}
  });
  await openSite(page, 'checkout', 'en', {payment: 'return', order: NUMBER});
  await expect(page.getByRole('heading', {level: 1})).toHaveText('Payment received');
  const main = page.locator('main');
  await expect(main).toContainText(NUMBER);
  await expect(main).toContainText('778899001122');
  expect(calls.orders).toEqual([NUMBER]);
  expect(await scanAxe(page)).toEqual([]);
});

test('a live payment the bank refused is paid again on the same order', async ({page}) => {
  const calls = await liveStore(page, {orderPayment: {paymentStatus: 'failed'}});
  const bank = [];
  await page.route(BANK + '?**', route => {
    bank.push(route.request().url());
    return route.fulfill({contentType: 'text/html', body: '<title>Bank</title><h1>Bank</h1>'});
  });
  await openSite(page, 'checkout', 'en', {payment: 'return', order: NUMBER, result: 'paid'});
  await expect(page.getByRole('heading', {level: 1})).toHaveText('The payment didn’t go through');
  // Another method would place a second order.
  await expect(page.getByRole('button', {name: 'Choose another method'})).toHaveCount(0);
  await page.getByRole('button', {name: 'Pay again'}).click();
  await expect.poll(() => bank, {timeout: 20_000}).toEqual([BANK + '?token=T-124']);
  expect(calls.payments).toEqual([{orderNumber: NUMBER}]);
  expect(calls.checkout).toEqual([]);
});
