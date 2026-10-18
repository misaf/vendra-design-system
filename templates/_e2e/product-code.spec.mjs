import {test, expect} from '@playwright/test';
import {openSite} from './helpers.mjs';

const copyLabel = {en: 'Copy product code', fa: 'کپی کد محصول'};

for (const lang of ['en', 'fa']) {
  test(`product code is readable and copies by keyboard (${lang})`, async ({page}) => {
    // Keep parallel tests independent of the operating system's shared clipboard and focus.
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async text => {
            window.__copiedProductCode = text;
          }
        }
      });
    });
    await openSite(page, 'home', lang);
    const link = page.locator('.vf-home-featured-products .ag-product__link').first();
    const code = (await link.innerText()).trim();
    expect(code).toMatch(/^VF-[A-Z0-9]+$/);
    expect(await link.evaluate(el => getComputedStyle(el.parentElement).fontFamily)).toContain(
      'monospace'
    );
    expect(await link.evaluate(el => getComputedStyle(el).direction)).toBe('ltr');
    await link.click();
    await expect(page.locator('#vf-product-code')).toHaveText(code);
    const copy = page.getByRole('button', {name: copyLabel[lang], exact: true});
    await expect(copy).toBeVisible();
    expect((await copy.boundingBox()).height).toBeGreaterThanOrEqual(44);
    expect(
      await page.locator('#vf-product-code').evaluate(el => getComputedStyle(el).fontFamily)
    ).toContain('monospace');
    await copy.focus();
    await page.keyboard.press('Enter');
    await expect.poll(() => page.evaluate(() => window.__copiedProductCode)).toBe(code);
    await expect(page.locator('.ag-toast__title')).toContainText(code);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      page.viewportSize().width
    );
  });

  for (const clipboard of ['missing', 'rejected']) {
    test(`product code stays selectable when clipboard is ${clipboard} (${lang})`, async ({
      page
    }) => {
      await page.addInitScript(mode => {
        Object.defineProperty(navigator, 'clipboard', {
          configurable: true,
          value:
            mode === 'missing'
              ? undefined
              : {writeText: () => Promise.reject(new Error('Clipboard denied'))}
        });
        document.execCommand = () => false;
      }, clipboard);
      await openSite(page, 'product', lang);
      const code = (await page.locator('#vf-product-code').innerText()).trim();
      await page.getByRole('button', {name: copyLabel[lang], exact: true}).click();
      await expect(page.locator('.ag-toast__title')).toContainText(
        lang === 'en' ? 'The code is selected' : 'کد انتخاب شده است'
      );
      expect(await page.evaluate(() => getSelection().toString())).toBe(code);
    });
  }
}
