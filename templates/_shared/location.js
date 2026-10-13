// Delivery locations: loads the vendored Leaflet on demand for the LocationPicker and PlacesMap
// components, and formats a location.
// Map tiles and the starting view are set in store-config.js (VF_STORE.map).
import {VF_FA_DIGITS} from './formatting.js';
import {commerce} from '../../components/utils/commerce.js';

export function vfValidLocation(location) {
  return commerce.validLocation(location);
}

// Six decimals is about 10 cm: plenty for a front door, and keeps stored orders tidy.
export function vfPinLocation(latlng) {
  return commerce.pinLocation(latlng);
}

export function vfLocationText(location, fa) {
  if (!vfValidLocation(location)) return '';
  // Persian uses its own digits, decimal mark (٫) and comma (،); the pair stays isolated from the sentence.
  const num = v => (fa ? VF_FA_DIGITS(v.toFixed(5)).replace('.', '٫') : v.toFixed(5));
  return '\u2068' + num(location.lat) + (fa ? '، ' : ', ') + num(location.lng) + '\u2069';
}

// A route to the place in the visitor's own maps app (Google Maps opens natively on phones).
export function vfDirectionsUrl(location) {
  return 'https://www.google.com/maps/dir/?api=1&destination=' + location.lat + ',' + location.lng;
}

// Loads Leaflet once (from templates/_vendor/leaflet) and resolves with window.L.
export function vfLoadLeaflet() {
  if (window.L && window.L.map) return Promise.resolve(window.L);
  if (window.vfLeafletLoading) return window.vfLeafletLoading;
  const base = (window.VF_ASSET_BASE || '../../') + 'templates/_vendor/leaflet/';
  // Leaflet's stylesheet goes in the package's vendra.components layer, with the components that
  // restyle it (PlacesMap, LocationPicker); unlayered, it would override them outright.
  if (!document.getElementById('vf-leaflet-css')) {
    const style = document.createElement('style');
    style.id = 'vf-leaflet-css';
    style.textContent = "@import url('" + base + "leaflet.css') layer(vendra.components);";
    document.head.appendChild(style);
  }
  window.vfLeafletLoading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = base + 'leaflet.js';
    script.onload = () => resolve(window.L);
    script.onerror = () => {
      window.vfLeafletLoading = null;
      reject(new Error('Leaflet failed to load'));
    };
    document.head.appendChild(script);
  });
  return window.vfLeafletLoading;
}
