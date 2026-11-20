export interface LatLng {
  lat: number;
  lng: number;
}

export declare const validLocation: (location: unknown) => location is LatLng;
export declare const pinLocation: (point: LatLng) => LatLng;
