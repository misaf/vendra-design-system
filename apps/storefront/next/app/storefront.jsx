'use client';

import {useEffect} from 'react';

export function Storefront() {
  useEffect(() => {
    // The initial DOM belongs to the storefront's React root, under an opaque Next.js boundary.
    const container = document.getElementById('root');
    let active = true;
    let root;
    import('./start-storefront.jsx')
      .then(module => module.startStorefront(container, () => active))
      .then(mounted => {
        if (!active && mounted) mounted.unmount();
        else root = mounted;
      })
      .catch(error => {
        if (!active) return;
        console.error(error);
        container?.removeAttribute('inert');
      });
    return () => {
      active = false;
      if (root) queueMicrotask(() => root.unmount());
    };
  }, []);

  return null;
}
