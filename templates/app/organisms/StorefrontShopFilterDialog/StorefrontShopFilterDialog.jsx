import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontShopFilterDialog({
  open,
  onClose,
  onClear,
  labels,
  occasion,
  date,
  price,
  stock
}) {
  return (
    <DS.Dialog
      title={labels.title}
      open={open}
      onClose={onClose}
      footer={
        <div className="vf-shop-dialog-actions tw:w-full tw:flex tw:flex-col tw:gap-2">
          <DS.Button size="lg" block={true} onClick={onClose}>
            <>{labels.show}</>
          </DS.Button>
          <DS.Button variant="ghost" size="lg" block={true} onClick={onClear}>
            <>{labels.clear}</>
          </DS.Button>
        </div>
      }
    >
      <div className="vf-shop-filter-fields tw:flex tw:flex-col tw:gap-4">
        <fieldset className="vf-shop-occasions tw:[border:0] tw:p-0 tw:m-0 tw:min-w-0">
          <legend className="ag-field__label tw:p-0 tw:mb-2">
            <>{occasion.label}</>
          </legend>
          <div className="tw:flex tw:flex-wrap tw:gap-2">
            {occasion.options.map((o, $index) => (
              <React.Fragment key={$index}>
                <DS.Chip selected={o?.on} onClick={o?.pick}>
                  <>{o?.label}</>
                </DS.Chip>
              </React.Fragment>
            ))}
          </div>
        </fieldset>
        <DS.Select
          id="vf-shop-date-dialog"
          label={date.label}
          hint={date.hint}
          value={date.value}
          options={date.options}
          onChange={date.onChange}
        />
        <div className="tw:flex tw:flex-col tw:gap-2">
          <span id="vf-price-label-dialog" className="ag-field__label">
            <>{price.label}</>
          </span>
          <DS.RangeSlider
            labelledBy="vf-price-label-dialog"
            min={price.min}
            max={price.max}
            step={price.step}
            value={price.value}
            onChange={price.onChange}
            formatValue={price.formatValue}
            labels={price.labels}
          />
        </div>
        <DS.Switch label={stock.label} checked={stock.checked} onChange={stock.onChange} />
      </div>
    </DS.Dialog>
  );
}
