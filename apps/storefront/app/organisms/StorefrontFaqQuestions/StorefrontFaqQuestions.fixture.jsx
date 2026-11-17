import React from 'react';
import {StorefrontFaqQuestions} from './StorefrontFaqQuestions.jsx';
const copy = {
  en: {
    delivery: 'Delivery',
    orders: 'Orders',
    when: 'When will it arrive?',
    where: 'Where do you deliver?',
    edit: 'Can I change my order?',
    cancel: 'Can I cancel?',
    arrival: 'Choose a delivery window in your bag.',
    area: 'We deliver within the supplied studio area.',
    changes: 'Contact the studio before preparation.',
    cancellation: 'Contact the studio about cancellation.',
    contact: 'Contact the studio',
    replacement: 'Your selected delivery window is confirmed.'
  },
  fa: {
    delivery: 'ارسال',
    orders: 'سفارش‌ها',
    when: 'چه زمانی می‌رسد؟',
    where: 'به کجا ارسال می‌کنید؟',
    edit: 'می‌توانم سفارش را تغییر دهم؟',
    cancel: 'می‌توانم لغو کنم؟',
    arrival: 'بازه ارسال را در سبد انتخاب کنید.',
    area: 'در محدوده تعیین‌شده استودیو ارسال می‌کنیم.',
    changes: 'پیش از آماده‌سازی با استودیو تماس بگیرید.',
    cancellation: 'برای لغو با استودیو تماس بگیرید.',
    contact: 'تماس با استودیو',
    replacement: 'بازه ارسال انتخابی شما تایید شده است.'
  }
};
export function Fixture({lang}) {
  const [mode, setMode] = React.useState('two');
  const [replacement, setReplacement] = React.useState(false);
  const t = copy[lang];
  const groups = [
    {
      id: 'delivery-heading',
      title: t.delivery,
      open: 'arrival',
      items: [
        {id: 'arrival', title: t.when, content: <p>{replacement ? t.replacement : t.arrival}</p>},
        {id: 'area', title: t.where, content: <p>{t.area}</p>}
      ]
    },
    {
      id: 'orders-heading',
      title: t.orders,
      items: [
        {
          id: 'edit',
          title: t.edit,
          content: (
            <p>
              {t.changes} <a href="#contact">{t.contact}</a>
            </p>
          )
        },
        {id: 'cancel', title: t.cancel, content: <p>{t.cancellation}</p>}
      ]
    }
  ];
  const supplied =
    mode === 'empty'
      ? []
      : mode === 'one'
        ? groups.slice(0, 1)
        : mode === 'no-items'
          ? [{...groups[0], items: [], open: undefined}]
          : groups;
  return (
    <>
      <label>
        Groups
        <select value={mode} onChange={event => setMode(event.target.value)}>
          {['two', 'one', 'empty', 'no-items'].map(value => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={replacement}
          onChange={event => setReplacement(event.target.checked)}
        />
        Replacement answer
      </label>
      <main>
        <StorefrontFaqQuestions groups={supplied} />
      </main>
    </>
  );
}
