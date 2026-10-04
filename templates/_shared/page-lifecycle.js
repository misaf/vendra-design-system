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
      const h = document.querySelector('main h1');
      if (!h) return;
      const title = h.innerText.replace(/\s+/g, ' ').trim();
      if (title === this._vfTitle) return;
      this._vfTitle = title;
      window.AG_NAV.focusHeading();
      if (this.props.store && this.props.store.announce) this.props.store.announce(title);else this.setState({
        vfAnnouncement: title
      });
      const lang = this.props.lang === 'fa' ? 'fa' : 'en';
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
      document.documentElement.dataset.lang = lang;
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
