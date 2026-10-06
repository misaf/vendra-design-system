// Sample storefront delivery rules. Amounts are in Toman; cut-offs use local time.
// Edit this file, then run: node templates/_build/generate.cjs
// km is the zone's reach from `center` (default: the studio pin in store-config.js). The delivery
// pin picks the smallest zone that reaches it; a pin beyond every zone is outside the delivery area.
const VF_ZONES = [
  {
    id: 'central', fee: 80_000, cutoff: '18:00', km: 5,
    en: 'Karaj central', fa: 'مرکز کرج'
  },
  {
    id: 'outer', fee: 120_000, cutoff: '16:00', km: 12,
    en: 'Karaj outer', fa: 'حومه کرج'
  },
  {
    id: 'alborz', fee: 180_000, cutoff: '14:00', km: 60,
    en: 'Alborz province', fa: 'استان البرز'
  },
  {
    id: 'tehran', fee: 250_000, cutoff: '12:00', km: 25, center: {lat: 35.6961, lng: 51.4231},
    en: 'Tehran', fa: 'تهران'
  }
];
const VF_FREE_DELIVERY_THRESHOLD = 5_000_000;
const VF_FREE_DELIVERY_ZONES = ['central', 'outer'];
const VF_SLOTS = [['08', '12'], ['12', '16'], ['16', '20'], ['20', '22']];
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
const VF_DELIVERY = {name: '', phone: '', sender: '', senderPhone: '', address: '', location: null, noMap: false, zone: 'central', date: '', slot: '12', promo: ''};

function vfDeliveryCutoff(zone, persian) {
  const time = persian ? zone.cutoff.replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit]) : zone.cutoff;
  return persian ? '\u2068' + time + '\u2069' : time;
}

function vfDeliveryHint(zone, persian) {
  return (persian ? 'ارسال همان روز تا ' : 'Same day before ') + vfDeliveryCutoff(zone, persian);
}

function vfZone(id) {
  return VF_ZONES.find(zone => zone.id === id) || VF_ZONES[0];
}

function vfDistanceKm(a, b) {
  const rad = Math.PI / 180, dLat = (b.lat - a.lat) * rad, dLng = (b.lng - a.lng) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
}

// The zone id for a delivery pin, or null when the pin is outside every zone.
function vfZoneAt(location) {
  if (!vfValidLocation(location)) return null;
  const reach = VF_ZONES.filter(zone => vfDistanceKm(zone.center || VF_STORE.studio, location) <= zone.km);
  return reach.length ? reach.reduce((a, b) => b.km < a.km ? b : a).id : null;
}

function vfIsoDate(date) {
  return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
}

// The next VF_DELIVERY_DAYS days for a zone, each marked sold out or past today's cut-off.
function vfDeliveryDays(zoneId, now = new Date()) {
  const [hour, minute] = vfZone(zoneId).cutoff.split(':').map(Number);
  const pastCutoff = now.getHours() * 60 + now.getMinutes() >= hour * 60 + minute;
  return Array.from({length: VF_DELIVERY_DAYS}, (_, offset) => {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset, 12);
    const iso = vfIsoDate(date);
    return {
      iso, date, offset,
      soldOut: VF_SOLD_OUT_DATES.includes(iso) || offset === VF_SAMPLE_SOLD_OUT_IN_DAYS,
      pastCutoff: offset === 0 && pastCutoff
    };
  });
}

// The chosen day when it is still open, otherwise the first open day.
function vfDeliveryDate(delivery, now = new Date()) {
  const open = vfDeliveryDays(delivery.zone, now).filter(day => !day.soldOut && !day.pastCutoff);
  return (open.find(day => day.iso === delivery.date) || open[0]).iso;
}

// Every slot on a day, each marked closed when it is today and too close to its end.
function vfDeliverySlots(iso, now = new Date()) {
  const today = iso === vfIsoDate(now), minutes = now.getHours() * 60 + now.getMinutes();
  return VF_SLOTS.map(([start, end]) => ({start, end, closed: today && minutes > Number(end) * 60 - VF_SLOT_LEAD_MINUTES}));
}

// The chosen slot when it is still open on the delivery day, otherwise the first open slot.
function vfDeliverySlot(delivery, now = new Date()) {
  const open = vfDeliverySlots(vfDeliveryDate(delivery, now), now).filter(slot => !slot.closed);
  return (open.find(slot => slot.start === delivery.slot) || open[0] || {start: delivery.slot}).start;
}

function vfPhone(value) {
  return String(value || '')
    .replace(/[۰-۹]/g, digit => '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))
    .replace(/[٠-٩]/g, digit => '٠١٢٣٤٥٦٧٨٩'.indexOf(digit))
    .replace(/[\s()-]/g, '');
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
    address: delivery.noMap ? String(delivery.address || '').trim().length < 6 : !String(delivery.address || '').trim(),
    cards: lines.some(line => vfLineHasCard(line) && !String(line.card || '').trim()),
    sender: !String(delivery.sender || '').trim(),
    senderPhone: mobile(delivery.senderPhone)
  };
}

// Whether a zone delivers free for this subtotal.
function vfFreeDelivery(zoneId, sub) {
  return sub >= VF_FREE_DELIVERY_THRESHOLD && VF_FREE_DELIVERY_ZONES.includes(zoneId);
}

function vfTotals(lines, delivery) {
  const sub = lines.reduce((sum, line) => sum + line.unit * line.qty, 0);
  const zone = vfZone(delivery.zone);
  const fee = vfFreeDelivery(zone.id, sub) ? 0 : zone.fee;
  // The applied promo code travels with the checkout details.
  const discount = vfDiscount(delivery.promo, sub);
  return {sub, fee, discount, total: sub - discount + fee};
}
