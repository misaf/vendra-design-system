import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../e2e/component-test.mjs';

for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          title: 'افزایش اعتبار',
          quick: 'مبلغ سریع',
          first: '۱۰۰٬۰۰۰ تومان',
          second: '۲۰۰٬۰۰۰ تومان',
          amount: 'مبلغ',
          hint: 'مبلغی انتخاب یا وارد کنید.',
          error: 'مبلغ را بررسی کنید.',
          pay: 'پرداخت اعتبار',
          processing: 'پرداخت در حال پردازش است.',
          done: 'اعتبار به‌روز شد.',
          demo: 'فقط پرداخت نمایشی.'
        }
      : {
          title: 'Top up balance',
          quick: 'Quick amount',
          first: '100,000 toman',
          second: '200,000 toman',
          amount: 'Amount',
          hint: 'Choose or enter an amount.',
          error: 'Check the amount.',
          pay: 'Pay top-up',
          processing: 'Payment is processing.',
          done: 'Balance updated.',
          demo: 'Demo payment only.'
        };
  test('top-up preset selection and custom amount callback (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontAccountTopUp', lang);
    const section = page.getByRole('region', {name: t.title});
    await expect(section.getByRole('heading', {level: 2, name: t.title})).toHaveAttribute(
      'id',
      'vf-topup-title'
    );
    const group = section.getByRole('group', {name: t.quick});
    const first = group.getByRole('button', {name: t.first});
    const second = group.getByRole('button', {name: t.second});
    const input = section.getByRole('textbox', {name: t.amount, exact: true});
    await expect(first).toHaveAttribute('aria-pressed', 'true');
    await expect(second).toHaveAttribute('aria-pressed', 'false');
    await second.focus();
    await page.keyboard.press('Enter');
    await expect(input).toHaveValue('200000');
    await expect(second).toHaveAttribute('aria-pressed', 'true');
    await expect(first).toHaveAttribute('aria-pressed', 'false');
    await first.click();
    await expect(input).toHaveValue('100000');
    await input.fill('۱۵۰۰۰۰');
    await expect(input).toHaveValue('۱۵۰۰۰۰');
    await expect(first).toHaveAttribute('aria-pressed', 'false');
    await expect(second).toHaveAttribute('aria-pressed', 'false');
    const pay = section.getByRole('button', {name: t.pay});
    await pay.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-test=paid]')).toHaveText('۱۵۰۰۰۰');
    await expect(page.locator('[data-test=count]')).toHaveText('1');
    await expect(section.getByText(t.demo, {exact: true})).toBeVisible();
  });
  test('top-up amount hint, error and decimal keyboard (' + lang + ')', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await openStorefrontComponent(page, 'StorefrontAccountTopUp', lang);
    const input = page.getByRole('textbox', {name: t.amount, exact: true});
    await expect(input).toHaveAttribute('id', 'vf-topup-amount');
    await expect(input).toHaveAttribute('dir', 'ltr');
    await expect(input).toHaveAttribute('autocomplete', 'off');
    await expect(input).toHaveAttribute('inputmode', 'numeric');
    await expect(input).toHaveAccessibleDescription(t.hint);
    await page.getByRole('checkbox', {name: 'Decimal currency'}).check();
    await expect(input).toHaveAttribute('inputmode', 'decimal');
    await input.fill('12.50');
    await page.getByRole('button', {name: t.pay}).click();
    await expect(page.locator('[data-test=paid]')).toHaveText('12.50');
    await page.getByRole('checkbox', {name: 'Amount error'}).check();
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveAccessibleDescription(t.error);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: 'Amount error'}).uncheck();
    await expect(input).not.toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveAccessibleDescription(t.hint);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    expect(await scanAxe(page)).toEqual([]);
  });
  test(
    'top-up pending disables repeat payment and exposes status (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontAccountTopUp', lang);
      const pay = page.getByRole('button', {name: t.pay});
      await expect(page.getByRole('status')).toHaveCount(0);
      await page.getByRole('checkbox', {name: 'Pending payment'}).check();
      await expect(pay).toBeDisabled();
      await expect(page.getByRole('status')).toHaveText(t.processing);
      await pay.click({force: true});
      await expect(page.locator('[data-test=count]')).toHaveText('0');
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Pending payment'}).uncheck();
      await expect(pay).toBeEnabled();
      await expect(page.getByRole('status')).toHaveCount(0);
      await pay.click();
      await expect(page.locator('[data-test=count]')).toHaveText('1');
    }
  );
  test(
    'top-up completion target is independent of pending status (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontAccountTopUp', lang);
      await page.getByRole('checkbox', {name: 'Completed payment'}).check();
      const done = page.locator('#vf-topup-done');
      await expect(done).toHaveAttribute('role', 'status');
      await expect(done).toHaveAttribute('tabindex', '-1');
      await expect(done).toHaveText(t.done);
      await done.focus();
      await expect(done).toBeFocused();
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Pending payment'}).check();
      await expect(page.getByRole('status')).toHaveText([t.processing, t.done]);
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Completed payment'}).uncheck();
      await expect(done).toHaveCount(0);
      await expect(page.getByRole('status')).toHaveText(t.processing);
    }
  );
}
