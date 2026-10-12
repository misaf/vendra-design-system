import * as React from 'react';
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** The new state */
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
}
export declare function Switch(props: SwitchProps): React.JSX.Element;
