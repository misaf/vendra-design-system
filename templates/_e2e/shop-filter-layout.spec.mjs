import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

test.use({hasTouch: true});

for (const lang of ['en', 'fa']) {
  for (const viewport of [
    {width: 390, height: 844},
    {width: 390, height: 480},
    {width: 768, height: 600}
  ]) {
    test(`shop filter actions stay visible while options scroll (${lang}, ${viewport.width}x${viewport.height})`, async ({
      page
    }) => {
      await page.setViewportSize(viewport);
      await openSite(page, 'shop', lang, {stock: '1'});
      const fa = lang === 'fa';
      const opener = page.getByRole('button', {name: fa ? /^فیلترها/ : /^Filters/});
      await opener.click();
      const dialog = page.getByRole('dialog', {name: fa ? 'فیلترها' : 'Filters', exact: true});
      await expect(dialog).toBeVisible();
      const actions = dialog.locator('.vf-shop-dialog-actions');
      const show = actions.getByRole('button', {name: fa ? /^نمایش/ : /^Show/});
      const clear = actions.getByRole('button', {
        name: fa ? 'پاک کردن فیلترها' : 'Clear filters',
        exact: true
      });
      // Measure after the opening animation, so movement comes only from scrolling.
      await page.evaluate(() =>
        Promise.all(
          document
            .getAnimations()
            .filter(animation => animation.effect?.getComputedTiming().endTime !== Infinity)
            .map(animation => animation.finished.catch(() => {}))
        )
      );
      const before = await actions.boundingBox();
      expect(before.y).toBeGreaterThanOrEqual(0);
      expect(before.y + before.height).toBeLessThanOrEqual(viewport.height);
      const body = dialog.locator('.ag-dialog__body');
      await body.evaluate(element => {
        element.scrollTop = element.scrollHeight;
      });
      const after = await actions.boundingBox();
      expect(Math.abs(after.y - before.y)).toBeLessThan(1);
      for (const button of [show, clear]) {
        const box = await button.boundingBox();
        expect(box.height).toBeGreaterThanOrEqual(44);
        await expect(button).toBeInViewport({ratio: 1});
      }
      const stock = dialog.getByRole('switch', {name: fa ? 'فقط موجود' : 'In stock only'});
      // React Aria keeps the semantic input visually hidden; its label is the tap target.
      const stockControl = dialog.locator('.ag-switch');
      await expect(stockControl).toBeInViewport({ratio: 1});
      await stockControl.click();
      await expect(stock).not.toBeChecked();
      await stock.press('Space');
      await expect(stock).toBeChecked();
      if (viewport.height === 480) {
        expect(await body.evaluate(element => element.scrollHeight > element.clientHeight)).toBe(
          true
        );
      }
      expect(await scanAxe(page)).toEqual([]);
      await page.screenshot({
        path: `/tmp/vendra-shop-filters-${lang}-${viewport.width}x${viewport.height}.png`
      });
      await clear.click();
      await expect(page).not.toHaveURL(/stock=1/);
      await expect(show).toBeVisible();
      await show.click();
      await expect(dialog).toHaveCount(0);
      await expect(opener).toBeFocused();
      await opener.click();
      await expect(dialog).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
      await expect(opener).toBeFocused();
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
    });
  }
}
