import React from 'react';
import {StorefrontProductCare} from './StorefrontProductCare.jsx';

const copy = {
  en: {
    delivery: 'Delivery available tomorrow',
    inquiry: 'Ask about VF-7K2M4Q',
    care: 'Flower care',
    careBody: 'Change the water daily.',
    deliveryTitle: 'Delivery details',
    deliveryBody: 'Choose your delivery window in the bag.',
    custom: 'Keep this design away from direct sun.'
  },
  fa: {
    delivery: 'ارسال از فردا امکان‌پذیر است',
    inquiry: 'پرسش درباره VF-7K2M4Q',
    care: 'نگهداری گل',
    careBody: 'آب را هر روز عوض کنید.',
    deliveryTitle: 'جزئیات ارسال',
    deliveryBody: 'بازه ارسال را در سبد انتخاب کنید.',
    custom: 'این طرح را از نور مستقیم آفتاب دور نگه دارید.'
  }
};
export function Fixture({lang}) {
  const [inquiry, setInquiry] = React.useState(true);
  const [custom, setCustom] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);
  const t = copy[lang];
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={inquiry}
          onChange={event => setInquiry(event.target.checked)}
        />
        Inquiry
      </label>
      <label>
        <input
          type="checkbox"
          checked={custom}
          onChange={event => setCustom(event.target.checked)}
        />
        Custom care
      </label>
      <label>
        <input type="checkbox" checked={empty} onChange={event => setEmpty(event.target.checked)} />
        Empty items
      </label>
      <main>
        <StorefrontProductCare
          deliveryText={t.delivery}
          inquiry={{
            href: inquiry ? 'https://wa.me/15551234567?text=VF-7K2M4Q' : '',
            label: t.inquiry
          }}
          items={
            empty
              ? []
              : [
                  {id: 'care', title: t.care, content: <p>{custom ? t.custom : t.careBody}</p>},
                  {id: 'delivery', title: t.deliveryTitle, content: <p>{t.deliveryBody}</p>}
                ]
          }
        />
      </main>
    </>
  );
}
