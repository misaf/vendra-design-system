import React from 'react';
import {StorefrontAnnouncement} from './StorefrontAnnouncement.jsx';
const copy = {
  en: {
    label: 'Store news',
    close: 'Close news',
    text: 'Delivery is available today in Karaj.',
    phone: 'Delivery today',
    link: 'Shop today'
  },
  fa: {
    label: 'خبر فروشگاه',
    close: 'بستن خبر',
    text: 'ارسال امروز در کرج امکان‌پذیر است.',
    phone: 'ارسال امروز',
    link: 'خرید برای امروز'
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [empty, setEmpty] = React.useState(false);
  const [same, setSame] = React.useState(false);
  const [linked, setLinked] = React.useState(true);
  const [dismissible, setDismissible] = React.useState(true);
  const [closed, setClosed] = React.useState(0);
  return (
    <main>
      <h1>{t.label}</h1>
      <label>
        <input type="checkbox" checked={empty} onChange={event => setEmpty(event.target.checked)} />{' '}
        Empty message
      </label>
      <label>
        <input type="checkbox" checked={same} onChange={event => setSame(event.target.checked)} />{' '}
        Matching phone text
      </label>
      <label>
        <input
          type="checkbox"
          checked={linked}
          onChange={event => setLinked(event.target.checked)}
        />{' '}
        Show action
      </label>
      <label>
        <input
          type="checkbox"
          checked={dismissible}
          onChange={event => setDismissible(event.target.checked)}
        />{' '}
        Allow dismissal
      </label>
      <StorefrontAnnouncement
        label={t.label}
        closeLabel={t.close}
        onClose={dismissible ? () => setClosed(count => count + 1) : undefined}
        text={empty ? '' : t.text}
        phoneText={same ? t.text : t.phone}
        link={linked ? {href: '#today', label: t.link} : undefined}
      />
      <span data-test="closed">{closed}</span>
    </main>
  );
}
