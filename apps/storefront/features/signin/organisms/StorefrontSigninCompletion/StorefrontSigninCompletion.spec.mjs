import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';

for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          heading: 'شما وارد شدید',
          body: 'حساب شما آماده است.',
          checkout: 'بازگشت به پرداخت',
          account: 'ورود به حساب',
          prompt: 'نام خود را اضافه کنید.',
          profile: 'ویرایش پروفایل'
        }
      : {
          heading: 'You are signed in',
          body: 'Your account is ready.',
          checkout: 'Return to checkout',
          account: 'Open account',
          prompt: 'Add your name.',
          profile: 'Edit profile'
        };
  test(
    'completion heading, optional name prompt and checkout callback (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontSigninCompletion', lang);
      await expect(page.getByRole('heading', {name: t.heading, level: 1})).toBeVisible();
      await expect(page.getByText(t.body, {exact: true})).toBeVisible();
      const profile = page.getByRole('link', {name: t.profile});
      await expect(profile).toHaveAttribute('href', '#profile');
      await expect(profile.locator('..')).toContainText(t.prompt);
      const checkout = page.getByRole('link', {name: t.checkout});
      await expect(checkout).toHaveAttribute('href', '#checkout');
      await expect(page.getByRole('link', {name: t.account})).toHaveAttribute('href', '#account');
      await checkout.click();
      await expect(page.locator('[data-test=continued]')).toHaveText('1');
      expect(new URL(page.url()).hash).toBe('');
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Name prompt'}).uncheck();
      await expect(profile).toHaveCount(0);
      await expect(page.getByText(t.prompt, {exact: true})).toHaveCount(0);
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test('completion flags independently control action groups (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontSigninCompletion', lang);
    await page.getByRole('checkbox', {name: 'Checkout actions'}).uncheck();
    await expect(page.getByRole('link', {name: t.checkout})).toHaveCount(0);
    await expect(page.getByRole('link', {name: t.account})).toHaveCount(0);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: 'Account action', exact: true}).check();
    await expect(page.getByRole('link', {name: t.account})).toHaveCount(1);
    const account = page.getByRole('link', {name: t.account});
    await account.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#account$/);
    await expect(page.locator('[data-test=continued]')).toHaveText('0');
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: 'Checkout actions'}).check();
    await expect(page.getByRole('link', {name: t.account})).toHaveCount(2);
    await expect(page.locator('a').allTextContents()).resolves.toEqual([
      t.profile,
      t.checkout,
      t.account,
      t.account
    ]);
  });
  test('completion compact content stays contained (' + lang + ')', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await openStorefrontComponent(page, 'StorefrontSigninCompletion', lang);
    await expect(page.getByRole('heading', {level: 1})).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    expect(await scanAxe(page)).toEqual([]);
  });
}
