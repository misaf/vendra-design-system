import * as React from 'react';
import type {Messages} from '../utils/messages.js';

export interface VendraProviderProps {
  /** BCP 47 locale, e.g. "en-US" or "fa-IR". Its language picks the built-in wording; React Aria
   * uses the whole locale for number/date formats and keyboard direction. Defaults to the browser's. */
  locale?: string;
  /** Extra or changed wording, by language then component, e.g. {fa: {Dialog: {close: 'بستن پنجره'}}}. Missing entries fall back to the built-in catalog, then English. */
  messages?: Messages;
  children?: React.ReactNode;
}
/** Language for every component below: React Aria's I18nProvider plus the components' built-in wording. Props on a component still win. */
export declare function VendraProvider(props: VendraProviderProps): React.JSX.Element;
