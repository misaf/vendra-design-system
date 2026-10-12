// StorefrontShop: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <main
            id="main"
            tabIndex="-1"
            className="vf-shopping tw:mx-auto tw:flex tw:flex-col tw:gap-6"
          >
            <DS.SectionHeader
              level="h1"
              eyebrow={v.t?.eyebrow}
              title={v.t?.titleA}
              accent={v.t?.titleB}
            />
            <div className="vf-shop-columns tw:flex tw:flex-wrap tw:gap-x-7 tw:gap-y-4 tw:items-start">
              {v.desk ? (
                <>
                  <aside className="vf-shop-sidebar tw:flex tw:flex-col tw:gap-1 tw:sticky tw:top-9 tw:[flex:1_1_240px] tw:max-w-[260px]">
                    <div className="vf-shop-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet tw:mb-2">
                      <>{v.t?.cats}</>
                    </div>
                    {list(v.categories).map((c, $index) => (
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
                      <DS.Switch
                        label={v.migration?.stock}
                        checked={v.inStock}
                        onChange={v.setStock}
                      />
                    </div>
                  </aside>
                </>
              ) : null}
              {v.mob ? (
                <>
                  <div
                    role="group"
                    aria-label={v.t?.cats}
                    className="vf-shop-mobile-categories tw:flex tw:gap-2 tw:w-full tw:overflow-x-auto tw:pb-1 tw:[scrollbar-width:none]"
                  >
                    {list(v.categories).map((c, $index) => (
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
                </>
              ) : null}
              <section className="vf-shop-results tw:min-w-0 tw:flex tw:flex-col tw:gap-5 tw:[flex:999_1_480px]">
                {v.mob ? (
                  <>
                    <div className="vf-shop-mobile-bar tw:flex tw:gap-3 tw:items-center">
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
                  </>
                ) : null}
                {v.hasActive ? (
                  <>
                    <div className="vf-shop-active-filters tw:flex tw:gap-2 tw:flex-wrap tw:items-center">
                      {list(v.activeFilters).map((filter, $index) => (
                        <React.Fragment key={$index}>
                          <DS.Chip
                            selected={true}
                            onRemove={filter?.remove}
                            onClick={filter?.remove}
                          >
                            <>{filter?.label}</>
                          </DS.Chip>
                        </React.Fragment>
                      ))}
                      <DS.Button
                        variant="ghost"
                        size="sm"
                        onClick={v.clearFilters}
                        className="vf-shop-clear-all"
                      >
                        <>{v.t?.clearAll}</>
                      </DS.Button>
                    </div>
                  </>
                ) : null}
                <div className="vf-shop-toolbar tw:flex tw:justify-between tw:gap-4 tw:flex-wrap tw:items-end">
                  <div className="tw:flex tw:gap-2 tw:flex-wrap">
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
                      tabIndex="-1"
                      role="status"
                      className="vf-shop-result-count tw:text-sm tw:text-quiet"
                    >
                      <>{v.countLabel}</>
                    </span>
                    {v.desk ? (
                      <>
                        <div className="vf-shop-sorting tw:w-[200px]">
                          <DS.Select
                            aria-label={v.t?.sort}
                            value={v.sort}
                            options={v.sortOptions}
                            onChange={v.setSort}
                          />
                        </div>
                      </>
                    ) : null}
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
                            name={p?.name}
                            subtitle={p?.sub}
                            price={p?.price}
                            badge={p?.badge}
                            badgeTone="accent"
                            frame={v.frame}
                            placeholder={v.t?.photo}
                            favLabel={v.t?.save}
                            favorite={p?.fav}
                            onFavorite={p?.toggleFav}
                            href={p?.href}
                            onClick={p?.go}
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
              </section>
            </div>
            <DS.Dialog title={v.migration?.filters} open={v.filterOpen} onClose={v.closeFilters}>
              <div className="tw:flex tw:flex-col tw:gap-4 tw:mt-4">
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
              <div className="vf-shop-dialog-actions tw:mt-5 tw:flex tw:flex-col tw:gap-2">
                <DS.Button size="lg" block={true} onClick={v.closeFilters}>
                  <>{v.showResults}</>
                </DS.Button>
                <DS.Button variant="ghost" size="lg" block={true} onClick={v.clearFilters}>
                  <>{v.t?.clear}</>
                </DS.Button>
              </div>
            </DS.Dialog>
          </main>
        </>
      }
      sticky={<></>}
    />
  );
}
