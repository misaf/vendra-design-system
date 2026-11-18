import type {RootAttributes} from '../../utils/root-attributes.js';

export interface AnnouncementBarProps extends RootAttributes<HTMLDivElement> {
  /** The outer element. */
  ref?: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  /** aria-label for the region, e.g. "Announcement" */
  label: string;
  className?: string;
}
export declare function AnnouncementBar(props: AnnouncementBarProps): React.JSX.Element;
