# StorefrontTrackProgress

Composes the tracking progress card from explicit steps/current/status/label/doneLabel props. Preserves the package Card with padding 24 and OrderTimeline, including the empty card when a cancelled timeline renders nothing. Adds no wrapper.

View retains order visibility and prop mapping. Tracking logic retains status normalization, step index, active/done/cancelled state and localized step labels/times. Package OrderTimeline retains ordered-list semantics, aria-current, completed-step announcements and cancelled suppression. This organism owns no state, rules, persistence or browser effects.

Verify bilingual received/preparing/on-the-way/delivered/cancelled states, normalized aliases, current/completed/upcoming steps, done labels, empty cancelled card, lookup visibility and responsive markup against the previous version.
