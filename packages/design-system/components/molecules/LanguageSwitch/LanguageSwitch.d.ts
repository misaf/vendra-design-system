import type {RootAttributes} from '../../utils/root-attributes.js';

export interface LanguageOption {
  id: string;
  label: string;
}
export interface LanguageSwitchProps extends Omit<
  RootAttributes<HTMLDivElement>,
  'onChange' | 'children'
> {
  /** The outer element. */
  ref?: React.Ref<HTMLDivElement>;
  /** Current language id, e.g. "en" | "fa" */
  value?: string;
  onChange?: (id: string) => void;
  /** The languages to offer; defaults to VendraProvider's `locales` (English and Persian) with their own labels. */
  options?: LanguageOption[];
  /** Group name for screen readers, in the page's language (default "Language") */
  label?: string;
}
export declare function LanguageSwitch(props: LanguageSwitchProps): React.JSX.Element;
