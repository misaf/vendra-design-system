import {vfRuntime} from '../platform/runtime.js';
import {vfAppBase, vfLegacyAppBase} from './routing.js';

function mapPhotoSources(photo, map) {
  const mapSet = value =>
    value
      .split(',')
      .map(candidate => {
        const [url, ...descriptors] = candidate.trim().split(/\s+/);
        return [map(url), ...descriptors].join(' ');
      })
      .join(', ');
  return {
    ...photo,
    src: map(photo.src),
    ...(photo.srcSet ? {srcSet: mapSet(photo.srcSet)} : {}),
    ...(photo.sources
      ? {sources: photo.sources.map(source => ({...source, srcSet: mapSet(source.srcSet)}))}
      : {})
  };
}

export function vfOfflinePhotoUrls(photo) {
  const urls = [];
  mapPhotoSources(photo, url => {
    urls.push(url);
    return url;
  });
  return urls;
}

// A new document URL makes the browser decode the freshly prepared photo at the same origin URL.
export function vfVersionOfflinePhoto(photo, {base, revision}) {
  const origin = new URL(base).origin;
  return mapPhotoSources(photo, src => {
    const url = new URL(src, base);
    if (url.origin !== origin) return src;
    const {hash} = url;
    url.hash = '';
    return url.href + (url.search ? '&' : '?') + 'vf-photo-revision=' + revision + hash;
  });
}

// Prepare the built app shell and this display's photos on the very first visit.
export function vfKeepOffline(
  urls = [],
  update = state => {
    void state;
  }
) {
  if (!vfRuntime.offlineDisplay || !('serviceWorker' in navigator)) {
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
      const legacyBase = vfLegacyAppBase();
      const base = location.pathname.startsWith(legacyBase) ? legacyBase : vfAppBase();
      await navigator.serviceWorker.register(base + 'sw.js', {
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
