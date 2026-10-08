export interface LineItemProps {
  image?: string;
  srcSet?: string;
  name: React.ReactNode;
  /** e.g. "Classic · 2,400,000 Toman" */
  meta?: React.ReactNode;
  /** e.g. the card message */
  note?: React.ReactNode;
  /** Pre-formatted line total */
  price: string;
  quantity?: number;
  /** lg only — shows a QuantityInput */
  onQuantityChange?: (n: number) => void;
  /** lg only */
  onRemove?: () => void;
  removeLabel?: string;
  quantityLabels?: {dec: string; inc: string};
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
export declare function LineItem(props: LineItemProps): JSX.Element;
