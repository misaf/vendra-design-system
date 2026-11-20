/** One callback ref that sets or calls every given ref (skipping null and undefined), with React 19 cleanup. */
export declare function useMergedRef<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T>;
