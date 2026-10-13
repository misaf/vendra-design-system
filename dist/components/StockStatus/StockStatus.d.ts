import * as React from 'react';
import type {Stock} from '../utils/commerce.js';

export interface StockStatusProps {
  /** commerce.stockStatus(product): in, low (with count), soon (with ISO date or null) or out */
  stock: Stock;
  /** Render nothing for a product in stock, as product cards do */
  hideInStock?: boolean;
  /** sm for product cards. Default md */
  size?: 'sm' | 'md';
  className?: string;
  style?: React.CSSProperties;
}
/** A product's availability: an icon in the status colour and a short line in the page's language. */
export declare function StockStatus(props: StockStatusProps): React.JSX.Element | null;
