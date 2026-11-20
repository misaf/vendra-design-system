import {
  VF_ADDONS,
  VF_SIZES,
  vfFindProduct,
  vfProduct,
  vfProductId,
  vfTokenText
} from '../catalog/catalog.js';
import {VF_CATEGORY_ITEM} from '../catalog/categories.js';
import {vfSeparator} from '../pricing/formatting.js';

// Lines added from the product page list their product, size and extras; older lines carry them in the id.
export function vfLineProductId(line) {
  return vfProductId(line.productId || line.id.split('-')[0]) || line.productId || '';
}

export function vfLineSize(line) {
  if ('size' in line) return line.size || null;
  const product = vfFindProduct(line.id.split('-')[0]);
  return product && product.sizes ? line.id.split('-')[1] || null : null;
}

// The code a line was ordered with: also its title in the bag, checkout, orders and messages.
export function vfLineToken(line) {
  return line.token || vfLineProductId(line);
}

// Bag lines as analytics items (analytics.ITEM_KEYS): the code each was ordered with, its unit price and
// quantity.
export function vfLineItems(lines) {
  return lines.map(line => ({
    item_id: vfLineToken(line) || line.id,
    price: line.unit,
    quantity: line.qty
  }));
}

// A bag line's details: category, size and extras, e.g. "Flower box · Classic · 20 stems · Handwritten card".
export function vfLineDetail(product, size, addons, lang) {
  return [VF_CATEGORY_ITEM[lang][product.cat]]
    .concat(product.sizes && size ? [size.name[lang], size.detail[lang]] : [])
    .concat(addons.map(addon => addon.name[lang]))
    .join(vfSeparator(lang));
}

// Each demo gets its own bag objects; prices and codes come from the same catalog.
export function vfSampleBag() {
  const box = vfProduct('VF-7K2M4Q'),
    orchid = vfProduct('VF-8RD5WN');
  const classic = VF_SIZES.find(size => size.id === 'classic'),
    card = VF_ADDONS.find(addon => addon.id === 'card');
  // The box comes with a handwritten card when the store offers one.
  const extras = card ? [card] : [];
  return [
    {
      id: box.id + '-classic' + (card ? '-card' : ''),
      productId: box.id,
      token: box.id,
      size: 'classic',
      addons: extras.map(addon => addon.id),
      unit: box.price + classic.price + (card ? card.price : 0),
      qty: 1,
      image: box.image,
      ...(card ? {card: 'Happy birthday, Shirin.'} : {}),
      en: [box.id, vfLineDetail(box, classic, extras, 'en')],
      fa: [box.id, vfLineDetail(box, classic, extras, 'fa')]
    },
    {
      id: orchid.id,
      productId: orchid.id,
      token: orchid.id,
      size: null,
      addons: [],
      unit: orchid.price,
      qty: 1,
      image: orchid.image,
      en: [orchid.id, vfLineDetail(orchid, null, [], 'en')],
      fa: [orchid.id, vfLineDetail(orchid, null, [], 'fa')]
    }
  ];
}

// A bag line for a product in a size (an id from VF_SIZES, or null) with extras (VF_ADDONS ids),
// as the product page adds it. Sizes and extras the product doesn't offer are left out.
export function vfBagLine(product, sizeId = null, addonIds = [], qty = 1) {
  const size = product.sizes ? VF_SIZES.find(item => item.id === sizeId) || VF_SIZES[0] : null;
  const addons = VF_ADDONS.filter(
    addon => addonIds.includes(addon.id) && !(product.noAddons || []).includes(addon.id)
  );
  return {
    image: product.image,
    productId: product.id,
    token: product.id,
    size: size ? size.id : null,
    addons: addons.map(addon => addon.id),
    id:
      product.id +
      (size ? '-' + size.id : '') +
      (addons.length ? '-' + addons.map(addon => addon.id).join('+') : ''),
    unit:
      product.price + (size ? size.price : 0) + addons.reduce((sum, addon) => sum + addon.price, 0),
    qty,
    en: [product.id, vfLineDetail(product, size, addons, 'en')],
    fa: [product.id, vfLineDetail(product, size, addons, 'fa')]
  };
}

