export interface ChoiceGroupProps {
  /** aria-label (or use labelledBy) */
  label?: string;
  labelledBy?: string;
  /** Visible group label → renders <fieldset><legend> (legend labels the radiogroup). Overrides label/labelledBy. */
  legend?: React.ReactNode;
  /** Helper text under the tiles, linked with aria-describedby */
  hint?: React.ReactNode;
  /** Error text: aria-invalid + aria-errormessage on the radiogroup */
  error?: React.ReactNode;
  id?: string;
  /** Fixed column count; otherwise auto-fills tiles of minTileWidth */
  columns?: number;
  minTileWidth?: number;
  /** ChoiceTiles */
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
/** React Aria radiogroup: one Tab stop, arrow keys move and select (mirrored in RTL, following the page's language). */
export declare function ChoiceGroup(props: ChoiceGroupProps): JSX.Element;
/** Internal: how ChoiceTiles report to their ChoiceGroup. */
export declare const choiceGroupContext: React.Context<unknown>;
