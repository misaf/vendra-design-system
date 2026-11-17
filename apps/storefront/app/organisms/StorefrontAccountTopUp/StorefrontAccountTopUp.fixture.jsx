import React from 'react';
import {StorefrontAccountTopUp} from './StorefrontAccountTopUp.jsx';

const copy = {
  en: {
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
  },
  fa: {
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
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [amount, setAmount] = React.useState('100000');
  const [invalid, setInvalid] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [decimal, setDecimal] = React.useState(false);
  const [paid, setPaid] = React.useState('');
  const [count, setCount] = React.useState(0);
  return (
    <main>
      <h1>{t.title}</h1>
      <label>
        <input
          type="checkbox"
          checked={invalid}
          onChange={event => setInvalid(event.target.checked)}
        />{' '}
        Amount error
      </label>
      <label>
        <input type="checkbox" checked={busy} onChange={event => setBusy(event.target.checked)} />{' '}
        Pending payment
      </label>
      <label>
        <input type="checkbox" checked={done} onChange={event => setDone(event.target.checked)} />{' '}
        Completed payment
      </label>
      <label>
        <input
          type="checkbox"
          checked={decimal}
          onChange={event => setDecimal(event.target.checked)}
        />{' '}
        Decimal currency
      </label>
      <StorefrontAccountTopUp
        title={t.title}
        quickLabel={t.quick}
        presets={[
          {label: t.first, pressed: amount === '100000', pick: () => setAmount('100000')},
          {label: t.second, pressed: amount === '200000', pick: () => setAmount('200000')}
        ]}
        amount={{
          label: t.amount,
          value: amount,
          onChange: setAmount,
          hint: t.hint,
          error: invalid ? t.error : '',
          inputMode: decimal ? 'decimal' : undefined
        }}
        payment={{
          label: t.pay,
          busy,
          processing: t.processing,
          done: done ? t.done : '',
          onClick: () => {
            setPaid(amount);
            setCount(count => count + 1);
          }
        }}
        demo={t.demo}
      />
      <span data-test="paid">{paid}</span>
      <span data-test="count">{count}</span>
    </main>
  );
}
