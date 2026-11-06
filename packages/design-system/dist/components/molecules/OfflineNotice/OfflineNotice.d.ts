import * as React from 'react';
export interface OfflineNoticeProps {
  /** Default: built-in "You’re offline. …" in the page's language */
  offlineText?: string;
  /** Default: built-in "You’re back online." */
  onlineText?: string;
  /** How long "back online" stays, in ms. Default 4000 */
  backFor?: number;
  className?: string;
  style?: React.CSSProperties;
}
/** A slim band while the browser is offline, then "back online" for a few seconds. Put it once, under the header. */
export declare function OfflineNotice(props: OfflineNoticeProps): React.JSX.Element;
