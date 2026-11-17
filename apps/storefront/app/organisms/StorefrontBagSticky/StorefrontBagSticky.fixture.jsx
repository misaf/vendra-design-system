import React from 'react';
import {StorefrontBagSticky} from './StorefrontBagSticky.jsx';

const copy = {
  en: {
    total: 'Total',
    one: '2,400,000 toman',
    two: '3,100,000 toman',
    delivery: 'Delivery',
    payment: 'Payment',
    update: 'Update supplied total',
    showDelivery: 'Show delivery action',
    showPayment: 'Show payment action'
  },
  fa: {
    total: 'جمع',
    one: '۲٬۴۰۰٬۰۰۰ تومان',
    two: '۳٬۱۰۰٬۰۰۰ تومان',
    delivery: 'ارسال',
    payment: 'پرداخت',
    update: 'به‌روزرسانی جمع',
    showDelivery: 'نمایش دکمه ارسال',
    showPayment: 'نمایش دکمه پرداخت'
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [delivery, setDelivery] = React.useState(true);
  const [payment, setPayment] = React.useState(false);
  const [total, setTotal] = React.useState(t.one);
  const [action, setAction] = React.useState('');
  return (
    <div className="tw:flex tw:flex-col tw:gap-4">
      <StorefrontBagSticky
        summary={{label: t.total, total}}
        delivery={{visible: delivery, label: t.delivery, onClick: () => setAction('delivery')}}
        payment={{visible: payment, label: t.payment, onClick: () => setAction('payment')}}
      />
      <button type="button" onClick={() => setTotal(t.two)}>
        {t.update}
      </button>
      <label>
        <input
          type="checkbox"
          checked={delivery}
          onChange={event => setDelivery(event.target.checked)}
        />
        {t.showDelivery}
      </label>
      <label>
        <input
          type="checkbox"
          checked={payment}
          onChange={event => setPayment(event.target.checked)}
        />
        {t.showPayment}
      </label>
      <span data-test="action">{action}</span>
    </div>
  );
}
