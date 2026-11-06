import {test, expect} from '@playwright/test';
import {openSite, pinDelivery, scanAxe} from './helpers.mjs';

for (const lang of ['en', 'fa']) {
  test(`payment reviews delivery and preserves edits (${lang})`, async ({page}, info) => {
    const fa = lang === 'fa';
    await openSite(page, 'bag', lang, {step: 'delivery'});
    await page.locator('#vf-name').fill('Shirin Ahmadi');
    await page.locator('#vf-phone').fill('09121234567');
    await pinDelivery(page);
    await page.locator('#vf-address').fill('Plaque 12, unit 3');
    await page.locator('#vf-sender').fill('Sara Karimi');
    await page.locator('#vf-sender-phone').fill('09121112233');
    const continueToPayment = () =>
      page
        .getByRole('button', {
          name: fa ? 'ادامه و پرداخت' : 'Continue to payment',
          exact: true
        })
        .locator('visible=true')
        .first()
        .click();
    const review = page.getByRole('region', {name: fa ? 'مرور اطلاعات ارسال' : 'Delivery review'});
    await continueToPayment();
    await expect(review).toBeVisible();
    await expect(review).toContainText('Shirin Ahmadi');
    await expect(review).toContainText('09121234567');
    await expect(review).toContainText('Plaque 12, unit 3');
    const when = await review.locator('dd').last().textContent();
    expect(when).toMatch(fa ? / تا / : /–/);
    const total = await page.locator('.vf-checkout-summary .ag-osum__sums').textContent();
    const edit = review.getByRole('link', {
      name: fa ? 'ویرایش اطلاعات ارسال' : 'Edit delivery details'
    });
    await edit.focus();
    await expect(edit).toBeFocused();
    expect((await edit.boundingBox()).height).toBeGreaterThanOrEqual(44);
    await edit.press('Enter');
    await expect(page.locator('#vf-name')).toHaveValue('Shirin Ahmadi');
    await expect(page.locator('#vf-address')).toHaveValue('Plaque 12, unit 3');
    await page.locator('#vf-name').fill('Mina Ahmadi');
    await page.locator('#vf-address').fill('Plaque 24, unit 5');
    await continueToPayment();
    await expect(review).toContainText('Mina Ahmadi');
    await expect(review).toContainText('Plaque 24, unit 5');
    await expect(review).not.toContainText('Shirin Ahmadi');
    await expect(review.locator('dd').last()).toHaveText(when);
    await expect(page.locator('.vf-checkout-summary .ag-osum__sums')).toHaveText(total);
    await expect(page.locator('.vf-checkout-summary .ag-osum__name').first()).toHaveText(/^VF-/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
    expect(await scanAxe(page)).toEqual([]);
    await page.screenshot({
      path: `/tmp/vendra-delivery-review-${lang}-${info.project.name}.png`,
      fullPage: true
    });
  });
}
