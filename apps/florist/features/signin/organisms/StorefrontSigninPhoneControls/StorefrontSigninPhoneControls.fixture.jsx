import React from 'react';
import {StorefrontSigninPhoneControls} from './StorefrontSigninPhoneControls.jsx';

const copy = {
  en: {
    label: 'Mobile number',
    action: 'Send code',
    error: 'Check this field.',
    hint: 'Use the code sent by SMS.'
  },
  fa: {
    label: 'شماره همراه',
    action: 'ارسال کد',
    error: 'این فیلد را بررسی کنید.',
    hint: 'کد پیامک‌شده را وارد کنید.'
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [value, setValue] = React.useState('09120000000');
  const [invalid, setInvalid] = React.useState(false);
  const [changed, setChanged] = React.useState('');
  const [submitted, setSubmitted] = React.useState('');
  const [count, setCount] = React.useState(0);

  return (
    <main className="tw:flex tw:flex-col tw:gap-4 tw:max-w-form">
      <h1>{t.label}</h1>
      <label>
        <input
          type="checkbox"
          checked={invalid}
          onChange={event => setInvalid(event.target.checked)}
        />{' '}
        Show validation
      </label>
      <StorefrontSigninPhoneControls
        problems={invalid ? [{target: 'vf-phone', text: t.error}] : []}
        phone={{
          label: t.label,
          value,
          onChange: (value, metadata) => {
            setValue(value);
            setChanged(JSON.stringify({value, ...metadata}));
          },
          error: invalid ? t.error : ''
        }}
        send={{
          label: t.action,
          onClick: () => {
            setSubmitted(value);
            setCount(count => count + 1);
          }
        }}
      />
      <span data-test="changed">{changed}</span>
      <span data-test="submitted">{submitted}</span>
      <span data-test="count">{count}</span>
    </main>
  );
}
