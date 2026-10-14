import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {cx} from '../utils/cx.js';
import {usePageLocale} from '../utils/locale.js';
import {useMessages} from '../utils/messages.js';
import {messages} from './messages.js';

// A slim band while the browser is offline, then "You’re back online." for a few seconds. The band
// is a polite live region that is always in the page (empty while online), so both changes are
// announced. On the server, and until the first effect, it is empty: navigator is read only there.
export function OfflineNotice({offlineText, onlineText, backFor = 4000, className, style}) {
  const {locale, ref} = usePageLocale();
  const text = useMessages(
    'OfflineNotice',
    messages,
    {offline: offlineText, online: onlineText},
    locale
  );
  const [state, setState] = React.useState('online');
  React.useEffect(() => {
    let timer;
    const offline = () => {
      clearTimeout(timer);
      setState('offline');
    };
    const online = () => {
      setState(current => (current === 'offline' ? 'back' : current));
      clearTimeout(timer);
      timer = setTimeout(() => setState('online'), backFor);
    };
    if (navigator.onLine === false) offline();
    window.addEventListener('offline', offline);
    window.addEventListener('online', online);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('offline', offline);
      window.removeEventListener('online', online);
    };
  }, [backFor]);
  return (
    <div
      ref={ref}
      role="status"
      className={cx('ag-offline', state !== 'online' && 'ag-offline--' + state, className)}
      style={style}
    >
      {state !== 'online' && (
        <>
          <Icon name={state === 'offline' ? 'wifi-off' : 'circle-check'} size={16} />
          <span>{state === 'offline' ? text.offline : text.online}</span>
        </>
      )}
    </div>
  );
}
