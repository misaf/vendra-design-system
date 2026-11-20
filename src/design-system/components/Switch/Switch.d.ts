import type {DataAttributes} from '../../utils/root-attributes.js';

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>, DataAttributes {
  /** The native checkbox input, for focusing it or a form library. */
  ref?: React.Ref<HTMLInputElement>;
  /** The new state */
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
}
export declare function Switch(props: SwitchProps): React.JSX.Element;
