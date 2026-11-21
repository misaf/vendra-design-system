import type {ProductCode} from '../catalog/product';

/** The snapshot accepted by Laravel. The amounts use the order's currency. */
export interface PurchasedOrderLine {
  id: number;
  sellableType: string;
  sellableId: number;
  productCode: ProductCode | null;
  name: string;
  quantity: number;
  unitAmount: number;
  lineAmount: number;
  size: string | null;
  selectedAddOns: string[];
  cardMessage: string | null;
}
