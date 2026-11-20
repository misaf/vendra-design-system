import type {ReactNode} from 'react';

// Catalog, account and storefront content share the persistent storefront session.
export default function StorefrontLayout({children}: {children: ReactNode}) {
  return children;
}
