import * as React from 'react';
export interface AccordionItem { id: string; title: React.ReactNode; /** Plain strings keep line breaks (pre-line) */ content: React.ReactNode; }
export interface AccordionProps {
  items: AccordionItem[];
  /** Controlled: id (or ids with allowMultiple) of open items */
  openId?: string | string[] | null;
  defaultOpenId?: string | string[];
  onToggle?: (id: string, open: boolean, openIds: string[]) => void;
  allowMultiple?: boolean;
  /** Heading level wrapping each button. Default 3 */
  headingLevel?: 2 | 3 | 4;
  className?: string;
}
export declare function Accordion(props: AccordionProps): React.JSX.Element;