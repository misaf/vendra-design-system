import React from 'react';
import {StorefrontTrackLookup} from './StorefrontTrackLookup.jsx';

const copy = {
  en: {
    title: 'Track your',
    accent: 'order',
    intro: 'Use the order number and recipient phone.',
    order: 'Order number',
    hint: 'Find it in your confirmation.',
    phone: 'Recipient mobile',
    submit: 'Find order',
    browse: 'Browse flowers',
    error: 'Check this field.',
    failure: 'No matching order was found.'
  },
  fa: {
    title: 'پیگیری',
    accent: 'سفارش',
    intro: 'شماره سفارش و همراه گیرنده را وارد کنید.',
    order: 'شماره سفارش',
    hint: 'در تأیید سفارش نوشته شده است.',
    phone: 'همراه گیرنده',
    submit: 'یافتن سفارش',
    browse: 'دیدن گل‌ها',
    error: 'این فیلد را بررسی کنید.',
    failure: 'سفارش مطابق پیدا نشد.'
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [order, setOrder] = React.useState('VD-12345');
  const [phone, setPhone] = React.useState('09120000000');
  const [invalid, setInvalid] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [submitted, setSubmitted] = React.useState('');
  const [count, setCount] = React.useState(0);
  const [metadata, setMetadata] = React.useState('');
  return (
    <main>
      <label>
        <input
          type="checkbox"
          checked={invalid}
          onChange={event => setInvalid(event.target.checked)}
        />{' '}
        Field errors
      </label>
      <label>
        <input
          type="checkbox"
          checked={failure}
          onChange={event => setFailure(event.target.checked)}
        />{' '}
        Lookup failure
      </label>
      <StorefrontTrackLookup
        heading={{title: t.title, accent: t.accent, intro: t.intro}}
        failure={{visible: failure, message: t.failure}}
        orderId={{
          label: t.order,
          hint: t.hint,
          value: order,
          onChange: setOrder,
          error: invalid ? t.error : ''
        }}
        phone={{
          label: t.phone,
          value: phone,
          onChange: (value, details) => {
            setPhone(value);
            setMetadata(JSON.stringify(details));
          },
          error: invalid ? t.error : ''
        }}
        onSubmit={event => {
          event.preventDefault();
          setSubmitted(JSON.stringify({order, phone}));
          setCount(count => count + 1);
        }}
        submitLabel={t.submit}
        browse={{label: t.browse, href: '#shop'}}
      />
      <span data-test="submitted">{submitted}</span>
      <span data-test="count">{count}</span>
      <span data-test="metadata">{metadata}</span>
    </main>
  );
}
