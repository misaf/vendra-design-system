import React from 'react';
import {Button} from '../../../../../../components/ui/components/Button/Button.jsx';
import {ErrorSummary} from '../../../../../../components/ui/patterns/molecules/ErrorSummary/ErrorSummary.jsx';
import {Input} from '../../../../../../components/ui/components/Input/Input.jsx';
import {Select} from '../../../../../../components/ui/components/Select/Select.jsx';
import {Switch} from '../../../../../../components/ui/patterns/atoms/Switch/Switch.jsx';

export function StorefrontAccountProfile({problems, name, phone, email, language, sms, save}) {
  return (
    <div className="vf-account-profile tw:flex tw:flex-col tw:gap-4 tw:max-w-narrow">
      <ErrorSummary id="vf-profile-errors" errors={problems} />
      <Input
        id="vf-pname"
        label={name.label}
        value={name.value}
        onChange={name.onChange}
        autoComplete="name"
      />
      <Input
        id="vf-pphone"
        label={phone.label}
        value={phone.value}
        dir="ltr"
        disabled={true}
        hint={phone.hint}
      />
      <Input
        id="vf-pemail"
        value={email.value}
        onChange={email.onChange}
        error={email.error}
        label={email.label}
        type="email"
        dir="ltr"
        hint={email.hint}
      />
      <Select
        id="vf-plang"
        label={language.label}
        hint={language.hint}
        value={language.value}
        onChange={language.onChange}
        options={language.options}
      />
      <Switch label={sms.label} checked={sms.checked} onChange={sms.onChange} />
      <div>
        <Button variant="primary" onClick={save.onClick}>
          <>{save.label}</>
        </Button>
      </div>
    </div>
  );
}
