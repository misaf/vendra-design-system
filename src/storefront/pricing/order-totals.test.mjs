import assert from 'node:assert/strict';
import {vfTotals} from './order-totals.js';

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
