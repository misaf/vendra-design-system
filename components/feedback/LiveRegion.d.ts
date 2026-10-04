export interface LiveRegionProps {
  /** Message to announce. Change it to announce again; clear it (then set) to repeat the same text. */
  children?: React.ReactNode;
  /** polite (default) waits for the reader to finish; assertive interrupts — failures only */
  politeness?: 'polite' | 'assertive';
  atomic?: boolean;
  id?: string;
  className?: string;
}
/** Visually hidden (.ag-sr-only) status region for screen changes, "Added to bag", filter counts. Mount it once on page load. */
export declare function LiveRegion(props: LiveRegionProps): JSX.Element;
