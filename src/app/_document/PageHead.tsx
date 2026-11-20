import {vfBrandLinks} from '../../storefront/store/brand.js';
import type {VF_SEO} from '../../storefront/shell/seo.js';

export type HeadTags = ReturnType<typeof VF_SEO.headTags>;

type PageHeadProps = {tags: HeadTags; tenant: string | null; lang: string};

export function PageHead({tags, tenant, lang}: PageHeadProps) {
  return (
    <>
      <title>{tags.title}</title>
      {tags.meta
        .filter(({content}) => content != null && content !== '')
        .map(({key, name, content}) => (
          <meta key={name} {...{[key ?? 'name']: name, content}} />
        ))}
      {tags.links.map(({rel, hreflang, href}) => (
        <link key={hreflang || rel} rel={rel} hrefLang={hreflang} href={href} />
      ))}
      {tags.jsonLd && (
        <script
          type="application/ld+json"
          data-ag-seo=""
          dangerouslySetInnerHTML={{__html: tags.jsonLd}}
        />
      )}
      {vfBrandLinks(tenant, lang).map(link => (
        <link key={link.rel + (link.sizes || '')} {...link} />
      ))}
    </>
  );
}
