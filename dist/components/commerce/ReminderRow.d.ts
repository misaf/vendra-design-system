import * as React from 'react';
export interface ReminderRowLabels { paused?: string; sendFlowers?: string; /** Switch aria-label, "Reminder for {name}" */ reminderFor?: string; edit?: string; delete?: string; }
export interface ReminderRowProps {
  name: string;
  /** Pre-localized day number (Persian digits for fa) */
  day: React.ReactNode;
  /** Month name in the reminder's calendar */
  month: React.ReactNode;
  occasion: React.ReactNode;
  /** Lucide icon for the occasion */
  occasionIcon?: string;
  /** e.g. "3 days before" */
  before?: React.ReactNode;
  channel?: 'sms' | 'wa';
  /** The same day in the other calendar, shown in brackets */
  altDate?: React.ReactNode;
  /** Badge text, e.g. "in 3 days" */
  when?: React.ReactNode;
  /** ≤ 7 days away: accent badge + "Send flowers" link */
  soon?: boolean;
  /** Off = paused: tile dimmed to 60% and a Paused badge */
  on?: boolean;
  onToggle?: (on: boolean) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  /** "Send flowers" is an <a href> */
  sendHref?: string;
  sendOnClick?: (e: React.MouseEvent) => void;
  labels?: ReminderRowLabels;
  className?: string;
  style?: React.CSSProperties;
}
export declare function ReminderRow(props: ReminderRowProps): React.JSX.Element;
