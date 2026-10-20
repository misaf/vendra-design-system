import * as React from 'react';
import type {Photo} from '../../atoms/Picture/Picture.js';

export interface LightboxItem {
  /** A stable key for the item, e.g. the product code */
  id: string | number;
  /** Its photos (see Picture); dots move between them when there are several */
  images: Photo[];
  /** Shown under the photo: the code, the kind, the price… */
  caption?: React.ReactNode;
}
export interface LightboxProps {
  items: LightboxItem[];
  /** The item on screen; null (or out of range) keeps the viewer closed */
  index: number | null;
  /** Previous/next, an arrow key or a swipe asked for this item */
  onIndexChange?: (index: number) => void;
  /** Esc or × */
  onClose?: () => void;
  /** The dialog's accessible name. Default: "Photo viewer" in the page's language */
  label?: string;
  previousLabel?: string;
  nextLabel?: string;
  closeLabel?: string;
  /** Buttons beside the caption, or a function of the item on screen and its index */
  actions?: React.ReactNode | ((item: LightboxItem, index: number) => React.ReactNode);
  /** Applied when a photo has candidates. Default '100vw' */
  sizes?: string;
  className?: string;
}
/** A full-screen React Aria modal showing one item's photo at a time: ←/→, swipe and previous/next move through the items (mirrored in RTL), Esc closes, focus returns to the opener. */
export declare function Lightbox(props: LightboxProps): React.JSX.Element;
