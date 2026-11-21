import assert from 'node:assert/strict';
import {phone} from '../src/design-system/utils/input.js';
import {
  vfBagLine,
  vfCardMessages,
  vfLineHasCard,
  vfLinesFromParam,
  vfLinesParam,
  vfLineWithCard,
  vfSampleBag
} from '../src/storefront/cart/cart-lines.js';
import {vfProduct} from '../src/storefront/catalog/catalog.js';
import {vfDeliverySlot, vfDeliverySlots} from '../src/storefront/delivery/delivery-schedule.js';
import {vfErrors} from '../src/storefront/delivery/delivery-validation.js';
import {vfZoneAt} from '../src/storefront/delivery/delivery-zones.js';
import {vfTotals} from '../src/storefront/pricing/order-totals.js';

// A bag made at the shop counter travels in a link and comes back as the same lines, priced from
// the catalog; unknown and sold-out products, bad sizes and extras the product can't take drop out.
{
  const box = vfProduct('VF-7K2M4Q'),
    orchid = vfProduct('VF-8RD5WN');
  const lines = [
    vfBagLine(box, 'classic', ['card', 'vase'], 2),
    vfBagLine(orchid, null, ['vase'], 1)
  ];
  assert.equal(vfLinesParam(lines), 'VF-7K2M4Q.classic.card+vase.2,VF-8RD5WN...1');
  assert.equal(lines[1].addons.length, 0, 'the orchid takes no vase');
  const back = vfLinesFromParam(vfLinesParam(lines));
  assert.deepEqual(
    back.map(line => [line.id, line.unit, line.qty]),
    lines.map(line => [line.id, line.unit, line.qty])
  );
  assert.equal(
    vfLinesFromParam('VF-NOPE00..card.1,VF-6MT3VY...1').length,
    0,
    'unknown and sold-out lines drop'
  );
  assert.equal(vfLinesFromParam('VF-7K2M4Q.huge..500')[0].qty, 99);
  assert.equal(
    vfLinesFromParam('VF-7K2M4Q.huge..500')[0].size,
    'petite',
    'an unknown size is the first'
  );
  assert.equal(vfLinesFromParam('<script>').length, 0);
}
for (const [zone, fee] of [
  ['central', 80000],
  ['outer', 120000],
  ['alborz', 180000],
  ['tehran', 250000]
]) {
  assert.equal(vfTotals([{unit: 1000000, qty: 2}], {zone}).fee, fee);
  assert.equal(
    vfTotals([{unit: 2500000, qty: 2}], {zone}).fee,
    ['central', 'outer'].includes(zone) ? 0 : fee
  );
}
assert.equal(
  vfTotals(
    [
      {unit: 4900000, qty: 1},
      {unit: 3400000, qty: 1}
    ],
    {zone: 'central'}
  ).total,
  8300000
);
assert.equal(phone('۰۹۱۲ ۳۴۵ ۶۷۸۹'), '09123456789');
assert.equal(phone('٠٩١٢٣٤٥٦٧٨٩'), '09123456789');
const sender = {sender: 'Buyer', senderPhone: '09121112233'};
assert.equal(
  Object.values(vfErrors({name: '', phone: '0912', address: '', location: null})).filter(Boolean)
    .length,
  6,
  "recipient, pin, address and the sender's own name and mobile"
);
assert.equal(
  Object.values(
    vfErrors({
      name: 'Sample',
      phone: '۰۹۱۲۳۴۵۶۷۸۹',
      address: 'Unit 3',
      location: {lat: 35.83, lng: 50.96},
      ...sender
    })
  ).some(Boolean),
  false
);
// Without a map the pin isn't required, but the typed address must be a full one.
assert.deepEqual(
  vfErrors({
    name: 'Sample',
    phone: '09123456789',
    address: 'Unit',
    location: null,
    noMap: true,
    ...sender
  }),
  {
    name: false,
    phone: false,
    location: false,
    outside: false,
    address: true,
    cards: false,
    sender: false,
    senderPhone: false
  }
);
assert.equal(
  Object.values(
    vfErrors({
      name: 'Sample',
      phone: '09123456789',
      address: '12 Golestan St, Karaj',
      location: null,
      noMap: true,
      ...sender
    })
  ).some(Boolean),
  false
);
assert.equal(
  vfErrors({name: 'S', phone: '09123456789', address: 'U', location: {lat: 'x', lng: 50}}).location,
  true,
  'a broken pin is not a pin'
);
assert.equal(
  vfErrors({
    ...sender,
    name: 'S',
    phone: '09123456789',
    address: 'U',
    location: {lat: 32.65, lng: 51.67}
  }).outside,
  true,
  'a pin beyond every zone is outside the delivery area'
);
// A bought handwritten card needs its message; a line without one does not.
const plain = {
  id: 'VF-9FA2KE',
  productId: 'VF-9FA2KE',
  size: null,
  addons: [],
  unit: 2200000,
  qty: 1,
  en: ['VF-9FA2KE', 'Bouquet · Garden roses · eucalyptus'],
  fa: ['VF-9FA2KE', 'دسته‌گل · رز باغی · اکالیپتوس']
};
const carded = vfLineWithCard(plain);
assert.equal(carded.id, 'VF-9FA2KE-card');
assert.equal(carded.unit, 2350000);
assert.equal(carded.en[1], 'Bouquet · Garden roses · eucalyptus · Handwritten card');
assert.ok(vfLineHasCard(carded));
assert.equal(vfLineHasCard(plain), false);
// A line saved before products had codes (named, with a slug id) comes back titled by its code.
const legacy = vfLineWithCard({
  id: 'ivory-classic-vase',
  unit: 5550000,
  qty: 1,
  en: ['Ivory ribbon box', 'Classic · 20 stems · Glass vase'],
  fa: ['باکس', 'کلاسیک · ۲۰ شاخه · گلدان شیشه‌ای']
});
assert.equal(legacy.id, 'VF-7K2M4Q-classic-card+vase', 'addons keep the product page order');
assert.equal(legacy.en[0], 'VF-7K2M4Q');
assert.equal(legacy.size, 'classic');
const base = {
  name: 'S',
  phone: '09123456789',
  address: 'U',
  location: {lat: 35.83, lng: 50.96},
  ...sender
};
assert.equal(vfErrors(base, [plain]).cards, false);
assert.equal(vfErrors(base, [carded]).cards, true);
assert.equal(vfErrors(base, [{...carded, card: 'Love'}]).cards, false);
assert.ok(
  vfLineHasCard(vfSampleBag()[0]) && vfSampleBag()[0].card,
  'the sample bag pays for the card it writes'
);
assert.equal(vfCardMessages([{...carded, card: 'Love'}], {}, 'en'), '“\u2068Love\u2069”');
assert.equal(
  vfCardMessages([], {card: 'Old'}, 'en'),
  'Old',
  'older orders keep their order-wide message'
);
// The pin picks the smallest zone that reaches it.
assert.equal(vfZoneAt({lat: 35.8327, lng: 50.9654}), 'central');
assert.equal(vfZoneAt({lat: 35.8, lng: 50.86}), 'outer');
assert.equal(vfZoneAt({lat: 35.7, lng: 51.4}), 'tehran');
assert.equal(vfZoneAt({lat: 36.05, lng: 50.6}), 'alborz');
assert.equal(vfZoneAt(null), null);
// Today's slots close two hours before they end; the chosen slot falls forward to the next open one.
const afternoon = new Date('2026-10-06T14:30:00+03:30'),
  iso = '2026-10-06';
assert.equal(
  vfDeliverySlots(iso, afternoon)
    .map(x => x.closed)
    .join(),
  'true,true,false,false'
);
assert.equal(
  vfDeliverySlots('2026-10-07', afternoon)
    .map(x => x.closed)
    .join(),
  'false,false,false,false',
  'other days keep every slot'
);
assert.equal(vfDeliverySlot({zone: 'central', date: iso, slot: '08'}, afternoon), undefined);
assert.equal(vfDeliverySlot({zone: 'central', date: '2026-10-07', slot: '08'}, afternoon), '08');
