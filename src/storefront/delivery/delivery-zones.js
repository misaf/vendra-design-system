import {VF_STORE} from '../store/store-config.js';
import {validLocation} from '../../design-system/utils/coordinates.js';

// Links that show a place in Neshan, Balad and Google Maps, each opening the installed app on
// phones where the link allows it. Persian visitors mostly drive with Neshan and Balad, so they
// come first in Persian; Google Maps comes first otherwise. [] for a missing or invalid point.
// Neshan: its own point link (github.com/NeshanMaps/Neshan-MCP, utils/deeplinks.py). Balad: the
// web app's /location page, which reads latitude, longitude and zoom.
export const directionsLinks = (location, language) => {
  if (!validLocation(location)) return [];
  const {lat, lng} = location;
  const links = {
    neshan: 'https://nshn.ir/?lat=' + lat + '&lng=' + lng,
    balad: 'https://balad.ir/location?latitude=' + lat + '&longitude=' + lng + '&zoom=17',
    google: 'https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng
  };
  const order = language === 'fa' ? ['neshan', 'balad', 'google'] : ['google', 'neshan', 'balad'];
  return order.map(app => ({app, href: links[app]}));
};

export const distanceKm = (a, b) => {
  const rad = Math.PI / 180,
    dLat = (b.lat - a.lat) * rad,
    dLng = (b.lng - a.lng) * rad;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
};

// The smallest zone that reaches a pin, measured from the zone's center or `origin` (the studio);
// null when the pin is outside every zone. Zones are {id, km, center?}.
export const zoneAt = (location, zones, origin) => {
  if (!validLocation(location)) return null;
  const reach = zones.filter(zone => distanceKm(zone.center || origin, location) <= zone.km);
  return reach.length ? reach.reduce((a, b) => (b.km < a.km ? b : a)).id : null;
};

// A storefront zone from an API DeliveryZone; `extras` by zone id: {key, cutoff, center}.
export const zoneFromApi = (zone, extras = {}) => {
  const extra = extras[zone.id] || {};
  return {
    id: extra.key || String(zone.id),
    apiId: zone.id,
    fee: zone.feeAmount,
    cutoff: extra.cutoff || '00:00',
    km: zone.maxDistanceKm,
    ...(extra.center ? {center: extra.center} : {}),
    en: zone.name.en,
    fa: zone.name.fa
  };
};

// Sample DeliveryZone responses. Distances are measured from the studio unless a zone sets its own center.
// GET /api/delivery/zones
export const VF_API_DELIVERY_ZONES = [
  {
    id: 1,
    name: {en: 'Karaj central', fa: 'مرکز کرج'},
    description: null,
    maxDistanceKm: 5,
    currencyCode: 'IRT',
    feeAmount: 80_000,
    requiresQuote: false,
    position: 1
  },
  {
    id: 2,
    name: {en: 'Karaj outer', fa: 'حومه کرج'},
    description: null,
    maxDistanceKm: 12,
    currencyCode: 'IRT',
    feeAmount: 120_000,
    requiresQuote: false,
    position: 2
  },
  {
    id: 3,
    name: {en: 'Alborz province', fa: 'استان البرز'},
    description: null,
    maxDistanceKm: 60,
    currencyCode: 'IRT',
    feeAmount: 180_000,
    requiresQuote: false,
    position: 3
  },
  {
    id: 4,
    name: {en: 'Tehran', fa: 'تهران'},
    description: null,
    maxDistanceKm: 25,
    currencyCode: 'IRT',
    feeAmount: 250_000,
    requiresQuote: false,
    position: 4
  }
];

// Zone fields the API doesn't provide yet (docs/API.md, "Zone rules"), keyed by DeliveryZone.id:
// the storefront's key for the zone, its same-day cut-off and, when it isn't the studio, the point its
// distance is measured from.
export const VF_DELIVERY_ZONE_EXTRAS = {
  1: {key: 'central', cutoff: '18:00'},
  2: {key: 'outer', cutoff: '16:00'},
  3: {key: 'alborz', cutoff: '14:00'},
  4: {key: 'tehran', cutoff: '12:00', center: {lat: 35.6961, lng: 51.4231}}
};

// The storefront's zone object from an API DeliveryZone plus its extras.
export function vfZoneFromApi(zone, extras = VF_DELIVERY_ZONE_EXTRAS) {
  return zoneFromApi(zone, extras);
}

export const VF_ZONES = [...VF_API_DELIVERY_ZONES]
  .sort((a, b) => a.position - b.position)
  .map(zone => vfZoneFromApi(zone));

export function vfZone(id) {
  return VF_ZONES.find(zone => zone.id === id) || VF_ZONES[0];
}

// The zone id for a delivery pin, or null when the pin is outside every zone.
export function vfZoneAt(location) {
  return zoneAt(location, VF_ZONES, VF_STORE.studio);
}
