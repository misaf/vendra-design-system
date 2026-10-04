import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { IconButton } from '../core/IconButton.jsx';
const ALERT_ICONS={neutral:'info',warning:'triangle-alert',error:'circle-alert',success:'circle-check'};
export function Alert({tone='neutral',icon,title,children,action,onClose,closeLabel='Dismiss',className='',style}){
  const t=tone==='danger'?'error':tone;
  const role=t==='error'||t==='warning'?'alert':'status';
  return <div role={role} className={'ag-alert ag-alert--'+t+' '+className} style={style}>
    {icon!==false && <Icon name={icon||ALERT_ICONS[t]||ALERT_ICONS.neutral} size={20} className="ag-alert__icon" />}
    <div className="ag-alert__body">
      <div className="ag-alert__msg">{title && <div className="ag-alert__title">{title}</div>}{children && <div className="ag-alert__text">{children}</div>}</div>
      {action && <div className="ag-alert__action">{action}</div>}
    </div>
    {onClose && <IconButton icon="x" label={closeLabel} className="ag-alert__close" onClick={onClose} />}
  </div>;
}
