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
