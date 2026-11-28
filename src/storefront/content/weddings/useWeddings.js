import React from 'react';
import {VF_NAV} from '../../../platform/browser/page-focus.js';
import {vfCopy} from './copy.js';
import {VF_PRODUCT_PLACEHOLDER} from '../../catalog/catalog.js';
import {mobile as vfMobile} from '../../../design-system/utils/input.js';
import {vfShell} from '../../shell/shell-props.js';
import {usePageLogic} from '../../shell/page-state.js';
import {vfAssetBase, vfNow} from '../../../platform/browser/environment.js';
import {vfLiveStore} from '../../store/store-config.js';
import {useStorefrontPage} from '../../shell/page-lifecycle.js';
import {vfInquiryFailure} from '../../../platform/browser/integrations/api-errors.js';
import {vfRuntime} from '../../../platform/browser/runtime.js';

const FIELDS = [
  ['name', 'vf-wname'],
  ['email', 'vf-wemail'],
  ['phone', 'vf-wphone'],
  ['msg', 'vf-wmsg']
];

export function useWeddings(props) {
  const page = usePageLogic(props, () => {});
  useStorefrontPage(page, 'weddings');
  const S = vfShell(page, 'weddings');
  const [form, setForm] = React.useState({
    sent: false,
    email: '',
    apiError: '',
    apiFields: /** @type {Record<string, string>} */ ({}),
    busy: false,
    name: '',
    phone: '',
    invalidName: false,
    invalidPhone: false,
    guests: '',
    wDate: '',
    notes: '',
    type: '',
    budget: ''
  });
  const pending = React.useRef(false);
  const C = vfCopy(S);
  const localErrors = {
    name: form.invalidName ? C.nameErr : undefined,
    phone: form.invalidPhone ? C.phoneErr : undefined
  };
  /** @type {Record<string, string | undefined>} */
  const fieldErrors = {...localErrors, ...form.apiFields};
  const problems = FIELDS.filter(([key]) => fieldErrors[key]).map(([key, target]) => ({
    text: fieldErrors[key],
    target
  }));
  const field =
    (key, apiKey = key, clear = {}) =>
    value =>
      setForm(current => {
        const apiFields = {...current.apiFields};
        delete apiFields[apiKey];
        return {...current, [key]: value, ...clear, apiFields};
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
    guests: form.guests,
    setGuests: field('guests', 'msg'),
    wDate: form.wDate,
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
    apiError: form.apiError,
    busy: form.busy,
    email: form.email,
    setEmail: field('email'),
    sent: form.sent,
    notSent: !form.sent,
    editMessage: () => {
      setForm(current => ({...current, sent: false}));
      VF_NAV.focusById('vf-wname');
    },
    name: form.name,
    setName: field('name', 'name', {invalidName: false}),
    nameErr: fieldErrors.name,
    phone: form.phone,
    setPhone: field('phone', 'phone', {invalidPhone: false}),
    phoneErr: fieldErrors.phone,
    // After a failed send, what to fix in form order, each linking to its field.
    problems,
    emailErr: fieldErrors.email,
    msgErr: fieldErrors.msg,
    type: form.type,
    budget: form.budget,
    setType: field('type', 'msg'),
    setBudget: field('budget', 'msg'),
    notes: form.notes,
    setNotes: field('notes', 'msg'),
    types: C.types,
    budgets: C.budgets,
    send: async () => {
      if (pending.current) return;
      const invalidName = !form.name.trim();
      const phone = vfMobile(form.phone);
      const invalidPhone = !phone;
      if (invalidName || invalidPhone) {
        setForm(current => ({...current, invalidName, invalidPhone}));
        // One problem goes straight to its field; both go to the summary that lists them.
        VF_NAV.focusById(
          invalidName && invalidPhone ? 'vf-wedding-errors' : invalidName ? 'vf-wname' : 'vf-wphone'
        );
        return;
      }
      const api = vfRuntime.api;
      if (!api) return;
      if (api.live) {
        pending.current = true;
        setForm(current => ({...current, busy: true, apiFields: {}, apiError: ''}));
        try {
          await api.inquiry({
            name: form.name,
            phone,
            email: form.email,
            message:
              [form.type, form.wDate, form.budget, form.guests, form.notes]
                .filter(Boolean)
                .join(' · ') || 'Wedding inquiry',
            occasion: 'weddings',
            preferredLocale: api.preferredLocale()
          });
        } catch (error) {
          const {fields, apiError} = vfInquiryFailure(error, S.lang);
          const wrong = FIELDS.filter(([key]) => fields[key]);
          setForm(current => ({...current, busy: false, apiFields: fields, apiError}));
          VF_NAV.focusById(
            wrong.length > 1 ? 'vf-wedding-errors' : wrong[0]?.[1] || 'vf-wedding-api-error'
          );
          return;
        } finally {
          pending.current = false;
        }
      }
      setForm(current => ({...current, sent: true, busy: false, apiFields: {}, apiError: ''}));
      VF_NAV.focusById('vf-weddings-success');
    }
  };
}
