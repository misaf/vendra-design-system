// Customer routes use local demo identity/orders, never real SMS or live account APIs.
import {test, expect} from '@playwright/test';
import {openSite} from './helpers.mjs';
import {reachable, tap, fill, shell, finish} from './device-helpers.mjs';

test.use({reducedMotion: 'reduce'});
test.beforeEach(async ({page}, info) => {
  test.skip(!['touch-phone', 'tablet'].includes(info.project.name), 'dedicated touch projects');
  await page.clock.install({time: new Date('2026-10-05T09:00:00+03:30')});
  expect(await page.evaluate(() => navigator.maxTouchPoints)).toBeGreaterThan(0);
});

const button = (page, name) => page.getByRole('main').getByRole('button', {name, exact: true});

for (const lang of ['en', 'fa']) {
  const fa = lang === 'fa';
  test(`touch sign-in validates then opens the demo account (${lang})`, async ({page}, info) => {
    await openSite(page, 'signin', lang);
    const send = button(page, fa ? 'ارسال کد' : 'Send code');
    await tap(send);
    const phone = page.locator('#vf-phone');
    await expect(phone).toBeFocused();
    await reachable(phone, {scroll: false});
    await expect(page.locator('#vf-signin-errors').getByRole('link')).toHaveCount(1);
    await fill(page, '#vf-phone', '09125649438');
    await tap(send);
    const code = page.locator('#vf-code');
    await expect(code).toBeFocused();
    await reachable(code, {scroll: false});
    await fill(page, '#vf-code', '12');
    await tap(button(page, fa ? 'ورود' : 'Sign in'));
    await expect(code).toBeFocused();
    await reachable(code, {scroll: false});
    await expect(page.locator('#vf-code-errors').getByRole('link')).toHaveCount(1);
    await finish(page, lang, info, code);
    await tap(button(page, fa ? 'تغییر شماره' : 'Change number'));
    await expect(phone).toHaveValue('09125649438');
    await tap(send);
    await expect(code).toHaveValue('');
    await fill(page, '#vf-code', '12345');
    const account = page.getByRole('link', {
      name: fa ? 'رفتن به حساب' : 'Go to my account',
      exact: true
    });
    await expect(account).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('vf-account-phone'))).toBe('09125649438');
    await tap(account);
    await expect(page).toHaveURL(/view=account/);
    await expect(page.locator('main h1')).toBeFocused();
    await shell(page, lang);
  });

  test(`touch profile persists and sign-out protects account history (${lang})`, async ({
    page
  }, info) => {
    await openSite(page, 'account', lang);
    const profileTab = page.getByRole('tab', {name: fa ? 'پروفایل' : 'Profile', exact: true});
    await tap(profileTab);
    await expect(profileTab).toHaveAttribute('aria-selected', 'true');
    await fill(page, '#vf-pname', 'Touch Customer');
    await fill(page, '#vf-pemail', 'touch@');
    const save = button(page, fa ? 'ذخیره تغییرات' : 'Save changes');
    await tap(save);
    const summary = page.locator('#vf-profile-errors');
    // A single profile error deliberately focuses its field, rather than the summary.
    await expect(page.locator('#vf-pemail')).toBeFocused();
    await reachable(page.locator('#vf-pemail'), {scroll: false});
    await expect(summary.getByRole('link')).toHaveCount(1);
    await tap(summary.getByRole('link'));
    await expect(page.locator('#vf-pemail')).toBeFocused();
    await reachable(page.locator('#vf-pemail'), {scroll: false});
    await fill(page, '#vf-pemail', 'touch@example.com');
    await tap(save);
    await expect(
      page.getByRole('status').filter({hasText: fa ? 'تغییرات ذخیره شد' : 'Changes saved'})
    ).toBeVisible();
    await page.reload();
    await tap(profileTab);
    await expect(page.locator('#vf-pname')).toHaveValue('Touch Customer');
    await expect(page.locator('#vf-pemail')).toHaveValue('touch@example.com');
    await finish(page, lang, info, save);
    await tap(button(page, fa ? 'خروج' : 'Sign out'));
    await expect(page.locator('.vf-shopping--home')).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('vf-account-phone'))).toBeNull();
    await page.goBack();
    await expect(page).toHaveURL(/view=signin/);
    await expect(page.locator('#vf-phone')).toBeVisible();
    await shell(page, lang);
    await reachable(page.locator('#vf-phone'));
    await page.reload();
    await expect(page).toHaveURL(/view=signin/);
    expect(await page.evaluate(() => localStorage.getItem('vf-account-phone'))).toBeNull();
  });

  test(`touch order lookup recovers from a mismatched phone (${lang})`, async ({page}, info) => {
    await openSite(page, 'track', lang);
    const find = button(page, fa ? 'پیدا کردن سفارش' : 'Find my order');
    await tap(find);
    await expect(page.locator('#vf-lookup-id')).toBeFocused();
    await reachable(page.locator('#vf-lookup-id'), {scroll: false});
    await fill(page, '#vf-lookup-id', 'vn-10522');
    await fill(page, '#vf-lookup-phone', '09120000000');
    await tap(find);
    const failure = page.locator('#vf-lookup-failed');
    await expect(failure).toBeFocused();
    await reachable(failure, {scroll: false});
    await expect(failure).toContainText(fa ? 'پیدا نشد' : 'We couldn’t find an order');
    await expect(page.locator('#vf-lookup-id')).toHaveValue('vn-10522');
    await fill(page, '#vf-lookup-phone', '+98 912 564 9438');
    await tap(find);
    await expect(page).toHaveURL(/view=track&id=VN-10522/);
    await expect(page.locator('main h1')).toHaveText(fa ? 'سفارش در راه است.' : 'On its way.');
    await expect(page.locator('main h1')).toBeFocused();
    await page.reload();
    await expect(page.locator('main h1')).toHaveText(fa ? 'سفارش در راه است.' : 'On its way.');
    const another = button(page, fa ? 'پیگیری سفارش دیگر' : 'Track another order');
    await finish(page, lang, info, another);
    await tap(another);
    await expect(page.locator('#vf-lookup-id')).toBeFocused();
    await reachable(page.locator('#vf-lookup-id'), {scroll: false});
    await expect(page.locator('#vf-lookup-failed')).toHaveCount(0);
    await shell(page, lang);
  });
}
