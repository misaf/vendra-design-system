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
  /** Key in `currencies`; defaults to 'IRT' (Toman). Throws if the table has no such currency. */
  currency?: string;
  lang?: 'en' | 'fa';
  /** The tenant's currency table. Defaults to CURRENCIES, which has only Toman and Rial; any other
   * currency needs the tenant's own rate. */
  currencies?: Record<string, Currency>;
}
export interface Format {
  /** The fixed currencies: IRT (Toman, rate 1) and IRR (Rial, rate 10). */
  CURRENCIES: Record<string, Currency>;
  /** "4,200,000 Toman", "$42.00", "۴٬۲۰۰٬۰۰۰ تومان". Throws for a currency missing from the table. */
  money(toman: number | string, options?: MoneyOptions): string;
  /** Grouped number; Persian digits and separators for 'fa'. */
  num(n: number | string, lang?: 'en' | 'fa'): string;
}
/** Number and currency formatting for English and Persian. */
export declare const format: Format;
