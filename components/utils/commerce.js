// Storefront commerce rules: import { commerce } (the runtime bundle also exposes window.AG_COMMERCE).
// Pure functions: every tenant value (zones, promo codes, balance rules, delivery schedule, API records)
// comes in as an argument, so a tenant storefront runs them on its own data from the Vendra API.
// Amounts are in Toman. No imports: storefront pages load this before the component bundle.

// Persian and Arabic digits → Latin.
const latin = value =>
  String(value ?? '')
    .replace(/[۰-۹]/g, digit => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, digit => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)));
const persianDigits = value => String(value).replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit]);

// A product code typed any way: case, spaces, dashes and digit scripts don't matter.
const normalizeCode = text =>
  latin(text || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
// A promo code as entered: case, spaces and digit scripts don't matter.
const promoCode = value =>
  latin(value || '')
    .replace(/\s/g, '')
    .toUpperCase();
const phone = value => latin(value || '').replace(/[\s()-]/g, '');
// An Iranian mobile number in its one stored form, 09xxxxxxxxx, however it was typed: 0912…, 912…,
// +98 912…, 98912… or 0098 912…, with Persian or Arabic digits, spaces, dashes, dots or brackets.
// '' when it isn't a mobile number (letters or other characters never pass).
const mobile = value => {
  const text = latin(value || '').trim();
  if (!text || /[^\d\s+().-]/.test(text)) return '';
  let digits = text.replace(/\D/g, '');
  if (digits.startsWith('0098')) digits = digits.slice(4);
  else if (digits.startsWith('98') && digits.length === 12) digits = digits.slice(2);
  if (/^9\d{9}$/.test(digits)) digits = '0' + digits;
  return /^09\d{9}$/.test(digits) ? digits : '';
};
const isMobile = value => mobile(value) !== '';

const validLocation = location =>
  !!location &&
  Number.isFinite(location.lat) &&
  Number.isFinite(location.lng) &&
  Math.abs(location.lat) <= 90 &&
  Math.abs(location.lng) <= 180;

// A map point rounded to six decimals (about 10 cm): enough for a front door, and tidy in stored orders.
const pinLocation = point => {
  const round = value => Math.round(value * 1e6) / 1e6;
  return {lat: round(point.lat), lng: round(point.lng)};
};

const distanceKm = (a, b) => {
  const rad = Math.PI / 180,
    dLat = (b.lat - a.lat) * rad,
    dLng = (b.lng - a.lng) * rad;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
};

// The smallest zone that reaches a pin, measured from the zone's center or `origin` (the studio);
// null when the pin is outside every zone. Zones are {id, km, center?}.
const zoneAt = (location, zones, origin) => {
  if (!validLocation(location)) return null;
  const reach = zones.filter(zone => distanceKm(zone.center || origin, location) <= zone.km);
  return reach.length ? reach.reduce((a, b) => (b.km < a.km ? b : a)).id : null;
};

const isoDate = date =>
  date.getFullYear() +
  '-' +
  String(date.getMonth() + 1).padStart(2, '0') +
  '-' +
  String(date.getDate()).padStart(2, '0');

// A cut-off time ("18:00") for a sentence; Persian digits, isolated so it stays left to right.
const cutoffText = (cutoff, persian) => (persian ? '⁨' + persianDigits(cutoff) + '⁩' : cutoff);

// The next `days` days for a zone's cut-off, each marked sold out or past today's cut-off.
const deliveryDays = (cutoff, {days, soldOutDates = []}, now = new Date()) => {
  const [hour, minute] = cutoff.split(':').map(Number);
  const pastCutoff = now.getHours() * 60 + now.getMinutes() >= hour * 60 + minute;
  return Array.from({length: days}, (_, offset) => {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset, 12);
    const iso = isoDate(date);
    return {
      iso,
      date,
      offset,
      soldOut: soldOutDates.includes(iso),
      pastCutoff: offset === 0 && pastCutoff
    };
  });
};

// The chosen day when it is still open, otherwise the first open day (undefined when none is).
const openDay = (days, chosen) => {
  const open = days.filter(day => !day.soldOut && !day.pastCutoff);
  return (open.find(day => day.iso === chosen) || open[0] || {}).iso;
};

