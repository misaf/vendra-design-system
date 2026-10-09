import type {LatLng} from '../utils/commerce.js';
export interface LocationPickerProps {
  /** The map's id; the label, status and error use `${id}-label`, `-status` and `-error`. */
  id: string;
  label: React.ReactNode;
  /** Under the map: how to place the pin, or where it is. */
  status?: React.ReactNode;
  /** Shown under the status and added to the map's description. */
  error?: React.ReactNode;
  /** The chosen point; null until one is chosen. A new value moves the map. */
  value?: LatLng | null;
  /** The point under the pin whenever the map stops, rounded to six decimals. */
  onChange: (location: LatLng) => void;
  /** Resolves with Leaflet (window.L or the leaflet module), loading it however the app does. */
  loadLeaflet: () => Promise<any>;
  /** Map tiles: a Leaflet URL template, its attribution, and an optional maxZoom (default 19). */
  tiles: {url: string; attribution: string; maxZoom?: number};
  /** Where the map starts when nothing is chosen, [lat, lng]. */
  center: [number, number];
  /** Zoom with nothing chosen; default 13. */
  zoom?: number;
  /** Zoom on a chosen point; default 17. */
  pinZoom?: number;
  /** "Use my location" button text; no button without it. */
  locateLabel?: React.ReactNode;
  /** The browser couldn't give a location (refused, unavailable or timed out). */
  onLocateError?: () => void;
  /** The map is ready. */
  onReady?: () => void;
  /** Leaflet didn't load: offer a typed address instead. */
  onFail?: () => void;
  /** A shorter map (220px instead of 280px) with a smaller pin, for dialogs. */
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
/** A centre-pin map for choosing a delivery point, with "use my location". */
export declare function LocationPicker(props: LocationPickerProps): JSX.Element;
