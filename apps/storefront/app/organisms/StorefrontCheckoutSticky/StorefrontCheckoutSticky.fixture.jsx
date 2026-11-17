import React from 'react';
import {StorefrontCheckoutSticky} from './StorefrontCheckoutSticky.jsx';

const copy = {
  en: {
    total: 'Total',
    one: '2,400,000 toman',
    two: '3,100,000 toman',
    place: 'Place order',
    receipt: 'Send receipt',
    update: 'Change supplied method and total',
    allow: 'Allow placement',
    complete: 'Complete fixture request'
  },
  fa: {
    total: 'جمع',
    one: '۲٬۴۰۰٬۰۰۰ تومان',
    two: '۳٬۱۰۰٬۰۰۰ تومان',
    place: 'ثبت سفارش',
    receipt: 'ارسال رسید',
    update: 'تغییر روش و جمع نمونه',
    allow: 'اجازه ثبت سفارش',
    complete: 'پایان درخواست نمونه'
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [changed, setChanged] = React.useState(false);
  const [allowed, setAllowed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [requests, setRequests] = React.useState(0);
  return (
    <div className="tw:flex tw:flex-col tw:gap-4">
      <StorefrontCheckoutSticky
        summary={{label: t.total, value: changed ? t.two : t.one}}
        place={{
          label: changed ? t.receipt : t.place,
          disabled: !allowed,
          loading,
          onClick: () => {
            setRequests(count => count + 1);
            setLoading(true);
          }
        }}
      />
      <button type="button" onClick={() => setChanged(true)}>
        {t.update}
      </button>
      <button type="button" onClick={() => setLoading(false)}>
        {t.complete}
      </button>
      <label>
        <input
          type="checkbox"
          checked={allowed}
          onChange={event => setAllowed(event.target.checked)}
        />
        {t.allow}
      </label>
      <span data-test="requests">{requests}</span>
    </div>
  );
}
