export interface SpinnerProps {
  /** Diameter in px. Default 20 */
  size?: number;
  /** What is loading, announced politely. Default: "Loading" in the current language */
  label?: string;
  /** Hide it from screen readers; something else announces the wait (Button's loadingLabel) */
  decorative?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
/** A spinning ring for a wait of unknown length: a polite status unless `decorative`. */
export declare function Spinner(props: SpinnerProps): JSX.Element;
