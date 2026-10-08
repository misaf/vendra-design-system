// Storefront route registration, validation and links. Uses the core AG_SEO router.
const VF_ROUTES = [
  'account',
  'bag',
  'checkout',
  'contact',
  'faq',
  'home',
  'journal',
  'notfound',
  'policy',
  'post',
  'product',
  'saved',
  'search',
  'shop',
  'signin',
  'track',
  'weddings'
];
// Policy documents, opened as ?view=policy&id=<doc>; no id shows the first.
const VF_POLICIES = ['shipping', 'returns', 'privacy', 'terms'];
// Account tabs, in the order they appear.
const VF_ACCOUNT_TABS = ['orders', 'balance', 'saved', 'addresses', 'reminders', 'profile'];
const VF_ROUTE_EXTRA = {
  product: {
    id: 'VF-7K2M4Q',
    cat: 'boxes'
  },
  post: {
    post: 'morning-at-the-studio'
  }
};
// Keep template-only shopping parameters out of the core design-system router.
function vfReadRoute(search = location.search) {
  window.AG_SEO.register(...VF_ROUTES);
  const route = window.AG_SEO.readRoute(search),
    query = new URLSearchParams(search);
  route.demo = ['loading', 'error'].includes(query.get('demo')) ? query.get('demo') : undefined;
  // The bag is two checkout steps: the bag itself, then delivery details (?view=bag&step=delivery).
  if (route.view === 'bag') route.step = query.get('step') === 'delivery' ? 'delivery' : 'bag';
  // An account tab can be linked to (?view=account&tab=balance).
  if (route.view === 'account' && VF_ACCOUNT_TABS.includes(query.get('tab')))
    route.tab = query.get('tab');
  // Sign-in started from checkout returns there (?view=signin&next=delivery).
  if (route.view === 'signin' && query.get('next') === 'delivery') route.next = 'delivery';
  // A product is addressed by its category and code (?view=product&id=VF-7K2M4Q&cat=boxes); an old slug
  // (?id=ivory) or a code typed in another case still opens it, and the link is written back in full.
  if (route.view === 'product') {
    const product = vfFindProduct(route.id);
    if (product) {
      route.id = product.id;
      route.cat = product.cat;
    } else route.view = 'notfound';
  }
  if (route.view === 'policy' && route.id && !VF_POLICIES.includes(route.id))
    route.view = 'notfound';
  if (route.view === 'shop') {
    route.cat = ['bouquets', 'boxes', 'orchids', 'bridal'].includes(route.cat) ? route.cat : 'all';
    route.sort = ['low', 'high'].includes(query.get('sort')) ? query.get('sort') : 'featured';
    const max = Math.ceil(Math.max(...VF_PRODUCTS.map(p => p.price)) / 100000) * 100000;
    const number = (key, fallback) => {
      const v = query.get(key);
      return v !== null && Number.isFinite(+v) ? Math.max(0, Math.min(max, +v)) : fallback;
    };
    route.min = number('min', 0);
    route.max = Math.max(route.min, number('max', max));
    route.stock = query.get('stock') === '1';
    route.filters = [
      ...new Set(
        (query.get('filters') || '')
          .split(',')
          .filter(id => ['under3', 'same', 'roses'].includes(id))
      )
    ].sort();
    route.occasion = VF_SHOP_OCCASIONS.includes(query.get('occasion'))
      ? query.get('occasion')
      : 'all';
    // An ISO delivery day (?date=2026-10-09); the shop ignores days that are not open.
    route.date = /^\d{4}-\d{2}-\d{2}$/.test(query.get('date') || '') ? query.get('date') : '';
  }
  return route;
}
function vfRouteParams(route) {
  const query = new URLSearchParams(window.AG_SEO.routeParams(route));
  if (route.demo) query.set('demo', route.demo);
  if (route.view === 'bag' && route.step === 'delivery') query.set('step', 'delivery');
  if (route.view === 'signin' && route.next === 'delivery') query.set('next', 'delivery');
  if (route.view === 'account' && route.tab && route.tab !== 'orders') query.set('tab', route.tab);
  if (route.view === 'shop') {
    if (route.min > 0) query.set('min', route.min);
    const priceMax = Math.ceil(Math.max(...VF_PRODUCTS.map(p => p.price)) / 100000) * 100000;
    if (route.max != null && route.max < priceMax) query.set('max', route.max);
    if (route.stock) query.set('stock', '1');
    if (route.cat === 'all') query.delete('cat');
    if (['low', 'high'].includes(route.sort)) query.set('sort', route.sort);
    const filters = (route.filters || []).filter(id => ['under3', 'same', 'roses'].includes(id));
    if (filters.length) query.set('filters', [...new Set(filters)].sort().join(','));
    if (VF_SHOP_OCCASIONS.includes(route.occasion)) query.set('occasion', route.occasion);
    if (route.date) query.set('date', route.date);
  }
  return '?' + query.toString();
}
function vfLinkHandler(go) {
  return window.AG_SEO.linkHandler((route, event) =>
    go(vfReadRoute(new URL(event.currentTarget.href, location.href).search))
  );
}
function vfPageRoute(props) {
  return props.routeInfo || vfReadRoute();
}
