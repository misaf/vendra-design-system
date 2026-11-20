import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from '../helpers.mjs';

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

test('a guest can sign in from checkout and come back to it', async ({page}) => {
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  await page.locator('.vf-bag-signin').getByRole('link', {name: 'Sign in'}).click();
  await expect(page).toHaveURL(/\/signin\/\?next=delivery/);
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
  // A fresh device has no stored account for this mobile, so it is a first sign-in.
  await expect(page.locator('main h1')).toContainText('signed in.');
  expect(await page.evaluate(() => window.__otpAsked)).toEqual(['sms']);
});

test('signing out leaves the account behind it', async ({page}) => {
  await openSite(page, 'account', 'en');
  await page.getByRole('button', {name: 'Sign out'}).click();
  await expect(page).toHaveURL(/^(?!.*\/account\/)/);
  expect(await page.evaluate(() => localStorage.getItem('vf-account-phone'))).toBeNull();
  // Back to the account, by link or by history, asks the customer to sign in again.
  await page.goBack();
  await expect(page).toHaveURL(/\/signin\//);
  await expect(page.locator('#vf-phone')).toBeVisible();
  await page.goto(page.url().replace('/signin/', '/account/'));
  await expect(page).toHaveURL(/\/signin\//);
  await expect(page.locator('#vf-phone')).toBeVisible();
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
