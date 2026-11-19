import React from 'react';

export function StorefrontLayout({
  tenant,
  lang,
  dir,
  skipLink,
  liveRegion,
  announcement,
  header,
  menu,
  notices,
  content,
  footer,
  bottomBar
}) {
  return (
    <div className="tw:bg-muted tw:min-h-screen">
      <div
        className="vf-shell-container tw:mx-auto tw:bg-page tw:text-body tw:font-body tw:min-h-screen tw:flex tw:flex-col vf-page tw:[container-type:inline-size] tw:[--vf-shopping-width:var(--container-max)] tw:[--vf-form-width:1088px] tw:[--vf-info-width:1088px]"
        data-tenant={tenant}
        lang={lang}
        dir={dir}
        data-lang={lang}
      >
        {skipLink}
        {liveRegion}
        {announcement}
        {header}
        {menu}
        {notices}
        <div className="vf-shell-content tw:flex-1">{content}</div>
        {footer}
        {bottomBar}
      </div>
    </div>
  );
}
