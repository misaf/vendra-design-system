import React from 'react';
import {StorefrontCheckoutFooter} from './StorefrontCheckoutFooter.jsx';

export function Fixture({lang}) {
  const fa = lang === 'fa';
  const [opened, setOpened] = React.useState(false);
  return (
    <>
      <main>
        <h1>{fa ? 'پرداخت' : 'Payment'}</h1>
        {opened && <p role="status">{fa ? 'تنظیمات باز است' : 'Settings opened'}</p>}
      </main>
      <StorefrontCheckoutFooter
        links={[
          {href: '#privacy', label: fa ? 'حریم خصوصی' : 'Privacy'},
          {href: '#contact', label: fa ? 'تماس' : 'Contact'}
        ]}
        seals={[{kind: 'enamad', href: 'https://enamad.ir/'}]}
        consentSettingsLabel={fa ? 'تنظیمات کوکی' : 'Cookie settings'}
        onOpenConsent={() => setOpened(true)}
      />
    </>
  );
}
