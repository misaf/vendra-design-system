// Product lists in analytics (components/utils/analytics.js): view_item_list when a list of products
// is shown, select_item when one of its cards is opened. A list keeps one id and an English name
// in every language, so reports compare lists rather than translations. Items are the products'
// codes (vfRuntime.track.item) with their position in the list.
import React from 'react';
import {vfRuntime} from './runtime.js';

export const VF_LISTS = {
  shop: 'Shop results',
  home_featured: 'Home featured',
  home_studio: 'Home studio',
  search: 'Search results',
  recent: 'Recently viewed'
};

const listParams = id => ({item_list_id: id, item_list_name: VF_LISTS[id] || id});
const listItems = (products, start) =>
  products.map((product, offset) => ({...vfRuntime.track.item(product), index: start + offset}));

// view_item_list for these products, numbered from `start` (a list that grew reports its new part).
export function vfViewList(id, products, start = 0) {
  if (!products.length) return;
  vfRuntime.track.event('view_item_list', {...listParams(id), items: listItems(products, start)});
}

// A card's onClick: which product was opened, from which list and where in it. The link navigates
// as before; this only reports.
export function vfSelectItem(id, product, index) {
  return () =>
    vfRuntime.track.event('select_item', {...listParams(id), items: listItems([product], index)});
}

// Report changes to a committed list. If the previous items are still a prefix, report only the
// additional items. Keep the returned IDs for the next commit.
export function vfReportList(id, products, before = []) {
  const ids = products.map(product => product.id);
  const samePrefix = before.every((value, index) => value === ids[index]);
  if (samePrefix && ids.length === before.length) return before;
  const start = samePrefix && before.length < ids.length ? before.length : 0;
  vfViewList(id, products.slice(start), start);
  return ids;
}

// Track the committed products for this list for as long as its screen is mounted.
export function useListImpressions(id, products) {
  const reported = React.useRef([]);
  React.useEffect(() => {
    reported.current = vfReportList(id, products, reported.current);
  }, [id, products]);
}
