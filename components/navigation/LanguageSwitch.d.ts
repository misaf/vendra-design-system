export interface LanguageOption { id: string; label: string; }
export interface LanguageSwitchProps {
  /** Current language id, e.g. "en" | "fa" */
  value?: string;
  onChange?: (id: string) => void;
  options?: LanguageOption[];
}
export declare function LanguageSwitch(props: LanguageSwitchProps): JSX.Element;