// StorefrontShop: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontShopLayout} from '../app/layouts/StorefrontShopLayout/StorefrontShopLayout.jsx';
import {StorefrontShopCategories} from '../app/organisms/StorefrontShopCategories/StorefrontShopCategories.jsx';
import {StorefrontShopSidebarFilters} from '../app/organisms/StorefrontShopSidebarFilters/StorefrontShopSidebarFilters.jsx';
import {StorefrontShopFilterDialog} from '../app/organisms/StorefrontShopFilterDialog/StorefrontShopFilterDialog.jsx';
import {StorefrontShopToolbar} from '../app/organisms/StorefrontShopToolbar/StorefrontShopToolbar.jsx';
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
                <StorefrontShopSidebarFilters
                  occasion={{label: v.t?.occasion, options: list(v.occasionOptions)}}
                  date={{
                    label: v.t?.deliverOn,
                    hint: v.t?.dateHint,
                    value: v.date,
                    options: v.dateOptions,
                    onChange: v.setDate
                  }}
                  price={{
                    label: v.migration?.price,
                    min: 0,
                    max: v.priceMax,
                    step: 100000,
                    value: v.price,
                    onChange: v.setPrice,
                    formatValue: v.formatPrice,
                    labels: v.priceLabels
                  }}
                  stock={{label: v.migration?.stock, checked: v.inStock, onChange: v.setStock}}
                />
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
                <StorefrontShopToolbar
                  labels={{
                    filters: v.filtersLabel,
                    quickFilters: v.t?.quickFilters,
                    count: v.countLabel
                  }}
                  sort={{
                    label: v.t?.sort,
                    value: v.sort,
                    options: v.sortOptions,
                    onChange: v.setSort
                  }}
                  activeFilters={list(v.activeFilters)}
                  quickFilters={list(v.chips)}
                  onOpenFilters={v.openFilters}
                  onClearFilters={v.clearFilters}
                  onQuickFilterFocus={event => {
                    const target = /** @type {HTMLElement} */ (event.target);
                    if (target !== event.currentTarget)
                      target.scrollIntoView({block: 'nearest', inline: 'nearest'});
                  }}
                />
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
              <StorefrontShopFilterDialog
                open={v.filterOpen}
                onClose={v.closeFilters}
                onClear={v.clearFilters}
                labels={{title: v.migration?.filters, show: v.showResults, clear: v.t?.clear}}
                occasion={{label: v.t?.occasion, options: list(v.occasionOptions)}}
                date={{
                  label: v.t?.deliverOn,
                  hint: v.t?.dateHint,
                  value: v.date,
                  options: v.dateOptions,
                  onChange: v.setDate
                }}
                price={{
                  label: v.migration?.price,
                  min: 0,
                  max: v.priceMax,
                  step: 100000,
                  value: v.price,
                  onChange: v.setPrice,
                  formatValue: v.formatPrice,
                  labels: v.priceLabels
                }}
                stock={{label: v.migration?.stock, checked: v.inStock, onChange: v.setStock}}
              />
            }
          />
        </>
      }
      sticky={<></>}
    />
  );
}
