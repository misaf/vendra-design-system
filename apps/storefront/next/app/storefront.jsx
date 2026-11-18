'use client';

import {useEffect, useState} from 'react';

// The existing router still owns in-session navigation while pages move to the App Router.
export function Storefront({children}) {
  const [page, setPage] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    import('./start-storefront.js')
      .then(module => module.startStorefront())
      .then(page => {
        if (active) setPage(page);
      })
      .catch(error => {
        if (!active) return;
        console.error(error);
        document.getElementById('vf-initial-page')?.removeAttribute('inert');
        setFailed(true);
      });
    return () => {
      active = false;
    };
  }, []);

  if (page) {
    const {Page, props} = page;
    return <Page {...props} />;
  }

  return (
    <>
      {children}
      {failed && (
        <p role="alert">
          Reload the page to open the storefront. برای باز کردن فروشگاه، صفحه را بازخوانی کنید.
        </p>
      )}
    </>
  );
}
