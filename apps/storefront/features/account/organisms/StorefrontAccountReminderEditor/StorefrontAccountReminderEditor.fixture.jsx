import React from 'react';
import {StorefrontAccountEditorDialog} from '../StorefrontAccountEditorDialog/StorefrontAccountEditorDialog.jsx';
import {StorefrontAccountReminderEditor} from './StorefrontAccountReminderEditor.jsx';

const copy = {
  en: {
    title: 'Edit reminder',
    name: 'Reminder name',
    nameError: 'Enter a reminder name',
    occasion: 'Occasion',
    birthday: 'Birthday',
    anniversary: 'Anniversary',
    date: 'Event date',
    month: 'Event month',
    day: 'Event day',
    hint: 'Choose the recurring month and day',
    locked: 'This occasion has a fixed date',
    lock: 'Lock the event date',
    before: 'Remind me',
    one: 'One day before',
    seven: 'One week before',
    channel: 'Reminder channel',
    sms: 'SMS',
    whatsapp: 'WhatsApp',
    save: 'Save reminder',
    cancel: 'Cancel'
  },
  fa: {
    title: 'ویرایش یادآوری',
    name: 'عنوان یادآوری',
    nameError: 'عنوان یادآوری را وارد کنید',
    occasion: 'مناسبت',
    birthday: 'تولد',
    anniversary: 'سالگرد',
    date: 'تاریخ رویداد',
    month: 'ماه رویداد',
    day: 'روز رویداد',
    hint: 'ماه و روز تکرار رویداد را انتخاب کنید',
    locked: 'تاریخ این مناسبت ثابت است',
    lock: 'قفل کردن تاریخ رویداد',
    before: 'زمان یادآوری',
    one: 'یک روز قبل',
    seven: 'یک هفته قبل',
    channel: 'روش یادآوری',
    sms: 'پیامک',
    whatsapp: 'واتس‌اپ',
    save: 'ذخیره یادآوری',
    cancel: 'انصراف'
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [open, setOpen] = React.useState(true);
  const [name, setName] = React.useState('');
  const [occasion, setOccasion] = React.useState('birthday');
  const [date, setDate] = React.useState(
    lang === 'fa' ? {cal: 'j', m: 7, d: 16} : {cal: 'g', m: 10, d: 8}
  );
  const [before, setBefore] = React.useState('1');
  const [channel, setChannel] = React.useState('sms');
  const [locked, setLocked] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [saved, setSaved] = React.useState('');
  const problems = submitted && !name ? [{target: 'vf-reminder-name', text: t.nameError}] : [];
  return (
    <>
      <span data-test="saved">{saved}</span>
      <span data-test="date">{JSON.stringify(date)}</span>
      <StorefrontAccountEditorDialog
        open={open}
        title={t.title}
        saveError=""
        onClose={() => setOpen(false)}
        problems={problems}
        save={{
          label: t.save,
          onClick: () => {
            setSubmitted(true);
            if (!name) return;
            setSaved(JSON.stringify({name, occasion, date, before, channel}));
            setOpen(false);
          }
        }}
        cancelLabel={t.cancel}
      >
        <StorefrontAccountReminderEditor
          name={{
            label: t.name,
            value: name,
            onChange: setName,
            error: problems.length ? t.nameError : undefined
          }}
          occasion={{
            label: t.occasion,
            value: occasion,
            onChange: setOccasion,
            options: [
              {value: 'birthday', label: t.birthday},
              {value: 'anniversary', label: t.anniversary}
            ]
          }}
          date={{
            lang,
            label: t.date,
            value: date,
            onChange: setDate,
            disabled: locked,
            hint: locked ? t.locked : t.hint,
            labels: {month: t.month, day: t.day}
          }}
          before={{
            label: t.before,
            value: before,
            onChange: setBefore,
            options: [
              {value: '1', label: t.one},
              {value: '7', label: t.seven}
            ]
          }}
          channel={{
            label: t.channel,
            value: channel,
            onChange: setChannel,
            options: [
              {value: 'sms', label: t.sms},
              {value: 'whatsapp', label: t.whatsapp}
            ]
          }}
        />
        <button type="button" onClick={() => setLocked(true)}>
          {t.lock}
        </button>
      </StorefrontAccountEditorDialog>
    </>
  );
}
