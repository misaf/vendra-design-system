import React from 'react';

export function StorefrontPolicyDocument({sections}) {
  return (
    <>
      {sections.map((s, $index) => (
        <React.Fragment key={$index}>
          <section
            id={s?.id}
            className="vf-info-section tw:flex tw:flex-col tw:gap-4 tw:[scroll-margin-top:96px]"
          >
            <h2>
              <>{s?.title}</>
            </h2>
            {s.paras.map((para, $index) => (
              <React.Fragment key={$index}>
                <p className="vf-info-copy tw:m-0 tw:text-md tw:leading-body tw:text-secondary tw:text-pretty">
                  <>{para?.text}</>
                </p>
              </React.Fragment>
            ))}
            {s?.hasItems ? (
              <>
                <ul className="vf-policy-list tw:m-0 tw:ps-5 tw:flex tw:flex-col tw:gap-2 tw:text-md tw:leading-body tw:text-secondary">
                  {s.items.map((item, $index) => (
                    <React.Fragment key={$index}>
                      <li>
                        <>{item?.text}</>
                      </li>
                    </React.Fragment>
                  ))}
                </ul>
              </>
            ) : null}
          </section>
        </React.Fragment>
      ))}
    </>
  );
}
