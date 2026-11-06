import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

for (const lang of ['en', 'fa']) {
  test(`contact pending announcements stay accessible after completion (${lang})`, async ({
    page
  }) => {
    await openSite(page, 'contact', lang);
    await page.locator('#vf-cname').fill('Shirin');
    await page.locator('#vf-cemail').fill('shirin@example.com');
    await page.locator('#vf-cmsg').fill('Please deliver tomorrow.');
    // This stub holds the request locally; it never contacts the studio.
    await page.evaluate(() => {
      window.__contactRequests = 0;
      window.VF_API = {
        ...window.VF_API,
        live: true,
        inquiry: () => {
          window.__contactRequests++;
          return new Promise((resolve, reject) => {
            window.__contactResolve = resolve;
            window.__contactReject = reject;
          });
        }
      };
    });
    const send = page.getByRole('button', {name: lang === 'fa' ? 'ارسال' : 'Send', exact: true});
    await send.press(lang === 'fa' ? 'Space' : 'Enter');
    await expect(send).toBeDisabled();
    await expect(send).toHaveClass(/ag-btn--loading/);
    expect(await page.evaluate(() => window.__contactRequests)).toBe(1);
    await page.evaluate(() => window.__contactResolve({}));
    await expect(page.locator('#vf-contact-success')).toBeFocused();
    await expect(send).toHaveCount(0);
    expect(await scanAxe(page)).toEqual([]);
    await page
      .getByRole('button', {name: lang === 'fa' ? 'بازگشت به فرم' : 'Return to form', exact: true})
      .click();
    await expect(page.locator('#vf-cmsg')).toBeFocused();
    await expect(page.locator('#vf-cmsg')).toHaveValue('Please deliver tomorrow.');
    expect(await scanAxe(page)).toEqual([]);
    await send.click();
    await expect(send).toBeDisabled();
    await page.evaluate(() => window.__contactReject(new Error('Test failure')));
    await expect(send).toBeEnabled();
    await expect(page.locator('#vf-cmsg')).toHaveValue('Please deliver tomorrow.');
    expect(await page.evaluate(() => window.__contactRequests)).toBe(2);
    expect(await scanAxe(page)).toEqual([]);
  });
}
