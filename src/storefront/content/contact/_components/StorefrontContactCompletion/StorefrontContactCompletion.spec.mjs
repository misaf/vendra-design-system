import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          title: 'پیام دریافت شد',
          body: 'از طریق اطلاعات تماس شما پاسخ می‌دهیم.',
          alternate: 'نمایش کامل شد',
          alternateBody: 'در این نمایش پیامی ارسال نشد.',
          edit: 'بازگشت به فرم'
        }
      : {
          title: 'Message received',
          body: 'We will reply using your contact details.',
          alternate: 'Demo complete',
          alternateBody: 'This demo did not send a message.',
          edit: 'Return to form'
        };
  test(
    'contact completion supplied feedback and stable focus target (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontContactCompletion', lang);
      const region = page.getByRole('region', {name: t.title, exact: true});
      await expect(region).toHaveAttribute('id', 'vf-contact-success');
      await expect(region).toHaveAttribute('tabindex', '-1');
      await expect(region.getByText(t.title, {exact: true})).toBeVisible();
      await expect(region.getByText(t.body, {exact: true})).toBeVisible();
      await region.focus();
      await expect(region).toBeFocused();
      await page.getByRole('checkbox', {name: 'Alternate supplied content'}).check();
      const updated = page.getByRole('region', {name: t.alternate, exact: true});
      await expect(updated).toHaveAttribute('id', 'vf-contact-success');
      await expect(updated.getByText(t.alternateBody, {exact: true})).toBeVisible();
      await expect(page.locator('[data-test=edited]')).toHaveText('0');
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test('contact completion edit pointer and keyboard callbacks (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontContactCompletion', lang);
    const region = page.getByRole('region', {name: t.title, exact: true});
    const edit = region.getByRole('button', {name: t.edit, exact: true});
    await edit.click();
    await expect(page.locator('[data-test=edited]')).toHaveText('1');
    await edit.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-test=edited]')).toHaveText('2');
    await page.keyboard.press('Space');
    await expect(page.locator('[data-test=edited]')).toHaveText('3');
    await expect(region).toBeVisible();
  });
  test(
    'contact completion owner visibility and compact accessibility (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      await openStorefrontComponent(page, 'StorefrontContactCompletion', lang);
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Alternate supplied content'}).check();
      expect(await scanAxe(page)).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      await page.getByRole('checkbox', {name: 'Show completion'}).uncheck();
      await expect(page.locator('#vf-contact-success')).toHaveCount(0);
      await page.getByRole('checkbox', {name: 'Show completion'}).check();
      await expect(page.getByRole('region', {name: t.alternate, exact: true})).toBeVisible();
    }
  );
}
