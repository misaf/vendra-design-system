// Storefront route registration, validation and links. Uses the core AG_SEO router.
const VF_ROUTES = ['account', 'bag', 'checkout', 'contact', 'faq', 'home', 'journal', 'notfound', 'policy', 'post', 'product', 'saved', 'search', 'shop', 'signin', 'track', 'weddings'];
const VF_ROUTE_EXTRA = {
  product: {
    id: 'ivory'
  },
  post: {
    post: 'morning-at-the-studio'
  }
};
// Keep template-only shopping parameters out of the core design-system router.
function vfReadRoute(search = location.search) {
  window.AG_SEO.register(...VF_ROUTES);
  const route = window.AG_SEO.readRoute(search), query = new URLSearchParams(search);
  if (route.view === 'product' && !VF_PRODUCTS.some(p => p.id === route.id || (p.id === 'ivory' && route.id === 'ivory-classic'))) route.view = 'notfound';
  if (route.view === 'shop') {
    route.cat = ['bouquets','boxes','orchids','bridal'].includes(route.cat) ? route.cat : 'all';
    route.sort = ['low','high'].includes(query.get('sort')) ? query.get('sort') : 'featured';
    route.filters = [...new Set((query.get('filters') || '').split(',').filter(id => ['under3','same','roses'].includes(id)))].sort();
  }
  return route;
}
function vfRouteParams(route) {
  const query = new URLSearchParams(window.AG_SEO.routeParams(route));
  if (route.view === 'shop') {
    if (route.cat === 'all') query.delete('cat');
    if (['low','high'].includes(route.sort)) query.set('sort', route.sort);
    const filters = (route.filters || []).filter(id => ['under3','same','roses'].includes(id));
    if (filters.length) query.set('filters', [...new Set(filters)].sort().join(','));
  }
  return '?' + query.toString();
}
function vfLinkHandler(go) {
  return window.AG_SEO.linkHandler((route, event) => go(vfReadRoute(new URL(event.currentTarget.href, location.href).search)));
}
function vfPageRoute(props) { return props.routeInfo || vfReadRoute(); }
