import React from 'react';
import {StorefrontSearchEmpty} from './StorefrontSearchEmpty.jsx';

export function Fixture({lang}) {
  const fa = lang === 'fa';
  const [retries, setRetries] = React.useState(0);
  const [alternate, setAlternate] = React.useState(false);
  return (
    <div>
      <StorefrontSearchEmpty
        countLabel={fa ? '۰ نتیجه' : '0 results'}
        title={fa ? 'طرحی' : 'No designs'}
        accent={
          alternate ? (fa ? 'برای این عبارت نیست' : 'for this query') : fa ? 'پیدا نشد' : 'found'
        }
        body={
          fa
            ? 'کد محصول یا نوع دیگری از گل را جستجو کنید.'
            : 'Try a product code or another flower type.'
        }
        retry={{
          label: fa ? 'جستجوی دوباره' : 'Try another search',
          onClick: () => setRetries(count => count + 1)
        }}
        browse={{label: fa ? 'رفتن به فروشگاه' : 'Browse the shop', href: '#shop'}}
      />
      <label>
        <input
          type="checkbox"
          checked={alternate}
          onChange={event => setAlternate(event.target.checked)}
        />
        {fa ? 'عبارت دیگر' : 'Alternate query'}
      </label>
      <span data-test="retries">{retries}</span>
    </div>
  );
}
