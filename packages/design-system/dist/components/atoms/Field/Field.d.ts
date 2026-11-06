import * as React from 'react';
export interface UseFieldOptions {
  /** The control's id; generated when omitted. */
  id?: string;
  hint?: React.ReactNode;
  /** Replaces the hint and marks the control invalid. */
  error?: React.ReactNode;
  /** Extra ids for aria-describedby, after the message. */
  describedBy?: string;
}
export interface FieldState {
  fieldId: string;
  /** Id of the hint/error element. */
  messageId: string;
  /** The error, or the hint when there is no error. */
  message: React.ReactNode;
  /** aria-invalid, aria-describedby and aria-errormessage for the control. */
  controlProps: {
    'aria-invalid'?: true;
    'aria-describedby'?: string;
    'aria-errormessage'?: string;
  };
}
/** Ids and ARIA wiring shared by every form control. */
export declare function useField(options: UseFieldOptions): FieldState;
export interface FieldMessageProps {
  id: string;
  /** Styles the message as an error. */
  error?: boolean;
  children?: React.ReactNode;
}
/** The hint or error under a control; renders nothing without children. */
export declare function FieldMessage(props: FieldMessageProps): React.JSX.Element | null;
