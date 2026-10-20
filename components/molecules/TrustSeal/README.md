# TrustSeal

An eNamad (نماد اعتماد الکترونیکی) or Samandehi (ساماندهی) seal that opens its verification page. Iranian shoppers look for these before they pay, so the storefront shows them in the footer.

```jsx
<TrustSeal
  kind="enamad"
  href="https://trustseal.enamad.ir/?id=…&Code=…"
  image="https://trustseal.enamad.ir/logo.aspx?id=…&Code=…"
/>
<TrustSeal kind="samandehi" href="https://logo.samandehi.ir/Verify.aspx?id=…&p=…" image="…/logo.aspx?id=…&p=…" />
```

- Pass the link and image URL exactly as the issuer's panel gives them; they are the tenant's data (store settings, `templates/API.md` item 29), never hard-coded.
- The issuer checks which site shows the seal from the referrer. The link and image carry `referrerPolicy="origin"`, and the link opens a new tab with `rel="noopener"` but not `noreferrer`. Don't wrap it in anything that strips the referrer.
- The image sits on a light tile, as the seals are drawn for white, so it reads on the inverse footer too. Its `alt` is the seal's name.
- With no image, or one that doesn't load (an ad blocker, the issuer offline), the seal's name shows in a bordered tile and the link still works. The names come from `messages.js` (`TrustSeal.enamad`, `TrustSeal.samandehi`), or pass `label`.

## Usage

**Use when:** In the footer of every page, and near the pay button if the store wants it there too.

**Don’t use when:** Don’t use for payment-method logos or for badges the store gives itself (Badge).
