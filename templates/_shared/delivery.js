// Sample storefront delivery rules. Amounts are in Toman; cut-offs use local time.
// VF_API_DELIVERY_ZONES and VF_API_DELIVERY_SCHEDULE are sample responses shaped like the Vendra API
// (DeliveryZone, DeliverySchedule); a live store replaces them with API data.
// Edit this file, then run: node templates/_build/generate.cjs
// maxDistanceKm is the zone's reach from its center (default: the studio pin in store-config.js). The
// delivery pin picks the smallest zone that reaches it; a pin beyond every zone is outside the delivery area.

// GET /api/delivery/zones
const VF_API_DELIVERY_ZONES = [
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
const VF_DELIVERY_ZONE_EXTRAS = {
  1: {key: 'central', cutoff: '18:00'},
  2: {key: 'outer', cutoff: '16:00'},
  3: {key: 'alborz', cutoff: '14:00'},
  4: {key: 'tehran', cutoff: '12:00', center: {lat: 35.6961, lng: 51.4231}}
};

// GET /api/delivery/schedule (dates are worked out from the rules below until the API sends them)
const VF_API_DELIVERY_SCHEDULE = {
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
function vfZoneFromApi(zone, extras = VF_DELIVERY_ZONE_EXTRAS) {
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
}

const VF_ZONES = [...VF_API_DELIVERY_ZONES]
  .sort((a, b) => a.position - b.position)
  .map(zone => vfZoneFromApi(zone));
// Free delivery isn't in the API yet (templates/API.md, "Zone rules").
const VF_FREE_DELIVERY_THRESHOLD = 5_000_000;
const VF_FREE_DELIVERY_ZONES = ['central', 'outer'];
// Each slot as [start hour, end hour]; the start hour is the slot's key in the bag and orders.
const VF_SLOTS = VF_API_DELIVERY_SCHEDULE.slots.map(slot => [
  slot.startsAt.slice(0, 2),
  slot.endsAt.slice(0, 2)
]);
// A slot today stops taking orders this many minutes before it ends.
const VF_SLOT_LEAD_MINUTES = 120;
// Delivery days offered, counting today. Today drops off after the zone's cut-off.
const VF_DELIVERY_DAYS = 7;
// Days with no capacity left, as ISO dates (e.g. '2027-02-14').
const VF_SOLD_OUT_DATES = [];
// Sample only: shows a sold-out day this many days ahead. Set to null for a real store.
const VF_SAMPLE_SOLD_OUT_IN_DAYS = 2;
// An empty date means the first day still available.
// location is the map pin, {lat, lng}; address holds what a map can't show (plaque, unit, floor).
// noMap is set when the map couldn't load: a typed full address then stands in for the pin.
// sender and senderPhone are the customer's own details, for order texts and the delivery photo.
// Card messages live on each bag line that includes a handwritten card (line.card).
const VF_DELIVERY = {
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

function vfDeliveryCutoff(zone, persian) {
  const time = persian ? zone.cutoff.replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit]) : zone.cutoff;
  return persian ? '\u2068' + time + '\u2069' : time;
}

function vfDeliveryHint(zone, persian) {
  return (persian ? 'ارسال همان روز تا ' : 'Same day before ') + vfDeliveryCutoff(zone, persian);
}

// Fills delivery placeholders in text from the API (FAQ answers, pages), so fees and cut-offs stay
// current: {fee:<zone>}, {cutoff:<zone>} (zone keys as in VF_ZONES) and {freeDeliveryFrom}.
function vfStoreText(text, money, persian) {
  return String(text || '')
    .replace(/\{fee:([\w-]+)\}/g, (_, id) => money(vfZone(id).fee))
    .replace(/\{cutoff:([\w-]+)\}/g, (_, id) => vfDeliveryCutoff(vfZone(id), persian))
    .replace(/\{freeDeliveryFrom\}/g, () => money(VF_FREE_DELIVERY_THRESHOLD));
}

function vfZone(id) {
  return VF_ZONES.find(zone => zone.id === id) || VF_ZONES[0];
}

function vfDistanceKm(a, b) {
  const rad = Math.PI / 180,
    dLat = (b.lat - a.lat) * rad,
    dLng = (b.lng - a.lng) * rad;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
}

// The zone id for a delivery pin, or null when the pin is outside every zone.
function vfZoneAt(location) {
  if (!vfValidLocation(location)) return null;
  const reach = VF_ZONES.filter(
    zone => vfDistanceKm(zone.center || VF_STORE.studio, location) <= zone.km
  );
  return reach.length ? reach.reduce((a, b) => (b.km < a.km ? b : a)).id : null;
}

function vfIsoDate(date) {
  return (
    date.getFullYear() +
    '-' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(date.getDate()).padStart(2, '0')
  );
}

// The next VF_DELIVERY_DAYS days for a zone, each marked sold out or past today's cut-off.
function vfDeliveryDays(zoneId, now = new Date()) {
  const [hour, minute] = vfZone(zoneId).cutoff.split(':').map(Number);
  const pastCutoff = now.getHours() * 60 + now.getMinutes() >= hour * 60 + minute;
  return Array.from({length: VF_DELIVERY_DAYS}, (_, offset) => {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset, 12);
    const iso = vfIsoDate(date);
    return {
      iso,
      date,
      offset,
      soldOut: VF_SOLD_OUT_DATES.includes(iso) || offset === VF_SAMPLE_SOLD_OUT_IN_DAYS,
      pastCutoff: offset === 0 && pastCutoff
    };
  });
}

