export interface SnapScrollerState {
  canPrev: boolean;
  canNext: boolean;
}
export interface SnapScrollerHandle {
  /** Scroll ~one view toward the reading start / end (RTL-aware) */
  scrollPrev(): void;
  scrollNext(): void;
  readonly element: HTMLDivElement | null;
  readonly state: SnapScrollerState;
}
export interface SnapScrollerProps {
  /** Each item becomes its own snap slot. Fragments, nested arrays and elements with data-snap-group are flattened first. */
  children?: React.ReactNode;
  /** Alternative to children: data array rendered with renderItem (keyed by item.id when present) */
  items?: any[];
  renderItem?: (item: any, i: number) => React.ReactNode;
  /** wrap (default) = each item in .ag-carousel__item · contents = no wrappers; every direct child of the track is a snap item */
  itemAs?: 'wrap' | 'contents';
  /** Minimum item width on desktop. Default "200px" (ignored on mobile) */
  itemMin?: string;
  /** Items visible on desktop. Default 5 */
  perView?: number;
  /** Items visible under 768px. Default 2.3 (a peek of the next one) */
  perViewMobile?: number;
  /** Default "16px" */
  gap?: string;
  /** aria-label for the scroll region (keyboard focusable) */
  label: string;
  /** Built-in outline chevrons above the row; or drive SectionHeader's arrows instead */
  arrows?: boolean;
  prevLabel?: string;
  nextLabel?: string;
  /** Called when canPrev / canNext change */
  onScrollStateChange?: (s: SnapScrollerState) => void;
  /** Bleed past the page edge into the 16px mobile gutter. Default true */
  bleed?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export declare const Carousel: React.ForwardRefExoticComponent<
  SnapScrollerProps & React.RefAttributes<SnapScrollerHandle>
>;
