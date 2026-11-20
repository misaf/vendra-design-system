import type {AriaWidgetAttributes} from '../../utils/root-attributes.js';

export interface NavLinkProps extends AriaWidgetAttributes<HTMLAnchorElement | HTMLButtonElement> {
  /** The link, or the button without `href`. */
  ref?: React.Ref<HTMLAnchorElement | HTMLButtonElement>;
  /** Renders <a> when set, otherwise <button> */
  href?: string;
  current?: boolean;
  /** header = pill link; footer = small inline link (inherits colour); menu = large serif row with divider */
  variant?: 'header' | 'footer' | 'menu';
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  className?: string;
}
export declare function NavLink(props: NavLinkProps): React.JSX.Element;
