import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../../e2e/component-test.mjs';

const copy = {
  en: {
    progress: 'Checkout progress',
    current: 'Payment',
    compact: '3 / 3 · Payment',
    amount: '2,400,000 toman',
    failed: 'Show failed payment',
    cancelled: 'Show cancelled payment',
    pending: 'Show pending payment',
    verifying: 'Show verification',
    paid: 'Show paid payment',
    redirecting: 'Show bank redirect',
    failedTitle: 'The payment didn’t go through',
    cancelledTitle: 'Payment cancelled',
    pendingTitle: 'Your payment isn’t confirmed yet',
    verifyingTitle: 'Checking your payment',
    paidTitle: 'Payment received',
    redirectTitle: 'Taking you to the bank',
    retry: 'Pay again',
    other: 'Choose another method',
    check: 'Check again',
    support: 'Call us'
  },
  fa: {
    progress: 'مراحل پرداخت',
    current: 'پرداخت',
    compact: '۳ / ۳ · پرداخت',
    amount: '۲٬۴۰۰٬۰۰۰ تومان',
    failed: 'نمایش پرداخت ناموفق',
    cancelled: 'نمایش پرداخت لغوشده',
    pending: 'نمایش پرداخت در انتظار',
    verifying: 'نمایش بررسی پرداخت',
    paid: 'نمایش پرداخت موفق',
    redirecting: 'نمایش انتقال به بانک',
    failedTitle: 'پرداخت انجام نشد',
    cancelledTitle: 'پرداخت لغو شد',
    pendingTitle: 'پرداخت شما هنوز تأیید نشده',
    verifyingTitle: 'در حال بررسی پرداخت',
    paidTitle: 'پرداخت انجام شد',
    redirectTitle: 'در حال انتقال به درگاه بانک',
    retry: 'پرداخت دوباره',
    other: 'انتخاب روش دیگر',
    check: 'بررسی دوباره',
    support: 'تماس با ما'
  }
};

for (const lang of ['en', 'fa']) {
  const t = copy[lang];

  test(`${lang}: progress/details and failed/cancelled recovery actions use supplied descriptors`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontCheckoutBank', lang);
    const progress = page.getByRole('list', {name: t.progress, exact: true});
    await expect(progress.getByRole('listitem')).toHaveCount(3);
    await expect(progress.locator('[aria-current="step"]')).toContainText(t.current);
    await expect(progress.getByRole('button')).toHaveCount(0);
    const status = page.locator('.ag-payment-status');
    await expect(status.getByRole('heading', {level: 1})).toHaveText(t.failedTitle);
    await expect(status.locator('dl')).toContainText(t.amount);
    await expect(status.locator('dl')).toContainText('VN-10522');
    await expect(status.locator('dl')).toContainText('123456789012');
    await expect(status.getByRole('link', {name: t.support, exact: true})).toHaveAttribute(
      'href',
      'tel:+15551234567'
    );
    await status.getByRole('button', {name: t.other, exact: true}).click();
    await expect(page.locator('[data-test="action"]')).toHaveText('other');
    await page.getByRole('button', {name: t.cancelled, exact: true}).click();
    await expect(status.getByRole('heading', {level: 1})).toHaveText(t.cancelledTitle);
    await status.getByRole('button', {name: t.retry, exact: true}).click();
    await expect(page.locator('[data-test="action"]')).toHaveText('retry');
    const heading = status.getByRole('heading', {level: 1});
    await expect(heading).toHaveText(t.verifyingTitle);
    await expect(heading).toBeFocused();
    await expect(status).toHaveAttribute('aria-busy', 'true');
    await expect(status.getByRole('button', {name: t.retry, exact: true})).toHaveCount(0);
  });

  test(`${lang}: pending check-again reaches its callback and paid result without retry actions`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontCheckoutBank', lang);
    await page.getByRole('button', {name: t.pending, exact: true}).click();
    const status = page.locator('.ag-payment-status');
    await expect(status.getByRole('heading', {level: 1})).toHaveText(t.pendingTitle);
    await expect(status.getByRole('button', {name: t.retry, exact: true})).toHaveCount(0);
    await status.getByRole('button', {name: t.check, exact: true}).click();
    await expect(page.locator('[data-test="action"]')).toHaveText('check');
    await expect(status.getByRole('heading', {level: 1})).toHaveText(t.paidTitle);
    await expect(status.getByRole('heading', {level: 1})).toBeFocused();
    await expect(status).not.toHaveAttribute('aria-busy');
    await expect(status.getByRole('button')).toHaveCount(0);
    await expect(status.getByRole('link')).toHaveCount(0);
  });

  test(`${lang}: redirect descriptor posts only to a local stub with the supplied fields`, async ({
    page
  }) => {
    await page.clock.install({time: new Date('2026-11-17T08:00:00+03:30')});
    await page.clock.pauseAt(new Date('2026-11-17T08:00:01+03:30'));
    const requests = [];
    await page.route('**/__fixture-bank', async route => {
      requests.push({method: route.request().method(), data: route.request().postData()});
      await route.fulfill({
        contentType: 'text/html',
        body: '<title>Fixture bank</title><h1>Fixture bank</h1>'
      });
    });
    await openStorefrontComponent(page, 'StorefrontCheckoutBank', lang);
    await page.getByRole('button', {name: t.redirecting, exact: true}).click();
    const status = page.locator('.ag-payment-status');
    await expect(status.getByRole('heading', {level: 1})).toHaveText(t.redirectTitle);
    await expect(status).toContainText('Fixture Bank');
    await expect(status.locator('form')).toHaveAttribute('action', '/__fixture-bank');
    await expect(status.locator('form')).toHaveAttribute('method', 'post');
    await expect(status.locator('input[name="Token"]')).toHaveValue('fixture-token');
    await page.clock.runFor(1600);
    await expect(page).toHaveURL(/\/__fixture-bank$/);
    expect(requests).toHaveLength(1);
    expect(requests[0].method).toBe('POST');
    expect(new URLSearchParams(requests[0].data).get('Token')).toBe('fixture-token');
    expect(new URLSearchParams(requests[0].data).get('Amount')).toBe('24000000');
  });

  test(`${lang}: failed, cancelled and pending states pass axe`, async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontCheckoutBank', lang);
    expect(await scanAxe(page)).toEqual([]);
    for (const [button, heading] of [
      [t.cancelled, t.cancelledTitle],
      [t.pending, t.pendingTitle]
    ]) {
      await page.getByRole('button', {name: button, exact: true}).click();
      await expect(page.getByRole('heading', {level: 1})).toHaveText(heading);
      expect(await scanAxe(page)).toEqual([]);
    }
  });

  test(`${lang}: verifying and paid states pass axe and compact progress uses the supplied formatters`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontCheckoutBank', lang);
    for (const [button, heading] of [
      [t.verifying, t.verifyingTitle],
      [t.paid, t.paidTitle]
    ]) {
      await page.getByRole('button', {name: button, exact: true}).click();
      await expect(page.getByRole('heading', {level: 1})).toHaveText(heading);
      expect(await scanAxe(page)).toEqual([]);
    }
    await page.setViewportSize({width: 390, height: 844});
    await expect(page.getByRole('list', {name: t.progress, exact: true})).toHaveCount(1);
    await expect(page.getByText(t.compact, {exact: true})).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
  });
}
