# ResendCode

"Send a new code" for a one-time code, after a wait: the time left shows first, then the button.

```jsx
<CodeInput … />
<ResendCode seconds={60} onResend={sendCodeAgain} />
```

- The wait starts when the component mounts (show it with the code step) and again after each press.
- It runs on the clock, not on timer ticks: customers leave to read the SMS, and browsers slow timers in background tabs, so a tick count would still say 0:40 when the minute is up. Coming back to the tab updates it at once.
- The time left is plain text, not announced every second. When the wait ends, a polite status says once that a new code can be asked for.
- The time is m:ss in the page's digits (Persian under `fa`). The wording comes from `messages.js` (`ResendCode`); `resendLabel` changes the button.
- Say that a new code was sent (and that the old one stops working) in the page's own status; this component only knows the button was pressed.

## Usage

**Use when:** Under a CodeInput for a code sent by SMS or email.

**Don’t use when:** Don’t use for anything that isn't limited by a wait (a plain Button).
