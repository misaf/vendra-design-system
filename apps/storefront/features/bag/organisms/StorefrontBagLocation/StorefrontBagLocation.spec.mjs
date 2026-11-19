import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe, stubMapTiles} from '../../../../e2e/component-test.mjs';

test.beforeEach(({page}) => stubMapTiles(page));

const copy = {
  en: {
    pin: 'Delivery pin',
    pinned: 'Address pinned',
    address: 'Full address',
    addressError: 'Enter the full address',
    locate: 'Use my location',
    locateError: 'Your location is unavailable',
    fail: 'Simulate map load failure',
    failed: 'The map is unavailable. Choose your delivery zone.',
    zone: 'Delivery zone',
    karaj: 'Karaj',
    tehran: 'Tehran'
  },
  fa: {
    pin: 'نشان نشانی',
    pinned: 'نشانی انتخاب شد',
    address: 'نشانی کامل',
    addressError: 'نشانی کامل را وارد کنید',
    locate: 'استفاده از موقعیت من',
    locateError: 'موقعیت شما در دسترس نیست',
    fail: 'شبیه‌سازی خطای بارگذاری نقشه',
    failed: 'نقشه در دسترس نیست. محدوده ارسال را انتخاب کنید.',
    zone: 'محدوده ارسال',
    karaj: 'کرج',
    tehran: 'تهران'
  }
};

for (const lang of ['en', 'fa']) {
  const t = copy[lang];

  test(`${lang}: map readiness and keyboard pin changes reach their callbacks`, async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontBagLocation', lang);
    await expect(page.locator('[data-test="map-ready"]')).toHaveText('true');
    const map = page.getByRole('region', {name: t.pin});
    await expect(map).toHaveAttribute('dir', 'ltr');
    await map.focus();
    await page.keyboard.press('ArrowUp');
    await expect(page.locator('[data-test="location"]')).toHaveText(/^35\.\d{4},50\.\d{4}$/);
    await expect(map).toHaveAccessibleDescription(t.pinned);
    await expect(page.getByRole('status')).toContainText(t.karaj);
  });

  test(`${lang}: address is required, controlled and clears its error`, async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontBagLocation', lang);
    const address = page.getByRole('textbox', {name: t.address});
    await expect(address).toHaveAttribute('required', '');
    await expect(address).toHaveAttribute('aria-invalid', 'true');
    await expect(address).toHaveAccessibleDescription(t.addressError);
    await address.fill('12 Rose Street, unit 3');
    await expect(address).toHaveValue('12 Rose Street, unit 3');
    await expect(page.locator('[data-test="address"]')).toHaveText('12 Rose Street, unit 3');
    await expect(page.getByText(t.addressError, {exact: true})).toHaveCount(0);
  });

  test(`${lang}: geolocation denial reaches the error callback`, async ({page}) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'geolocation', {
        value: {getCurrentPosition: (_success, error) => error({code: 1})},
        configurable: true
      });
    });
    await openStorefrontComponent(page, 'StorefrontBagLocation', lang);
    await expect(page.locator('[data-test="map-ready"]')).toHaveText('true');
    await page.getByRole('button', {name: t.locate, exact: true}).click();
    await expect(page.getByText(t.locateError, {exact: true})).toBeVisible();
  });

  test(`${lang}: map and failure fallback pass axe; fallback zone is controlled`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontBagLocation', lang);
    await expect(page.locator('[data-test="map-ready"]')).toHaveText('true');
    await expect(page.getByRole('button', {name: t.zone})).toHaveCount(0);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('button', {name: t.fail, exact: true}).click();
    await expect(page.getByRole('region', {name: t.pin})).toHaveCount(0);
    await expect(page.getByText(t.failed, {exact: true})).toBeVisible();
    const zone = page.getByRole('button', {name: new RegExp(t.zone)});
    await zone.click();
    await page.getByRole('option', {name: t.tehran, exact: true}).click();
    await expect(zone).toContainText(t.tehran);
    await expect(page.locator('[data-test="zone"]')).toHaveText('tehran');
    expect(await scanAxe(page)).toEqual([]);
  });
}
