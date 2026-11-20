import assert from 'node:assert/strict';
import vm from 'node:vm';
import {sharedLogic, pageScript} from '../../../tests/page-script.mjs';
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
    location: {
      pathname: '/',
      search: '',
      href: 'http://localhost/'
    },
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
  vm.runInContext(sharedLogic + pageScript('counter') + '\nthis.Logic=Component;', ctx);
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
  assert.equal(timers.size, 0, 'seller dialogs pause playback');
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
  assert.equal(
    page.renderVals().preloadProducts.length,
    0,
    'background preloads also respect the failed-photo backoff'
  );
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
  page.renderVals().displayLoaded(page.renderVals().preloadProducts[0].imageKey);
  page.renderVals().nextDisplay();
  page.renderVals().displayLoaded(page.renderVals().preloadProducts[0].imageKey);
  page.renderVals().nextDisplay();
  assert.equal(page.state.pendingIndex, 1, 'seller retry allows a previously skipped photo again');
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
  page
    .renderVals()
    .setTransferText(JSON.stringify({version: 1, settings: {displayMode: 'invalid'}}));
  page.renderVals().importSetup();
  assert.equal(
    page.state.transferError,
    true,
    'invalid preference values are rejected without changing settings'
  );
  assert.equal(page.state.settings.displayMode, 'tv');
  page.renderVals().setTransferText('{"version":99}');
  page.renderVals().importSetup();
  assert.equal(page.state.transferError, true);
  page.renderVals().deleteCollection();
  assert.equal(page.state.collections.length, 0);
}
console.log('Passed named collections and configuration transfer without PIN or customer data.');

{
  const {page, ctx, timers} = presentation();
  const video = {srcObject: null, play: async () => {}};
  const firstPermission = Promise.withResolvers();
  const firstRead = Promise.withResolvers();
  const streams = [0, 1, 2].map(() => ({
    stopped: 0,
    getTracks() {
      return [{stop: () => this.stopped++}];
    }
  }));
  const permissions = [
    firstPermission.promise,
    Promise.resolve(streams[1]),
    Promise.resolve(streams[2])
  ];
  const reads = [firstRead.promise, Promise.resolve([])];
  ctx.document.getElementById = () => video;
  ctx.navigator.mediaDevices = {getUserMedia: () => permissions.shift()};
  ctx.window.BarcodeDetector = class {
    detect() {
      return reads.shift();
    }
  };
  const flush = () => new Promise(resolve => setImmediate(resolve));
  page.lifecycle.didMount();

  page.renderVals().openScan();
  page.renderVals().closePanel();
  page.renderVals().openScan();
  await flush();
  assert.equal(video.srcObject, streams[1]);
  firstPermission.resolve(streams[0]);
  await flush();
  assert.equal(streams[0].stopped, 1, 'a late permission result releases its own stream');
  assert.equal(video.srcObject, streams[1], 'the reopened camera keeps its stream');

  page.setState({panel: 'tools'});
  page.lifecycle.didUpdate();
  assert.equal(streams[1].stopped, 1, 'leaving scan through another panel stops the camera');
  assert.equal(video.srcObject, null);
  page.renderVals().openScan();
  await flush();
  const activeTimers = [...timers.keys()];
  assert.equal(activeTimers.length, 1, 'the reopened scanner schedules one read');
  firstRead.resolve([{rawValue: 'VF-8RD5WN'}]);
  await flush();
  assert.equal(page.state.panel, 'scan', 'a late QR result cannot close the reopened scanner');
  assert.equal(page.state.open, null);
  assert.equal(video.srcObject, streams[2]);
  assert.deepEqual(
    [...timers.keys()],
    activeTimers,
    'a stale detector cannot schedule another read'
  );

  page.lifecycle.willUnmount();
  assert.equal(streams[2].stopped, 1);
  assert.equal(video.srcObject, null);
  assert.equal(timers.size, 0, 'unmount cancels the scan timer');
}
console.log(
  'Passed camera cleanup across delayed permissions, panel changes and stale QR results.'
);