// Every slot ({start, end} hours) on a day, each marked closed when it is today and fewer than
// `leadMinutes` remain before it ends.
const deliverySlots = (iso, slots, leadMinutes, now = new Date()) => {
  const today = iso === isoDate(now),
    minutes = now.getHours() * 60 + now.getMinutes();
  return slots.map(({start, end}) => ({
    start,
    end,
    closed: today && minutes > Number(end) * 60 - leadMinutes
  }));
};

// The chosen slot's start when it is open, otherwise the first open slot's.
const openSlot = (slots, chosen) => {
  const open = slots.filter(slot => !slot.closed);
  return (open.find(slot => slot.start === chosen) || open[0] || {start: chosen}).start;
};

// Free delivery: the subtotal reaches `threshold` in one of `zones`.
const freeDelivery = (zoneId, subtotal, rules) =>
  !!rules && subtotal >= rules.threshold && rules.zones.includes(zoneId);

// Promo codes are {code, percent, min}. {promo} when the code applies, otherwise {error, min?}.
const promoCheck = (value, subtotal, promos) => {
  const promo = promos.find(item => item.code === promoCode(value));
  if (!promo) return {error: 'unknown'};
  if (subtotal < promo.min) return {error: 'min', min: promo.min};
  return {promo};
};
// The discount a code gives; 0 when it doesn't apply.
const discount = (code, subtotal, promos) => {
  const {promo} = code ? promoCheck(code, subtotal, promos) : {};
  return promo ? Math.round((subtotal * promo.percent) / 100) : 0;
};

// Balance rules are {discountFrom, discountPercent}: paying from a balance of at least discountFrom
// takes discountPercent off the products.
const balanceDiscountOn = (balance, rules) =>
  !!rules && balance != null && balance >= rules.discountFrom;
const balanceDiscount = (balance, products, rules) =>
  balanceDiscountOn(balance, rules) ? Math.round((products * rules.discountPercent) / 100) : 0;

// An order's totals. Lines are {unit, qty}; `zone` is {id, fee}; `promo` is the applied code and
// `balance` the balance paid from (null otherwise). Rules: {freeDelivery, promos, wallet}.
const totals = (lines, {zone, promo, balance = null}, rules) => {
  const sub = lines.reduce((sum, line) => sum + line.unit * line.qty, 0);
  const fee = freeDelivery(zone.id, sub, rules.freeDelivery) ? 0 : zone.fee;
  const promoDiscount = discount(promo, sub, rules.promos || []);
  const fromBalance = balanceDiscount(balance, sub - promoDiscount, rules.wallet);
  return {
    sub,
    fee,
    discount: promoDiscount,
    ...(fromBalance
      ? {balanceDiscount: fromBalance, balancePercent: rules.wallet.discountPercent}
      : {}),
    total: sub - promoDiscount - fromBalance + fee
  };
};

// Order summary rows; discounts sit under the subtotal. labels.balanceDiscount reads like
// 'Balance discount · {percent}%'.
const summaryRows = (result, code, labels, money, num = String) => [
  {label: labels.sub, value: money(result.sub)},
  ...(result.discount
    ? [
        {
          label: labels.discount + ' · ' + promoCode(code),
          value: '−⁨' + money(result.discount) + '⁩'
        }
      ]
    : []),
  ...(result.balanceDiscount
    ? [
        {
          label: (labels.balanceDiscount || 'Balance discount · {percent}%').replace(
            '{percent}',
            num(result.balancePercent)
          ),
          value: '−⁨' + money(result.balanceDiscount) + '⁩'
        }
      ]
    : []),
  {label: labels.fee, value: result.fee ? money(result.fee) : labels.free},
  {label: labels.total, value: money(result.total), strong: true}
];

// "Show more" paging: the first `page` pages of `size` items (page 1 = the first page). `total`
// defaults to the list's length; pass the API's total when the list holds only the pages loaded so far.
const page = (list, current, size, total = list.length) => {
  const pages = Math.max(1, Math.floor(Number(current)) || 1);
  const shown = Math.min(total, pages * size);
  return {items: list.slice(0, shown), page: pages, shown, total, hasMore: shown < total};
};

// Fills placeholders in text from the API: {fee:<zone>}, {cutoff:<zone>} and {freeDeliveryFrom}.
// `values` gives each one's text: {fee(zoneId), cutoff(zoneId), freeDeliveryFrom()}.
const fillText = (text, values) =>
  String(text || '')
    .replace(/\{fee:([\w-]+)\}/g, (_, id) => values.fee(id))
    .replace(/\{cutoff:([\w-]+)\}/g, (_, id) => values.cutoff(id))
    .replace(/\{freeDeliveryFrom\}/g, () => values.freeDeliveryFrom());

