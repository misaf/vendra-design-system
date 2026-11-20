import React from 'react';
import {StorefrontCheckoutConfirmation} from './StorefrontCheckoutConfirmation.jsx';

const copy = {
  en: {
    progress: 'Checkout progress',
    done: 'Done',
    steps: ['Bag', 'Delivery', 'Payment', 'Confirmation'],
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
    done: 'انجام‌شده',
    steps: ['سبد', 'ارسال', 'پرداخت', 'تأیید'],
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

export function Fixture({lang}) {
  const t = copy[lang];
  const [account, setAccount] = React.useState(true);
  const [paid, setPaid] = React.useState(false);
  return (
    <div className="tw:flex tw:flex-col tw:gap-4 tw:items-center tw:max-w-form">
      <StorefrontCheckoutConfirmation
        progress={{
          steps: t.steps.map(label => ({label})),
          current: 3,
          labels: {region: t.progress, done: t.done},
          formatNumber: value =>
            new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US').format(value),
          captionFormat: (number, total, label) => number + ' / ' + total + ' · ' + label
        }}
        heading={{eyebrow: t.eyebrow, title: t.title, accent: t.accent, body: t.body}}
        status={paid ? t.paid : t.pending}
        rows={[
          {icon: 'receipt', label: t.order, value: <bdi dir="ltr">VN-10522</bdi>},
          {icon: 'shield-check', label: t.reference, value: <bdi dir="ltr">REF-123456</bdi>},
          {icon: 'truck', label: t.delivery, value: t.slot},
          {icon: 'banknote', label: t.total, value: t.amount}
        ]}
        account={{
          visible: account,
          title: t.accountTitle,
          body: t.accountBody,
          label: t.accountLabel,
          href: '/__fixture-account?next=orders'
        }}
        links={{
          track: {label: t.track, href: '/__fixture-track?order=VN-10522'},
          shop: {label: t.shop, href: '/__fixture-shop'}
        }}
      />
      <label>
        <input
          type="checkbox"
          checked={account}
          onChange={event => setAccount(event.target.checked)}
        />
        {t.showAccount}
      </label>
      <button type="button" onClick={() => setPaid(true)}>
        {t.update}
      </button>
    </div>
  );
}
