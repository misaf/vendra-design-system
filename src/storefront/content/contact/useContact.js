// Page behavior. Edit here, then run npm run build.
import React from 'react';
import {VF_NAV} from '../../../platform/browser/page-focus.js';
import {vfCopy} from './copy.js';
import {vfAccountLoad, vfAccountPhone} from '../../customer/account-data.js';
import {mobile as vfMobile} from '../../../design-system/utils/input.js';
import {vfLoadLeaflet} from '../../../platform/browser/integrations/leaflet.js';
import {vfDirections} from '../../delivery/location.js';
import {vfShell} from '../../shell/shell-props.js';
import {VF_STORE, vfLiveStore} from '../../store/store-config.js';
import {vfHoursNotices, vfHoursText, vfOpeningStatus} from '../../store/store-hours.js';
import {usePageLogic} from '../../shell/page-state.js';
import {vfNow} from '../../../platform/browser/environment.js';
import {useStorefrontPage} from '../../shell/page-lifecycle.js';
import {vfFloristData} from '../../shell/structured-data.js';
import {vfInquiryFailure} from '../../../platform/browser/integrations/api-errors.js';
import {vfRuntime} from '../../../platform/browser/runtime.js';
// A signed-in customer starts with their own name, mobile and email filled in.
function vfContactPrefill() {
  const phone = vfAccountPhone();
  if (!phone) return {};
  const {profile} = vfAccountLoad(phone);
  return {name: profile.name || '', phone, email: profile.email || ''};
}
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
const FIELDS = [
  ['name', 'vf-cname'],
  ['phone', 'vf-cphone'],
  ['email', 'vf-cemail'],
  ['msg', 'vf-cmsg']
];

export function useContact(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      sent: false,
      email: '',
      apiError: '',
      apiFields: {},
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
  const [, refreshHours] = React.useReducer(tick => tick + 1, 0);
  useStorefrontPage(page, 'contact', {
    structuredData: [vfFloristData(props.lang === 'fa' ? 'fa' : 'en')]
  });
  React.useEffect(() => {
    // Read the profile after the storefront has restored the browser session.
    page.setState(vfContactPrefill());
    const interval = setInterval(refreshHours, 60_000);
    return () => clearInterval(interval);
  }, [page]);
  return vals(page);
}

function vals(page) {
  const S = vfShell(page, 'contact');
  const s = page.state;
  const C = vfCopy(S);
  const invalid = page._invalid();
  const studio = VF_STORE.studio;
  const now = vfNow();
  // Neshan, Balad and Google Maps, in the order the page's language prefers; the map pin opens the first.
  const directions = vfDirections(studio, S.lang);
  const places = directions.length
    ? [
        {
          id: 'studio',
          label: VF_STORE.brand[S.lang],
          title: C.directionsTo,
          location: studio,
          onSelect: () => window.open(directions[0].href, '_blank', 'noopener')
        }
      ]
    : [];
  const localErrors = Object.fromEntries(
    FIELDS.filter(([key]) => s.submitted && invalid[key]).map(([key]) => [key, C[key + 'Err']])
  );
  const fieldErrors = {...localErrors, ...s.apiFields};
  const problems = FIELDS.filter(([key]) => fieldErrors[key]).map(([key, target]) => ({
    text: fieldErrors[key],
    target
  }));
  const field = key => value =>
    page.setState(current => {
      const apiFields = {...current.apiFields};
      delete apiFields[key];
      return {[key]: value, apiFields};
    });
  // The studio on a read-only map (PlacesMap), with the store's tiles.
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
      ...(!vfLiveStore() ? {okT: C.demoTitle, okP: C.demoBody} : {}),
      instagram: C.labels.instagram,
      editMessage: C.labels.returnToForm
    },
    // The channels the store has (VF_STORE): WhatsApp and Instagram rows go when they are null.
    // The address with how to find the door; the weekly hours with today's status and any special
    // hours in the next two weeks, all on the store's clock.
    rows: [
      ['map-pin', S.t.address, {details: VF_STORE.findUs ? [VF_STORE.findUs[S.lang]] : []}],
      [
        'clock',
        vfHoursText(S.lang),
        {status: vfOpeningStatus(S.lang, now), details: vfHoursNotices(S.lang, now)}
      ],
      ['phone', '⁨' + S.phoneLabel + '⁩'],
      ['message-circle', S.waHref && '⁨' + S.phoneLabel + '⁩'],
      ['instagram', S.instagram && '⁨' + S.instagram.label + '⁩']
    ]
      .map(([icon, value, extra], i) => ({
        icon,
        label: C.rowLabels[i],
        value,
        .../** @type {{status?: {open: boolean, text: string}, details?: string[]}} */ (extra || {})
      }))
      .filter(row => row.value),
    studioMap: directions.length > 0 && !s.mapFailed,
    hasDirections: directions.length > 0,
    directions,
    apiError: s.apiError,
    busy: s.busy,
    email: s.email,
    setEmail: field('email'),
    emailErr: fieldErrors.email,
    sent: s.sent,
    notSent: !s.sent,
    editMessage: () => {
      page.setState({
        sent: false
      });
      VF_NAV.focusById('vf-cmsg');
    },
    name: s.name,
    nameErr: fieldErrors.name,
    phone: s.phone,
    setName: field('name'),
    setPhone: field('phone'),
    phoneHint: C.phoneHint,
    phoneErr: fieldErrors.phone,
    msg: s.msg,
    setMsg: field('msg'),
    msgErr: fieldErrors.msg,
    // After a failed send, what to fix in form order, each linking to its field.
    problems,
    send: () => {
      page.setState({
        submitted: true
      });
      // One problem goes straight to its field; several go to the summary that lists them.
      const wrong = FIELDS.filter(([key]) => invalid[key]);
      if (wrong.length) {
        VF_NAV.focusById(wrong.length > 1 ? 'vf-contact-errors' : wrong[0][1]);
        return;
      }
      const success = () => {
        page.setState({
          sent: true,
          busy: false,
          apiFields: {},
          apiError: '',
          submitted: false
        });
        VF_NAV.focusById('vf-contact-success');
      };
      if (!vfRuntime.api.live) {
        success();
        return;
      }
      page.setState({
        busy: true,
        apiFields: {},
        apiError: ''
      });
      return vfRuntime.api
        .inquiry({
          name: s.name.trim(),
          phone: s.phone ? vfMobile(s.phone) : null,
          email: s.email.trim(),
          message: s.msg.trim(),
          occasion: 'contact',
          preferredLocale: vfRuntime.api.preferredLocale()
        })
        .then(success)
        .catch(error => {
          const {fields, apiError} = vfInquiryFailure(error, S.lang);
          const wrong = FIELDS.filter(([key]) => fields[key]);
          page.setState({busy: false, apiFields: fields, apiError});
          VF_NAV.focusById(
            wrong.length > 1 ? 'vf-contact-errors' : wrong[0]?.[1] || 'vf-contact-api-error'
          );
        });
    }
  };
}
