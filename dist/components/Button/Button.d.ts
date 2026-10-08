import * as React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = accent (peony) fill, white text (one per view); secondary = ink outline; soft = pale accent tint; ghost = text only */
  variant?: 'primary' | 'secondary' | 'soft' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Lucide icon name before label (inline-start, flips side in RTL) */
  iconStart?: string;
  iconEnd?: string;
  block?: boolean;
  /** Renders <a href> — use for navigation. Without href it's a <button> (actions). */
  href?: string;
  target?: string;
  /** Defaults to "noopener noreferrer" when target="_blank" */
  rel?: string;
  /** Shows a spinner in place of iconStart and disables the button (aria-busy). Keep the label — don't swap it for "Loading…". */
  loading?: boolean;
  /** Announced politely while loading, e.g. "Placing your order" */
  loadingLabel?: string;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): React.JSX.Element;
