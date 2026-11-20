import React from 'react';
import {StorefrontContactCompletion} from './StorefrontContactCompletion.jsx';
const copy = {
  en: {
    title: 'Message received',
    body: 'We will reply using your contact details.',
    alternate: 'Demo complete',
    alternateBody: 'This demo did not send a message.',
    edit: 'Return to form'
  },
  fa: {
    title: 'پیام دریافت شد',
    body: 'از طریق اطلاعات تماس شما پاسخ می‌دهیم.',
    alternate: 'نمایش کامل شد',
    alternateBody: 'در این نمایش پیامی ارسال نشد.',
    edit: 'بازگشت به فرم'
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
        <input
          type="checkbox"
          checked={alternate}
          onChange={event => setAlternate(event.target.checked)}
        />{' '}
        Alternate supplied content
      </label>
      <label>
        <input type="checkbox" checked={shown} onChange={event => setShown(event.target.checked)} />{' '}
        Show completion
      </label>
      {shown && (
        <StorefrontContactCompletion
          title={alternate ? t.alternate : t.title}
          body={alternate ? t.alternateBody : t.body}
          edit={{label: t.edit, onClick: () => setEdited(count => count + 1)}}
        />
      )}
      <span data-test="edited">{edited}</span>
    </main>
  );
}
