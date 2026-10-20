import * as React from 'react';
import type {Photo} from '../atoms/Picture/Picture.js';

export interface GalleryProps {
  /** URLs or photo objects (see Picture); the first loads at once, the rest lazily */
  images: Photo[];
  /** Default '(max-width: 767px) 100vw, 540px'. Applied per image when it has candidates. */
  sizes?: string;
  frame?: 'arch' | 'soft';
  /** CSS aspect-ratio, default '3/4' */
  aspect?: string;
  /** aria-label for the carousel region */
  label?: string;
  /** Localized slide / dot label, e.g. (i,n) => `${i} از ${n}` */
  slideLabel?: (i: number, n: number) => string;
  /** Reports the zero-based active slide after scrolling or choosing a dot. */
  onIndexChange?: (index: number) => void;
  className?: string;
}
export declare function Gallery(props: GalleryProps): React.JSX.Element;
