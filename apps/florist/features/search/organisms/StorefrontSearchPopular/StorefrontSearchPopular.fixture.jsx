import React from 'react';
import {StorefrontSearchPopular} from './StorefrontSearchPopular.jsx';

export function Fixture({lang}) {
  const fa = lang === 'fa';
  const labels = fa
    ? ['دسته گل', 'ارکیده', 'گل‌های فصل']
    : ['Bouquet', 'Orchid', 'Seasonal flowers'];
  const [selected, setSelected] = React.useState('');
  const [calls, setCalls] = React.useState(0);
  const [empty, setEmpty] = React.useState(false);
  return (
    <div>
      <StorefrontSearchPopular
        title={fa ? 'جستجوهای پرطرفدار' : 'Popular searches'}
        terms={
          empty
            ? []
            : labels.map(label => ({
                label,
                pick: () => {
                  setSelected(label);
                  setCalls(count => count + 1);
                }
              }))
        }
      />
      <label>
        <input type="checkbox" checked={empty} onChange={event => setEmpty(event.target.checked)} />
        {fa ? 'بدون عبارت' : 'No terms'}
      </label>
      <span data-test="selected">{selected}</span>
      <span data-test="calls">{calls}</span>
    </div>
  );
}
