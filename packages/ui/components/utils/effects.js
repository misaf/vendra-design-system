import React from 'react';

// useLayoutEffect in the browser and useEffect on the server, where layout effects never run and
// React warns about them. Use it for work that must land before the first paint.
export const useClientLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
