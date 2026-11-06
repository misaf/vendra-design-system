# StorefrontPolicyHeading

Composes the policy eyebrow, h1, introduction and update metadata from explicit eyebrow/title/intro/updatedLabel/updatedDate/updatedIso props; the document's date renders as `<time dateTime>`. Preserves sibling structure, heading level and classes without adding a wrapper.

View retains localized/document copy mapping. StorefrontPolicyLayout retains the page header and responsive placement. Policy/shared logic retain document selection/fallback, each document's own ISO update date and its per-language (Jalali in Persian) formatting, section mapping, Persian numbering, routing, locale, SEO, focus and sticky measurements. This organism owns no state, calculations, persistence or browser effects.

Verify English/Persian copy across policy documents, one page h1, policy switching/reloads, section links, responsive containment, accessibility and screenshots against the previous version.
