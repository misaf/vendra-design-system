import * as React from 'react';
export interface IconProps {
  /** The outer element. */
  ref?: React.Ref<HTMLSpanElement>;
  /** Lucide icon name, kebab-case (e.g. "flower-2", "shopping-bag"). */
  name: string;
  /** Pixels at the comfortable density; scales with `data-density` (--size-scale). Default 20. */
  size?: number;
  color?: string;
  /** Accessible label; omit for decorative icons. */
  label?: string;
  /** Mirror in RTL. Defaults true for arrows/chevrons. */
  flipRtl?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): React.JSX.Element;
