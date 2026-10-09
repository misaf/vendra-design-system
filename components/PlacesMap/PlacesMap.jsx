import React from 'react';
import {commerce} from '../utils/commerce.js';
import {cx} from '../utils/cx.js';
import {maps} from '../utils/maps.js';

// A map of places to look at, not to choose: the studio on the contact page, saved addresses in the
// account. Each place has a labelled marker that opens it (onSelect) with a pointer or with Enter and
// Space; the view fits every place. Leaflet comes from `loadLeaflet()` and is only created in the
// browser, so the component renders on the server.
export function PlacesMap({
  id,
  label,
  places = [],
  loadLeaflet,
  tiles,
  center,
  zoom = 13,
  height = 280,
  onFail,
  className,
  style
}) {
  const box = React.useRef(null);
  const view = React.useRef(null);
  // The latest places, for marker listeners Leaflet keeps from an earlier render.
  const latest = React.useRef(places);
  latest.current = places;
  const pinned = places.filter(place => commerce.validLocation(place.location));
  const key = JSON.stringify(
    pinned.map(place => [place.id, place.label, place.title, place.location])
  );

  const draw = () => {
    const current = view.current;
    if (!current) return;
    const {Leaflet, map, layer} = current;
    layer.clearLayers();
    const shown = latest.current.filter(place => commerce.validLocation(place.location));
    shown.forEach(place => {
      const select = () => {
        const now = latest.current.find(item => item.id === place.id);
        now && now.onSelect && now.onSelect();
      };
      const icon = Leaflet.divIcon({
        className: 'ag-place-marker',
        html: '<span class="ag-place-marker__dot"></span>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      Leaflet.marker([place.location.lat, place.location.lng], {
        icon,
        title: place.title,
        keyboard: true
      })
        .bindTooltip(place.label, {
          permanent: true,
          direction: 'top',
          offset: [0, -12],
          className: 'ag-place-label'
        })
        .on('click', select)
        // Leaflet gives markers role="button" but only clicks them with a pointer.
        .on('keydown', event => {
          if (event.originalEvent.key !== 'Enter' && event.originalEvent.key !== ' ') return;
          event.originalEvent.preventDefault();
          select();
        })
        .addTo(layer);
    });
    if (shown.length > 1)
      map.fitBounds(
        shown.map(place => [place.location.lat, place.location.lng]),
        {padding: [48, 48], maxZoom: 15}
      );
    else if (shown.length) map.setView([shown[0].location.lat, shown[0].location.lng], 15);
  };

  React.useEffect(() => {
    let alive = true;
    Promise.resolve()
      .then(() => loadLeaflet())
      .then(Leaflet => {
        if (!alive || !box.current) return;
        const {map, stop} = maps.create(Leaflet, box.current, {center, zoom, tiles});
        view.current = {Leaflet, map, stop, layer: Leaflet.layerGroup().addTo(map)};
        draw();
      })
      .catch(() => {
        if (alive && onFail) onFail();
      });
    return () => {
      alive = false;
      if (view.current) {
        view.current.stop();
        view.current.map.remove();
      }
      view.current = null;
    };
  }, []);

  // New, moved or renamed places redraw the markers.
  React.useEffect(draw, [key]);

  return (
    <div
      className={cx('ag-map', className)}
      style={{blockSize: typeof height === 'number' ? height + 'px' : height, ...style}}
    >
      <div
        id={id}
        ref={box}
        dir="ltr"
        role="region"
        aria-label={label}
        className="ag-map__canvas"
      />
    </div>
  );
}
