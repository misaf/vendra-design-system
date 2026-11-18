import * as React from 'react';
import type {RootAttributes} from '../../utils/root-attributes.js';

export interface TrustSealProps extends Omit<RootAttributes<HTMLAnchorElement>, 'children'> {
  /** The link. */
  ref?: React.Ref<HTMLAnchorElement>;
  /** Which seal: its name comes from messages (eNamad, Samandehi) unless `label` is given */
  kind: 'enamad' | 'samandehi' | (string & {});
  /** The seal's verification link, as the issuer's panel gives it */
  href: string;
  /** The seal's image URL, as the issuer's panel gives it; without one the seal's name shows */
  image?: string | null;
  /** Accessible name and fallback text. Default from messages by `kind` */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}
/** An eNamad or Samandehi trust seal that links to its verification page. */
export declare function TrustSeal(props: TrustSealProps): React.JSX.Element;