// Bag lines in a link (bag/?lines=…), so a bag made at the shop counter opens on the customer's
// phone: each line is code.size.extra+extra.quantity, lines separated by commas, e.g.
// VF-7K2M4Q.classic.card.1,VF-8RD5WN...2. Prices are not in the link; they come from the catalog.
export const VF_LINES_PATTERN = /^[\w.+,-]{1,600}$/;
// Saved designs in a link (saved/?ids=…), as handed over from the shop counter.
export function vfLinesParam(lines) {
  return lines
    .map(line =>
      [vfLineToken(line), vfLineSize(line) || '', vfLineAddons(line).join('+'), line.qty].join('.')
    )
    .join(',');
}
// The lines a link carries; unknown or sold-out products are dropped, quantities kept to 1–99.
export function vfLinesFromParam(text) {
  if (!VF_LINES_PATTERN.test(text || '')) return [];
  return text.split(',').flatMap(part => {
    const [code, size, addons, qty] = part.split('.');
    const product = vfFindProduct(code);
    if (!product || product.inStock === false) return [];
    const count = Math.min(99, Math.max(1, parseInt(qty, 10) || 1));
    return [vfBagLine(product, size || null, (addons || '').split('+').filter(Boolean), count)];
  });
}

// A line's extras: listed on lines added from the product page, read from the id on older lines.
export function vfLineAddons(line) {
  return (
    line.addons ||
    VF_ADDONS.filter(addon => line.id.split(/[-+]/).includes(addon.id)).map(addon => addon.id)
  );
}

export function vfLineHasCard(line) {
  return vfLineAddons(line).includes('card');
}

// Card messages written for an order's lines, named when there are several. Older orders kept one
// order-wide message in delivery.card.
export function vfCardMessages(lines, delivery, lang) {
  // The message keeps its own direction, so English inside Persian quotes (or the reverse) reads correctly.
  const quote = text =>
    lang === 'fa' ? '«\u2068' + text + '\u2069»' : '“\u2068' + text + '\u2069”';
  const cards = (lines || []).filter(line => String(line.card || '').trim());
  if (!cards.length) return delivery && delivery.card ? delivery.card : '';
  return cards.length === 1
    ? quote(cards[0].card)
    : cards
        .map(line => vfTokenText(vfLineToken(line)) + ': ' + quote(line.card))
        .join(vfSeparator(lang));
}

// The same line with a handwritten card added, priced and named as the product page would.
export function vfLineWithCard(line) {
  const productId = vfLineProductId(line);
  const size = vfLineSize(line);
  const addons = VF_ADDONS.filter(
    addon => addon.id === 'card' || vfLineAddons(line).includes(addon.id)
  );
  const names = lang => {
    const detail = line[lang][1]
      .split(/ · |، /)
      .filter(part => !VF_ADDONS.some(addon => addon.name[lang] === part));
    return [
      vfLineToken(line),
      detail.concat(addons.map(addon => addon.name[lang])).join(vfSeparator(lang))
    ];
  };
  return {
    ...line,
    productId,
    token: vfLineToken(line),
    size,
    addons: addons.map(addon => addon.id),
    id: productId + (size ? '-' + size : '') + '-' + addons.map(addon => addon.id).join('+'),
    unit: line.unit + (VF_ADDONS.find(addon => addon.id === 'card') || {price: 0}).price,
    en: names('en'),
    fa: names('fa')
  };
}

// Capture only the addition being undone; later edits to other lines stay intact.
export function vfAddCard(lines, id) {
  const line = lines.find(item => item.id === id);
  if (!line || vfLineHasCard(line)) return null;
  const carded = vfLineWithCard(line);
  const twin = lines.find(item => item.id === carded.id);
  return {
    cardAddition: {line: {...line}, cardedId: carded.id, index: lines.indexOf(line)},
    lines: twin
      ? lines
          .filter(item => item.id !== id)
          .map(item => (item === twin ? {...item, qty: item.qty + line.qty} : item))
      : lines.map(item => (item === line ? carded : item))
  };
}

