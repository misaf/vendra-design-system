import {test, expect} from '@playwright/test';
import {choiceTile, openSite, pinDelivery} from './helpers.mjs';

// A customer abroad still orders against the florist's Tehran calendar and clock.
test.use({timezoneId: 'America/Los_Angeles'});

async function openSameDayBag(page) {
  await openSite(page, 'bag', 'en', {step: 'delivery'});
  await page.evaluate(() => {
    const site = window.__vfSite;
    site.setState({bag: [site.state.bag[0]]});
  });
}

test('slot lead times use the store clock for a customer abroad', async ({page}) => {
  // 04:00 in Los Angeles, before any slot would close on the customer's clock.
  await page.clock.setFixedTime(new Date('2026-10-05T14:30:00+03:30'));
  await openSameDayBag(page);
  const days = page.getByRole('radiogroup', {name: 'Delivery day'});
  await expect(days.getByRole('radio', {name: 'Today', exact: true})).toBeChecked();
  const slots = page.getByRole('radiogroup', {name: 'Time slot'});
  await expect(slots.getByRole('radio', {name: '08:00–12:00'})).toBeDisabled();
  await expect(slots.getByRole('radio', {name: '12:00–16:00'})).toBeDisabled();
  await expect(slots.getByRole('radio', {name: '16:00–20:00'})).toBeEnabled();
  await expect(slots.getByRole('radio', {name: '20:00–22:00'})).toBeEnabled();
});

test('the product hint and checkout review use the store calendar after cutoff', async ({page}) => {
  // It is still 08:30 in Los Angeles when the store's same-day cutoff has passed.
  // Let time advance from this instant so Leaflet can finish its keyboard pan.
  await page.clock.install({time: new Date('2026-10-05T19:00:00+03:30')});
  await openSite(page, 'product', 'en', {id: 'VF-7K2M4Q'});
  await expect(page.getByRole('region', {name: 'Store news'})).toContainText(
    'Next delivery in Karaj: Tomorrow, 6 October.'
  );

  await openSameDayBag(page);
  const days = page.getByRole('radiogroup', {name: 'Delivery day'});
  await expect(days.getByRole('radio', {name: 'Today', exact: true})).toBeDisabled();
  await expect(days.getByRole('radio', {name: /^Tomorrow/})).toBeChecked();
  const slots = page.getByRole('radiogroup', {name: 'Time slot'});
  await expect(slots.getByRole('radio', {disabled: true})).toHaveCount(0);

  await page.locator('#vf-name').fill('Shirin Ahmadi');
  await page.locator('#vf-phone').fill('09121234567');
  await pinDelivery(page);
  await page.locator('#vf-address').fill('Plaque 12, unit 3');
  await page.locator('#vf-sender').fill('Sara Karimi');
  await page.locator('#vf-sender-phone').fill('09121112233');
  await choiceTile(slots, '08:00–12:00').click();
  await page
    .getByRole('button', {name: 'Continue to payment', exact: true})
    .locator('visible=true')
    .first()
    .click();
  const review = page.getByRole('region', {name: 'Delivery review'});
  await expect(review.getByText('Tue 6 October · 08:00–12:00', {exact: true})).toBeVisible();
});
