// Delivery coordinates and map directions.
import {VF_FA_DIGITS} from '../pricing/formatting.js';
import {validLocation, pinLocation} from '../../design-system/utils/coordinates.js';
import {directionsLinks} from './delivery-zones.js';
import {VF_MAPS_APPS} from './location-messages.js';

export function vfValidLocation(location) {
  return validLocation(location);
}

// Six decimals is about 10 cm: plenty for a front door, and keeps stored orders tidy.
export function vfPinLocation(latlng) {
  return pinLocation(latlng);
}

export function vfLocationText(location, fa) {
  if (!vfValidLocation(location)) return '';
  // Persian uses its own digits, decimal mark (٫) and comma (،); the pair stays isolated from the sentence.
  const coordinate = v => (fa ? VF_FA_DIGITS(v.toFixed(5)).replace('.', '٫') : v.toFixed(5));
  return (
    '\u2068' + coordinate(location.lat) + (fa ? '، ' : ', ') + coordinate(location.lng) + '\u2069'
  );
}

// The place in Neshan, Balad and Google Maps (each opens its app on phones where it can), named in
// the page's language and ordered for it: Neshan and Balad first in Persian. [] without a valid point.
export function vfDirections(location, lang) {
  const names = VF_MAPS_APPS[lang] || VF_MAPS_APPS.en;
  return directionsLinks(location, lang).map(({app, href}) => ({
    app,
    label: names[app],
    href
  }));
}
