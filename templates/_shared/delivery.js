// Sample storefront delivery rules. Amounts are in Toman; cut-offs use local time.
// VF_API_DELIVERY_ZONES and VF_API_DELIVERY_SCHEDULE are sample responses shaped like the Vendra API
// (DeliveryZone, DeliverySchedule); a live store replaces them with API data.
// The rules themselves are in components/utils/commerce.js (also exported by the package); the vf*
// functions below pass this store's data to them.
// maxDistanceKm is the zone's reach from its center (default: the studio pin in store-config.js). The
// delivery pin picks the smallest zone that reaches it; a pin beyond every zone is outside the delivery area.
import {vfLineHasCard, vfLineToken, vfFindProduct, vfLineProductId} from './catalog.js';
import {vfValidLocation} from './location.js';
import {VF_PROMOS} from './promotions.js';
import {VF_STORE, vfFeatures} from './store-config.js';
import {commerce} from '../../components/utils/commerce.js';

// GET /api/delivery/zones
export const VF_API_DELIVERY_ZONES = [
  {
    id: 1,
    name: {en: 'Karaj central', fa: 'مرکز کرج'},
    description: null,
    maxDistanceKm: 5,
    currencyCode: 'IRT',
    feeAmount: 80_000,
    requiresQuote: false,
    position: 1
  },
  {
    id: 2,
    name: {en: 'Karaj outer', fa: 'حومه کرج'},
    description: null,
    maxDistanceKm: 12,
    currencyCode: 'IRT',
    feeAmount: 120_000,
    requiresQuote: false,
    position: 2
  },
  {
    id: 3,
    name: {en: 'Alborz province', fa: 'استان البرز'},
    description: null,
    maxDistanceKm: 60,
    currencyCode: 'IRT',
    feeAmount: 180_000,
    requiresQuote: false,
    position: 3
  },
  {
    id: 4,
    name: {en: 'Tehran', fa: 'تهران'},
    description: null,
    maxDistanceKm: 25,
    currencyCode: 'IRT',
    feeAmount: 250_000,
    requiresQuote: false,
    position: 4
  }
];

// Zone fields the API doesn't provide yet (templates/API.md, "Zone rules"), keyed by DeliveryZone.id:
// the storefront's key for the zone, its same-day cut-off and, when it isn't the studio, the point its
// distance is measured from.
export const VF_DELIVERY_ZONE_EXTRAS = {
  1: {key: 'central', cutoff: '18:00'},
  2: {key: 'outer', cutoff: '16:00'},
  3: {key: 'alborz', cutoff: '14:00'},
  4: {key: 'tehran', cutoff: '12:00', center: {lat: 35.6961, lng: 51.4231}}
};

// GET /api/delivery/schedule (dates are worked out from the rules below until the API sends them)
export const VF_API_DELIVERY_SCHEDULE = {
  id: 'default',
  dates: [],
  slots: [
    {id: 1, name: {en: 'Morning', fa: 'صبح'}, startsAt: '08:00', endsAt: '12:00'},
    {id: 2, name: {en: 'Midday', fa: 'ظهر'}, startsAt: '12:00', endsAt: '16:00'},
    {id: 3, name: {en: 'Afternoon', fa: 'عصر'}, startsAt: '16:00', endsAt: '20:00'},
    {id: 4, name: {en: 'Evening', fa: 'شب'}, startsAt: '20:00', endsAt: '22:00'}
  ]
};

// The storefront's zone object from an API DeliveryZone plus its extras.
export function vfZoneFromApi(zone, extras = VF_DELIVERY_ZONE_EXTRAS) {
  return commerce.zoneFromApi(zone, extras);
}

export const VF_ZONES = [...VF_API_DELIVERY_ZONES]
  .sort((a, b) => a.position - b.position)
  .map(zone => vfZoneFromApi(zone));
