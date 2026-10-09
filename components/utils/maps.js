// Leaflet set-up shared by LocationPicker and PlacesMap: import { maps }. Apps rarely need it directly.

// A Leaflet map on `element` with the store's tiles. The wheel doesn't zoom it (the page scrolls past),
// and it keeps its centre when its box changes size: Leaflet sizes itself once, so a map inside an
// opening dialog or a resized column needs telling. `map.resizing` is true during that adjustment,
// so moveend listeners can tell it from the customer moving the map. Call stop() before map.remove().
const create = (Leaflet, element, {center, zoom, tiles}) => {
  const map = Leaflet.map(element, {center, zoom, scrollWheelZoom: false});
  Leaflet.tileLayer(tiles.url, {
    maxZoom: tiles.maxZoom || 19,
    attribution: tiles.attribution
  }).addTo(map);
  let watcher = null;
  if (typeof ResizeObserver !== 'undefined') {
    watcher = new ResizeObserver(() => {
      const middle = map.getCenter(),
        level = map.getZoom();
      map.resizing = true;
      try {
        map.invalidateSize({pan: false});
        map.setView(middle, level, {animate: false});
      } finally {
        map.resizing = false;
      }
    });
    watcher.observe(element);
  }
  return {map, stop: () => watcher && watcher.disconnect()};
};

export const maps = {create};
