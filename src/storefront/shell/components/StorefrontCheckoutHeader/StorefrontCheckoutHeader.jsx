import {StorefrontLink} from '../../ui/StorefrontLink.jsx';
import React from 'react';
import {Dialog} from '../../../../design-system/components/Dialog/Dialog.jsx';
import {Button} from '../../../../design-system/components/Button/Button.jsx';
import {BrandLogo} from '../BrandLogo/BrandLogo.jsx';

export function StorefrontCheckoutHeader({brand, logo = null, homeHref, back, help, leave = null}) {
  const [confirming, setConfirming] = React.useState(false);
  const close = () => setConfirming(false);
  const confirmHome = event => {
    // Opening Home in another tab leaves the current checkout in place.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    setConfirming(true);
  };

  return (
    <header className="vf-shell-header tw:sticky tw:top-0 tw:z-header tw:bg-header tw:[backdrop-filter:blur(10px)] tw:[border-bottom:1px_solid_var(--border-subtle)]">
      <div className="tw:mx-auto tw:grid tw:grid-cols-[minmax(0,1fr)_minmax(0,50%)_minmax(0,1fr)] tw:items-center tw:gap-2 tw:max-w-page tw:min-h-header-mobile tw:px-gutter tw:md:min-h-header">
        <StorefrontLink
          href={back.href}
          onClick={back.onClick}
          className="tw:min-h-tap tw:flex tw:items-center tw:justify-self-start tw:text-sm"
        >
          {back.label}
        </StorefrontLink>
        <StorefrontLink
          href={homeHref}
          aria-haspopup={leave ? 'dialog' : undefined}
          onClick={leave ? confirmHome : undefined}
          className="tw:min-h-tap tw:max-w-full tw:flex tw:items-center tw:justify-self-center tw:text-center tw:font-display tw:font-medium tw:text-lg tw:md:text-xl tw:tracking-display tw:[text-transform:var(--display-case)] tw:text-body! tw:no-underline!"
        >
          <BrandLogo image={logo} name={brand} />
        </StorefrontLink>
        <StorefrontLink
          href={help.href}
          target={help.target}
          rel={help.target ? 'noopener noreferrer' : undefined}
          className="tw:min-h-tap tw:flex tw:items-center tw:justify-self-end tw:text-sm"
        >
          {help.label}
        </StorefrontLink>
      </div>
      {leave && (
        <Dialog
          open={confirming}
          title={leave.title}
          onClose={close}
          footer={
            <>
              <Button variant="secondary" onClick={close}>
                {leave.stay}
              </Button>
              <Button href={homeHref} onClick={close}>
                {leave.confirm}
              </Button>
            </>
          }
        >
          <p className="tw:m-0">{leave.body}</p>
        </Dialog>
      )}
    </header>
  );
}
