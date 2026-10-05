export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  /** Required accessible label (also used as title) */
  label: string;
  /** outline = 1px --border-subtle circle; hover adds a linen-200 wash and --border-strong */
  variant?: 'ghost' | 'outline' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  /** Toggled on (e.g. favourited) */
  active?: boolean;
  /** Small count bubble (bag items). Number or pre-localized string; hidden when 0/empty. Put the count in `label` too, for screen readers. */
  count?: number | string;
  /** Renders an <a> instead of a <button> (tel:, wa.me, Instagram) */
  href?: string;
  target?: string;
  /** Defaults to "noopener noreferrer" when target="_blank" */
  rel?: string;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
