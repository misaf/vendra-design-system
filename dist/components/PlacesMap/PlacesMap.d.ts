import * as React from 'react';
import type {LatLng} from '../utils/commerce.js';
import type {MapTiles} from '../utils/maps.js';
export interface Place {
  id: string;
  /** Shown above the marker, e.g. "Home" or the store name. */
  label: string;
  /** The marker's accessible name and tooltip, e.g. "Edit Home" or "Directions to the studio". */
  title: string;
  /** Places without a valid location are left off the map. */
  location: LatLng | null;
  /** Runs on a click, Enter or Space on the marker. */
  onSelect?: () => void;
}
export interface PlacesMapProps {
  /** The map's id. */
  id: string;
  /** The map region's accessible name. */
  label: string;
  places: Place[];
  /** Resolves with Leaflet (window.L or the leaflet module), loading it however the app does. */
  loadLeaflet: () => Promise<any>;
  tiles: MapTiles;
  /** Where the map starts before the places fit it, [lat, lng]. */
  center: [number, number];
  /** Default 13. */
  zoom?: number;
  /** Map height: px or any CSS length; default 280. */
  height?: number | string;
  /** Leaflet didn't load: hide the map. */
  onFail?: () => void;
  className?: string;
  style?: React.CSSProperties;
}
/** A read-only map of labelled places; each marker opens its place by pointer or keyboard. */
export declare function PlacesMap(props: PlacesMapProps): React.JSX.Element;
