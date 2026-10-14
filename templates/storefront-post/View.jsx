// StorefrontPost: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <main id="main" tabIndex={-1} className="vf-info tw:mx-auto">
            {v.loading ? (
              <>
                <h1>
                  <>{v.t?.title}</>
                </h1>
                <DS.Skeleton shape="card" />
                <p role="status">
                  <>{v.migration?.loading}</>
                </p>
              </>
            ) : null}
            {v.missing ? (
              <>
                <DS.EmptyState title={v.migration?.missing} headingLevel={1} />
                <DS.Button href={v.href?.journal}>
                  <>{v.migration?.back}</>
                </DS.Button>
              </>
            ) : null}
            {v.hasPost ? (
              <>
                <div className="vf-reading tw:max-w-[760px] tw:mx-auto">
                  <article className="vf-post-article tw:max-w-[720px] tw:my-0 tw:mx-auto tw:flex tw:flex-col tw:gap-5">
                    <a
                      href={v.href?.journal}
                      className="vf-post-back tw:inline-flex tw:items-center tw:gap-2 tw:text-sm tw:text-quiet! tw:no-underline!"
                    >
                      <DS.Icon name="arrow-left" size={16} />
                      <>{v.t?.back}</>
                    </a>
                    <div className="vf-post-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet">
                      <>{v.t?.meta}</>
                    </div>
                    <h1>
                      <>{v.t?.title}</>
                    </h1>
                    <p className="vf-post-intro tw:text-secondary tw:m-0 tw:text-lg tw:leading-body tw:text-pretty">
                      <>{v.t?.lede}</>
                    </p>
                    {v.hasBlocks ? (
                      <>
                        {list(v.blocks).map((b, $index) => (
                          <React.Fragment key={$index}>
                            {b?.paragraph ? (
                              <>
                                <p>
                                  <>{b?.value}</>
                                </p>
                              </>
                            ) : null}
                            {b?.heading ? (
                              <>
                                <h2>
                                  <>{b?.value}</>
                                </h2>
                              </>
                            ) : null}
                            {b?.quote ? (
                              <>
                                <blockquote>
                                  <>{b?.value}</>
                                </blockquote>
                              </>
                            ) : null}
                            {b?.image ? (
                              <>
                                <figure>
                                  <img
                                    src={b?.src}
                                    alt={b?.caption}
                                    className="tw:w-full tw:rounded-md"
                                    loading="lazy"
                                  />
                                  <figcaption className="tw:text-sm tw:text-quiet">
                                    <>{b?.caption}</>
                                  </figcaption>
                                </figure>
                              </>
                            ) : null}
                            {b?.tips ? (
                              <>
                                <div className="tw:bg-sunken tw:p-5 tw:rounded-md">
                                  <ul>
                                    {list(b?.value).map((tip, $index) => (
                                      <React.Fragment key={$index}>
                                        <li>
                                          <>{tip}</>
                                        </li>
                                      </React.Fragment>
                                    ))}
                                  </ul>
                                </div>
                              </>
                            ) : null}
                          </React.Fragment>
                        ))}
                      </>
                    ) : null}
                    {v.hasClassic ? (
                      <>
                        <DS.ArchFrame ratio="4/3" shape="soft" placeholderLabel={v.t?.ph} alt="" />
                        <div className="vf-post-copy tw:flex tw:flex-col tw:text-body tw:gap-4h tw:text-md tw:leading-body">
                          {list(v.paras1).map((p, $index) => (
                            <React.Fragment key={$index}>
                              <p className="vf-post-paragraph tw:m-0 tw:text-pretty">
                                <>{p}</>
                              </p>
                            </React.Fragment>
                          ))}
                          <blockquote className="vf-post-quote tw:my-3 tw:mx-0 tw:ps-4h tw:[border-inline-start:2px_solid_var(--text-accent)] tw:font-display tw:text-xl tw:leading-snug tw:text-body">
                            <>{v.t?.quote}</>
                          </blockquote>
                          <h2 className="vf-post-heading tw:m-0 tw:font-display tw:font-medium tw:leading-tight tw:tracking-display tw:[text-transform:var(--display-case)]">
                            <>{v.t?.h2}</>
                          </h2>
                          {list(v.paras2).map((p, $index) => (
                            <React.Fragment key={$index}>
                              <p className="vf-post-paragraph tw:m-0 tw:text-pretty">
                                <>{p}</>
                              </p>
                            </React.Fragment>
                          ))}
                        </div>
                      </>
                    ) : null}
                    <div className="vf-post-actions tw:flex tw:gap-3 tw:flex-wrap tw:pt-2 tw:[border-top:1px_solid_var(--border-subtle)]">
                      <DS.Button variant="secondary" size="sm" iconStart="link" onClick={v.copy}>
                        <>{v.copyLabel}</>
                      </DS.Button>
                      <DS.Button
                        variant="primary"
                        size="sm"
                        iconEnd="arrow-right"
                        href={v.href?.shop}
                      >
                        <>{v.t?.shopIt}</>
                      </DS.Button>
                    </div>
                  </article>
                  <section className="tw:mt-7">
                    <div className="tw:flex tw:gap-3">
                      <DS.Button
                        variant="ghost"
                        href={v.shareWa}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {'WhatsApp'}
                      </DS.Button>
                      {v.instagram ? (
                        <DS.Button
                          variant="ghost"
                          href={v.instagram?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {'Instagram'}
                        </DS.Button>
                      ) : null}
                    </div>
                    <div className="vf-product-grid tw:grid tw:gap-5 tw:mt-5 tw:grid-cols-2 tw:md:grid-cols-3">
                      {list(v.storyProducts).map((p, $index) => (
                        <React.Fragment key={$index}>
                          <DS.ProductCard
                            name={p?.name}
                            price={p?.price}
                            stock={p?.stock}
                            images={p?.images}
                            href={p?.href}
                            frame="soft"
                          />
                        </React.Fragment>
                      ))}
                    </div>
                  </section>
                  <section className="vf-post-related tw:flex tw:flex-col tw:mt-9 tw:gap-5h">
                    <DS.SectionHeader title={v.t?.moreA} accent={v.t?.moreB} />
                    <div className="vf-post-article-grid tw:grid tw:[grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr))] tw:gap-y-7 tw:gap-x-5">
                      {list(v.related).map((r, $index) => (
                        <React.Fragment key={$index}>
                          <DS.BlogCard
                            frame="soft"
                            aspect="4/3"
                            title={r?.title}
                            excerpt={r?.excerpt}
                            meta={r?.meta}
                            href={r?.href}
                          />
                        </React.Fragment>
                      ))}
                    </div>
                  </section>
                </div>
              </>
            ) : null}
          </main>
        </>
      }
      sticky={<></>}
    />
  );
}
