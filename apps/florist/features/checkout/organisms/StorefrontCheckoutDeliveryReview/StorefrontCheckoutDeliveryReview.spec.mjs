import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';

const copy = {
  en: {
    title: 'Delivery details',
    edit: 'Edit delivery',
    recipient: 'Recipient',
    name: 'Mina',
    updatedName: 'Sam',
    address: 'Address',
    line: '12 Rose Street, unit 3',
    updatedLine: '25 Garden Street, building 2, unit 10',
    phone: 'Phone',
    time: 'Delivery time',
    slot: 'Tomorrow, 10:00–13:00',
    update: 'Use updated delivery details'
  },
  fa: {
    title: 'جزئیات ارسال',
    edit: 'ویرایش ارسال',
    recipient: 'گیرنده',
    name: 'مینا',
    updatedName: 'سام',
    address: 'نشانی',
    line: 'خیابان گل، پلاک ۱۲، واحد ۳',
    updatedLine: 'خیابان باغ، پلاک ۲۵، ساختمان ۲، واحد ۱۰',
    phone: 'تلفن',
    time: 'زمان ارسال',
    slot: 'فردا، ۱۰ تا ۱۳',
    update: 'نمایش جزئیات به‌روز ارسال'
  }
};

for (const lang of ['en', 'fa']) {
  const t = copy[lang];

  test(`${lang}: named review and ordered detail rows reflect supplied updates`, async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontCheckoutDeliveryReview', lang);
    const region = page.getByRole('region', {name: t.title, exact: true});
    await expect(region).toHaveAttribute('aria-labelledby', 'vf-delivery-review-title');
    await expect(
      region.getByRole('heading', {level: 2, name: t.title, exact: true})
    ).toHaveAttribute('id', 'vf-delivery-review-title');
    await expect(region.getByRole('term')).toHaveText([t.recipient, t.address, t.phone, t.time]);
    await expect(region.locator('dd')).toHaveText([t.name, t.line, '09121112233', t.slot]);
    await expect(region.locator('bdi')).toHaveAttribute('dir', 'ltr');
    await page.getByRole('button', {name: t.update, exact: true}).click();
    await expect(region.locator('dd')).toHaveText([
      t.updatedName,
      t.updatedLine,
      '09121112233',
      t.slot
    ]);
    await expect(region.getByText(t.name, {exact: true})).toHaveCount(0);
    await expect(region.getByText(t.line, {exact: true})).toHaveCount(0);
  });

  test(`${lang}: edit is a link and pointer/keyboard activation forwards the event/callback`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontCheckoutDeliveryReview', lang);
    const before = page.url();
    const edit = page.getByRole('link', {name: t.edit, exact: true});
    await expect(edit).toHaveAttribute('href', '/__fixture-delivery');
    await edit.click();
    await expect(page.locator('[data-test="action"]')).toHaveText('edit');
    expect(page.url()).toBe(before);
    await openStorefrontComponent(page, 'StorefrontCheckoutDeliveryReview', lang);
    await edit.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-test="action"]')).toHaveText('edit');
    expect(page.url()).toBe(before);
  });

  test(`${lang}: initial/updated and compact review pass axe without overflow`, async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontCheckoutDeliveryReview', lang);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('button', {name: t.update, exact: true}).click();
    expect(await scanAxe(page)).toEqual([]);
    await page.setViewportSize({width: 390, height: 844});
    await expect(page.getByRole('link', {name: t.edit, exact: true})).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      )
    ).toBeLessThanOrEqual(0);
  });
}
