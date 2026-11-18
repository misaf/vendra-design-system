import * as React from 'react';
import type {RootAttributes} from '../../utils/root-attributes.js';

export interface AnnouncementBarProps extends RootAttributes<HTMLDivElement> {
  /** The outer element. */
  ref?: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  /** Accessible name for the region. Falls back to aria-label when omitted. */
  label?: string;
  className?: string;
}
export declare function AnnouncementBar(props: AnnouncementBarProps): React.JSX.Element;
