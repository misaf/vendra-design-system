import React from 'react';
import {StorefrontProductSticky} from './StorefrontProductSticky.jsx';

const copy = {
  en: {
    total: 'Selection total',
    add: 'Add to bag',
    available: 'Design available',
    update: 'Update supplied total',
    one: '2,400,000 toman',
    two: '3,100,000 toman'
  },
  fa: {
    total: 'جمع انتخاب',
    add: 'افزودن به سبد',
    available: 'طرح موجود است',
    update: 'به‌روزرسانی جمع',
    one: '۲٬۴۰۰٬۰۰۰ تومان',
    two: '۳٬۱۰۰٬۰۰۰ تومان'
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [available, setAvailable] = React.useState(false);
  const [total, setTotal] = React.useState(t.one);
  const [adds, setAdds] = React.useState(0);
  return (
    <div className="tw:flex tw:flex-col tw:gap-4">
      <StorefrontProductSticky
        summary={{label: t.total, total}}
        add={{label: t.add, disabled: !available, onClick: () => setAdds(count => count + 1)}}
      />
      <label>
        <input
          type="checkbox"
          checked={available}
          onChange={event => setAvailable(event.target.checked)}
        />
        {t.available}
      </label>
      <button type="button" onClick={() => setTotal(t.two)}>
        {t.update}
      </button>
      <span data-test="adds">{adds}</span>
    </div>
  );
}
