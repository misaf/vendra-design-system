// Spatial navigation for a remote control or the arrow keys: which box an arrow moves to from the
// focused one. Directions are physical (what the viewer sees), so a right-to-left page needs no
// mirroring: the next item in Persian sits to the left and ArrowLeft reaches it. Pure (boxes in, an
// index out), so the app collects the focusable elements and their boxes itself.

// How much a sideways step costs against a step straight ahead: an item directly below wins over a
// nearer one diagonally below, as in a product grid.
const SIDEWAYS_WEIGHT = 2;

// Each direction as [the axis it moves along, +1 or -1].
const AXES = {up: ['y', -1], down: ['y', 1], left: ['x', -1], right: ['x', 1]};

function span(box, axis) {
  return axis === 'x' ? [box.left, box.right] : [box.top, box.bottom];
}

// The gap between two ranges on one axis, 0 when they overlap.
function gap([start, end], [otherStart, otherEnd]) {
  return Math.max(0, otherStart - end, start - otherEnd);
}

function contains(outer, inner) {
  return (
    inner.left >= outer.left &&
    inner.right <= outer.right &&
    inner.top >= outer.top &&
    inner.bottom <= outer.bottom
  );
}

function middle([start, end]) {
  return (start + end) / 2;
}

export function nearestInDirection(from, boxes, direction) {
  const [axis, sign] = AXES[direction] || [];
  if (!axis) return -1;
  const cross = axis === 'x' ? 'y' : 'x';
  const [fromStart, fromEnd] = span(from, axis);
  const fromCross = span(from, cross);
  const fromMiddle = middle(span(from, axis));
  let best = -1;
  let bestScore = Infinity;
  let bestCenter = Infinity;
  boxes.forEach((box, index) => {
    const [start, end] = span(box, axis);
    const boxCross = span(box, cross);
    let score;
    if (contains(from, box) || contains(box, from)) {
      // One inside the other (a card and the save button on its photo): the arrow pointing from
      // one's middle towards the other's moves between them before it leaves for anything else.
      const step = (middle([start, end]) - fromMiddle) * sign;
      if (step <= 0) return;
      score = step - 1e6;
    } else {
      // Otherwise only boxes that lie further that way: their far edge beyond the focused box's far
      // edge and their near edge past its near edge.
      const ahead =
        sign > 0 ? end > fromEnd && start > fromStart : start < fromStart && end < fromEnd;
      if (!ahead) return;
      // One that has not cleared the focused box's far edge is ahead only beside it, sharing some
      // of its cross range; one that also sits above or below it is diagonal, for the other arrow.
      const cleared = sign > 0 ? start >= fromEnd : end <= fromStart;
      const shared = Math.min(fromCross[1], boxCross[1]) - Math.max(fromCross[0], boxCross[0]);
      if (!cleared && shared <= 0) return;
      const along = sign > 0 ? Math.max(0, start - fromEnd) : Math.max(0, fromStart - end);
      score = along + SIDEWAYS_WEIGHT * gap(fromCross, boxCross);
    }
    const center = Math.abs(middle(boxCross) - middle(fromCross));
    if (score < bestScore || (score === bestScore && center < bestCenter)) {
      best = index;
      bestScore = score;
      bestCenter = center;
    }
  });
  return best;
}

// The arrow key an event names as a direction, or undefined.
export function arrowDirection(key) {
  return {ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right'}[key];
}
