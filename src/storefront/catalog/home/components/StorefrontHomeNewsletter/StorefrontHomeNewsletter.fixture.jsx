import React from 'react';
import {StorefrontHomeNewsletter} from './StorefrontHomeNewsletter.jsx';
const copy = {
  en: {
    title: 'Studio letters',
    description: 'Occasional flower news by email.',
    email: 'Email address',
    submit: 'Subscribe',
    sending: 'Subscribing…',
    done: 'You are subscribed.',
    error: 'Check your email address.'
  },
  fa: {
    title: 'نامه‌های استودیو',
    description: 'گاه‌به‌گاه خبر گل‌ها را با ایمیل بخوانید.',
    email: 'نشانی ایمیل',
    submit: 'عضویت',
    sending: 'در حال عضویت…',
    done: 'عضو شدید.',
    error: 'نشانی ایمیل را بررسی کنید.'
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(true);
  const [done, setDone] = React.useState(false);
  const [invalid, setInvalid] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [changes, setChanges] = React.useState(0);
  const [submitted, setSubmitted] = React.useState('');
  const [sent, setSent] = React.useState(0);
  return (
    <main className="tw:flex tw:flex-col tw:gap-4 tw:max-w-form">
      <h1>{t.title}</h1>
      <label>
        <input type="checkbox" checked={open} onChange={e => setOpen(e.target.checked)} /> Show form
      </label>
      <label>
        <input type="checkbox" checked={done} onChange={e => setDone(e.target.checked)} /> Show
        completion
      </label>
      <label>
        <input type="checkbox" checked={invalid} onChange={e => setInvalid(e.target.checked)} />{' '}
        Show error
      </label>
      <label>
        <input type="checkbox" checked={sending} onChange={e => setSending(e.target.checked)} />{' '}
        Sending
      </label>
      <button type="button" onClick={() => setValue('mina@example.com')}>
        Set supplied email
      </button>
      <button
        type="button"
        onClick={() => {
          setOpen(false);
          setDone(true);
        }}
      >
        Complete externally
      </button>
      <StorefrontHomeNewsletter
        open={open}
        done={done}
        doneText={t.done}
        value={value}
        error={invalid ? t.error : ''}
        sending={sending}
        labels={t}
        onChange={value => {
          setValue(value);
          setChanges(count => count + 1);
        }}
        onSubmit={event => {
          event.preventDefault();
          setSent(count => count + 1);
          setSubmitted(value);
        }}
      />
      <span data-test="changes">{changes}</span>
      <span data-test="sent">{sent}</span>
      <span style={{overflowWrap: 'anywhere'}} data-test="submitted">
        {submitted}
      </span>
    </main>
  );
}
