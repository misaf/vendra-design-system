import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';

for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          title: 'اعتبار حساب',
          amount: '۳۰۰٬۰۰۰ تومان',
          status: 'آماده برای سفارش بعدی شما.',
          topUp: 'افزایش اعتبار',
          input: 'مبلغ',
          pay: 'پرداخت اعتبار',
          back: 'بازگشت به پرداخت',
          history: 'تاریخچه اعتبار',
          empty: 'هنوز تراکنشی ندارید.',
          credit: 'افزایش اعتبار حساب',
          debit: 'پرداخت سفارش',
          creditDate: '۲۶ آبان ۱۴۰۵',
          debitDate: '۲۵ آبان ۱۴۰۵',
          creditAmount: '+۴۰۰٬۰۰۰ تومان',
          debitAmount: '−۱۰۰٬۰۰۰ تومان'
        }
      : {
          title: 'Account balance',
          amount: '300,000 toman',
          status: 'Ready for your next order.',
          topUp: 'Top up balance',
          input: 'Amount',
          pay: 'Pay top-up',
          back: 'Return to checkout',
          history: 'Balance history',
          empty: 'No transactions yet.',
          credit: 'Balance added',
          debit: 'Order payment',
          creditDate: '17 November 2026',
          debitDate: '16 November 2026',
          creditAmount: '+400,000 toman',
          debitAmount: '−100,000 toman'
        };
  test(
    'balance panel forwards overview, top-up and ordered history (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontAccountBalancePanel', lang);
      await expect(page.locator('#vf-balance-label')).toHaveText(t.title);
      await expect(page.locator('#vf-balance-amount')).toHaveText(t.amount);
      await expect(page.getByText(t.status, {exact: true})).toBeVisible();
      const history = page.getByRole('region', {name: t.history});
      const rows = history.getByRole('listitem');
      await expect(rows).toHaveCount(2);
      for (const [index, label, date, amount, tone] of [
        [0, t.credit, t.creditDate, t.creditAmount, 'success'],
        [1, t.debit, t.debitDate, t.debitAmount, 'neutral']
      ]) {
        await expect(rows.nth(index)).toContainText(label);
        await expect(rows.nth(index)).toContainText(date);
        await expect(rows.nth(index).locator('[data-tone]')).toHaveText(amount);
        await expect(rows.nth(index).locator('[data-tone]')).toHaveAttribute('data-tone', tone);
      }
      const panel = page.locator('.vf-account-balance');
      await expect(panel.locator(':scope > *')).toHaveCount(4);
      await expect(panel.locator(':scope > *').nth(0)).toContainText(t.amount);
      await expect(panel.locator(':scope > *').nth(1)).toHaveAttribute(
        'aria-labelledby',
        'vf-topup-title'
      );
      await expect(panel.locator(':scope > *').nth(2)).toHaveAttribute('href', '#checkout');
      await expect(panel.locator(':scope > *').nth(3)).toHaveAttribute(
        'aria-labelledby',
        'vf-balance-history'
      );
      await page.getByRole('textbox', {name: t.input, exact: true}).fill('250000');
      await page.getByRole('button', {name: t.pay}).click();
      await expect(page.locator('[data-test=paid]')).toHaveText('250000');
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'balance panel optional top-up and checkout return are independent (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontAccountBalancePanel', lang);
      const topUp = page.getByRole('region', {name: t.topUp, exact: true});
      const back = page.getByRole('link', {name: t.back});
      await expect(back).toHaveAttribute('href', '#checkout');
      await page.getByRole('checkbox', {name: 'Show top-up', exact: true}).uncheck();
      await expect(topUp).toHaveCount(0);
      await expect(back).toBeVisible();
      await expect(page.getByRole('region', {name: t.history})).toBeVisible();
      expect(await scanAxe(page)).toEqual([]);
      await back.focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/#checkout$/);
      await page.getByRole('checkbox', {name: 'Show checkout return'}).uncheck();
      await expect(back).toHaveCount(0);
      await page.getByRole('checkbox', {name: 'Show top-up', exact: true}).check();
      await expect(topUp).toBeVisible();
      await expect(back).toHaveCount(0);
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test('balance panel history flags and compact containment (' + lang + ')', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await openStorefrontComponent(page, 'StorefrontAccountBalancePanel', lang);
    const history = page.getByRole('region', {name: t.history});
    await expect(history.getByText(t.empty, {exact: true})).toHaveCount(0);
    await page.getByRole('checkbox', {name: 'Show history rows'}).uncheck();
    await page.getByRole('checkbox', {name: 'Empty history message'}).check();
    await expect(history.getByRole('list')).toHaveCount(0);
    await expect(history.getByText(t.empty, {exact: true})).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: 'Show history rows'}).check();
    await expect(history.getByRole('listitem')).toHaveCount(2);
    await expect(history.getByText(t.empty, {exact: true})).toBeVisible();
    await page.getByRole('checkbox', {name: 'Empty history message'}).uncheck();
    await expect(history.getByText(t.empty, {exact: true})).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    expect(await scanAxe(page)).toEqual([]);
  });
}
