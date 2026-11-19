import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          title: 'درخواست دریافت شد',
          body: 'درباره مراسم شما پاسخ می‌دهیم.',
          alternate: 'نمایش کامل شد',
          alternateBody: 'در این نمایش درخواستی ارسال نشد.',
          edit: 'بازگشت به درخواست'
        }
      : {
          title: 'Inquiry received',
          body: 'We will reply about your event.',
          alternate: 'Demo complete',
          alternateBody: 'This demo did not send an inquiry.',
          edit: 'Return to inquiry'
        };
  test('wedding completion content and stable focus target (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontWeddingsCompletion', lang);
    const region = page.getByRole('region', {name: t.title, exact: true});
    await expect(region).toHaveAttribute('id', 'vf-weddings-success');
    await expect(region).toHaveAttribute('tabindex', '-1');
    await expect(region.getByText(t.body, {exact: true})).toBeVisible();
    await region.focus();
    await expect(region).toBeFocused();
    await page.getByRole('checkbox', {name: 'Alternate content'}).check();
    const updated = page.getByRole('region', {name: t.alternate, exact: true});
    await expect(updated).toHaveAttribute('id', 'vf-weddings-success');
    await expect(updated.getByText(t.alternateBody, {exact: true})).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
  });
  test('wedding completion pointer and keyboard edit callbacks (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontWeddingsCompletion', lang);
    const edit = page.getByRole('button', {name: t.edit, exact: true});
    await edit.click();
    await expect(page.locator('[data-test=edited]')).toHaveText('1');
    await edit.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-test=edited]')).toHaveText('2');
    await page.keyboard.press('Space');
    await expect(page.locator('[data-test=edited]')).toHaveText('3');
    await expect(page.getByRole('region', {name: t.title, exact: true})).toBeVisible();
  });
  test(
    'wedding completion owner visibility and compact accessibility (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      await openStorefrontComponent(page, 'StorefrontWeddingsCompletion', lang);
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Alternate content'}).check();
      expect(await scanAxe(page)).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      await page.getByRole('checkbox', {name: 'Show completion'}).uncheck();
      await expect(page.locator('#vf-weddings-success')).toHaveCount(0);
      await page.getByRole('checkbox', {name: 'Show completion'}).check();
      await expect(page.getByRole('region', {name: t.alternate, exact: true})).toBeVisible();
      await expect(page.locator('[data-test=edited]')).toHaveText('0');
    }
  );
}
