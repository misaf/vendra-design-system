import * as React from 'react';
import type {Photo} from '../Picture/Picture.js';

export interface LineItemProps {
  /** A URL or a photo object (see Picture); sized to the thumbnail */
  image?: Photo;
  name: React.ReactNode;
  /** e.g. "Classic · 2,400,000 Toman" */
  meta?: React.ReactNode;
  /** e.g. the card message */
  note?: React.ReactNode;
  /** Pre-formatted line total */
  price: string;
  quantity?: number;
  /** Remaining stock available for this line, including its current quantity. */
  quantityMax?: number;
  /** lg only — shows a QuantityInput */
  onQuantityChange?: (n: number) => void;
  /** lg only */
  onRemove?: () => void;
  removeLabel?: string;
  quantityLabels?: {decrease: string; increase: string; value?: string};
  formatQuantity?: (n: number) => string;
  /** lg = bag row (88px thumb, stepper); sm = order summary (44px thumb, "×2") */
  size?: 'lg' | 'sm';
  /** Sold out / discontinued: dims the photo, shows unavailableLabel, hides stepper and price. Keep onRemove so it can be cleared. */
  unavailable?: boolean;
  unavailableLabel?: string;
  /** Quantity change in flight — stepper disabled, row aria-busy */
  busy?: boolean;
  className?: string;
}
export declare function LineItem(props: LineItemProps): React.JSX.Element;
