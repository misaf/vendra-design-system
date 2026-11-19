import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';

const copy = {
  en: {
    open: 'Open viewer',
    slideshow: 'Open slideshow viewer',
    noPrices: 'Open without prices',
    viewer: 'Design viewer',
    options: 'Design options',
    size: 'Size',
    extras: 'Extras',
    large: 'Large',
    card: 'Gift card',
    star: 'Shortlist design',
    add: 'Add to order',
    added: 'Added to order',
    send: 'Send design',
    next: 'Next'
  },
  fa: {
    open: 'باز کردن نمایشگر',
    slideshow: 'باز کردن نمایش اسلاید',
    noPrices: 'نمایش بدون قیمت',
    viewer: 'نمایشگر طرح',
    options: 'گزینه‌های طرح',
    size: 'اندازه',
    extras: 'افزودنی‌ها',
    large: 'بزرگ',
    card: 'کارت هدیه',
    star: 'انتخاب طرح',
    add: 'افزودن به سفارش',
    added: 'به سفارش اضافه شد',
    send: 'ارسال طرح',
    next: 'بعدی'
  }
};

for (const lang of ['en', 'fa']) {
  const t = copy[lang];
  const open = async (page, name = t.open) => {
    await openStorefrontComponent(page, 'StorefrontPresentationViewer', lang);
    await page.getByRole('button', {name, exact: true}).click();
    const dialog = page.getByRole('dialog', {name: t.viewer});
    await expect(dialog).toBeVisible();
    return dialog;
  };

  test(`${lang}: options, quote, shortlist, order and send follow their callbacks`, async ({
    page
  }) => {
    const dialog = await open(page);
    await expect(dialog.locator('.ag-price')).toHaveText('2,400,000');
    await expect(dialog.getByRole('group', {name: t.size, exact: true})).toHaveCount(0);
    await dialog.getByRole('button', {name: t.options, exact: true}).click();
    const large = dialog
      .getByRole('group', {name: t.size, exact: true})
      .getByRole('button', {name: t.large, exact: true});
    await large.click();
    await expect(large).toHaveAttribute('aria-pressed', 'true');
    await expect(dialog.locator('.ag-price')).toHaveText('3,100,000');
    const card = dialog
      .getByRole('group', {name: t.extras, exact: true})
      .getByRole('button', {name: t.card, exact: true});
    await card.click();
    await expect(card).toHaveAttribute('aria-pressed', 'true');
    const star = dialog.getByRole('button', {name: t.star, exact: true});
    await star.click();
    await expect(star).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-test="stars"]')).toHaveText('VF-7K2M4Q');
    await dialog.getByRole('button', {name: t.add, exact: true}).click();
    await expect(dialog.getByRole('button', {name: t.added, exact: true})).toBeVisible();
    await dialog.getByRole('button', {name: t.send, exact: true}).click();
    await expect(page.locator('[data-test="sent"]')).toHaveText('VF-7K2M4Q');
    await dialog.getByRole('button', {name: t.options, exact: true}).click();
    await expect(dialog.getByRole('group', {name: t.size, exact: true})).toHaveCount(0);
  });

  test(`${lang}: keyboard navigation selects the sold-out item and suppresses purchase actions`, async ({
    page
  }) => {
    const dialog = await open(page);
    await page.keyboard.press(lang === 'fa' ? 'ArrowLeft' : 'ArrowRight');
    await expect(page.locator('[data-test="index"]')).toHaveText('1');
    await expect(dialog.getByText('VF-3P8R1T', {exact: true})).toBeVisible();
    for (const name of [t.options, t.add, t.send])
      await expect(dialog.getByRole('button', {name, exact: true})).toHaveCount(0);
    await dialog.getByRole('button', {name: t.star, exact: true}).click();
    await expect(page.locator('[data-test="stars"]')).toHaveText('VF-3P8R1T');
  });

  test(`${lang}: slideshow hides options; price visibility and calm class follow props`, async ({
    page
  }) => {
    let dialog = await open(page, t.slideshow);
    await expect(page.locator('.vf-presentation-viewer')).toHaveClass(
      /vf-presentation-viewer--calm/
    );
    await expect(dialog.getByRole('group', {name: t.size, exact: true})).toHaveCount(0);
    await page.keyboard.press('Escape');
    await page.getByRole('button', {name: t.noPrices, exact: true}).click();
    dialog = page.getByRole('dialog', {name: t.viewer});
    await expect(dialog.locator('.ag-price')).toHaveCount(0);
    await expect(page.locator('.vf-presentation-viewer')).not.toHaveClass(
      /vf-presentation-viewer--calm/
    );
  });

  test(`${lang}: default, option and sold-out states pass axe; Escape restores focus`, async ({
    page
  }) => {
    const dialog = await open(page);
    expect(await scanAxe(page)).toEqual([]);
    await dialog.getByRole('button', {name: t.options, exact: true}).click();
    await expect(dialog.getByRole('group', {name: t.size, exact: true})).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
    await dialog.getByRole('button', {name: t.next, exact: true}).click();
    await expect(page.locator('[data-test="index"]')).toHaveText('1');
    expect(await scanAxe(page)).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(page.getByRole('button', {name: t.open, exact: true})).toBeFocused();
  });
}
