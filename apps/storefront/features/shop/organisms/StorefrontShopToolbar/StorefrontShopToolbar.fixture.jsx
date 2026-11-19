import React from 'react';
import {StorefrontShopToolbar} from './StorefrontShopToolbar.jsx';
const copy = {
  en: {
    title: 'Shop toolbar',
    filters: 'Open filters',
    quick: 'Quick filters',
    count: '12 designs',
    filteredCount: '3 matching designs',
    sort: 'Sort designs',
    recommended: 'Recommended',
    price: 'Price: low first',
    recent: 'Newest',
    ready: 'Ready to send',
    stock: 'In stock',
    birthday: 'Birthday',
    tomorrow: 'Tomorrow'
  },
  fa: {
    title: 'نوار ابزار فروشگاه',
    filters: 'باز کردن فیلترها',
    quick: 'فیلترهای سریع',
    count: '۱۲ طرح',
    filteredCount: '۳ طرح مطابق',
    sort: 'مرتب‌سازی طرح‌ها',
    recommended: 'پیشنهادی',
    price: 'قیمت از کم',
    recent: 'جدیدترین',
    ready: 'آماده ارسال',
    stock: 'موجود',
    birthday: 'تولد',
    tomorrow: 'فردا'
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [sort, setSort] = React.useState('recommended');
  const [filters, setFilters] = React.useState(['birthday', 'tomorrow']);
  const [quick, setQuick] = React.useState({ready: false, stock: true});
  const [action, setAction] = React.useState('');
  const [focused, setFocused] = React.useState('');
  return (
    <main>
      <h1>{t.title}</h1>
      <StorefrontShopToolbar
        labels={{
          filters: t.filters,
          quickFilters: t.quick,
          count: quick.ready ? t.filteredCount : t.count
        }}
        sort={{
          label: t.sort,
          value: sort,
          options: [
            {value: 'recommended', label: t.recommended},
            {value: 'price', label: t.price},
            {value: 'recent', label: t.recent}
          ],
          onChange: value => {
            setSort(value);
            setAction('sort:' + value);
          }
        }}
        activeFilters={filters.map(id => ({
          id,
          label: t[id],
          onRemove: () => {
            setFilters(current => current.filter(value => value !== id));
            setAction('remove:' + id);
          }
        }))}
        quickFilters={['ready', 'stock'].map(id => ({
          label: t[id],
          on: quick[id],
          toggle: () => {
            setQuick(current => ({...current, [id]: !current[id]}));
            setAction('quick:' + id);
          }
        }))}
        onOpenFilters={() => setAction('open')}
        onClearFilters={() => {
          setFilters([]);
          setAction('clear');
        }}
        onQuickFilterFocus={event => setFocused(event.target.textContent)}
      />
      <span data-test="action">{action}</span>
      <span data-test="focused">{focused}</span>
      <span data-test="sort">{sort}</span>
    </main>
  );
}
