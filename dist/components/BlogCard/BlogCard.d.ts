import * as React from 'react';
import type {Photo} from '../Picture/Picture.js';

export interface BlogCardProps {
  /** A URL or a photo object (see Picture) */
  image?: Photo;
  /** Default '(max-width: 767px) 100vw, 400px' (wide: 55vw). Applied when the photo has candidates. */
  sizes?: string;
  /** Pre-formatted, localized date */
  date?: string;
  /** Free-form meta row (e.g. category · date · read time), shown under the image */
  meta?: React.ReactNode;
  title: string;
  excerpt?: string;
  onClick?: () => void;
  /** Renders the title as a link instead of a button */
  href?: string;
  frame?: 'arch' | 'soft';
  /** CSS aspect-ratio for the image; default 4/5 */
  aspect?: string;
  headingLevel?: 2 | 3 | 4;
  /** stack = image above text; wide = image beside text on ≥768px (lead story) */
  layout?: 'stack' | 'wide';
  /** Visual 'Read the story →' line (the whole card is already the link) */
  cta?: React.ReactNode;
  /** Above-the-fold image: loads eagerly with high fetch priority */
  priority?: boolean;
  className?: string;
}
export declare function BlogCard(props: BlogCardProps): React.JSX.Element;
