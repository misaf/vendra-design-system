import * as React from 'react';
export interface ProductCardProps {
  /** petal (default) or product (studio backdrop). */
  tone?: 'petal' | 'product';
  name: string;
  subtitle?: string;
  /** Pre-formatted price string (e.g. "$68" or "۱٬۲۰۰٬۰۰۰ تومان") */
  price: string;
  compareAt?: string;
  image?: string;
  /** Responsive candidates, e.g. "rose-400.jpg 400w, rose-800.jpg 800w" */
  srcSet?: string;
  /** Rendered width hints; defaults to the 2/3/4-column grid. Only applied when srcSet is set. */
  sizes?: string;
  /** All product photos, first is the cover. The second crossfades in on hover. Overrides image/srcSet. */
  images?: Array<
    | string
    | {
        src: string;
        srcSet?: string;
        alt?: string;
        /** object-position for a zoomed detail crop, e.g. "50% 30%" */ crop?: string;
      }
  >;
  badge?: string;
  badgeTone?: 'neutral' | 'accent' | 'success' | 'warning' | 'info' | 'danger' | 'solid';
  /** arch = signature rounded-top window; soft = 8px corners */
  frame?: 'arch' | 'soft';
  favorite?: boolean;
  onFavorite?: () => void;
  /** Product URL. The name becomes <a href> with a stretched link over the whole card. onClick goes on that link; the component never calls preventDefault. */
  href?: string;
  /** Accessible name of the link. Default: name + " — " + price */
  linkLabel?: string;
  /** Without href: the name renders as a real <button> (stretched the same way) */
  onClick?: (e: React.MouseEvent) => void;
  placeholder?: string;
  favLabel?: string;
}
export declare function ProductCard(props: ProductCardProps): React.JSX.Element;
