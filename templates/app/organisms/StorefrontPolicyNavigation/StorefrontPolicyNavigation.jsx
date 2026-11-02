import React from 'react';

export function StorefrontPolicyNavigation({label, links}) {
  return (
    <nav aria-label={label} className="vf-policy-switch tw:mb-7">
      <ul className="tw:flex tw:flex-wrap tw:gap-2 tw:m-0 tw:p-0 tw:list-none">
        {links.map((p, $index) => (
          <React.Fragment key={$index}>
            <li>
              <a
                href={p?.href}
                aria-current={p?.current}
                className="vf-policy-switch-link tw:min-h-tap tw:whitespace-nowrap tw:inline-flex tw:items-center tw:px-4 tw:rounded-full tw:border tw:border-solid tw:border-input tw:text-sm tw:text-body! tw:no-underline! tw:hover:border-body tw:aria-[current=page]:bg-inverse tw:aria-[current=page]:border-inverse tw:aria-[current=page]:text-on-inverse!"
              >
                <>{p?.label}</>
              </a>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
}
