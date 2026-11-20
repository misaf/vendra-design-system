/** Fills {fee:<zone>}, {cutoff:<zone>} and {freeDeliveryFrom}. */
export declare function fillText(
  text: string,
  values: {
    fee(zoneId: string): string;
    cutoff(zoneId: string): string;
    freeDeliveryFrom(): string;
  }
): string;
