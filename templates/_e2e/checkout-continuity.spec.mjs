import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

const MORNING = new Date('2026-10-05T09:00:00+03:30');
async function fillDelivery(page) {
  await page.locator('#vf-name').fill('Test Recipient');
  await page.locator('#vf-phone').fill('09120000000');
  const map = page.locator('#vf-map.leaflet-container');
  await expect(map).toBeVisible();
  await map.click({position: {x: 120, y: 100}});
  await expect(page.locator('#vf-map-status')).toHaveText(/[0-9۰-۹]{2}[.٫][0-9۰-۹]/);
  await page.locator('#vf-address').fill('Test street 12, unit 3');
  await page.locator('#vf-sender').fill('Test Sender');
  await page.locator('#vf-sender-phone').fill('09121111111');
}
async function next(page, fa) {
  await page
    .getByRole('button', {name: fa ? 'ادامه و پرداخت' : 'Continue to payment', exact: true})
    .filter({visible: true})
    .click();
}
for (const lang of ['en', 'fa']) {
  const fa = lang === 'fa';
  test(`mixed bags offer dates that work for every item (${lang})`, async ({page}) => {
    await page.clock.install({time: MORNING});
    await openSite(page, 'bag', lang, {step: 'delivery'});
    const days = page.getByRole('radiogroup', {name: fa ? 'روز ارسال' : 'Delivery day'});
    await expect(days.getByRole('radio', {name: fa ? /^امروز/ : /^Today/})).toHaveCount(0);
    await expect(days.getByRole('radio', {name: fa ? /^فردا/ : /^Tomorrow/})).toBeChecked();
    await expect(
      page.getByText(fa ? /بعضی کالاها به آماده‌سازی/ : /Some items need preparation/)
    ).toBeVisible();
    await page.evaluate(() => {
      const site = window.__vfSite;
      site.setState({bag: [site.state.bag[0]]});
    });
    await expect(days.getByRole('radio', {name: fa ? /^امروز/ : /^Today/})).toBeChecked();
  });

  test(`payment details survive delivery edits and reload (${lang})`, async ({page}, info) => {
    await page.clock.install({time: MORNING});
    await openSite(page, 'bag', lang, {step: 'delivery'});
    await fillDelivery(page);
    await next(page, fa);
    await page.locator('#vf-last4').fill('1234');
    await page.locator('#vf-ref').fill('567890');
    await page
      .getByRole('link', {name: fa ? 'ویرایش اطلاعات ارسال' : 'Edit delivery details', exact: true})
      .click();
    await page.locator('#vf-address').fill('Test street 24, unit 5');
    await next(page, fa);
    await expect(page.locator('#vf-last4')).toHaveValue('1234');
    await expect(page.locator('#vf-ref')).toHaveValue('567890');
    await page.reload();
    await expect(page.locator('#vf-last4')).toHaveValue('1234');
    await expect(page.locator('#vf-ref')).toHaveValue('567890');
    await expect(page.getByRole('contentinfo')).toContainText(
      fa ? 'ایران، استان البرز، کرج، عظیمیه' : 'Azimiyeh, Karaj, Alborz'
    );
    const whatsapp = page.getByRole('radio', {
      name: fa ? 'تأیید در واتس‌اپ' : 'Confirm on WhatsApp',
      exact: true
    });
    await whatsapp.press('Space');
    await page
      .getByRole('link', {name: fa ? 'ویرایش اطلاعات ارسال' : 'Edit delivery details', exact: true})
      .click();
    await next(page, fa);
    await expect(whatsapp).toBeChecked();
    expect(await scanAxe(page)).toEqual([]);
    await page.screenshot({
      path: `/tmp/vendra-payment-continuity-${lang}-${info.project.name}.png`,
      fullPage: true
    });
  });

  test(`a shop delivery date follows the product into the bag (${lang})`, async ({page}) => {
    await page.clock.install({time: MORNING});
    await openSite(page, 'shop', lang, {date: '2026-10-06'});
    const product = page.locator('main a[href*="view=product"][href*="id=VF-7K2M4Q"]').first();
    await expect(product).toHaveAttribute('href', /date=2026-10-06/);
    await product.click();
    await expect(page).toHaveURL(/date=2026-10-06/);
    await page
      .getByRole('button', {name: fa ? 'افزودن به سبد' : 'Add to bag', exact: true})
      .filter({visible: true})
      .click();
    await page.getByRole('dialog').getByRole('link').click();
    expect(await page.evaluate(() => window.__vfSite.state.delivery.date)).toBe('2026-10-06');
    await page
      .getByRole('button', {
        name: fa ? 'ادامه و ارسال' : 'Continue to delivery',
        exact: true
      })
      .filter({visible: true})
      .click();
    await expect(
      page
        .getByRole('radiogroup', {name: fa ? 'روز ارسال' : 'Delivery day'})
        .getByRole('radio', {name: fa ? /^فردا/ : /^Tomorrow/})
    ).toBeChecked();
  });

  test(`delivery pricing waits for a destination and adding a card can be undone (${lang})`, async ({
    page
  }, info) => {
    await page.clock.install({time: MORNING});
    await openSite(page, 'bag', lang, {step: 'delivery'});
    const sums = page.locator('.vf-bag-summary .ag-osum__sums');
    await expect(sums).toContainText(
      fa ? 'پس از تعیین نشانی محاسبه می‌شود' : 'Calculated after address'
    );
    await expect(sums).toContainText(fa ? 'جمع پیش از ارسال' : 'Total before delivery');
    await fillDelivery(page);
    await expect(page.locator('main')).not.toContainText(
      fa ? 'ارسال همان روز تا' : 'Same day before'
    );
    await expect(sums).not.toContainText(
      fa ? 'پس از تعیین نشانی محاسبه می‌شود' : 'Calculated after address'
    );
    const before = await page.evaluate(() => window.__vfSite.state.bag);
    const add = page.locator('button[id^="vf-add-card-"]').first();
    const addId = await add.getAttribute('id');
    const beforeTotal = await sums.textContent();
    await add.click();
    await expect(sums).not.toHaveText(beforeTotal);
    const undo = page.getByRole('button', {
      name: fa ? /بازگردانی افزودن کارت/ : /Undo adding a card/
    });
    await expect(undo).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
    await page.screenshot({
      path: `/tmp/vendra-card-undo-${lang}-${info.project.name}.png`,
      fullPage: true
    });
    await undo.click();
    await expect(page.locator(`[id="${addId}"]`)).toBeFocused();
    expect(await page.evaluate(() => window.__vfSite.state.bag)).toEqual(before);
    await expect(sums).toHaveText(beforeTotal);
  });
}
