// Spatial navigation (components/utils/spatial.js): where a remote's arrow keys move focus.
import assert from 'node:assert/strict';
import {arrowDirection, nearestInDirection} from '../../components/utils/spatial.js';

const box = (left, top, width, height) => ({left, top, right: left + width, bottom: top + height});

// A 3 × 2 product grid, 100px cards with 20px gaps, and a header link above it.
const header = box(0, 0, 60, 40);
const grid = [0, 1, 2, 3, 4, 5].map(index =>
  box((index % 3) * 120, 100 + Math.floor(index / 3) * 120, 100, 100)
);
const boxes = [header, ...grid];
const from = grid[1];

assert.equal(nearestInDirection(from, boxes, 'right'), 3, 'right: the card beside it');
assert.equal(nearestInDirection(from, boxes, 'left'), 1, 'left: the card beside it');
assert.equal(nearestInDirection(from, boxes, 'down'), 5, 'down: the card straight below');
assert.equal(nearestInDirection(from, boxes, 'up'), 0, 'up: out of the grid to the header');
assert.equal(nearestInDirection(grid[2], boxes, 'right'), -1, 'nothing further right');
assert.equal(nearestInDirection(from, boxes, 'sideways'), -1, 'not a direction');

// Straight ahead beats nearer but sideways: from the first card, down goes to the card below it,
// not to a closer one that is mostly to the side.
const sideways = box(110, 205, 100, 30);
assert.equal(nearestInDirection(grid[0], [sideways, grid[3]], 'down'), 1);

// A save button inside a card: the arrow towards it enters it first, and back out to the card.
const card = box(0, 0, 200, 300);
const save = box(150, 10, 40, 40);
const next = box(220, 0, 200, 300);
assert.equal(nearestInDirection(card, [save, next], 'right'), 0, 'into the button on the card');
assert.equal(nearestInDirection(card, [save, next], 'down'), -1, 'the button is not below');
assert.equal(nearestInDirection(save, [card, next], 'down'), 0, 'back to its card');
assert.equal(nearestInDirection(save, [card, next], 'right'), 1, 'on to the next card');

// Physical directions: in a right-to-left row the next item is on the left, and ArrowLeft finds it.
const rtlFirst = box(300, 0, 100, 100);
const rtlSecond = box(180, 0, 100, 100);
assert.equal(nearestInDirection(rtlFirst, [rtlSecond], 'left'), 0);

assert.equal(arrowDirection('ArrowUp'), 'up');
assert.equal(arrowDirection('ArrowLeft'), 'left');
assert.equal(arrowDirection('Enter'), undefined);

console.log('Passed spatial navigation: grids, nested controls, right-to-left rows.');
