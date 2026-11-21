import assert from 'node:assert/strict';
import {test} from 'node:test';
import {routeHead} from '../src/app/_routing/route-head.mjs';
import {vfServerRender} from '../src/platform/browser/environment.js';
import {vfInApp, vfReadRoute, vfRouteUrl} from '../src/storefront/shell/routing.js';
import {VF_STORE} from '../src/storefront/store/store-config.js';
import {storefrontRoutes} from '../tools/build/routes.mjs';

const origin = 'https://shop.example';
const base = '/vendra-design-system/';
const cases = [
  ['index.html', ''],
  [
    'fa/shop/boxes/?page=2&sort=high&filters=roses,ready,roses,unknown&stock=1&min=100000&max=500000&occasion=birthday&date=2028-02-29&demo=loading',
    'fa/shop/boxes/?demo=loading&min=100000&max=500000&stock=1&sort=high&filters=ready%2Croses&occasion=birthday&date=2028-02-29&page=2'
  ],
  ['en/shop/?date=2027-02-29&page=001&sort=featured', 'en/shop/'],
  [
    'en/product/ivory/?qty=2&size=generous&addons=invalid&date=2028-02-29',
    'en/product/VF-7K2M4Q/?date=2028-02-29&qty=2&size=generous'
  ],
  ['en/journal/care/', 'en/journal/bouquet-last-longer/'],
  ['en/journal/?page=2', 'en/journal/?page=2'],
  ['en/moment/123/', 'en/moment/123/'],
  ['en/track/VB-10491/', 'en/track/VB-10491/'],
  ['fa/search/?q=گل%20%20', 'fa/search/?q=%DA%AF%D9%84++'],
  ['fa/bag/?lines=VF-7K2M4Q.2&step=delivery', 'fa/bag/?step=delivery&lines=VF-7K2M4Q.2'],
  ['en/saved/?ids=VF-7K2M4Q,VF-ABC123', 'en/saved/?ids=VF-7K2M4Q%2CVF-ABC123'],
  ['fa/signin/?next=delivery', 'fa/signin/?next=delivery'],
  ['en/account/?next=checkout&tab=balance', 'en/account/?tab=balance&next=checkout'],
  [
    'en/checkout/?result=paid&order=VB-10491&payment=return',
    'en/checkout/?payment=return&order=VB-10491&result=paid'
  ],
  [
    'en/checkout/?payment=return&order=VB-10491',
    'en/checkout/?payment=return&order=VB-10491&result=pending'
  ]
];

test('storefront URLs round trip at the root and under the export base', () => {
  for (const prefix of ['/', base]) {
    vfServerRender({url: prefix + 'en/', base: prefix, origin});
    try {
      for (const [address, expected] of cases) {
        const route = vfReadRoute(prefix + address);
        const formatted = vfRouteUrl(route);
        assert.equal(formatted, prefix + expected, address);
        assert.deepEqual(vfReadRoute(origin + formatted), route, address);
      }
      assert.equal(vfInApp('shop/boxes/'), true);
      assert.equal(vfInApp('https://other.example' + prefix + 'en/'), false);
      assert.equal(vfInApp(prefix + 'en/file.txt'), false);
      assert.equal(vfReadRoute(prefix + 'fa/moment/abc/').view, 'notfound');
      assert.equal(vfReadRoute(prefix + 'fa/product/').lang, 'fa');
      assert.equal(vfReadRoute(prefix + 'fa/product/').view, 'notfound');
      assert.equal(vfReadRoute(prefix + 'en/policy/privacy/extra/').view, 'notfound');
    } finally {
      vfServerRender(null);
    }
  }
});

test('route parsing respects the languages and features offered by the store', () => {
  const {features, languages} = VF_STORE;
  vfServerRender({url: base + 'fa/', base, origin});
  try {
    VF_STORE.languages = ['en'];
    VF_STORE.features = features.filter(
      feature => !['journal', 'weddings', 'sameDay', 'reminders'].includes(feature)
    );
    assert.equal(vfReadRoute(base + 'fa/').lang, 'en');
    assert.equal(vfReadRoute(base + 'fa/journal/care/').view, 'notfound');
    assert.equal(vfReadRoute(base + 'fa/weddings/').view, 'notfound');
    assert.deepEqual(vfReadRoute(base + 'fa/shop/?filters=same,roses').filters, ['roses']);
    assert.equal(vfReadRoute(base + 'fa/account/?tab=reminders').tab, undefined);
    assert.ok(storefrontRoutes().every(({path}) => !/^en\/(journal|weddings)\//.test(path)));
  } finally {
    VF_STORE.features = features;
    VF_STORE.languages = languages;
    vfServerRender(null);
  }
});

test('the export manifest and canonical metadata share the same paths under the base', () => {
  const rootRoutes = storefrontRoutes();
  vfServerRender({url: base, base, origin});
  try {
    assert.deepEqual(storefrontRoutes(), rootRoutes);
  } finally {
    vfServerRender(null);
  }
  for (const {path, indexed} of rootRoutes) {
    if (!indexed) continue;
    const {tags} = routeHead(path, {base, origin});
    assert.equal(tags.links.find(link => link.rel === 'canonical')?.href, origin + base + path);
  }
});
