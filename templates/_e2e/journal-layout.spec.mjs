import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

test.use({hasTouch: true});

for (const lang of ['en', 'fa']) {
  for (const width of [320, 390, 768]) {
    test(`compact journal keeps categories and stories reachable (${lang}, ${width}px touch)`, async ({
      page
    }) => {
      const fa = lang === 'fa';
      await page.setViewportSize({width, height: 900});
      await openSite(page, 'journal', lang);
      const categories = page.getByRole('group', {
        name: fa ? 'دسته‌بندی مطالب' : 'Story categories'
      });
      const chips = categories.getByRole('button');
      await expect(chips).toHaveCount(8);
      const header = await page.locator('.vf-journal-header').boundingBox();
      expect(header.height).toBeLessThan(170);
      const featured = page.locator('.vf-journal-featured');
      expect((await featured.boundingBox()).y).toBeLessThan(430);
      const titleSize = await page
        .locator('main h1')
        .evaluate(el => parseFloat(getComputedStyle(el).fontSize));
      const storySize = await featured
        .locator('.ag-blog__title')
        .evaluate(el => parseFloat(getComputedStyle(el).fontSize));
      expect(titleSize).toBeLessThanOrEqual(36);
      expect(storySize).toBeLessThan(titleSize);
      for (const chip of await chips.all()) {
        const box = await chip.boundingBox();
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(await chip.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
      }
      const firstY = await chips.first().evaluate(el => el.offsetTop);
      await chips.last().focus();
      await expect(chips.last()).toBeFocused();
      await expect(chips.last()).toBeInViewport({ratio: 1});
      expect(await chips.last().evaluate(el => el.offsetTop)).toBe(firstY);
      await chips.last().press('Enter');
      await expect(chips.last()).toHaveAttribute('aria-pressed', 'true');
      await expect(page.locator('main .ag-blog')).toHaveCount(0);
      await page
        .getByRole('button', {name: fa ? 'پاک کردن جست‌وجو' : 'Clear search', exact: true})
        .click();
      await expect(page.locator('main .ag-blog')).toHaveCount(7);
      await expect(chips.first()).toHaveAttribute('aria-pressed', 'true');
      const search = page.getByRole('searchbox', {name: fa ? 'جست‌وجوی مطالب' : 'Search stories'});
      await search.fill(fa ? 'پاییز' : 'autumn');
      await expect(page.locator('main .ag-blog')).toHaveCount(1);
      await search.press('Escape');
      await expect(page.locator('main .ag-blog')).toHaveCount(7);
      // Return the category scroller to its first control before visual review.
      await chips.first().focus();
      await expect(chips.first()).toBeInViewport({ratio: 1});
      await page.evaluate(() => window.scrollTo(0, 0));
      expect(await scanAxe(page)).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({path: `/tmp/vendra-journal-compact-${lang}-${width}.png`});
      const story = featured.getByRole('link');
      const title = await story.textContent();
      await story.focus();
      await story.press('Enter');
      await expect(page.locator('main h1')).toHaveText(title);
    });
  }
}
