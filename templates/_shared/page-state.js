// A page's state as storefront logic expects it: one object that holds the props and the state, whose
// setState applies at once (code may read page.state right after it) and re-renders the page.
// Helpers and timers live on the same object. Plain JavaScript, so tests can run it with a stand-in
// for React's hooks.
import React from 'react';

export function usePageLogic(props, init) {
  const [, rerender] = React.useReducer(count => count + 1, 0);
  const ref = React.useRef(null);
  if (!ref.current) {
    const page = {
      props,
      state: {},
      done: [],
      setState(update, done) {
        const patch = typeof update === 'function' ? update(page.state) : update;
        page.state = {...page.state, ...patch};
        if (done) page.done.push(done);
        rerender();
      }
    };
    if (init) init(page);
    ref.current = page;
  }
  ref.current.props = props;
  // setState(update, done): done runs once the update has rendered.
  React.useEffect(() => {
    for (const done of ref.current.done.splice(0)) done();
  });
  return ref.current;
}

// Class-style lifecycle for page logic: didMount after the first render, didUpdate(previousProps)
// after every later one, willUnmount when the page goes away. The page's own handlers (the last
// useLifecycle call) are also on page.lifecycle, for tests.
export function useLifecycle(page, {didMount, didUpdate, willUnmount}) {
  const latest = React.useRef(null);
  latest.current = page.lifecycle = {didMount, didUpdate, willUnmount};
  const previous = React.useRef(undefined);
  React.useEffect(() => {
    if (latest.current.didMount) latest.current.didMount();
    return () => latest.current.willUnmount && latest.current.willUnmount();
  }, []);
  React.useEffect(() => {
    if (previous.current !== undefined && latest.current.didUpdate)
      latest.current.didUpdate(previous.current);
    previous.current = page.props;
  });
}
