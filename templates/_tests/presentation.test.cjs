const assert = require('node:assert/strict');
const vm = require('node:vm');
const {sharedLogic, pageScript} = require('./page-script.cjs');
function presentation(settings = {}) {
  const timers = new Map();
  let timerId = 0;
  const ctx = {
    URL,
    URLSearchParams,
    history: {state: null, replaceState() {}},
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
    addEventListener() {},
    removeEventListener() {},
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

{
  const {page} = presentation({
    displayCollection: 'selected',
    displayIds: ['VF-8RD5WN', 'unknown', 'VF-7K2M4Q', 'VF-8RD5WN']
  });
  assert.deepEqual(Array.from(page.state.settings.displayIds), ['VF-8RD5WN', 'VF-7K2M4Q']);
  assert.equal(page.renderVals().displayProduct.id, 'VF-8RD5WN');
  page.renderVals().setQ('7k2');
  assert.equal(
    page.renderVals().displayProduct.id,
    'VF-8RD5WN',
    'customer searches do not change the saved collection'
  );
  page.setState({shortlist: ['VF-4CJ6ZB']});
  assert.equal(
    page.renderVals().displayProduct.id,
    'VF-8RD5WN',
    'customer shortlist changes do not change the saved collection'
  );
  page.renderVals().useShortlist();
  assert.equal(page.renderVals().displayProduct.id, 'VF-4CJ6ZB');
}
{
  const {page} = presentation({displayCollection: 'category', displayCategory: 'boxes'});
  assert.equal(page.renderVals().displayProduct.id, 'VF-7K2M4Q');
  page.renderVals().nextDisplay();
  const next = page.renderVals().preloadProducts[0];
  assert.equal(next.id, 'VF-4CJ6ZB');
  page.renderVals().displayLoaded(next.imageKey);
  assert.equal(page.renderVals().displayProduct.id, 'VF-4CJ6ZB');
}
{
  const {page} = presentation({
    displayCollection: 'selected',
    displayIds: ['VF-6MT3VY', 'VF-8RD5WN', 'VF-7K2M4Q'],
    readyOnly: true,
    hideSoldOut: true
  });
  assert.equal(page.renderVals().displayProduct.id, 'VF-8RD5WN');
  assert.equal(page.renderVals().preloadProducts[0].id, 'VF-8RD5WN');
  page.renderVals().setDisplayCollection('selected');
  page
    .renderVals()
    .collectionProducts.find(product => product.id === 'VF-8RD5WN')
    .toggle(false);
  assert.equal(
    page.renderVals().displayProduct,
    null,
    'an empty eligible collection never falls back to unrelated designs'
  );
}
console.log('Passed curated collections, category loops, validation and customer-state isolation.');

{
  const {page} = presentation();
  page.renderVals().nextDisplay();
  page.renderVals().displayFailed(page.renderVals().preloadProducts[0].imageKey);
  assert.equal(page.state.displayIndex, 0);
  assert.equal(page.state.displayIssue, true);
  page.renderVals().retryDisplay();
  assert.equal(page.state.displayIndex, 0, 'retry never changes the product on screen');
  assert.equal(page.state.displayIssue, false);
  assert.equal(page.state.failedImageKeys.length, 0);
}
console.log('Passed quiet image failure and recovery state.');

{
  const {page} = presentation({displayMode: 'tv'});
  page.renderVals().nextDisplay();
  page.renderVals().displayFailed(page.renderVals().preloadProducts[0].imageKey);
  page.renderVals().nextDisplay();
  assert.equal(page.state.pendingIndex, 2, 'a bad image is skipped until its retry window');
  page.renderVals().previousDisplay();
  assert.equal(page.state.pendingIndex, 5, 'a reverse gesture cancels a slow replacement');
  page.renderVals().retryDisplay();
  assert.equal(page._displayFailures.size, 0, 'seller retry clears backoff');
}
console.log('Passed failed-photo skipping, bounded retry and pending navigation cancellation.');

{
  const {page} = presentation({
    displayCollection: 'selected',
    displayIds: ['VF-6MT3VY'],
    captionMode: 'code'
  });
  assert.equal(page.renderVals().displayProduct.soldOut, true);
  page.renderVals().setCaptionMode('photo');
  assert.equal(
    page.renderVals().displayProduct,
    null,
    'photo-only mode excludes unavailable designs that cannot be labelled'
  );
}

{
  const {page} = presentation({pin: '1234', displayMode: 'tv'});
  page.renderVals().viewer[0].addToOrder();
  page.setState({shortlist: ['VF-7K2M4Q']});
  page.renderVals().setCollectionName('Winter window');
  page.renderVals().saveCollection();
  assert.equal(page.state.collections.length, 1);
  assert.equal(page.state.collections[0].settings.pin, undefined);
  page.renderVals().exportSetup();
  const exported = JSON.parse(page.state.transferText);
  assert.equal(exported.settings.pin, undefined);
  assert.equal(exported.settings.order, undefined);
  assert.equal(exported.settings.shortlist, undefined);
  page.renderVals().setTransferText(
    JSON.stringify({
      version: 1,
      settings: {displayMode: 'tablet', pin: '0000', order: ['private']}
    })
  );
  page.renderVals().importSetup();
  assert.equal(page.state.settings.pin, '1234', 'imports never replace this device PIN');
  assert.equal(page.state.settings.displayMode, 'tablet');
  page.renderVals().loadCollection('Winter window');
  assert.equal(page.state.settings.displayMode, 'tv');
  assert.equal(page.state.settings.pin, '1234');
  page.renderVals().setTransferText('{"version":99}');
  page.renderVals().importSetup();
  assert.equal(page.state.transferError, true);
  page.renderVals().deleteCollection();
  assert.equal(page.state.collections.length, 0);
}
console.log('Passed named collections and configuration transfer without PIN or customer data.');