// Free delivery isn't in the API yet (templates/API.md, "Zone rules").
export const VF_FREE_DELIVERY_THRESHOLD = 5_000_000;
export const VF_FREE_DELIVERY_ZONES = ['central', 'outer'];
// Each slot's start and end hour; the start hour is the slot's key in the bag and orders.
export const VF_SLOTS = VF_API_DELIVERY_SCHEDULE.slots.map(slot => ({
  start: slot.startsAt.slice(0, 2),
  end: slot.endsAt.slice(0, 2)
}));
// A slot today stops taking orders this many minutes before it ends.
export const VF_SLOT_LEAD_MINUTES = 120;
// Delivery days offered, counting today. Today drops off after the zone's cut-off.
export const VF_DELIVERY_DAYS = 7;
// Days with no capacity left, as ISO dates (e.g. '2027-02-14').
export const VF_SOLD_OUT_DATES = [];
// Sample only: shows a sold-out day this many days ahead. Set to null for a real store.
export const VF_SAMPLE_SOLD_OUT_IN_DAYS = 2;
// An empty date means the first day still available.
// location is the map pin, {lat, lng}; address holds what a map can't show (plaque, unit, floor).
// noMap is set when the map couldn't load: a typed full address then stands in for the pin.
// sender and senderPhone are the customer's own details, for order texts and the delivery photo.
// Card messages live on each bag line that includes a handwritten card (line.card).
export const VF_DELIVERY = {
  name: '',
  phone: '',
  sender: '',
  senderPhone: '',
  address: '',
  location: null,
  noMap: false,
  zone: 'central',
  date: '',
  slot: '12',
  promo: ''
};

export function vfDeliveryCutoff(zone, persian) {
  return commerce.cutoffText(zone.cutoff, persian);
}

// "Same day before 18:00"; '' when the store doesn't deliver the same day.
export function vfDeliveryHint(zone, persian) {
  if (!vfFeatures().sameDay) return '';
  return (persian ? 'ارسال همان روز تا ' : 'Same day before ') + vfDeliveryCutoff(zone, persian);
}

// Fills delivery placeholders in text from the API (FAQ answers, pages), so fees and cut-offs stay
// current: {fee:<zone>}, {cutoff:<zone>} (zone keys as in VF_ZONES) and {freeDeliveryFrom}.
export function vfStoreText(text, money, persian) {
  return commerce.fillText(text, {
    fee: id => money(vfZone(id).fee),
    cutoff: id => vfDeliveryCutoff(vfZone(id), persian),
    freeDeliveryFrom: () => money(VF_FREE_DELIVERY_THRESHOLD)
  });
}

export function vfZone(id) {
  return VF_ZONES.find(zone => zone.id === id) || VF_ZONES[0];
}

// The zone id for a delivery pin, or null when the pin is outside every zone.
export function vfZoneAt(location) {
  return commerce.zoneAt(location, VF_ZONES, VF_STORE.studio);
}

export function vfIsoDate(date) {
  return commerce.isoDate(date);
}

// The next VF_DELIVERY_DAYS days for a zone, each marked sold out or past today's cut-off; from
// tomorrow when the store doesn't deliver the same day.
export function vfDeliveryDays(zoneId, now = new Date(), lines = []) {
  const sample =
    VF_SAMPLE_SOLD_OUT_IN_DAYS == null
      ? []
      : [
          vfIsoDate(
            new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate() + VF_SAMPLE_SOLD_OUT_IN_DAYS,
              12
            )
          )
        ];
  return commerce.deliveryDays(
    vfZone(zoneId).cutoff,
    {
      days: VF_DELIVERY_DAYS,
      soldOutDates: [...VF_SOLD_OUT_DATES, ...sample],
      sameDay: vfFeatures().sameDay && vfBagSameDay(lines)
    },
    now
  );
}

// Every configuration in a mixed bag must be ready for same-day delivery.
export function vfBagSameDay(lines) {
  return lines.every(line => !!vfFindProduct(vfLineProductId(line))?.same);
}

// Until a pin (or the map-failure address) establishes a destination, fees are provisional.
export function vfDeliveryQuoted(delivery) {
  if (delivery.noMap)
    return (
      String(delivery.address || '').trim().length >= 6 &&
      VF_ZONES.some(zone => zone.id === delivery.zone)
    );
  return vfValidLocation(delivery.location) && vfZoneAt(delivery.location) === delivery.zone;
}

// Whether a product can be delivered on a day in the main delivery zone: it is in stock, the day is open,
// and it is a same-day design or the day is tomorrow or later.
export function vfDeliverableOn(product, iso, now = new Date()) {
  if (product.inStock === false) return false;
  const day = vfDeliveryDays(VF_ZONES[0].id, now).find(d => d.iso === iso);
  return !!day && !day.soldOut && !day.pastCutoff && (!!product.same || day.offset > 0);
}

