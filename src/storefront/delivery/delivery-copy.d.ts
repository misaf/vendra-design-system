/** Fills {fee:<zone>}, {cutoff:<zone>} and {freeDeliveryFrom}. */
export declare function fillText(
  text: string,
  values: {
    fee(zoneId: string): string;
    cutoff(zoneId: string): string;
    freeDeliveryFrom(): string;
  }
): string;

export declare function vfDeliveryCutoff(
  zone: import('./delivery-zones.js').Zone,
  persian: boolean
): string;
export declare function vfDeliveryHint(
  zone: import('./delivery-zones.js').Zone,
  persian: boolean
): string;
export declare function vfStoreText(
  text: string,
  money: (amount: number) => string,
  persian: boolean
): string;
