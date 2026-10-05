// Sample storefront delivery rules. Amounts are in Toman; cut-offs use local time.
// Edit this file, then run: node templates/_build/generate.cjs
const VF_ZONES = [
  {
    id: 'central', fee: 80_000, cutoff: '18:00',
    en: 'Karaj central', fa: 'مرکز کرج'
  },
  {
    id: 'outer', fee: 120_000, cutoff: '16:00',
    en: 'Karaj outer', fa: 'حومه کرج'
  },
  {
    id: 'alborz', fee: 180_000, cutoff: '14:00',
    en: 'Alborz province', fa: 'استان البرز'
  },
  {
    id: 'tehran', fee: 250_000, cutoff: '12:00',
    en: 'Tehran', fa: 'تهران'
  }
];
const VF_FREE_DELIVERY_THRESHOLD = 5_000_000;
const VF_FREE_DELIVERY_ZONES = ['central', 'outer'];
const VF_SLOTS = [['08', '12'], ['12', '16'], ['16', '20'], ['20', '22']];
// Delivery days offered, counting today. Today drops off after the zone's cut-off.
const VF_DELIVERY_DAYS = 7;
// Days with no capacity left, as ISO dates (e.g. '2027-02-14').
const VF_SOLD_OUT_DATES = [];
// Sample only: shows a sold-out day this many days ahead. Set to null for a real store.
const VF_SAMPLE_SOLD_OUT_IN_DAYS = 2;
// An empty date means the first day still available.
// location is the map pin, {lat, lng}; address holds what a map can't show (plaque, unit, floor).
// noMap is set when the map couldn't load: a typed full address then stands in for the pin.
const VF_DELIVERY = {name: '', phone: '', address: '', location: null, noMap: false, card: '', zone: 'central', date: '', slot: '12', promo: ''};

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

function vfPhone(value) {
  return String(value || '')
    .replace(/[۰-۹]/g, digit => '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))
    .replace(/[٠-٩]/g, digit => '٠١٢٣٤٥٦٧٨٩'.indexOf(digit))
    .replace(/[\s()-]/g, '');
}

function vfErrors(delivery) {
  return {
    name: !String(delivery.name || '').trim(),
    phone: !/^09\d{9}$/.test(vfPhone(delivery.phone)),
    location: !delivery.noMap && !vfValidLocation(delivery.location),
    address: delivery.noMap ? String(delivery.address || '').trim().length < 6 : !String(delivery.address || '').trim()
  };
}

function vfTotals(lines, delivery) {
  const sub = lines.reduce((sum, line) => sum + line.unit * line.qty, 0);
  const zone = vfZone(delivery.zone);
  const free = sub >= VF_FREE_DELIVERY_THRESHOLD && VF_FREE_DELIVERY_ZONES.includes(zone.id);
  const fee = free ? 0 : zone.fee;
  // The applied promo code travels with the checkout details.
  const discount = vfDiscount(delivery.promo, sub);
  return {sub, fee, discount, total: sub - discount + fee};
}
