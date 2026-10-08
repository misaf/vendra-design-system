# CodeInput

A one-time code field, such as the sign-in code sent by SMS. It is one input, not a box per digit, so screen readers read it as one field and SMS autofill (`autocomplete="one-time-code"`) fills it in one go.

```jsx
<CodeInput
  label="Code"
  hint="We sent a 5-digit code to 0912 345 6789"
  length={5}
  value={code}
  onValueChange={setCode}
  error={codeError}
/>
```

- Keeps digits only and accepts Persian or Arabic digits, so `onValueChange` always gets Latin digits, at most `length` of them.
- `onComplete(code)` runs once the code is full. It doesn't submit by itself: a form that submits on completion should say so, because changing context on input without warning fails WCAG 3.2.2.
- Digits are spaced and evenly sized (tabular figures) so the code is easy to check.

## Usage

**Use when:** Sign-in and verification codes.

**Don’t use when:** Don’t use for phone numbers (PhoneInput), amounts or promo codes (Input).
