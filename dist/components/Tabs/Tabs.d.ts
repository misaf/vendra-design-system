import * as React from 'react';
export interface TabItem {
  id: string;
  label: React.ReactNode;
}
export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  /** underline = accent rule under active; pill = segmented petal track */
  variant?: 'underline' | 'pill';
  /** aria-label for the tablist */
  label?: string;
  /** Links tabs to panels: tab ids become `${idPrefix}-tab-${id}`, and the selected tab gets aria-controls=`${idPrefix}-panel-${id}`.
   *  Render the visible panel as <div role="tabpanel" id={`${idPrefix}-panel-${id}`} aria-labelledby={`${idPrefix}-tab-${id}`} tabIndex={0}>. */
  idPrefix?: string;
  className?: string;
}
/** Roving tabindex: only the selected tab is tabbable; ←/→ (mirrored in RTL), Home, End move focus and select. */
export declare function Tabs(props: TabsProps): React.JSX.Element;
