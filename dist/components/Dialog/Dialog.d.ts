import * as React from 'react';
export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Buttons row, end-aligned */
  footer?: React.ReactNode;
  /** Position absolute inside nearest positioned parent (for previews). Inline dialogs don't move/trap focus or lock scroll. */
  inline?: boolean;
  closeLabel?: string;
  maxWidth?: number | string;
  /** CSS selector inside the dialog to focus on open. Default: first focusable in body/footer, else the close button. */
  initialFocus?: string;
  /** start = full-height sheet sliding in from the inline-start edge (mobile menu drawer); stays pinned to the viewport while open. Default center. */
  placement?: 'center' | 'start';
}
/** role="dialog", aria-modal, aria-labelledby → title; focus trapped, Esc closes, focus returns to the opener, page scroll locked (not for inline). */
export declare function Dialog(props: DialogProps): React.JSX.Element | null;
