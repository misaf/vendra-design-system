// Storefront commerce rules: import { commerce } (guidelines/card-runtime.js also exposes it as window.AG_COMMERCE for the cards).
// Pure functions: every tenant value (zones, promo codes, balance rules, delivery schedule, API records)
// comes in as an argument, so a tenant storefront runs them on its own data from the Vendra API.
// Amounts are in Toman.
import {latin, mobile, phone} from '../../design-system/utils/input.js';
import {validLocation, pinLocation} from '../../design-system/utils/coordinates.js';
import {
  isoDate,
  cutoffText,
  deliveryDays,
  openDay,
  deliverySlots,
  openSlot
} from '../delivery/delivery-window.js';
import {openingStatus, hoursSummary, hoursExceptions} from '../store/opening-hours.js';
import {
  promoCode,
  freeDelivery,
  promoCheck,
  discount,
  balanceDiscountOn,
  balanceDiscount,
  totals,
  summaryRows
} from '../pricing/order-totals.js';

// A product code typed any way: case, spaces, dashes and digit scripts don't matter.
const normalizeCode = text =>
  latin(text || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
// Text for searching, typed or indexed: Arabic letters as their Persian forms (ي ى → ی, ك → ک,
// ة ۀ → ه, أ إ آ → ا, ؤ → و, ئ → ی), no diacritics or stretching (ـ), half-spaces, zero-width
// characters and punctuation as spaces, Latin digits, lower case, one space between words.
const normalizeSearchText = text =>
  latin(String(text ?? '').normalize('NFKC'))
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[ةۀ]/g, 'ه')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ی')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
// Searchable text as an index for matchesSearch: normalized, with its spaces removed so a query word
// may span them (دستهگل finds دسته‌گل). Build it once per product or post, not on every keystroke.
const searchIndex = text => normalizeSearchText(text).replace(/ /g, '');
// Whether an index (searchIndex) holds every word of a query, in any order; an empty query matches nothing.
const matchesSearch = (index, query) => {
  const words = normalizeSearchText(query).split(' ').filter(Boolean);
  return words.length > 0 && words.every(word => index.includes(word));
};
const isMobile = value => mobile(value) !== '';

// Links that show a place in Neshan, Balad and Google Maps, each opening the installed app on
// phones where the link allows it. Persian visitors mostly drive with Neshan and Balad, so they
// come first in Persian; Google Maps comes first otherwise. [] for a missing or invalid point.
// Neshan: its own point link (github.com/NeshanMaps/Neshan-MCP, utils/deeplinks.py). Balad: the
// web app's /location page, which reads latitude, longitude and zoom.
const directionsLinks = (location, language) => {
  if (!validLocation(location)) return [];
  const {lat, lng} = location;
  const links = {
    neshan: 'https://nshn.ir/?lat=' + lat + '&lng=' + lng,
    balad: 'https://balad.ir/location?latitude=' + lat + '&longitude=' + lng + '&zoom=17',
    google: 'https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng
  };
  const order = language === 'fa' ? ['neshan', 'balad', 'google'] : ['google', 'neshan', 'balad'];
  return order.map(app => ({app, href: links[app]}));
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
    quantity: product.quantity,
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

// The optional parts of a storefront; like its payment methods, a store turns each on by listing it:
// - promoCodes: the bag's promo-code field and its discount.
// - sameDay: delivery today, until each zone's cut-off (off: the first day is tomorrow).
// - weddings: the weddings and events page with its inquiry form.
// - journal: the journal and its posts.
// - reminders: yearly occasion reminders in the account.
// - newsletter: the email sign-up on the home page.
// Add-ons (and the handwritten card's message) follow the store's add-on list instead.
const STORE_FEATURES = ['promoCodes', 'sameDay', 'weddings', 'journal', 'reminders', 'newsletter'];

// The store's feature list as {promoCodes: true, sameDay: false, …}, one key per STORE_FEATURES id;
// unknown ids are dropped.
const storeFeatures = list =>
  Object.fromEntries(STORE_FEATURES.map(id => [id, (list || []).includes(id)]));

// The ways a store can take payment; each is a feature the store turns on by listing it. `id` is
// also the Checkout `gateway`:
// - online: the bank's payment page and back (PaymentStatus).
// - card: card-to-card transfer to the store's card {cardNumber, holder, bank, sheba?}; the customer
//   enters the last four digits of theirs.
// - cod: pay on delivery, in the delivery zones listed in `zones` (all zones when left out).
// - wallet: from the customer's account balance (signed in, balance covers the total).
// - whatsapp: the order is sent, and the studio confirms payment on WhatsApp.
const PAYMENT_METHODS = ['online', 'card', 'cod', 'wallet', 'whatsapp'];

// The store's payment methods ({id, ...settings}, in the order it lists them; unknown ids are
// dropped) for this order, each with `available` and, when it can't be used, `reason`: 'zone' (pay
// on delivery doesn't reach the delivery zone), 'signIn' (no balance without an account) or
// 'balance' (the balance doesn't cover `total`).
const paymentOptions = (methods, {zone = undefined, balance = null, total = 0} = {}) =>
  (methods || [])
    .filter(method => method && PAYMENT_METHODS.includes(method.id))
    .map(method => {
      const reason =
        method.id === 'cod' && method.zones && !method.zones.includes(zone)
          ? 'zone'
          : method.id === 'wallet' && balance == null
            ? 'signIn'
            : method.id === 'wallet' && balance < total
              ? 'balance'
              : null;
      return reason ? {...method, available: false, reason} : {...method, available: true};
    });

// The method to start with: `chosen` while it can be used; otherwise the balance when it covers the
// order (the customer's money is already there); otherwise the store's first usable method. null
// when none can be used for this order.
const defaultPaymentMethod = (options, chosen) => {
  const usable = options.filter(option => option.available);
  const pick = id => usable.find(option => option.id === id);
  return (pick(chosen) || pick('wallet') || usable[0] || {id: null}).id;
};

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
  normalizeSearchText,
  searchIndex,
  matchesSearch,
  promoCode,
  phone,
  mobile,
  isMobile,
  validLocation,
  pinLocation,
  directionsLinks,
  distanceKm,
  zoneAt,
  isoDate,
  cutoffText,
  deliveryDays,
  openDay,
  deliverySlots,
  openSlot,
  openingStatus,
  hoursSummary,
  hoursExceptions,
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
  STORE_FEATURES,
  storeFeatures,
  PAYMENT_METHODS,
  paymentOptions,
  defaultPaymentMethod,
  checkoutRequest
};
