import React from 'react';
import {StorefrontShopResults} from './StorefrontShopResults.jsx';
const copy = {
  en: {
    title: 'Shop results',
    sub: 'Seasonal flowers',
    price: '490,000 toman',
    badge: 'New arrival',
    photo: 'Product photo',
    save: 'Save design',
    loading: 'Loading designs.',
    failed: 'Designs could not be loaded.',
    retry: 'Try loading again',
    emptyTitle: 'No matching',
    emptyAccent: 'designs',
    emptyBody: 'Try changing the filters.',
    clear: 'Reset filters',
    more: 'Show more designs',
    partial: 'Showing 2 of 3 designs',
    complete: 'Showing all 3 designs'
  },
  fa: {
    title: 'نتایج فروشگاه',
    sub: 'گل‌های فصل',
    price: '۴۹۰٬۰۰۰ تومان',
    badge: 'تازه رسیده',
    photo: 'عکس محصول',
    save: 'ذخیره طرح',
    loading: 'طرح‌ها در حال بارگیری هستند.',
    failed: 'بارگیری طرح‌ها انجام نشد.',
    retry: 'بارگیری دوباره',
    emptyTitle: 'هیچ طرح',
    emptyAccent: 'مطابقی نیست',
    emptyBody: 'فیلترها را تغییر دهید.',
    clear: 'بازنشانی فیلترها',
    more: 'نمایش طرح‌های بیشتر',
    partial: 'نمایش ۲ از ۳ طرح',
    complete: 'نمایش هر ۳ طرح'
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [hasItems, setHasItems] = React.useState(true);
  const [showPaging, setShowPaging] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);
  const [soft, setSoft] = React.useState(false);
  const [shown, setShown] = React.useState(2);
  const [favorites, setFavorites] = React.useState({'VF-7K2M4Q': true});
  const [action, setAction] = React.useState('');
  const ids = ['VF-7K2M4Q', 'VF-8P3N5R', 'VF-9A4B6C'];
  return (
    <main>
      <h1>{t.title}</h1>
      <label>
        <input
          type="checkbox"
          checked={hasItems}
          onChange={event => setHasItems(event.target.checked)}
        />{' '}
        Show products
      </label>
      <label>
        <input
          type="checkbox"
          checked={showPaging}
          onChange={event => setShowPaging(event.target.checked)}
        />{' '}
        Show paging
      </label>
      <label>
        <input
          type="checkbox"
          checked={loading}
          onChange={event => setLoading(event.target.checked)}
        />{' '}
        Loading feedback
      </label>
      <label>
        <input
          type="checkbox"
          checked={failed}
          onChange={event => setFailed(event.target.checked)}
        />{' '}
        Error feedback
      </label>
      <label>
        <input type="checkbox" checked={empty} onChange={event => setEmpty(event.target.checked)} />{' '}
        Empty feedback
      </label>
      <label>
        <input type="checkbox" checked={soft} onChange={event => setSoft(event.target.checked)} />{' '}
        Soft image frame
      </label>
      <StorefrontShopResults
        products={ids.slice(0, shown).map((id, index) => ({
          name: id,
          sub: t.sub,
          price: t.price,
          badge: index === 0 ? t.badge : '',
          stock: {status: index === 1 ? 'out' : 'in'},
          images: [{src: '/assets/categories/bouquets.webp', alt: id}],
          fav: !!favorites[id],
          toggleFav: () => {
            setFavorites(current => ({...current, [id]: !current[id]}));
            setAction('favorite:' + id);
          },
          href: '#' + id,
          select: () => setAction('select:' + id)
        }))}
        frame={soft ? 'soft' : 'arch'}
        hasItems={hasItems}
        showPaging={showPaging}
        paging={{
          shown,
          total: 3,
          status: shown === 2 ? t.partial : t.complete,
          label: t.more,
          href: '#next-page',
          onClick: () => {
            setShown(3);
            setAction('more');
          }
        }}
        feedback={{
          loading,
          failed,
          empty,
          onRetry: () => setAction('retry'),
          onClear: () => setAction('clear')
        }}
        labels={t}
      />
      <span data-test="action">{action}</span>
    </main>
  );
}
