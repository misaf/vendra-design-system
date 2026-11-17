import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../e2e/component-test.mjs';

for (const lang of ['en', 'fa']) {
  const title = lang === 'en' ? 'Occasions' : 'مناسبت‌ها';
  const accent = lang === 'en' ? 'to explore' : 'برای کشف';
  const item = lang === 'en' ? 'Collection' : 'مجموعه';
  const region = lang === 'en' ? 'Occasions collection' : 'مجموعه مناسبت‌ها';
  const previous = lang === 'en' ? 'Previous occasions' : 'موارد قبلی';
  const next = lang === 'en' ? 'Next occasions' : 'موارد بعدی';
  const open = async page => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    await openStorefrontComponent(page, 'StorefrontHomeOccasions', lang);
    return page.locator('main');
  };
  test(
    lang + ': supplied ordered content, images, heading and replacement props',
    async ({page}) => {
      const main = await open(page);
      await expect(main.getByRole('heading', {level: 2})).toHaveText(title + ' ' + accent);
      await expect(
        main.getByRole('region', {
          name: region + (lang === 'en' ? ' · 6 items' : ' · ۶ مورد'),
          exact: true
        })
      ).toBeVisible();
      await expect(main.locator('.ag-cat__label')).toHaveText(
        Array.from({length: 6}, (_, i) => item + ' ' + (i + 1))
      );
      const cards = main.locator('.ag-cat');
      await expect(cards).toHaveCount(6);
      await expect(cards.nth(1).locator('.ag-product__ph')).toHaveCount(1);
      await expect(cards.first().locator('img')).toHaveAttribute(
        'src',
        '/assets/categories/bouquets.webp'
      );
      await expect(cards.first().locator('img')).toHaveAttribute('alt', '');
      await expect(cards.first().locator('img')).toHaveAttribute(
        'sizes',
        '(max-width: 767px) 80vw, (max-width: 1023px) 33vw, 25vw'
      );
      await expect(main.locator('#vf-home-occasions-title')).toHaveText(title + ' ' + accent);
      await expect(cards.locator('.ag-cat__count')).toHaveText(
        Array.from({length: 6}, (_, i) => i + 1 + ' designs')
      );
      await expect(cards.first()).toHaveClass(/ag-cat--arch/);
      await expect(cards.first().locator('.ag-cat__media')).toHaveCSS('aspect-ratio', '1 / 1');
      await expect(
        main.getByText(
          lang === 'en'
            ? 'Discover something for your next visit.'
            : 'برای دیدار بعدی چیزی تازه پیدا کنید.',
          {exact: true}
        )
      ).toBeVisible();
      await page.getByRole('checkbox', {name: 'Alternate content', exact: true}).check();
      await expect(main.getByRole('heading', {level: 2})).toHaveText(
        (lang === 'en' ? 'New discoveries' : 'کشف‌های تازه') + ' ' + accent
      );
      await expect(main.locator('.ag-cat__label')).toHaveText(
        Array.from({length: 6}, (_, i) => item + ' ' + (6 - i))
      );
      await expect(cards.first()).toHaveClass(/ag-cat--soft/);
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(lang + ': supplied destinations activate through pointer and Enter', async ({page}) => {
    const main = await open(page);
    const links = main.locator('.ag-cat');
    for (let index = 0; index < 6; index++) {
      await expect(links.nth(index)).toHaveAttribute('href', '#occasions-' + (index + 1));
    }
    await links.first().click();
    await expect.poll(() => page.evaluate(() => location.hash)).toBe('#occasions-1');
    await links.nth(1).focus();
    await expect(links.nth(1)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect.poll(() => page.evaluate(() => location.hash)).toBe('#occasions-2');
  });
  test(
    lang + ': compact carousel scrolls in reading direction and adapts on resize',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      const main = await open(page);
      const track = main.locator('.ag-carousel__track');
      const prev = main.getByRole('button', {name: previous, exact: true});
      const forward = main.getByRole('button', {name: next, exact: true});
      await expect(prev).toBeDisabled();
      await expect(forward).toBeEnabled();
      await forward.focus();
      await page.keyboard.press('Enter');
      await expect
        .poll(() => track.evaluate(element => Math.abs(element.scrollLeft)))
        .toBeGreaterThan(50);
      expect(await track.evaluate(element => Math.sign(element.scrollLeft))).toBe(
        lang === 'fa' ? -1 : 1
      );
      await expect(prev).toBeEnabled();
      await prev.click();
      await expect
        .poll(() => track.evaluate(element => Math.abs(element.scrollLeft)))
        .toBeLessThan(1);
      await track.focus();
      await expect(track).toBeFocused();
      expect(await scanAxe(page)).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      await page.setViewportSize({width: 1280, height: 900});
      await expect(forward).toBeEnabled();
      expect(await scanAxe(page)).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
    }
  );
  test(
    lang + ': supplied single and empty collections preserve heading and hide navigation',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      const main = await open(page);
      for (const [value, count] of [
        ['one', 1],
        ['empty', 0]
      ]) {
        await page.getByRole('combobox', {name: 'Items', exact: true}).selectOption(value);
        await expect(main.locator('.ag-cat')).toHaveCount(count);
        await expect(main.locator('.vf-collection')).toHaveAttribute('data-items', String(count));
        await expect(main.locator('.ag-carousel__track')).toHaveAttribute(
          'aria-label',
          region +
            ' · ' +
            new Intl.NumberFormat(lang).format(count) +
            (lang === 'en' ? ' items' : ' مورد')
        );
        await expect(main.getByRole('button', {name: previous, exact: true})).toBeHidden();
        await expect(main.getByRole('button', {name: next, exact: true})).toBeHidden();
        await expect(main.getByRole('heading', {level: 2})).toHaveText(title + ' ' + accent);

        expect(await scanAxe(page)).toEqual([]);
      }
    }
  );
}
