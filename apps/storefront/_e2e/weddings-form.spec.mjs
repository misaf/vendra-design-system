import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';
import {vfCopy} from '../storefront-weddings/copy.js';

for (const lang of ['en', 'fa']) {
  test(`weddings form preserves every field through failed retry and edit (${lang})`, async ({
    page
  }) => {
    const copy = vfCopy({lang});
    await openSite(page, 'weddings', lang);
    const name = page.locator('#vf-wname');
    const phone = page.locator('#vf-wphone');
    const email = page.getByRole('textbox', {name: copy.emailLabel, exact: true});
    const guests = page.getByRole('textbox', {name: copy.guests, exact: true});
    const notes = page.locator('#vf-wmsg');
    const send = page.getByRole('button', {name: copy.send, exact: true});
    await send.click();
    await expect(page.locator('#vf-wedding-errors')).toBeFocused();
    await page.locator('#vf-wedding-errors').getByRole('link').first().click();
    await expect(name).toBeFocused();
    await name.fill('Shirin');
    await phone.fill('09120000000');
    await email.fill('shirin@example.com');
    await guests.fill('120');
    await notes.fill('White flowers, garden venue.');
    for (const [id, value] of [
      ['vf-wtype', copy.types[1]],
      ['vf-wbudget', copy.budgets[1]]
    ]) {
      await page.locator('#' + id).click();
      await page.getByRole('option', {name: value, exact: true}).click();
    }
    await page
      .getByRole('button', {name: lang === 'fa' ? /^انتخاب از تقویم/ : /^Choose a date/})
      .click();
    await expect(page.getByRole('grid')).toBeVisible();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(page.getByRole('grid')).toBeHidden();
    const date = await page.evaluate(() => {
      const now = new Date();
      const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
      return `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
    });
    const dateSegments = await page.locator('.ag-date__input').textContent();
    // Hold both requests locally; this never sends an inquiry to the studio.
    await page.evaluate(() => {
      window.__weddingRequests = [];
      window.VF_API = {
        ...window.VF_API,
        live: true,
        inquiry: payload => {
          window.__weddingRequests.push(payload);
          return new Promise((resolve, reject) => {
            window.__weddingResolve = resolve;
            window.__weddingReject = reject;
          });
        }
      };
    });
    await send.press('Enter');
    await expect(send).toBeDisabled();
    await expect(send).toHaveClass(/ag-btn--loading/);
    await send.evaluate(e => e.click());
    expect(await page.evaluate(() => window.__weddingRequests)).toEqual([
      {
        name: 'Shirin',
        phone: '09120000000',
        email: 'shirin@example.com',
        message: [copy.types[1], date, copy.budgets[1], '120', 'White flowers, garden venue.'].join(
          ' · '
        ),
        occasion: 'weddings',
        preferredLocale: lang
      }
    ]);
    await page.evaluate(() => window.__weddingReject(new Error('Local test failure')));
    await expect(send).toBeEnabled();
    await expect(page.getByRole('alert').filter({hasText: copy.integrationError})).toBeVisible();
    await expect(notes).toHaveValue('White flowers, garden venue.');
    await send.click();
    await expect(send).toBeDisabled();
    await page.evaluate(() => window.__weddingResolve({}));
    await expect(page.locator('#vf-weddings-success')).toBeFocused();
    await expect(notes).toHaveCount(0);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('button', {name: copy.labels.returnToForm, exact: true}).click();
    await expect(name).toBeFocused();
    await expect(name).toHaveValue('Shirin');
    await expect(phone).toHaveValue('09120000000');
    await expect(email).toHaveValue('shirin@example.com');
    await expect(guests).toHaveValue('120');
    expect(await page.locator('.ag-date__input').textContent()).toBe(dateSegments);
    await expect(notes).toHaveValue('White flowers, garden venue.');
    await expect(page.locator('#vf-wtype')).toContainText(copy.types[1]);
    await expect(page.locator('#vf-wbudget')).toContainText(copy.budgets[1]);
    const requests = await page.evaluate(() => window.__weddingRequests);
    expect(requests).toHaveLength(2);
    expect(requests[1]).toEqual(requests[0]);
    await page.evaluate(() => window.scrollTo({top: 0, behavior: 'instant'}));
    expect(await scanAxe(page)).toEqual([]);
  });
}
