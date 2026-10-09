// Delivery locations: loads the vendored Leaflet map on demand (the pin itself is the LocationPicker
// component), runs the saved-places maps, and formats a location.
// Map tiles and the starting view are set in store-config.js (VF_STORE.map).

function vfValidLocation(location) {
  return window.AG_COMMERCE.validLocation(location);
}

// Six decimals is about 10 cm: plenty for a front door, and keeps stored orders tidy.
function vfPinLocation(latlng) {
  return window.AG_COMMERCE.pinLocation(latlng);
}

function vfLocationText(location, fa) {
  if (!vfValidLocation(location)) return '';
  // Persian uses its own digits, decimal mark (٫) and comma (،); the pair stays isolated from the sentence.
  const num = v => (fa ? VF_FA_DIGITS(v.toFixed(5)).replace('.', '٫') : v.toFixed(5));
  return '\u2068' + num(location.lat) + (fa ? '، ' : ', ') + num(location.lng) + '\u2069';
}

// A route to the place in the visitor's own maps app (Google Maps opens natively on phones).
function vfDirectionsUrl(location) {
  return 'https://www.google.com/maps/dir/?api=1&destination=' + location.lat + ',' + location.lng;
}

// Loads Leaflet once (from templates/_vendor/leaflet) and resolves with window.L.
function vfLoadLeaflet() {
  if (window.L && window.L.map) return Promise.resolve(window.L);
  if (window.vfLeafletLoading) return window.vfLeafletLoading;
  const base = (window.VF_ASSET_BASE || '../../') + 'templates/_vendor/leaflet/';
  if (!document.getElementById('vf-leaflet-css')) {
    const link = document.createElement('link');
    link.id = 'vf-leaflet-css';
    link.rel = 'stylesheet';
    link.href = base + 'leaflet.css';
    document.head.appendChild(link);
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

function vfTileLayer(Leaflet) {
  return Leaflet.tileLayer(VF_STORE.map.tiles, {
    maxZoom: 19,
    attribution: VF_STORE.map.attribution
  });
}

// Leaflet sizes itself once; a map that opens inside an animating dialog or a resized column needs telling.
// The centre is restored without animation: back-to-back resizes interrupted Leaflet's animated pan and
// drifted the pin, and map.resizing lets moveend listeners tell a resize from the customer moving the map.
function vfWatchSize(map) {
  if (!window.ResizeObserver) return;
  const watcher = new ResizeObserver(() => {
    const centre = map.getCenter(),
      zoom = map.getZoom();
    map.resizing = true;
    try {
      map.invalidateSize({pan: false});
      map.setView(centre, zoom, {animate: false});
    } finally {
      map.resizing = false;
    }
  });
  watcher.observe(map.getContainer());
  map.on('unload', () => watcher.disconnect());
}

// A read-only map of saved places on the element #id. places() returns [{id, label, title, location, pick}];
// each pinned place gets a labelled, keyboard-reachable marker that calls pick.
function vfPlacesMap({id, places, onFail}) {
  let map = null,
    layer = null,
    pending = false,
    failed = false,
    dead = false,
    drawn = '';
  const draw = Leaflet => {
    const list = places().filter(p => vfValidLocation(p.location));
    const key = JSON.stringify(list.map(p => [p.id, p.label, p.title, p.location]));
    if (key === drawn) return;
    drawn = key;
    layer.clearLayers();
    list.forEach(p => {
      const icon = Leaflet.divIcon({
        className: 'vf-place-marker',
        html: '<span class="vf-place-marker__dot"></span>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      Leaflet.marker([p.location.lat, p.location.lng], {icon, title: p.title, keyboard: true})
        .bindTooltip(p.label, {
          permanent: true,
          direction: 'top',
          offset: [0, -12],
          className: 'vf-place-label'
        })
        .on('click', () => p.pick())
        // Leaflet gives markers role="button" but only clicks them with a pointer.
        .on('keydown', e => {
          if (e.originalEvent.key !== 'Enter' && e.originalEvent.key !== ' ') return;
          e.originalEvent.preventDefault();
          p.pick();
        })
        .addTo(layer);
    });
    if (list.length > 1)
      map.fitBounds(
        list.map(p => [p.location.lat, p.location.lng]),
        {padding: [48, 48], maxZoom: 15}
      );
    else if (list.length) map.setView([list[0].location.lat, list[0].location.lng], 15);
  };
  return {
    sync() {
      const box = document.getElementById(id);
      if (map && (!box || map.getContainer() !== box)) {
        map.remove();
        map = null;
        drawn = '';
      }
      if (map) return draw(window.L);
      if (!box || pending || failed || dead) return;
      pending = true;
      vfLoadLeaflet()
        .then(Leaflet => {
          pending = false;
          const el = document.getElementById(id);
          if (!el || map || dead) return;
          map = Leaflet.map(el, {
            center: VF_STORE.map.center,
            zoom: VF_STORE.map.zoom,
            scrollWheelZoom: false
          });
          vfTileLayer(Leaflet).addTo(map);
          vfWatchSize(map);
          layer = Leaflet.layerGroup().addTo(map);
          draw(Leaflet);
        })
        .catch(() => {
          pending = false;
          failed = true;
          if (!dead && onFail) onFail();
        });
    },
    remove() {
      dead = true;
      if (map) map.remove();
      map = null;
    }
  };
}
