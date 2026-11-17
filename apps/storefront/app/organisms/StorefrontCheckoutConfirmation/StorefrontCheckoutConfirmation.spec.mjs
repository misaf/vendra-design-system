import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../e2e/component-test.mjs';

const copy = {
  en: {
    progress: 'Checkout progress',
    current: 'Confirmation',
    compact: '4 / 4 · Confirmation',
    eyebrow: 'Order VN-10522',
    title: 'Your order is',
    accent: 'confirmed',
    body: 'We will prepare your chosen design.',
    pending: 'Payment pending',
    paid: 'Payment confirmed',
    order: 'Order',
    reference: 'Payment reference',
    delivery: 'Delivery',
    slot: 'Tomorrow, 10:00–13:00',
    total: 'Total',
    amount: '2,400,000 toman',
    accountTitle: 'Keep your order in one place',
    accountBody: 'Create an account to review your orders.',
    accountLabel: 'Create account',
    track: 'Track order',
    shop: 'Keep browsing',
    showAccount: 'Show account offer',
    update: 'Show confirmed payment'
  },
  fa: {
    progress: 'مراحل پرداخت',
    current: 'تأیید',
    compact: '۴ / ۴ · تأیید',
    eyebrow: 'سفارش VN-10522',
    title: 'سفارش شما',
    accent: 'تأیید شد',
    body: 'طرح انتخابی شما را آماده می‌کنیم.',
    pending: 'پرداخت در انتظار تأیید',
    paid: 'پرداخت تأیید شد',
    order: 'سفارش',
    reference: 'کد پیگیری پرداخت',
    delivery: 'ارسال',
    slot: 'فردا، ۱۰ تا ۱۳',
    total: 'جمع',
    amount: '۲٬۴۰۰٬۰۰۰ تومان',
    accountTitle: 'سفارش‌ها را یکجا ببینید',
    accountBody: 'برای بررسی سفارش‌ها حساب بسازید.',
    accountLabel: 'ساخت حساب',
    track: 'پیگیری سفارش',
    shop: 'ادامه مرور طرح‌ها',
    showAccount: 'نمایش پیشنهاد حساب',
    update: 'نمایش پرداخت تأییدشده'
  }
};

for (const lang of ['en', 'fa']) {
  const t = copy[lang];

  test(`${lang}: noninteractive completion progress, heading, status and details use supplied content`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontCheckoutConfirmation', lang);
    const progress = page.getByRole('list', {name: t.progress, exact: true});
    await expect(progress.getByRole('listitem')).toHaveCount(4);
    await expect(progress.locator('[aria-current="step"]')).toContainText(t.current);
    await expect(progress.getByRole('button')).toHaveCount(0);
    const heading = page.getByRole('heading', {level: 1});
    await expect(heading).toContainText(t.title);
    await expect(heading.locator('em')).toHaveText(t.accent);
    await expect(page.getByText(t.eyebrow, {exact: true})).toBeVisible();
    await expect(page.getByText(t.body, {exact: true})).toBeVisible();
    await expect(page.getByRole('term')).toHaveText([t.order, t.reference, t.delivery, t.total]);
    await expect(page.locator('dl dd')).toHaveText(['VN-10522', 'REF-123456', t.slot, t.amount]);
    await expect(page.locator('dl bdi')).toHaveCount(2);
    for (const value of await page.locator('dl bdi').all())
      await expect(value).toHaveAttribute('dir', 'ltr');
    await expect(page.getByText(t.pending, {exact: true})).toBeVisible();
    await page.getByRole('button', {name: t.update, exact: true}).click();
    await expect(page.getByText(t.paid, {exact: true})).toBeVisible();
    await expect(page.getByText(t.pending, {exact: true})).toHaveCount(0);
  });

  test(`${lang}: account offer is conditional; track/shop/account destinations remain explicit`, async ({
    page
  }) => {
    await page.route('**/__fixture-track**', route =>
      route.fulfill({
        contentType: 'text/html',
        body: '<title>Fixture tracking</title><h1>Fixture tracking</h1>'
      })
    );
    await openStorefrontComponent(page, 'StorefrontCheckoutConfirmation', lang);
    const account = page.getByRole('link', {name: t.accountLabel, exact: true});
    await expect(
      page.getByRole('heading', {level: 2, name: t.accountTitle, exact: true})
    ).toBeVisible();
    await expect(page.getByText(t.accountBody, {exact: true})).toBeVisible();
    await expect(account).toHaveAttribute('href', '/__fixture-account?next=orders');
    const track = page.getByRole('link', {name: t.track, exact: true});
    const shop = page.getByRole('link', {name: t.shop, exact: true});
    await expect(track).toHaveAttribute('href', '/__fixture-track?order=VN-10522');
    await expect(shop).toHaveAttribute('href', '/__fixture-shop');
    await page.getByRole('checkbox', {name: t.showAccount, exact: true}).uncheck();
    await expect(account).toHaveCount(0);
    await expect(page.getByRole('heading', {name: t.accountTitle, exact: true})).toHaveCount(0);
    await expect(page.getByText(t.accountBody, {exact: true})).toHaveCount(0);
    await expect(track).toBeVisible();
    await expect(shop).toBeVisible();
    await page.getByRole('checkbox', {name: t.showAccount, exact: true}).check();
    await expect(account).toBeVisible();
    await track.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/__fixture-track\?order=VN-10522$/);
    await expect(page.getByRole('heading', {level: 1})).toHaveText('Fixture tracking');
  });

  test(`${lang}: account/no-account and compact confirmation pass axe without overflow`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontCheckoutConfirmation', lang);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: t.showAccount, exact: true}).uncheck();
    expect(await scanAxe(page)).toEqual([]);
    await page.setViewportSize({width: 390, height: 844});
    await expect(page.getByRole('list', {name: t.progress, exact: true})).toHaveCount(1);
    await expect(page.getByText(t.compact, {exact: true})).toBeVisible();
    await page.getByRole('checkbox', {name: t.showAccount, exact: true}).check();
    expect(await scanAxe(page)).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      )
    ).toBeLessThanOrEqual(0);
  });
}