// Whether a product can be delivered on a day in the main delivery zone: it is in stock, the day is open,
// and it is a same-day design or the day is tomorrow or later.
function vfDeliverableOn(product, iso, now = new Date()) {
  if (product.inStock === false) return false;
  const day = vfDeliveryDays(VF_ZONES[0].id, now).find(d => d.iso === iso);
  return !!day && !day.soldOut && !day.pastCutoff && (!!product.same || day.offset > 0);
}

// The chosen day when it is still open, otherwise the first open day.
function vfDeliveryDate(delivery, now = new Date()) {
  const open = vfDeliveryDays(delivery.zone, now).filter(day => !day.soldOut && !day.pastCutoff);
  return (open.find(day => day.iso === delivery.date) || open[0]).iso;
}

// Every slot on a day, each marked closed when it is today and too close to its end.
function vfDeliverySlots(iso, now = new Date()) {
  const today = iso === vfIsoDate(now),
    minutes = now.getHours() * 60 + now.getMinutes();
  return VF_SLOTS.map(([start, end]) => ({
    start,
    end,
    closed: today && minutes > Number(end) * 60 - VF_SLOT_LEAD_MINUTES
  }));
}

// The chosen slot when it is still open on the delivery day, otherwise the first open slot.
function vfDeliverySlot(delivery, now = new Date()) {
  const open = vfDeliverySlots(vfDeliveryDate(delivery, now), now).filter(slot => !slot.closed);
  return (open.find(slot => slot.start === delivery.slot) || open[0] || {start: delivery.slot})
    .start;
}

function vfPhone(value) {
  return vfLatin(value || '').replace(/[\s()-]/g, '');
}

// Problems in the delivery details, in form order. Bag lines with a handwritten card need its message.
function vfErrors(delivery, lines = []) {
  const mobile = value => !/^09\d{9}$/.test(vfPhone(value));
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
function vfFreeDelivery(zoneId, sub) {
  return sub >= VF_FREE_DELIVERY_THRESHOLD && VF_FREE_DELIVERY_ZONES.includes(zoneId);
}

// `balance` is the customer's balance when they pay from it (null otherwise): a large enough balance takes
// the balance discount off the products, after any promo code.
// The Checkout request (POST /api/sales/checkout) for a bag and its delivery details. Fields the API
// doesn't take yet (recipient phone, sender, typed address, promo code, sizes and add-ons) are listed
// in templates/API.md. `cartToken` is empty until the API can create carts.
function vfCheckoutRequest(
  lines,
  delivery,
  {method = 'card', last4 = '', ref = '', cartToken = ''} = {}
) {
  const cards = lines.filter(line => String(line.card || '').trim());
  const slot = VF_API_DELIVERY_SCHEDULE.slots.find(
    item => item.startsAt.slice(0, 2) === String(delivery.slot).padStart(2, '0')
  );
  const location = vfValidLocation(delivery.location) ? delivery.location : null;
  return {
    cartToken,
    currencyCode: VF_STORE.currency || 'IRT',
    gateway: method,
    paymentReference: method === 'card' ? [last4, ref].filter(Boolean).join(' ') || null : null,
    cardMessage:
      cards.length === 1
        ? cards[0].card
        : cards.map(line => vfLineToken(line) + ': ' + line.card).join('\n') || null,
    recipientName: delivery.name || null,
    addressId: null,
    latitude: location ? location.lat : null,
    longitude: location ? location.lng : null,
    deliveryDate: delivery.date || vfDeliveryDate(delivery) || null,
    deliverySlotId: slot ? slot.id : null
  };
}

function vfTotals(lines, delivery, balance = null) {
  const sub = lines.reduce((sum, line) => sum + line.unit * line.qty, 0);
  const zone = vfZone(delivery.zone);
  const fee = vfFreeDelivery(zone.id, sub) ? 0 : zone.fee;
  // The applied promo code travels with the checkout details.
  const discount = vfDiscount(delivery.promo, sub);
  const balanceDiscount =
    typeof vfBalanceDiscount === 'function' ? vfBalanceDiscount(balance, sub - discount) : 0;
  return {
    sub,
    fee,
    discount,
    ...(balanceDiscount ? {balanceDiscount, balancePercent: VF_STORE.wallet.discountPercent} : {}),
    total: sub - discount - balanceDiscount + fee
  };
}
