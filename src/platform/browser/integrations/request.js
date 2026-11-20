import {vfApiFields} from './api-errors.js';

/** @param {Pick<import('../runtime.js').VfApi, 'base' | 'timeouts'>} client */
export function createRequest(client) {
  // Every failure carries `kind`: 'offline' (the device was offline, so nothing was sent), 'timeout'
  // (no answer in time), 'network' (the connection failed) or an HTTP failure with its status.
  // A timeout or connection failure can occur after the server has accepted the work.
  const failure = (kind, message, extra = {}) =>
    Object.assign(
      /** @type {Error & {kind: string, status?: number, body?: any}} */ (new Error(message)),
      {kind},
      extra
    );
  /**
   * @param {string} method
   * @param {string} path
   * @param {any} [body]
   */
  return async (method, path, body, {idempotencyKey = ''} = {}) => {
    const controller = typeof AbortController === 'function' ? new AbortController() : null;
    let timedOut = false;
    const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
    const timer = setTimeout(
      () => {
        timedOut = true;
        controller?.abort();
      },
      method === 'GET' ? client.timeouts.read : client.timeouts.write
    );
    try {
      let r;
      try {
        r = await fetch(client.base + path, {
          method,
          headers: {
            Accept: 'application/ld+json',
            ...(typeof document !== 'undefined' && document.documentElement?.lang
              ? {'Accept-Language': document.documentElement.lang}
              : {}),
            ...(body ? {'Content-Type': 'application/json'} : {}),
            ...(idempotencyKey ? {'Idempotency-Key': idempotencyKey} : {})
          },
          body: body ? JSON.stringify(body) : undefined,
          credentials: 'include',
          signal: controller?.signal
        });
      } catch (error) {
        const message = (error && error.message) || 'Network error';
        throw timedOut
          ? failure('timeout', 'Request timed out')
          : failure(offline ? 'offline' : 'network', message);
      }
      const data = r.status === 204 ? null : await r.json().catch(() => null);
      if (timedOut) throw failure('timeout', 'Request timed out');
      if (!r.ok) {
        const kind =
          r.status === 422
            ? 'validation'
            : r.status === 409
              ? 'conflict'
              : r.status >= 500
                ? 'server'
                : 'http';
        throw failure(kind, 'HTTP ' + r.status, {
          status: r.status,
          body: data,
          ...(kind === 'validation' ? {fields: vfApiFields(data)} : {})
        });
      }
      return data;
    } finally {
      clearTimeout(timer);
    }
  };
}
