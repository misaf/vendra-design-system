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
const VF_DELIVERY = {name: '', phone: '', address: '', card: '', zone: 'central', slot: '12'};

function vfDeliveryCutoff(zone, persian) {
  const time = persian ? zone.cutoff.replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit]) : zone.cutoff;
  return persian ? '\u2068' + time + '\u2069' : time;
}

function vfDeliveryHint(zone, persian) {
  return (persian ? 'ارسال همان روز تا ' : 'Same day before ') + vfDeliveryCutoff(zone, persian);
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
    address: String(delivery.address || '').trim().length < 6
  };
}

function vfTotals(lines, delivery) {
  const sub = lines.reduce((sum, line) => sum + line.unit * line.qty, 0);
  const zone = VF_ZONES.find(zone => zone.id === delivery.zone) || VF_ZONES[0];
  const free = sub >= VF_FREE_DELIVERY_THRESHOLD && VF_FREE_DELIVERY_ZONES.includes(zone.id);
  const fee = free ? 0 : zone.fee;
  return {sub, fee, total: sub + fee};
}
