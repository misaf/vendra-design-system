import React from 'react';
import {StorefrontCheckoutMethods} from './StorefrontCheckoutMethods.jsx';

const copy = {
  en: {
    intro: 'Choose how you would like to pay.',
    label: 'Payment method',
    card: 'Card to card',
    cardHint: 'Transfer, then enter the last four digits',
    wallet: 'Store balance',
    walletHint: 'Not enough balance',
    bank: 'Online bank gateway',
    unavailable: 'Online payment is unavailable right now',
    phone: 'Call the studio',
    hint: 'Your balance is 1,200,000 toman.',
    topUp: 'Top up balance',
    after: 'Balance after this order: 0 toman',
    notice: 'You will not be charged until the order is confirmed.'
  },
  fa: {
    intro: 'روش پرداخت را انتخاب کنید.',
    label: 'روش پرداخت',
    card: 'کارت به کارت',
    cardHint: 'واریز کنید و چهار رقم آخر را وارد کنید',
    wallet: 'اعتبار فروشگاه',
    walletHint: 'اعتبار کافی نیست',
    bank: 'درگاه بانکی',
    unavailable: 'پرداخت آنلاین فعلاً در دسترس نیست',
    phone: 'تماس با گل‌فروشی',
    hint: 'اعتبار شما ۱٬۲۰۰٬۰۰۰ تومان است.',
    topUp: 'افزایش اعتبار',
    after: 'اعتبار پس از این سفارش: ۰ تومان',
    notice: 'تا تأیید سفارش مبلغی برداشت نمی‌شود.'
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [method, setMethod] = React.useState('card');
  return (
    <div className="tw:flex tw:flex-col tw:gap-4 tw:max-w-form">
      <StorefrontCheckoutMethods
        intro={t.intro}
        methods={{
          visible: true,
          label: t.label,
          value: method,
          onChange: setMethod,
          options: [
            {value: 'card', label: t.card, description: t.cardHint},
            {value: 'wallet', label: t.wallet, description: t.walletHint, disabled: true},
            {value: 'bank', label: t.bank}
          ]
        }}
        unavailable={{
          visible: method === 'bank',
          label: t.unavailable,
          phoneLabel: t.phone,
          href: 'tel:+982612345678'
        }}
        wallet={{
          hint: t.hint,
          showTopUp: true,
          topUpHref: '#top-up',
          topUpLabel: t.topUp,
          selected: method === 'wallet',
          after: t.after
        }}
        notice={t.notice}
      />
      <output aria-label="Chosen method">{method}</output>
    </div>
  );
}
