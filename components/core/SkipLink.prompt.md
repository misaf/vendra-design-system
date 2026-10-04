**SkipLink** — first focusable element on every page. `<SkipLink>{lang==='fa'?'رفتن به محتوا':'Skip to content'}</SkipLink>` then `<main id="main" tabIndex={-1}>`. Hidden until focused; pill on `--surface-inverse`.

## Usage
**Use when:** First focusable element on every page, pointing at `#main`.

**Don’t use when:** Don’t use more than one per page or style it visible by default.
