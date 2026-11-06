import {test, expect} from '@playwright/test';
import {openSite} from './helpers.mjs';

// A customer abroad still orders against the florist's Tehran calendar and clock.
test.use({timezoneId: 'America/Los_Angeles'});

for (const {name, instant, todayClosed, closedSlots} of [
  {
    name: 'slot lead times use the store clock for a customer abroad',
    instant: '2026-10-05T14:30:00+03:30',
    todayClosed: false,
    closedSlots: 2
  },
  {
    name: 'same-day cut-offs use the store clock for a customer abroad',
    instant: '2026-10-05T19:00:00+03:30',
    todayClosed: true,
    closedSlots: 0 // The selected day falls forward to tomorrow.
  }
]) {
  test(name, async ({page}) => {
    await page.clock.setFixedTime(new Date(instant));
    await openSite(page, 'bag', 'en', {step: 'delivery'});
    await page.evaluate(() => {
      const site = window.__vfSite;
      site.setState({bag: [site.state.bag[0]]});
    });
    const days = page.getByRole('radiogroup', {name: 'Delivery day'});
    const today = days.getByRole('radio', {name: 'Today', exact: true});
    if (todayClosed) {
      await expect(today).toBeDisabled();
      await expect(days.getByRole('radio', {name: /^Tomorrow/})).toBeChecked();
    } else {
      await expect(today).toBeChecked();
    }
    await expect(
      page.getByRole('radiogroup', {name: 'Time slot'}).getByRole('radio', {disabled: true})
    ).toHaveCount(closedSlots);
  });
}
