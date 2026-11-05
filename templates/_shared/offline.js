import {vfAppBase} from './routing.js';

// Prepare the built app shell and this display's photos on the very first visit.
export function vfKeepOffline(
  urls = [],
  update = state => {
    void state;
  }
) {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) {
    update({status: 'unsupported', completed: 0, total: 0});
    return () => {};
  }
  let disposed = false;
  let channel;
  let timeout;
  const report = value => {
    if (!disposed) update(value);
  };
  const prepare = async () => {
    if (!navigator.onLine) {
      report({status: 'offline', completed: 0, total: 0});
      return;
    }
    report({status: 'preparing', completed: 0, total: 0});
    try {
      // The worker sits at the app's path, whichever page registers it, so it serves every page.
      await navigator.serviceWorker.register(vfAppBase() + 'sw.js', {
        updateViaCache: 'none'
      });
      const registration = await navigator.serviceWorker.ready;
      if (disposed || !registration.active) return;
      channel?.port1.close();
      channel = new MessageChannel();
      clearTimeout(timeout);
      timeout = setTimeout(() => report({status: 'failed', completed: 0, total: 0}), 120000);
      channel.port1.onmessage = event => {
        report(event.data);
        if (event.data.status !== 'preparing') clearTimeout(timeout);
      };
      registration.active.postMessage({type: 'PREPARE_DISPLAY', urls}, [channel.port2]);
    } catch {
      report({status: 'failed', completed: 0, total: 0});
    }
  };
  navigator.serviceWorker.addEventListener('controllerchange', prepare);
  window.addEventListener('online', prepare);
  prepare();
  return () => {
    disposed = true;
    clearTimeout(timeout);
    channel?.port1.close();
    navigator.serviceWorker.removeEventListener('controllerchange', prepare);
    window.removeEventListener('online', prepare);
  };
}
