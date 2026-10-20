import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

const state = (page, name) => page.locator('[data-state="' + name + '"]');

test('redirecting posts the gateway’s fields to its page with one button', async ({page}) => {
  let posted;
  await page.route('**/bank/pay', async route => {
    posted = route.request().postData();
    await route.fulfill({contentType: 'text/html', body: '<title>Bank</title><h1>Bank</h1>'});
  });
  await openComponent(page, 'PaymentStatus');
  const redirecting = state(page, 'redirecting');
  await expect(redirecting.getByRole('heading', {level: 2})).toHaveText('Taking you to the bank');
  await expect(redirecting).toContainText('Pay on Zarinpal’s page and you’ll come back here.');
  await expect(redirecting.locator('.ag-payment-status')).toHaveAttribute('aria-busy', 'true');
  // While it waits, a status says what is happening.
  await expect(redirecting.getByRole('status')).toHaveText('Taking you to the bank');
  await expect(redirecting.locator('dl')).toContainText('2,400,000 Toman');
  await redirecting.getByRole('button', {name: 'Go to the bank’s page'}).click();
  await expect(page).toHaveURL(/\/bank\/pay$/);
  expect(new URLSearchParams(posted).get('Token')).toBe('abc123');
  expect(new URLSearchParams(posted).get('Amount')).toBe('24000000');
});

test('redirecting goes on its own after the delay, with GET fields in the link', async ({page}) => {
  await page.route('**/bank/start**', route =>
    route.fulfill({contentType: 'text/html', body: '<title>Bank</title>'})
  );
  await page.goto('/templates/_e2e/fixtures/component.html?component=PaymentStatus&lang=en&auto=1');
  await expect(page).toHaveURL(/\/bank\/start\?Authority=A0+123456$/);
});

test('failed and cancelled offer to pay again or choose another method', async ({page}) => {
  await openComponent(page, 'PaymentStatus');
  const failed = state(page, 'failed');
  await expect(failed.getByRole('heading')).toHaveText('The payment didn’t go through');
  await expect(failed).toContainText('the bank returns it within 72 hours');
  await expect(failed.getByRole('button', {name: 'Pay again'})).toBeVisible();
  await expect(failed.getByRole('button', {name: 'Choose another method'})).toBeVisible();
  await expect(failed.getByRole('link', {name: 'Call us'})).toHaveAttribute(
    'href',
    'tel:+989121234567'
  );
});

test('pending says not to pay again, with the bank’s reference and a way to check', async ({
  page
}) => {
  await openComponent(page, 'PaymentStatus');
  const pending = state(page, 'pending');
  await expect(pending.getByRole('heading')).toHaveText('Your payment isn’t confirmed yet');
  await expect(pending).toContainText('Please don’t pay again');
  await expect(pending.locator('dl')).toContainText('Bank reference');
  await expect(pending.locator('dl')).toContainText('123456789012');
  await expect(pending.getByRole('button', {name: 'Check again'})).toBeVisible();
  await expect(pending.getByRole('button', {name: 'Pay again'})).toHaveCount(0);
});

test('when the bank answers, focus moves to the new heading', async ({page}) => {
  await openComponent(page, 'PaymentStatus');
  const live = state(page, 'live');
  // The first status is the page's own; focus stays where it is.
  await expect(live.getByRole('heading')).toHaveText('Checking your payment');
  await expect(live.getByRole('heading')).not.toBeFocused();
  await live.getByRole('button', {name: 'Bank answers pending'}).click();
  await expect(live.getByRole('heading')).toHaveText('Your payment isn’t confirmed yet');
  await expect(live.getByRole('heading')).toBeFocused();
  await live.getByRole('button', {name: 'Check again'}).click();
  await expect(live.getByRole('heading')).toHaveText('Payment received');
  await expect(live.getByRole('heading')).toBeFocused();
  await expect(live.locator('.ag-payment-status')).not.toHaveAttribute('aria-busy');
});

test('speaks Persian, with the 72-hour promise in Persian digits', async ({page}) => {
  await openComponent(page, 'PaymentStatus', 'fa');
  await expect(state(page, 'redirecting').getByRole('heading')).toHaveText(
    'در حال انتقال به درگاه بانک'
  );
  await expect(state(page, 'redirecting')).toContainText('در صفحه Zarinpal');
  await expect(state(page, 'failed')).toContainText('حداکثر تا ۷۲ ساعت');
  await expect(state(page, 'pending').getByRole('button', {name: 'بررسی دوباره'})).toBeVisible();
  await expect(state(page, 'pending').locator('dl')).toContainText('کد پیگیری بانک');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'PaymentStatus');
});
