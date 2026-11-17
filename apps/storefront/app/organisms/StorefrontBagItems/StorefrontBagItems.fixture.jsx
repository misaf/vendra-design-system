import React from 'react';
import {StorefrontBagItems} from './StorefrontBagItems.jsx';

const copy = {
  en: {
    remove: 'Remove design',
    quantity: {value: 'Design quantity', decrease: 'Fewer designs', increase: 'More designs'},
    meta: 'Medium',
    note: 'Card: Happy birthday',
    price: '2,400,000 toman',
    priceNotice: 'This design has a new price',
    stockWarning: 'Only three of this design remain',
    unavailable: 'This design is unavailable',
    clear: 'Clear fixture lines'
  },
  fa: {
    remove: 'حذف طرح',
    quantity: {value: 'تعداد طرح', decrease: 'کاهش تعداد طرح', increase: 'افزایش تعداد طرح'},
    meta: 'متوسط',
    note: 'کارت: تولدت مبارک',
    price: '۲٬۴۰۰٬۰۰۰ تومان',
    priceNotice: 'قیمت این طرح تغییر کرده است',
    stockWarning: 'فقط سه عدد از این طرح باقی مانده است',
    unavailable: 'این طرح موجود نیست',
    clear: 'پاک کردن ردیف‌های نمونه'
  }
};
const initial = [
  {id: 'VF-7K2M4Q', qty: 1, max: 2},
  {id: 'VF-3P8R1T', qty: 2, max: 3},
  {id: 'VF-6MT3VY', qty: 1, max: 1}
];

export function Fixture({lang}) {
  const t = copy[lang];
  const [lines, setLines] = React.useState(initial);
  const [removed, setRemoved] = React.useState('');
  return (
    <div className="tw:max-w-form">
      <StorefrontBagItems
        lines={lines.map(line => ({
          name: line.id,
          image: '/assets/placeholder.svg',
          meta: t.meta,
          note: line.id === initial[0].id ? t.note : '',
          price: t.price,
          qty: line.qty,
          quantityMax: line.max,
          unavailable: line.id === initial[2].id,
          unavailableLabel: t.unavailable,
          priceNotice: line.id === initial[0].id ? t.priceNotice : '',
          stockWarning: line.id === initial[1].id ? t.stockWarning : '',
          setQty: qty =>
            setLines(current => current.map(item => (item.id === line.id ? {...item, qty} : item))),
          remove: () => {
            setRemoved(line.id);
            setLines(current => current.filter(item => item.id !== line.id));
          }
        }))}
        removeLabel={t.remove}
        quantityLabels={t.quantity}
        formatQuantity={value =>
          new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US').format(value)
        }
      />
      <button type="button" onClick={() => setLines([])}>
        {t.clear}
      </button>
      <span data-test="quantities">
        {JSON.stringify(Object.fromEntries(lines.map(line => [line.id, line.qty])))}
      </span>
      <span data-test="removed">{removed}</span>
    </div>
  );
}
