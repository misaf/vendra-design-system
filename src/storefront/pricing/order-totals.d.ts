import type {Zone} from '../delivery/delivery-zones.js';

export interface Promo {
  code: string;
  percent: number;
  /** Smallest subtotal the code accepts. */
  min: number;
}

export type PromoResult = {promo: Promo} | {error: 'unknown'} | {error: 'min'; min: number};

export interface BalanceRules {
  discountFrom: number;
  discountPercent: number;
}

export interface FreeDeliveryRules {
  threshold: number;
  /** Zone keys that deliver free above the threshold. */
  zones: string[];
}

export interface TotalsRules {
  freeDelivery?: FreeDeliveryRules;
  promos?: Promo[];
  wallet?: BalanceRules;
}

export interface Totals {
  sub: number;
  fee: number;
  discount: number;
  balanceDiscount?: number;
  balancePercent?: number;
  total: number;
}

export interface SummaryRow {
  label: string;
  value: string;
  strong?: boolean;
}

export interface SummaryLabels {
  sub: string;
  discount: string;
  /** Localized label template with a {percent} placeholder for the formatted percentage. */
  balanceDiscount: string;
  fee: string;
  free: string;
  total: string;
}

/** A promo code typed any way → "WELCOME10". */
export declare function promoCode(value: string): string;

export declare function freeDelivery(
  zoneId: string,
  subtotal: number,
  rules?: FreeDeliveryRules
): boolean;

export declare function promoCheck(value: string, subtotal: number, promos: Promo[]): PromoResult;

export declare function discount(code: string, subtotal: number, promos: Promo[]): number;

export declare function balanceDiscountOn(balance: number | null, rules?: BalanceRules): boolean;

export declare function balanceDiscount(
  balance: number | null,
  products: number,
  rules?: BalanceRules
): number;

export declare function totals(
  lines: {unit: number; qty: number}[],
  order: {zone: Pick<Zone, 'id' | 'fee'>; promo?: string; balance?: number | null},
  rules: TotalsRules
): Totals;

export declare function summaryRows(
  totals: Totals,
  code: string,
  labels: SummaryLabels,
  money: (amount: number) => string,
  num?: (value: number) => string
): SummaryRow[];
