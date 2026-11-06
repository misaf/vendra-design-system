import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

for (const width of [390, 768, 1280, 1920]) {
  test.describe(`product content at ${width}px`, () => {
    test.use({viewport: {width, height: 1000}, hasTouch: width < 1280});
    for (const lang of ['en', 'fa']) {
      test(`orchid description and care have distinct content (${lang})`, async ({page}) => {
        const fa = lang === 'fa';
        const description = fa
          ? 'ارکیده فالانوپسیس در گلدان سرامیکی.'
          : 'A Phalaenopsis orchid in a ceramic pot.';
        const advice = fa
          ? 'وقتی ریشه‌ها نقره‌ای شدند آبیاری کنید و در نور غیرمستقیم نگه دارید.'
          : 'Water when the roots turn silver and keep in indirect light.';
        await openSite(page, 'product', lang, {
          id: 'VF-8RD5WN',
          ...(width === 1920 ? {tv: '1'} : {})
        });
        await expect(page.getByRole('heading', {level: 1})).toHaveText('VF-8RD5WN');
        await expect(page.locator('.vf-product-description')).toHaveText(description);
        await expect(page.getByText(description, {exact: true})).toHaveCount(1);
        const care = page.getByRole('region', {name: fa ? 'نگهداری' : 'Care', exact: true});
        await expect(care).toHaveText(advice);
        await expect(page.getByText(advice, {exact: true})).toHaveCount(1);
        const toggle = page.getByRole('button', {name: fa ? 'نگهداری' : 'Care', exact: true});
        await toggle.focus();
        await page.keyboard.press('Enter');
        await expect(care).toBeHidden();
        await page.keyboard.press('Enter');
        await expect(care).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(
          0
        );
        if (width === 390 || width === 1920) expect(await scanAxe(page)).toEqual([]);
      });
    }
  });
}
