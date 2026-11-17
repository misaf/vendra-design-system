import React from 'react';
import {StorefrontPresentationToolbar} from './StorefrontPresentationToolbar.jsx';
const copy = {
  en: {
    title: 'Presentation controls',
    query: 'Find designs',
    placeholder: 'Enter a product code',
    category: 'Categories',
    all: 'All',
    ready: 'Ready',
    count: '2 designs',
    resume: 'Resume display',
    scan: 'Scan code',
    shortlist: 'Shortlist, 2',
    order: 'Order, 3',
    startOver: 'Next customer',
    settings: 'Settings'
  },
  fa: {
    title: 'کنترل‌های نمایش',
    query: 'یافتن طرح',
    placeholder: 'کد محصول را وارد کنید',
    category: 'دسته‌ها',
    all: 'همه',
    ready: 'آماده',
    count: '۲ طرح',
    resume: 'ادامه نمایش',
    scan: 'اسکن کد',
    shortlist: 'انتخاب‌ها، ۲',
    order: 'سفارش، ۳',
    startOver: 'مشتری بعدی',
    settings: 'تنظیمات'
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [query, setQuery] = React.useState('');
  const [kind, setKind] = React.useState('all');
  const [optional, setOptional] = React.useState(true);
  const [empty, setEmpty] = React.useState(false);
  const [action, setAction] = React.useState('');
  const [calls, setCalls] = React.useState(0);
  const [changed, setChanged] = React.useState(0);
  const [submitted, setSubmitted] = React.useState('');
  const report = action => {
    setAction(action);
    setCalls(count => count + 1);
  };
  const descriptor = key => ({label: t[key], onClick: () => report(key)});
  return (
    <main style={{containerType: 'inline-size'}}>
      <h1>{t.title}</h1>
      <label>
        <input
          type="checkbox"
          checked={optional}
          onChange={event => setOptional(event.target.checked)}
        />{' '}
        Show optional actions
      </label>
      <label>
        <input type="checkbox" checked={empty} onChange={event => setEmpty(event.target.checked)} />{' '}
        Empty categories
      </label>
      <button type="button" onClick={() => setQuery('VF-7K2M4Q')}>
        Set supplied query
      </button>
      <div className="vf-presentation-bar-row">
        <StorefrontPresentationToolbar
          search={{
            label: t.query,
            placeholder: t.placeholder,
            value: query,
            onChange: value => {
              setQuery(value);
              setChanged(count => count + 1);
            },
            onSubmit: value => setSubmitted(value)
          }}
          categoryLabel={t.category}
          kinds={
            empty
              ? []
              : ['all', 'ready'].map(id => ({
                  id,
                  label: t[id],
                  selected: kind === id,
                  pick: () => {
                    setKind(id);
                    report('kind:' + id);
                  }
                }))
          }
          countLabel={t.count}
          resume={descriptor('resume')}
          scan={optional ? descriptor('scan') : null}
          shortlist={{...descriptor('shortlist'), count: lang === 'fa' ? '۲' : '2'}}
          order={{...descriptor('order'), count: lang === 'fa' ? '۳' : '3'}}
          startOver={optional ? descriptor('startOver') : null}
          settings={descriptor('settings')}
        />
      </div>
      <span data-test="action">{action}</span>
      <span data-test="calls">{calls}</span>
      <span data-test="changed">{changed}</span>
      <span data-test="submitted">{submitted}</span>
    </main>
  );
}
