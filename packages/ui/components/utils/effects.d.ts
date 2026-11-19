/** useLayoutEffect in the browser, useEffect on the server (no server-rendering warning). */
export declare function useClientLayoutEffect(
  effect: () => void | (() => void),
  deps?: readonly unknown[]
): void;
