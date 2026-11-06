# ErrorSummary

After a failed submit, a list of what to fix in form order, each a link to its field. It sits at the top of the form, inside a danger Alert.

```jsx
<ErrorSummary
  id="checkout-errors"
  errors={[
    {text: 'Enter the recipient’s name.', target: 'recipient-name'},
    {text: 'Pin the address on the map.', target: 'address-map'}
  ]}
/>
```

- Each link scrolls its field to the middle of the screen (so its label shows) and focuses it, or the first control inside it when `target` is a group or a map. Each field still shows its own error under it: the summary repeats them, it doesn't replace them.
- The title counts the errors in the page's digits: "Check 2 details to continue." («۲ مورد را بررسی کنید تا ادامه دهید.»), and "Check this detail to continue." for one. Pass `title` to say something else. The words come from `messages.js`.
- Focus: after a failed submit, focus the summary (`id`, it has `tabIndex -1`), so screen readers read it and keyboard users start from it; or set `autoFocus`. With a single error you may focus that field instead, as the bag does. It is a `role="alert"` region, so it is announced when it appears.
- Renders nothing while `errors` is empty.

## Usage

**Use when:** A form with more than a couple of fields was submitted with errors (the bag's delivery step, contact, account forms).

**Don’t use when:** Don’t use for a server or connection error with no field to go to (an Alert), or for a single-field form (the field's own error is enough).
