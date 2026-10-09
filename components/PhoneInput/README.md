# PhoneInput

A phone number field built on Input: the phone keypad on touch screens, autofill, and the number kept left to right inside Persian text. It shows what the customer types and hands back the clean number.

```jsx
<PhoneInput
  label="Recipient mobile"
  autoComplete="off"
  value={phone}
  onChange={event => setPhone(event.target.value)}
  onValueChange={(number, isMobile) => setValid(isMobile)}
  error={phoneError}
/>
```

- `onValueChange(number, isMobile)` gives an Iranian mobile in its one stored form however it was typed (`۰۹۱۲ ۳۴۵ ۶۷۸۹`, `+98 912 345 6789` and `912-345-6789` all → `09123456789`), and whether it is a mobile, the same check as `commerce.mobile`/`isMobile`. Store and compare numbers in that form.
- `autoComplete` defaults to `tel`, the customer's own number. Use `off` for someone else's, such as a gift recipient, so the browser doesn't fill in the customer's.
- It styles nothing of its own: label, hint and error come from Input and Field.

## Usage

**Use when:** Any phone or mobile number: sign-in, delivery recipient and sender, contact and inquiry forms, saved addresses.

**Don’t use when:** Don’t use for one-time codes (CodeInput) or other numbers such as card digits.
