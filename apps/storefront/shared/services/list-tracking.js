// Product lists in analytics (components/utils/analytics.js): view_item_list when a list of products
// is shown, select_item when one of its cards is opened. A list keeps one id and an English name
// in every language, so reports compare lists rather than translations. Items are the products'
// codes (vfRuntime.track.item) with their position in the list.
import {vfRuntime} from '../platform/runtime.js';

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

// A page records the lists it renders (in its vals) and useStorefrontPage reports them after the
// render commits, so rendering (and the build's prerender) sends nothing. A list is reported when
// its products change; when it only grew ("Show more"), just the added products; a list that
// leaves the page counts again when it comes back.
export function vfShowList(page, id, products) {
  (page._vfListsShown = page._vfListsShown || {})[id] = products;
}
export function vfReportLists(page) {
  const shown = page._vfListsShown || {};
  const reported = (page._vfListsReported = page._vfListsReported || {});
  page._vfListsShown = {};
  Object.keys(reported).forEach(id => {
    if (!shown[id]) delete reported[id];
  });
  Object.keys(shown).forEach(id => {
    const ids = shown[id].map(product => product.id);
    const before = reported[id] || [];
    const same = (count, list) => before.slice(0, count).every((value, i) => value === list[i]);
    if (ids.length === before.length && same(ids.length, ids)) return;
    const start =
      before.length && before.length < ids.length && same(before.length, ids) ? before.length : 0;
    reported[id] = ids;
    vfViewList(id, shown[id].slice(start), start);
  });
}
