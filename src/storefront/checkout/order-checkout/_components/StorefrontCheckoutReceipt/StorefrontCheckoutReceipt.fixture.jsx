import React from 'react';
import {StorefrontCheckoutReceipt} from './StorefrontCheckoutReceipt.jsx';

const copy = {
  en: {
    changed: 'The total changed to 4,600,000 toman',
    confirm: 'Confirm new amount',
    labels: {
      card: 'Card number',
      holder: 'Holder',
      bank: 'Bank',
      amount: 'Amount',
      copy: 'Copy',
      copied: 'Copied'
    },
    sheba: 'Sheba',
    tip: 'Use this for a bank transfer',
    info: 'About Sheba',
    last4: 'Last four digits of your card',
    last4Hint: 'From the card you paid with',
    last4Error: 'Enter four digits',
    reference: 'Transfer reference',
    referenceHint: 'Optional'
  },
  fa: {
    changed: 'مبلغ کل به ۴٬۶۰۰٬۰۰۰ تومان تغییر کرد',
    confirm: 'تأیید مبلغ جدید',
    labels: {
      card: 'شماره کارت',
      holder: 'دارنده',
      bank: 'بانک',
      amount: 'مبلغ',
      copy: 'کپی',
      copied: 'کپی شد'
    },
    sheba: 'شبا',
    tip: 'برای انتقال بانکی',
    info: 'درباره شبا',
    last4: 'چهار رقم آخر کارت شما',
    last4Hint: 'از کارتی که با آن پرداخت کردید',
    last4Error: 'چهار رقم وارد کنید',
    reference: 'شماره پیگیری انتقال',
    referenceHint: 'اختیاری'
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [confirmed, setConfirmed] = React.useState(false);
  const [last4, setLast4] = React.useState('');
  const [reference, setReference] = React.useState('');
  const [copied, setCopied] = React.useState(0);
  return (
    <div className="tw:flex tw:flex-col tw:gap-4 tw:max-w-form">
      <StorefrontCheckoutReceipt
        change={{
          visible: !confirmed,
          text: t.changed,
          label: t.confirm,
          onConfirm: () => setConfirmed(true)
        }}
        card={{
          visible: true,
          number: '6037991234567890',
          holder: 'Vendra Florist',
          bank: 'Melli',
          amount: '4,600,000',
          labels: t.labels,
          sheba: 'IR820540102680020817909002'
        }}
        sheba={{
          label: t.sheba,
          tip: t.tip,
          info: t.info,
          onCopy: () => setCopied(count => count + 1)
        }}
        last4={{
          label: t.last4,
          hint: t.last4Hint,
          error: last4 && last4.length !== 4 ? t.last4Error : undefined,
          value: last4,
          onChange: setLast4
        }}
        reference={{
          label: t.reference,
          hint: t.referenceHint,
          value: reference,
          onChange: setReference
        }}
      />
      <output aria-label="Sheba copies">{copied}</output>
    </div>
  );
}
