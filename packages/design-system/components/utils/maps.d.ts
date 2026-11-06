export interface MapTiles {
  /** Leaflet URL template, e.g. "https://tile.example.com/{z}/{x}/{y}.png". */
  url: string;
  attribution: string;
  /** Default 19. */
  maxZoom?: number;
}
export interface Maps {
  /** A Leaflet map with the tiles, no wheel zoom, and a stable centre when its box resizes.
   * Call stop() before map.remove(). */
  create(
    Leaflet: any,
    element: HTMLElement,
    options: {center: [number, number]; zoom: number; tiles: MapTiles}
  ): {map: any; stop(): void};
}
/** Leaflet set-up shared by LocationPicker and PlacesMap. */
export declare const maps: Maps;
