// StorefrontShop: the page inside the storefront shell.
import React from 'react';
import * as DS from '../../shell/ds.js';
import {list} from '../../shell/runtime.js';
import {StorefrontShopLayout} from './layouts/StorefrontShopLayout/StorefrontShopLayout.jsx';
import {StorefrontShopCategories} from './organisms/StorefrontShopCategories/StorefrontShopCategories.jsx';
import {StorefrontShopSidebarFilters} from './organisms/StorefrontShopSidebarFilters/StorefrontShopSidebarFilters.jsx';
import {StorefrontShopFilterDialog} from './organisms/StorefrontShopFilterDialog/StorefrontShopFilterDialog.jsx';
import {StorefrontShopToolbar} from './organisms/StorefrontShopToolbar/StorefrontShopToolbar.jsx';
import {StorefrontShopResults} from './organisms/StorefrontShopResults/StorefrontShopResults.jsx';
import {Shell} from '../../shell/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
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
              <StorefrontShopResults
                products={list(v.items)}
                frame={v.frame}
                hasItems={v.hasItems}
                showPaging={v.showPaging}
                paging={v.paging}
                feedback={{
                  loading: v.loading,
                  failed: v.failed,
                  empty: v.noItems,
                  onRetry: v.retry,
                  onClear: v.clear
                }}
                labels={{
                  loading: v.migration?.loading,
                  failed: v.migration?.failed,
                  retry: v.migration?.retry,
                  photo: v.t?.photo,
                  save: v.t?.save,
                  emptyTitle: v.t?.emptyA,
                  emptyAccent: v.t?.emptyB,
                  emptyBody: v.t?.emptyP,
                  clear: v.t?.clear
                }}
              />
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
      }
      sticky={<></>}
    />
  );
}
