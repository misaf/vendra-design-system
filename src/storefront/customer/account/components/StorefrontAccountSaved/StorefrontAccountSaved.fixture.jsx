import React from 'react';
import {StorefrontAccountSaved} from './StorefrontAccountSaved.jsx';

const copy = {
  en: {
    title: 'Saved flowers',
    sub: 'Seasonal bouquet',
    price: '490,000 toman',
    badge: 'New arrival',
    photo: 'Product photo',
    remove: 'Remove saved flower',
    emptyTitle: 'Save your',
    emptyAccent: 'favorites',
    emptyBody: 'Choose flowers to find here later.',
    browse: 'Browse flowers'
  },
  fa: {
    title: 'گل‌های ذخیره‌شده',
    sub: 'دسته‌گل فصل',
    price: '۴۹۰٬۰۰۰ تومان',
    badge: 'تازه رسیده',
    photo: 'عکس محصول',
    remove: 'حذف گل ذخیره‌شده',
    emptyTitle: 'گل‌های محبوب',
    emptyAccent: 'خود را ذخیره کنید',
    emptyBody: 'گل‌ها را برای دیدن در آینده انتخاب کنید.',
    browse: 'دیدن گل‌ها'
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [showItems, setShowItems] = React.useState(true);
  const [showEmpty, setShowEmpty] = React.useState(false);
  const [removed, setRemoved] = React.useState([]);
  const [action, setAction] = React.useState('');
  const ids = ['VF-7K2M4Q', 'VF-8P3N5R'];
  return (
    <main>
      <h1>{t.title}</h1>
      <label>
        <input
          type="checkbox"
          checked={showItems}
          onChange={event => setShowItems(event.target.checked)}
        />{' '}
        Show items
      </label>
      <label>
        <input
          type="checkbox"
          checked={showEmpty}
          onChange={event => setShowEmpty(event.target.checked)}
        />{' '}
        Empty feedback
      </label>
      <StorefrontAccountSaved
        showItems={showItems}
        showEmpty={showEmpty}
        items={ids
          .filter(id => !removed.includes(id))
          .map(id => ({
            name: id,
            sub: t.sub,
            price: t.price,
            badge: id === ids[0] ? t.badge : '',
            stock: {status: id === ids[0] ? 'in' : 'out'},
            images: id === ids[0] ? [{src: '/assets/categories/bouquets.webp', alt: id}] : [],
            href: '#' + id,
            remove: () => {
              setAction(id);
              setRemoved(current => [...current, id]);
            }
          }))}
        labels={t}
        shopHref="#shop"
      />
      <span data-test="action">{action}</span>
    </main>
  );
}
