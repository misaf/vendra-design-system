import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../../../e2e/component-test.mjs';

const copy = {
  en: {
    delivery: 'Delivery available tomorrow',
    inquiry: 'Ask about VF-7K2M4Q',
    care: 'Flower care',
    careBody: 'Change the water daily.',
    details: 'Delivery details',
    deliveryBody: 'Choose your delivery window in the bag.',
    custom: 'Keep this design away from direct sun.'
  },
  fa: {
    delivery: 'ارسال از فردا امکان‌پذیر است',
    inquiry: 'پرسش درباره VF-7K2M4Q',
    care: 'نگهداری گل',
    careBody: 'آب را هر روز عوض کنید.',
    details: 'جزئیات ارسال',
    deliveryBody: 'بازه ارسال را در سبد انتخاب کنید.',
    custom: 'این طرح را از نور مستقیم آفتاب دور نگه دارید.'
  }
};
for (const lang of ['en', 'fa']) {
  const t = copy[lang];
  test(`${lang}: supplied delivery and safe inquiry destination persist independently of accordion items`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontProductCare', lang);
    await expect(page.getByText(t.delivery, {exact: true})).toBeVisible();
    const inquiry = page.getByRole('link', {name: t.inquiry, exact: true});
    await expect(inquiry).toHaveAttribute('href', 'https://wa.me/15551234567?text=VF-7K2M4Q');
    await expect(inquiry).toHaveAttribute('target', '_blank');
    await expect(inquiry).toHaveAttribute('rel', 'noopener noreferrer');
    await page.getByLabel('Inquiry', {exact: true}).uncheck();
    await expect(inquiry).toHaveCount(0);
    await expect(page.getByRole('button', {name: t.care, exact: true})).toBeVisible();
    await page.getByLabel('Empty items', {exact: true}).check();
    await expect(page.locator('.ag-acc__item')).toHaveCount(0);
    await expect(page.getByText(t.delivery, {exact: true})).toBeVisible();
    await page.getByLabel('Inquiry', {exact: true}).check();
    await expect(inquiry).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
  });
  test(`${lang}: care starts expanded; supplied replacement content and exclusive keyboard disclosure work`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontProductCare', lang);
    const care = page.getByRole('button', {name: t.care, exact: true});
    const delivery = page.getByRole('button', {name: t.details, exact: true});
    await expect(care).toHaveAttribute('aria-expanded', 'true');
    await expect(delivery).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByRole('region', {name: t.care, exact: true})).toContainText(t.careBody);
    await page.getByLabel('Custom care', {exact: true}).check();
    await expect(page.getByRole('region', {name: t.care, exact: true})).toContainText(t.custom);
    await delivery.focus();
    await page.keyboard.press('Enter');
    await expect(delivery).toHaveAttribute('aria-expanded', 'true');
    await expect(care).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByRole('region', {name: t.details, exact: true})).toContainText(
      t.deliveryBody
    );
    await page.keyboard.press('Space');
    await expect(delivery).toHaveAttribute('aria-expanded', 'false');
    await care.click();
    await expect(care).toHaveAttribute('aria-expanded', 'true');
  });
  test(`${lang}: care, delivery and inquiry-free states pass compact axe and containment`, async ({
    page
  }) => {
    await page.setViewportSize({width: 390, height: 844});
    await openStorefrontComponent(page, 'StorefrontProductCare', lang);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('button', {name: t.details, exact: true}).click();
    expect(await scanAxe(page)).toEqual([]);
    await page.getByLabel('Inquiry', {exact: true}).uncheck();
    expect(await scanAxe(page)).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
  });
}
