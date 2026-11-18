import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

test.use({hasTouch: true});

for (const lang of ['en', 'fa']) {
  for (const width of [320, 390, 768, 927, 928, 1280, 1920]) {
    test(`bag rows keep product details readable (${lang}, ${width})`, async ({page}) => {
      await page.setViewportSize({width, height: 1000});
      await openSite(page, 'bag', lang);
      const row = page.locator('.vf-bag-line .ag-line').first();
      await expect(row).toBeVisible();
      await expect(row.locator('.ag-line__name')).toHaveText(/^VF-/);
      const summary = page.locator('.vf-bag-summary');
      const summaryLines = summary.getByRole('list');
      await expect(summary.locator('.ag-osum__sums')).toBeVisible();
      if (width < 928) {
        await expect(summaryLines).toHaveCount(0);
        expect((await summary.boundingBox()).y).toBeGreaterThan((await row.boundingBox()).y);
      } else {
        await expect(summaryLines.getByRole('listitem')).toHaveCount(
          await page.locator('.vf-bag-line').count()
        );
        const itemsBox = await page.locator('.vf-bag-items').boundingBox();
        const summaryBox = await summary.boundingBox();
        const [left, right] = lang === 'fa' ? [summaryBox, itemsBox] : [itemsBox, summaryBox];
        expect(left.x + left.width).toBeLessThan(right.x);
      }
      const boxes = await row.evaluate(el => {
        const box = selector => {
          const r = el.querySelector(selector).getBoundingClientRect();
          return {width: r.width, top: r.top, left: r.left};
        };
        return {width: el.clientWidth, main: box('.ag-line__main'), end: box('.ag-line__end')};
      });
      if (boxes.width <= 480) {
        expect(boxes.main.width).toBeGreaterThanOrEqual(boxes.width - 102);
        expect(boxes.end.top).toBeGreaterThan(boxes.main.top);
        expect(Math.abs(boxes.end.left - boxes.main.left)).toBeLessThan(1);
      } else {
        expect(Math.abs(boxes.end.top - boxes.main.top)).toBeLessThan(1);
      }
      for (const button of await row.locator('button').all()) {
        expect((await button.boundingBox()).height).toBeGreaterThanOrEqual(44);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        width
      );
      if (width === 390) expect(await scanAxe(page)).toEqual([]);
      if (width === 390 || width === 768)
        await page.screenshot({path: `/tmp/vendra-bag-${lang}-${width}.png`, fullPage: true});
    });
  }

  test(`delivery can expand the itemized summary on phones (${lang})`, async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await openSite(page, 'bag', lang);
    const itemCount = await page.locator('.vf-bag-line').count();
    await page.locator('.vf-mobile-action').getByRole('button').click();
    await expect(page).toHaveURL(/step=delivery/);
    const summary = page.locator('.vf-bag-summary');
    const items = summary.getByRole('listitem');
    await expect(items).toHaveCount(0);
    await summary.locator('.ag-osum__items > summary').click();
    await expect(items).toHaveCount(itemCount);
  });
}
