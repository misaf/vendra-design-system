import * as React from 'react';
export interface LanguageOption {
  id: string;
  label: string;
}
export interface LanguageSwitchProps {
  /** Current language id, e.g. "en" | "fa" */
  value?: string;
  onChange?: (id: string) => void;
  options?: LanguageOption[];
  /** Group name for screen readers, in the page's language (default "Language") */
  label?: string;
}
export declare function LanguageSwitch(props: LanguageSwitchProps): React.JSX.Element;
