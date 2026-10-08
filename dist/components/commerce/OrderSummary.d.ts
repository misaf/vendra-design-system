import * as React from 'react';
export interface OrderSummaryLine {
  name: React.ReactNode;
  /** Renders the name as <a href> */
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  image?: string;
  /** e.g. "Generous · × 1" */
  meta?: React.ReactNode;
  /** Card message — italic in EN, upright in FA */
  note?: React.ReactNode;
  /** Pre-formatted line total */
  total?: React.ReactNode;
}
export interface OrderSummarySum { label: React.ReactNode; value: React.ReactNode; /** Grand total row */ strong?: boolean; }
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
export declare function OrderSummary(props: OrderSummaryProps): React.JSX.Element;
