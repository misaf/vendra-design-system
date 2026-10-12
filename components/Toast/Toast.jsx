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

// What a toast shows: tone icon, title, message, the follow-up action and React Aria's close button.
function ToastBody({toast, tone = 'success', title, message, action, closeLabel, closable, style}) {
  return (
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
  if (queued)
    return (
      <ToastBody
        toast={queued}
        tone={tone}
        title={title}
        message={message}
        action={action}
        closeLabel={closeLabel}
        closable
        style={style}
      />
    );
  return (
    <ToastStateContext.Provider value={state}>
      <ToastBody
        toast={toast}
        tone={tone}
        title={title}
        message={message}
        action={action}
        closeLabel={closeLabel}
        closable={!!onClose}
        style={style}
      />
    </ToastStateContext.Provider>
  );
}
