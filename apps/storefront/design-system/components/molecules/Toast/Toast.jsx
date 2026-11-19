'use client';

import React from 'react';
import {
  Button as AriaButton,
  Text,
  UNSTABLE_Toast as AriaToast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastStateContext as ToastStateContext
} from 'react-aria-components';
import {Icon} from '@vendra/ui/Icon';
import {Button} from '@vendra/ui/Button';
import {cx} from '../../utils/cx.js';
import {useMessages} from '../../utils/messages.js';
import {messages} from './messages.js';

const ICONS = {
  neutral: 'info',
  success: 'circle-check',
  info: 'flower-2',
  warning: 'triangle-alert',
  danger: 'circle-alert'
};

// What a toast shows: tone icon, title, message, the follow-up action and React Aria's close button.
function ToastBody({
  toast,
  tone = 'success',
  title,
  message,
  action,
  closeLabel,
  closable,
  style,
  className,
  'aria-labelledby': labelledBy,
  'aria-describedby': describedBy,
  ref,
  ...rest
}) {
  const titleId = React.useId();
  const messageId = React.useId();
  return (
    <AriaToast
      {...rest}
      ref={ref}
      toast={toast}
      className={cx('ag-toast', className)}
      style={style}
      aria-labelledby={cx(titleId, labelledBy)}
      aria-describedby={cx(message && messageId, describedBy) || undefined}
    >
      <Icon name={ICONS[tone]} size={20} className={'ag-toast__icon--' + tone} />
      <ToastContent className="ag-toast__body">
        <Text id={titleId} slot="title" elementType="div" className="ag-toast__title">
          {title}
        </Text>
        {message && (
          <Text id={messageId} slot="description" elementType="div" className="ag-toast__msg">
            {message}
          </Text>
        )}
        {action && (
          <Button
            variant="ghost"
            size="sm"
            className="ag-toast__action"
            href={action.href}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </ToastContent>
      {closable && (
        <AriaButton slot="close" className="ag-toast__close" aria-label={closeLabel}>
          <Icon name="x" size={16} />
        </AriaButton>
      )}
    </AriaToast>
  );
}

// A toast on React Aria (role="alertdialog", its text in an atomic alert). Inside a ToastRegion it
// shows a queued `toast`; on its own it renders in place (previews, pages that place it themselves)
// and onClose is what its close button does.
export function Toast({
  toast: queued,
  tone,
  title,
  message,
  action,
  onClose,
  closeLabel,
  style,
  className,
  ref,
  ...rest
}) {
  const text = useMessages('Toast', messages, {close: closeLabel});
  const key = React.useId();
  const latestClose = React.useRef(onClose);
  latestClose.current = onClose;
  // React Aria's Toast reads its queue from context; this one holds just this toast.
  const toast = React.useMemo(() => ({key, content: null}), [key]);
  const state = React.useMemo(
    () => ({
      visibleToasts: [toast],
      add: () => key,
      close: () => latestClose.current && latestClose.current(),
      pauseAll() {},
      resumeAll() {}
    }),
    [key, toast]
  );
  const body = (
    <ToastBody
      {...rest}
      toast={queued ?? toast}
      tone={tone}
      title={title}
      message={message}
      action={action}
      closeLabel={text.close}
      closable={!!(queued || onClose)}
      className={className}
      style={style}
      ref={ref}
    />
  );
  return queued ? (
    body
  ) : (
    <ToastStateContext.Provider value={state}>{body}</ToastStateContext.Provider>
  );
}
