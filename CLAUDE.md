# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
npm run test     # Run Vitest (watch mode)
npx vitest run   # Run tests once (CI mode)
npx vitest run tests/components/Navbar.test.tsx  # Run a single test file
```

## Architecture

**Pocket Heist** is a Next.js 16 App Router project using React 19 and TypeScript.

### Routing

Route groups separate public and authenticated areas — no auth middleware exists yet, routing is currently manual:

- `app/(public)/` — Unauthenticated pages: splash (`/`), `/login`, `/signup`, `/preview`
- `app/(dashboard)/` — Authenticated pages: `/heists`, `/heists/create`, `/heists/[id]`

The splash page (`(public)/page.tsx`) is intended to redirect users based on auth state (logged in → `/heists`, logged out → `/login`), but redirection logic is not yet implemented.

### Styling

Tailwind CSS v4 via PostCSS. Global theme variables and utility classes (`.page-content`, `.center-content`, `.form-title`, `.public`) are defined in `app/globals.css`. Component-scoped styles use CSS Modules (e.g., `Navbar.module.css`).

Theme palette: purple `#C27AFF`, pink `#FB64B6`, dark backgrounds (`#030712`, `#0A101D`, `#101828`), success `#05DF72`, error `#FF6467`.

### Components

Stored in `components/` with barrel exports via `index.ts`. Currently only `Navbar` exists, used in the dashboard layout.

### Testing

Vitest + Testing Library + jsdom. Tests live in `tests/`. Path aliases (`@/*`) and React are configured in `vitest.config.mts`.
