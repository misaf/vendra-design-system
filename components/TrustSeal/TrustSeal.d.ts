export interface TrustSealProps {
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
export declare function TrustSeal(props: TrustSealProps): JSX.Element;
