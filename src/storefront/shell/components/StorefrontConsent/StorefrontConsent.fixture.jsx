import React from 'react';
import {StorefrontConsent} from './StorefrontConsent.jsx';
const copy = {
  en: {
    title: 'Your privacy',
    body: 'Choose whether to allow optional analytics.',
    policy: 'Privacy policy',
    close: 'Close privacy notice',
    accept: 'Accept all',
    essential: 'Essential only'
  },
  fa: {
    title: 'حریم خصوصی شما',
    body: 'درباره تحلیل‌های اختیاری تصمیم بگیرید.',
    policy: 'سیاست حریم خصوصی',
    close: 'بستن اعلان حریم خصوصی',
    accept: 'پذیرفتن همه',
    essential: 'فقط ضروری'
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [shown, setShown] = React.useState(true);
  const [counts, setCounts] = React.useState({close: 0, accept: 0, essential: 0});
  const report = action => setCounts(counts => ({...counts, [action]: counts[action] + 1}));
  return (
    <main>
      <h1>{t.title}</h1>
      <label>
        <input type="checkbox" checked={shown} onChange={event => setShown(event.target.checked)} />{' '}
        Show notice
      </label>
      <StorefrontConsent
        shown={shown}
        title={t.title}
        body={t.body}
        policyHref="#privacy"
        policyLabel={t.policy}
        closeLabel={t.close}
        onClose={() => report('close')}
        acceptLabel={t.accept}
        onAccept={() => report('accept')}
        essentialLabel={t.essential}
        onEssential={() => report('essential')}
      />
      {Object.entries(counts).map(([key, value]) => (
        <span key={key} data-test={key}>
          {value}
        </span>
      ))}
    </main>
  );
}
