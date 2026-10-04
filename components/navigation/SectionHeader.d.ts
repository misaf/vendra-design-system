export interface SectionHeaderProps {
  title: React.ReactNode;
  /** Italic serif word after the title (upright in Persian) */
  accent?: React.ReactNode;
  eyebrow?: React.ReactNode;
  level?: 'h1' | 'h2' | 'h3';
  /** Slot at the end of the row, e.g. <Button variant="ghost" size="sm" iconEnd="arrow-right">See all</Button> */
  action?: React.ReactNode;
  /** Setting either shows outline chevron IconButtons (mirrored in RTL) */
  onPrev?: () => void;
  onNext?: () => void;
  /** false disables that arrow — wire to SnapScroller's onScrollStateChange */
  canPrev?: boolean;
  canNext?: boolean;
  prevLabel?: string;
  nextLabel?: string;
  /** id on the heading, for aria-labelledby */
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function SectionHeader(props: SectionHeaderProps): JSX.Element;
