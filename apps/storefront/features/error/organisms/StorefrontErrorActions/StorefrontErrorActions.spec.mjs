import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const retry = lang === 'en' ? 'Try again' : 'تلاش دوباره';
  const home = lang === 'en' ? 'Return home' : 'بازگشت به خانه';
  const phone = (lang === 'en' ? 'Call' : 'تماس') + ' +1 555 123 4567';
  const open = async page => {
    await openStorefrontComponent(page, 'StorefrontErrorActions', lang);
    return page.locator('main');
  };
  test(
    lang + ': supplied actions retain roles, order, variants and phone destination',
    async ({page}) => {
      const main = await open(page);
      await expect(main.locator('.ag-btn')).toHaveText([retry, home, phone]);
      await expect(main.getByRole('button', {name: retry, exact: true})).toHaveAttribute(
        'type',
        'button'
      );
      await expect(main.getByRole('button', {name: retry, exact: true})).toHaveClass(
        /ag-btn--primary/
      );
      await expect(main.getByRole('link', {name: home, exact: true})).toHaveClass(
        /ag-btn--secondary/
      );
      await expect(main.getByRole('link', {name: home, exact: true})).toHaveAttribute(
        'href',
        '#home'
      );
      const call = main.getByRole('link', {name: phone, exact: true});
      await expect(call).toHaveClass(/ag-btn--ghost/);
      await expect(call).toHaveAttribute('href', 'tel:+15551234567');
      await expect(call.locator('bdi')).toHaveAttribute('dir', 'ltr');
      await expect(main.locator('.ag-icon[aria-hidden="true"]')).toHaveCount(3);
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    lang + ': retry pointer, Enter and Space invoke only the supplied callback once each',
    async ({page}) => {
      const main = await open(page);
      const button = main.getByRole('button', {name: retry, exact: true});
      await button.click();
      await button.focus();
      await page.keyboard.press('Enter');
      await page.keyboard.press('Space');
      await expect(page.locator('[data-test="events"]')).toHaveText(
        JSON.stringify(['retry', 'retry', 'retry'])
      );
      await expect(button).toBeFocused();
      expect(await page.evaluate(() => location.hash)).toBe('');
      await page.getByRole('checkbox', {name: 'Alternate actions', exact: true}).check();
      await main
        .getByRole('button', {
          name: lang === 'en' ? 'Retry loading this page' : 'بارگذاری دوباره این صفحه',
          exact: true
        })
        .click();
      await expect(page.locator('[data-test="events"]')).toHaveText(
        JSON.stringify(['retry', 'retry', 'retry', 'alternate-retry'])
      );
    }
  );
  test(
    lang + ': keyboard order and home navigation leave phone handler untouched',
    async ({page}) => {
      const main = await open(page);
      const button = main.getByRole('button', {name: retry, exact: true});
      const link = main.getByRole('link', {name: home, exact: true});
      await button.focus();
      await page.keyboard.press('Tab');
      await expect(link).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(main.getByRole('link', {name: phone, exact: true})).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Enter');
      await expect.poll(() => page.evaluate(() => location.hash)).toBe('#home');
      await link.click();
      await expect(page.locator('[data-test="events"]')).toHaveText('[]');
    }
  );
  test(
    lang + ': replacement labels and destinations remain accessible at compact widths',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      const main = await open(page);
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Alternate actions', exact: true}).check();
      const homeLink = main.getByRole('link', {
        name: lang === 'en' ? 'Visit the storefront' : 'دیدن فروشگاه',
        exact: true
      });
      await expect(homeLink).toHaveAttribute('href', '#storefront');
      await expect(
        main.getByRole('link', {
          name: (lang === 'en' ? 'Contact the studio' : 'تماس با استودیو') + ' +1 555 123 4567',
          exact: true
        })
      ).toHaveAttribute('href', 'tel:+15557654321');
      await homeLink.focus();
      await page.keyboard.press('Enter');
      await expect.poll(() => page.evaluate(() => location.hash)).toBe('#storefront');
      await expect(page.locator('[data-test="events"]')).toHaveText('[]');
      expect(await scanAxe(page)).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
    }
  );
}
