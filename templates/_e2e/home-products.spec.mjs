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

for (const lang of ['en', 'fa']) {
  for (const width of [390, 768, 1280]) {
    test(`all home collections share accessible carousel controls at ${width}px (${lang})`, async ({
      page
    }) => {
      await page.emulateMedia({reducedMotion: 'reduce'});
      await page.setViewportSize({width, height: 900});
      await openSite(page, 'home', lang);
      for (const [selector, desktopCount] of [
        ['.vf-home-category-circles', 9],
        ['.vf-home-category-row', 4],
        ['.vf-home-journal-row', 3]
      ]) {
        const carousel = page.locator(selector);
        const track = carousel.getByRole('region');
        await expect(track).toHaveAccessibleName(/.+/);
        const cards = track.locator('.ag-carousel__item');
        if (selector === '.vf-home-category-row') {
          await expect(cards.locator('img')).toHaveCount(await cards.count());
          await expect
            .poll(() =>
              cards
                .first()
                .locator('img')
                .evaluate(image => image.complete && image.naturalWidth > 0)
            )
            .toBe(true);
        }
        expect((await cards.first().boundingBox()).width).toBeGreaterThanOrEqual(
          selector.includes('circles') ? 100 : 220
        );
        const previous = carousel.getByRole('button').first();
        const next = carousel.getByRole('button').nth(1);
        for (const button of [previous, next]) {
          await expect(button).toBeVisible();
          const box = await button.boundingBox();
          expect(Math.min(box.width, box.height)).toBeGreaterThanOrEqual(44);
        }
        await expect(previous).toBeDisabled();
        if (width < 1024 || (await cards.count()) > desktopCount) {
          await expect(next).toBeEnabled();
          await next.tap();
          await expect
            .poll(() => track.evaluate(element => Math.abs(element.scrollLeft)))
            .toBeGreaterThan(1);
          await cards.last().getByRole('link').focus();
          await expect(cards.last().getByRole('link')).toBeFocused();
          await expect(previous).toBeEnabled();
        } else {
          await expect(next).toBeDisabled();
          expect(
            await track.evaluate(element => element.scrollWidth - element.clientWidth)
          ).toBeLessThanOrEqual(1);
        }
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
      if (width === 390) expect(await scanAxe(page)).toEqual([]);
    });
  }
}

for (const lang of ['en', 'fa']) {
  test(`compact spacing and full-width phone headings keep touch targets readable (${lang})`, async ({
    page
  }) => {
    await page.setViewportSize({width: 390, height: 844});
    await openSite(page, 'home', lang);
    const spacing = () =>
      page.locator('.vf-page').evaluate(element => {
        const style = getComputedStyle(element);
        return {section: style.getPropertyValue('--space-9').trim(), body: style.fontSize};
      });
    expect(await spacing()).toEqual({section: '2.5rem', body: '16px'});
    for (const selector of ['.vf-home-featured', '.vf-home-arrivals', '.vf-home-journal']) {
      const section = page.locator(selector);
      const title = await section.locator('.ag-sechead__title').boundingBox();
      const action = await section.locator('.ag-sechead__actions').boundingBox();
      const heading = await section.locator('.ag-sechead').boundingBox();
      expect(title.y).toBeGreaterThanOrEqual(action.y + action.height);
      expect(title.width).toBeGreaterThanOrEqual(heading.width - 1);
      expect(
        parseFloat(await section.evaluate(element => getComputedStyle(element).paddingBlockStart))
      ).toBeLessThanOrEqual(32);
    }
    for (const button of await page.locator('.vf-home-carousel .ag-carousel__nav button').all()) {
      const box = await button.boundingBox();
      expect(Math.min(box.width, box.height)).toBeGreaterThanOrEqual(44);
    }
    await page.setViewportSize({width: 768, height: 1024});
    expect((await spacing()).section).toBe('2.5rem');
    await page.setViewportSize({width: 1180, height: 820});
    expect((await spacing()).section).toBe('2.5rem');
    await page.setViewportSize({width: 1440, height: 900});
    expect((await spacing()).section).toBe('6rem');
    await page.setViewportSize({width: 768, height: 1024});
    await openSite(page, 'home', lang, {tv: '1'});
    expect((await spacing()).section).toBe('9rem');
  });
}
