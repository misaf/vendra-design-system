import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../e2e/component-test.mjs';

for (const lang of ['en', 'fa']) {
  const fa = lang === 'fa';
  const retryLabel = fa ? 'جستجوی دوباره' : 'Try another search';
  test(`${lang}: supplied status, heading accent and body update independently`, async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontSearchEmpty', lang);
    await expect(page.getByRole('status')).toHaveText(fa ? '۰ نتیجه' : '0 results');
    const heading = page.getByRole('heading', {level: 2});
    await expect(heading).toContainText(fa ? 'طرحی' : 'No designs');
    await expect(heading).toContainText(fa ? 'پیدا نشد' : 'found');
    await expect(
      page.getByText(
        fa
          ? 'کد محصول یا نوع دیگری از گل را جستجو کنید.'
          : 'Try a product code or another flower type.',
        {exact: true}
      )
    ).toBeVisible();
    await page
      .getByRole('checkbox', {name: fa ? 'عبارت دیگر' : 'Alternate query', exact: true})
      .check();
    await expect(heading).toContainText(fa ? 'برای این عبارت نیست' : 'for this query');
    await expect(page.getByRole('status')).toHaveText(fa ? '۰ نتیجه' : '0 results');
  });

  test(`${lang}: retry forwards pointer, Enter and Space once per activation`, async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontSearchEmpty', lang);
    const retry = page.getByRole('button', {name: retryLabel, exact: true});
    await retry.click();
    await expect(page.locator('[data-test=retries]')).toHaveText('1');
    await retry.press('Enter');
    await expect(page.locator('[data-test=retries]')).toHaveText('2');
    await retry.press('Space');
    await expect(page.locator('[data-test=retries]')).toHaveText('3');
    await expect(page.getByRole('status')).toHaveText(fa ? '۰ نتیجه' : '0 results');
  });

  test(`${lang}: compact recovery passes axe and browse preserves its destination`, async ({
    page
  }) => {
    await page.setViewportSize({width: 390, height: 844});
    await openStorefrontComponent(page, 'StorefrontSearchEmpty', lang);
    expect(await scanAxe(page)).toEqual([]);
    await page
      .getByRole('checkbox', {name: fa ? 'عبارت دیگر' : 'Alternate query', exact: true})
      .check();
    expect(await scanAxe(page)).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    const retry = page.getByRole('button', {name: retryLabel, exact: true});
    await retry.focus();
    await retry.press('Tab');
    const browse = page.getByRole('link', {
      name: fa ? 'رفتن به فروشگاه' : 'Browse the shop',
      exact: true
    });
    await expect(browse).toBeFocused();
    await expect(browse).toHaveAttribute('href', '#shop');
    await browse.press('Enter');
    await expect(page).toHaveURL(/#shop$/);
  });
}
