import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

test('keeps digits only, accepts Persian digits and completes once', async ({page}) => {
  await openComponent(page, 'CodeInput');
  const field = page.getByRole('textbox', {name: 'Code'});
  await expect(field).toHaveAttribute('inputmode', 'numeric');
  await expect(field).toHaveAttribute('autocomplete', 'one-time-code');
  await field.pressSequentially('1a2-۳');
  await expect(page.locator('output[data-test=code]')).toHaveText('123');
  await expect(page.locator('output[data-test=completed]')).toHaveText('');
  await field.pressSequentially('۴5');
  await expect(page.locator('output[data-test=code]')).toHaveText('12345');
  await expect(page.locator('output[data-test=completed]')).toHaveText('12345');
  await field.press('End');
  await field.pressSequentially('9');
  await expect(page.locator('output[data-test=code]')).toHaveText('12345');
});

test('fills itself from the SMS where the browser can (Web OTP)', async ({page}) => {
  await page.addInitScript(() => {
    window.OTPCredential = function OTPCredential() {};
    window.__otp = [];
    Object.defineProperty(navigator, 'credentials', {
      value: {
        get: options => {
          window.__otp.push(options);
          return new Promise(resolve => setTimeout(() => resolve({code: '۵۴۳۲۱'}), 200));
        }
      }
    });
  });
  await openComponent(page, 'CodeInput');
  await expect(page.locator('output[data-test=completed]')).toHaveText('54321');
  await expect(page.getByRole('textbox', {name: 'Code'})).toHaveValue('54321');
  const asked = await page.evaluate(() =>
    window.__otp.map(options => [
      options.otp.transport.join(),
      options.signal instanceof AbortSignal
    ])
  );
  // One request per field on screen (React's dev double effect aborts the first).
  expect(asked.at(-1)).toEqual(['sms', true]);
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'CodeInput');
});
