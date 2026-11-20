// Page behavior. Edit here, then run npm run build.
import {vfCopy} from './copy.js';
import {VF_PRODUCT_PLACEHOLDER} from '../../catalog/catalog.js';
import {vfMobile} from '../../delivery/delivery.js';
import {vfShell} from '../../shell/navigation.js';
import {usePageLogic} from '../../shell/page-state.js';
import {vfAssetBase, vfNow} from '../../../platform/browser/environment.js';
import {vfLiveStore} from '../../store/store-config.js';
import {useStorefrontPage} from '../../shell/page-lifecycle.js';
import {vfInquiryFailure} from '../../../platform/browser/integrations/api-errors.js';
import {vfRuntime} from '../../../platform/browser/runtime.js';
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
const FIELDS = [
  ['name', 'vf-wname'],
  ['email', 'vf-wemail'],
  ['phone', 'vf-wphone'],
  ['msg', 'vf-wmsg']
];

export function useWeddings(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      sent: false,
      email: '',
      apiError: '',
      apiFields: {},
      busy: false,
      name: '',
      phone: '',
      e1: false,
      e2: false,
      guests: '',
      wDate: '',
      notes: '',
      type: '',
      budget: ''
    };
  });
  useStorefrontPage(page);
  return vals(page);
}

function vals(page) {
  const S = vfShell(page, 'weddings');
  const s = page.state;
  const C = vfCopy(S);
  const localErrors = {name: s.e1 ? C.nameErr : undefined, phone: s.e2 ? C.phoneErr : undefined};
  const fieldErrors = {...localErrors, ...s.apiFields};
  const problems = FIELDS.filter(([key]) => fieldErrors[key]).map(([key, target]) => ({
    text: fieldErrors[key],
    target
  }));
  const field =
    (key, apiKey = key, clear = {}) =>
    value =>
      page.setState(current => {
        const apiFields = {...current.apiFields};
        delete apiFields[apiKey];
        return {[key]: value, ...clear, apiFields};
      });
  return {
    ...S,
    t: {
      ...S.t,
      ...C,
      ...(!vfLiveStore() ? {okT: C.demoTitle, okP: C.demoBody} : {}),
      editMessage: C.labels.returnToForm
    },
    gallery: [1, 2, 3].map(n => ({
      src: vfAssetBase() + VF_PRODUCT_PLACEHOLDER,
      alt: C.galleryTitle + ' ' + S.n(n)
    })),
    process: C.steps,
    guests: s.guests,
    setGuests: field('guests', 'msg'),
    wDate: s.wDate,
    setWDate: field('wDate', 'msg'),
    today: (() => {
      const d = vfNow();
      return (
        d.getFullYear() +
        '-' +
        String(d.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(d.getDate()).padStart(2, '0')
      );
    })(),
    services: C.sv.map(x => ({
      icon: x[0],
      title: x[1],
      body: x[2],
      price: x[3]
    })),
    apiError: s.apiError,
    busy: s.busy,
    email: s.email,
    setEmail: field('email'),
    sent: s.sent,
    notSent: !s.sent,
    editMessage: () => {
      page.setState({
        sent: false
      });
      S.focus('vf-wname');
    },
    name: s.name,
    setName: field('name', 'name', {e1: false}),
    nameErr: fieldErrors.name,
    phone: s.phone,
    setPhone: field('phone', 'phone', {e2: false}),
    phoneErr: fieldErrors.phone,
    // After a failed send, what to fix in form order, each linking to its field.
    problems,
    emailErr: fieldErrors.email,
    msgErr: fieldErrors.msg,
    type: s.type,
    budget: s.budget,
    setType: field('type', 'msg'),
    setBudget: field('budget', 'msg'),
    notes: s.notes,
    setNotes: field('notes', 'msg'),
    types: C.types,
    budgets: C.budgets,
    send: () => {
      const e1 = !s.name.trim(),
        e2 = !vfMobile(s.phone);
      if (e1 || e2) {
        page.setState({
          e1,
          e2
        });
        // One problem goes straight to its field; both go to the summary that lists them.
        S.focus(e1 && e2 ? 'vf-wedding-errors' : e1 ? 'vf-wname' : 'vf-wphone');
        return;
      }
      const success = () => {
        page.setState({
          sent: true,
          busy: false,
          apiFields: {},
          apiError: ''
        });
        S.focus('vf-weddings-success');
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
          name: s.name || '',
          phone: s.phone ? vfMobile(s.phone) : null,
          email: s.email || '',
          message:
            [s.type, s.wDate, s.budget, s.guests, s.notes].filter(Boolean).join(' · ') ||
            'Wedding inquiry',
          occasion: 'weddings',
          preferredLocale: vfRuntime.api.preferredLocale()
        })
        .then(success)
        .catch(error => {
          const {fields, apiError} = vfInquiryFailure(error, S.lang);
          const wrong = FIELDS.filter(([key]) => fields[key]);
          page.setState({busy: false, apiFields: fields, apiError});
          S.focus(wrong.length > 1 ? 'vf-wedding-errors' : wrong[0]?.[1] || 'vf-wedding-api-error');
        });
    }
  };
}
