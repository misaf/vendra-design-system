// The storefront shell around every page: header, mobile menu, footer, consent and tab bar.
import React from 'react';
import * as DS from './ds.js';
import {list} from './runtime.js';

export function Shell({v, content, sticky}) {
  // --vf-top-bar / --vf-bottom-bar: the heights of the sticky header and of the sticky bars at the
  // bottom of the screen, so fixed layers (toasts) sit above them and the page scrolls a focused or
  // linked element clear of them (scroll-padding in shell.css; WCAG 2.4.11).
  React.useEffect(() => {
    const height = element => /** @type {HTMLElement} */ (element).offsetHeight;
    const headers = [...document.querySelectorAll('.vf-shell-header')];
    const bars = [...document.querySelectorAll('.vf-shell-bottom-bar, .vf-shell-consent-bar')];
    // Sticky side panels stick only while they fit between the header and the bottom bars.
    const panels = [...document.querySelectorAll('.vf-sticky-panel')];
    const update = () => {
      const root = document.documentElement.style;
      const bottom = bars.reduce((sum, bar) => sum + height(bar), 0);
      root.setProperty('--vf-top-bar', Math.max(0, ...headers.map(height)) + 'px');
      root.setProperty('--vf-bottom-bar', bottom + 'px');
      // 6rem: the panels' sticky top (page-layouts.css), plus a little room above the bars.
      const room = innerHeight - 6 * 16 - bottom - 16;
      panels.forEach(panel => panel.toggleAttribute('data-vf-fits', height(panel) <= room));
    };
    const observer = new ResizeObserver(update);
    [...headers, ...bars, ...panels].forEach(element => observer.observe(element));
    window.addEventListener('resize', update);
    update();
    // The browser doesn't scroll an element that is already in the viewport, even when it sits under
    // a sticky bar: after it has focused one, nudge the page so the element (or the label a visually
    // hidden input belongs to) is clear of the bars.
    const clear = event => {
      const element = /** @type {HTMLElement} */ (event.target);
      const chrome = '.vf-shell-header, .vf-shell-bottom-bar, .vf-shell-consent-bar';
      if (!element.getBoundingClientRect || element.closest(chrome)) return;
      requestAnimationFrame(() => {
        const shown = element.offsetHeight > 2 ? element : element.closest('label') || element;
        const box = shown.getBoundingClientRect();
        const visible = list => list.filter(bar => height(bar) > 0);
        const top = Math.max(0, ...visible(headers).map(bar => bar.getBoundingClientRect().bottom));
        const bottom = Math.min(
          innerHeight,
          ...visible(bars).map(bar => bar.getBoundingClientRect().top)
        );
        const gap = 8;
        if (box.top < top) window.scrollBy(0, box.top - top - gap);
        else if (box.bottom > bottom && box.height < bottom - top)
          window.scrollBy(0, box.bottom - bottom + gap);
      });
    };
    document.addEventListener('focusin', clear);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
      document.removeEventListener('focusin', clear);
    };
  });
  return (
    // The page's language for the components' built-in wording and React Aria's formats.
    <DS.VendraProvider locale={v.lang === 'fa' ? 'fa-IR' : 'en-US'}>
      <div className="tw:bg-muted tw:min-h-screen">
        <div
          className="vf-shell-container tw:mx-auto tw:bg-page tw:text-body tw:font-body tw:min-h-screen tw:flex tw:flex-col vf-page tw:[container-type:inline-size] tw:[--vf-shopping-width:var(--container-max)] tw:[--vf-form-width:1088px] tw:[--vf-info-width:1088px]"
          data-vf-preview={v.previewMobile}
          data-tenant={v.tenant}
          lang={v.lang}
          dir={v.dir}
          data-lang={v.lang}
          data-vf-mobile={v.mob}
        >
          <DS.SkipLink href="#main" onClick={v.skipGo}>
            <>{v.t?.skip}</>
          </DS.SkipLink>
          {v.standalone ? (
            <>
              <DS.LiveRegion>
                <>{v.vfAnnouncement}</>
              </DS.LiveRegion>
            </>
          ) : null}
          {v.announcement ? (
            <>
              <DS.AnnouncementBar
                label={v.t?.news}
                closeLabel={v.t?.dismissNews}
                onClose={v.closeAnnouncement}
              >
                <>{v.announcement}</>
              </DS.AnnouncementBar>
            </>
          ) : null}
          {v.desk ? (
            <>
              <header className="vf-shell-header tw:sticky tw:top-0 tw:z-header tw:bg-header tw:[backdrop-filter:blur(10px)] tw:[border-bottom:1px_solid_var(--border-subtle)]">
                <div className="vf-shell-desktop-header tw:mx-auto tw:flex tw:items-center tw:justify-between tw:gap-5 tw:max-w-page tw:py-0 tw:px-gutter tw:h-header">
                  <nav className="tw:flex tw:gap-1 tw:flex-wrap">
                    <DS.NavLink variant="header" href={v.href?.shop} current={v.nav?.shop}>
                      <>{v.t?.shop}</>
                    </DS.NavLink>
                    <DS.NavLink variant="header" href={v.href?.weddings} current={v.nav?.weddings}>
                      <>{v.t?.weddings}</>
                    </DS.NavLink>
                    <DS.NavLink variant="header" href={v.href?.journal} current={v.nav?.journal}>
                      <>{v.t?.journal}</>
                    </DS.NavLink>
                  </nav>
                  <a
                    href={v.href?.home}
                    className="vf-shell-desktop-brand tw:font-display tw:font-medium tw:text-xl tw:tracking-display tw:[text-transform:var(--display-case)] tw:text-body! tw:no-underline! tw:whitespace-nowrap"
                  >
                    <>{v.t?.brand}</>
                  </a>
                  <div className="tw:flex tw:gap-1 tw:items-center">
                    <div className="vf-shell-header-lang tw:me-2">
                      <DS.LanguageSwitch
                        value={v.lang}
                        onChange={v.setLang}
                        options={v.langOpts}
                        label={v.t?.langL}
                      />
                    </div>
                    <DS.IconButton icon="search" label={v.t?.search} href={v.href?.search} />
                    <DS.IconButton icon="user" label={v.t?.account} href={v.href?.account} />
                    <DS.IconButton
                      icon="shopping-bag"
                      label={v.bagLabel}
                      href={v.href?.bag}
                      count={v.bagCount}
                    />
                  </div>
                </div>
              </header>
            </>
          ) : null}
          {v.mob ? (
            <>
              <header className="vf-shell-header tw:sticky tw:top-0 tw:z-header tw:bg-header tw:[backdrop-filter:blur(10px)] tw:[border-bottom:1px_solid_var(--border-subtle)]">
                <div className="vf-shell-mobile-header tw:grid tw:items-center tw:gap-1 tw:h-header-mobile tw:py-0 tw:px-1 tw:[grid-template-columns:88px_minmax(0,1fr)_88px]">
                  <div className="tw:flex">
                    <DS.IconButton icon="menu" label={v.t?.menu} onClick={v.openMenu} />
                    <button
                      type="button"
                      onClick={v.otherLang?.pick}
                      lang={v.otherLang?.lang}
                      aria-label={v.otherLang?.name}
                      className="vf-shell-mobile-lang tw:min-w-tap tw:min-h-tap tw:[border:0] tw:rounded-full tw:bg-transparent tw:text-sm tw:font-medium tw:text-body tw:[font-family:inherit] tw:cursor-pointer"
                    >
                      <>{v.otherLang?.label}</>
                    </button>
                  </div>
                  <a
                    href={v.href?.home}
                    className="vf-shell-mobile-brand tw:font-display tw:font-medium tw:text-md tw:text-center tw:overflow-hidden tw:text-ellipsis tw:tracking-display tw:[text-transform:var(--display-case)] tw:text-body! tw:no-underline! tw:whitespace-nowrap"
                  >
                    <>{v.t?.brand}</>
                  </a>
                  <div className="vf-shell-mobile-tools tw:flex tw:justify-end">
                    <DS.IconButton icon="search" label={v.t?.search} href={v.href?.search} />
                    <DS.IconButton
                      icon="shopping-bag"
                      label={v.bagLabel}
                      href={v.href?.bag}
                      count={v.bagCount}
                    />
                  </div>
                </div>
              </header>
            </>
          ) : null}
          {v.mob ? (
            <>
              <DS.Dialog
                placement="start"
                open={v.menuOpen}
                onClose={v.closeMenu}
                title={v.t?.brand}
                closeLabel={v.t?.closeMenu}
              >
                <DS.MenuList label={v.t?.mainNav}>
                  {list(v.menuItems).map((it, $index) => (
                    <React.Fragment key={$index}>
                      <DS.NavLink variant="menu" href={it?.href} current={it?.current}>
                        <>{it?.label}</>
                      </DS.NavLink>
                    </React.Fragment>
                  ))}
                </DS.MenuList>
                <div className="vf-shell-menu-actions tw:flex tw:flex-col tw:gap-4 tw:mt-5h">
                  {v.hasLang ? (
                    <>
                      <div className="vf-shell-menu-language tw:flex tw:items-center tw:justify-between tw:gap-3 tw:text-sm tw:text-quiet">
                        <span>
                          <>{v.t?.langL}</>
                        </span>
                        <DS.LanguageSwitch
                          value={v.lang}
                          onChange={v.setLang}
                          options={v.langOpts}
                          label={v.t?.langL}
                        />
                      </div>
                    </>
                  ) : null}
                  <DS.Button
                    variant="secondary"
                    iconStart="message-circle"
                    href={v.waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <>{v.t?.waLong}</>
                  </DS.Button>
                </div>
              </DS.Dialog>
            </>
          ) : null}
          <div className="vf-shell-content tw:flex-1">{content}</div>
          <footer className="vf-shell-footer ag-on-inverse tw:bg-inverse tw:text-on-inverse tw:mt-9">
            <div className="vf-shell-footer-content tw:mx-auto tw:max-w-page tw:pt-8 tw:px-gutter tw:pb-6 tw:flex tw:flex-col tw:gap-7">
              <div className="vf-shell-footer-top tw:flex tw:flex-wrap tw:justify-between tw:gap-x-9 tw:gap-y-7">
                <div className="vf-shell-footer-brand-block tw:[flex:1_1_260px] tw:max-w-[400px] tw:flex tw:flex-col tw:gap-4">
                  <a
                    href={v.href?.home}
                    className="vf-shell-footer-brand tw:self-start tw:text-on-inverse! tw:no-underline! tw:font-display tw:font-medium tw:text-3xl tw:tracking-display tw:[text-transform:var(--display-case)]"
                  >
                    <>{v.t?.brand}</>
                  </a>
                  <p className="tw:m-0 tw:text-sm tw:leading-body tw:text-inverse-quiet">
                    <>{v.footer?.tagline}</>
                  </p>
                  <ul
                    aria-label={v.t?.footer?.social}
                    className="vf-shell-footer-social tw:flex tw:gap-2 tw:list-none tw:m-0 tw:p-0"
                  >
                    {list(v.footer?.social).map((s, $index) => (
                      <React.Fragment key={$index}>
                        <li>
                          <DS.IconButton
                            icon={s?.icon}
                            label={s?.label}
                            href={s?.href}
                            target={s?.target}
                            variant="secondary"
                            className="ag-iconbtn--inverse"
                          />
                        </li>
                      </React.Fragment>
                    ))}
                  </ul>
                </div>
                <section
                  aria-labelledby="vf-news-title"
                  className="vf-shell-footer-newsletter tw:[flex:1_1_320px] tw:max-w-[560px] tw:flex tw:flex-col tw:gap-3"
                >
                  <h2
                    id="vf-news-title"
                    className="tw:m-0 tw:font-display tw:font-medium tw:text-xl tw:tracking-display"
                  >
                    <>{v.t?.newsletter?.title}</>
                  </h2>
                  <p className="tw:m-0 tw:text-sm tw:text-inverse-quiet tw:max-w-measure">
                    <>{v.t?.newsletter?.body}</>
                  </p>
                  {v.newsletter?.open ? (
                    <>
                      <form
                        onSubmit={v.newsletter?.submit}
                        noValidate
                        className="vf-shell-newsletter-form tw:flex tw:flex-col tw:gap-2 tw:max-w-[560px]"
                      >
                        <label
                          id="vf-news-email-label"
                          htmlFor="vf-news-email"
                          className="ag-field__label"
                        >
                          <>{v.t?.newsletter?.label}</>
                        </label>
                        <div className="tw:flex tw:flex-wrap tw:items-start tw:gap-3">
                          <div className="tw:[flex:1_1_240px]">
                            <DS.Input
                              id="vf-news-email"
                              aria-labelledby="vf-news-email-label"
                              value={v.newsletter?.draft}
                              onChange={v.newsletter?.setDraft}
                              error={v.newsletter?.error}
                              type="email"
                              dir="ltr"
                              autoComplete="email"
                            />
                          </div>
                          <DS.Button
                            type="submit"
                            loading={v.newsletter?.sending}
                            loadingLabel={v.t?.newsletter?.sending}
                            className="vf-shell-newsletter-submit tw:h-[48px]!"
                          >
                            <>{v.t?.newsletter?.submit}</>
                          </DS.Button>
                        </div>
                      </form>
                    </>
                  ) : null}
                  {v.newsletter?.done ? (
                    <>
                      <p
                        id="vf-news-done"
                        tabIndex={-1}
                        role="status"
                        className="tw:m-0 tw:text-sm"
                      >
                        <>{v.newsletter?.doneText}</>
                      </p>
                    </>
                  ) : null}
                </section>
              </div>
              <div className="vf-shell-footer-columns tw:grid tw:[grid-template-columns:repeat(auto-fit,minmax(140px,1fr))] tw:gap-x-5 tw:gap-y-7 tw:pt-7 tw:[border-top:1px_solid_var(--border-inverse)]">
                <nav
                  aria-labelledby="vf-footer-shop"
                  className="tw:flex tw:flex-col tw:gap-3 tw:items-start tw:text-sm"
                >
                  <div
                    id="vf-footer-shop"
                    className="vf-shell-footer-label tw:text-xs tw:tracking-eyebrow tw:uppercase tw:text-inverse-quiet tw:mb-1"
                  >
                    <>{v.t?.footer?.shop}</>
                  </div>
                  {list(v.footer?.shop).map((l, $index) => (
                    <React.Fragment key={$index}>
                      <a
                        href={l?.href}
                        className="vf-shell-footer-link tw:text-on-inverse! tw:no-underline! tw:hover:underline! tw:[text-underline-offset:4px]"
                      >
                        <>{l?.label}</>
                      </a>
                    </React.Fragment>
                  ))}
                </nav>
                <nav
                  aria-labelledby="vf-footer-studio"
                  className="tw:flex tw:flex-col tw:gap-3 tw:items-start tw:text-sm"
                >
                  <div
                    id="vf-footer-studio"
                    className="vf-shell-footer-label tw:text-xs tw:tracking-eyebrow tw:uppercase tw:text-inverse-quiet tw:mb-1"
                  >
                    <>{v.t?.footer?.studio}</>
                  </div>
                  {list(v.footer?.studio).map((l, $index) => (
                    <React.Fragment key={$index}>
                      <a
                        href={l?.href}
                        aria-current={l?.current}
                        className="vf-shell-footer-link tw:text-on-inverse! tw:no-underline! tw:hover:underline! tw:[text-underline-offset:4px]"
                      >
                        <>{l?.label}</>
                      </a>
                    </React.Fragment>
                  ))}
                </nav>
                <nav
                  aria-labelledby="vf-footer-help"
                  className="vf-shell-footer-nav tw:flex tw:flex-col tw:gap-3 tw:items-start tw:text-sm"
                >
                  <div
                    id="vf-footer-help"
                    className="vf-shell-footer-label tw:text-xs tw:tracking-eyebrow tw:uppercase tw:text-inverse-quiet tw:mb-1"
                  >
                    <>{v.t?.help}</>
                  </div>
                  <a
                    href={v.href?.faq}
                    aria-current={v.footer?.faqCurrent}
                    className="vf-shell-footer-link tw:text-on-inverse! tw:no-underline! tw:hover:underline! tw:[text-underline-offset:4px]"
                  >
                    <>{v.t?.faq}</>
                  </a>
                  {list(v.policyLinks).map((p, $index) => (
                    <React.Fragment key={$index}>
                      <a
                        href={p?.href}
                        aria-current={p?.current}
                        className="vf-shell-footer-link tw:text-on-inverse! tw:no-underline! tw:hover:underline! tw:[text-underline-offset:4px]"
                      >
                        <>{p?.label}</>
                      </a>
                    </React.Fragment>
                  ))}
                  <button
                    type="button"
                    id="vf-consent-settings"
                    onClick={v.consent?.open}
                    className="vf-shell-footer-link tw:p-0 tw:[border:0] tw:bg-transparent tw:text-on-inverse tw:[font:inherit] tw:text-start tw:cursor-pointer tw:hover:underline! tw:[text-underline-offset:4px]"
                  >
                    <>{v.t?.consent?.settings}</>
                  </button>
                </nav>
                <div className="vf-shell-footer-details tw:flex tw:flex-col tw:gap-3 tw:items-start tw:text-sm">
                  <div className="vf-shell-footer-label tw:text-xs tw:tracking-eyebrow tw:uppercase tw:text-inverse-quiet tw:mb-1">
                    <>{v.t?.visit}</>
                  </div>
                  <address className="tw:not-italic tw:leading-body">
                    <>{v.t?.address}</>
                  </address>
                  {v.footer?.directions ? (
                    <>
                      <a
                        href={v.footer?.directions}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="vf-shell-footer-link tw:text-on-inverse! tw:[text-underline-offset:4px]"
                      >
                        <>{v.t?.footer?.directions}</>
                      </a>
                    </>
                  ) : null}
                  <div className="tw:text-inverse-quiet">
                    <>{v.t?.hours}</>
                  </div>
                  <a
                    href={v.phoneHref}
                    dir="ltr"
                    className="vf-shell-footer-contact-link vf-shell-footer-link tw:text-on-inverse! tw:no-underline! tw:hover:underline! tw:[text-underline-offset:4px]"
                  >
                    <>{v.phoneLabel}</>
                  </a>
                  {v.footer?.email ? (
                    <>
                      <a
                        href={v.footer?.emailHref}
                        dir="ltr"
                        className="vf-shell-footer-link tw:text-on-inverse! tw:no-underline! tw:hover:underline! tw:[text-underline-offset:4px]"
                      >
                        <>{v.footer?.email}</>
                      </a>
                    </>
                  ) : null}
                  {list(v.footer?.seals).length ? (
                    <div className="vf-shell-footer-seals tw:flex tw:flex-wrap tw:gap-3 tw:mt-2">
                      {list(v.footer?.seals).map((seal, $index) => (
                        <React.Fragment key={$index}>
                          <DS.TrustSeal kind={seal?.kind} href={seal?.href} image={seal?.image} />
                        </React.Fragment>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="vf-shell-footer-bottom tw:flex tw:flex-wrap tw:justify-between tw:items-center tw:gap-x-6 tw:gap-y-2 tw:pt-5 tw:[border-top:1px_solid_var(--border-inverse)] tw:text-xs tw:text-inverse-quiet">
                <p className="tw:m-0">
                  <>{v.footer?.copyright}</>
                </p>
                {v.footer?.credit ? (
                  <>
                    <p className="vf-shell-footer-credit tw:m-0">
                      <>{v.footer?.credit?.before} </>
                      <a
                        href={v.footer?.credit?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tw:text-on-inverse! tw:[text-underline-offset:4px]"
                      >
                        <>{v.footer?.credit?.name}</>
                      </a>
                    </p>
                  </>
                ) : null}
              </div>
            </div>
          </footer>
          {v.consent?.desk ? (
            <>
              <div className="vf-shell-consent-dock vf-shell-consent-bar tw:sticky tw:bottom-0 tw:z-tabbar">
                <section
                  id="vf-consent"
                  tabIndex={-1}
                  aria-labelledby="vf-consent-title"
                  className="vf-shell-consent ag-on-inverse tw:flex tw:flex-col tw:gap-2 tw:p-4 tw:rounded-md tw:bg-inverse tw:text-on-inverse tw:shadow-lg tw:text-sm tw:leading-body"
                >
                  <div className="tw:flex tw:items-center tw:justify-between tw:gap-3">
                    <h2
                      id="vf-consent-title"
                      className="tw:m-0 tw:font-display tw:font-medium tw:text-md tw:tracking-display"
                    >
                      <>{v.t?.consent?.title}</>
                    </h2>
                    <DS.IconButton
                      icon="x"
                      label={v.t?.consent?.close}
                      onClick={v.consent?.close}
                      className="ag-iconbtn--inverse vf-shell-consent-close tw:-me-2"
                    />
                  </div>
                  <p className="tw:m-0">
                    <>{v.t?.consent?.body} </>
                    <a
                      href={v.consent?.policy?.href}
                      className="vf-shell-consent-link tw:text-on-inverse! tw:[text-underline-offset:4px]"
                    >
                      <>{v.t?.consent?.policy}</>
                    </a>
                  </p>
                  <div className="tw:flex tw:flex-wrap tw:gap-2">
                    <button
                      type="button"
                      onClick={v.consent?.accept}
                      className="vf-shell-consent-accept tw:flex-1 tw:whitespace-nowrap tw:min-h-tap tw:px-4 tw:rounded-full tw:[border:1px_solid_var(--text-on-inverse)] tw:[font:inherit] tw:font-medium tw:cursor-pointer tw:bg-on-inverse tw:text-body tw:hover:bg-sunken"
                    >
                      <>{v.t?.consent?.accept}</>
                    </button>
                    <button
                      type="button"
                      onClick={v.consent?.essential}
                      className="vf-shell-consent-essential tw:flex-1 tw:whitespace-nowrap tw:min-h-tap tw:px-4 tw:rounded-full tw:[border:1px_solid_var(--text-on-inverse)] tw:[font:inherit] tw:font-medium tw:cursor-pointer tw:bg-transparent tw:text-on-inverse tw:hover:bg-[color-mix(in_srgb,var(--text-on-inverse)_12%,transparent)]"
                    >
                      <>{v.t?.consent?.essential}</>
                    </button>
                  </div>
                </section>
              </div>
            </>
          ) : null}
          {v.mob ? (
            <>
              <div className="vf-shell-bottom-bar tw:sticky tw:bottom-0 tw:z-tabbar">
                {v.consent?.mob ? (
                  <>
                    <div className="vf-shell-consent-dock tw:px-3 tw:pb-3">
                      <section
                        id="vf-consent"
                        tabIndex={-1}
                        aria-labelledby="vf-consent-title"
                        className="vf-shell-consent ag-on-inverse tw:flex tw:flex-col tw:gap-2 tw:p-4 tw:rounded-md tw:bg-inverse tw:text-on-inverse tw:shadow-lg tw:text-sm tw:leading-body"
                      >
                        <div className="tw:flex tw:items-center tw:justify-between tw:gap-3">
                          <h2
                            id="vf-consent-title"
                            className="tw:m-0 tw:font-display tw:font-medium tw:text-md tw:tracking-display"
                          >
                            <>{v.t?.consent?.title}</>
                          </h2>
                          <DS.IconButton
                            icon="x"
                            label={v.t?.consent?.close}
                            onClick={v.consent?.close}
                            className="ag-iconbtn--inverse vf-shell-consent-close tw:-me-2"
                          />
                        </div>
                        <p className="tw:m-0">
                          <>{v.t?.consent?.body} </>
                          <a
                            href={v.consent?.policy?.href}
                            className="vf-shell-consent-link tw:text-on-inverse! tw:[text-underline-offset:4px]"
                          >
                            <>{v.t?.consent?.policy}</>
                          </a>
                        </p>
                        <div className="tw:flex tw:flex-wrap tw:gap-2">
                          <button
                            type="button"
                            onClick={v.consent?.accept}
                            className="vf-shell-consent-accept tw:flex-1 tw:whitespace-nowrap tw:min-h-tap tw:px-4 tw:rounded-full tw:[border:1px_solid_var(--text-on-inverse)] tw:[font:inherit] tw:font-medium tw:cursor-pointer tw:bg-on-inverse tw:text-body tw:hover:bg-sunken"
                          >
                            <>{v.t?.consent?.accept}</>
                          </button>
                          <button
                            type="button"
                            onClick={v.consent?.essential}
                            className="vf-shell-consent-essential tw:flex-1 tw:whitespace-nowrap tw:min-h-tap tw:px-4 tw:rounded-full tw:[border:1px_solid_var(--text-on-inverse)] tw:[font:inherit] tw:font-medium tw:cursor-pointer tw:bg-transparent tw:text-on-inverse tw:hover:bg-[color-mix(in_srgb,var(--text-on-inverse)_12%,transparent)]"
                          >
                            <>{v.t?.consent?.essential}</>
                          </button>
                        </div>
                      </section>
                    </div>
                  </>
                ) : null}
                {sticky}
                <DS.BottomTabBar items={v.tabs} label={v.t?.mainNav} />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </DS.VendraProvider>
  );
}
