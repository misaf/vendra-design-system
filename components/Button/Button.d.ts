/** The <button> attributes React Aria's Button and ToggleButton pass on to the element (plus any
 * data-*). Others, such as title, tabIndex, role and most aria-*, would be dropped, so they are left out. */
export type ButtonDOMProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  | 'id'
  | 'type'
  | 'name'
  | 'value'
  | 'form'
  | 'formAction'
  | 'formEncType'
  | 'formMethod'
  | 'formNoValidate'
  | 'formTarget'
  | 'autoFocus'
  | 'disabled'
  | 'className'
  | 'style'
  | 'dir'
  | 'lang'
  | 'hidden'
  | 'translate'
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-describedby'
  | 'aria-details'
  | 'aria-haspopup'
  | 'aria-expanded'
  | 'aria-controls'
  | 'aria-pressed'
  | 'aria-current'
  | 'onFocus'
  | 'onBlur'
  | 'onKeyDown'
  | 'onKeyUp'
  | 'onClick'
  | 'onAuxClick'
  | 'onContextMenu'
  | 'onDoubleClick'
  | 'onMouseDown'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'onMouseMove'
  | 'onMouseOut'
  | 'onMouseOver'
  | 'onMouseUp'
  | 'onTouchStart'
  | 'onTouchMove'
  | 'onTouchEnd'
  | 'onTouchCancel'
  | 'onPointerDown'
  | 'onPointerMove'
  | 'onPointerUp'
  | 'onPointerCancel'
  | 'onPointerEnter'
  | 'onPointerLeave'
  | 'onPointerOver'
  | 'onPointerOut'
  | 'onScroll'
  | 'onWheel'
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onTransitionEnd'
> & {[dataAttribute: `data-${string}`]: string | number | boolean | undefined};
export interface ButtonProps extends ButtonDOMProps {
  /** primary = accent (peony) fill, white text (one per view); secondary = ink outline; soft = pale accent tint; ghost = text only */
  variant?: 'primary' | 'secondary' | 'soft' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Lucide icon name before label (inline-start, flips side in RTL) */
  iconStart?: string;
  iconEnd?: string;
  block?: boolean;
  /** Renders <a href> — use for navigation. Without href it's a <button> (actions). */
  href?: string;
  target?: string;
  /** Defaults to "noopener noreferrer" when target="_blank" */
  rel?: string;
  /** Shows a spinner in place of iconStart; the button stays focusable but can't be pressed (React Aria isPending). Keep the label — don't swap it for "Loading…". */
  loading?: boolean;
  /** Announced politely while loading, e.g. "Placing your order" */
  loadingLabel?: string;
  children?: React.ReactNode;
}
/** React Aria Button for actions; React Aria Link with href. */
export declare function Button(props: ButtonProps): JSX.Element;
