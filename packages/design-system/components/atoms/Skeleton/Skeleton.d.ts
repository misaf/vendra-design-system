import type {RootAttributes} from '../../utils/root-attributes.js';

export interface SkeletonProps extends Omit<RootAttributes<HTMLElement>, 'children'> {
  /** The outer element. */
  ref?: React.Ref<HTMLElement>;
  /** card = ProductCard-shaped preset (arch image + 3 text lines) */
  shape?: 'text' | 'block' | 'circle' | 'arch' | 'card';
  width?: number | string;
  height?: number | string;
  /** Number of lines for shape="text"; the last line is shorter */
  lines?: number;
  radius?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Skeleton(props: SkeletonProps): React.JSX.Element;
