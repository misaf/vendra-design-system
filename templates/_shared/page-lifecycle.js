// Responsive state, heading focus, announcements and SEO for storefront pages.
// Shared lifecycle for standalone templates and pages inside the click-through site.
class VFPage extends DCLogic {
  componentDidMount() {
    this._vfMedia = window.matchMedia('(max-width:767px)');
    this._vfResize = () => this.setState({
      vfMobile: this._vfMedia.matches
    });
    this._vfMedia.addEventListener('change', this._vfResize);
    this._vfResize();
    const route=vfPageRoute(this.props);
    const event={product:'view_item',bag:'view_cart',checkout:'begin_checkout'}[this._vfPage];
    if(event)window.VF_TRACK.event(event,this._vfPage==='product'?{items:[window.VF_TRACK.item(vfProduct(route.id==='ivory-classic'?'ivory':route.id||'ivory'))]}:{});
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
      const h = document.querySelector('main h1');
      if (!h) return;
      const title = h.innerText.replace(/\s+/g, ' ').trim();
      if (title === this._vfTitle) return;
      this._vfTitle = title;
      // On the first view of a document, leave focus at the top so Tab reaches the
      // skip link and header; the browser already reads the new page. Only later
      // views (in-site navigation, a replaced h1) move focus and announce.
      if (window.VF_VIEWED) {
        window.AG_NAV.focusHeading();
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
}
