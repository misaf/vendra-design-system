import React from 'react';
import {StorefrontWeddingsCompletion} from './StorefrontWeddingsCompletion.jsx';
const copy = {
  en: {
    title: 'Inquiry received',
    body: 'We will reply about your event.',
    alternate: 'Demo complete',
    alternateBody: 'This demo did not send an inquiry.',
    edit: 'Return to inquiry'
  },
  fa: {
    title: 'درخواست دریافت شد',
    body: 'درباره مراسم شما پاسخ می‌دهیم.',
    alternate: 'نمایش کامل شد',
    alternateBody: 'در این نمایش درخواستی ارسال نشد.',
    edit: 'بازگشت به درخواست'
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [alternate, setAlternate] = React.useState(false);
  const [shown, setShown] = React.useState(true);
  const [edited, setEdited] = React.useState(0);
  return (
    <main className="tw:flex tw:flex-col tw:gap-4 tw:max-w-form">
      <h1>{t.title}</h1>
      <label>
        <input type="checkbox" checked={alternate} onChange={e => setAlternate(e.target.checked)} />{' '}
        Alternate content
      </label>
      <label>
        <input type="checkbox" checked={shown} onChange={e => setShown(e.target.checked)} /> Show
        completion
      </label>
      {shown && (
        <StorefrontWeddingsCompletion
          title={alternate ? t.alternate : t.title}
          body={alternate ? t.alternateBody : t.body}
          edit={{label: t.edit, onClick: () => setEdited(count => count + 1)}}
        />
      )}
      <span data-test="edited">{edited}</span>
    </main>
  );
}
