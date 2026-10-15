const assert = require('node:assert/strict');
const vm = require('node:vm');
const {sharedLogic, pageScript} = require('./page-script.cjs');
function presentation(settings = {}) {
  const timers = new Map();
  let timerId = 0;
  const ctx = {
    URL,
    URLSearchParams,
    console,
    document: {
      getElementById: () => null,
      visibilityState: 'visible',
      addEventListener() {},
      removeEventListener() {}
    },
    navigator: {},
    location: {pathname: '/templates/app/', search: '', href: 'http://localhost/templates/app/'},
    localStorage: {
      getItem: key => (key === 'vf-presentation' ? JSON.stringify(settings) : null),
      setItem() {}
    },
    sessionStorage: {getItem: () => null, setItem() {}},
    setTimeout: (fn, ms) => {
      timers.set(++timerId, {fn, ms});
      return timerId;
    },
    clearTimeout: id => timers.delete(id),
    setInterval: (fn, ms) => {
      timers.set(++timerId, {fn, ms});
      return timerId;
    },
    clearInterval: id => timers.delete(id)
  };
  ctx.window = {
    innerWidth: 1280,
    scrollTo() {},
    matchMedia: () => ({matches: false, addEventListener() {}, removeEventListener() {}})
  };
  vm.createContext(ctx);
  vm.runInContext(
    sharedLogic + pageScript('storefront-presentation') + '\nthis.Logic=Component;',
    ctx
  );
  return {page: new ctx.Logic({lang: 'en'}), timers, ctx};
}
{
  const {page} = presentation();
  page.renderVals().nextDisplay();
  assert.equal(page.state.displayIndex, 0, 'a pending image leaves the current product visible');
  assert.equal(page.state.pendingIndex, 1);
  const next = page.renderVals().preloadProducts[0];
  page.renderVals().displayLoaded(next.imageKey);
  assert.equal(page.state.displayIndex, 1, 'only a decoded replacement advances the display');
  page.renderVals().nextDisplay();
  const failed = page.renderVals().preloadProducts[0];
  page.renderVals().displayFailed(failed.imageKey);
  assert.equal(page.state.displayIndex, 1, 'failed replacements keep the previous product');
  assert.equal(page.state.pendingIndex, null);
}
{
  const {page, timers} = presentation({displayMode: 'tv', slideSeconds: 15});
  page.lifecycle.didMount();
  assert.ok([...timers.values()].some(timer => timer.ms === 15000));
  page.setState({panel: 'tools'});
  page.renderVals();
  page.lifecycle.didUpdate();
  assert.ok(!timers.has(page._displayTimer), 'seller dialogs pause playback');
  page.lifecycle.willUnmount();
  assert.equal(timers.size, 0, 'unmount releases every playback timer');
}
console.log('Passed decoded image handoff, failure retention, slideshow timing and cleanup.');
