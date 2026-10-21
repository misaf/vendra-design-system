import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontShopCategories({categories, label, compact = false}) {
  if (compact)
    return (
      <div
        role="group"
        aria-label={label}
        className="vf-shop-mobile-categories tw:lg:hidden tw:flex tw:gap-2 tw:w-full tw:overflow-x-auto tw:pb-1 tw:[scrollbar-width:none]"
      >
        {categories.map((c, $index) => (
          <React.Fragment key={$index}>
            <div className="vf-shop-category-chip tw:flex-none">
              <DS.Chip selected={c?.on} aria-pressed={c?.on} onClick={c?.pick}>
                <span className="vf-shop-category-label tw:whitespace-nowrap">
                  <>
                    {c?.label}
                    {' \u00b7 '}
                    {c?.count}
                  </>
                </span>
              </DS.Chip>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  return (
    <>
      <div className="vf-shop-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet tw:mb-2">
        <>{label}</>
      </div>
      {categories.map((c, $index) => (
        <React.Fragment key={$index}>
          {c?.on ? (
            <>
              <button
                type="button"
                onClick={c?.pick}
                aria-pressed="true"
                className="vf-shop-category-selected tw:flex tw:justify-between tw:items-center tw:gap-3 tw:min-h-tap tw:py-0 tw:px-3 tw:[border:0] tw:rounded-md tw:bg-muted tw:text-body tw:[font-family:inherit] tw:[line-height:inherit] tw:text-sm tw:font-medium tw:text-start tw:cursor-pointer"
              >
                <span>
                  <>{c?.label}</>
                </span>
                <span className="vf-shop-category-count tw:text-xs tw:text-quiet">
                  <>{c?.count}</>
                </span>
              </button>
            </>
          ) : null}
          {c?.off ? (
            <>
              <button
                type="button"
                onClick={c?.pick}
                aria-pressed="false"
                className="vf-shop-category tw:flex tw:justify-between tw:items-center tw:gap-3 tw:min-h-tap tw:py-0 tw:px-3 tw:[border:0] tw:rounded-md tw:bg-transparent tw:text-body tw:[font-family:inherit] tw:[line-height:inherit] tw:text-sm tw:font-normal tw:text-start tw:cursor-pointer tw:hover:bg-sunken"
              >
                <span>
                  <>{c?.label}</>
                </span>
                <span className="vf-shop-category-count tw:text-xs tw:text-quiet">
                  <>{c?.count}</>
                </span>
              </button>
            </>
          ) : null}
        </React.Fragment>
      ))}
    </>
  );
}
