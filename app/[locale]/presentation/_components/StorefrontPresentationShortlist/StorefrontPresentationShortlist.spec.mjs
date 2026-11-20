import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../e2e/component-test.mjs';

const copy = {
  en: {
    title: 'Compare designs',
    clear: 'Clear shortlist',
    send: 'Send shortlist',
    show: 'Show design',
    remove: 'Remove design',
    empty: 'No shortlisted designs',
    soldOut: 'Sold out',
    close: 'Close'
  },
  fa: {
    title: 'مقایسه طرح‌ها',
    clear: 'پاک کردن انتخاب‌ها',
    send: 'ارسال انتخاب‌ها',
    show: 'نمایش طرح',
    remove: 'حذف طرح',
    empty: 'طرح انتخاب‌شده‌ای نیست',
    soldOut: 'تمام شده',
    close: 'بستن'
  }
};
for (const lang of ['en', 'fa']) {
  const t = copy[lang];
  const open = async page => {
    await openStorefrontComponent(page, 'StorefrontPresentationShortlist', lang);
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await page.getByRole('button', {name: 'Open shortlist', exact: true}).click();
    const dialog = page.getByRole('dialog', {name: t.title});
    await expect(dialog).toBeVisible();
    return dialog;
  };
  const events = page => page.locator('[data-test="events"]');
  test(`${lang}: ordered comparison cards render supplied labels, sold-out content, responsive images and prices`, async ({
    page
  }) => {
    const dialog = await open(page);
    await expect(dialog.locator('li')).toHaveCount(2);
    await expect(dialog.locator('[data-test="label"] bdi')).toHaveText(['VF-7K2M4Q', 'VF-8P3N5R']);
    for (const label of await dialog.locator('bdi').all())
      await expect(label).toHaveAttribute('dir', 'ltr');
    await expect(dialog.getByText(t.soldOut, {exact: true})).toBeVisible();
    await expect(dialog.locator('.ag-price')).toHaveText(['2,000,000', '3,000,000']);
    const images = dialog.getByRole('img');
    await expect(images).toHaveCount(2);
    await expect(images.nth(0)).toHaveAttribute('alt', 'VF-7K2M4Q');
    await expect(images.nth(1)).toHaveAttribute('alt', 'VF-8P3N5R');
    for (const image of await images.all()) {
      await expect(image).toHaveAttribute('sizes', '(max-width: 767px) 50vw, 25vw');
      await expect(image).toHaveAttribute('src', '/assets/categories/bouquets.webp');
    }
    await expect(dialog.getByRole('button', {name: t.show, exact: true})).toHaveCount(2);
    await expect(dialog.getByRole('button', {name: t.remove, exact: true})).toHaveCount(2);
  });
  test(`${lang}: row and footer callbacks stay isolated and do not mutate owner-supplied membership`, async ({
    page
  }) => {
    const dialog = await open(page);
    const rows = dialog.locator('li');
    await rows.nth(1).getByRole('button', {name: t.show, exact: true}).click();
    await rows.nth(0).getByRole('button', {name: t.remove, exact: true}).click();
    await rows.nth(0).getByRole('button', {name: t.show, exact: true}).focus();
    await page.keyboard.press('Enter');
    await rows.nth(1).getByRole('button', {name: t.remove, exact: true}).focus();
    await page.keyboard.press('Space');
    await dialog.getByRole('button', {name: t.clear, exact: true}).click();
    await dialog.getByRole('button', {name: t.send, exact: true}).focus();
    await page.keyboard.press('Enter');
    await expect(events(page)).toHaveText(
      '["show:VF-8P3N5R","remove:VF-7K2M4Q","show:VF-7K2M4Q","remove:VF-8P3N5R","clear","send"]'
    );
    await expect(rows).toHaveCount(2);
    await expect(dialog).toBeVisible();
  });
  test(`${lang}: owner-supplied single, empty and hidden-price branches preserve the remaining row action`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontPresentationShortlist', lang);
    await page.getByRole('combobox', {name: 'Items', exact: true}).selectOption('one');
    await page.getByLabel('Prices', {exact: true}).uncheck();
    await page.getByRole('button', {name: 'Open shortlist', exact: true}).click();
    const dialog = page.getByRole('dialog', {name: t.title});
    await expect(dialog.locator('li')).toHaveCount(1);
    await expect(dialog.locator('bdi')).toHaveText('VF-8P3N5R');
    await expect(dialog.locator('.ag-price')).toHaveCount(0);
    await dialog.getByRole('button', {name: t.show, exact: true}).click();
    await expect(events(page)).toHaveText('["show:VF-8P3N5R"]');
    expect(await scanAxe(page)).toEqual([]);
    await page.keyboard.press('Escape');
    await page.getByRole('combobox', {name: 'Items', exact: true}).selectOption('empty');
    await page.getByRole('button', {name: 'Open shortlist', exact: true}).click();
    await expect(dialog.getByText(t.empty, {exact: true})).toBeVisible();
    await expect(dialog.locator('ul')).toHaveCount(0);
    for (const name of [t.clear, t.send, t.show, t.remove])
      await expect(dialog.getByRole('button', {name, exact: true})).toHaveCount(0);
    expect(await scanAxe(page)).toEqual([]);
  });
  test(`${lang}: compact comparison contains focus and closes through Escape or the close control`, async ({
    page
  }) => {
    await page.setViewportSize({width: 390, height: 844});
    const dialog = await open(page);
    expect(await scanAxe(page)).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    await dialog.getByRole('button', {name: t.send, exact: true}).focus();
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(true);
    await page.keyboard.press('Shift+Tab');
    expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(true);
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(events(page)).toHaveText('["close"]');
    await expect(page.getByRole('button', {name: 'Open shortlist', exact: true})).toBeFocused();
    await page.getByRole('button', {name: 'Open shortlist', exact: true}).click();
    await dialog.getByRole('button', {name: t.close, exact: true}).click();
    await expect(dialog).toHaveCount(0);
    await expect(events(page)).toHaveText('["close","close"]');
  });
}
