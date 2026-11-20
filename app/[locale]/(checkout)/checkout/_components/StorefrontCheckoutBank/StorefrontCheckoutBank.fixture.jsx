import React from 'react';
import {StorefrontCheckoutBank} from './StorefrontCheckoutBank.jsx';

const copy = {
  en: {
    progress: 'Checkout progress',
    done: 'Done',
    steps: ['Bag', 'Delivery', 'Payment'],
    amount: '2,400,000 toman',
    failed: 'Show failed payment',
    cancelled: 'Show cancelled payment',
    pending: 'Show pending payment',
    verifying: 'Show verification',
    paid: 'Show paid payment',
    redirecting: 'Show bank redirect'
  },
  fa: {
    progress: 'مراحل پرداخت',
    done: 'انجام‌شده',
    steps: ['سبد', 'ارسال', 'پرداخت'],
    amount: '۲٬۴۰۰٬۰۰۰ تومان',
    failed: 'نمایش پرداخت ناموفق',
    cancelled: 'نمایش پرداخت لغوشده',
    pending: 'نمایش پرداخت در انتظار',
    verifying: 'نمایش بررسی پرداخت',
    paid: 'نمایش پرداخت موفق',
    redirecting: 'نمایش انتقال به بانک'
  }
};
const redirect = {
  url: '/__fixture-bank',
  method: 'POST',
  fields: {Token: 'fixture-token', Amount: '24000000'}
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [status, setStatus] = React.useState('failed');
  const [action, setAction] = React.useState('');
  return (
    <div className="tw:flex tw:flex-col tw:gap-4 tw:max-w-form">
      <StorefrontCheckoutBank
        progress={{
          steps: t.steps.map(label => ({label})),
          current: 2,
          labels: {region: t.progress, done: t.done},
          formatNumber: number =>
            new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US').format(number),
          captionFormat: (number, total, label) => number + ' / ' + total + ' · ' + label
        }}
        payment={{
          status,
          amount: t.amount,
          orderNumber: 'VN-10522',
          reference: '123456789012',
          gateway: 'Fixture Bank',
          redirect: status === 'redirecting' ? redirect : undefined,
          supportHref: 'tel:+15551234567'
        }}
        actions={{
          retry: () => {
            setAction('retry');
            setStatus('verifying');
          },
          other: () => setAction('other'),
          checkAgain: () => {
            setAction('check');
            setStatus('paid');
          }
        }}
      />
      <div className="tw:flex tw:flex-wrap tw:gap-2">
        {['failed', 'cancelled', 'pending', 'verifying', 'paid', 'redirecting'].map(value => (
          <button type="button" key={value} onClick={() => setStatus(value)}>
            {t[value]}
          </button>
        ))}
      </div>
      <span data-test="action">{action}</span>
    </div>
  );
}
