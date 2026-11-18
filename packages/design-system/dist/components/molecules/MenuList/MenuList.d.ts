import * as React from 'react';
import type {RootAttributes} from '../../utils/root-attributes.js';

export interface MenuListProps extends Omit<RootAttributes<HTMLElement>, 'title'> {
  /** The nav. */
  ref?: React.Ref<HTMLElement>;
  /** Optional eyebrow above the list; also used as aria-label when it's a string */
  title?: React.ReactNode;
  /** aria-label for the <nav> */
  label?: string;
  /** NavLinks */
  children: React.ReactNode;
  className?: string;
}
export declare function MenuList(props: MenuListProps): React.JSX.Element;
