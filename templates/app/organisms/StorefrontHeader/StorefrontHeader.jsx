import React from 'react';
import {IconButton, LanguageSwitch, NavLink} from '../../ds.js';

// Storefront header composition. Shell supplies content and actions; CSS selects the layout.
export function StorefrontHeader({
  brand,
  homeHref,
  navigation,
  searchHref,
  searchLabel,
  accountHref,
  accountLabel,
  bagHref,
  bagLabel,
  bagCount,
  language,
  onLanguageChange,
  onPickAlternativeLanguage,
  menuLabel,
  onOpenMenu
}) {
  return (
    <header className="vf-shell-header tw:sticky tw:top-0 tw:z-header tw:bg-header tw:[backdrop-filter:blur(10px)] tw:[border-bottom:1px_solid_var(--border-subtle)]">
      <div className="vf-shell-desktop-header tw:max-lg:hidden tw:mx-auto tw:flex tw:items-center tw:justify-between tw:gap-5 tw:max-w-page tw:py-0 tw:px-gutter tw:h-header">
        <nav className="tw:flex tw:gap-1 tw:flex-wrap">
          {navigation.map(item => (
            <NavLink key={item.id} variant="header" href={item.href} current={item.current}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <a
          href={homeHref}
          className="vf-shell-desktop-brand tw:font-display tw:font-medium tw:text-xl tw:tracking-display tw:[text-transform:var(--display-case)] tw:text-body! tw:no-underline! tw:whitespace-nowrap"
        >
          <>{brand}</>
        </a>
        <div className="tw:flex tw:gap-1 tw:items-center">
          {language ? (
            <div className="vf-shell-header-lang tw:me-2">
              <LanguageSwitch
                value={language?.value}
                onChange={onLanguageChange}
                options={language?.options}
                label={language?.label}
              />
            </div>
          ) : null}
          <IconButton icon="search" label={searchLabel} href={searchHref} />
          <IconButton icon="user" label={accountLabel} href={accountHref} />
          <IconButton icon="shopping-bag" label={bagLabel} href={bagHref} count={bagCount} />
        </div>
      </div>
      {/* Phones and portrait tablets (below 1024px): the menu button, the brand and the
                    shop's tools. A tablet (768px up) has room for the language switch and account. */}
      <div className="vf-shell-mobile-header tw:lg:hidden tw:grid tw:items-center tw:gap-1 tw:h-header-mobile tw:py-0 tw:px-1 tw:[grid-template-columns:88px_minmax(0,1fr)_88px] tw:md:gap-4 tw:md:h-header tw:md:px-gutter tw:md:[grid-template-columns:minmax(0,1fr)_auto_minmax(0,1fr)]">
        <div className="tw:flex">
          <IconButton icon="menu" label={menuLabel} onClick={onOpenMenu} />
          {language ? (
            <button
              type="button"
              onClick={onPickAlternativeLanguage}
              lang={language?.alternative?.lang}
              aria-label={language?.alternative?.name}
              className="vf-shell-mobile-lang tw:md:hidden tw:min-w-tap tw:min-h-tap tw:[border:0] tw:rounded-full tw:bg-transparent tw:text-sm tw:font-medium tw:text-body tw:[font-family:inherit] tw:cursor-pointer"
            >
              <>{language?.alternative?.label}</>
            </button>
          ) : null}
        </div>
        <a
          href={homeHref}
          className="vf-shell-mobile-brand tw:font-display tw:font-medium tw:text-md tw:md:text-xl tw:text-center tw:overflow-hidden tw:text-ellipsis tw:tracking-display tw:[text-transform:var(--display-case)] tw:text-body! tw:no-underline! tw:whitespace-nowrap"
        >
          <>{brand}</>
        </a>
        <div className="vf-shell-mobile-tools tw:flex tw:justify-end tw:items-center tw:md:gap-1">
          {language ? (
            <div className="vf-shell-header-lang tw:max-md:hidden tw:me-2">
              <LanguageSwitch
                value={language?.value}
                onChange={onLanguageChange}
                options={language?.options}
                label={language?.label}
              />
            </div>
          ) : null}
          <IconButton icon="search" label={searchLabel} href={searchHref} />
          <IconButton
            icon="user"
            label={accountLabel}
            href={accountHref}
            className="tw:max-md:hidden!"
          />
          <IconButton icon="shopping-bag" label={bagLabel} href={bagHref} count={bagCount} />
        </div>
      </div>
    </header>
  );
}
