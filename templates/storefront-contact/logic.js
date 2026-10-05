// Page behavior. Edit here, then run npm --prefix templates run build.
const VF_CONTACT_TOPICS = ['order', 'weddings', 'corporate', 'other'];
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
    topic: 'order',
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
    this._places = directions ? [{
      id: 'studio',
      label: VF_STORE.brand[S.lang],
      title: C.directionsTo,
      location: studio,
      pick: () => window.open(directions, '_blank', 'noopener')
    }] : [];
    const field = key => e => this.setState({[key]: e.target.value, apiError: ''});
    return {
      ...S,
      t: {
        ...S.t,
        ...C,
        instagram: C.labels.instagram,
        editMessage: C.labels.returnToForm
      },
      rows: ['map-pin', 'clock', 'phone', 'message-circle', 'instagram'].map((icon, i) => ({
        icon,
        label: C.rowLabels[i],
        value: i === 0 ? S.t.address : i === 1 ? S.t.hours : '⁨' + [S.phoneLabel, S.phoneLabel, S.instagram.label][i - 2] + '⁩'
      })),
      studioMap: !!directions && !s.mapFailed,
      hasDirections: !!directions,
      directions,
      topics: VF_CONTACT_TOPICS.map((value, i) => ({value, label: C.topics[i]})),
      topic: s.topic,
      setTopic: field('topic'),
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
          phone: s.phone ? vfPhone(s.phone) : '',
          email: s.email.trim(),
          topic: s.topic,
          message: s.msg.trim(),
          occasion: 'contact',
          preferredLocale: window.VF_API.preferredLocale()
        }).then(success).catch(() => this.setState({
          busy: false,
          apiError: C.integrationError
        }));
      }
    };
  }
  // The studio replies by text or WhatsApp, so a mobile is needed unless the visitor leaves an email instead.
  _invalid() {
    const s = this.state;
    const email = s.email.trim();
    return {
      phone: s.phone.trim() || !email ? !/^09\d{9}$/.test(vfPhone(s.phone)) : false,
      email: !!email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      msg: !s.msg.trim()
    };
  }
  _studioMap() {
    if (!this._studioView) this._studioView = vfPlacesMap({
      id: 'vf-contact-map',
      places: () => this._places || [],
      onFail: () => this.setState({mapFailed: true})
    });
    return this._studioView;
  }
  componentDidMount() {
    super.componentDidMount();
    this._studioMap().sync();
  }
  componentDidUpdate() {
    super.componentDidUpdate();
    this._studioMap().sync();
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    this._studioMap().remove();
  }
}
