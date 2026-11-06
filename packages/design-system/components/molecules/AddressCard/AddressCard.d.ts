export interface AddressCardLabels {
  /** "Edit {name}" */ edit?: string;
  /** "Delete {name}" */ delete?: string;
  default?: string;
  makeDefault?: string;
}
export interface AddressCardProps {
  /** e.g. "Home" — also used in the IconButton names */
  label: string;
  line: React.ReactNode;
  recipient?: React.ReactNode;
  /** Rendered dir="ltr" */
  phone?: string;
  zone?: React.ReactNode;
  isDefault?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onMakeDefault?: () => void;
  labels?: AddressCardLabels;
  className?: string;
  style?: React.CSSProperties;
}
export declare function AddressCard(props: AddressCardProps): JSX.Element;
