import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';

const copy = {
  en: {
    eyebrow: 'Your browsing',
    heading: 'Recently viewed',
    region: 'Recent designs · 6 designs',
    previous: 'Previous designs',
    next: 'Next designs',
    photo: 'Photo coming soon',
    save: 'Save design',
    out: 'Sold out'
  },
  fa: {
    eyebrow: 'مرور شما',
    heading: 'تازه دیده‌شده',
    region: 'طرح‌های اخیر · ۶ طرح',
    previous: 'طرح‌های قبلی',
    next: 'طرح‌های بعدی',
    photo: 'عکس به‌زودی',
    save: 'ذخیره طرح',
    out: 'ناموجود'
  }
};
const codes = ['VF-7K2M4Q', 'VF-8P3N5R', 'VF-3P8R1T', 'VF-2N4K6M', 'VF-9Q7S5T', 'VF-6R4P2N'];
for (const lang of ['en', 'fa']) {
  const t = copy[lang];
  const open = async page => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    await openStorefrontComponent(page, 'StorefrontProductRecent', lang);
    return page.locator('.vf-product-recent');
  };
  test(`${lang}: supplied ordered cards, heading, count, destinations, placeholder and stock render`, async ({
    page
  }) => {
    const recent = await open(page);
    await expect(recent.getByRole('heading', {level: 2})).toHaveText(t.heading);
    await expect(recent.getByText(t.eyebrow, {exact: true})).toBeVisible();
    await expect(recent.getByRole('region', {name: t.region, exact: true})).toBeVisible();
    await expect(recent.locator('.ag-product__name')).toHaveText(codes);
    await expect(recent.locator('.ag-product__ph')).toHaveText(t.photo);
    await expect(recent.locator('.ag-stock')).toHaveText(t.out);
    const cards = recent.locator('.ag-product');
    for (let index = 0; index < codes.length; index++) {
      await expect(cards.nth(index).getByRole('link')).toHaveAttribute(
        'href',
        '?page=product&code=' + codes[index]
      );
      await expect(cards.nth(index).locator('.ag-product__media')).toHaveClass(
        /ag-product__media--soft/
      );
    }
    await expect(cards.first().getByRole('img')).toHaveAttribute(
      'sizes',
      '(max-width: 767px) 80vw, (max-width: 1023px) 33vw, 25vw'
    );
    await expect(cards.first().locator('.ag-price')).toHaveText('2,000,000');
  });
  test(`${lang}: favorites update controlled state without selecting cards; links report their own record`, async ({
    page
  }) => {
    const recent = await open(page);
    const cards = recent.locator('.ag-product');
    const favorite = cards.first().getByRole('button', {name: t.save, exact: true});
    await favorite.click();
    await expect(favorite).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-test="events"]')).toHaveText('["favorite:VF-7K2M4Q"]');
    await favorite.focus();
    await page.keyboard.press('Space');
    await expect(favorite).toHaveAttribute('aria-pressed', 'false');
    await cards.nth(1).getByRole('button', {name: t.save, exact: true}).focus();
    await page.keyboard.press('Enter');
    await expect(cards.nth(1).getByRole('button', {name: t.save, exact: true})).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    await cards.first().getByRole('link').click();
    await cards.nth(1).getByRole('link').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-test="events"]')).toHaveText(
      '["favorite:VF-7K2M4Q","favorite:VF-7K2M4Q","favorite:VF-8P3N5R","select:VF-7K2M4Q","select:VF-8P3N5R"]'
    );
  });
  test(`${lang}: compact carousel navigates in reading direction and explicit reset remounts at the start`, async ({
    page
  }) => {
    await page.setViewportSize({width: 390, height: 844});
    const recent = await open(page);
    const track = recent.locator('.ag-carousel__track');
    const previous = recent.getByRole('button', {name: t.previous, exact: true});
    const next = recent.getByRole('button', {name: t.next, exact: true});
    await expect(previous).toBeDisabled();
    await expect(next).toBeEnabled();
    await next.focus();
    await page.keyboard.press('Enter');
    await expect
      .poll(() => track.evaluate(element => Math.abs(element.scrollLeft)))
      .toBeGreaterThan(100);
    await expect(previous).toBeEnabled();
    await previous.click();
    await expect
      .poll(() => track.evaluate(element => Math.abs(element.scrollLeft)))
      .toBeLessThan(1);
    await next.click();
    await expect
      .poll(() => track.evaluate(element => Math.abs(element.scrollLeft)))
      .toBeGreaterThan(100);
    await page.getByRole('button', {name: 'Reset carousel', exact: true}).click();
    await expect
      .poll(() => track.evaluate(element => Math.abs(element.scrollLeft)))
      .toBeLessThan(1);
    await expect(previous).toBeDisabled();
    await expect(page.locator('[data-test="events"]')).toHaveText('[]');
    expect(await scanAxe(page)).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
  });
  test(`${lang}: supplied single and empty arrays update sizes, count and navigation without business filtering`, async ({
    page
  }) => {
    const recent = await open(page);
    await page.getByRole('combobox', {name: 'Items', exact: true}).selectOption('one');
    await expect(recent.locator('.ag-product')).toHaveCount(1);
    await expect(recent.getByRole('img')).toHaveAttribute(
      'sizes',
      '(max-width: 767px) 100vw, (max-width: 1023px) 33vw, 25vw'
    );
    await expect(recent.locator('.vf-collection')).toHaveAttribute('data-items', '1');
    await expect(recent.getByRole('button', {name: t.next, exact: true})).toBeHidden();
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('combobox', {name: 'Items', exact: true}).selectOption('empty');
    await expect(recent.locator('.ag-product')).toHaveCount(0);
    await expect(recent.locator('.vf-collection')).toHaveAttribute('data-items', '0');
    await expect(recent.getByRole('button', {name: t.previous, exact: true})).toBeHidden();
    await expect(recent.getByRole('button', {name: t.next, exact: true})).toBeHidden();
    await expect(recent.getByRole('heading', {level: 2})).toHaveText(t.heading);
    expect(await scanAxe(page)).toEqual([]);
  });
}
