export interface QuantityStepperProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (n: number) => void;
  /** Both buttons off (e.g. while the bag is updating). At min/max only that side turns off. */
  disabled?: boolean;
  size?: 'sm' | 'md';
  /** @deprecated Ignored: digits follow the page's language (Persian digits under lang="fa") */
  format?: (n: number) => string;
  /** dec/inc name the buttons, value names the count field. Default "Quantity" */
  labels?: {dec: string; inc: string; value?: string};
}
export declare function QuantityInput(props: QuantityStepperProps): JSX.Element;
