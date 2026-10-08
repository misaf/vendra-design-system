export interface Currency {
  /** Units per 1 Toman (prices are stored in Toman). */
  rate: number;
  /** Decimal places. */
  dec: number;
  /** Symbol placed before the amount in English, or '' to use the `en` word after it. */
  sym: string;
  en: string;
  fa: string;
}
export interface MoneyOptions {
  /** Key in `currencies`; defaults to 'IRT' (Toman). */
  currency?: string;
  lang?: 'en' | 'fa';
  /** The tenant's own currency table; defaults to the DEMO rates in CURRENCIES. */
  currencies?: Record<string, Currency>;
}
export interface Format {
  /** DEMO rates for IRT, IRR, USD, EUR and AED. */
  CURRENCIES: Record<string, Currency>;
  /** "4,200,000 Toman", "$42.00", "۴٬۲۰۰٬۰۰۰ تومان". */
  money(toman: number | string, options?: MoneyOptions): string;
  /** Grouped number; Persian digits and separators for 'fa'. */
  num(n: number | string, lang?: 'en' | 'fa'): string;
}
/** Number and currency formatting for English and Persian. */
export declare const format: Format;
