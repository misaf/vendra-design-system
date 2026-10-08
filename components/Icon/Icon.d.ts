export interface IconProps {
  /** Lucide icon name, kebab-case (e.g. "flower-2", "shopping-bag"). */
  name: string;
  size?: number;
  color?: string;
  /** Accessible label; omit for decorative icons. */
  label?: string;
  /** Mirror in RTL. Defaults true for arrows/chevrons. */
  flipRtl?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
