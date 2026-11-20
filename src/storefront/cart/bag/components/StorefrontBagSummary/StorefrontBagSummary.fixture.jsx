import React from 'react';
import {StorefrontBagSummary} from './StorefrontBagSummary.jsx';

const copy = {
  en: {
    title: 'Bag summary',
    total: 'Total',
    amount: '2,400,000 toman',
    note: 'Payment is confirmed after review.',
    meter: 'Free delivery',
    meterValue: '60 of 100',
    meterDone: 'Free delivery reached',
    complete: 'Complete the delivery meter',
    error: 'This fixture code was refused',
    applied: 'SAVE · Fixture discount',
    delivery: 'Delivery',
    payment: 'Payment',
    back: 'Back to bag',
    showMeter: 'Show delivery meter',
    showPromo: 'Show promo',
    showDelivery: 'Show delivery action',
    showPayment: 'Show payment action',
    showBack: 'Show back link'
  },
  fa: {
    title: 'خلاصه سبد',
    total: 'جمع',
    amount: '۲٬۴۰۰٬۰۰۰ تومان',
    note: 'پرداخت پس از بررسی تأیید می‌شود.',
    meter: 'ارسال رایگان',
    meterValue: '۶۰ از ۱۰۰',
    meterDone: 'ارسال رایگان شد',
    complete: 'تکمیل نوار ارسال',
    error: 'این کد نمونه پذیرفته نشد',
    applied: 'SAVE · تخفیف نمونه',
    delivery: 'ارسال',
    payment: 'پرداخت',
    back: 'بازگشت به سبد',
    showMeter: 'نمایش نوار ارسال',
    showPromo: 'نمایش کد تخفیف',
    showDelivery: 'نمایش دکمه ارسال',
    showPayment: 'نمایش دکمه پرداخت',
    showBack: 'نمایش پیوند بازگشت'
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [flags, setFlags] = React.useState({
    showMeter: true,
    showPromo: true,
    showDelivery: true,
    showPayment: false,
    showBack: true
  });
  const [done, setDone] = React.useState(false);
  const [draft, setDraft] = React.useState('');
  const [error, setError] = React.useState('');
  const [applied, setApplied] = React.useState('');
  const [lastApply, setLastApply] = React.useState('');
  const [action, setAction] = React.useState('');
  return (
    <div className="tw:flex tw:flex-col tw:gap-4 tw:max-w-form">
      <StorefrontBagSummary
        summary={{
          title: t.title,
          lines: [{name: 'VF-7K2M4Q', total: t.amount}],
          sums: [{label: t.total, value: t.amount, strong: true}]
        }}
        freeDelivery={
          flags.showMeter
            ? {
                label: t.meter,
                value: done ? 100 : 60,
                max: 100,
                valueLabel: done ? t.meterDone : t.meterValue,
                done
              }
            : null
        }
        promo={{
          visible: flags.showPromo,
          value: draft,
          onChange: value => {
            setDraft(value);
            setError('');
          },
          error,
          applied,
          // SAVE selects the fixture's applied state; production promo validation stays in page logic.
          onApply: code => {
            setLastApply(code);
            if (code === 'SAVE') {
              setApplied(t.applied);
              setError('');
            } else setError(t.error);
          },
          onRemove: () => {
            setApplied('');
            setDraft('');
            setAction('remove');
          }
        }}
        actions={{
          delivery: {
            visible: flags.showDelivery,
            label: t.delivery,
            onClick: () => setAction('delivery')
          },
          payment: {
            visible: flags.showPayment,
            label: t.payment,
            onClick: () => setAction('payment')
          },
          back: {
            visible: flags.showBack,
            label: t.back,
            href: '#bag',
            onClick: event => {
              event.preventDefault();
              setAction('back');
            }
          }
        }}
        paymentNote={t.note}
      />
      <button type="button" onClick={() => setDone(true)}>
        {t.complete}
      </button>
      {Object.entries(flags).map(([key, checked]) => (
        <label key={key}>
          <input
            type="checkbox"
            checked={checked}
            onChange={event => {
              const value = event.target.checked;
              setFlags(current => ({...current, [key]: value}));
            }}
          />
          {t[key]}
        </label>
      ))}
      <span data-test="promo-draft">{draft}</span>
      <span data-test="last-apply">{lastApply}</span>
      <span data-test="action">{action}</span>
    </div>
  );
}
