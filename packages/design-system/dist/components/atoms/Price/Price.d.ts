import * as React from 'react';
export interface PriceProps {
  /** The price to pay, formatted by the app: format.money(n, {currency, lang, currencies}) */
  value: React.ReactNode;
  /** The price before a reduction, formatted the same way; struck through, read as "Was …" */
  compareAt?: React.ReactNode;
  /** sm, md (1rem) or lg (the product page). Default: the surrounding font size */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}
/** A price, with the earlier price struck through when it is reduced. */
export declare function Price(props: PriceProps): React.JSX.Element;
