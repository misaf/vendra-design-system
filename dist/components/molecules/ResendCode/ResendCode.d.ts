import * as React from 'react';
export interface ResendCodeProps {
  /** The wait before another code can be asked for, in seconds; it starts when the component mounts. Default 60 */
  seconds?: number;
  /** Send the code again; the wait starts over. */
  onResend?: () => void;
  /** The button's text. Default: "Send a new code" in the page language */
  resendLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}
/** "Send a new code" after a wait that runs on the clock, with the time left in the page's digits. */
export declare function ResendCode(props: ResendCodeProps): React.JSX.Element;
