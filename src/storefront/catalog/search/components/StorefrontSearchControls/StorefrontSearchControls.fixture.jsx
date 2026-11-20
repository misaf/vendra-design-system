import React from 'react';
import {StorefrontSearchControls} from './StorefrontSearchControls.jsx';

export function Fixture({lang}) {
  const fa = lang === 'fa';
  const [value, setValue] = React.useState('');
  const [changes, setChanges] = React.useState(0);
  return (
    <div>
      <StorefrontSearchControls
        query={{
          label: fa ? 'جستجوی طرح‌ها' : 'Search designs',
          placeholder: fa ? 'کد یا نوع گل' : 'Code or flower type',
          value,
          onChange: next => {
            setValue(next);
            setChanges(count => count + 1);
          }
        }}
        close={{label: fa ? 'بستن جستجو' : 'Close search', href: '#search-origin'}}
      />
      <button onClick={() => setValue('VF-7K2M4Q')}>{fa ? 'تنظیم جستجو' : 'Set query'}</button>
      <span data-test="value">{value}</span>
      <span data-test="changes">{changes}</span>
    </div>
  );
}
