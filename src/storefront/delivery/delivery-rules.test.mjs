import assert from 'node:assert/strict';
import {phone} from '../../design-system/utils/input.js';
import {vfBagLine, vfLineWithCard} from '../cart/cart-lines.js';
import {vfProduct} from '../catalog/catalog.js';
import {vfDeliverySlot, vfDeliverySlots} from './delivery-schedule.js';
import {vfErrors} from './delivery-validation.js';
import {vfZoneAt} from './delivery-zones.js';

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

const plain = vfBagLine(vfProduct('VF-9FA2KE'));
const carded = vfLineWithCard(plain);
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
