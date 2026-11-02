# StorefrontPolicyLayout

Policy Atomic Design template with React-node slots for heading, policy navigation, notice, table of contents and document. It owns the main focus target, header, notice spacing, responsive policy columns and document wrapper.

StorefrontPolicyHeading composes the eyebrow, title, introduction and update metadata from explicit props. StorefrontPolicyNavigation composes labelled policy links from explicit props. StorefrontPolicyNotice composes the warning sample notice from explicit title/body props. The View retains localized/document copy mapping, navigation label mapping/list normalization, sticky table of contents, section anchors and document headings/paragraphs/lists. Policy logic retains document selection/fallback, section mapping and Persian numbering; shared logic retains policy link/current-state descriptors, routing, locale, SEO, focus and sticky measurements. The layout owns no data, state, effects or callbacks.

Preserve classes, landmarks, section anchors and focus targets. Verify switching policies, active links, direct/reloaded routes, section navigation, English/Persian accessibility, printing and responsive rendering.
