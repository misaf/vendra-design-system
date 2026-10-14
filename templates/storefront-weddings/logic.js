// Page behavior. Edit here, then run npm --prefix templates run build.
import {vfCopy} from './copy.js';
import {VF_PRODUCT_PLACEHOLDER} from '../_shared/catalog.js';
import {vfMobile} from '../_shared/delivery.js';
import {vfShell} from '../_shared/navigation.js';
import {usePageLogic} from '../_shared/page-state.js';
import {useStorefrontPage} from '../_shared/page-lifecycle.js';
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function usePage(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      sent: false,
      email: '',
      apiError: '',
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
  return {
    ...S,
    t: {
      ...S.t,
      ...C,
      editMessage: C.labels.returnToForm
    },
    gallery: [1, 2, 3].map(n => ({
      src: (window.VF_ASSET_BASE || '../../') + VF_PRODUCT_PLACEHOLDER,
      alt: C.galleryTitle + ' ' + S.n(n)
    })),
    process: C.steps,
    guests: s.guests,
    setGuests: value =>
      page.setState({
        guests: value
      }),
    wDate: s.wDate,
    setWDate: v =>
      page.setState({
        wDate: v
      }),
    today: (() => {
      const d = new Date();
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
    setEmail: value =>
      page.setState({
        email: value,
        apiError: ''
      }),
    sent: s.sent,
    notSent: !s.sent,
    editMessage: () => {
      page.setState({
        sent: false
      });
      S.focus('vf-wname');
    },
    name: s.name,
    setName: value =>
      page.setState({
        name: value,
        e1: false
      }),
    nameErr: s.e1 ? C.nameErr : undefined,
    phone: s.phone,
    setPhone: value =>
      page.setState({
        phone: value,
        e2: false
      }),
    phoneErr: s.e2 ? C.phoneErr : undefined,
    // After a failed send, what to fix in form order, each linking to its field.
    problems: [
      s.e1 && {text: C.nameErr, target: 'vf-wname'},
      s.e2 && {text: C.phoneErr, target: 'vf-wphone'}
    ].filter(Boolean),
    type: s.type,
    budget: s.budget,
    setType: value =>
      page.setState({
        type: value
      }),
    setBudget: value =>
      page.setState({
        budget: value
      }),
    notes: s.notes,
    setNotes: value =>
      page.setState({
        notes: value
      }),
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
          apiError: ''
        });
        S.focus('vf-weddings-success');
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
        name: s.name || '',
        phone: s.phone ? vfMobile(s.phone) : null,
        email: s.email || '',
        message:
          [s.type, s.wDate, s.budget, s.guests, s.notes].filter(Boolean).join(' · ') ||
          'Wedding inquiry',
        occasion: 'weddings',
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
