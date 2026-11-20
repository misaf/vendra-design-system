import React from 'react';
import {StorefrontProductPurchase} from './StorefrontProductPurchase.jsx';

const copy = {
  en: {
    total: 'Selection total',
    hint: 'Includes the selected size and extras',
    quantity: {value: 'Design quantity', decrease: 'Fewer designs', increase: 'More designs'},
    save: 'Save design',
    unsave: 'Unsave design',
    add: 'Add to bag',
    unavailable: 'Design unavailable',
    totals: ['2,400,000 toman', '4,800,000 toman', '7,200,000 toman']
  },
  fa: {
    total: 'جمع انتخاب',
    hint: 'شامل اندازه و افزودنی‌های انتخاب‌شده',
    quantity: {value: 'تعداد طرح', decrease: 'کاهش تعداد طرح', increase: 'افزایش تعداد طرح'},
    save: 'ذخیره طرح',
    unsave: 'حذف طرح از ذخیره‌ها',
    add: 'افزودن به سبد',
    unavailable: 'طرح ناموجود است',
    totals: ['۲٬۴۰۰٬۰۰۰ تومان', '۴٬۸۰۰٬۰۰۰ تومان', '۷٬۲۰۰٬۰۰۰ تومان']
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [quantity, setQuantity] = React.useState(1);
  const [saved, setSaved] = React.useState(false);
  const [unavailable, setUnavailable] = React.useState(false);
  const [added, setAdded] = React.useState('');
  return (
    <div className="tw:flex tw:flex-col tw:gap-4 tw:max-w-form">
      <StorefrontProductPurchase
        summary={{label: t.total, total: t.totals[quantity - 1], hint: t.hint}}
        quantity={{value: quantity, max: 3, labels: t.quantity, onChange: setQuantity}}
        save={{
          label: saved ? t.unsave : t.save,
          active: saved,
          onClick: () => setSaved(current => !current)
        }}
        add={{
          label: t.add,
          disabled: unavailable,
          onClick: () => setAdded(JSON.stringify({quantity, saved}))
        }}
      />
      <label>
        <input
          type="checkbox"
          checked={unavailable}
          onChange={event => setUnavailable(event.target.checked)}
        />
        {t.unavailable}
      </label>
      <span data-test="quantity">{quantity}</span>
      <span data-test="saved">{String(saved)}</span>
      <span data-test="added">{added}</span>
    </div>
  );
}
