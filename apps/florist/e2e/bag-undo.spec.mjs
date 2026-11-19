import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

for (const lang of ['en', 'fa']) {
  test(`undo restores a configured line without reverting other items (${lang})`, async ({
    page
  }, info) => {
    const fa = lang === 'fa';
    await openSite(page, 'bag', lang);
    const rows = page.locator('.vf-bag-line');
    const remove = row => row.getByRole('button', {name: fa ? 'حذف' : 'Remove', exact: true});
    const more = row => row.getByRole('button', {name: fa ? 'بیشتر' : 'More', exact: true});
    const undo = page.getByRole('button', {name: fa ? 'بازگردانی' : 'Undo', exact: true});
    await more(rows.first()).click();
    const configured = await rows.first().textContent();
    const configuredLine = await page.evaluate(() => window.__vfSite.state.bag[0]);
    await remove(rows.first()).click();
    await expect(rows).toHaveCount(1);
    await expect(undo).toBeFocused();
    await expect(page.locator('.vf-bag-undo')).toContainText('VF-7K2M4Q');
    await page.screenshot({path: `/tmp/vendra-bag-undo-${lang}-${info.project.name}.png`});
    await more(rows.first()).click();
    const other = await rows.first().textContent();
    const otherLine = await page.evaluate(() => window.__vfSite.state.bag[0]);
    // Undo stays available while the customer reads or changes another quantity.
    await page.clock.install();
    await page.clock.fastForward(30000);
    await undo.focus();
    await undo.press('Enter');
    await expect(rows).toHaveCount(2);
    await expect(rows.first()).toHaveText(configured);
    await expect(rows.nth(1)).toHaveText(other);
    expect(await page.evaluate(() => window.__vfSite.state.bag)).toEqual([
      configuredLine,
      otherLine
    ]);
    await expect(remove(rows.first())).toBeFocused();
    await expect(undo).toHaveCount(0);
    await page.reload();
    await expect(rows).toHaveCount(2);
    await expect(rows.first()).toHaveText(configured);
    await expect(rows.nth(1)).toHaveText(other);
    expect(await page.evaluate(() => window.__vfSite.state.bag)).toEqual([
      configuredLine,
      otherLine
    ]);
    // Removing the final line must leave Undo available beside the empty state.
    await remove(rows.first()).click();
    await remove(rows.first()).click();
    await expect(rows).toHaveCount(0);
    await expect(page.locator('.vf-bag-empty')).toBeVisible();
    await page.screenshot({path: `/tmp/vendra-bag-empty-undo-${lang}-${info.project.name}.png`});
    await expect(undo).toBeFocused();
    expect(await scanAxe(page)).toEqual([]);
    await undo.press('Enter');
    await expect(rows).toHaveCount(1);
    await expect(rows.first()).toHaveText(other);
    expect(await page.evaluate(() => window.__vfSite.state.bag)).toEqual([otherLine]);
    await expect(remove(rows.first())).toBeFocused();
    await expect(page.locator('.vf-bag-empty')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
    expect(await scanAxe(page)).toEqual([]);
  });
}
