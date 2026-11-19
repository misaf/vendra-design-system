import React from 'react';
import {StorefrontBagFeedback} from './StorefrontBagFeedback.jsx';

const copy = {
  en: {
    removed: 'VF-7K2M4Q was removed',
    undo: 'Undo removal',
    title: 'Your bag is',
    accent: 'empty',
    body: 'Choose a design to start again.',
    recover: 'Restore sample bag',
    restored: 'Bag restored',
    showRemoved: 'Show removal notice',
    showEmpty: 'Show empty bag'
  },
  fa: {
    removed: 'VF-7K2M4Q حذف شد',
    undo: 'واگرد حذف',
    title: 'سبد شما',
    accent: 'خالی است',
    body: 'برای شروع دوباره یک طرح انتخاب کنید.',
    recover: 'بازیابی سبد نمونه',
    restored: 'سبد بازیابی شد',
    showRemoved: 'نمایش پیام حذف',
    showEmpty: 'نمایش سبد خالی'
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [removed, setRemoved] = React.useState(true);
  const [empty, setEmpty] = React.useState(true);
  const [action, setAction] = React.useState('');
  const restore = action => {
    setAction(action);
    setRemoved(false);
    setEmpty(false);
  };
  return (
    <>
      {removed && (
        <StorefrontBagFeedback
          variant="removed"
          labels={{title: t.removed, action: t.undo}}
          onAction={() => restore('undo')}
        />
      )}
      {empty && (
        <StorefrontBagFeedback
          variant="empty"
          labels={{title: t.title, accent: t.accent, body: t.body, action: t.recover}}
          onAction={() => restore('recover')}
        />
      )}
      {action && <p>{t.restored}</p>}
      <label>
        <input
          type="checkbox"
          checked={removed}
          onChange={event => setRemoved(event.target.checked)}
        />
        {t.showRemoved}
      </label>
      <label>
        <input type="checkbox" checked={empty} onChange={event => setEmpty(event.target.checked)} />
        {t.showEmpty}
      </label>
      <span data-test="action">{action}</span>
    </>
  );
}
