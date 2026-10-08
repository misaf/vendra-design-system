export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  /** Secondary muted line under the label, exposed as the accessible description (not part of the name) */
  description?: React.ReactNode;
  name: string;
  /** Helper text below, linked with aria-describedby (prefer ChoiceGroup/fieldset error for groups) */
  hint?: React.ReactNode;
  /** Error: danger ring, aria-invalid, aria-errormessage → hint */
  error?: React.ReactNode;
}
export declare function Radio(props: RadioProps): JSX.Element;
