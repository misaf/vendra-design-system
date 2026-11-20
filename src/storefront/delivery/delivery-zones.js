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
