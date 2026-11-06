import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontAccountProfile({problems, name, phone, email, language, sms, save}) {
  return (
    <div className="vf-account-profile tw:flex tw:flex-col tw:gap-4 tw:max-w-narrow">
      <DS.ErrorSummary id="vf-profile-errors" errors={problems} />
      <DS.Input
        id="vf-pname"
        label={name.label}
        value={name.value}
        onChange={name.onChange}
        autoComplete="name"
      />
      <DS.Input
        id="vf-pphone"
        label={phone.label}
        value={phone.value}
        dir="ltr"
        disabled={true}
        hint={phone.hint}
      />
      <DS.Input
        id="vf-pemail"
        value={email.value}
        onChange={email.onChange}
        error={email.error}
        label={email.label}
        type="email"
        dir="ltr"
        hint={email.hint}
      />
      <DS.Select
        id="vf-plang"
        label={language.label}
        hint={language.hint}
        value={language.value}
        onChange={language.onChange}
        options={language.options}
      />
      <DS.Switch label={sms.label} checked={sms.checked} onChange={sms.onChange} />
      <div>
        <DS.Button variant="primary" onClick={save.onClick}>
          <>{save.label}</>
        </DS.Button>
      </div>
    </div>
  );
}
