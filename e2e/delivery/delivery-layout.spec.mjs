import {test, expect} from '@playwright/test';
import {openSite, scanAxe, settlePage} from '../helpers.mjs';
import {VISUAL_BROWSER} from '../visual-browser.mjs';

test.use({...VISUAL_BROWSER, hasTouch: true});

const copy = {
  en: {
    items: 'Show items (2)',
    edit: /^Edit Card for/,
    day: 'Delivery day',
    totals: ['Subtotal', 'Delivery', 'Total before delivery'],
    next: 'Continue to payment',
    message: 'Thank you for everything!'
  },
  fa: {
    items: 'نمایش اقلام (۲)',
    edit: /^ویرایش کارت برای/,
    day: 'روز ارسال',
    totals: ['جمع جزء', 'هزینه ارسال', 'جمع پیش از ارسال'],
    next: 'ادامه و پرداخت',
    message: 'برای همه چیز ممنونم!'
  }
};

for (const lang of ['en', 'fa']) {
  for (const width of [320, 390]) {
    test(`compact delivery layout (${lang}, ${width})`, async ({page}, info) => {
      test.skip(info.project.name !== 'mobile', 'Phone widths');
      const t = copy[lang];
      await page.setViewportSize({width, height: 844});
      await page.clock.setFixedTime(new Date('2026-10-05T09:00:00+03:30'));
      await openSite(page, 'bag', lang, {step: 'delivery'});
      await settlePage(page);

      await expect(page.locator('.ag-tabbar')).toHaveCount(0);
      await expect(page.getByRole('contentinfo')).toBeVisible();
      await expect(
        page.locator('.vf-shell-bottom-bar').getByRole('button', {name: t.next})
      ).toBeVisible();
      const summary = page.locator('.vf-bag-summary');
      const items = summary.locator('.ag-osum__lines');
      await expect(items).toBeHidden();
      await expect(summary.locator('dt')).toHaveText(t.totals);
      const days = page.getByRole('radiogroup', {name: t.day});
      await expect(days.getByRole('radio')).toHaveCount(7);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
      expect(await days.evaluate(group => group.scrollWidth > group.clientWidth)).toBe(true);
      expect(
        await days
          .locator('.ag-choice')
          .evaluateAll(tiles => new Set(tiles.map(tile => tile.offsetTop)).size)
      ).toBe(1);
      expect(await scanAxe(page)).toEqual([]);
      await expect(page).toHaveScreenshot(`bag-delivery-${lang}-${width}.png`, {fullPage: true});

      const disclosure = summary.getByText(t.items, {exact: true});
      await disclosure.press('Enter');
      await expect(items.getByRole('listitem')).toHaveCount(2);
      await expect(items).toBeVisible();
      await expect(summary.locator('dt')).toHaveText(t.totals);
      await disclosure.press('Space');
      await expect(items).toBeHidden();

      const edit = page.getByRole('button', {name: t.edit});
      const message = page.locator('#vf-card-0');
      const previewHeight = (await message.boundingBox()).height;
      await edit.press('Enter');
      await expect(message).toBeFocused();
      expect((await message.boundingBox()).height).toBeGreaterThan(previewHeight);
      await message.fill(t.message);
      await disclosure.focus();
      await expect(message).toHaveValue(t.message);
      expect((await message.boundingBox()).height).toBe(previewHeight);

      const selectedDay = days.getByRole('radio', {checked: true});
      const lastDay = days.getByRole('radio', {disabled: false}).last();
      await selectedDay.focus();
      const forward = lang === 'fa' ? 'ArrowLeft' : 'ArrowRight';
      for (let index = 0; index < 7 && !(await lastDay.isChecked()); index++) {
        await days.getByRole('radio', {checked: true}).press(forward);
      }
      await expect(lastDay).toBeChecked();
      await expect(days.locator('.ag-choice[data-selected]')).toBeInViewport({ratio: 0.95});
    });
  }
}
