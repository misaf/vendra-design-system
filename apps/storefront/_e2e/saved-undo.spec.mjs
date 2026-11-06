import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

test.use({hasTouch: true});

for (const lang of ['en', 'fa']) {
  test(`saved removal can be undone without reverting other removals (${lang})`, async ({
    page
  }, info) => {
    const fa = lang === 'fa';
    await openSite(page, 'saved', lang);
    const cards = page.locator('main .ag-product');
    const names = page.locator('main .ag-product__name');
    const initial = await names.allTextContents();
    const remove = () =>
      cards
        .first()
        .getByRole('button', {name: fa ? 'حذف از ذخیره‌ها' : 'Remove from saved', exact: true})
        .click();
    const undo = page.getByRole('button', {name: fa ? 'بازگردانی' : 'Undo', exact: true});
    await remove();
    await expect(cards).toHaveCount(2);
    await expect(undo).toBeFocused();
    await expect(page.locator('.vf-saved-undo')).toContainText(initial[0]);
    expect((await undo.boundingBox()).height).toBeGreaterThanOrEqual(44);
    await page.screenshot({path: `/tmp/vendra-saved-undo-${lang}-${info.project.name}.png`});
    await undo.press('Enter');
    await expect(names).toHaveText(initial);
    await expect(cards.first().locator('.ag-product__fav')).toBeFocused();
    await expect(undo).toHaveCount(0);
    await page.reload();
    await expect(names).toHaveText(initial);
    await remove();
    await remove();
    await undo.press('Enter');
    await expect(names).toHaveText(initial.slice(1));
    await expect(cards.first().locator('.ag-product__fav')).toBeFocused();
    await remove();
    await remove();
    await expect(cards).toHaveCount(0);
    await expect(page.locator('.vf-saved-empty')).toBeVisible();
    await expect(undo).toBeFocused();
    await page.screenshot({path: `/tmp/vendra-saved-empty-undo-${lang}-${info.project.name}.png`});
    expect(await scanAxe(page)).toEqual([]);
    await undo.press('Enter');
    await expect(names).toHaveText(initial.slice(-1));
    await expect(cards.first().locator('.ag-product__fav')).toBeFocused();
    await expect(page.locator('.vf-saved-empty')).toHaveCount(0);
    await page.evaluate(() => window.scrollTo(0, 0));
    expect(await scanAxe(page)).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
    await page.reload();
    await expect(names).toHaveText(initial.slice(-1));
  });
}
