import * as React from 'react';
import type {RootAttributes} from '../../utils/root-attributes.js';

export interface EmptyStateProps extends Omit<
  RootAttributes<HTMLDivElement>,
  'title' | 'children'
> {
  /** The outer element. */
  ref?: React.Ref<HTMLDivElement>;
  /** Lucide icon name, or any node (e.g. a spinner or "404") */
  icon?: string | React.ReactNode;
  /** Icon disc colour: neutral (sunken), accent (soft peony) or danger. */
  tone?: 'neutral' | 'accent' | 'danger';
  /** Small label above the title */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  /** Italic serif second beat on its own line, e.g. "running late." (upright in Persian) */
  titleAccent?: React.ReactNode;
  body?: React.ReactNode;
  /** Buttons */
  actions?: React.ReactNode;
  headingLevel?: 1 | 2 | 3;
  className?: string;
  style?: React.CSSProperties;
}
export declare function EmptyState(props: EmptyStateProps): React.JSX.Element;
