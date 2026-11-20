import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../../e2e/component-test.mjs';

const copy = {
  en: {
    open: 'Show confirmation',
    openUndo: 'Show confirmation with Undo',
    title: 'Added to your bag',
    close: 'Close confirmation',
    checkout: 'Continue to checkout',
    continue: 'Keep shopping',
    undo: 'Undo add',
    meta: 'Medium × 2',
    note: 'Card: Happy birthday',
    total: 'Total',
    amount: '4,800,000 toman'
  },
  fa: {
    open: 'نمایش تأیید',
    openUndo: 'نمایش تأیید با واگرد',
    title: 'به سبد شما اضافه شد',
    close: 'بستن تأیید',
    checkout: 'ادامه به پرداخت',
    continue: 'ادامه خرید',
    undo: 'واگرد افزودن',
    meta: 'متوسط × ۲',
    note: 'کارت: تولدت مبارک',
    total: 'جمع',
    amount: '۴٬۸۰۰٬۰۰۰ تومان'
  }
};

for (const lang of ['en', 'fa']) {
  const t = copy[lang];
  const open = async (page, name = t.open) => {
    await openStorefrontComponent(page, 'StorefrontProductAdded', lang);
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await page.getByRole('button', {name, exact: true}).click();
    const dialog = page.getByRole('dialog', {name: t.title, exact: true});
    await expect(dialog).toBeVisible();
    return dialog;
  };

  test(`${lang}: configured summary and checkout href/callback use the supplied content`, async ({
    page
  }) => {
    const dialog = await open(page);
    await expect(dialog.getByRole('link', {name: 'VF-7K2M4Q', exact: true})).toHaveAttribute(
      'href',
      '#product'
    );
    await expect(dialog.getByText(t.meta, {exact: true})).toBeVisible();
    await expect(dialog.getByText(t.note, {exact: true})).toBeVisible();
    await expect(dialog.getByText(t.total, {exact: true})).toBeVisible();
    await expect(dialog.locator('.ag-osum__sum--strong .ag-price')).toHaveText(t.amount);
    await expect(dialog.getByRole('button', {name: t.undo, exact: true})).toHaveCount(0);
    const checkout = dialog.getByRole('link', {name: t.checkout, exact: true});
    await expect(checkout).toBeFocused();
    await expect(checkout).toHaveAttribute('href', '#checkout');
    await checkout.click();
    await expect(page.locator('[data-test="action"]')).toHaveText('checkout');
    await expect(dialog).toHaveCount(0);
  });

  test(`${lang}: continue, close button and Escape close and return focus to the opener`, async ({
    page
  }) => {
    const dialog = await open(page);
    for (const action of [t.continue, t.close, 'Escape']) {
      if (action === 'Escape') await page.keyboard.press('Escape');
      else await dialog.getByRole('button', {name: action, exact: true}).click();
      await expect(dialog).toHaveCount(0);
      await expect(page.getByRole('button', {name: t.open, exact: true})).toBeFocused();
      await expect(page.locator('[data-test="action"]')).toBeEmpty();
      if (action !== 'Escape') await page.getByRole('button', {name: t.open, exact: true}).click();
    }
  });

  test(`${lang}: optional Undo calls back and closes`, async ({page}) => {
    const dialog = await open(page, t.openUndo);
    await dialog.getByRole('button', {name: t.undo, exact: true}).click();
    await expect(page.locator('[data-test="action"]')).toHaveText('undo');
    await expect(dialog).toHaveCount(0);
    await expect(page.getByRole('button', {name: t.openUndo, exact: true})).toBeFocused();
  });

  test(`${lang}: default and Undo states pass axe and keep keyboard focus inside`, async ({
    page
  }) => {
    const dialog = await open(page);
    expect(await scanAxe(page)).toEqual([]);
    await page.keyboard.press('Escape');
    await page.getByRole('button', {name: t.openUndo, exact: true}).click();
    await expect(dialog.getByRole('button', {name: t.undo, exact: true})).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
    for (let index = 0; index < 6; index++) {
      await page.keyboard.press('Tab');
      expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(true);
    }
  });
}
