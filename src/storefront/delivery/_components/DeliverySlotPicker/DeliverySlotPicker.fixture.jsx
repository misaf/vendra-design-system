import React from 'react';
import {DeliverySlotPicker} from './DeliverySlotPicker.jsx';

const copy = {
  en: {
    title: 'When should it arrive?',
    preparation: 'Bouquets need three hours to prepare.',
    review: 'Your delivery time is no longer available',
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
      <DeliverySlotPicker
        title={t.title}
        preparationNotice={t.preparation}
        review={reviewing ? t.review : ''}
        day={{
          label: t.day,
          value: day,
          onChange: value => {
            setDay(value);
            setSlot(null);
          },
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
          onChange: value => {
            setSlot(value);
            setReviewing(false);
          },
          options: t.slots.map(([value, label]) => ({value, label, off: value === 'evening'}))
        }}
      />
      <output aria-label="Chosen time">{day + ' ' + (slot || '')}</output>
    </div>
  );
}
