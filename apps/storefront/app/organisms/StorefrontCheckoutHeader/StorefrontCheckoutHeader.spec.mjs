import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../e2e/component-test.mjs';

for (const lang of ['en', 'fa']) {
  test(`enclosed header renders supplied destinations and can cancel leaving (${lang})`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontCheckoutHeader', lang);
    const fa = lang === 'fa';
    const header = page.getByRole('banner');
    await expect(
      header.getByRole('link', {name: fa ? 'بازگشت به سبد' : 'Back to bag'})
    ).toHaveAttribute('href', '#bag');
    await expect(header.getByRole('link', {name: fa ? 'راهنما' : 'Help'})).toHaveAttribute(
      'href',
      '#help'
    );
    const logo = header.getByRole('link', {name: fa ? 'وندرا' : 'Vendra'});
    await logo.press('Enter');
    const dialog = page.getByRole('dialog', {name: fa ? 'خروج از خرید؟' : 'Leave checkout?'});
    await expect(dialog).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
    await dialog.getByRole('button', {name: fa ? 'ماندن' : 'Stay', exact: true}).press('Enter');
    await expect(dialog).toBeHidden();
    await expect(logo).toBeFocused();
  });
}
