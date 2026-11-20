import React from 'react';
import {StorefrontSavedRemovalNotice} from './StorefrontSavedRemovalNotice.jsx';
const copy = {
  en: {
    title: 'Saved design removal',
    message: 'VF-7K2M4Q was removed from saved designs.',
    other: 'VF-8P3N5R was removed from saved designs.',
    undo: 'Restore design',
    otherUndo: 'Restore latest design'
  },
  fa: {
    title: 'حذف طرح ذخیره‌شده',
    message: 'VF-7K2M4Q از طرح‌های ذخیره‌شده حذف شد.',
    other: 'VF-8P3N5R از طرح‌های ذخیره‌شده حذف شد.',
    undo: 'بازگرداندن طرح',
    otherUndo: 'بازگرداندن آخرین طرح'
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [visible, setVisible] = React.useState(true);
  const [latest, setLatest] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [restored, setRestored] = React.useState('');
  return (
    <main>
      <h1>{t.title}</h1>
      <label>
        <input
          type="checkbox"
          checked={visible}
          onChange={event => setVisible(event.target.checked)}
        />{' '}
        Show removal notice
      </label>
      <label>
        <input
          type="checkbox"
          checked={latest}
          onChange={event => setLatest(event.target.checked)}
        />{' '}
        Latest removed design
      </label>
      {visible && (
        <StorefrontSavedRemovalNotice
          message={latest ? t.other : t.message}
          undo={{
            label: latest ? t.otherUndo : t.undo,
            onClick: () => {
              setCount(value => value + 1);
              setRestored(latest ? 'VF-8P3N5R' : 'VF-7K2M4Q');
            }
          }}
        />
      )}
      <span data-test="count">{count}</span>
      <span data-test="restored">{restored}</span>
    </main>
  );
}
