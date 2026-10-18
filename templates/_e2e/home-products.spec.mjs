import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

test.use({hasTouch: true});

for (const lang of ['en', 'fa']) {
  for (const width of [390, 768, 1280]) {
    test(`home product carousels remain readable and navigable at ${width}px (${lang})`, async ({
      page
    }) => {
      await page.emulateMedia({reducedMotion: 'reduce'});
      await page.setViewportSize({width, height: 900});
      await openSite(page, 'home', lang);
      for (const selector of ['.vf-home-featured-products', '.vf-home-product-row']) {
        const carousel = page.locator(selector);
        const track = carousel.getByRole('region');
        await expect(track).toHaveAccessibleName(/.+/);
        const previous = carousel.getByRole('button').first();
        const next = carousel.getByRole('button').nth(1);
        await expect(previous).toBeVisible();
        await expect(previous).toBeDisabled();
        const target = await next.boundingBox();
        expect(Math.min(target.width, target.height)).toBeGreaterThanOrEqual(44);
        const cards = carousel.locator('.ag-product');
        expect((await cards.first().boundingBox()).width).toBeGreaterThanOrEqual(
          width === 390 ? 260 : 220
        );
        if (width < 1024 || (await cards.count()) > 4) {
          await expect(next).toBeEnabled();
          await next.tap();
          await expect
            .poll(() => track.evaluate(element => Math.abs(element.scrollLeft)))
            .toBeGreaterThan(100);
          await previous.tap();
          await expect(previous).toBeDisabled();
          if (width === 390) {
            await track.scrollIntoViewIfNeeded();
            const box = await track.boundingBox();
            const session = await page.context().newCDPSession(page);
            const start = box.x + box.width * (lang === 'fa' ? 0.2 : 0.8);
            const end = box.x + box.width * (lang === 'fa' ? 0.8 : 0.2);
            const y = box.y + box.height / 2;
            await session.send('Input.dispatchTouchEvent', {
              type: 'touchStart',
              touchPoints: [{x: start, y}]
            });
            for (let step = 1; step <= 8; step++)
              await session.send('Input.dispatchTouchEvent', {
                type: 'touchMove',
                touchPoints: [{x: start + ((end - start) * step) / 8, y}]
              });
            await session.send('Input.dispatchTouchEvent', {type: 'touchEnd', touchPoints: []});
            await session.detach();
            await expect
              .poll(() => track.evaluate(element => Math.abs(element.scrollLeft)))
              .toBeGreaterThan(100);
            await expect(previous).toBeEnabled();
          }
          // A keyboard can reach the last design without swiping or using a mouse.
          await cards.last().locator('.ag-product__link').focus();
          await expect
            .poll(() => track.evaluate(element => Math.abs(element.scrollLeft)))
            .toBeGreaterThan(100);
        } else {
          expect(
            await track.evaluate(element => element.scrollWidth - element.clientWidth)
          ).toBeLessThanOrEqual(1);
        }
        const link = cards.last().locator('.ag-product__link');
        await link.focus();
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Tab');
        await expect(link).toBeFocused();
        expect(
          await cards.last().evaluate(element => parseFloat(getComputedStyle(element).outlineWidth))
        ).toBeGreaterThan(0);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
      if (width === 390) expect(await scanAxe(page)).toEqual([]);
    });
  }
}
