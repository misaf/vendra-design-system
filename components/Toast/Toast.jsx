import React from 'react';
import {
  Button as AriaButton,
  Text,
  UNSTABLE_Toast as AriaToast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastStateContext as ToastStateContext
} from 'react-aria-components';
import {Icon} from '../Icon/Icon.jsx';
import {Button} from '../Button/Button.jsx';

const ICONS = {
  success: 'circle-check',
  info: 'flower-2',
  warning: 'triangle-alert',
  danger: 'circle-alert'
};
// A toast on React Aria (role="alertdialog" with its text in an atomic alert, labelled by the title
// and described by the message). It renders where it is placed: the page decides where it shows and
// how long it stays, and React Aria's close button calls onClose. The toast itself is never a click
// target — put the follow-up in `action` (a real button or link).
export function Toast({
  tone = 'success',
  title,
  message,
  action,
  onClose,
  closeLabel = 'Dismiss',
  style
}) {
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
  return (
    <ToastStateContext.Provider value={state}>
      <AriaToast toast={toast} className="ag-toast" style={style}>
        <Icon name={ICONS[tone]} size={20} className={'ag-toast__icon--' + tone} />
        <ToastContent className="ag-toast__body">
          <Text slot="title" elementType="div" className="ag-toast__title">
            {title}
          </Text>
          {message && (
            <Text slot="description" elementType="div" className="ag-toast__msg">
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
        {onClose && (
          <AriaButton slot="close" className="ag-toast__close" aria-label={closeLabel}>
            <Icon name="x" size={16} />
          </AriaButton>
        )}
      </AriaToast>
    </ToastStateContext.Provider>
  );
}
