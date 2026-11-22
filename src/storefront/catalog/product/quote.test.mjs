import assert from 'node:assert/strict';
import {test} from 'node:test';
import {vfBagLine} from '../../cart/cart-lines.js';
import {vfProduct} from '../catalog.js';
import {vfProductQuote} from './quote.js';

test('the quoted total uses the canonical line that will be added to the bag', () => {
  const box = vfProduct('VF-7K2M4Q');
  const quote = vfProductQuote(box, {size: 'classic', addons: ['vase', 'card', 'card'], qty: 2});

  assert.deepEqual(quote.line, vfBagLine(box, 'classic', ['card', 'vase'], 2));
  assert.equal(quote.line.unit, 5_700_000);
  assert.equal(quote.total, 11_400_000);

  const orchid = vfProduct('VF-8RD5WN');
  const withoutOptions = vfProductQuote(orchid, {size: 'classic', addons: ['vase'], qty: 1});
  assert.equal(withoutOptions.line.size, null);
  assert.deepEqual(withoutOptions.line.addons, []);
  assert.equal(withoutOptions.total, 3_400_000);
});

test('the quote clamps quantity across matching and different bag configurations', () => {
  const box = vfProduct('VF-7K2M4Q');
  const selection = {size: 'classic', addons: ['card'], qty: 9};
  const matching = vfBagLine(box, 'classic', ['card'], 3);
  const otherSize = vfBagLine(box, 'petite', [], 7);
  const quote = vfProductQuote(box, selection, [matching, otherSize]);

  assert.equal(quote.remaining, 2);
  assert.equal(quote.line.qty, 2);
  assert.equal(quote.total, quote.line.unit * 2);
  assert.equal(matching.qty, 3);
  assert.equal(selection.qty, 9);
});

test('sold-out products and fully allocated stock keep the quantity display at one', () => {
  const box = vfProduct('VF-7K2M4Q');
  const soldOut = vfProduct('VF-6MT3VY');
  const selection = {size: 'classic', addons: [], qty: 4};

  for (const quote of [
    vfProductQuote(box, selection, [vfBagLine(box, 'petite', [], box.quantity)]),
    vfProductQuote(soldOut, selection)
  ]) {
    assert.equal(quote.remaining, 0);
    assert.equal(quote.line.qty, 1);
  }
});
