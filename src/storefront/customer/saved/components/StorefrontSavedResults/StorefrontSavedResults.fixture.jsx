import React from 'react';
import {StorefrontSavedResults} from './StorefrontSavedResults.jsx';
import {StorefrontSavedLayout} from '../StorefrontSavedLayout/StorefrontSavedLayout.jsx';
const copy = {
  en: {
    title: 'Saved designs',
    sub: 'Seasonal flowers',
    price: '490,000 toman',
    badge: 'New arrival',
    photo: 'Product photo',
    unsave: 'Remove saved design',
    add: 'Add to bag',
    size: 'Choose a size',
    unavailable: 'Unavailable'
  },
  fa: {
    title: 'طرح‌های ذخیره‌شده',
    sub: 'گل‌های فصل',
    price: '۴۹۰٬۰۰۰ تومان',
    badge: 'تازه رسیده',
    photo: 'عکس محصول',
    unsave: 'حذف طرح ذخیره‌شده',
    add: 'افزودن به سبد',
    size: 'انتخاب اندازه',
    unavailable: 'ناموجود'
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [removed, setRemoved] = React.useState([]);
  const [empty, setEmpty] = React.useState(false);
  const [action, setAction] = React.useState('');
  const ids = ['VF-7K2M4Q', 'VF-8P3N5R', 'VF-9A4B6C', 'VF-2D5E7F'];
  const products = empty
    ? []
    : ids
        .filter(id => !removed.includes(id))
        .map(id => {
          const index = ids.indexOf(id);
          return {
            name: id,
            sub: t.sub,
            price: t.price,
            badge: index === 0 ? t.badge : '',
            stock: {status: index === 2 ? 'out' : 'in'},
            images: index === 0 ? [{src: '/assets/categories/bouquets.webp', alt: id}] : [],
            href: '#' + id,
            remove: () => {
              setAction('remove:' + id);
              setRemoved(current => [...current, id]);
            },
            action:
              index === 0
                ? {
                    kind: 'add',
                    label: t.add,
                    ariaLabel: t.add + ' ' + id,
                    onAdd: () => setAction('add:' + id)
                  }
                : index === 1
                  ? {
                      kind: 'size',
                      label: t.size,
                      ariaLabel: t.size + ' ' + id,
                      href: '#' + id + '-size'
                    }
                  : index === 2
                    ? {kind: 'unavailable', label: t.unavailable}
                    : undefined
          };
        });
  return (
    <StorefrontSavedLayout
      showResults={true}
      showEmpty={false}
      heading={
        <>
          <h1>{t.title}</h1>
          <label>
            <input
              type="checkbox"
              checked={empty}
              onChange={event => setEmpty(event.target.checked)}
            />{' '}
            Empty products
          </label>
        </>
      }
      notice={<span data-test="action">{action}</span>}
      results={
        <StorefrontSavedResults products={products} labels={{photo: t.photo, unsave: t.unsave}} />
      }
      empty={null}
      added={null}
    />
  );
}
