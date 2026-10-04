export interface NavLinkProps {
  /** Renders <a> when set, otherwise <button> */
  href?: string;
  current?: boolean;
  /** header = pill link; footer = small inline link (inherits colour); menu = large serif row with divider */
  variant?: 'header' | 'footer' | 'menu';
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  className?: string;
}
export declare function NavLink(props: NavLinkProps): JSX.Element;