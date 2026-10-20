import * as React from 'react';
export interface FilterBarFilter {
  /** Stable key; default the label */
  id?: string;
  /** What the filter shows, e.g. "Anniversary" or "1,000,000 – 3,000,000 Toman" */
  label: string;
  onRemove: () => void;
}
export interface FilterBarProps {
  /** The filters that are on; the bar renders nothing when there are none */
  filters: FilterBarFilter[];
  /** Shows "Clear all" after the filters. Move focus somewhere useful, as the bar goes away */
  onClearAll?: () => void;
  /** The group's accessible name. Default from messages ("Active filters") */
  label?: string;
  /** Default from messages ("Clear all") */
  clearAllLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}
/** The filters that are on, each removable, and "Clear all". */
export declare function FilterBar(props: FilterBarProps): React.JSX.Element | null;
