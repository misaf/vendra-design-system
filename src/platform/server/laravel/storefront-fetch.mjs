// @ts-check

/**
 * @param {{storefrontOrigin?: string, locale: 'en' | 'fa', customerAccessToken?: string}} context
 * @returns {typeof fetch}
 */
export function createStorefrontFetch({storefrontOrigin, locale, customerAccessToken}) {
  const origin = storefrontOrigin === undefined ? undefined : new URL(storefrontOrigin).origin;
  return (url, init) => {
    const headers = new Headers(init?.headers);
    if (origin) headers.set('Origin', origin);
    headers.set('Accept-Language', locale);
    if (customerAccessToken) headers.set('Authorization', `Bearer ${customerAccessToken}`);
    return fetch(url, {...init, headers, credentials: 'omit'});
  };
}
