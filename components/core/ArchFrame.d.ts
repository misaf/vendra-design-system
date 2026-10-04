export interface ArchFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  /** Only applied with srcSet: sizes is ignored without it */
  srcSet?: string;
  sizes?: string;
  /** Required for real images; '' marks decorative */
  alt?: string;
  /** Aspect ratio; circle is always 1/1. fill = no ratio, 100% of the parent's height (split panels where the text column sets the height) */
  ratio?: '4/5' | '3/4' | '4/3' | '1/1' | 'fill';
  /** With ratio="fill": floor height when the parent is short, e.g. "320px" */
  minHeight?: string | number;
  /** linen (default) = striped linen placeholder · product = plain linen backdrop (--linen-100) behind 3:4 product photos while they load */
  tone?: 'linen' | 'product';
  /** thumb = 44–56px list thumbnail (search results, order history): smaller arch radius, no placeholder label. Set width on style. */
  size?: 'thumb';
  /** arch = rounded top (--radius-arch) · circle · soft = 8px frame for dense grids */
  shape?: 'arch' | 'circle' | 'soft';
  /** Striped linen placeholder when there is no src. Default true */
  placeholder?: boolean;
  /** Small monospace-style caption inside the placeholder, e.g. "Bouquet photo" */
  placeholderLabel?: React.ReactNode;
  /** 6px page-coloured border, for overlapping hero collages */
  ring?: boolean;
  /** Scale the image 1.04 on hover (480ms ease-out); off with reduced motion */
  zoomOnHover?: boolean;
  objectPosition?: string;
  /** Overlays (badges, buttons) positioned inside the frame */
  children?: React.ReactNode;
}
export declare function ArchFrame(props: ArchFrameProps): JSX.Element;
