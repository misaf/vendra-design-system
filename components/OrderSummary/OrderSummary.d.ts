import type {Photo} from '../atoms/Picture/Picture.js';

export interface OrderSummaryLine {
  name: React.ReactNode;
  /** Renders the name as <a href> */
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  /** A URL or a photo object (see Picture), shown as a thumbnail */
  image?: Photo;
  /** e.g. "Generous · × 1" */
  meta?: React.ReactNode;
  /** Card message — italic in EN, upright in FA */
  note?: React.ReactNode;
  /** The line total, formatted by the app (format.money); shown as a Price */
  total?: React.ReactNode;
}
export interface OrderSummarySum {
  label: React.ReactNode;
  /** The amount, formatted by the app; shown as a Price (a discount row's "−…" too) */
  value: React.ReactNode;
  /** Grand total row */ strong?: boolean;
}
export interface OrderSummaryProps {
  lines: OrderSummaryLine[];
  sums?: OrderSummarySum[];
  title?: React.ReactNode;
  /** Heading element for the title. Default h2 */
  titleAs?: 'h2' | 'h3' | 'div';
  className?: string;
  style?: React.CSSProperties;
}
/** <ul> of lines (48px ArchFrame thumb, size="thumb", tone="product") then a <dl> of totals. */
export declare function OrderSummary(props: OrderSummaryProps): JSX.Element;
