import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from '../helpers.mjs';

test('contact shows the studio on a map and needs a way to reply', async ({page}) => {
  await openSite(page, 'contact', 'en');
  const map = page.getByRole('region', {name: 'The studio on the map'});
  await expect(map.locator('.leaflet-tooltip')).toHaveText(['Vendra Florist']);
  // Neshan, Balad and Google Maps; Google Maps first in English.
  const directions = page.getByRole('main').getByRole('list', {name: 'Get directions'});
  await expect(directions.getByRole('link')).toHaveText(['Google Maps', 'Neshan', 'Balad']);
  await expect(directions.getByRole('link', {name: 'Google Maps'})).toHaveAttribute(
    'href',
    /destination=35\.8352,50\.975/
  );
  await expect(directions.getByRole('link', {name: 'Neshan'})).toHaveAttribute(
    'href',
    'https://nshn.ir/?lat=35.8352&lng=50.975'
  );
  await expect(directions.getByRole('link', {name: 'Balad'})).toHaveAttribute(
    'href',
    /^https:\/\/balad\.ir\/location\?latitude=35\.8352&longitude=50\.975/
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
