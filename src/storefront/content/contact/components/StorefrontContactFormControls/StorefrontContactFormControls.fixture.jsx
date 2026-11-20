import React from 'react';
import {StorefrontContactFormControls} from './StorefrontContactFormControls.jsx';
const copy = {
  en: {
    title: 'Contact us',
    name: 'Name',
    phone: 'Mobile number',
    hint: 'A number for your reply.',
    email: 'Email',
    message: 'Message',
    send: 'Send message',
    error: 'Check this field.'
  },
  fa: {
    title: 'تماس با ما',
    name: 'نام',
    phone: 'شماره همراه',
    hint: 'شماره‌ای برای پاسخ به شما.',
    email: 'ایمیل',
    message: 'پیام',
    send: 'ارسال پیام',
    error: 'این فیلد را بررسی کنید.'
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [values, setValues] = React.useState({name: '', phone: '', email: '', message: ''});
  const [changes, setChanges] = React.useState({name: 0, phone: 0, email: 0, message: 0});
  const [metadata, setMetadata] = React.useState('');
  const [invalid, setInvalid] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [sent, setSent] = React.useState(0);
  const [submitted, setSubmitted] = React.useState('');
  const field = key => ({
    label: t[key],
    value: values[key],
    onChange: (value, metadata) => {
      setValues(values => ({...values, [key]: value}));
      setChanges(changes => ({...changes, [key]: changes[key] + 1}));
      if (key === 'phone') setMetadata(JSON.stringify({value, ...metadata}));
    },
    error: invalid ? t.error : ''
  });
  return (
    <main className="tw:flex tw:flex-col tw:gap-4 tw:max-w-form">
      <h1>{t.title}</h1>
      <label>
        <input
          type="checkbox"
          checked={invalid}
          onChange={event => setInvalid(event.target.checked)}
        />{' '}
        Show validation
      </label>
      <label>
        <input type="checkbox" checked={busy} onChange={event => setBusy(event.target.checked)} />{' '}
        Busy submission
      </label>
      <button
        type="button"
        onClick={() =>
          setValues({
            name: lang === 'fa' ? 'مینا' : 'Mina',
            phone: '09120000000',
            email: 'mina@example.com',
            message: lang === 'fa' ? 'زمان بازدید؟' : 'When can I visit?'
          })
        }
      >
        Set supplied values
      </button>
      <StorefrontContactFormControls
        problems={
          invalid
            ? ['phone', 'email', 'message'].map(key => ({
                target: {phone: 'vf-cphone', email: 'vf-cemail', message: 'vf-cmsg'}[key],
                text: t[key] + ': ' + t.error
              }))
            : []
        }
        name={field('name')}
        phone={{...field('phone'), hint: t.hint}}
        email={field('email')}
        message={field('message')}
        send={{
          label: t.send,
          busy,
          onClick: () => {
            setSent(count => count + 1);
            setSubmitted(JSON.stringify(values));
          }
        }}
      />
      <span style={{overflowWrap: 'anywhere'}} data-test="changes">
        {JSON.stringify(changes)}
      </span>
      <span style={{overflowWrap: 'anywhere'}} data-test="values">
        {JSON.stringify(values)}
      </span>
      <span style={{overflowWrap: 'anywhere'}} data-test="metadata">
        {metadata}
      </span>
      <span data-test="sent">{sent}</span>
      <span style={{overflowWrap: 'anywhere'}} data-test="submitted">
        {submitted}
      </span>
    </main>
  );
}
