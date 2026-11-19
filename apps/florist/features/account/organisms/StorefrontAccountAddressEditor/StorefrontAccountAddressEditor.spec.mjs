import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe, stubMapTiles} from '../../../../e2e/component-test.mjs';

test.beforeEach(({page}) => stubMapTiles(page));

const copy = {
  en: {
    title: 'Edit address',
    label: 'Address label',
    zone: 'Delivery zone',
    tehran: 'Tehran',
    pin: 'Address pin',
    pinned: 'Address pinned',
    locate: 'Use my location',
    locateError: 'Your location is unavailable',
    fail: 'Simulate map load failure',
    failed: 'The map is unavailable. Enter the full address.',
    address: 'Full address',
    addressError: 'Enter the full address',
    recipient: 'Recipient',
    phone: 'Recipient phone',
    phoneError: 'Enter a phone number',
    save: 'Save address',
    cancel: 'Cancel'
  },
  fa: {
    title: 'ویرایش نشانی',
    label: 'عنوان نشانی',
    zone: 'محدوده ارسال',
    tehran: 'تهران',
    pin: 'نشان نشانی',
    pinned: 'نشانی انتخاب شد',
    locate: 'استفاده از موقعیت من',
    locateError: 'موقعیت شما در دسترس نیست',
    fail: 'شبیه‌سازی خطای بارگذاری نقشه',
    failed: 'نقشه در دسترس نیست. نشانی کامل را بنویسید.',
    address: 'نشانی کامل',
    addressError: 'نشانی کامل را وارد کنید',
    recipient: 'گیرنده',
    phone: 'تلفن گیرنده',
    phoneError: 'شماره تلفن را وارد کنید',
    save: 'ذخیره نشانی',
    cancel: 'انصراف'
  }
};

for (const lang of ['en', 'fa']) {
  const t = copy[lang];

  test(`${lang}: controlled address fields and zone reach the save callback`, async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontAccountAddressEditor', lang);
    const dialog = page.getByRole('dialog', {name: t.title});
    await dialog.getByRole('textbox', {name: t.label, exact: true}).fill('Home');
    await dialog.getByRole('button', {name: new RegExp(t.zone)}).click();
    await page.getByRole('option', {name: t.tehran, exact: true}).click();
    const address = dialog.getByRole('textbox', {name: t.address, exact: true});
    await expect(address).toHaveAttribute('autocomplete', 'street-address');
    await expect(address).toHaveJSProperty('tagName', 'TEXTAREA');
    await address.fill('12 Rose Street, unit 3');
    const recipient = dialog.getByRole('textbox', {name: t.recipient, exact: true});
    await expect(recipient).toHaveAttribute('autocomplete', 'name');
    await recipient.fill('Mina');
    const phone = dialog.getByRole('textbox', {name: t.phone, exact: true});
    await expect(phone).toHaveAttribute('dir', 'ltr');
    await expect(phone).toHaveAttribute('type', 'tel');
    const number = lang === 'fa' ? '۰۹۱۲ ۱۱۱ ۲۲۳۳' : '0912 111 2233';
    await phone.fill(number);
    await dialog.getByRole('button', {name: t.save, exact: true}).click();
    await expect(dialog).toHaveCount(0);
    await expect(page.locator('[data-test="saved"]')).toHaveText(
      JSON.stringify({
        label: 'Home',
        zone: 'tehran',
        line: '12 Rose Street, unit 3',
        recipient: 'Mina',
        phone: number
      })
    );
  });

  test(`${lang}: address and phone errors link to their fields and block an invalid save`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontAccountAddressEditor', lang);
    const dialog = page.getByRole('dialog', {name: t.title});
    await dialog.getByRole('button', {name: t.save, exact: true}).click();
    await expect(dialog).toBeVisible();
    for (const [label, error, id] of [
      [t.address, t.addressError, 'vf-address-line'],
      [t.phone, t.phoneError, 'vf-address-phone']
    ]) {
      await expect(
        dialog.getByRole('textbox', {name: label, exact: true})
      ).toHaveAccessibleDescription(error);
      await expect(dialog.getByRole('link', {name: error, exact: true})).toHaveAttribute(
        'href',
        '#' + id
      );
      await dialog.getByRole('link', {name: error, exact: true}).click();
      await expect(dialog.getByRole('textbox', {name: label, exact: true})).toBeFocused();
    }
    await dialog.getByRole('textbox', {name: t.address, exact: true}).fill('Rose Street');
    await dialog.getByRole('textbox', {name: t.phone, exact: true}).fill('09121112233');
    await expect(dialog.getByText(t.addressError, {exact: true})).toHaveCount(0);
    await expect(dialog.getByText(t.phoneError, {exact: true})).toHaveCount(0);
    await expect(page.locator('[data-test="saved"]')).toBeEmpty();
  });

  test(`${lang}: keyboard pin and geolocation errors reach their callbacks`, async ({page}) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'geolocation', {
        value: {getCurrentPosition: (_success, error) => error({code: 1})},
        configurable: true
      });
    });
    await openStorefrontComponent(page, 'StorefrontAccountAddressEditor', lang);
    const map = page.getByRole('region', {name: t.pin, exact: true});
    await expect(page.locator('#vf-address-map.leaflet-container')).toBeVisible();
    await expect(map).toHaveAttribute('dir', 'ltr');
    await map.focus();
    await page.keyboard.press('ArrowUp');
    await expect(page.locator('[data-test="location"]')).toHaveText(/^35\.\d{4},50\.\d{4}$/);
    await expect(map).toHaveAccessibleDescription(t.pinned);
    await page.getByRole('button', {name: t.locate, exact: true}).click();
    await expect(map).toHaveAccessibleDescription(t.locateError);
  });

  test(`${lang}: failed map shows the fallback and preserves editable fields; both states pass axe`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontAccountAddressEditor', lang);
    await expect(page.locator('#vf-address-map.leaflet-container')).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('textbox', {name: t.address, exact: true}).fill('Rose Street');
    await page.getByRole('button', {name: t.fail, exact: true}).click();
    await expect(page.getByRole('region', {name: t.pin, exact: true})).toHaveCount(0);
    await expect(page.getByText(t.failed, {exact: true})).toBeVisible();
    await expect(page.getByRole('textbox', {name: t.address, exact: true})).toHaveValue(
      'Rose Street'
    );
    await page.getByRole('button', {name: new RegExp(t.zone)}).click();
    await page.getByRole('option', {name: t.tehran, exact: true}).click();
    await expect(page.getByRole('button', {name: new RegExp(t.zone)})).toContainText(t.tehran);
    expect(await scanAxe(page)).toEqual([]);
  });

  test(`${lang}: cancel closes an edited draft without saving`, async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontAccountAddressEditor', lang);
    await page.getByRole('textbox', {name: t.label, exact: true}).fill('Unsaved label');
    await page.getByRole('button', {name: t.cancel, exact: true}).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.locator('[data-test="saved"]')).toBeEmpty();
  });
}