// An API record by its IRI (e.g. /api/catalog/product-prices/201) from a list of records.
const apiRecord = (list, iri) => {
  const id = Number(
    String(iri || '')
      .split('/')
      .pop()
  );
  return list.find(record => record.id === id) || null;
};

// How available an API Product is: 'in' stock, 'low' (at or under its stockThreshold, with `count`
// left), 'soon' (out of stock but availableSoon, with the ISO `date` it returns, or null), or 'out'.
const stockStatus = product => {
  if (!product.inStock)
    return product.availableSoon
      ? {
          status: 'soon',
          date: product.availabilityDate ? product.availabilityDate.slice(0, 10) : null
        }
      : {status: 'out'};
  if (product.stockThreshold != null && product.quantity <= product.stockThreshold)
    return {status: 'low', count: product.quantity};
  return {status: 'in'};
};

// A photo for Picture from an API Multimedia record. `responsiveImages` maps "<width>" to a URL in the
// photo's own format and "<format> <width>" (e.g. "avif 480", "webp 960") to smaller formats;
// `customProperties` carries `width`, `height`, `placeholder` (a tiny blurred data: URI) and the alt
// text per language as `alt_en` / `alt_fa`. null without a URL.
const IMAGE_TYPES = {avif: 'image/avif', webp: 'image/webp', jpeg: 'image/jpeg', png: 'image/png'};
const imageFromApi = (record, lang) => {
  if (!record || !record.url) return null;
  const candidates = {};
  Object.entries(record.responsiveImages || {}).forEach(([key, url]) => {
    const [format, width] = /^\d+$/.test(key) ? ['', key] : key.split(' ');
    if (!url || !/^\d+$/.test(width || '')) return;
    (candidates[format] = candidates[format] || []).push([Number(width), url]);
  });
  const srcSet = format =>
    (candidates[format] || [])
      .sort((a, b) => a[0] - b[0])
      .map(([width, url]) => url + ' ' + width + 'w')
      .join(', ');
  const sources = ['avif', 'webp']
    .filter(format => candidates[format])
    .map(format => ({type: IMAGE_TYPES[format], srcSet: srcSet(format)}));
  const custom = record.customProperties || {};
  const size = value => (/^\d+$/.test(value || '') ? Number(value) : undefined);
  const photo = {src: record.url};
  if (candidates['']) photo.srcSet = srcSet('');
  if (sources.length) photo.sources = sources;
  if (size(custom.width) && size(custom.height)) {
    photo.width = size(custom.width);
    photo.height = size(custom.height);
  }
  if (/^data:image\//.test(custom.placeholder || '')) photo.placeholder = custom.placeholder;
  if (lang && custom['alt_' + lang] != null) photo.alt = custom['alt_' + lang];
  return photo;
};

// A storefront product from an API Product, resolved against its prices, photos and categories.
// `extras` holds storefront fields the API doesn't have yet, keyed by Product.token. `images` are
// photos for Picture; each language's `alts` holds their alt text ('' when the API has none).
const productFromApi = (product, {prices, media, categories, extras = {}, placeholder}) => {
  const extra = extras[product.token] || {};
  const price = apiRecord(prices, product.latestProductPrice);
  const category = categories.find(item => item.id === product.productCategory.id);
  const records = product.multimedia
    .map(iri => apiRecord(media, iri))
    .filter(record => record && record.url);
  const images = records.map(record => imageFromApi(record));
  const {badge, ...flags} = extra;
  const words = lang => ({
    sub: product.name[lang] || '',
    alts: records.map(record => imageFromApi(record, lang).alt ?? ''),
    ...(badge && badge[lang] ? {badge: badge[lang]} : {})
  });
  return {
    id: product.token,
    apiId: product.id,
    ...flags,
    occasions: extra.occasions || [],
    cat: category ? category.slug.en : '',
    ...(product.inStock ? {} : {inStock: false}),
    stock: stockStatus(product),
    price: price ? price.amount : null,
    image: images[0] || {src: placeholder},
    images: images.length ? images : [{src: placeholder}],
    en: words('en'),
    fa: words('fa')
  };
};

// A storefront zone from an API DeliveryZone; `extras` by zone id: {key, cutoff, center}.
const zoneFromApi = (zone, extras = {}) => {
  const extra = extras[zone.id] || {};
  return {
    id: extra.key || String(zone.id),
    apiId: zone.id,
    fee: zone.feeAmount,
    cutoff: extra.cutoff || '00:00',
    km: zone.maxDistanceKm,
    ...(extra.center ? {center: extra.center} : {}),
    en: zone.name.en,
    fa: zone.name.fa
  };
};

// A bag line from an API OrderLine. Its metadata carries `token`, `size`, comma-separated `addons`
// and `cardMessage`, matched against `sizes` and `addons` ({id, …}); `describe(product, size, addons,
// lang)` writes the line's detail text.
const lineFromApi = (line, {products, sizes, addons, placeholder, describe}) => {
  const product = products.find(item => item.apiId === line.sellableId);
  const meta = line.metadata || {};
  const token = meta.token || (product ? product.id : line.name);
  const size = meta.size || null;
  const chosen = (meta.addons || '').split(',').filter(Boolean);
  const sizeChoice = sizes.find(item => item.id === size) || null;
  const addonChoices = addons.filter(item => chosen.includes(item.id));
  const productId = product ? product.id : token;
  return {
    id: productId + (size ? '-' + size : '') + (chosen.length ? '-' + chosen.join('+') : ''),
    productId,
    token,
    size,
    addons: chosen,
    unit: line.unitAmount,
    qty: line.quantity,
    image: product ? product.image : {src: placeholder},
    ...(meta.cardMessage ? {card: meta.cardMessage} : {}),
    en: [token, product ? describe(product, sizeChoice, addonChoices, 'en') : ''],
    fa: [token, product ? describe(product, sizeChoice, addonChoices, 'fa') : '']
  };
};

// API order statuses under the storefront's step names.
const ORDER_STATUS = {
  placed: 'received',
  arranging: 'preparing',
  ready: 'preparing',
  out_for_delivery: 'onTheWay'
};

// A storefront order from an API Order. `line` turns each OrderLine into a bag line; `delivery`,
// `method` and `preferredLocale` are what Order doesn't carry yet.
const orderFromApi = (order, {line, delivery, method, preferredLocale}) => ({
  id: order.number,
  status: ORDER_STATUS[order.status] || order.status,
  lines: order.lines.map(line),
  delivery,
  totals: {
    sub: order.itemsAmount,
    fee: order.deliveryAmount,
    discount: order.itemsAmount + order.deliveryAmount - order.totalAmount,
    total: order.totalAmount
  },
  method,
  last4: order.paymentReference,
  preferredLocale
});

// The Checkout request (POST /api/sales/checkout) for bag lines and delivery details. `slots` are the
// schedule's DeliverySlots; `lineToken(line)` names a line in a combined card message.
const checkoutRequest = (
  lines,
  delivery,
  {
    slots,
    currencyCode = 'IRT',
    deliveryDate = delivery.date,
    lineToken = line => line.token,
    method = 'card',
    last4 = '',
    ref = '',
    cartToken = ''
  }
) => {
  const cards = lines.filter(line => String(line.card || '').trim());
  const slot = slots.find(
    item => item.startsAt.slice(0, 2) === String(delivery.slot).padStart(2, '0')
  );
  const location = validLocation(delivery.location) ? delivery.location : null;
  return {
    cartToken,
    currencyCode,
    gateway: method,
    paymentReference: method === 'card' ? [last4, ref].filter(Boolean).join(' ') || null : null,
    cardMessage:
      cards.length === 1
        ? cards[0].card
        : cards.map(line => lineToken(line) + ': ' + line.card).join('\n') || null,
    recipientName: delivery.name || null,
    addressId: null,
    latitude: location ? location.lat : null,
    longitude: location ? location.lng : null,
    deliveryDate: deliveryDate || null,
    deliverySlotId: slot ? slot.id : null
  };
};

export const commerce = {
  latin,
  normalizeCode,
  promoCode,
  phone,
  mobile,
  isMobile,
  validLocation,
  pinLocation,
  distanceKm,
  zoneAt,
  isoDate,
  cutoffText,
  deliveryDays,
  openDay,
  deliverySlots,
  openSlot,
  freeDelivery,
  promoCheck,
  discount,
  balanceDiscountOn,
  balanceDiscount,
  totals,
  summaryRows,
  page,
  fillText,
  apiRecord,
  imageFromApi,
  productFromApi,
  stockStatus,
  zoneFromApi,
  lineFromApi,
  ORDER_STATUS,
  orderFromApi,
  checkoutRequest
};
