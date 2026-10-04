export interface StepperStep { label: React.ReactNode; /** Pre-localized number, e.g. "۲" */ number?: string; }
export interface StepperProps {
  steps: StepperStep[];
  /** Index of the current step */
  current: number;
  /** Only completed steps are clickable */
  onStepClick?: (index: number) => void;
  /** e.g. n => n.toLocaleString('fa-IR') */
  formatNumber?: (n: number) => string;
  /** Screen-reader suffix for done steps, e.g. "(completed)" */
  doneLabel?: string;
  /** aria-label for the list */
  label?: string;
  /** Phones: show only the numbered circles (labels become screen-reader-only) plus a caption row underneath */
  compact?: boolean;
  /** Caption for compact mode. Receives the current step number and total already run through formatNumber, plus the current label.
   *  Default: (n,total,label) => `Step ${n} of ${total} · ${label}`. Persian: (n,t,l) => `مرحله ${n} از ${t} · ${l}` */
  captionFormat?: (currentNumber: string, total: string, label: React.ReactNode) => React.ReactNode;
  className?: string;
}
export declare function Stepper(props: StepperProps): JSX.Element;