import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from '../helpers.mjs';

for (const lang of ['en', 'fa']) {
  test(`delivery encloses the shell and confirms leaving for home (${lang})`, async ({
    page
  }, info) => {
    const fa = lang === 'fa';
    await openSite(page, 'bag', lang);
    const header = page.getByRole('banner');
    const footer = page.getByRole('contentinfo');
    await expect(header.locator('a[href*="/search/"]:visible')).toBeVisible();
    await expect(page.locator('.ag-announce')).toBeVisible();
    if (info.project.name === 'mobile') await expect(page.locator('.ag-tabbar')).toBeVisible();

    await page
      .getByRole('button', {name: fa ? 'ادامه و ارسال' : 'Continue to delivery', exact: true})
      .locator('visible=true')
      .click();
    await expect(page).toHaveURL(/step=delivery/);
    await expect(page.locator('.ag-announce, .ag-tabbar')).toHaveCount(0);
    await expect(header.getByRole('link')).toHaveCount(3);
    await expect(header.getByRole('link', {name: fa ? 'واتساپ' : 'WhatsApp'})).toHaveAttribute(
      'href',
      /^https:\/\/wa\.me\/\d+$/
    );
    await expect(footer.locator('a[href*="/policy/"]')).toHaveCount(5);
    await expect(footer.locator('a[href$="/contact/"]')).toBeVisible();
    await expect(footer.locator('a[referrerpolicy="origin"]')).toHaveCount(2);

    const logo = header.getByRole('link', {name: /Vendra|وندرا/i});
    await page.locator('#vf-name').fill('Mina Ahmadi');
    await logo.press('Enter');
    const dialog = page.getByRole('dialog', {
      name: fa ? 'از فرایند خرید خارج می‌شوید؟' : 'Leave checkout?'
    });
    await expect(dialog).toBeVisible();
    await expect(dialog).toBeFocused();
    expect(await scanAxe(page)).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(logo).toBeFocused();
    await expect(page.locator('#vf-name')).toHaveValue('Mina Ahmadi');

    await logo.click();
    await dialog.getByRole('link', {name: fa ? 'رفتن به صفحهٔ اصلی' : 'Go to home'}).click();
    await expect(page).toHaveURL(new RegExp(`/${lang}/$`));
    await page.goBack();
    await expect(page.locator('#vf-name')).toHaveValue('Mina Ahmadi');
    await header.getByRole('link', {name: fa ? 'بازگشت به سبد' : 'Back to bag'}).click();
    await expect(header.locator('a[href*="/search/"]:visible')).toBeVisible();
  });
}
