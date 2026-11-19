import type {ReactNode} from 'react';

// The counter screen supplies its own full-screen chrome.
export default function CounterLayout({children}: {children: ReactNode}) {
  return children;
}