// The chosen day when it is still open, otherwise the first open day.
export function vfDeliveryDate(delivery, now = new Date(), lines = []) {
  return commerce.openDay(vfDeliveryDays(delivery.zone, now, lines), delivery.date);
}

// Every slot on a day, each marked closed when it is today and too close to its end.
export function vfDeliverySlots(iso, now = new Date()) {
  return commerce.deliverySlots(iso, VF_SLOTS, VF_SLOT_LEAD_MINUTES, now);
}

// The chosen slot when it is still open on the delivery day, otherwise the first open slot.
export function vfDeliverySlot(delivery, now = new Date(), lines = []) {
  return commerce.openSlot(
    vfDeliverySlots(vfDeliveryDate(delivery, now, lines), now),
    delivery.slot
  );
}

// Empty defaults can pick the first window; an explicit choice must never change unnoticed.
export function vfDeliveryChanged(delivery, now = new Date(), lines = []) {
  const date = vfDeliveryDate(delivery, now, lines);
  const slot = vfDeliverySlot(delivery, now, lines);
  return (
    !date ||
    slot == null ||
    (!!delivery.date && delivery.date !== date) ||
    (!!delivery.date && delivery.slot != null && String(delivery.slot) !== String(slot))
  );
}

export function vfPhone(value) {
  return commerce.phone(value);
}

// An Iranian mobile as 09xxxxxxxxx however it was typed (+98…, 9…), or '' when it isn't one.
// Forms validate with it, and store and compare numbers in this form.
export function vfMobile(value) {
  return commerce.mobile(value);
}

// Problems in the delivery details, in form order. Bag lines with a handwritten card need its message.
export function vfErrors(delivery, lines = []) {
  const mobile = value => !commerce.isMobile(value);
  const pinned = !delivery.noMap && vfValidLocation(delivery.location);
  return {
    name: !String(delivery.name || '').trim(),
    phone: mobile(delivery.phone),
    location: !delivery.noMap && !vfValidLocation(delivery.location),
    outside: pinned && !vfZoneAt(delivery.location),
    address: delivery.noMap
      ? String(delivery.address || '').trim().length < 6
      : !String(delivery.address || '').trim(),
    cards: lines.some(line => vfLineHasCard(line) && !String(line.card || '').trim()),
    sender: !String(delivery.sender || '').trim(),
    senderPhone: mobile(delivery.senderPhone)
  };
}

// Whether a zone delivers free for this subtotal.
export function vfFreeDelivery(zoneId, sub) {
  return commerce.freeDelivery(zoneId, sub, {
    threshold: VF_FREE_DELIVERY_THRESHOLD,
    zones: VF_FREE_DELIVERY_ZONES
  });
}

// The Checkout request (POST /api/sales/checkout) for a bag and its delivery details. Fields the API
// doesn't take yet (recipient phone, sender, typed address, promo code, sizes and add-ons) are listed
// in templates/API.md. `cartToken` is empty until the API can create carts.
export function vfCheckoutRequest(
  lines,
  delivery,
  {method = 'card', last4 = '', ref = '', cartToken = ''} = {}
) {
  return commerce.checkoutRequest(lines, delivery, {
    slots: VF_API_DELIVERY_SCHEDULE.slots,
    currencyCode: VF_STORE.currency || 'IRT',
    deliveryDate: delivery.date || vfDeliveryDate(delivery, new Date(), lines),
    lineToken: vfLineToken,
    method,
    last4,
    ref,
    cartToken
  });
}

// `balance` is the customer's balance when they pay from it (null otherwise): a large enough balance takes
// the balance discount off the products, after any promo code (when the store takes them).
export function vfTotals(lines, delivery, balance = null) {
  return commerce.totals(
    lines,
    {zone: vfZone(delivery.zone), promo: vfFeatures().promoCodes ? delivery.promo : '', balance},
    {
      freeDelivery: {threshold: VF_FREE_DELIVERY_THRESHOLD, zones: VF_FREE_DELIVERY_ZONES},
      promos: typeof VF_PROMOS === 'undefined' ? [] : VF_PROMOS,
      wallet: VF_STORE.wallet
    }
  );
}
