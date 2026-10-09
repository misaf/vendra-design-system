import React from 'react';
import {Button} from '../Button/Button.jsx';
import {Icon} from '../Icon/Icon.jsx';
import {commerce} from '../utils/commerce.js';
import {cx} from '../utils/cx.js';
import {maps} from '../utils/maps.js';

// A delivery pin: the pin stays at the map's centre, and wherever the map stops is the chosen point.
// Customers drag or tap the map, or press the arrow keys once it has focus, or use their own location.
// Leaflet comes from `loadLeaflet()` (the app decides how to load it) and is only created in the
// browser, so the component renders on the server. When it can't load, `onFail` lets the page offer
// a typed address instead.
export function LocationPicker({
  id,
  label,
  status,
  error,
  value,
  onChange,
  loadLeaflet,
  tiles,
  center,
  zoom = 13,
  pinZoom = 17,
  locateLabel,
  onLocateError,
  onReady,
  onFail,
  compact = false,
  className,
  style
}) {
  const box = React.useRef(null);
  const map = React.useRef(null);
  const [locating, setLocating] = React.useState(false);
  // The latest callbacks and value, for listeners Leaflet keeps from the first render.
  const latest = React.useRef({});
  latest.current = {value, onChange, onReady, onFail};

  React.useEffect(() => {
    let alive = true,
      stopWatching = null;
    Promise.resolve()
      .then(() => loadLeaflet())
      .then(Leaflet => {
        if (!alive || !box.current) return;
        const at = latest.current.value;
        const pinned = commerce.validLocation(at);
        const {map: created, stop} = maps.create(Leaflet, box.current, {
          center: pinned ? [at.lat, at.lng] : center,
          zoom: pinned ? pinZoom : zoom,
          tiles
        });
        created.on('moveend', () => {
          if (!created.resizing) latest.current.onChange(commerce.pinLocation(created.getCenter()));
        });
        created.on('click', event => created.panTo(event.latlng));
        stopWatching = stop;
        map.current = created;
        latest.current.onReady && latest.current.onReady();
      })
      .catch(() => {
        if (alive && latest.current.onFail) latest.current.onFail();
      });
    return () => {
      alive = false;
      if (stopWatching) stopWatching();
      if (map.current) map.current.remove();
      map.current = null;
    };
  }, []);

  // A point chosen elsewhere (a saved address, the customer's location) moves the map to it.
  React.useEffect(() => {
    const current = map.current;
    if (!current || !commerce.validLocation(value)) return;
    const here = commerce.pinLocation(current.getCenter());
    if (here.lat !== value.lat || here.lng !== value.lng)
      current.setView([value.lat, value.lng], pinZoom);
  }, [value && value.lat, value && value.lng]);

  const locate = () => {
    if (!navigator.geolocation) return onLocateError && onLocateError();
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocating(false);
        const here = commerce.pinLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        if (map.current) map.current.setView([here.lat, here.lng], pinZoom);
        else onChange(here);
      },
      () => {
        setLocating(false);
        onLocateError && onLocateError();
      },
      {enableHighAccuracy: true, timeout: 10000}
    );
  };

  return (
    <div className={cx('ag-location', compact && 'ag-location--compact', className)} style={style}>
      <span id={id + '-label'} className="ag-field__label">
        {label}
      </span>
      <div className="ag-map ag-location__map">
        <div
          id={id}
          ref={box}
          dir="ltr"
          role="region"
          aria-labelledby={id + '-label'}
          aria-describedby={cx(id + '-status', error && id + '-error')}
          className="ag-map__canvas"
        />
        <span className="ag-location__pin" aria-hidden="true">
          <Icon name="map-pin" size={compact ? 32 : 36} />
        </span>
      </div>
      <div className="ag-location__row">
        <span id={id + '-status'} className="ag-field__hint">
          {status}
        </span>
        {locateLabel && (
          <Button variant="secondary" size="sm" onClick={locate} loading={locating}>
            {locateLabel}
          </Button>
        )}
      </div>
      {error && (
        <span id={id + '-error'} className="ag-field__hint ag-field__hint--error">
          {error}
        </span>
      )}
    </div>
  );
}
