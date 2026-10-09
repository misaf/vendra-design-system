// Page behavior. Edit here, then run npm --prefix templates run build.
// A signed-in customer starts with their own name, mobile and email filled in.
function vfContactPrefill() {
  const phone = vfAccountPhone();
  if (!phone) return {};
  const {profile} = vfAccountLoad(phone);
  return {name: profile.name || '', phone, email: profile.email || ''};
}
class Component extends VFPage {
  state = {
    sent: false,
    email: '',
    apiError: '',
    busy: false,
    msg: '',
    name: '',
    phone: '',
    submitted: false,
    mapFailed: false,
    ...vfContactPrefill()
  };
  renderVals() {
    const S = vfShell.call(this, this.props, 'contact');
    const s = this.state;
    const C = vfCopy(S);
    const invalid = this._invalid();
    const studio = VF_STORE.studio;
    const directions = vfValidLocation(studio) ? vfDirectionsUrl(studio) : '';
    const places = directions
      ? [
          {
            id: 'studio',
            label: VF_STORE.brand[S.lang],
            title: C.directionsTo,
            location: studio,
            onSelect: () => window.open(directions, '_blank', 'noopener')
          }
        ]
      : [];
    const field = key => e => this.setState({[key]: e.target.value, apiError: ''});
    // The studio on a read-only map (PlacesMap), with the store's tiles and the vendored Leaflet.
    const placesView = {
      places,
      load: vfLoadLeaflet,
      tiles: {url: VF_STORE.map.tiles, attribution: VF_STORE.map.attribution},
      center: VF_STORE.map.center,
      zoom: VF_STORE.map.zoom,
      fail: () => this.setState({mapFailed: true})
    };
    return {
      ...S,
      placesView,
      t: {
        ...S.t,
        ...C,
        instagram: C.labels.instagram,
        editMessage: C.labels.returnToForm
      },
      rows: ['map-pin', 'clock', 'phone', 'message-circle', 'instagram'].map((icon, i) => ({
        icon,
        label: C.rowLabels[i],
        value:
          i === 0
            ? S.t.address
            : i === 1
              ? S.t.hours
              : '⁨' + [S.phoneLabel, S.phoneLabel, S.instagram.label][i - 2] + '⁩'
      })),
      studioMap: !!directions && !s.mapFailed,
      hasDirections: !!directions,
      directions,
      apiError: s.apiError,
      busy: s.busy,
      email: s.email,
      setEmail: field('email'),
      emailErr: s.submitted && invalid.email ? C.emailErr : undefined,
      sent: s.sent,
      notSent: !s.sent,
      editMessage: () => {
        this.setState({
          sent: false
        });
        S.focus('vf-cmsg');
      },
      name: s.name,
      phone: s.phone,
      setName: field('name'),
      setPhone: field('phone'),
      phoneHint: C.phoneHint,
      phoneErr: s.submitted && invalid.phone ? C.phoneErr : undefined,
      msg: s.msg,
      setMsg: field('msg'),
      msgErr: s.submitted && invalid.msg ? C.msgErr : undefined,
      send: () => {
        this.setState({
          submitted: true
        });
        const first = ['phone', 'email', 'msg'].find(k => invalid[k]);
        if (first) {
          S.focus({phone: 'vf-cphone', email: 'vf-cemail', msg: 'vf-cmsg'}[first]);
          return;
        }
        const success = () => {
          this.setState({
            sent: true,
            busy: false,
            apiError: '',
            submitted: false
          });
          S.focus('vf-contact-success');
        };
        if (!window.VF_API.live) {
          success();
          return;
        }
        this.setState({
          busy: true,
          apiError: ''
        });
        return window.VF_API.inquiry({
          name: s.name.trim(),
          phone: s.phone ? vfMobile(s.phone) : null,
          email: s.email.trim(),
          message: s.msg.trim(),
          occasion: 'contact',
          preferredLocale: window.VF_API.preferredLocale()
        })
          .then(success)
          .catch(() =>
            this.setState({
              busy: false,
              apiError: C.integrationError
            })
          );
      }
    };
  }
  // The studio replies by text or WhatsApp, so a mobile is needed unless the visitor leaves an email instead.
  _invalid() {
    const s = this.state;
    const email = s.email.trim();
    return {
      phone: s.phone.trim() || !email ? !vfMobile(s.phone) : false,
      email: !!email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      msg: !s.msg.trim()
    };
  }
}
