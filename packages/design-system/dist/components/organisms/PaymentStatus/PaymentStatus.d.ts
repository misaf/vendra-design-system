import * as React from 'react';
export type PaymentState =
  'redirecting' | 'verifying' | 'paid' | 'cancelled' | 'failed' | 'pending';

export interface PaymentStatusProps {
  status: PaymentState;
  /** Formatted by the app: format.money(total, {currency, lang, currencies}) */
  amount?: React.ReactNode;
  /** The store's order number, e.g. "VN-10522" */
  orderNumber?: string;
  /** The bank's tracking code (RRN / reference) once it has one */
  reference?: string;
  /** The gateway's name in the page language, e.g. "Zarinpal"; default "the bank" */
  gateway?: string;
  /** redirecting: where the gateway expects the browser, as the backend gives it. POST sends `fields` as a form. */
  redirect?: {url: string; method?: 'GET' | 'POST'; fields?: Record<string, string>};
  /** Milliseconds before redirecting submits by itself; null waits for the button. Default 1500 */
  redirectDelay?: number | null;
  /** failed / cancelled: "Pay again" */
  onRetry?: () => void;
  /** failed / cancelled: "Choose another method" */
  onOtherMethod?: () => void;
  /** pending: "Check again" asks the store to verify once more */
  onCheckAgain?: () => void;
  /** pending / failed: "Call us", e.g. "tel:+989121234567" */
  supportHref?: string;
  /** Default 2 */
  headingLevel?: 1 | 2 | 3 | 4;
  /** More actions after the built-in ones */
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
/** The handoff to a bank gateway and back: redirecting, verifying, paid, cancelled, failed, or pending (don't pay twice). */
export declare function PaymentStatus(props: PaymentStatusProps): React.JSX.Element;
