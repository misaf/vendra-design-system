import type {ButtonDOMProps} from '../Button/Button.jsx';

export interface ChipProps extends ButtonDOMProps {
  /** The button. */
  ref?: React.Ref<HTMLButtonElement>;
  /** Filled ink when selected */
  selected?: boolean;
  children?: React.ReactNode;
}
export declare function Chip(props: ChipProps): React.JSX.Element;
