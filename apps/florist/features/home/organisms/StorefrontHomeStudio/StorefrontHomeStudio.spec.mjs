import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';
const codes = ['VF-7K2M4Q', 'VF-8P3N5R', 'VF-3P8R1T', 'VF-2N4K6M', 'VF-9Q7S5T', 'VF-6R4P2N'];
for (const lang of ['en', 'fa']) {
  const title = lang === 'en' ? 'Studio designs' : 'استودیو طرح‌ها';
  const save = lang === 'en' ? 'Save design' : 'ذخیره طرح';
  const all = lang === 'en' ? 'Explore all designs' : 'دیدن همه طرح‌ها';
  const next = lang === 'en' ? 'Next designs' : 'طرح‌های بعدی';
  const previous = lang === 'en' ? 'Previous designs' : 'طرح‌های قبلی';
  const open = async page => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    await openStorefrontComponent(page, 'StorefrontHomeStudio', lang);
    return page.locator('main');
  };
  test(
    lang + ': supplied products retain codes, content, frame, images and priority',
    async ({page}) => {
      const main = await open(page);
      await expect(main.getByRole('heading', {level: 2})).toHaveText(title);
      await expect(main.locator('#vf-home-studio-title')).toHaveText(title);
      await expect(
        main.getByText(lang === 'en' ? 'From the studio' : 'از استودیو', {exact: true})
      ).toBeVisible();
      await expect(
        main.getByText(
          lang === 'en' ? 'Explore the current collection.' : 'مجموعه کنونی را ببینید.',
          {exact: true}
        )
      ).toBeVisible();
      await expect(main.locator('.ag-product__name')).toHaveText(codes);
      await expect(main.locator('.ag-product__sub')).toHaveText(
        Array(6).fill(lang === 'en' ? 'Bouquet' : 'دسته‌گل')
      );
      await expect(main.locator('.ag-product__price')).toHaveText([
        '2,000,000',
        ...Array(5).fill('3,000,000')
      ]);
      await expect(main.locator('.ag-product__badge')).toHaveText(
        lang === 'en' ? 'Ready' : 'آماده'
      );
      await expect(main.locator('.ag-product__badge')).toHaveClass(/ag-badge--accent/);
      await expect(main.locator('.ag-stock')).toHaveText(lang === 'en' ? 'Sold out' : 'ناموجود');
      await expect(main.locator('.ag-product__ph')).toHaveText(
        lang === 'en' ? 'Photo coming soon' : 'عکس به‌زودی'
      );
      const cards = main.locator('.ag-product');
      for (let index = 0; index < codes.length; index++)
        await expect(cards.nth(index).getByRole('link')).toHaveAttribute(
          'href',
          '#design-' + codes[index]
        );
      const photos = main.locator('img');
      await expect(photos).toHaveCount(5);
      for (let index = 0; index < 5; index++) {
        await expect(photos.nth(index)).toHaveAttribute('src', '/assets/categories/bouquets.webp');
        await expect(photos.nth(index)).toHaveAttribute(
          'sizes',
          '(max-width: 767px) 80vw, (max-width: 1023px) 33vw, 25vw'
        );
        await expect(photos.nth(index)).toHaveAttribute('loading', index < 2 ? 'eager' : 'lazy');
        if (index < 2) await expect(photos.nth(index)).toHaveAttribute('fetchpriority', 'high');
        else await expect(photos.nth(index)).not.toHaveAttribute('fetchpriority', 'high');
      }
      await expect(cards.first().getByRole('img')).toHaveAttribute('alt', codes[0]);
      await expect(cards.first().locator('.ag-product__media')).toHaveClass(
        /ag-product__media--arch/
      );
      await page.getByRole('checkbox', {name: 'Soft frame', exact: true}).check();
      await expect(cards.first().locator('.ag-product__media')).toHaveClass(
        /ag-product__media--soft/
      );
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    lang + ': isolated favorites and select callbacks update controlled state exactly once',
    async ({page}) => {
      const main = await open(page);
      const cards = main.locator('.ag-product');
      const favorite = cards.first().getByRole('button', {name: save, exact: true});
      await expect(favorite).toHaveAttribute('aria-pressed', 'false');
      await favorite.click();
      await expect(favorite).toHaveAttribute('aria-pressed', 'true');
      await favorite.focus();
      await page.keyboard.press('Space');
      await expect(favorite).toHaveAttribute('aria-pressed', 'false');
      await cards.nth(1).getByRole('button', {name: save, exact: true}).focus();
      await page.keyboard.press('Enter');
      await expect(cards.nth(1).getByRole('button', {name: save, exact: true})).toHaveAttribute(
        'aria-pressed',
        'true'
      );
      await cards.first().getByRole('link').click();
      await cards.nth(1).getByRole('link').focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-test="events"]')).toHaveText(
        JSON.stringify([
          'favorite:' + codes[0],
          'favorite:' + codes[0],
          'favorite:' + codes[1],
          'select:' + codes[0],
          'select:' + codes[1]
        ])
      );
      expect(await page.evaluate(() => location.hash)).toBe('');
    }
  );
  test(
    lang + ': compact links and carousel keyboard controls follow reading direction and resize',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      const main = await open(page);
      const link = main.getByRole('link', {name: all, exact: true});
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', '#shop');

      const track = main.locator('.ag-carousel__track');
      const prev = main.getByRole('button', {name: previous, exact: true});
      const forward = main.getByRole('button', {name: next, exact: true});
      await expect(prev).toBeDisabled();
      await expect(forward).toBeEnabled();
      await forward.focus();
      await page.keyboard.press('Enter');
      await expect
        .poll(() => track.evaluate(element => Math.abs(element.scrollLeft)))
        .toBeGreaterThan(100);
      expect(await track.evaluate(element => Math.sign(element.scrollLeft))).toBe(
        lang === 'fa' ? -1 : 1
      );
      await prev.click();
      await expect
        .poll(() => track.evaluate(element => Math.abs(element.scrollLeft)))
        .toBeLessThan(1);
      expect(await scanAxe(page)).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      await page.setViewportSize({width: 1280, height: 900});
      const wideLink = main.getByRole('link', {name: all, exact: true});
      await expect(wideLink).toBeVisible();
      await wideLink.focus();
      await page.keyboard.press('Enter');
      await expect.poll(() => page.evaluate(() => location.hash)).toBe('#shop');
      expect(await scanAxe(page)).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
    }
  );
  test(
    lang + ': supplied single and empty arrays preserve section and hide unnecessary arrows',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      const main = await open(page);
      for (const [value, count] of [
        ['one', 1],
        ['empty', 0]
      ]) {
        await page.getByRole('combobox', {name: 'Items', exact: true}).selectOption(value);
        await expect(main.locator('.ag-product')).toHaveCount(count);
        await expect(main.locator('.vf-collection')).toHaveAttribute('data-items', String(count));
        await expect(main.locator('.ag-carousel__track')).toHaveAttribute(
          'aria-label',
          (lang === 'en' ? 'Studio designs' : 'طرح‌های استودیو') +
            ' · ' +
            new Intl.NumberFormat(lang).format(count) +
            (lang === 'en' ? ' designs' : ' طرح')
        );
        await expect(main.getByRole('button', {name: previous, exact: true})).toBeHidden();
        await expect(main.getByRole('button', {name: next, exact: true})).toBeHidden();
        await expect(main.getByRole('heading', {level: 2})).toHaveText(title);
        expect(await scanAxe(page)).toEqual([]);
      }
    }
  );
}
