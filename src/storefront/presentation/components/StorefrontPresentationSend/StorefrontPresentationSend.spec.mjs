import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../e2e/component-test.mjs';

const copy = {
  en: {
    open: 'Share product',
    link: 'Share link only',
    large: 'Share oversized selection',
    title: 'Send this design',
    body: 'Scan to open this design',
    qr: 'Design QR code',
    warning: 'This selection is too large to share',
    whatsapp: 'WhatsApp',
    copy: 'Copy link',
    copied: 'Link copied',
    print: 'Print tag'
  },
  fa: {
    open: 'اشتراک طرح',
    link: 'اشتراک فقط پیوند',
    large: 'اشتراک انتخاب بزرگ',
    title: 'ارسال این طرح',
    body: 'برای دیدن طرح اسکن کنید',
    qr: 'کد تصویری طرح',
    warning: 'این انتخاب برای اشتراک بیش از حد بزرگ است',
    whatsapp: 'واتس‌اپ',
    copy: 'کپی پیوند',
    copied: 'پیوند کپی شد',
    print: 'چاپ برچسب'
  }
};

for (const lang of ['en', 'fa']) {
  const t = copy[lang];
  const open = async (page, name = t.open) => {
    await openStorefrontComponent(page, 'StorefrontPresentationSend', lang);
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await page.getByRole('button', {name, exact: true}).click();
    const dialog = page.getByRole('dialog', {name: t.title});
    await expect(dialog).toBeVisible();
    return dialog;
  };

  test(`${lang}: QR, LTR code and safe WhatsApp link render; copy and print call back`, async ({
    page
  }) => {
    const dialog = await open(page);
    const qr = dialog.getByRole('img', {name: t.qr, exact: true});
    await expect(qr).toBeVisible();
    await expect(qr.locator('path')).toHaveAttribute('d', /.+/);
    await expect(dialog.getByText('VF-7K2M4Q', {exact: true})).toHaveAttribute('dir', 'ltr');
    const whatsapp = dialog.getByRole('link', {name: t.whatsapp, exact: true});
    await expect(whatsapp).toHaveAttribute('href', 'https://wa.me/15551234567?text=fixture');
    await expect(whatsapp).toHaveAttribute('target', '_blank');
    await expect(whatsapp).toHaveAttribute('rel', 'noopener noreferrer');
    await dialog.getByRole('button', {name: t.copy, exact: true}).click();
    await expect(dialog.getByRole('button', {name: t.copied, exact: true})).toBeVisible();
    await dialog.getByRole('button', {name: t.print, exact: true}).click();
    await expect(page.locator('[data-test="prints"]')).toHaveText('1');
  });

  test(`${lang}: absent clipboard, code and tag suppress only their controls`, async ({page}) => {
    const dialog = await open(page, t.link);
    await expect(dialog.getByRole('img', {name: t.qr, exact: true})).toBeVisible();
    await expect(dialog.getByRole('link', {name: t.whatsapp, exact: true})).toBeVisible();
    for (const name of [t.copy, t.print])
      await expect(dialog.getByRole('button', {name, exact: true})).toHaveCount(0);
    await expect(dialog.getByText('VF-7K2M4Q', {exact: true})).toHaveCount(0);
  });

  test(`${lang}: oversized links show a warning and suppress QR/share/copy but retain printing`, async ({
    page
  }) => {
    const dialog = await open(page, t.large);
    await expect(dialog.getByText(t.warning, {exact: true})).toBeVisible();
    await expect(dialog.getByRole('img', {name: t.qr, exact: true})).toHaveCount(0);
    await expect(dialog.getByRole('link', {name: t.whatsapp, exact: true})).toHaveCount(0);
    await expect(dialog.getByRole('button', {name: t.copy, exact: true})).toHaveCount(0);
    await expect(dialog.getByText(t.body, {exact: true})).toHaveCount(0);
    await dialog.getByRole('button', {name: t.print, exact: true}).click();
    await expect(page.locator('[data-test="prints"]')).toHaveText('1');
  });

  test(`${lang}: normal and oversized states pass axe; Escape closes and restores focus`, async ({
    page
  }) => {
    const dialog = await open(page);
    expect(await scanAxe(page)).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(page.getByRole('button', {name: t.open, exact: true})).toBeFocused();
    await page.getByRole('button', {name: t.large, exact: true}).click();
    await expect(dialog.getByText(t.warning, {exact: true})).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
  });
}
