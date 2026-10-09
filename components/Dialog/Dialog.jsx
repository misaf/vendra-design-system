import React from 'react';
import {Dialog as AriaDialog, Heading, Modal, ModalOverlay} from 'react-aria-components';
import {IconButton} from '../IconButton/IconButton.jsx';
import {cx} from '../utils/cx.js';

const FOCUSABLE =
  'a[href],area[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),iframe,[tabindex]:not([tabindex="-1"]),[contenteditable="true"]';

// The head (title + close) and body shared by the modal and inline forms.
function Content({title, titleId, onClose, closeLabel, footer, children, heading}) {
  return (
    <>
      <div className="ag-dialog__head">
        {heading ? (
          heading
        ) : (
          <h2 id={titleId} className="ag-dialog__title">
            {title}
          </h2>
        )}
        {onClose && <IconButton icon="x" label={closeLabel} size="sm" onClick={onClose} />}
      </div>
      <div className="ag-dialog__body">{children}</div>
      {footer && <div className="ag-dialog__foot">{footer}</div>}
    </>
  );
}

// A modal dialog on React Aria: role="dialog" + aria-modal, labelled by its title. While open, the
// page behind is hidden from screen readers and can't scroll, focus stays inside, Esc and a click
// outside close it (when there is onClose), and focus returns to the opener. `inline` previews sit
// inside their parent instead, without moving focus or locking the page (several can share a card).
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
  const sheet = placement === 'start';
  const overlayClass = cx(
    'ag-dialog__overlay',
    inline && 'ag-dialog__overlay--inline',
    sheet && 'ag-dialog__overlay--sheet'
  );
  const dialogClass = cx('ag-dialog', sheet && 'ag-dialog--sheet');
  const style = maxWidth ? {maxWidth} : undefined;

  // First focus: the initialFocus selector, else the first control outside the head, else the close button.
  React.useEffect(() => {
    if (!open || inline) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const candidates = [...dialog.querySelectorAll(FOCUSABLE)].filter(
      element => element.getClientRects().length
    );
    const first =
      (initialFocus && dialog.querySelector(initialFocus)) ||
      candidates.find(element => !element.closest('.ag-dialog__head')) ||
      candidates[0];
    if (first) first.focus({preventScroll: true});
  }, [open, inline]);

  if (inline) {
    if (!open) return null;
    return (
      <div className={overlayClass}>
        <div
          role="dialog"
          aria-labelledby={title ? titleId : undefined}
          className={dialogClass}
          style={style}
        >
          <Content
            title={title}
            titleId={titleId}
            onClose={onClose}
            closeLabel={closeLabel}
            footer={footer}
          >
            {children}
          </Content>
        </div>
      </div>
    );
  }
  return (
    <ModalOverlay
      isOpen={!!open}
      onOpenChange={isOpen => !isOpen && onClose && onClose()}
      isDismissable={!!onClose}
      isKeyboardDismissDisabled={!onClose}
      className={overlayClass}
    >
      <Modal className={dialogClass} style={style}>
        <AriaDialog ref={dialogRef} className="ag-dialog__frame">
          <Content
            onClose={onClose}
            closeLabel={closeLabel}
            footer={footer}
            heading={
              title ? (
                <Heading slot="title" level={2} className="ag-dialog__title">
                  {title}
                </Heading>
              ) : (
                <span />
              )
            }
          >
            {children}
          </Content>
        </AriaDialog>
      </Modal>
    </ModalOverlay>
  );
}
