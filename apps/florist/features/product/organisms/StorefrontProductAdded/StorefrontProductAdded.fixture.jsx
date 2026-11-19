import React from 'react';
import {StorefrontProductAdded} from './StorefrontProductAdded.jsx';

const copy = {
  en: {
    open: 'Show confirmation',
    openUndo: 'Show confirmation with Undo',
    title: 'Added to your bag',
    close: 'Close confirmation',
    checkout: 'Continue to checkout',
    continue: 'Keep shopping',
    undo: 'Undo add',
    meta: 'Medium × 2',
    note: 'Card: Happy birthday',
    total: 'Total',
    amount: '4,800,000 toman'
  },
  fa: {
    open: 'نمایش تأیید',
    openUndo: 'نمایش تأیید با واگرد',
    title: 'به سبد شما اضافه شد',
    close: 'بستن تأیید',
    checkout: 'ادامه به پرداخت',
    continue: 'ادامه خرید',
    undo: 'واگرد افزودن',
    meta: 'متوسط × ۲',
    note: 'کارت: تولدت مبارک',
    total: 'جمع',
    amount: '۴٬۸۰۰٬۰۰۰ تومان'
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [mode, setMode] = React.useState(null);
  const [action, setAction] = React.useState('');
  return (
    <>
      <button type="button" onClick={() => setMode('normal')}>
        {t.open}
      </button>
      <button type="button" onClick={() => setMode('undo')}>
        {t.openUndo}
      </button>
      <span data-test="action">{action}</span>
      <StorefrontProductAdded
        open={!!mode}
        onClose={() => setMode(null)}
        labels={t}
        lines={[
          {
            name: 'VF-7K2M4Q',
            href: '#product',
            image: '/assets/placeholder.svg',
            meta: t.meta,
            note: t.note,
            total: t.amount
          }
        ]}
        sums={[{label: t.total, value: t.amount, strong: true}]}
        checkout={{
          href: '#checkout',
          onClick: event => {
            event.preventDefault();
            setAction('checkout');
            setMode(null);
          }
        }}
        undo={
          mode === 'undo'
            ? {
                label: t.undo,
                onClick: () => {
                  setAction('undo');
                  setMode(null);
                }
              }
            : null
        }
      />
    </>
  );
}
