import React from 'react';
import {StorefrontBagSchedule} from './StorefrontBagSchedule.jsx';

const copy = {
  en: {
    title: 'When should it arrive?',
    preparation: 'Bouquets need three hours to prepare.',
    review: 'Your delivery time is no longer available',
    suggestion: 'The next free time is tomorrow, 10:00–13:00.',
    confirm: 'Use this time',
    day: 'Day',
    slot: 'Time',
    days: [
      ['today', 'Today', 'Full'],
      ['tomorrow', 'Tomorrow', '18 Nov'],
      ['wed', 'Wednesday', '19 Nov']
    ],
    slots: [
      ['morning', '10:00–13:00'],
      ['afternoon', '13:00–16:00'],
      ['evening', '16:00–19:00']
    ]
  },
  fa: {
    title: 'چه زمانی برسد؟',
    preparation: 'آماده‌سازی دسته‌گل سه ساعت طول می‌کشد.',
    review: 'زمان ارسال انتخابی دیگر در دسترس نیست',
    suggestion: 'نزدیک‌ترین زمان آزاد فردا ۱۰ تا ۱۳ است.',
    confirm: 'همین زمان',
    day: 'روز',
    slot: 'ساعت',
    days: [
      ['today', 'امروز', 'تکمیل'],
      ['tomorrow', 'فردا', '۲۷ آبان'],
      ['wed', 'چهارشنبه', '۲۸ آبان']
    ],
    slots: [
      ['morning', '۱۰ تا ۱۳'],
      ['afternoon', '۱۳ تا ۱۶'],
      ['evening', '۱۶ تا ۱۹']
    ]
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [day, setDay] = React.useState('tomorrow');
  const [slot, setSlot] = React.useState(null);
  const [reviewing, setReviewing] = React.useState(true);
  return (
    <div className="tw:max-w-form">
      <StorefrontBagSchedule
        title={t.title}
        preparationNotice={t.preparation}
        review={{
          visible: reviewing,
          title: t.review,
          suggestion: t.suggestion,
          confirmLabel: t.confirm,
          onConfirm: () => {
            setDay('tomorrow');
            setSlot('morning');
            setReviewing(false);
          }
        }}
        day={{
          label: t.day,
          value: day,
          onChange: setDay,
          options: t.days.map(([value, label, desc]) => ({
            value,
            label,
            desc,
            off: value === 'today'
          }))
        }}
        slot={{
          label: t.slot,
          value: slot,
          onChange: setSlot,
          options: t.slots.map(([value, label]) => ({value, label, off: value === 'evening'}))
        }}
      />
      <output aria-label="Chosen time">{day + ' ' + (slot || '')}</output>
    </div>
  );
}
