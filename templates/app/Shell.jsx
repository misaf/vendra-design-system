// The storefront shell around every page: header, mobile menu, footer, consent and tab bar; `bare`
// keeps only the provider, skip link and notices.
import React from 'react';
import * as DS from './ds.js';
import {list} from './runtime.js';
import {StorefrontBottomBar} from './layouts/StorefrontBottomBar/StorefrontBottomBar.jsx';
import {StorefrontAnnouncement} from './organisms/StorefrontAnnouncement/StorefrontAnnouncement.jsx';
import {StorefrontConsent} from './organisms/StorefrontConsent/StorefrontConsent.jsx';
import {StorefrontFooter} from './organisms/StorefrontFooter/StorefrontFooter.jsx';
import {StorefrontMenu} from './organisms/StorefrontMenu/StorefrontMenu.jsx';
import {StorefrontHeader} from './organisms/StorefrontHeader/StorefrontHeader.jsx';
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
          <StorefrontAnnouncement
            label={v.shellText?.news}
            closeLabel={v.shellText?.dismissNews}
            onClose={v.closeAnnouncement}
            text={v.announcement}
            phoneText={v.announcementPhone}
            link={v.announcementLink}
          />
          <StorefrontHeader
            brand={v.shellText?.brand}
            homeHref={v.href?.home}
            navigation={[
              {id: 'shop', href: v.href?.shop, label: v.shellText?.shop, current: v.nav?.shop},
              v.features?.weddings && {
                id: 'weddings',
                href: v.href?.weddings,
                label: v.shellText?.weddings,
                current: v.nav?.weddings
              },
              v.features?.journal && {
                id: 'journal',
                href: v.href?.journal,
                label: v.shellText?.journal,
                current: v.nav?.journal
              }
            ].filter(Boolean)}
            searchHref={v.href?.search}
            searchLabel={v.shellText?.search}
            accountHref={v.href?.account}
            accountLabel={v.shellText?.account}
            bagHref={v.href?.bag}
            bagLabel={v.bagLabel}
            bagCount={v.bagCount}
            language={
              v.hasLang
                ? {
                    value: v.lang,
                    options: v.langOpts,
                    label: v.shellText?.langL,
                    alternative: v.otherLang
                  }
                : undefined
            }
            onLanguageChange={v.setLang}
            onPickAlternativeLanguage={v.otherLang?.pick}
            menuLabel={v.shellText?.menu}
            onOpenMenu={v.openMenu}
          />
          <StorefrontMenu
            open={v.menuOpen}
            onClose={v.closeMenu}
            title={v.shellText?.brand}
            closeLabel={v.shellText?.closeMenu}
            navigationLabel={v.shellText?.mainNav}
            navigation={list(v.menuItems)}
            language={
              v.hasLang
                ? {value: v.lang, options: v.langOpts, label: v.shellText?.langL}
                : undefined
            }
            onLanguageChange={v.setLang}
            whatsappHref={v.waHref}
            whatsappLabel={v.shellText?.waLong}
          />
          <DS.OfflineNotice />
          <div className="vf-shell-content tw:flex-1">{content}</div>
          <StorefrontFooter
            homeHref={v.href?.home}
            brand={v.shellText?.brand}
            tagline={v.footer?.tagline}
            socialLabel={v.shellText?.footer?.social}
            socialLinks={list(v.footer?.social)}
            visitLabel={v.shellText?.visit}
            address={v.footer?.address}
            directionsHref={v.footer?.directions}
            directionsLabel={v.shellText?.footer?.directions}
            hours={v.shellText?.hours}
            phoneHref={v.phoneHref}
            phoneLabel={v.phoneLabel}
            emailHref={v.footer?.emailHref}
            email={v.footer?.email}
            seals={list(v.footer?.seals)}
            copyright={v.footer?.copyright}
            credit={v.footer?.credit}
            groups={[
              {id: 'shop', title: v.shellText?.footer?.shop, links: list(v.footer?.shop)},
              {id: 'studio', title: v.shellText?.footer?.studio, links: list(v.footer?.studio)},
              {
                id: 'help',
                title: v.shellText?.help,
                links: [
                  {href: v.href?.faq, label: v.shellText?.faq, current: v.footer?.faqCurrent},
                  ...list(v.policyLinks)
                ]
              }
            ]}
            consentSettingsLabel={v.shellText?.consent?.settings}
            onOpenConsent={v.consent?.open}
          />
          <StorefrontBottomBar
            consent={
              <StorefrontConsent
                shown={v.consent?.shown}
                title={v.shellText?.consent?.title}
                closeLabel={v.shellText?.consent?.close}
                onClose={v.consent?.close}
                body={v.shellText?.consent?.body}
                policyHref={v.consent?.policy?.href}
                policyLabel={v.shellText?.consent?.policy}
                onAccept={v.consent?.accept}
                acceptLabel={v.shellText?.consent?.accept}
                onEssential={v.consent?.essential}
                essentialLabel={v.shellText?.consent?.essential}
              />
            }
            sticky={sticky}
            navigation={<DS.BottomTabBar items={v.tabs} label={v.shellText?.mainNav} />}
          />
        </div>
      </div>
    </DS.VendraProvider>
  );
}
