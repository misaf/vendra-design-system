import * as React from 'react';
export interface QuantityStepperProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (n: number) => void;
  /** Both buttons off (e.g. while the bag is updating). At min/max only that side turns off. */
  disabled?: boolean;
  size?: 'sm' | 'md';
  /** decrease/increase name the buttons, value names the count field. Defaults come from VendraProvider's language (QuantityInput/messages.js) */
  labels?: {decrease: string; increase: string; value?: string};
}
export declare function QuantityInput(props: QuantityStepperProps): React.JSX.Element;
