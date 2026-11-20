import React from 'react';
import {StorefrontSigninCodeControls} from './StorefrontSigninCodeControls.jsx';

const copy = {
  en: {
    label: 'Verification code',
    action: 'Verify code',
    error: 'Check this field.',
    hint: 'Use the code sent by SMS.'
  },
  fa: {
    label: 'کد تأیید',
    action: 'تأیید کد',
    error: 'این فیلد را بررسی کنید.',
    hint: 'کد پیامک‌شده را وارد کنید.'
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [value, setValue] = React.useState('12');
  const [invalid, setInvalid] = React.useState(false);
  const [changed, setChanged] = React.useState('');
  const [submitted, setSubmitted] = React.useState('');
  const [count, setCount] = React.useState(0);
  const [completed, setCompleted] = React.useState('');
  const [completeCount, setCompleteCount] = React.useState(0);
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
      <StorefrontSigninCodeControls
        problems={invalid ? [{target: 'vf-code', text: t.error}] : []}
        code={{
          label: t.label,
          value,
          onChange: value => {
            setValue(value);
            setChanged(value);
          },
          error: invalid ? t.error : '',
          hint: t.hint,
          onComplete: value => {
            setCompleted(value);
            setCompleteCount(count => count + 1);
          }
        }}
        verify={{
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
      <span data-test="completed">{completed}</span>
      <span data-test="complete-count">{completeCount}</span>
    </main>
  );
}
