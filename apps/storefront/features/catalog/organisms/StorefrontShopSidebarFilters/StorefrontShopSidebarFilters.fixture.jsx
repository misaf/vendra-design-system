import React from 'react';
import {StorefrontShopSidebarFilters} from './StorefrontShopSidebarFilters.jsx';

const copy = {
  en: {
    title: 'Shop filters',
    open: 'Open filters',
    occasion: 'Occasion',
    all: 'Any occasion',
    birthday: 'Birthday',
    date: 'Delivery date',
    hint: 'Choose an available day.',
    any: 'Any day',
    unavailable: 'Today unavailable',
    tomorrow: 'Tomorrow',
    price: 'Price range',
    low: 'Minimum',
    high: 'Maximum',
    stock: 'In stock only',
    show: 'Show results',
    clear: 'Clear filters'
  },
  fa: {
    title: 'فیلترهای فروشگاه',
    open: 'باز کردن فیلترها',
    occasion: 'مناسبت',
    all: 'همه مناسبت‌ها',
    birthday: 'تولد',
    date: 'تاریخ تحویل',
    hint: 'یک روز موجود انتخاب کنید.',
    any: 'هر روز',
    unavailable: 'امروز ناموجود',
    tomorrow: 'فردا',
    price: 'بازه قیمت',
    low: 'کمینه',
    high: 'بیشینه',
    stock: 'فقط موجودها',
    show: 'نمایش نتایج',
    clear: 'پاک کردن فیلترها'
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [occasion, setOccasion] = React.useState('all');
  const [date, setDate] = React.useState('any');
  const [price, setPrice] = React.useState([20, 80]);
  const [stock, setStock] = React.useState(false);
  const [action, setAction] = React.useState('');

  return (
    <main className="tw:max-w-form">
      <h1>{t.title}</h1>

      <StorefrontShopSidebarFilters
        occasion={{
          label: t.occasion,
          options: [
            {
              label: t.all,
              on: occasion === 'all',
              pick: () => {
                setOccasion('all');
                setAction('occasion:all');
              }
            },
            {
              label: t.birthday,
              on: occasion === 'birthday',
              pick: () => {
                setOccasion('birthday');
                setAction('occasion:birthday');
              }
            }
          ]
        }}
        date={{
          label: t.date,
          hint: t.hint,
          value: date,
          onChange: value => {
            setDate(value);
            setAction('date:' + value);
          },
          options: [
            {value: 'any', label: t.any},
            {value: 'today', label: t.unavailable, disabled: true},
            {value: 'tomorrow', label: t.tomorrow}
          ]
        }}
        price={{
          label: t.price,
          min: 0,
          max: 100,
          step: 10,
          value: price,
          onChange: value => {
            setPrice(value);
            setAction('price:' + value.join('-'));
          },
          formatValue: value =>
            new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US').format(value) + ' T',
          labels: {min: t.low, max: t.high}
        }}
        stock={{
          label: t.stock,
          checked: stock,
          onChange: value => {
            setStock(value);
            setAction('stock:' + value);
          }
        }}
      />
      <span data-test="state">{JSON.stringify({occasion, date, price, stock})}</span>
      <span data-test="action">{action}</span>
    </main>
  );
}
