import React from 'react';
import {StorefrontWeddingsFormControls} from './StorefrontWeddingsFormControls.jsx';
const copy = {
  en: {
    title: 'Wedding inquiry',
    name: 'Name',
    email: 'Email',
    phone: 'Mobile number',
    event: 'Event',
    ceremony: 'Ceremony',
    reception: 'Reception',
    guests: 'Guest count',
    date: 'Event date',
    budget: 'Budget',
    small: 'Small',
    large: 'Large',
    message: 'Message',
    hint: 'Tell us about your plans.',
    send: 'Send inquiry',
    error: 'Check this field.'
  },
  fa: {
    title: 'درخواست مراسم',
    name: 'نام',
    email: 'ایمیل',
    phone: 'شماره همراه',
    event: 'مراسم',
    ceremony: 'عقد',
    reception: 'جشن',
    guests: 'تعداد مهمان',
    date: 'تاریخ مراسم',
    budget: 'بودجه',
    small: 'کم',
    large: 'زیاد',
    message: 'پیام',
    hint: 'از برنامه خود بگویید.',
    send: 'ارسال درخواست',
    error: 'این فیلد را بررسی کنید.'
  }
};
const initial = {
  name: '',
  email: '',
  phone: '',
  event: 'ceremony',
  guests: '',
  date: '2026-10-08',
  budget: 'small',
  message: ''
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [values, setValues] = React.useState(initial);
  const [changed, setChanged] = React.useState('');
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
      setChanged(key);
      if (key === 'phone') setMetadata(JSON.stringify({value, ...metadata}));
    },
    error: invalid ? t.error : ''
  });
  return (
    <main className="tw:flex tw:flex-col tw:gap-4 tw:max-w-form">
      <h1>{t.title}</h1>
      <label>
        <input type="checkbox" checked={invalid} onChange={e => setInvalid(e.target.checked)} />{' '}
        Show validation
      </label>
      <label>
        <input type="checkbox" checked={busy} onChange={e => setBusy(e.target.checked)} /> Busy
        submission
      </label>
      <button
        type="button"
        onClick={() =>
          setValues({
            ...initial,
            name: lang === 'fa' ? 'مینا' : 'Mina',
            phone: '09120000000',
            email: 'mina@example.com',
            guests: '80',
            message: 'A garden ceremony'
          })
        }
      >
        Set supplied values
      </button>
      <StorefrontWeddingsFormControls
        problems={
          invalid
            ? ['name', 'phone'].map(key => ({
                target: key === 'name' ? 'vf-wname' : 'vf-wphone',
                text: t[key] + ': ' + t.error
              }))
            : []
        }
        name={field('name')}
        email={field('email')}
        phone={field('phone')}
        event={{
          ...field('event'),
          options: ['ceremony', 'reception'].map(value => ({value, label: t[value]}))
        }}
        guests={field('guests')}
        date={{...field('date'), lang, minDate: '2026-10-05'}}
        budget={{
          ...field('budget'),
          options: ['small', 'large'].map(value => ({value, label: t[value]}))
        }}
        message={{...field('message'), hint: t.hint}}
        send={{
          label: t.send,
          busy,
          onClick: () => {
            setSent(count => count + 1);
            setSubmitted(JSON.stringify(values));
          }
        }}
      />
      <span data-test="changed">{changed}</span>
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
