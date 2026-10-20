import React from 'react';

export function StorefrontAccountLayout({heading, actions, notices, tabs, feedback, dialog}) {
  return (
    <main id="main" tabIndex={-1} className="vf-form tw:mx-auto">
      <div className="vf-account-header tw:flex tw:justify-between tw:gap-4 tw:flex-wrap tw:items-end tw:mb-5h">
        <div className="vf-account-heading tw:flex tw:flex-col tw:gap-3">{heading}</div>
        {actions}
      </div>
      {notices}
      {tabs}
      {feedback}
      {dialog}
    </main>
  );
}
