export interface ChoiceTileProps {
  label: React.ReactNode;
  description?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  /** sm = 44px, md = 56px */
  size?: 'sm' | 'md';
  className?: string;
}
/** Radio-like tile. Always place inside <ChoiceGroup>. */
export declare function ChoiceTile(props: ChoiceTileProps): JSX.Element;
