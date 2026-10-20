import * as React from 'react';
/** A photo: a URL, or what commerce.imageFromApi returns for an API Multimedia record. */
export type Photo =
  | string
  | {
      src: string;
      /** Candidates in the photo's own format, e.g. "rose-480.jpg 480w, rose-960.jpg 960w" */
      srcSet?: string;
      /** Smaller formats the browser picks first when it reads them, e.g. AVIF then WebP */
      sources?: Array<{type: string; srcSet: string}>;
      /** Intrinsic size in pixels, so the page reserves the space before the photo loads */
      width?: number;
      height?: number;
      /** A tiny blurred data: URI shown until the photo has loaded */
      placeholder?: string;
      /** Used when the component isn't given its own alt; '' marks the photo decorative */
      alt?: string;
      /** object-position for a zoomed detail crop (ProductCard), e.g. "50% 30%" */
      crop?: string;
    };

export interface PictureProps extends Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet' | 'width' | 'height' | 'loading'
> {
  image?: Photo;
  /** Overrides image.alt. Default ''. */
  alt?: string;
  /** The width the layout shows the photo at, e.g. "(max-width: 640px) 50vw, 25vw". Applied when there are candidates. */
  sizes?: string;
  /** The photo a page shows first (top of the product page, first cards): loads at once, at high priority. Default: lazy. */
  priority?: boolean;
}
/** A responsive <img> (or <picture> with AVIF/WebP sources), lazy unless `priority`; renders nothing without a src. */
export declare function Picture(props: PictureProps): React.JSX.Element | null;
