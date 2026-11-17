import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const name = lang === 'en' ? 'Vendra flowers' : 'گل وندرا';
  const alternate = lang === 'en' ? 'Vendra studio' : 'استودیو وندرا';
  const src = lang === 'fa' ? '/assets/logo-horizontal-fa.png' : '/assets/logo-horizontal.png';
  const open = async page => {
    await openStorefrontComponent(page, 'BrandLogo', lang);
    return page.locator('main');
  };
  test(
    lang + ': supplied artwork, intrinsic dimensions and localized accessible name update',
    async ({page}) => {
      const main = await open(page);
      const image = main.getByRole('img', {name, exact: true});
      await expect(image).toHaveAttribute('src', src);
      await expect(image).toHaveAttribute('width', '440');
      await expect(image).toHaveAttribute('height', '72');
      await expect(image).toHaveClass('vf-brand-logo');
      await expect
        .poll(() => image.evaluate(element => element.complete && element.naturalWidth > 0))
        .toBe(true);
      await expect(main.getByRole('link', {name, exact: true})).toHaveAttribute('href', '#home');
      await expect(main.getByRole('link')).toHaveText('');
      await page.getByRole('checkbox', {name: 'Alternate name', exact: true}).check();
      await expect(main.getByRole('img', {name: alternate, exact: true})).toHaveAttribute(
        'src',
        src
      );
      await expect(main.getByRole('link', {name: alternate, exact: true})).toBeVisible();
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    lang + ': absent artwork renders only the supplied name and preserves native link activation',
    async ({page}) => {
      const main = await open(page);
      await page.getByRole('combobox', {name: 'Logo source', exact: true}).selectOption('absent');
      await expect(main.getByRole('img')).toHaveCount(0);
      const link = main.getByRole('link', {name, exact: true});
      await expect(link).toHaveText(name);
      await page.getByRole('checkbox', {name: 'Alternate name', exact: true}).check();
      await expect(link).toHaveCount(0);
      const updated = main.getByRole('link', {name: alternate, exact: true});
      await expect(updated).toHaveText(alternate);
      await updated.focus();
      await page.keyboard.press('Enter');
      await expect.poll(() => page.evaluate(() => location.hash)).toBe('#home');
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    lang + ': failed source falls back, stays failed on reuse and recovers with a different source',
    async ({page}) => {
      await page.route('**/assets/fixture-logo-failure.png', route => route.abort('failed'));
      const main = await open(page);
      const source = page.getByRole('combobox', {name: 'Logo source', exact: true});
      await source.selectOption('failed');
      await expect(main.getByRole('img')).toHaveCount(0);
      await expect(main.getByRole('link', {name, exact: true})).toHaveText(name);
      await page.getByRole('checkbox', {name: 'Alternate name', exact: true}).check();
      await expect(main.getByRole('link', {name: alternate, exact: true})).toHaveText(alternate);
      await source.selectOption('absent');
      await source.selectOption('failed');
      await expect(main.getByRole('img')).toHaveCount(0);
      await expect(main.getByRole('link')).toHaveText(alternate);
      await source.selectOption('alternate');
      const recovered = main.getByRole('img', {name: alternate, exact: true});
      await expect(recovered).toHaveAttribute('src', '/assets/logo-stacked.png');
      await expect(recovered).toHaveAttribute('width', '160');
      await expect(recovered).toHaveAttribute('height', '160');
      await expect
        .poll(() => recovered.evaluate(element => element.complete && element.naturalWidth > 0))
        .toBe(true);
      await expect(main.getByRole('link')).toHaveText('');
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    lang + ': shell contexts bound artwork and keep failed fallback accessible on narrow screens',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      const main = await open(page);
      const image = main.getByRole('img', {name, exact: true});
      for (const [context, height] of [
        ['header', 36],
        ['mobile', 28],
        ['footer', 56]
      ]) {
        await page.getByRole('combobox', {name: 'Context', exact: true}).selectOption(context);
        await expect(image).toHaveCSS('height', height + 'px');
        expect(await image.evaluate(element => element.getBoundingClientRect().width <= 220)).toBe(
          true
        );
        expect(await scanAxe(page)).toEqual([]);
      }
      await image.evaluate(element => element.dispatchEvent(new Event('error')));
      await expect(main.getByRole('img')).toHaveCount(0);
      await expect(main.getByRole('link', {name, exact: true})).toHaveText(name);
      expect(await scanAxe(page)).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
    }
  );
}
