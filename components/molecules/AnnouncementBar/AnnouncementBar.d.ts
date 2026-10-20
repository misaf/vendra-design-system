export interface AnnouncementBarProps {
  children: React.ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  /** aria-label for the region, e.g. "Announcement" */
  label: string;
  className?: string;
}
export declare function AnnouncementBar(props: AnnouncementBarProps): JSX.Element;
