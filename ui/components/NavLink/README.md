# NavLink

Text link with a current state (accent + aria-current="page"). Group vertically with MenuList.

```jsx
<NavLink current onClick={()=>go('shop')}>Shop</NavLink>
<MenuList title="Explore"><NavLink variant="menu">Weddings</NavLink></MenuList>
```

## Usage

**Use when:** Header and inline navigation links with current-page state.

**Don’t use when:** Don’t use for actions (Button) or in-page tab switching (Tabs).
