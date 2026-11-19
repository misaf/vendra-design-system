import type {ReactNode} from 'react';

// Checkout steps share the parent session. Each screen selects its own checkout chrome.
export default function CheckoutLayout({children}: {children: ReactNode}) {
  return children;
}
