import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

test('a delivered order shows the delivery photo', async ({page}) => {
  // The sample customer sent these orders, so their links open without a lookup.
  await page.addInitScript(() => localStorage.setItem('vf-account-phone', '09125649438'));
  await openSite(page, 'track', 'fa', {id: 'VN-10431'});
  const photo = page.locator('figure.vf-track-photo');
  await expect(photo.getByRole('img', {name: 'گل‌ها دمِ در، عکسِ لحظه تحویل'})).toBeVisible();
  await expect(photo).toContainText('پیک این عکس را هنگام تحویل دمِ در گرفته است.');
  await openSite(page, 'track', 'fa', {id: 'VN-10522'});
  await expect(page.locator('figure.vf-track-photo')).toHaveCount(0);
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
  await expect(page).toHaveURL(/\/track\/VN-10522\//);
  await expect(page.locator('main h1')).toHaveText('On its way.');
  // The new view moves focus to its heading first; wait so that doesn't race the next click.
  await expect(page.locator('main h1')).toBeFocused();
  await page.getByRole('button', {name: 'Track another order'}).click();
  await expect(page.locator('#vf-lookup-id')).toBeFocused();
  // It keeps focus once the heading has changed too.
  await page.waitForTimeout(300);
  await expect(page.locator('#vf-lookup-id')).toBeFocused();
});

test('a link to an order the visitor has not verified opens the lookup', async ({page}) => {
  await openSite(page, 'track', 'en', {id: 'VN-10431'});
  await expect(page.locator('main h1')).toHaveText('Track an order.');
  await expect(page.locator('#vf-lookup-id')).toHaveValue('VN-10431');
  await expect(page.locator('main')).not.toContainText('Mina Karimi');
  await expect(page.locator('main')).not.toContainText('•••• ');
  await expect(page.locator('.vf-track-summary')).toHaveCount(0);
});

test('a gift’s recipient sees its progress but not what it cost or what the card says', async ({
  page
}) => {
  await openSite(page, 'track', 'en', {id: 'VN-10522'});
  await page.fill('#vf-lookup-phone', '09121230000');
  await page.getByRole('button', {name: 'Find my order'}).click();
  await expect(page).toHaveURL(/\/track\/VN-10522\//);
  await expect(page.locator('main h1')).toHaveText('On its way.');
  const main = page.locator('main');
  await expect(main.getByRole('list', {name: 'Order progress'})).toBeVisible();
  await expect(main).toContainText('Mina Karimi');
  await expect(main).toContainText('There’s a card with your flowers.');
  await expect(main).not.toContainText('Happy birthday, Shirin.');
  await expect(main.locator('dt').filter({hasText: /^Payment$/})).toHaveCount(0);
  await expect(main).not.toContainText('••••');
  await expect(main).not.toContainText('Total');
  await expect(page.locator('.vf-track-summary')).toHaveCount(0);
  await expect(main.getByRole('button', {name: 'Order again'})).toHaveCount(0);
  await expect(main.getByRole('link', {name: 'Ask about this order'})).toBeVisible();
  expect(await scanAxe(page)).toEqual([]);
  // The verified lookup lasts for the visit, still as the recipient.
  await page.reload();
  await expect(page.locator('main h1')).toHaveText('On its way.');
  await expect(page.locator('.vf-track-summary')).toHaveCount(0);
  // The sender's mobile opens the whole order.
  await page.getByRole('button', {name: 'Track another order'}).click();
  await page.fill('#vf-lookup-id', 'VN-10522');
  await page.fill('#vf-lookup-phone', '09125649438');
  await page.getByRole('button', {name: 'Find my order'}).click();
  await expect(page.locator('.vf-track-summary')).toContainText('Total');
  await expect(main).toContainText('Happy birthday, Shirin.');
  await expect(main).toContainText('Card to card · ••••');
  await expect(main.getByRole('button', {name: 'Order again'})).toBeVisible();
});

test('a signed-in recipient sees the whole order after a lookup with the sender’s mobile', async ({
  page
}) => {
  await page.addInitScript(() => localStorage.setItem('vf-account-phone', '09121230000'));
  await openSite(page, 'track', 'en', {id: 'VN-10522'});
  await expect(page.locator('main h1')).toHaveText('On its way.');
  await expect(page.locator('.vf-track-summary')).toHaveCount(0);
  await page.getByRole('button', {name: 'Track another order'}).click();
  await page.fill('#vf-lookup-id', 'VN-10522');
  await page.fill('#vf-lookup-phone', '09125649438');
  await page.getByRole('button', {name: 'Find my order'}).click();
  await expect(page.locator('.vf-track-summary')).toContainText('Total');
  await expect(page.locator('main')).toContainText('Happy birthday, Shirin.');
});

test('the standalone track page shows its whole sample order', async ({page}) => {
  await page.goto('/apps/storefront/app/?page=track&lang=en');
  await expect(page.locator('.vf-track-summary')).toContainText('Total');
  await expect(page.locator('main').getByRole('link', {name: 'Order again'})).toBeVisible();
});

// The storefront shows its own field errors, so its forms turn the browser's popups off.
test('forms leave validation to the storefront', async ({page}) => {
  await openSite(page, 'track', 'en');
  await expect(page.locator('form')).not.toHaveCount(0);
  await expect(page.locator('form:not([novalidate])')).toHaveCount(0);
});
