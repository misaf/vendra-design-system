// Page behavior. Edit here, then run npm --prefix templates run build.
import {vfCopy} from './copy.js';
import {vfAccountLoad, vfAccountPhone} from '../_shared/account-data.js';
import {vfMobile} from '../_shared/delivery.js';
import {vfDirectionsUrl, vfLoadLeaflet, vfValidLocation} from '../_shared/location.js';
import {vfShell} from '../_shared/navigation.js';
import {VF_STORE} from '../_shared/store-config.js';
import {usePageLogic} from '../_shared/page-state.js';
import {useStorefrontPage} from '../_shared/page-lifecycle.js';
// A signed-in customer starts with their own name, mobile and email filled in.
function vfContactPrefill() {
  const phone = vfAccountPhone();
  if (!phone) return {};
  const {profile} = vfAccountLoad(phone);
  return {name: profile.name || '', phone, email: profile.email || ''};
}
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
// The checked fields in form order, with their ids.
const FIELDS = [
  ['phone', 'vf-cphone'],
  ['email', 'vf-cemail'],
  ['msg', 'vf-cmsg']
];

export function usePage(props) {
  const page = usePageLogic(props, page => {
    page.state = {
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
    // The studio replies by text or WhatsApp, so a mobile is needed unless the visitor leaves an email instead.
    page._invalid = () => {
      const s = page.state;
      const email = s.email.trim();
      return {
        phone: s.phone.trim() || !email ? !vfMobile(s.phone) : false,
        email: !!email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        msg: !s.msg.trim()
      };
    };
  });
  useStorefrontPage(page);
  return vals(page);
}

function vals(page) {
  const S = vfShell(page, 'contact');
  const s = page.state;
  const C = vfCopy(S);
  const invalid = page._invalid();
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
  const field = key => value => page.setState({[key]: value, apiError: ''});
  // The studio on a read-only map (PlacesMap), with the store's tiles and the vendored Leaflet.
  const placesView = {
    places,
    load: vfLoadLeaflet,
    tiles: {url: VF_STORE.map.tiles, attribution: VF_STORE.map.attribution},
    center: VF_STORE.map.center,
    zoom: VF_STORE.map.zoom,
    fail: () => page.setState({mapFailed: true})
  };
  return {
    ...S,
    placesView,
    t: {
      ...S.t,
      ...C,
      ...(!window.VF_API.live ? {okT: C.demoTitle, okP: C.demoBody} : {}),
      instagram: C.labels.instagram,
      editMessage: C.labels.returnToForm
    },
    // The channels the store has (VF_STORE): WhatsApp and Instagram rows go when they are null.
    rows: [
      ['map-pin', S.t.address],
      ['clock', S.t.hours],
      ['phone', '⁨' + S.phoneLabel + '⁩'],
      ['message-circle', S.waHref && '⁨' + S.phoneLabel + '⁩'],
      ['instagram', S.instagram && '⁨' + S.instagram.label + '⁩']
    ]
      .map(([icon, value], i) => ({icon, label: C.rowLabels[i], value}))
      .filter(row => row.value),
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
      page.setState({
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
    // After a failed send, what to fix in form order, each linking to its field.
    problems: s.submitted
      ? FIELDS.filter(([key]) => invalid[key]).map(([key, target]) => ({
          text: {phone: C.phoneErr, email: C.emailErr, msg: C.msgErr}[key],
          target
        }))
      : [],
    send: () => {
      page.setState({
        submitted: true
      });
      // One problem goes straight to its field; several go to the summary that lists them.
      const wrong = FIELDS.filter(([key]) => invalid[key]);
      if (wrong.length) {
        S.focus(wrong.length > 1 ? 'vf-contact-errors' : wrong[0][1]);
        return;
      }
      const success = () => {
        page.setState({
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
      page.setState({
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
          page.setState({
            busy: false,
            apiError: C.integrationError
          })
        );
    }
  };
}
