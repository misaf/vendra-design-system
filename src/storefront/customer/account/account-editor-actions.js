import {mobile as vfMobile} from '../../../design-system/utils/input.js';
import {dates} from '../../../design-system/utils/dates.js';
import {VF_NAV} from '../../../platform/browser/page-focus.js';
import {vfRuntime} from '../../../platform/browser/runtime.js';
import {vfValidLocation} from '../../delivery/location.js';
import {VF_OCCASIONS, vfAccountUpdate, vfReminderNext} from '../account-data.js';

export function createAccountEditorActions({
  phone,
  lang,
  form,
  errors,
  mapFailed,
  profile,
  profileChanges,
  editor,
  defaultName,
  defaultAddressLabel,
  translate,
  setState,
  setLang,
  focus
}) {
  const commit = change => {
    const data = vfAccountUpdate(phone, change, lang);
    if (!data) {
      setState({saveError: editor.saveError, notice: ''});
      return false;
    }
    setState({
      account: data,
      form: null,
      profile: null,
      profileChanges: {},
      errors: {},
      notice: editor.saved,
      saveError: ''
    });
    return data;
  };
  // Editor dialogs render in a portal outside main; scope validation focus to the open dialog.
  const focusError = () =>
    setTimeout(() => VF_NAV.focusFirstInvalid(document.querySelector('[role="dialog"]')), 0);
  const openAddress = address =>
    setState({
      errors: {},
      locateFailed: false,
      saveError: '',
      form: {
        kind: 'address',
        id: address && address.id,
        label: address ? translate(address.label) : '',
        line: address ? translate(address.line) : '',
        recipient: address ? translate(address.recipient) : profile.name || defaultName,
        phone: address ? address.phone : '',
        zone: address ? address.zone : 'central',
        location: address && vfValidLocation(address.location) ? address.location : null
      }
    });
  const openReminder = r =>
    setState({
      errors: {},
      saveError: '',
      form: {
        kind: 'reminder',
        id: null,
        name: '',
        occ: 'birthday',
        cal: lang === 'fa' ? 'j' : 'g',
        m: 1,
        d: 1,
        before: 3,
        channel: 'sms',
        on: true,
        ...r,
        ...(r
          ? {
              name: translate(r.name)
            }
          : {})
      }
    });
  const removeAddress = id => {
    commit(current => {
      let addresses = current.addresses.filter(item => item.id !== id);
      if (current.addresses.find(item => item.id === id)?.isDefault && addresses.length)
        addresses = addresses.map((item, index) => ({...item, isDefault: index === 0}));
      return {...current, addresses};
    });
    focus('vf-add-address');
  };
  const setLocation = location => {
    setState(prev =>
      prev.form
        ? {
            form: {...prev.form, location},
            errors: {...prev.errors, location: undefined},
            locateFailed: false
          }
        : null
    );
  };
  const setField = k => value =>
    setState({
      form: {
        ...form,
        [k]: value
      },
      errors: {
        ...errors,
        [k]: undefined
      }
    });
  const saveForm = () => {
    const problems = {};
    if (form.kind === 'address') {
      if (!mapFailed && !vfValidLocation(form.location)) problems.location = editor.pinError;
      if (form.line.trim().length < 6) problems.line = editor.addressError;
      if (!vfMobile(form.phone)) problems.phone = editor.phoneError;
    } else {
      if (!form.name.trim()) problems.name = editor.required;
      if (!(
        form.m >= 1 &&
        form.m <= 12 &&
        form.d >= 1 &&
        form.d <= dates.daysInMonth(form.cal, form.cal === 'j' ? 1403 : 2024, form.m)
      ))
        problems.name = editor.required;
    }
    if (Object.keys(problems).length) {
      setState({errors: problems});
      // Several problems go to the summary that lists them; one goes to its field. The map can't
      // carry aria-invalid, so it takes focus itself.
      if (Object.keys(problems).length > 1) focus('vf-editor-errors');
      else if (problems.location) focus('vf-address-map');
      else focusError();
      return;
    }
    const row = {
      ...form,
      id: form.id || form.kind + '-' + Date.now()
    };
    delete row.kind;
    if (form.kind === 'address') {
      if (!row.location) delete row.location;

      row.label = row.label.trim() || defaultAddressLabel;
      commit(current => {
        const updated = {
          ...row,
          isDefault: form.id
            ? !!current.addresses.find(a => a.id === form.id)?.isDefault
            : !current.addresses.length
        };
        return {
          ...current,
          addresses: form.id
            ? current.addresses.map(a => (a.id === form.id ? updated : a))
            : [...current.addresses, updated]
        };
      });
    } else {
      if (!form.id)
        vfRuntime.track.event('reminder_created', {
          occasion: form.occ,
          calendar: form.cal,
          days_before: form.before,
          channel: form.channel
        });
      commit(current => ({
        ...current,
        reminders: form.id
          ? current.reminders.map(r => (r.id === form.id ? row : r))
          : [...current.reminders, row]
      }));
    }
  };
  const setProfileField = key => value =>
    setState({
      profile: {
        ...profile,
        [key]: value
      },
      profileChanges: {...profileChanges, [key]: value},
      errors: {}
    });
  const saveProfile = () => {
    if (profile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(profile.email.trim())) {
      setState({
        errors: {
          email: editor.emailError
        }
      });
      focusError();
      return;
    }
    const saved = commit(current => ({
      ...current,
      profile: {...current.profile, ...profileChanges}
    }));
    if (saved) setLang?.(saved.profile.locale);
  };

  return {
    openAddress,
    removeAddress,
    makeDefaultAddress: id =>
      commit(current => ({
        ...current,
        addresses: current.addresses.map(address => ({...address, isDefault: address.id === id}))
      })),
    openReminder,
    toggleReminder: (id, on) =>
      commit(current => ({
        ...current,
        reminders: current.reminders.map(reminder =>
          reminder.id === id ? {...reminder, on} : reminder
        )
      })),
    removeReminder: id => {
      commit(current => ({
        ...current,
        reminders: current.reminders.filter(reminder => reminder.id !== id)
      }));
      focus('vf-add-reminder');
    },
    setProfileField,
    saveProfile,
    setField,
    setLocation,
    saveForm,
    closeForm: () => setState({form: null, saveError: '', errors: {}}),
    setDate: value =>
      setState({
        form: {
          ...form,
          ...value
        }
      }),
    setBefore: value =>
      setState({
        form: {
          ...form,
          before: +value
        }
      }),
    setOccasion: value => {
      const o = VF_OCCASIONS.find(o => o.id === value);
      let date = o.fixed || {};
      if (o.hijri) {
        const n = vfReminderNext({
            occ: o.id
          }),
          p = dates.parts(form.cal, n.date);
        date = {
          cal: form.cal,
          m: p[1],
          d: p[2]
        };
      }
      setState({
        form: {
          ...form,
          occ: o.id,
          ...date
        }
      });
    }
  };
}
