import React from 'react';
import {StorefrontPresentationTools} from './StorefrontPresentationTools.jsx';
const copy = {
  en: {
    title: 'Seller tools',
    offline: 'You are offline',
    photoIssue: 'Some photos failed',
    stockIssue: 'Stock refresh failed',
    stockUpdated: 'Stock updated',
    retryPhotos: 'Retry photos',
    setupIntro: 'Set up this display.',
    setupTitle: 'Display setup',
    reviewSetup: 'Review setup',
    deviceStatus: 'Device status',
    screenStatus: 'Screen',
    wakeStatus: 'Wake lock',
    stockDemo: 'Demo stock',
    gallerySample: 'Sample gallery',
    browse: 'Browse designs',
    settings: 'Settings',
    shortlist: 'Shortlist',
    order: 'Order',
    scan: 'Scan code',
    startOver: 'Next customer',
    progress: 'Preparing photos',
    screen: 'Tablet',
    wake: 'Active',
    open: 'Open tools'
  },
  fa: {
    title: 'ابزارهای فروشنده',
    offline: 'آفلاین هستید',
    photoIssue: 'بعضی عکس‌ها بارگذاری نشد',
    stockIssue: 'موجودی به‌روز نشد',
    stockUpdated: 'زمان به‌روزرسانی موجودی',
    retryPhotos: 'تلاش دوباره برای عکس‌ها',
    setupIntro: 'این نمایشگر را تنظیم کنید.',
    setupTitle: 'راه‌اندازی نمایشگر',
    reviewSetup: 'بررسی راه‌اندازی',
    deviceStatus: 'وضعیت دستگاه',
    screenStatus: 'صفحه',
    wakeStatus: 'روشن نگه داشتن',
    stockDemo: 'موجودی نمایشی',
    gallerySample: 'گالری نمونه',
    browse: 'مرور طرح‌ها',
    settings: 'تنظیمات',
    shortlist: 'انتخاب‌ها',
    order: 'سفارش',
    scan: 'اسکن کد',
    startOver: 'مشتری بعدی',
    progress: 'آماده‌سازی عکس‌ها',
    screen: 'تبلت',
    wake: 'فعال',
    open: 'باز کردن ابزارها'
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [open, setOpen] = React.useState(false);
  const [online, setOnline] = React.useState(true);
  const [photoIssue, setPhotoIssue] = React.useState(true);
  const [stockIssue, setStockIssue] = React.useState(true);
  const [updated, setUpdated] = React.useState(true);
  const [done, setDone] = React.useState(false);
  const [review, setReview] = React.useState(true);
  const [scan, setScan] = React.useState(true);
  const [startOver, setStartOver] = React.useState(true);
  const [action, setAction] = React.useState('');
  const [calls, setCalls] = React.useState(0);
  const [closed, setClosed] = React.useState(0);
  const report = action => {
    setAction(action);
    setCalls(count => count + 1);
  };
  return (
    <main>
      <h1>{t.title}</h1>
      {[
        {label: 'Online', value: online, setValue: setOnline},
        {label: 'Photo issue', value: photoIssue, setValue: setPhotoIssue},
        {label: 'Stock issue', value: stockIssue, setValue: setStockIssue},
        {label: 'Stock timestamp', value: updated, setValue: setUpdated},
        {label: 'Setup done', value: done, setValue: setDone},
        {label: 'Can review', value: review, setValue: setReview},
        {label: 'Scan available', value: scan, setValue: setScan},
        {label: 'Start over available', value: startOver, setValue: setStartOver}
      ].map(({label, value, setValue}) => (
        <label key={label}>
          <input
            type="checkbox"
            checked={value}
            onChange={event => setValue(event.target.checked)}
          />{' '}
          {label}
        </label>
      ))}
      <button type="button" onClick={() => setOpen(true)}>
        {t.open}
      </button>
      <StorefrontPresentationTools
        open={open}
        onClose={() => {
          setOpen(false);
          setClosed(count => count + 1);
        }}
        labels={t}
        offline={{status: 'preparing', label: t.progress, progress: ' 2/3'}}
        online={online}
        photoIssue={photoIssue}
        stock={{issue: stockIssue, updated: updated ? '2026-11-17 09:30' : ''}}
        setup={{done, canReview: review, onOpen: () => report('setup')}}
        device={{screen: t.screen, wake: t.wake}}
        shortlist={{label: t.shortlist, onClick: () => report('shortlist')}}
        order={{label: t.order, onClick: () => report('order')}}
        scan={scan ? {label: t.scan, onClick: () => report('scan')} : null}
        startOver={startOver ? {label: t.startOver, onClick: () => report('startOver')} : null}
        onRetryPhotos={() => report('retry')}
        onBrowse={() => report('browse')}
        onSettings={() => report('settings')}
      />
      <span data-test="action">{action}</span>
      <span data-test="calls">{calls}</span>
      <span data-test="closed">{closed}</span>
    </main>
  );
}
