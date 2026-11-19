import React from 'react';
import {StorefrontAccountBalancePanel} from './StorefrontAccountBalancePanel.jsx';

const copy = {
  en: {
    title: 'Account balance',
    amount: '300,000 toman',
    status: 'Ready for your next order.',
    topUp: 'Top up balance',
    quick: 'Quick amounts',
    input: 'Amount',
    pay: 'Pay top-up',
    demo: 'Demo payment.',
    back: 'Return to checkout',
    history: 'Balance history',
    empty: 'No transactions yet.',
    credit: 'Balance added',
    debit: 'Order payment',
    creditDate: '17 November 2026',
    debitDate: '16 November 2026',
    creditAmount: '+400,000 toman',
    debitAmount: '−100,000 toman'
  },
  fa: {
    title: 'اعتبار حساب',
    amount: '۳۰۰٬۰۰۰ تومان',
    status: 'آماده برای سفارش بعدی شما.',
    topUp: 'افزایش اعتبار',
    quick: 'مبالغ سریع',
    input: 'مبلغ',
    pay: 'پرداخت اعتبار',
    demo: 'پرداخت نمایشی.',
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
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [topUp, setTopUp] = React.useState(true);
  const [checkout, setCheckout] = React.useState(true);
  const [empty, setEmpty] = React.useState(false);
  const [history, setHistory] = React.useState(true);
  const [amount, setAmount] = React.useState('100000');
  const [paid, setPaid] = React.useState('');
  return (
    <main>
      <h1>{t.title}</h1>
      <label>
        <input type="checkbox" checked={topUp} onChange={event => setTopUp(event.target.checked)} />{' '}
        Show top-up
      </label>
      <label>
        <input
          type="checkbox"
          checked={checkout}
          onChange={event => setCheckout(event.target.checked)}
        />{' '}
        Show checkout return
      </label>
      <label>
        <input type="checkbox" checked={empty} onChange={event => setEmpty(event.target.checked)} />{' '}
        Empty history message
      </label>
      <label>
        <input
          type="checkbox"
          checked={history}
          onChange={event => setHistory(event.target.checked)}
        />{' '}
        Show history rows
      </label>
      <StorefrontAccountBalancePanel
        overview={{title: t.title, amount: t.amount, status: t.status}}
        topUp={
          topUp
            ? {
                title: t.topUp,
                quickLabel: t.quick,
                presets: [],
                amount: {label: t.input, value: amount, onChange: setAmount, hint: '', error: ''},
                payment: {
                  label: t.pay,
                  busy: false,
                  processing: '',
                  done: '',
                  onClick: () => setPaid(amount)
                },
                demo: t.demo
              }
            : null
        }
        checkoutReturn={checkout ? {label: t.back, href: '#checkout'} : null}
        history={{
          title: t.history,
          showEmpty: empty,
          emptyText: t.empty,
          showHistory: history,
          entries: [
            {label: t.credit, date: t.creditDate, amount: t.creditAmount, tone: 'success'},
            {label: t.debit, date: t.debitDate, amount: t.debitAmount, tone: 'neutral'}
          ]
        }}
      />
      <span data-test="paid">{paid}</span>
    </main>
  );
}
