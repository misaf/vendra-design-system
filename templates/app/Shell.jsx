// The storefront shell around every page: header, mobile menu, footer, consent and tab bar; `bare`
// keeps only the provider, skip link and notices.
import React from 'react';
import * as DS from './ds.js';
import {list} from './runtime.js';
import {FooterLinks} from './FooterLinks.jsx';
import {useVfDensity, useVfRemoteNavigation} from '../_shared/tv.js';

export function Shell({v, content, sticky, bare = false, quiet = false}) {
  // --vf-top-bar / --vf-bottom-bar: the heights of the sticky header and of the sticky bars at the
  // bottom of the screen, so fixed layers (toasts) sit above them and the page scrolls a focused or
  // linked element clear of them (scroll-padding in shell.css; WCAG 2.4.11).
  React.useEffect(() => {
    const height = element => /** @type {HTMLElement} */ (element).offsetHeight;
    const isSticky = element => getComputedStyle(element).position === 'sticky';
    const headers = [...document.querySelectorAll('.vf-shell-header')];
    const bars = [...document.querySelectorAll('.vf-shell-bottom-bar')];
    // Sticky side panels stick only while they fit between the header and the bottom bars.
    const panels = [...document.querySelectorAll('.vf-sticky-panel')];
    const update = () => {
      const root = document.documentElement.style;
      const bottom = bars.filter(isSticky).reduce((sum, bar) => sum + height(bar), 0);
      root.setProperty('--vf-top-bar', Math.max(0, ...headers.filter(isSticky).map(height)) + 'px');
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
        const visible = list => list.filter(bar => isSticky(bar) && height(bar) > 0);
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
  // The menu drawer belongs to the compact header: an open one closes when the window widens to
  // the desktop header (1024px), e.g. a tablet turned to landscape.
  const {menuOpen, closeMenu} = v;
  React.useEffect(() => {
    if (!menuOpen) return;
    const wide = window.matchMedia('(width >= 1024px)');
    const change = () => wide.matches && closeMenu();
    wide.addEventListener('change', change);
    change();
    return () => wide.removeEventListener('change', change);
  }, [menuOpen]);
  // TV mode (templates/README.md): the density for the overlays, and the remote's arrow keys. The
  // presentation sets its own density and handles its own keys.
  const density = useVfDensity();
  useVfRemoteNavigation(!bare && density === 'tv');
  // A bare page (the counter presentation) fills the screen on its own: the skip link and notices
  // stay, but none of the header, menu, footer, consent or tab bar.
  if (bare)
    return (
      <DS.VendraProvider
        locale={v.lang === 'fa' ? 'fa-IR' : 'en-US'}
        onEvent={({event, ...params}) => window.VF_TRACK.event(event, params)}
      >
        <div
          className="vf-shell-bare tw:min-h-screen tw:font-body"
          data-tenant={v.tenant}
          lang={v.lang}
          dir={v.dir}
          data-lang={v.lang}
        >
          <DS.SkipLink href="#main" onClick={v.skipGo}>
            <>{v.shellText?.skip}</>
          </DS.SkipLink>
          {v.standalone ? (
            <DS.LiveRegion>
              <>{v.vfAnnouncement}</>
            </DS.LiveRegion>
          ) : null}
          {quiet ? null : <DS.OfflineNotice />}
          {content}
        </div>
      </DS.VendraProvider>
    );
  return (
    // The page's language for the components' built-in wording and React Aria's formats.
    <DS.VendraProvider
      locale={v.lang === 'fa' ? 'fa-IR' : 'en-US'}
      onEvent={({event, ...params}) => window.VF_TRACK.event(event, params)}
      density={density}
    >
      <div className="tw:bg-muted tw:min-h-screen">
        <div
          className="vf-shell-container tw:mx-auto tw:bg-page tw:text-body tw:font-body tw:min-h-screen tw:flex tw:flex-col vf-page tw:[container-type:inline-size] tw:[--vf-shopping-width:var(--container-max)] tw:[--vf-form-width:1088px] tw:[--vf-info-width:1088px]"
          data-tenant={v.tenant}
          lang={v.lang}
          dir={v.dir}
          data-lang={v.lang}
        >
          <DS.SkipLink href="#main" onClick={v.skipGo}>
            <>{v.shellText?.skip}</>
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
                label={v.shellText?.news}
                closeLabel={v.shellText?.dismissNews}
                onClose={v.closeAnnouncement}
              >
                {v.announcementPhone !== v.announcement ? (
                  <>
                    <span className="tw:md:hidden">{v.announcementPhone}</span>
                    <span className="tw:max-md:hidden">{v.announcement}</span>
                  </>
                ) : (
                  <>{v.announcement}</>
                )}
                {v.announcementLink ? (
                  <>
                    {' '}
                    <a href={v.announcementLink.href} className="vf-shell-announcement-link">
                      <>{v.announcementLink.label}</>
                      <DS.Icon name="arrow-right" size={14} className="ag-flip-rtl" />
                    </a>
                  </>
                ) : null}
              </DS.AnnouncementBar>
            </>
          ) : null}
          <header className="vf-shell-header tw:sticky tw:top-0 tw:z-header tw:bg-header tw:[backdrop-filter:blur(10px)] tw:[border-bottom:1px_solid_var(--border-subtle)]">
            <div className="vf-shell-desktop-header tw:max-lg:hidden tw:mx-auto tw:flex tw:items-center tw:justify-between tw:gap-5 tw:max-w-page tw:py-0 tw:px-gutter tw:h-header">
              <nav className="tw:flex tw:gap-1 tw:flex-wrap">
                <DS.NavLink variant="header" href={v.href?.shop} current={v.nav?.shop}>
                  <>{v.shellText?.shop}</>
                </DS.NavLink>
                {v.features?.weddings ? (
                  <DS.NavLink variant="header" href={v.href?.weddings} current={v.nav?.weddings}>
                    <>{v.shellText?.weddings}</>
                  </DS.NavLink>
                ) : null}
                {v.features?.journal ? (
                  <DS.NavLink variant="header" href={v.href?.journal} current={v.nav?.journal}>
                    <>{v.shellText?.journal}</>
                  </DS.NavLink>
                ) : null}
              </nav>
              <a
                href={v.href?.home}
                className="vf-shell-desktop-brand tw:font-display tw:font-medium tw:text-xl tw:tracking-display tw:[text-transform:var(--display-case)] tw:text-body! tw:no-underline! tw:whitespace-nowrap"
              >
                <>{v.shellText?.brand}</>
              </a>
              <div className="tw:flex tw:gap-1 tw:items-center">
                {v.hasLang ? (
                  <div className="vf-shell-header-lang tw:me-2">
                    <DS.LanguageSwitch
                      value={v.lang}
                      onChange={v.setLang}
                      options={v.langOpts}
                      label={v.shellText?.langL}
                    />
                  </div>
                ) : null}
                <DS.IconButton icon="search" label={v.shellText?.search} href={v.href?.search} />
                <DS.IconButton icon="user" label={v.shellText?.account} href={v.href?.account} />
                <DS.IconButton
                  icon="shopping-bag"
                  label={v.bagLabel}
                  href={v.href?.bag}
                  count={v.bagCount}
                />
              </div>
            </div>
            {/* Phones and portrait tablets (below 1024px): the menu button, the brand and the
                    shop's tools. A tablet (768px up) has room for the language switch and account. */}
            <div className="vf-shell-mobile-header tw:lg:hidden tw:grid tw:items-center tw:gap-1 tw:h-header-mobile tw:py-0 tw:px-1 tw:[grid-template-columns:88px_minmax(0,1fr)_88px] tw:md:gap-4 tw:md:h-header tw:md:px-gutter tw:md:[grid-template-columns:minmax(0,1fr)_auto_minmax(0,1fr)]">
              <div className="tw:flex">
                <DS.IconButton icon="menu" label={v.shellText?.menu} onClick={v.openMenu} />
                {v.hasLang ? (
                  <button
                    type="button"
                    onClick={v.otherLang?.pick}
                    lang={v.otherLang?.lang}
                    aria-label={v.otherLang?.name}
                    className="vf-shell-mobile-lang tw:md:hidden tw:min-w-tap tw:min-h-tap tw:[border:0] tw:rounded-full tw:bg-transparent tw:text-sm tw:font-medium tw:text-body tw:[font-family:inherit] tw:cursor-pointer"
                  >
                    <>{v.otherLang?.label}</>
                  </button>
                ) : null}
              </div>
              <a
                href={v.href?.home}
                className="vf-shell-mobile-brand tw:font-display tw:font-medium tw:text-md tw:md:text-xl tw:text-center tw:overflow-hidden tw:text-ellipsis tw:tracking-display tw:[text-transform:var(--display-case)] tw:text-body! tw:no-underline! tw:whitespace-nowrap"
              >
                <>{v.shellText?.brand}</>
              </a>
              <div className="vf-shell-mobile-tools tw:flex tw:justify-end tw:items-center tw:md:gap-1">
                {v.hasLang ? (
                  <div className="vf-shell-header-lang tw:max-md:hidden tw:me-2">
                    <DS.LanguageSwitch
                      value={v.lang}
                      onChange={v.setLang}
                      options={v.langOpts}
                      label={v.shellText?.langL}
                    />
                  </div>
                ) : null}
                <DS.IconButton icon="search" label={v.shellText?.search} href={v.href?.search} />
                <DS.IconButton
                  icon="user"
                  label={v.shellText?.account}
                  href={v.href?.account}
                  className="tw:max-md:hidden!"
                />
                <DS.IconButton
                  icon="shopping-bag"
                  label={v.bagLabel}
                  href={v.href?.bag}
                  count={v.bagCount}
                />
              </div>
            </div>
          </header>
          {/* The menu drawer opens from the compact header (below 1024px). */}
          <DS.Dialog
            placement="start"
            open={v.menuOpen}
            onClose={v.closeMenu}
            title={v.shellText?.brand}
            closeLabel={v.shellText?.closeMenu}
          >
            <DS.MenuList label={v.shellText?.mainNav}>
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
                      <>{v.shellText?.langL}</>
                    </span>
                    <DS.LanguageSwitch
                      value={v.lang}
                      onChange={v.setLang}
                      options={v.langOpts}
                      label={v.shellText?.langL}
                    />
                  </div>
                </>
              ) : null}
              {v.waHref ? (
                <DS.Button
                  variant="secondary"
                  iconStart="message-circle"
                  href={v.waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <>{v.shellText?.waLong}</>
                </DS.Button>
              ) : null}
            </div>
          </DS.Dialog>
          <DS.OfflineNotice />
          <div className="vf-shell-content tw:flex-1">{content}</div>
          <footer className="vf-shell-footer ag-on-inverse tw:bg-inverse tw:text-on-inverse tw:mt-9">
            <div className="vf-shell-footer-content tw:mx-auto tw:max-w-page tw:pt-8 tw:px-gutter tw:pb-6 tw:flex tw:flex-col tw:gap-7">
              <div className="vf-shell-footer-top tw:flex tw:flex-wrap tw:justify-between tw:gap-x-9 tw:gap-y-7">
                <div className="vf-shell-footer-brand-block tw:[flex:1_1_260px] tw:max-w-form tw:flex tw:flex-col tw:gap-4">
                  <a
                    href={v.href?.home}
                    className="vf-shell-footer-brand tw:self-start tw:text-on-inverse! tw:no-underline! tw:font-display tw:font-medium tw:text-3xl tw:tracking-display tw:[text-transform:var(--display-case)]"
                  >
                    <>{v.shellText?.brand}</>
                  </a>
                  <p className="tw:m-0 tw:text-sm tw:leading-body tw:text-inverse-quiet">
                    <>{v.footer?.tagline}</>
                  </p>
                  <ul
                    aria-label={v.shellText?.footer?.social}
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
                            inverse={true}
                          />
                        </li>
                      </React.Fragment>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="vf-shell-footer-columns tw:grid tw:[grid-template-columns:repeat(auto-fit,minmax(140px,1fr))] tw:gap-x-5 tw:gap-y-7 tw:pt-7 tw:[border-top:1px_solid_var(--border-inverse)]">
                <FooterLinks v={v} />
                <div className="vf-shell-footer-details tw:flex tw:flex-col tw:gap-3 tw:items-start tw:text-sm">
                  <div className="vf-shell-footer-label tw:text-xs tw:tracking-eyebrow tw:uppercase tw:text-inverse-quiet tw:mb-1">
                    <>{v.shellText?.visit}</>
                  </div>
                  <address className="tw:not-italic tw:leading-body">
                    <>{v.footer?.address}</>
                  </address>
                  {v.footer?.directions ? (
                    <>
                      <a
                        href={v.footer?.directions}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="vf-shell-footer-link tw:text-on-inverse! tw:[text-underline-offset:4px]"
                      >
                        <>{v.shellText?.footer?.directions}</>
                      </a>
                    </>
                  ) : null}
                  <div className="tw:text-inverse-quiet">
                    <>{v.shellText?.hours}</>
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
          {/* The bottom of the screen: the cookie notice (a card above the tab bar on phones, a slim
              bar from 768px), then on phones the page's sticky action and the tab bar. */}
          <div className="vf-shell-bottom-bar tw:sticky tw:bottom-0 tw:z-tabbar">
            {v.consent?.shown ? (
              <div className="vf-shell-consent-dock vf-shell-consent-bar tw:max-md:px-3 tw:max-md:pb-3">
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
                      <>{v.shellText?.consent?.title}</>
                    </h2>
                    <DS.IconButton
                      icon="x"
                      label={v.shellText?.consent?.close}
                      onClick={v.consent?.close}
                      variant="secondary"
                      inverse={true}
                      className="vf-shell-consent-close tw:-me-2"
                    />
                  </div>
                  <p className="tw:m-0">
                    <>{v.shellText?.consent?.body} </>
                    <a
                      href={v.consent?.policy?.href}
                      className="vf-shell-consent-link tw:text-on-inverse! tw:[text-underline-offset:4px]"
                    >
                      <>{v.shellText?.consent?.policy}</>
                    </a>
                  </p>
                  <div className="tw:flex tw:flex-wrap tw:gap-2">
                    <button
                      type="button"
                      onClick={v.consent?.accept}
                      className="vf-shell-consent-accept tw:flex-1 tw:whitespace-nowrap tw:min-h-tap tw:px-4 tw:rounded-full tw:[border:1px_solid_var(--text-on-inverse)] tw:[font:inherit] tw:font-medium tw:cursor-pointer tw:bg-on-inverse tw:text-body tw:hover:bg-sunken"
                    >
                      <>{v.shellText?.consent?.accept}</>
                    </button>
                    <button
                      type="button"
                      onClick={v.consent?.essential}
                      className="vf-shell-consent-essential tw:flex-1 tw:whitespace-nowrap tw:min-h-tap tw:px-4 tw:rounded-full tw:[border:1px_solid_var(--text-on-inverse)] tw:[font:inherit] tw:font-medium tw:cursor-pointer tw:bg-transparent tw:text-on-inverse tw:hover:bg-[color-mix(in_srgb,var(--text-on-inverse)_12%,transparent)]"
                    >
                      <>{v.shellText?.consent?.essential}</>
                    </button>
                  </div>
                </section>
              </div>
            ) : null}
            <div className="vf-shell-phone-bar tw:md:hidden">
              {sticky}
              <DS.BottomTabBar items={v.tabs} label={v.shellText?.mainNav} />
            </div>
          </div>
        </div>
      </div>
    </DS.VendraProvider>
  );
}
