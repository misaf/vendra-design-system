import {test, expect} from '@playwright/test';
import {openSite} from './helpers.mjs';

test.use({reducedMotion: 'reduce'});

async function tabTo(page, control) {
  // Respect route autofocus; otherwise use the sequential keyboard path, not locator.focus().
  for (let step = 0; step < 60; step++) {
    if (await control.evaluate(node => node === document.activeElement)) return;
    await page.keyboard.press('Tab');
  }
  await expect(control).toBeFocused();
}

for (const lang of ['en', 'fa']) {
  for (const view of ['journal', 'search']) {
    test(`${view} keyboard filtering and Escape recovery (${lang})`, async ({page}) => {
      await openSite(page, view, lang);
      const field = page.locator('main .ag-search');
      const box = field.getByRole('searchbox');
      const clear = field.locator('.ag-search__clear');
      const results = page.locator(view === 'journal' ? 'main .ag-blog' : 'main .vf-search-result');
      await tabTo(page, box);
      await expect(box).toBeFocused();
      await page.keyboard.type(
        view === 'journal' ? (lang === 'fa' ? 'پاییز' : 'autumn') : 'VF-7K2M4Q'
      );
      await expect(results).toHaveCount(1);
      await expect(clear).toHaveAttribute('tabindex', '-1');
      const url = page.url();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(url);
      await expect(results).toHaveCount(1);
      await expect(box).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(clear).not.toBeFocused();
      await expect(box).not.toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(box).toBeFocused();
      await page.keyboard.press('Escape');
      await expect(box).toHaveValue('');
      await expect(box).toBeFocused();
      await expect(clear).toBeHidden();
      if (view === 'journal') await expect(results).toHaveCount(4);
      else await expect(page).not.toHaveURL(/(?:\?|&)q=[^&]+/);
      await page.keyboard.type('zzzz-missing');
      await expect(results).toHaveCount(0);
      await page.keyboard.press('Escape');
      await expect(box).toHaveValue('');
      await expect(box).toBeFocused();
      if (view === 'journal') await expect(results).toHaveCount(4);
      else await expect(page).not.toHaveURL(/(?:\?|&)q=[^&]+/);
    });
  }
}
