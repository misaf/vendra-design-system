import React from 'react';
import {StorefrontPresentationOrder} from './StorefrontPresentationOrder.jsx';

const copy = {
  en: {
    title: 'Order',
    clear: 'Clear order',
    handOver: 'Hand over',
    total: 'Total',
    empty: 'No designs in the order yet.',
    open: 'Open order'
  },
  fa: {
    title: 'سفارش',
    clear: 'پاک کردن سفارش',
    handOver: 'تحویل',
    total: 'جمع',
    empty: 'هنوز طرحی در سفارش نیست.',
    open: 'باز کردن سفارش'
  }
};
const start = [
  {id: 'a', name: 'VF-7K2M4Q', meta: 'Medium', price: 2400000, quantity: 1},
  {id: 'b', name: 'VF-3P8R1T', meta: 'Large', price: 3100000, quantity: 2}
];

export function Fixture({lang}) {
  const t = copy[lang];
  const [open, setOpen] = React.useState(true);
  const [lines, setLines] = React.useState(start);
  const [handedOver, setHandedOver] = React.useState(false);
  const total = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        {t.open}
      </button>
      <output aria-label="Handed over">{String(handedOver)}</output>
      <StorefrontPresentationOrder
        open={open}
        lines={lines.map(line => ({
          ...line,
          setQuantity: quantity =>
            setLines(current =>
              current.map(item => (item.id === line.id ? {...item, quantity} : item))
            ),
          remove: () => setLines(current => current.filter(item => item.id !== line.id))
        }))}
        showPrices={true}
        total={total}
        canHandOver={true}
        labels={t}
        formatQuantity={String}
        onClose={() => setOpen(false)}
        onClear={() => setLines([])}
        onHandOver={() => setHandedOver(true)}
      />
    </>
  );
}
