// The map fixtures' loadLeaflet: Leaflet from templates/_vendor/leaflet, its stylesheet in the
// package's components layer, as the storefront loads it (templates/_shared/location.js).
const base = '/templates/_vendor/leaflet/';
let loading = null;

export function loadLeaflet() {
  if (window.L && window.L.map) return Promise.resolve(window.L);
  if (loading) return loading;
  const style = document.createElement('style');
  style.textContent = "@import url('" + base + "leaflet.css') layer(vendra.components);";
  document.head.appendChild(style);
  loading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = base + 'leaflet.js';
    script.onload = () => resolve(window.L);
    script.onerror = () => reject(new Error('Leaflet failed to load'));
    document.head.appendChild(script);
  });
  return loading;
}

// OpenStreetMap's URL; the specs serve a blank tile for it (stubMapTiles), so runs stay offline.
export const TILES = {
  url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '© OpenStreetMap'
};
