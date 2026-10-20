import type {Photo} from '../atoms/Picture/Picture.js';

import type {Stock} from '../utils/commerce.js';

export interface ProductCardProps {
  /** petal (default) or product (studio backdrop). */
  tone?: 'petal' | 'product';
  name: string;
  subtitle?: string;
  /** Pre-formatted price string (e.g. "$68" or "۱٬۲۰۰٬۰۰۰ تومان") */
  price: string;
  /** The price before a reduction, formatted the same way; Price strikes it through */
  compareAt?: string;
  /** commerce.stockStatus(product): shown under the price unless the product is in stock */
  stock?: Stock;
  /** A URL or a photo object (see Picture) */
  image?: Photo;
  /** Rendered width hints; defaults to the 2/3/4-column grid. Applied when the photo has candidates. */
  sizes?: string;
  /** All product photos, first is the cover. The second crossfades in on hover. Overrides image. */
  images?: Photo[];
  /** Cards in the first row a page shows: the cover loads at once, at high priority. Default lazy. */
  priority?: boolean;
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
export declare function ProductCard(props: ProductCardProps): JSX.Element;
