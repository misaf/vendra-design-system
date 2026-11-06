import * as React from 'react';
export interface PromoCodeFieldProps {
  /** The field's id (its label and error hang off it). Default "ag-promo" */
  id?: string;
  /** The code as typed; leave out to let the field keep it */
  value?: string;
  onChange?: (value: string) => void;
  /** Apply pressed, or Enter in the field, with a non-empty code (trimmed). Check it and set `applied` or `error` */
  onApply?: (code: string) => void;
  /** Why the code was refused ("This code needs a subtotal of 4,000,000 Toman."); focuses the field */
  error?: string;
  /** The accepted code as the customer should read it ("ROSES15 · 15% off"); replaces the field with it and Remove */
  applied?: React.ReactNode;
  onRemove?: () => void;
  /** While the app checks the code with the server: Apply shows a spinner */
  busy?: boolean;
  /** Tuck the field behind a "Have a promo code?" disclosure button (aria-expanded) that opens it and
   * focuses it. It opens by itself whenever there is a code: `value`, `error` or `applied`. */
  collapsible?: boolean;
  /** With `collapsible`: start open even without a code */
  defaultOpen?: boolean;
  /** Defaults: built-in "Promo code" / "Apply" / "Remove code" / "Have a promo code?" in the page's language */
  label?: string;
  applyLabel?: string;
  removeLabel?: string;
  revealLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}
/** A discount code field with Apply inside it, then the applied code with Remove. */
export declare function PromoCodeField(props: PromoCodeFieldProps): React.JSX.Element;
