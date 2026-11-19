import type {ButtonDOMProps} from '@vendra/ui/Button';

export interface ChipProps extends ButtonDOMProps {
  /** The button. */
  ref?: React.Ref<HTMLButtonElement>;
  /** Filled ink when selected */
  selected?: boolean;
  children?: React.ReactNode;
}
export declare function Chip(props: ChipProps): React.JSX.Element;
