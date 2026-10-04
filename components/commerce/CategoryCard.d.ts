export interface CategoryCardProps {
  /** Category name, already localized */
  label: string;
  /** Optional muted line, e.g. "12 designs" */
  count?: string;
  image?: string;
  /** Responsive candidates, e.g. "a-400.jpg 400w, a-800.jpg 800w" */
  srcSet?: string;
  /** Defaults to the 2/3/4-column grid. Only applied when srcSet is set. */
  sizes?: string;
  /** arch = signature rounded-top window; soft = 8px corners */
  frame?: 'arch' | 'soft';
  /** Renders <a href> instead of <button> */
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}
export declare function CategoryCard(props: CategoryCardProps): JSX.Element;