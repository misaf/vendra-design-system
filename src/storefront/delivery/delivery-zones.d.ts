import type {LatLng} from '../../design-system/utils/coordinates.js';
import type {ApiRecord} from '../catalog/product-api.js';

export type DirectionsApp = 'neshan' | 'balad' | 'google';

/** A delivery zone as the storefront uses it (see zoneFromApi). */
export interface Zone {
  /** The storefront's key, e.g. 'central'. */
  id: string;
  apiId?: number;
  /** Delivery fee in Toman. */
  fee: number;
  /** Same-day cut-off, "18:00". */
  cutoff: string;
  /** Reach in km from `center`, or from the studio. */
  km: number;
  center?: LatLng;
  en: string;
  fa: string;
}

/** Neshan, Balad and Google Maps links to the place: Neshan and Balad first in Persian, Google
 * Maps first otherwise. [] for a missing or invalid point. */
export declare function directionsLinks(
  location: LatLng | null | undefined,
  language: string
): {app: DirectionsApp; href: string}[];

export declare function distanceKm(a: LatLng, b: LatLng): number;

/** The smallest zone reaching the pin, from its center or `origin`; null outside every zone. */
export declare function zoneAt(
  location: LatLng | null,
  zones: Pick<Zone, 'id' | 'km' | 'center'>[],
  origin: LatLng
): string | null;

/** A storefront zone from an API DeliveryZone, with `extras` by zone id. */
export declare function zoneFromApi(
  zone: ApiRecord,
  extras?: Record<number, {key?: string; cutoff?: string; center?: LatLng}>
): Zone;

export declare const VF_API_DELIVERY_ZONES: ApiRecord[];
export declare const VF_DELIVERY_ZONE_EXTRAS: Record<
  number,
  {key: string; cutoff: string; center?: LatLng}
>;
export declare const VF_ZONES: Zone[];
export declare function vfZoneFromApi(
  zone: ApiRecord,
  extras?: typeof VF_DELIVERY_ZONE_EXTRAS
): Zone;
export declare function vfZone(id: string): Zone;
export declare function vfZoneAt(location: LatLng | null): string | null;
