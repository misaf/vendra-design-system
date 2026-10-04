export interface TabItem { id: string; label: React.ReactNode; }
export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  /** underline = accent rule under active; pill = segmented linen track */
  variant?: 'underline' | 'pill';
  /** aria-label for the tablist */
  label?: string;
  className?: string;
}
/** Roving tabindex: only the selected tab is tabbable; ←/→ (mirrored in RTL), Home, End move focus and select. */
export declare function Tabs(props: TabsProps): JSX.Element;
