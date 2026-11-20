import React from 'react';
import {StorefrontProductConfiguration} from './StorefrontProductConfiguration.jsx';

const copy = {
  en: {
    size: 'Size',
    extras: 'Extras',
    medium: 'Medium',
    large: 'Large',
    mediumHint: 'Our classic size',
    largeHint: 'A fuller arrangement',
    card: 'Gift card',
    vase: 'Glass vase',
    showSizes: 'Show sizes',
    showAddons: 'Show extras'
  },
  fa: {
    size: 'اندازه',
    extras: 'افزودنی‌ها',
    medium: 'متوسط',
    large: 'بزرگ',
    mediumHint: 'اندازه معمول',
    largeHint: 'چیدمان پُرتر',
    card: 'کارت هدیه',
    vase: 'گلدان شیشه‌ای',
    showSizes: 'نمایش اندازه‌ها',
    showAddons: 'نمایش افزودنی‌ها'
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [size, setSize] = React.useState('medium');
  const [extras, setExtras] = React.useState({card: false, vase: true});
  const [showSizes, setShowSizes] = React.useState(true);
  const [showAddons, setShowAddons] = React.useState(true);
  return (
    <div className="tw:flex tw:flex-col tw:gap-4 tw:max-w-form">
      <StorefrontProductConfiguration
        showSizes={showSizes}
        showAddons={showAddons}
        size={size}
        onSizeChange={setSize}
        sizes={[
          {value: 'medium', label: t.medium, desc: t.mediumHint},
          {value: 'large', label: t.large, desc: t.largeHint}
        ]}
        addons={Object.entries(extras).map(([id, on]) => ({
          label: t[id],
          on,
          toggle: checked => setExtras(current => ({...current, [id]: checked}))
        }))}
        labels={{size: t.size, extras: t.extras}}
      />
      <label>
        <input
          type="checkbox"
          checked={showSizes}
          onChange={event => setShowSizes(event.target.checked)}
        />
        {t.showSizes}
      </label>
      <label>
        <input
          type="checkbox"
          checked={showAddons}
          onChange={event => setShowAddons(event.target.checked)}
        />
        {t.showAddons}
      </label>
      <span data-test="size">{size}</span>
      <span data-test="extras">{JSON.stringify(extras)}</span>
    </div>
  );
}
