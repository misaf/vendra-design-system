import React from 'react';
import {IconButton} from '../IconButton/IconButton.jsx';
import {cx} from '../utils/cx.js';

const FOCUSABLE =
  'a[href],area[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),iframe,[tabindex]:not([tabindex="-1"]),[contenteditable="true"]';
// The page behind stays put while any dialog is open. Nested dialogs share one lock; the
// scrollbar's width is padded back so the layout doesn't shift.
let openDialogs = 0;
let savedBodyStyle = null;
const lockScroll = () => {
  if (openDialogs++ === 0) {
    const body = document.body;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    savedBodyStyle = {overflow: body.style.overflow, paddingInlineEnd: body.style.paddingInlineEnd};
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingInlineEnd = scrollbarWidth + 'px';
  }
};
const unlockScroll = () => {
  if (--openDialogs === 0 && savedBodyStyle) {
    document.body.style.overflow = savedBodyStyle.overflow;
    document.body.style.paddingInlineEnd = savedBodyStyle.paddingInlineEnd;
    savedBodyStyle = null;
  }
};

// role="dialog" + aria-modal + aria-labelledby → title. Focus moves in on open, Tab/Shift+Tab stay inside, Esc closes,
// focus returns to the opener on close, and the page behind can't scroll (skipped for inline previews).
export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  inline,
  closeLabel = 'Close',
  maxWidth,
  initialFocus,
  placement = 'center'
}) {
  const titleId = React.useId();
  const dialogRef = React.useRef(null);
  const closeRef = React.useRef(onClose);
  closeRef.current = onClose;
  React.useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener = document.activeElement;
    const focusables = () =>
      [...dialog.querySelectorAll(FOCUSABLE)].filter(el => el.getClientRects().length);
    const candidates = focusables();
    const firstFocus =
      (initialFocus && dialog.querySelector(initialFocus)) ||
      candidates.find(el => !el.closest('.ag-dialog__head')) ||
      candidates[0] ||
      dialog;
    // Inline previews don't move or trap focus — several on one page would fight over it.
    if (!inline) firstFocus.focus({preventScroll: true});
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        if (closeRef.current) {
          event.stopPropagation();
          closeRef.current();
        }
        return;
      }
      if (event.key !== 'Tab') return;
      const all = focusables();
      if (!all.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = all[0];
      const last = all[all.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === dialog || !dialog.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !dialog.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };
    // Focus that escapes (e.g. a click outside) comes back to the dialog.
    const onFocusIn = event => {
      if (!dialog.contains(event.target)) (focusables()[0] || dialog).focus({preventScroll: true});
    };
    if (inline) return;
    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('focusin', onFocusIn);
    lockScroll();
    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('focusin', onFocusIn);
      unlockScroll();
      if (opener && opener.focus && document.contains(opener)) opener.focus({preventScroll: true});
    };
  }, [open, inline]);
  if (!open) return null;
  return (
    <div
      className={cx(
        'ag-dialog__overlay',
        inline && 'ag-dialog__overlay--inline',
        placement === 'start' && 'ag-dialog__overlay--sheet'
      )}
      onClick={event => {
        if (event.target === event.currentTarget && onClose) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className={cx('ag-dialog', placement === 'start' && 'ag-dialog--sheet')}
        style={maxWidth ? {maxWidth} : undefined}
      >
        <div className="ag-dialog__head">
          <h2 id={titleId} className="ag-dialog__title">
            {title}
          </h2>
          {onClose && <IconButton icon="x" label={closeLabel} size="sm" onClick={onClose} />}
        </div>
        <div className="ag-dialog__body">{children}</div>
        {footer && <div className="ag-dialog__foot">{footer}</div>}
      </div>
    </div>
  );
}
