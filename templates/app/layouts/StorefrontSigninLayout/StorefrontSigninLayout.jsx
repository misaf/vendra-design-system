import React from 'react';

export function StorefrontSigninLayout({phone, code, feedback}) {
  return (
    <main id="main" tabIndex={-1} className="vf-form tw:mx-auto">
      <div className="vf-form-narrow tw:flex tw:flex-col tw:gap-5 tw:max-w-form tw:mx-auto">
        {phone}
        {code}
        {feedback}
      </div>
    </main>
  );
}
