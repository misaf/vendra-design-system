import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          sub: 'گل‌های فصل',
          price: '۴۹۰٬۰۰۰ تومان',
          badge: 'تازه رسیده',
          save: 'ذخیره طرح',
          loading: 'طرح‌ها در حال بارگیری هستند.',
          failed: 'بارگیری طرح‌ها انجام نشد.',
          retry: 'بارگیری دوباره',
          emptyHeading: 'هیچ طرح مطابقی نیست',
          emptyBody: 'فیلترها را تغییر دهید.',
          clear: 'بازنشانی فیلترها',
          more: 'نمایش طرح‌های بیشتر',
          partial: 'نمایش ۲ از ۳ طرح',
          complete: 'نمایش هر ۳ طرح'
        }
      : {
          sub: 'Seasonal flowers',
          price: '490,000 toman',
          badge: 'New arrival',
          save: 'Save design',
          loading: 'Loading designs.',
          failed: 'Designs could not be loaded.',
          retry: 'Try loading again',
          emptyHeading: 'No matching designs',
          emptyBody: 'Try changing the filters.',
          clear: 'Reset filters',
          more: 'Show more designs',
          partial: 'Showing 2 of 3 designs',
          complete: 'Showing all 3 designs'
        };
  test(
    'results forward card content, selected favorite and product callback (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontShopResults', lang);
      const cards = page.locator('.ag-product');
      await expect(cards).toHaveCount(2);
      for (const [index, id] of [
        [0, 'VF-7K2M4Q'],
        [1, 'VF-8P3N5R']
      ]) {
        const card = cards.nth(index);
        await expect(card.getByRole('heading', {level: 3})).toHaveText(id);
        await expect(
          card.getByRole('link', {name: id + ' — ' + t.price, exact: true})
        ).toHaveAttribute('href', '#' + id);
        await expect(card).toContainText(t.sub);
        await expect(card).toContainText(t.price);
        await expect(card.getByRole('img', {name: id})).toHaveAttribute('loading', 'eager');
        await expect(card.getByRole('img', {name: id})).toHaveAttribute('fetchpriority', 'high');
      }
      await expect(cards.nth(0).getByText(t.badge, {exact: true})).toBeVisible();
      const first = cards.nth(0).getByRole('button', {name: t.save});
      const second = cards.nth(1).getByRole('button', {name: t.save});
      await expect(first).toHaveAttribute('aria-pressed', 'true');
      await expect(second).toHaveAttribute('aria-pressed', 'false');
      await second.click();
      await expect(second).toHaveAttribute('aria-pressed', 'true');
      await expect(first).toHaveAttribute('aria-pressed', 'true');
      await expect(page.locator('[data-test=action]')).toHaveText('favorite:VF-8P3N5R');
      expect(new URL(page.url()).hash).toBe('');
      await first.focus();
      await page.keyboard.press('Enter');
      await expect(first).toHaveAttribute('aria-pressed', 'false');
      await expect(page.locator('[data-test=action]')).toHaveText('favorite:VF-7K2M4Q');
      await cards.nth(1).getByRole('link').click();
      await expect(page.locator('[data-test=action]')).toHaveText('select:VF-8P3N5R');
      await expect(page).toHaveURL(/#VF-8P3N5R$/);
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'results paging forwards status, destination and callback (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontShopResults', lang);
      const more = page.getByRole('link', {name: t.more});
      await expect(page.getByRole('status')).toHaveText(t.partial);
      await expect(more).toHaveAttribute('href', '#next-page');
      await page.getByRole('checkbox', {name: 'Show paging'}).uncheck();
      await expect(more).toHaveCount(0);
      await expect(page.getByRole('status')).toHaveCount(0);
      await expect(page.locator('.ag-product')).toHaveCount(2);
      await page.getByRole('checkbox', {name: 'Show paging'}).check();
      await more.click();
      await expect(page.locator('[data-test=action]')).toHaveText('more');
      await expect(page.locator('.ag-product')).toHaveCount(3);
      await expect(page.getByRole('img', {name: 'VF-9A4B6C'})).toHaveAttribute('loading', 'lazy');
      await expect(more).toHaveCount(0);
      await expect(page.getByRole('status')).toHaveText(t.complete);
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'results loading and failure flags are independent of products (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontShopResults', lang);
      await page.getByRole('checkbox', {name: 'Loading feedback'}).check();
      await expect(page.getByRole('status').filter({hasText: t.loading})).toBeVisible();
      await expect(page.locator('.ag-skel-card')).toBeVisible();
      await expect(page.locator('.ag-product')).toHaveCount(2);
      await page.getByRole('checkbox', {name: 'Error feedback'}).check();
      await expect(page.getByText(t.failed, {exact: true})).toBeVisible();
      const retry = page.getByRole('button', {name: t.retry});
      await retry.focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-test=action]')).toHaveText('retry');
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Show products'}).uncheck();
      await expect(page.locator('.ag-product')).toHaveCount(0);
      await expect(page.locator('.ag-loadmore')).toHaveCount(0);
      await expect(retry).toBeVisible();
      await page.getByRole('checkbox', {name: 'Loading feedback'}).uncheck();
      await expect(page.getByRole('status')).toHaveCount(0);
      await expect(page.locator('.ag-skel-card')).toHaveCount(0);
      await expect(retry).toBeVisible();
      await page.getByRole('checkbox', {name: 'Error feedback'}).uncheck();
      await expect(retry).toHaveCount(0);
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'results empty recovery is independent and forwards clear callback (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontShopResults', lang);
      await page.getByRole('checkbox', {name: 'Empty feedback'}).check();
      await expect(page.getByRole('heading', {name: t.emptyHeading, exact: true})).toBeVisible();
      await expect(page.getByText(t.emptyBody, {exact: true})).toBeVisible();
      await expect(page.locator('.ag-product')).toHaveCount(2);
      await page.getByRole('checkbox', {name: 'Show products'}).uncheck();
      const clear = page.getByRole('button', {name: t.clear});
      await clear.focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-test=action]')).toHaveText('clear');
      await expect(page.locator('.ag-product')).toHaveCount(0);
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Empty feedback'}).uncheck();
      await expect(clear).toHaveCount(0);
      await expect(page.getByRole('heading', {name: t.emptyHeading, exact: true})).toHaveCount(0);
    }
  );
  test(
    'results compact product keyboard navigation and supplied frame (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      await openStorefrontComponent(page, 'StorefrontShopResults', lang);
      await expect(page.locator('.ag-product__media--arch')).toHaveCount(2);
      await page.getByRole('checkbox', {name: 'Soft image frame'}).check();
      await expect(page.locator('.ag-product__media--soft')).toHaveCount(2);
      const product = page.getByRole('link', {name: 'VF-7K2M4Q — ' + t.price, exact: true});
      await product.focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/#VF-7K2M4Q$/);
      await expect(page.locator('[data-test=action]')).toHaveText('select:VF-7K2M4Q');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      expect(await scanAxe(page)).toEqual([]);
    }
  );
}
