import React from 'react';

export function StorefrontAccountBalanceHistory({
  title,
  showEmpty,
  emptyText,
  showHistory,
  entries
}) {
  return (
    <section aria-labelledby="vf-balance-history" className="tw:flex tw:flex-col tw:gap-3">
      <h2 id="vf-balance-history" className="tw:m-0 tw:text-xl">
        <>{title}</>
      </h2>
      {showEmpty ? (
        <>
          <p className="tw:m-0 tw:text-secondary">
            <>{emptyText}</>
          </p>
        </>
      ) : null}
      {showHistory ? (
        <>
          <ul className="vf-account-balance-history tw:list-none tw:m-0 tw:p-0 tw:flex tw:flex-col">
            {entries.map((h, $index) => (
              <React.Fragment key={$index}>
                <li className="tw:flex tw:justify-between tw:items-baseline tw:gap-4 tw:py-3 tw:[border-top:1px_solid_var(--border-subtle)]">
                  <div className="tw:flex tw:flex-col tw:gap-1">
                    <span className="tw:font-medium">
                      <>{h?.label}</>
                    </span>
                    <span className="tw:text-sm tw:text-quiet">
                      <>{h?.date}</>
                    </span>
                  </div>
                  <span
                    className="vf-account-balance-amount tw:font-medium tw:whitespace-nowrap"
                    data-tone={h?.tone}
                  >
                    <>{h?.amount}</>
                  </span>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </>
      ) : null}
    </section>
  );
}
