export interface CheckoutRequest {
  cartToken: string;
  currencyCode: string | null;
  gateway: string | null;
  paymentReference: string | null;
  cardMessage: string | null;
  recipientName: string | null;
  addressId: number | null;
  latitude: number | null;
  longitude: number | null;
  deliveryDate: string | null;
  deliverySlotId: number | null;
}

export interface DeliverySlot {
  id: number;
  name: Record<string, string>;
  /** "08:00" */
  startsAt: string;
  endsAt: string;
}

export declare function checkoutRequest(
  lines: Record<string, any>[],
  delivery: Record<string, any>,
  options: {
    slots: DeliverySlot[];
    currencyCode?: string;
    deliveryDate?: string;
    lineToken?(line: Record<string, any>): string;
    method?: string;
    last4?: string;
    ref?: string;
    cartToken?: string;
  }
): CheckoutRequest;

export declare function vfCheckoutRequest(
  lines: Record<string, any>[],
  delivery: Record<string, any>,
  options?: {method?: string; last4?: string; ref?: string; cartToken?: string}
): CheckoutRequest;
