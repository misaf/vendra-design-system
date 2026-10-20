import React from 'react';

// Consent precedes the phone action/navigation slots; CSS controls docking and visibility.
export function StorefrontBottomBar({consent, sticky, navigation}) {
  return (
    <div className="vf-shell-bottom-bar tw:sticky tw:bottom-0 tw:z-tabbar">
      {consent}
      <div className="vf-shell-phone-bar tw:md:hidden">
        {sticky}
        {navigation}
      </div>
    </div>
  );
}
