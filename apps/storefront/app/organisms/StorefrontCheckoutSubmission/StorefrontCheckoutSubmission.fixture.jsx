import React from 'react';
import {StorefrontCheckoutSubmission} from './StorefrontCheckoutSubmission.jsx';

const copy = {
  en: {
    whatsapp: 'Send the receipt on WhatsApp',
    processing: 'Placing your order…',
    failTitle: 'We could not place your order',
    failBody: 'Nothing was charged. Try again in a moment.',
    retry: 'Try again',
    other: 'Choose another method',
    safe: 'Your payment details are never stored.',
    place: 'Place order',
    back: 'Back to delivery'
  },
  fa: {
    whatsapp: 'ارسال رسید در واتس‌اپ',
    processing: 'در حال ثبت سفارش…',
    failTitle: 'ثبت سفارش انجام نشد',
    failBody: 'مبلغی برداشت نشد. کمی بعد دوباره امتحان کنید.',
    retry: 'تلاش دوباره',
    other: 'انتخاب روش دیگر',
    safe: 'اطلاعات پرداخت شما ذخیره نمی‌شود.',
    place: 'ثبت سفارش',
    back: 'بازگشت به ارسال'
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [state, setState] = React.useState('ready');
  const [log, setLog] = React.useState('');
  return (
    <div className="tw:flex tw:flex-col tw:gap-4 tw:max-w-form">
      <StorefrontCheckoutSubmission
        whatsapp={{
          visible: true,
          href: '#whatsapp',
          onClick: () => setLog('whatsapp'),
          label: t.whatsapp
        }}
        processing={t.processing}
        failure={{
          visible: state === 'failed',
          title: t.failTitle,
          body: t.failBody,
          retry: {label: t.retry, onClick: () => setState('ready')},
          other: {label: t.other, onClick: () => setLog('other')}
        }}
        safe={t.safe}
        place={{
          label: t.place,
          loading: state === 'placing',
          disabled: false,
          onClick: () => setState('placing')
        }}
        back={{
          label: t.back,
          href: '#delivery',
          onClick: event => {
            event.preventDefault();
            setLog('back');
          }
        }}
      />
      <div className="tw:flex tw:gap-3">
        <button type="button" onClick={() => setState('failed')}>
          Fail the request
        </button>
      </div>
      <output aria-label="Last action">{log}</output>
    </div>
  );
}
