'use client';

import React from 'react';
import {Dialog as AriaDialog, Heading, Modal, ModalOverlay} from 'react-aria-components';
import {IconButton} from '../../atoms/IconButton/IconButton.jsx';
import {cx} from '../../utils/cx.js';
import {useDensity} from '../../utils/density.js';
import {useMessages} from '../../utils/messages.js';
import {messages} from './messages.js';

// The head (title + close) and body shared by the modal and inline forms.
function Content({title, titleId, onClose, closeLabel, footer, children, heading}) {
  return (
    <>
      <div className="ag-dialog__head">
        {heading ||
          (title ? (
            <h2 id={titleId} className="ag-dialog__title">
              {title}
            </h2>
          ) : (
            <span />
          ))}
        {onClose && <IconButton icon="x" label={closeLabel} size="sm" onClick={onClose} />}
      </div>
      <div className="ag-dialog__body">{children}</div>
      {footer && <div className="ag-dialog__foot">{footer}</div>}
    </>
  );
}

// A modal dialog on React Aria: role="dialog" + aria-modal, labelled by its title. While open, the
// page behind is hidden from screen readers and can't scroll, focus moves to the dialog (or to a
// control inside marked autoFocus) and stays inside, Esc and a click outside close it (when there is
// onClose), and focus returns to the opener. `inline` previews sit
// inside their parent instead, without moving focus or locking the page (several can share a card).
export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  inline,
  closeLabel,
  maxWidth,
  placement = 'center',
  className,
  style,
  'aria-labelledby': labelledBy,
  ref,
  ...rest
}) {
  const text = useMessages('Dialog', messages, {close: closeLabel});
  const density = useDensity();
  const titleId = React.useId();
  const sheet = placement === 'start';
  const overlayClass = cx(
    'ag-dialog__overlay',
    inline && 'ag-dialog__overlay--inline',
    sheet && 'ag-dialog__overlay--sheet'
  );
  const dialogClass = cx('ag-dialog', sheet && 'ag-dialog--sheet');
  const nameIds = cx(title && titleId, labelledBy) || undefined;
  // A number is the width at the comfortable density; it grows and shrinks with the others.
  const widthStyle = maxWidth
    ? {
        maxWidth:
          typeof maxWidth === 'number' ? `calc(${maxWidth}px * var(--size-scale, 1))` : maxWidth
      }
    : undefined;

  if (inline) {
    if (!open) return null;
    return (
      <div className={overlayClass} data-density={density}>
        <div
          {...rest}
          ref={ref}
          role="dialog"
          aria-labelledby={nameIds}
          className={cx(dialogClass, className)}
          style={{...widthStyle, ...style}}
        >
          <Content
            title={title}
            titleId={titleId}
            onClose={onClose}
            closeLabel={text.close}
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
      data-density={density}
    >
      <Modal className={dialogClass} style={widthStyle}>
        <AriaDialog
          {...rest}
          ref={ref}
          role="dialog"
          aria-labelledby={nameIds}
          className={cx('ag-dialog__frame', className)}
          style={style}
        >
          <Content
            onClose={onClose}
            closeLabel={text.close}
            footer={footer}
            heading={
              title ? (
                <Heading slot="title" id={titleId} level={2} className="ag-dialog__title">
                  {title}
                </Heading>
              ) : null
            }
          >
            {children}
          </Content>
        </AriaDialog>
      </Modal>
    </ModalOverlay>
  );
}
