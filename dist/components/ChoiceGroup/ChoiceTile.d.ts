import * as React from 'react';
export interface ChoiceTileProps {
  label: React.ReactNode;
  description?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  /** Posted under the ChoiceGroup's `name` when selected */
  value?: string;
  /** sm = 44px, md = 56px */
  size?: 'sm' | 'md';
  className?: string;
}
/** Radio-like tile. Always place inside <ChoiceGroup>. */
export declare function ChoiceTile(props: ChoiceTileProps): React.JSX.Element;
