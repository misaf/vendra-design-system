/** A physical arrow direction: what the viewer sees, whatever the page's writing direction. */
export type SpatialDirection = 'up' | 'down' | 'left' | 'right';

/** A box in viewport pixels, as `getBoundingClientRect()` returns it. */
export interface SpatialBox {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/**
 * The index of the box an arrow key moves to from `from`: the nearest box lying further in
 * `direction`, where a step sideways counts double. A box inside `from` (or around it) comes first
 * when its middle lies that way. -1 when there is none.
 */
export declare function nearestInDirection(
  from: SpatialBox,
  boxes: readonly SpatialBox[],
  direction: SpatialDirection
): number;

/** The direction an arrow `KeyboardEvent.key` names, or undefined for any other key. */
export declare function arrowDirection(key: string): SpatialDirection | undefined;
