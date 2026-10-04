export interface GalleryImage { src: string; srcSet?: string; alt?: string; }
export interface GalleryProps {
  images: GalleryImage[];
  /** Default '(max-width: 767px) 100vw, 540px'. Applied per image when it has a srcSet. */
  sizes?: string;
  frame?: 'arch' | 'soft';
  /** CSS aspect-ratio, default '3/4' */
  aspect?: string;
  /** aria-label for the carousel region */
  label?: string;
  /** Localized slide / dot label, e.g. (i,n) => `${i} از ${n}` */
  slideLabel?: (i: number, n: number) => string;
  className?: string;
}
export declare function Gallery(props: GalleryProps): JSX.Element;