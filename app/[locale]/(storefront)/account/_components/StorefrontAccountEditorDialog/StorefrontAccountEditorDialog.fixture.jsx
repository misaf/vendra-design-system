import React from 'react';
import {Input} from '../../../../../../components/ui/components/Input/Input.jsx';
import {StorefrontAccountEditorDialog} from './StorefrontAccountEditorDialog.jsx';

const copy = {
  en: {
    title: 'Edit address',
    label: 'Label',
    required: 'Enter a label',
    save: 'Save address',
    cancel: 'Cancel',
    storage: 'We could not save your changes on this device',
    open: 'Edit address'
  },
  fa: {
    title: 'ویرایش نشانی',
    label: 'عنوان',
    required: 'عنوان را وارد کنید',
    save: 'ذخیره نشانی',
    cancel: 'انصراف',
    storage: 'تغییرات در این دستگاه ذخیره نشد',
    open: 'ویرایش نشانی'
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [open, setOpen] = React.useState(true);
  const [label, setLabel] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [saved, setSaved] = React.useState('');
  const problems = submitted && !label ? [{target: 'vf-address-label', text: t.required}] : [];
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        {t.open}
      </button>
      <output aria-label="Saved label">{saved}</output>
      <StorefrontAccountEditorDialog
        open={open}
        title={t.title}
        onClose={() => setOpen(false)}
        saveError={submitted && !label ? t.storage : ''}
        problems={problems}
        save={{
          label: t.save,
          onClick: () => {
            setSubmitted(true);
            if (!label) return;
            setSaved(label);
            setOpen(false);
          }
        }}
        cancelLabel={t.cancel}
      >
        <Input
          id="vf-address-label"
          label={t.label}
          value={label}
          onChange={setLabel}
          error={problems.length ? t.required : undefined}
        />
      </StorefrontAccountEditorDialog>
    </>
  );
}
