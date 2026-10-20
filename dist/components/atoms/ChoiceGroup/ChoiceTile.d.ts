import * as React from 'react';
export interface ChoiceTileProps {
  label: React.ReactNode;
  description?: React.ReactNode;
  /** What the ChoiceGroup's value becomes when this tile is chosen (and what a form posts) */
  value: string;
  disabled?: boolean;
  /** sm = 44px, md = 56px */
  size?: 'sm' | 'md';
  className?: string;
}
/** Radio-like tile. Always place inside <ChoiceGroup>. */
export declare function ChoiceTile(props: ChoiceTileProps): React.JSX.Element;
