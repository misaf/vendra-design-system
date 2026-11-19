import React from 'react';
import {StorefrontBagCards} from './StorefrontBagCards.jsx';

const copy = {
  en: {
    title: 'Gift cards',
    hint: 'Write a message for each design',
    first: 'Card message for VF-7K2M4Q',
    second: 'Card message for VF-3P8R1T',
    detail: 'Up to 200 characters',
    required: 'Enter a card message',
    add: 'Add card',
    addAria: 'Add card to VF-3P8R1T',
    added: 'A card was added to VF-3P8R1T',
    undo: 'Undo',
    undoAria: 'Undo adding the card to VF-3P8R1T'
  },
  fa: {
    title: 'کارت‌های هدیه',
    hint: 'برای هر طرح یک پیام بنویسید',
    first: 'پیام کارت VF-7K2M4Q',
    second: 'پیام کارت VF-3P8R1T',
    detail: 'حداکثر ۲۰۰ نویسه',
    required: 'پیام کارت را وارد کنید',
    add: 'افزودن کارت',
    addAria: 'افزودن کارت به VF-3P8R1T',
    added: 'کارت به VF-3P8R1T اضافه شد',
    undo: 'واگرد',
    undoAria: 'واگرد افزودن کارت به VF-3P8R1T'
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [first, setFirst] = React.useState('');
  const [second, setSecond] = React.useState('');
  const [added, setAdded] = React.useState(false);
  return (
    <div className="tw:max-w-form">
      <StorefrontBagCards
        labels={{title: t.title, hint: t.hint, undo: t.undo}}
        notice={{
          message: added ? t.added : '',
          undoLabel: t.undoAria,
          onUndo: () => setAdded(false)
        }}
        lines={[
          {
            hasCard: true,
            id: 'card-first',
            value: first,
            setCard: setFirst,
            error: first ? undefined : t.required,
            label: t.first,
            detail: t.detail
          },
          {
            hasCard: added,
            noCard: !added,
            id: 'card-second',
            value: second,
            setCard: setSecond,
            label: t.second,
            name: 'VF-3P8R1T',
            detail: t.detail,
            addButtonId: 'add-card-second',
            addAria: t.addAria,
            addLabel: t.add,
            add: () => setAdded(true)
          }
        ]}
      />
      <span data-test="first-message">{first}</span>
      <span data-test="second-message">{second}</span>
    </div>
  );
}
