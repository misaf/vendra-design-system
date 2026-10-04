export interface QuantityStepperProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (n: number) => void;
  /** Both buttons off (e.g. while the bag is updating). At min/max only that side turns off. */
  disabled?: boolean;
  size?: 'sm' | 'md';
  /** Number formatter — pass a Persian-digit formatter for fa */
  format?: (n: number) => string;
  labels?: { dec: string; inc: string };
}
export declare function QuantityStepper(props: QuantityStepperProps): JSX.Element;