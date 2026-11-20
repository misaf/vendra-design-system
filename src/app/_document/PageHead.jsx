import {vfBrandLinks} from '../../storefront/store/brand.js';

export function PageHead({tags, tenant, lang}) {
  return (
    <>
      <title>{tags.title}</title>
      {tags.meta
        .filter(({content}) => content != null && content !== '')
        .map(({key, name, content}) => (
          <meta key={name} {...{[key]: name, content}} />
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