export function vfUndoCardAddition(lines, addition) {
  if (!addition) return lines;
  const carded = lines.find(item => item.id === addition.cardedId);
  if (!carded) return lines;
  const qty = Math.min(addition.line.qty, carded.qty);
  const remaining = lines.flatMap(item =>
    item !== carded ? [item] : item.qty > qty ? [{...item, qty: item.qty - qty}] : []
  );
  const original = remaining.find(item => item.id === addition.line.id);
  if (original)
    return remaining.map(item => (item === original ? {...item, qty: item.qty + qty} : item));
  return [
    ...remaining.slice(0, addition.index),
    {...addition.line, qty},
    ...remaining.slice(addition.index)
  ];
}

// A line's price each from the current catalog (product, size and add-ons), or null when its
// product is no longer in the catalog.
export function vfLineUnit(line) {
  const product = vfFindProduct(vfLineProductId(line));
  if (!product) return null;
  const size = VF_SIZES.find(item => item.id === vfLineSize(line));
  const addons = vfLineAddons(line);
  const extra = VF_ADDONS.filter(addon => addons.includes(addon.id)).reduce(
    (sum, addon) => sum + addon.price,
    0
  );
  return product.price + (product.sizes && size ? size.price : 0) + extra;
}

export function vfReorderLines(lines) {
  return lines.flatMap(line => {
    const product = vfFindProduct(vfLineProductId(line));
    if (!product || product.inStock === false) return [];
    return [{...line, unit: vfLineUnit(line)}];
  });
}

// Bag lines priced from the current catalog, as a bag kept for days may hold old prices, with each
// change ({id, from, to}). Unavailable lines keep theirs: the bag already asks to remove them.
export function vfRepriceLines(lines) {
  const changes = [];
  const repriced = lines.map(line => {
    const unit = vfLineAvailable(line) ? vfLineUnit(line) : null;
    if (unit == null || unit === line.unit) return line;
    changes.push({id: line.id, from: line.unit, to: unit});
    return {...line, unit};
  });
  return {lines: changes.length ? repriced : lines, changes};
}

// Price changes still to show, keyed by line id: a later change keeps the price the customer first
// saw, a price back where it was drops its notice, and removed lines drop theirs.
export function vfMergePriceChanges(previous, changes, lines) {
  const next = {...previous};
  for (const change of changes) {
    const from = next[change.id] ? next[change.id].from : change.from;
    if (from === change.to) delete next[change.id];
    else next[change.id] = {from, to: change.to};
  }
  const ids = new Set(lines.map(line => line.id));
  return Object.fromEntries(Object.entries(next).filter(([id]) => ids.has(id)));
}

export function vfLineAvailable(line) {
  const p = vfFindProduct(vfLineProductId(line));
  return !!p && p.inStock !== false;
}

// Stock is shared by every size/add-on configuration of a product.
export function vfLineQuantityMax(line, lines = []) {
  const product = vfFindProduct(vfLineProductId(line));
  if (!product || product.inStock === false) return 0;
  const limit = Number.isFinite(product.quantity) ? product.quantity : 99;
  const others = lines
    .filter(item => item.id !== line.id && vfLineProductId(item) === product.id)
    .reduce((sum, item) => sum + item.qty, 0);
  return Math.max(0, Math.min(99, limit - others));
}

export function vfLineQuantityValid(line, lines) {
  return line.qty >= 1 && line.qty <= vfLineQuantityMax(line, lines);
}

export function vfReorderBag(lines, currentBag, mode) {
  let bag = mode === 'add' ? [...currentBag] : [];
  for (const line of vfReorderLines(lines)) {
    const existing = bag.find(item => item.id === line.id);
    const previous = existing?.qty || 0;
    const room = Math.max(0, vfLineQuantityMax(line, bag) - previous);
    const qty = previous + Math.min(line.qty, room);
    if (!qty) continue;
    const next = {...line, ...existing, unit: line.unit, qty};
    bag = existing ? bag.map(item => (item.id === line.id ? next : item)) : [...bag, next];
  }
  return bag;
}
