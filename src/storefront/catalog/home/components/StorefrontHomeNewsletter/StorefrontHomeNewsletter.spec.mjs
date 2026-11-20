import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          title: 'نامه‌های استودیو',
          description: 'گاه‌به‌گاه خبر گل‌ها را با ایمیل بخوانید.',
          email: 'نشانی ایمیل',
          submit: 'عضویت',
          sending: 'در حال عضویت…',
          done: 'عضو شدید.',
          error: 'نشانی ایمیل را بررسی کنید.'
        }
      : {
          title: 'Studio letters',
          description: 'Occasional flower news by email.',
          email: 'Email address',
          submit: 'Subscribe',
          sending: 'Subscribing…',
          done: 'You are subscribed.',
          error: 'Check your email address.'
        };
  test('newsletter content, labels and external email value (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontHomeNewsletter', lang);
    await expect(page.getByRole('heading', {level: 2, name: t.title, exact: true})).toHaveAttribute(
      'id',
      'vf-news-title'
    );
    await expect(page.getByText(t.description, {exact: true})).toBeVisible();
    const input = page.getByRole('textbox', {name: t.email, exact: true});
    await expect(input).toHaveAttribute('id', 'vf-news-email');
    await expect(input).toHaveAttribute('type', 'email');
    await expect(input).toHaveAttribute('dir', 'ltr');
    await expect(input).toHaveAttribute('autocomplete', 'email');
    await expect(input).toHaveAttribute('aria-labelledby', 'vf-news-email-label');
    await expect(page.locator('form')).toHaveJSProperty('noValidate', true);
    await expect(page.getByRole('button', {name: t.submit, exact: true})).toHaveAttribute(
      'aria-labelledby',
      'vf-news-submit-label'
    );
    await page.getByRole('button', {name: 'Set supplied email'}).click();
    await expect(input).toHaveValue('mina@example.com');
    await expect(page.locator('[data-test=changes]')).toHaveText('0');
  });
  test(
    'newsletter controlled typing and native submit callbacks (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontHomeNewsletter', lang);
      const input = page.getByRole('textbox', {name: t.email, exact: true});
      await input.fill('not-an-email');
      await expect(page.locator('[data-test=changes]')).toHaveText('1');
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-test=sent]')).toHaveText('1');
      await expect(page.locator('[data-test=submitted]')).toHaveText('not-an-email');
      await input.fill('sara@example.com');
      await page.keyboard.press('Tab');
      const submit = page.getByRole('button', {name: t.submit, exact: true});
      await expect(submit).toBeFocused();
      await page.keyboard.press('Space');
      await expect(page.locator('[data-test=sent]')).toHaveText('2');
      await submit.click();
      await expect(page.locator('[data-test=sent]')).toHaveText('3');
      await expect(page.locator('[data-test=submitted]')).toHaveText('sara@example.com');
    }
  );
  test('newsletter supplied error clearing retains draft (' + lang + ')', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await openStorefrontComponent(page, 'StorefrontHomeNewsletter', lang);
    const input = page.getByRole('textbox', {name: t.email, exact: true});
    await input.fill('draft@example.com');
    await page.getByRole('checkbox', {name: 'Show error'}).check();
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveAccessibleDescription(t.error);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: 'Show error'}).uncheck();
    await expect(input).not.toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveAccessibleDescription('');
    await expect(input).toHaveValue('draft@example.com');
    expect(await scanAxe(page)).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
  });
  test(
    'newsletter pending activation guard and persistent completion label (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontHomeNewsletter', lang);
      await page.getByRole('button', {name: 'Set supplied email'}).click();
      const submit = page.getByRole('button', {name: t.submit, exact: true});
      await submit.focus();
      await page.getByRole('checkbox', {name: 'Sending', exact: true}).check();
      await expect(submit).toBeDisabled();
      await expect(page.getByRole('status')).toHaveText(t.sending);
      await submit.click({force: true});
      await submit.focus();
      await page.keyboard.press('Enter');
      await page.keyboard.press('Space');
      await expect(page.locator('[data-test=sent]')).toHaveText('0');
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('button', {name: 'Complete externally'}).click();
      await expect(page.locator('form')).toHaveCount(0);
      await expect(page.locator('#vf-news-submit-label')).toHaveText(t.submit);
      const done = page.getByRole('status');
      await expect(done).toHaveAttribute('id', 'vf-news-done');
      await expect(done).toHaveAttribute('tabindex', '-1');
      await expect(done).toHaveText(t.done);
      await done.focus();
      await expect(done).toBeFocused();
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'newsletter form and completion visibility are independent (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      await openStorefrontComponent(page, 'StorefrontHomeNewsletter', lang);
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Show completion'}).check();
      await expect(page.getByRole('textbox', {name: t.email, exact: true})).toBeVisible();
      await expect(page.locator('#vf-news-done')).toHaveText(t.done);
      await page.getByRole('checkbox', {name: 'Show form'}).uncheck();
      await expect(page.locator('form')).toHaveCount(0);
      await expect(page.locator('#vf-news-done')).toBeVisible();
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Show completion'}).uncheck();
      await expect(page.locator('#vf-news-done')).toHaveCount(0);
      await expect(page.getByRole('heading', {level: 2, name: t.title, exact: true})).toBeVisible();
      await expect(page.locator('#vf-news-submit-label')).toHaveText(t.submit);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
    }
  );
}
