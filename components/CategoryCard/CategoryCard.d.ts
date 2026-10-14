import type {Photo} from '../Picture/Picture.js';

export interface CategoryCardProps {
  /** Category name, already localized */
  label: string;
  /** Optional muted line, e.g. "12 designs" */
  count?: string;
  /** A URL or a photo object (see Picture) */
  image?: Photo;
  /** Defaults to the 2/3/4-column grid. Applied when the photo has candidates. */
  sizes?: string;
  /** The first photos a page shows: load at once, at high priority (Picture). Default lazy. */
  priority?: boolean;
  /** arch = signature rounded-top window; soft = 8px corners; circle = a small round photo with the name
   * centred under it (no arrow), for a quick row of categories */
  frame?: 'arch' | 'soft' | 'circle';
  /** CSS aspect-ratio for the photo; default 4/5 */
  aspect?: string;
  /** Renders <a href> instead of <button> */
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}
export declare function CategoryCard(props: CategoryCardProps): JSX.Element;
