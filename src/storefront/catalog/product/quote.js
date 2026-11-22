import {vfBagLine, vfLineQuantityMax} from '../../cart/cart-lines.js';

// Quote the current selection using the same line identity, options and unit price as the bag.
export function vfProductQuote(product, {size, addons, qty}, bag = []) {
  const line = vfBagLine(product, size, addons);
  const alreadyInBag = bag.find(item => item.id === line.id)?.qty || 0;
  const remaining = Math.max(0, vfLineQuantityMax(line, bag) - alreadyInBag);
  // The quantity control still displays one when there is no stock to add.
  line.qty = Math.max(1, Math.min(qty, Math.max(1, remaining)));
  return {line, remaining, total: line.unit * line.qty};
}
