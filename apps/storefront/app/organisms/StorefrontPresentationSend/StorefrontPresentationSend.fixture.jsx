import React from 'react';
import {StorefrontPresentationSend} from './StorefrontPresentationSend.jsx';

const copy = {
  en: {
    open: 'Share product',
    link: 'Share link only',
    large: 'Share oversized selection',
    title: 'Send this design',
    body: 'Scan to open this design',
    qr: 'Design QR code',
    warning: 'This selection is too large to share',
    whatsapp: 'WhatsApp',
    copy: 'Copy link',
    copied: 'Link copied',
    printTag: 'Print tag'
  },
  fa: {
    open: 'اشتراک طرح',
    link: 'اشتراک فقط پیوند',
    large: 'اشتراک انتخاب بزرگ',
    title: 'ارسال این طرح',
    body: 'برای دیدن طرح اسکن کنید',
    qr: 'کد تصویری طرح',
    warning: 'این انتخاب برای اشتراک بیش از حد بزرگ است',
    whatsapp: 'واتس‌اپ',
    copy: 'کپی پیوند',
    copied: 'پیوند کپی شد',
    printTag: 'چاپ برچسب'
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [mode, setMode] = React.useState(null);
  const [copied, setCopied] = React.useState(false);
  const [prints, setPrints] = React.useState(0);
  const open = mode => {
    setCopied(false);
    setMode(mode);
  };
  const send = mode
    ? {
        title: t.title,
        body: t.body,
        code: mode === 'link' ? '' : 'VF-7K2M4Q',
        url: 'https://example.test/design/VF-7K2M4Q',
        qrLabel: t.qr,
        whatsapp: 'https://wa.me/15551234567?text=fixture',
        tooLong: mode === 'large',
        tooLongBody: t.warning,
        canCopy: mode !== 'link',
        copied,
        copy: () => setCopied(true),
        tag: mode !== 'link',
        print: () => setPrints(count => count + 1)
      }
    : null;
  return (
    <>
      <button type="button" onClick={() => open('product')}>
        {t.open}
      </button>
      <button type="button" onClick={() => open('link')}>
        {t.link}
      </button>
      <button type="button" onClick={() => open('large')}>
        {t.large}
      </button>
      <span data-test="prints">{prints}</span>
      <StorefrontPresentationSend send={send} labels={t} onClose={() => setMode(null)} />
    </>
  );
}
