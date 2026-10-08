import * as React from 'react';
export interface OrderTimelineStep { label: React.ReactNode; /** Pre-localized, e.g. "09:12" / "۰۹:۱۲" */ time?: React.ReactNode; }
export interface OrderTimelineProps {
  steps: OrderTimelineStep[];
  /** Index of the current step */
  current?: number;
  /** done = every step complete · cancelled renders nothing (show an Alert instead) */
  status?: 'active' | 'done' | 'cancelled';
  /** aria-label for the <ol> */
  label?: string;
  /** Visually hidden suffix on completed steps. Default "done" */
  doneLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}
/** <ol> with aria-current="step". Done: --text-body dot + check · current: --accent ring on --accent-soft · upcoming: --border-default / --text-muted. */
export declare function OrderTimeline(props: OrderTimelineProps): React.JSX.Element | null;
