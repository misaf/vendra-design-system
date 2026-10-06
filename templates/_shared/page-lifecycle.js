// Responsive state, heading focus, announcements and SEO for storefront pages.
// Shared lifecycle for standalone templates and pages inside the click-through site.

// The tenant theme: ?tenant=<slug> for previews, otherwise this store's own (store-config.js).
function vfTenant() {
  const asked = new URLSearchParams(location.search).get('tenant');
  if (VF_TENANT_SLUGS.includes(asked)) return asked;
  return VF_TENANT_SLUGS.includes(VF_STORE.tenant) ? VF_STORE.tenant : 'default';
}

// A page's tenant: its own Theme setting when one is chosen, otherwise vfTenant().
function vfPageTenant(props) {
  const tenant = VF_TENANT_SLUGS.includes(props.tenant) ? props.tenant : vfTenant();
  vfApplyTenant(tenant);
  return tenant;
}

// Asks ds-base.js to load this tenant's stylesheet, and only that one. The loader
// arrives asynchronously, so whichever of the two runs second does the loading.
function vfApplyTenant(tenant) {
  if (window.VF_TENANT === tenant) return;
  window.VF_TENANT = tenant;
  if (window.VF_USE_TENANT) window.VF_USE_TENANT(tenant);
}
// The base class every storefront page extends. DCLogic is only handed to page logic
// by the runtime, so each page builds the class with `const VFPage = vfPageClass(DCLogic);`.
function vfPageClass(DCLogic) {
  // Start the request before the first render so the theme arrives with the page.
  vfApplyTenant(vfTenant());
  return class VFPage extends DCLogic {
    componentDidMount() {
      this._vfMedia = window.matchMedia('(max-width:767px)');
      this._vfResize = () => this.setState({
        vfMobile: this._vfMedia.matches
      });
      this._vfMedia.addEventListener('change', this._vfResize);
      this._vfResize();
      const route=vfPageRoute(this.props);
      const event={product:'view_item',bag:'view_cart',checkout:'begin_checkout'}[this._vfPage];
      if(event)window.VF_TRACK.event(event,this._vfPage==='product'?{items:[window.VF_TRACK.item(vfFindProduct(route.id)||VF_PRODUCTS[0])]}:{});
      this._vfAnnounce();
    }
    componentDidUpdate() {
      this._vfAnnounce();
    }
    componentWillUnmount() {
      this._vfMedia && this._vfMedia.removeEventListener('change', this._vfResize);
      clearTimeout(this._vfTimer);
    }
    _vfAnnounce() {
      clearTimeout(this._vfTimer);
      this._vfTimer = setTimeout(() => {
        // Language and direction never wait for a heading (loading states have none).
        const lang = this.props.lang === 'fa' ? 'fa' : 'en';
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
        document.documentElement.dataset.lang = lang;
        const h = /** @type {HTMLElement} */ (document.querySelector('main h1'));
        if (!h) return;
        const title = h.innerText.replace(/\s+/g, ' ').trim();
        if (title === this._vfTitle) return;
        this._vfTitle = title;
        // On the first view of a document, leave focus at the top so Tab reaches the
        // skip link and header; the browser already reads the new page. Only later
        // views (in-site navigation, a replaced h1) move focus and announce.
        if (window.VF_VIEWED) {
          // A form field the page has just focused (e.g. "Track another order") keeps focus; the heading is still announced.
          const field = document.activeElement && document.activeElement.closest('main') && document.activeElement.matches('input, select, textarea');
          if (!field) window.AG_NAV.focusHeading();
          if (this.props.store && this.props.store.announce) this.props.store.announce(title);else this.setState({
            vfAnnouncement: title
          });
        }
        window.VF_VIEWED = true;
        const url = location.href;
        window.AG_SEO.syncHead({
          title: title + ' · ' + VF_SHELL[lang].brand,
          description: title,
          url,
          locale: lang,
          noindex: window.AG_SEO.isNoindex(this._vfPage) || this._vfPage === 'signin',
          alternates: Object.fromEntries(['en','fa'].map(lang => [lang,
            (this.props.go ? '' : '../storefront-site/StorefrontSite.dc.html') + vfRouteParams({...VF_ROUTE_EXTRA[this._vfPage], ...vfPageRoute(this.props),view:this._vfPage,lang})]))
        });
      }, 40);
    }
  };
}
