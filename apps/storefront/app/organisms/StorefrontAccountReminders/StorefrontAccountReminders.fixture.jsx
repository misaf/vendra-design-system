import React from 'react';
import {StorefrontAccountReminders} from './StorefrontAccountReminders.jsx';

const copy = {
  en: {
    title: 'Reminders',
    add: 'Add an occasion',
    empty: 'No reminders saved.',
    comingTitle: 'Coming up next',
    intro: 'Choose when we remind you.',
    first: 'Mina birthday',
    second: 'Studio anniversary',
    when: 'Tomorrow',
    occasion: 'Birthday',
    before: 'One day before by SMS',
    month: 'November',
    altDate: '26 Aban',
    labels: {
      paused: 'Reminder paused',
      sendFlowers: 'Choose flowers',
      reminderFor: 'Notify for {name}',
      edit: 'Edit {name}',
      delete: 'Remove {name}'
    }
  },
  fa: {
    title: 'یادآورها',
    add: 'افزودن مناسبت',
    empty: 'یادآوری ذخیره نشده است.',
    comingTitle: 'مناسبت بعدی',
    intro: 'زمان یادآوری را انتخاب کنید.',
    first: 'تولد مینا',
    second: 'سالگرد استودیو',
    when: 'فردا',
    occasion: 'تولد',
    before: 'یک روز قبل با پیامک',
    month: 'آبان',
    altDate: '17 November',
    labels: {
      paused: 'یادآور متوقف',
      sendFlowers: 'انتخاب گل',
      reminderFor: 'اطلاع برای {name}',
      edit: 'ویرایش {name}',
      delete: 'حذف {name}'
    }
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [empty, setEmpty] = React.useState(false);
  const [coming, setComing] = React.useState(true);
  const [enabled, setEnabled] = React.useState({first: true, second: false});
  const [action, setAction] = React.useState('');
  return (
    <main>
      <h1>{t.title}</h1>
      <label>
        <input type="checkbox" checked={empty} onChange={event => setEmpty(event.target.checked)} />{' '}
        Empty collection
      </label>
      <label>
        <input
          type="checkbox"
          checked={coming}
          onChange={event => setComing(event.target.checked)}
        />{' '}
        Upcoming notice
      </label>
      <StorefrontAccountReminders
        add={{label: t.add, onClick: () => setAction('add')}}
        showEmpty={empty}
        emptyText={t.empty}
        coming={coming ? {name: t.first, when: t.when} : null}
        comingTitle={t.comingTitle}
        intro={t.intro}
        reminders={
          empty
            ? []
            : ['first', 'second'].map((id, index) => ({
                name: t[id],
                day: String(17 + index),
                month: t.month,
                occasion: t.occasion,
                icon: 'calendar-heart',
                before: t.before,
                channel: index ? 'wa' : 'sms',
                soon: index === 0,
                on: enabled[id],
                altDate: t.altDate,
                when: t.when,
                toggle: value => {
                  setEnabled(current => ({...current, [id]: value}));
                  setAction('toggle:' + id + ':' + value);
                },
                edit: () => setAction('edit:' + id),
                remove: () => setAction('delete:' + id)
              }))
        }
        shopHref="#shop"
        labels={t.labels}
      />
      <span data-test="action">{action}</span>
    </main>
  );
}
