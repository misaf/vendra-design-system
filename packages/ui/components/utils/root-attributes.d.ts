export interface DataAttributes {
  [attribute: `data-${string}`]: string | number | boolean | undefined;
}

export type RootAttributes<T extends HTMLElement> = Omit<
  React.HTMLAttributes<T>,
  'dangerouslySetInnerHTML'
> &
  DataAttributes;

/** The shared DOM props React Aria forwards, plus labelling props for labelable widgets. */
export type AriaWidgetAttributes<T extends HTMLElement> = Pick<
  RootAttributes<T>,
  | 'id'
  | 'className'
  | 'style'
  | 'dir'
  | 'lang'
  | 'hidden'
  | 'inert'
  | 'translate'
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-describedby'
  | 'aria-details'
  | 'onClick'
  | 'onPointerDown'
  | 'onPointerUp'
> &
  DataAttributes;
