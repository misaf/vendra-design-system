import React from 'react';
import {StorefrontSigninCompletion} from './StorefrontSigninCompletion.jsx';

const copy = {
  en: {
    title: 'You are',
    accent: 'signed in',
    body: 'Your account is ready.',
    checkout: 'Return to checkout',
    account: 'Open account',
    prompt: 'Add your name.',
    profile: 'Edit profile'
  },
  fa: {
    title: 'شما وارد',
    accent: 'شدید',
    body: 'حساب شما آماده است.',
    checkout: 'بازگشت به پرداخت',
    account: 'ورود به حساب',
    prompt: 'نام خود را اضافه کنید.',
    profile: 'ویرایش پروفایل'
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [fromCheckout, setFromCheckout] = React.useState(true);
  const [notFromCheckout, setNotFromCheckout] = React.useState(false);
  const [prompt, setPrompt] = React.useState(true);
  const [continued, setContinued] = React.useState(0);
  return (
    <main className="tw:flex tw:flex-col tw:gap-4 tw:max-w-form">
      <label>
        <input
          type="checkbox"
          checked={fromCheckout}
          onChange={event => setFromCheckout(event.target.checked)}
        />{' '}
        Checkout actions
      </label>
      <label>
        <input
          type="checkbox"
          checked={notFromCheckout}
          onChange={event => setNotFromCheckout(event.target.checked)}
        />{' '}
        Account action
      </label>
      <label>
        <input
          type="checkbox"
          checked={prompt}
          onChange={event => setPrompt(event.target.checked)}
        />{' '}
        Name prompt
      </label>
      <StorefrontSigninCompletion
        title={t.title}
        accent={t.accent}
        body={t.body}
        fromCheckout={fromCheckout}
        notFromCheckout={notFromCheckout}
        checkout={{
          href: '#checkout',
          label: t.checkout,
          onClick: event => {
            event.preventDefault();
            setContinued(count => count + 1);
          }
        }}
        account={{href: '#account', label: t.account}}
        namePrompt={prompt ? {text: t.prompt, label: t.profile, href: '#profile'} : null}
      />
      <span data-test="continued">{continued}</span>
    </main>
  );
}
