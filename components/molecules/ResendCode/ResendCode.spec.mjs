import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

test('waits, then offers a new code and starts the wait again', async ({page}) => {
  await page.clock.install();
  await openComponent(page, 'ResendCode');
  await expect(page.locator('.ag-resend__wait')).toHaveText('You can ask for a new code in 1:30.');
  await expect(page.getByRole('button')).toHaveCount(0);
  await page.clock.runFor(31_000);
  await expect(page.locator('.ag-resend__wait')).toHaveText('You can ask for a new code in 0:59.');
  await page.clock.runFor(60_000);
  // Once, politely: the time left is not announced every second.
  await expect(page.locator('.ag-resend').getByRole('status')).toHaveText(
    'You can ask for a new code now.'
  );
  await page.getByRole('button', {name: 'Send a new code'}).click();
  await expect(page.locator('output[data-test=sent]')).toHaveText('1');
  await expect(page.locator('.ag-resend__wait')).toHaveText('You can ask for a new code in 1:30.');
  await expect(page.locator('.ag-resend').getByRole('status')).toHaveText('');
});

test('keeps time while the tab is in the background', async ({page}) => {
  await page.clock.install();
  await openComponent(page, 'ResendCode');
  await expect(page.locator('.ag-resend__wait')).toBeVisible();
  // No timer fires (as in a throttled background tab) while two minutes pass on the clock.
  const now = await page.evaluate(() => Date.now());
  await page.clock.pauseAt(now + 1000);
  await page.clock.setSystemTime(now + 120_000);
  await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
  await expect(page.getByRole('button', {name: 'Send a new code'})).toBeVisible();
});

test('counts in Persian digits under fa', async ({page}) => {
  await page.clock.install();
  await openComponent(page, 'ResendCode', 'fa');
  await expect(page.locator('.ag-resend__wait')).toHaveText(
    'تا ⁦۱:۳۰⁩ دیگر می‌توانید کد تازه بخواهید.'
  );
  await page.clock.runFor(91_000);
  await expect(page.getByRole('button', {name: 'ارسال کد تازه'})).toBeVisible();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'ResendCode');
});
