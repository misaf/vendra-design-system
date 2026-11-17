import React from 'react';
import {StorefrontAccountProfile} from './StorefrontAccountProfile.jsx';

const copy = {
  en: {
    title: 'Profile',
    name: 'Your name',
    phone: 'Mobile number',
    phoneHint: 'Contact us to change your number.',
    email: 'Email',
    emailHint: 'For order receipts.',
    error: 'Enter a valid email.',
    language: 'Preferred language',
    languageHint: 'Choose account wording.',
    sms: 'Receive SMS updates',
    save: 'Save profile'
  },
  fa: {
    title: 'پروفایل',
    name: 'نام شما',
    phone: 'شماره همراه',
    phoneHint: 'برای تغییر شماره با ما تماس بگیرید.',
    email: 'ایمیل',
    emailHint: 'برای رسید سفارش.',
    error: 'ایمیل معتبر وارد کنید.',
    language: 'زبان ترجیحی',
    languageHint: 'زبان حساب را انتخاب کنید.',
    sms: 'دریافت پیامک',
    save: 'ذخیره پروفایل'
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [name, setName] = React.useState('Mina');
  const [email, setEmail] = React.useState('mina@example.test');
  const [language, setLanguage] = React.useState('fa');
  const [sms, setSms] = React.useState(true);
  const [invalid, setInvalid] = React.useState(false);
  const [saved, setSaved] = React.useState('');
  const [count, setCount] = React.useState(0);
  return (
    <main>
      <h1>{t.title}</h1>
      <label>
        <input
          type="checkbox"
          checked={invalid}
          onChange={event => setInvalid(event.target.checked)}
        />{' '}
        Email error
      </label>
      <StorefrontAccountProfile
        problems={invalid ? [{target: 'vf-pemail', text: t.error}] : []}
        name={{label: t.name, value: name, onChange: setName}}
        phone={{label: t.phone, value: '09123456789', hint: t.phoneHint}}
        email={{
          label: t.email,
          value: email,
          onChange: setEmail,
          hint: t.emailHint,
          error: invalid ? t.error : ''
        }}
        language={{
          label: t.language,
          value: language,
          onChange: setLanguage,
          hint: t.languageHint,
          options: [
            {value: 'fa', label: 'فارسی'},
            {value: 'en', label: 'English'}
          ]
        }}
        sms={{label: t.sms, checked: sms, onChange: setSms}}
        save={{
          label: t.save,
          onClick: () => {
            setSaved(JSON.stringify({name, email, language, sms}));
            setCount(count => count + 1);
          }
        }}
      />
      <span data-test="saved">{saved}</span>
      <span data-test="count">{count}</span>
    </main>
  );
}
