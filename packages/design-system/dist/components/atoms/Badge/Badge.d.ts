import * as React from 'react';
import type {DataAttributes} from '../../utils/root-attributes.js';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, DataAttributes {
  /** The outer element. */
  ref?: React.Ref<HTMLSpanElement>;
  /** neutral, info, success, warning and danger are the status tones Alert and Toast share; accent
   * (pale peony) and solid (ink fill) are emphasis for labels such as "New" and are Badge's own. */
  tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent' | 'solid';
  children?: React.ReactNode;
}
export declare function Badge(props: BadgeProps): React.JSX.Element;
