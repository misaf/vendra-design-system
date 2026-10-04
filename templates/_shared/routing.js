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
  route.demo=['loading','error'].includes(query.get('demo'))?query.get('demo'):undefined;
  if (route.view === 'product' && !VF_PRODUCTS.some(p => p.id === route.id || (p.id === 'ivory' && route.id === 'ivory-classic'))) route.view = 'notfound';
  if (route.view === 'shop') {
    route.cat = ['bouquets','boxes','orchids','bridal'].includes(route.cat) ? route.cat : 'all';
    route.sort = ['low','high'].includes(query.get('sort')) ? query.get('sort') : 'featured';
    const max=Math.ceil(Math.max(...VF_PRODUCTS.map(p=>p.price))/100000)*100000;
    const number=(key,fallback)=>{const v=query.get(key);return v!==null&&Number.isFinite(+v)?Math.max(0,Math.min(max,+v)):fallback;};
    route.min=number('min',0);route.max=Math.max(route.min,number('max',max));route.stock=query.get('stock')==='1';
    route.filters = [...new Set((query.get('filters') || '').split(',').filter(id => ['under3','same','roses'].includes(id)))].sort();
  }
  return route;
}
function vfRouteParams(route) {
  const query = new URLSearchParams(window.AG_SEO.routeParams(route));
  if(route.demo)query.set('demo',route.demo);
  if (route.view === 'shop') {
    if(route.min>0)query.set('min',route.min);
    const priceMax=Math.ceil(Math.max(...VF_PRODUCTS.map(p=>p.price))/100000)*100000;
    if(route.max!=null&&route.max<priceMax)query.set('max',route.max);
    if(route.stock)query.set('stock','1');
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
