Centered empty/error screen (max ~560px): shop failed to load, no search results, empty bag, empty saved list.
```jsx
<EmptyState icon="flower-2" title="The flowers are" titleAccent="running late." body="We couldn't load the shop just now." actions={<Button>Try again</Button>} />
```

## Usage
**Use when:** Empty bag, no orders, no reminders, no search results, and page-level errors (`tone="error"`). Always give one next action.

**Don’t use when:** Don’t use for loading (Skeleton) or small inline errors (Alert / field error).
