import * as React from 'react';
import type {ButtonDOMProps} from '../Button/Button.js';

export interface IconButtonProps extends ButtonDOMProps {
  icon: string;
  /** Required accessible label (also used as title) */
  label: string;
  /** Named as on Button and Card: ghost = no edge; secondary = 1px --border-subtle circle, hover adds
   * --surface-hover and --border-strong; raised = white with a small shadow, for use over photos. */
  variant?: 'ghost' | 'secondary' | 'raised';
  size?: 'sm' | 'md' | 'lg';
  /** On a dark surface (the footer, the consent banner): a light icon, a dark-surface edge for
   * secondary, a lighter hover and the on-dark focus ring. Not with raised */
  inverse?: boolean;
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
export declare function IconButton(props: IconButtonProps): React.JSX.Element;
