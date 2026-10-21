// StorefrontShop: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontShopLayout} from '../app/layouts/StorefrontShopLayout/StorefrontShopLayout.jsx';
import {StorefrontShopCategories} from '../app/organisms/StorefrontShopCategories/StorefrontShopCategories.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <StorefrontShopLayout
            heading={
              <DS.SectionHeader
                level="h1"
                eyebrow={v.t?.eyebrow}
                title={v.t?.titleA}
                accent={v.t?.titleB}
              />
            }
            sidebar={
              <>
                <StorefrontShopCategories categories={list(v.categories)} label={v.t?.cats} />
                <div className="tw:flex tw:flex-col tw:gap-4 tw:mt-4">
                  <fieldset className="vf-shop-occasions tw:[border:0] tw:p-0 tw:m-0 tw:min-w-0">
                    <legend className="vf-shop-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet tw:p-0 tw:mb-3">
                      <>{v.t?.occasion}</>
                    </legend>
                    <div className="tw:flex tw:flex-wrap tw:gap-2">
                      {list(v.occasionOptions).map((o, $index) => (
                        <React.Fragment key={$index}>
                          <DS.Chip selected={o?.on} onClick={o?.pick}>
                            <>{o?.label}</>
                          </DS.Chip>
                        </React.Fragment>
                      ))}
                    </div>
                  </fieldset>
                  <DS.Select
                    id="vf-shop-date"
                    label={v.t?.deliverOn}
                    hint={v.t?.dateHint}
                    value={v.date}
                    options={v.dateOptions}
                    onChange={v.setDate}
                  />
                  <div className="tw:flex tw:flex-col tw:gap-2">
                    <span id="vf-price-label" className="ag-field__label">
                      <>{v.migration?.price}</>
                    </span>
                    <DS.RangeSlider
                      labelledBy="vf-price-label"
                      min={0}
                      max={v.priceMax}
                      step={100000}
                      value={v.price}
                      onChange={v.setPrice}
                      formatValue={v.formatPrice}
                      labels={v.priceLabels}
                    />
                  </div>
                  <DS.Switch label={v.migration?.stock} checked={v.inStock} onChange={v.setStock} />
                </div>
              </>
            }
            categories={
              <StorefrontShopCategories
                categories={list(v.categories)}
                label={v.t?.cats}
                compact={true}
              />
            }
            results={
              <>
                <div className="vf-shop-mobile-bar tw:lg:hidden tw:flex tw:gap-3 tw:items-center">
                  <DS.Button
                    variant="secondary"
                    onClick={v.openFilters}
                    iconStart="sliders-horizontal"
                  >
                    <>{v.filtersLabel}</>
                  </DS.Button>
                  <div className="tw:flex-1 tw:min-w-0">
                    <DS.Select
                      aria-label={v.t?.sort}
                      value={v.sort}
                      options={v.sortOptions}
                      onChange={v.setSort}
                    />
                  </div>
                </div>
                <DS.FilterBar
                  filters={list(v.activeFilters)}
                  onClearAll={v.clearFilters}
                  className="vf-shop-active-filters"
                />
                <div className="vf-shop-toolbar tw:flex tw:justify-between tw:gap-4 tw:flex-wrap tw:items-end">
                  <div
                    className="vf-shop-quick-filters tw:flex tw:gap-2 tw:flex-wrap"
                    role="group"
                    aria-label={v.t?.quickFilters}
                    onFocus={event => {
                      const target = /** @type {HTMLElement} */ (event.target);
                      if (target !== event.currentTarget)
                        target.scrollIntoView({block: 'nearest', inline: 'nearest'});
                    }}
                  >
                    {list(v.chips).map((f, $index) => (
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
                      <>{v.countLabel}</>
                    </span>
                    <div className="vf-shop-sorting tw:max-lg:hidden tw:w-[200px]">
                      <DS.Select
                        aria-label={v.t?.sort}
                        value={v.sort}
                        options={v.sortOptions}
                        onChange={v.setSort}
                      />
                    </div>
                  </div>
                </div>
                {v.loading ? (
                  <>
                    <DS.Skeleton shape="card" lines={3} />
                    <p role="status">
                      <>{v.migration?.loading}</>
                    </p>
                  </>
                ) : null}
                {v.failed ? (
                  <>
                    <DS.Alert tone="danger" title={v.migration?.failed} />
                    <DS.Button onClick={v.retry}>
                      <>{v.migration?.retry}</>
                    </DS.Button>
                  </>
                ) : null}
                {v.hasItems ? (
                  <>
                    <div className="vf-shop-product-grid vf-product-grid tw:grid tw:[grid-template-columns:repeat(auto-fill,minmax(max(150px,calc((100%_-_48px)_/_3)),1fr))] tw:gap-y-7 tw:gap-x-5">
                      {list(v.items).map((p, $index) => (
                        <React.Fragment key={$index}>
                          <DS.ProductCard
                            images={p?.images}
                            priority={$index < 2}
                            name={p?.name}
                            subtitle={p?.sub}
                            price={p?.price}
                            stock={p?.stock}
                            badge={p?.badge}
                            badgeTone="accent"
                            frame={v.frame}
                            placeholder={v.t?.photo}
                            favLabel={v.t?.save}
                            favorite={p?.fav}
                            onFavorite={p?.toggleFav}
                            href={p?.href}
                          />
                        </React.Fragment>
                      ))}
                    </div>
                    {v.showPaging ? (
                      <>
                        <DS.LoadMore
                          shown={v.paging?.shown}
                          total={v.paging?.total}
                          status={v.paging?.status}
                          label={v.paging?.label}
                          href={v.paging?.href}
                          onClick={v.paging?.onClick}
                        />
                      </>
                    ) : null}
                  </>
                ) : null}
                {v.noItems ? (
                  <>
                    <DS.EmptyState
                      icon="flower-2"
                      title={v.t?.emptyA}
                      titleAccent={v.t?.emptyB}
                      body={v.t?.emptyP}
                    />
                    <div className="tw:flex tw:justify-center">
                      <DS.Button variant="secondary" onClick={v.clear}>
                        <>{v.t?.clear}</>
                      </DS.Button>
                    </div>
                  </>
                ) : null}
              </>
            }
            filters={
              <DS.Dialog
                title={v.migration?.filters}
                open={v.filterOpen}
                onClose={v.closeFilters}
                footer={
                  <div className="vf-shop-dialog-actions tw:w-full tw:flex tw:flex-col tw:gap-2">
                    <DS.Button size="lg" block={true} onClick={v.closeFilters}>
                      <>{v.showResults}</>
                    </DS.Button>
                    <DS.Button variant="ghost" size="lg" block={true} onClick={v.clearFilters}>
                      <>{v.t?.clear}</>
                    </DS.Button>
                  </div>
                }
              >
                <div className="vf-shop-filter-fields tw:flex tw:flex-col tw:gap-4">
                  <fieldset className="vf-shop-occasions tw:[border:0] tw:p-0 tw:m-0 tw:min-w-0">
                    <legend className="ag-field__label tw:p-0 tw:mb-2">
                      <>{v.t?.occasion}</>
                    </legend>
                    <div className="tw:flex tw:flex-wrap tw:gap-2">
                      {list(v.occasionOptions).map((o, $index) => (
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
                    label={v.t?.deliverOn}
                    hint={v.t?.dateHint}
                    value={v.date}
                    options={v.dateOptions}
                    onChange={v.setDate}
                  />
                  <div className="tw:flex tw:flex-col tw:gap-2">
                    <span id="vf-price-label-dialog" className="ag-field__label">
                      <>{v.migration?.price}</>
                    </span>
                    <DS.RangeSlider
                      labelledBy="vf-price-label-dialog"
                      min={0}
                      max={v.priceMax}
                      step={100000}
                      value={v.price}
                      onChange={v.setPrice}
                      formatValue={v.formatPrice}
                      labels={v.priceLabels}
                    />
                  </div>
                  <DS.Switch label={v.migration?.stock} checked={v.inStock} onChange={v.setStock} />
                </div>
              </DS.Dialog>
            }
          />
        </>
      }
      sticky={<></>}
    />
  );
}
