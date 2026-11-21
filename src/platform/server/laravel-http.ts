import {responseError, VendraApiError} from './laravel/errors.mjs';

interface LaravelContext {
  base: string;
  storefrontOrigin?: string;
  locale?: 'en' | 'fa';
  customerAccessToken?: string;
  fetch?: typeof fetch;
}

export function laravelDeadline(method?: string) {
  return AbortSignal.timeout(method === 'POST' ? 20_000 : 10_000);
}

export function createLaravelHttp({
  base,
  storefrontOrigin,
  locale,
  customerAccessToken,
  fetch: fetchApi = fetch
}: LaravelContext) {
  const backend = new URL(base);
  if (
    !['https:', 'http:'].includes(backend.protocol) ||
    backend.username ||
    backend.password ||
    backend.search ||
    backend.hash
  )
    throw new TypeError('Expected a Laravel API base URL');

  const origin = storefrontOrigin === undefined ? undefined : new URL(storefrontOrigin).origin;
  const basePath = backend.pathname.replace(/\/$/, '');

  function url(path: string) {
    return new URL(backend.origin + basePath + path);
  }

  async function request(resource: string | URL, init: RequestInit = {}): Promise<unknown> {
    const target = typeof resource === 'string' ? url(resource) : resource;
    if (
      target.origin !== backend.origin ||
      target.username ||
      target.password ||
      !target.pathname.startsWith(basePath + '/')
    )
      throw new TypeError('Laravel resource URL is outside the configured backend');

    const headers = new Headers(init.headers);
    headers.set('Accept', 'application/ld+json');
    if (origin) headers.set('Origin', origin);
    if (locale) headers.set('Accept-Language', locale);
    if (customerAccessToken) headers.set('Authorization', `Bearer ${customerAccessToken}`);
    if (init.body !== undefined) headers.set('Content-Type', 'application/json');

    const signal = init.signal ?? laravelDeadline(init.method);
    let response: Response;
    let body: string;
    try {
      response = await fetchApi(target, {
        ...init,
        headers,
        signal,
        cache: 'no-store',
        credentials: 'omit',
        redirect: 'error'
      });
      body = await response.text();
    } catch {
      throw new VendraApiError(signal.aborted ? 'timeout' : 'network');
    }

    let data: unknown;
    try {
      data = JSON.parse(body);
    } catch {
      if (response.ok) throw new VendraApiError('invalid-response', response.status);
    }
    if (!response.ok) throw responseError(response.status, data);
    return data;
  }

  return {url, request};
}

export type LaravelHttp = ReturnType<typeof createLaravelHttp>;
