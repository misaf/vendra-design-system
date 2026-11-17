import React from 'react';
import {StorefrontTrackReorderDialog} from './StorefrontTrackReorderDialog.jsx';

const copy = {
  en: {
    open: 'Review repeat order',
    title: 'Repeat this order',
    cancel: 'Cancel review',
    confirm: 'Confirm repeat order',
    legend: 'Existing bag',
    add: 'Add to bag',
    addHint: 'Keep the current items.',
    replace: 'Replace bag',
    replaceHint: 'Remove the current items.',
    intro: 'The available items will start a new bag.',
    changes: ['VF-7K2M4Q has a new price.', 'VF-8P3N5R is unavailable.'],
    empty: 'No items can be ordered again.'
  },
  fa: {
    open: 'بررسی سفارش دوباره',
    title: 'تکرار این سفارش',
    cancel: 'لغو بررسی',
    confirm: 'تأیید سفارش دوباره',
    legend: 'سبد فعلی',
    add: 'افزودن به سبد',
    addHint: 'کالاهای فعلی حفظ می‌شوند.',
    replace: 'جایگزینی سبد',
    replaceHint: 'کالاهای فعلی حذف می‌شوند.',
    intro: 'کالاهای موجود به سبد جدید اضافه می‌شوند.',
    changes: ['قیمت VF-7K2M4Q تغییر کرده است.', 'VF-8P3N5R موجود نیست.'],
    empty: 'هیچ کالایی برای سفارش دوباره موجود نیست.'
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState('add');
  const [choice, setChoice] = React.useState(true);
  const [changes, setChanges] = React.useState(true);
  const [empty, setEmpty] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState('');
  const [confirmCount, setConfirmCount] = React.useState(0);
  const [closed, setClosed] = React.useState(0);
  const close = () => {
    setOpen(false);
    setClosed(count => count + 1);
  };
  return (
    <main>
      <h1>{t.title}</h1>
      <label>
        <input
          type="checkbox"
          checked={choice}
          onChange={event => setChoice(event.target.checked)}
        />{' '}
        Existing bag
      </label>
      <label>
        <input
          type="checkbox"
          checked={changes}
          onChange={event => setChanges(event.target.checked)}
        />{' '}
        Changed items
      </label>
      <label>
        <input type="checkbox" checked={empty} onChange={event => setEmpty(event.target.checked)} />{' '}
        Unavailable order
      </label>
      <label>
        <input
          type="checkbox"
          checked={disabled}
          onChange={event => setDisabled(event.target.checked)}
        />{' '}
        Disable confirmation
      </label>
      <button type="button" onClick={() => setOpen(true)}>
        {t.open}
      </button>
      <StorefrontTrackReorderDialog
        open={open}
        onClose={close}
        title={t.title}
        cancelLabel={t.cancel}
        confirm={{
          label: t.confirm,
          disabled,
          onClick: () => {
            setConfirmed(mode);
            setConfirmCount(count => count + 1);
          }
        }}
        choice={{
          visible: choice,
          legend: t.legend,
          value: mode,
          onChange: setMode,
          add: {label: t.add, description: t.addHint},
          replace: {label: t.replace, description: t.replaceHint}
        }}
        intro={t.intro}
        changes={changes ? t.changes : []}
        empty={{visible: empty, message: t.empty}}
      />
      <span data-test="confirmed">{confirmed}</span>
      <span data-test="confirm-count">{confirmCount}</span>
      <span data-test="closed">{closed}</span>
      <span data-test="mode">{mode}</span>
    </main>
  );
}
