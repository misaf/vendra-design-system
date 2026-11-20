import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          title: 'حریم خصوصی شما',
          body: 'درباره تحلیل‌های اختیاری تصمیم بگیرید.',
          policy: 'سیاست حریم خصوصی',
          close: 'بستن اعلان حریم خصوصی',
          accept: 'پذیرفتن همه',
          essential: 'فقط ضروری'
        }
      : {
          title: 'Your privacy',
          body: 'Choose whether to allow optional analytics.',
          policy: 'Privacy policy',
          close: 'Close privacy notice',
          accept: 'Accept all',
          essential: 'Essential only'
        };
  test(
    'consent supplied content, focus target and native policy destination (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontConsent', lang);
      const notice = page.getByRole('region', {name: t.title, exact: true});
      await expect(notice).toHaveAttribute('id', 'vf-consent');
      await expect(notice).toHaveAttribute('tabindex', '-1');
      await expect(notice.getByRole('heading', {name: t.title, exact: true})).toHaveAttribute(
        'id',
        'vf-consent-title'
      );
      await expect(notice.getByText(t.body, {exact: false})).toBeVisible();
      await notice.focus();
      await expect(notice).toBeFocused();
      const policy = notice.getByRole('link', {name: t.policy, exact: true});
      await expect(policy).toHaveAttribute('href', '#privacy');
      await policy.focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/#privacy$/);
      for (const key of ['close', 'accept', 'essential'])
        await expect(page.locator('[data-test=' + key + ']')).toHaveText('0');
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'consent pointer and keyboard actions stay isolated and controlled (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontConsent', lang);
      const notice = page.getByRole('region', {name: t.title, exact: true});
      for (const key of ['close', 'accept', 'essential']) {
        const button = notice.getByRole('button', {name: t[key], exact: true});
        await button.click();
        await expect(page.locator('[data-test=' + key + ']')).toHaveText('1');
        await button.focus();
        await page.keyboard.press('Enter');
        await expect(page.locator('[data-test=' + key + ']')).toHaveText('2');
        await page.keyboard.press('Space');
        await expect(page.locator('[data-test=' + key + ']')).toHaveText('3');
        await expect(notice).toBeVisible();
      }
      for (const key of ['close', 'accept', 'essential'])
        await expect(page.locator('[data-test=' + key + ']')).toHaveText('3');
      const close = notice.getByRole('button', {name: t.close, exact: true});
      await close.focus();
      for (const [role, name] of [
        ['link', t.policy],
        ['button', t.accept],
        ['button', t.essential]
      ]) {
        await page.keyboard.press('Tab');
        await expect(notice.getByRole(role, {name, exact: true})).toBeFocused();
      }
    }
  );
  test('consent visibility and responsive accessibility (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontConsent', lang);
    const notice = page.getByRole('region', {name: t.title, exact: true});
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({width, height: 900});
      await expect(notice).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      expect(await scanAxe(page)).toEqual([]);
    }
    await page.getByRole('checkbox', {name: 'Show notice', exact: true}).uncheck();
    await expect(notice).toHaveCount(0);
    await expect(page.locator('#vf-consent')).toHaveCount(0);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: 'Show notice', exact: true}).check();
    await expect(notice).toBeVisible();
    for (const key of ['close', 'accept', 'essential'])
      await expect(page.locator('[data-test=' + key + ']')).toHaveText('0');
  });
}
