import React from 'react';
import {Chip} from '../../../../../design-system/components/Chip/Chip.jsx';
import {RangeSlider} from '../../../../../design-system/components/RangeSlider/RangeSlider.jsx';
import {Select} from '../../../../../design-system/components/Select/Select.jsx';
import {Switch} from '../../../../../design-system/components/Switch/Switch.jsx';

export function StorefrontShopSidebarFilters({occasion, date, price, stock}) {
  return (
    <div className="tw:flex tw:flex-col tw:gap-4 tw:mt-4">
      <fieldset className="vf-shop-occasions tw:[border:0] tw:p-0 tw:m-0 tw:min-w-0">
        <legend className="vf-shop-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet tw:p-0 tw:mb-3">
          <>{occasion.label}</>
        </legend>
        <div className="tw:flex tw:flex-wrap tw:gap-2">
          {occasion.options.map((o, $index) => (
            <React.Fragment key={$index}>
              <Chip selected={o?.on} onClick={o?.pick}>
                <>{o?.label}</>
              </Chip>
            </React.Fragment>
          ))}
        </div>
      </fieldset>
      <Select
        id="vf-shop-date"
        label={date.label}
        hint={date.hint}
        value={date.value}
        options={date.options}
        onChange={date.onChange}
      />
      <div className="tw:flex tw:flex-col tw:gap-2">
        <span id="vf-price-label" className="ag-field__label">
          <>{price.label}</>
        </span>
        <RangeSlider
          labelledBy="vf-price-label"
          min={price.min}
          max={price.max}
          step={price.step}
          value={price.value}
          onChange={price.onChange}
          formatValue={price.formatValue}
          labels={price.labels}
        />
      </div>
      <Switch label={stock.label} checked={stock.checked} onChange={stock.onChange} />
    </div>
  );
}
