import React from 'react';
import {StorefrontCheckoutHeader} from './StorefrontCheckoutHeader.jsx';

export function Fixture({lang}) {
  const fa = lang === 'fa';
  return (
    <>
      <StorefrontCheckoutHeader
        brand={fa ? 'وندرا' : 'Vendra'}
        homeHref="#home"
        back={{href: '#bag', label: fa ? 'بازگشت به سبد' : 'Back to bag'}}
        help={{href: '#help', label: fa ? 'راهنما' : 'Help'}}
        leave={{
          title: fa ? 'خروج از خرید؟' : 'Leave checkout?',
          body: fa ? 'به صفحهٔ اصلی برمی‌گردید.' : 'Return to the storefront home page.',
          stay: fa ? 'ماندن' : 'Stay',
          confirm: fa ? 'صفحهٔ اصلی' : 'Go to home'
        }}
      />
      <main id="home">
        <h1>{fa ? 'پرداخت' : 'Payment'}</h1>
      </main>
    </>
  );
}
