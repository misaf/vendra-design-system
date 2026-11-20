import {vfReady} from './catalog.js';

// The "under" quick filter's price limit, in Toman.
export const VF_UNDER_PRICE = 3000000;
/** @type {[string, (product: any) => boolean][]} */
export const VF_CHIPS = [
  ['ready', p => vfReady(p)],
  ['under3', p => p.price < VF_UNDER_PRICE],
  ['same', p => p.same],
  ['roses', p => p.roses]
];

export const VF_SHOP_FILTERS = VF_CHIPS.map(([id]) => id);
