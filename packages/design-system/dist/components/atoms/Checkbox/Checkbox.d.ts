import * as React from 'react';
import type {DataAttributes} from '../../utils/root-attributes.js';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>, DataAttributes {
  /** The native checkbox input, for focusing it or a form library. */
  ref?: React.Ref<HTMLInputElement>;
  /** The new state */
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  /** Helper text below the control, linked with aria-describedby="{id}-hint" */
  hint?: React.ReactNode;
  /** Error message: danger border, aria-invalid, and aria-errormessage → the hint element */
  error?: React.ReactNode;
}
export declare function Checkbox(props: CheckboxProps): React.JSX.Element;
