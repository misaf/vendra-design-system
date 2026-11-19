import React from 'react';
import {StorefrontBagRecipient} from './StorefrontBagRecipient.jsx';

const copy = {
  en: {
    title: 'Recipient',
    name: 'Full name',
    phone: 'Mobile number',
    error: 'Check this field.',
    saved: 'Saved addresses',
    home: 'Home',
    work: 'Work'
  },
  fa: {
    title: 'گیرنده',
    name: 'نام کامل',
    phone: 'شماره همراه',
    error: 'این فیلد را بررسی کنید.',
    saved: 'نشانی‌های ذخیره‌شده',
    home: 'خانه',
    work: 'محل کار'
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [invalid, setInvalid] = React.useState(false);
  const [changed, setChanged] = React.useState('');
  const [nameCalls, setNameCalls] = React.useState(0);
  const [phoneCalls, setPhoneCalls] = React.useState(0);
  const [visible, setVisible] = React.useState(true);
  const [empty, setEmpty] = React.useState(false);
  const [selected, setSelected] = React.useState('home');
  const [picked, setPicked] = React.useState('');
  const [pickCalls, setPickCalls] = React.useState(0);

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
        <input
          type="checkbox"
          checked={visible}
          onChange={event => setVisible(event.target.checked)}
        />{' '}
        Show saved addresses
      </label>
      <label>
        <input type="checkbox" checked={empty} onChange={event => setEmpty(event.target.checked)} />{' '}
        Empty saved addresses
      </label>
      <button
        type="button"
        onClick={() => {
          setName(lang === 'fa' ? 'مینا' : 'Mina');
          setPhone('09120000000');
        }}
      >
        Set supplied values
      </button>
      <section aria-labelledby="vf-recipient-title">
        <StorefrontBagRecipient
          title={t.title}
          saved={{
            visible,
            label: t.saved,
            options: empty
              ? []
              : ['home', 'work'].map(id => ({
                  label: t[id],
                  on: selected === id,
                  pick: () => {
                    setSelected(id);
                    setPicked(id);
                    setPickCalls(count => count + 1);
                  }
                }))
          }}
          name={{
            label: t.name,
            value: name,
            error: invalid ? t.error : '',
            onChange: value => {
              setName(value);
              setNameCalls(count => count + 1);
            }
          }}
          phone={{
            label: t.phone,
            value: phone,
            error: invalid ? t.error : '',
            onChange: (value, metadata) => {
              setPhone(value);
              setChanged(JSON.stringify({value, ...metadata}));
              setPhoneCalls(count => count + 1);
            }
          }}
        />
      </section>
      <span data-test="name">{name}</span>
      <span data-test="phone">{phone}</span>
      <span data-test="changed">{changed}</span>
      <span data-test="name-calls">{nameCalls}</span>
      <span data-test="phone-calls">{phoneCalls}</span>
      <span data-test="picked">{picked}</span>
      <span data-test="pick-calls">{pickCalls}</span>
    </main>
  );
}
