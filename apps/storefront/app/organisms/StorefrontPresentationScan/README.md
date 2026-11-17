# StorefrontPresentationScan

Storefront organism for the presentation tag-scanning dialog. Receives controlled open state, localized title/body labels, warning text, the video element ID and a close callback explicitly from the View.

Owns dialog, instructions, muted inline video and optional warning composition. The View passes the existing `vf-presentation-camera` ID as the DOM contract used by presentation logic. Logic retains capability checks, camera permission/stream acquisition, video attachment/playback, QR detection and polling, tag interpretation, viewer navigation and stream/timer cleanup on close, late permission or unmount. This organism owns no state, browser effects or camera access and never imports page logic.

Preserve classes, dialog width, video ID, muted/playsInline attributes and close wiring. Verify active camera, unknown-code and blocked-camera warnings, successful scans, close/focus return, reopen/recovery, late permission and unmount cleanup, bilingual accessibility and responsive/touch rendering with controlled camera/decoder fixtures.

The colocated fixture/spec isolates the named dialog, supplied instructions, muted inline video and page-owned video ID, supplied unknown/blocked warning branches, reopen/recovery, close/Escape callbacks, keyboard containment and trigger focus return. Bilingual axe and compact containment are included. The fixture never requests a camera; stream/decoder acquisition, successful scan routing, late permission and lifecycle cleanup remain page integration responsibilities.
