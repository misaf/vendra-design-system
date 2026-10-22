import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontShopToolbar({
  labels,
  sort,
  activeFilters,
  quickFilters,
  onOpenFilters,
  onClearFilters,
  onQuickFilterFocus
}) {
  return (
    <>
      <div className="vf-shop-mobile-bar tw:lg:hidden tw:flex tw:gap-3 tw:items-center">
        <DS.Button variant="secondary" onClick={onOpenFilters} iconStart="sliders-horizontal">
          <>{labels.filters}</>
        </DS.Button>
        <div className="tw:flex-1 tw:min-w-0">
          <DS.Select
            aria-label={sort.label}
            value={sort.value}
            options={sort.options}
            onChange={sort.onChange}
          />
        </div>
      </div>
      <DS.FilterBar
        filters={activeFilters}
        onClearAll={onClearFilters}
        className="vf-shop-active-filters"
      />
      <div className="vf-shop-toolbar tw:flex tw:justify-between tw:gap-4 tw:flex-wrap tw:items-end">
        <div
          className="vf-shop-quick-filters tw:flex tw:gap-2 tw:flex-wrap"
          role="group"
          aria-label={labels.quickFilters}
          onFocus={onQuickFilterFocus}
        >
          {quickFilters.map((f, $index) => (
            <React.Fragment key={$index}>
              <DS.Chip selected={f?.on} onClick={f?.toggle} aria-pressed={f?.on}>
                <>{f?.label}</>
              </DS.Chip>
            </React.Fragment>
          ))}
        </div>
        <div className="tw:flex tw:items-center tw:gap-4">
          <span
            id="vf-shop-count"
            tabIndex={-1}
            role="status"
            className="vf-shop-result-count tw:text-sm tw:text-quiet"
          >
            <>{labels.count}</>
          </span>
          <div className="vf-shop-sorting tw:max-lg:hidden tw:w-[200px]">
            <DS.Select
              aria-label={sort.label}
              value={sort.value}
              options={sort.options}
              onChange={sort.onChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
