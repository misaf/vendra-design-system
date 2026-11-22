import assert from 'node:assert/strict';
import {
  vfBagLine,
  vfCardMessages,
  vfLineHasCard,
  vfLinesFromParam,
  vfLinesParam,
  vfLineWithCard,
  vfSampleBag
} from './cart-lines.js';
import {vfProduct} from '../catalog/catalog.js';

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
