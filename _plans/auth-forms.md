# Plan: Authentication Forms

## Context
The `/login` and `/signup` pages are currently empty placeholders. This plan adds functional auth forms with email/password fields, a show/hide password toggle, a submit button, and a link to switch between the two pages. Submissions log to the console only — no real auth yet.

## Approach: Shared `AuthForm` component

A single `AuthForm` component accepts a `mode: "login" | "signup"` prop and renders the appropriate heading, button label, and cross-link. Both pages simply mount `<AuthForm mode="..." />`. This avoids duplication and makes the switch-between-forms UX trivial.

---

## Files to create

### `components/AuthForm/AuthForm.tsx`
- `"use client"` directive (needs `useState`)
- Props: `mode: "login" | "signup"`
- State: `showPassword: boolean`
- Email field: `<input type="email" />`
- Password field: `<input type={showPassword ? "text" : "password"} />`
- Toggle button with lucide-react `Eye` / `EyeOff` icons (already installed), `aria-label="Toggle password visibility"`
- Submit handler: `e.preventDefault()` then `console.log({ email, password })`
- Heading: "Log in to Your Account" (login) / "Sign Up for an Account" (signup)
- Submit button label: "Log In" (login) / "Sign Up" (signup)
- Switch link: "Don't have an account? Sign up →" → `/signup` (login mode) or "Already have an account? Log in →" → `/login` (signup mode)
- Use `styles` from CSS module + existing global classes (`.form-title`)

### `components/AuthForm/AuthForm.module.css`
- `.form` — narrow centered card, flex column, gap between fields
- `.field` — label + input stacked
- `.passwordWrapper` — relative container for input + toggle button
- `.toggleBtn` — absolutely positioned icon button (right side of input)
- `.input` — full-width input styling using theme colours (`bg-lighter`, `text-heading`, border `primary`)
- `.submitBtn` — full-width primary button (`bg-primary`, `text-dark`, bold)
- `.switchLink` — centered muted link below button

### `components/AuthForm/index.ts`
```
export { default } from './AuthForm'
```

---

## Files to modify

### `app/(public)/login/page.tsx`
- Import `AuthForm` from `@/components/AuthForm`
- Replace placeholder content with `<AuthForm mode="login" />`
- Fix function name: `LoginPage` (currently incorrectly named `SignupPage`)

### `app/(public)/signup/page.tsx`
- Import `AuthForm` from `@/components/AuthForm`
- Replace placeholder content with `<AuthForm mode="signup" />`

---

## Files to create (tests)

### `tests/components/AuthForm.test.tsx`
Tests (using `@testing-library/react` + `userEvent`):
1. Login mode renders heading "Log in to Your Account"
2. Signup mode renders heading "Sign Up for an Account"
3. Email and password inputs are present in both modes
4. Submit button reads "Log In" in login mode, "Sign Up" in signup mode
5. Clicking the toggle button changes the password input type from `password` → `text`
6. Submitting calls `console.log` with `{ email, password }` values
7. Login mode has a link to `/signup`
8. Signup mode has a link to `/login`

Use `vi.spyOn(console, 'log')` for the console assertion.

---

## Verification
1. `npx vitest run tests/components/AuthForm.test.tsx` — all tests pass
2. `npm run dev` — visit `/login` and `/signup`, confirm forms render, toggle works, submit logs to console, cross-links navigate correctly
