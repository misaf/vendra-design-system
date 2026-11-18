import * as React from 'react';
import type {AriaWidgetAttributes} from '../../utils/root-attributes.js';

export interface TabItem {
  id: string;
  label: React.ReactNode;
}
export interface TabsProps extends AriaWidgetAttributes<HTMLDivElement> {
  /** The outer element. */
  ref?: React.Ref<HTMLDivElement>;
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  /** underline = accent rule under active; pill = segmented petal track */
  variant?: 'underline' | 'pill';
  /** aria-label for the tablist */
  label?: string;
  /** Classes on the tab list itself */
  className?: string;
  /** Wraps the tab list in a div with these classes, e.g. a horizontal scroller on phones */
  listClassName?: string;
  /** Classes on the tabpanel */
  panelClassName?: string;
  /** The selected tab's content, rendered in a tabpanel linked to its tab (aria-controls,
   * aria-labelledby). Without children, Tabs is only the tab list. */
  children?: React.ReactNode;
}
/** React Aria tabs: one Tab stop; ←/→ (mirrored in RTL), Home and End move and select; children is the selected tab's panel. */
export declare function Tabs(props: TabsProps): React.JSX.Element;
