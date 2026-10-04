export interface MenuListProps {
  /** Optional eyebrow above the list; also used as aria-label when it's a string */
  title?: React.ReactNode;
  /** aria-label for the <nav> */
  label?: string;
  /** NavLinks */
  children: React.ReactNode;
  className?: string;
}
export declare function MenuList(props: MenuListProps): JSX.Element;