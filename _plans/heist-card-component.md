# Plan: Heist Card Component

## Context

The `/heists` dashboard page is currently a static scaffold with empty section headings. This plan implements the `HeistCard` and `HeistCardSkeleton` components and wires them into a 3-column grid on the heists page, showing only non-expired heists. The `/heists/[id]` route already exists as an empty placeholder — no changes needed there.

---

## Files to Create

```
components/HeistCard/
  HeistCard.tsx
  HeistCard.module.css
  index.ts

components/HeistCardSkeleton/
  HeistCardSkeleton.tsx
  HeistCardSkeleton.module.css
  index.ts

tests/components/HeistCard.test.tsx
tests/components/HeistCardSkeleton.test.tsx
```

## Files to Modify

```
app/(dashboard)/heists/page.tsx   ← add grid, filtering, skeleton/card render
```

---

## Step-by-Step Plan

### 1. `HeistCard` component

**`components/HeistCard/HeistCard.tsx`**
- Props: `{ heist: Heist }` (imported from `@/types/firestore`)
- Renders:
  - **Title** — Next.js `<Link href={/heists/${heist.id}}>` wrapping the title text
  - **Description** — body text, capped at 2–3 lines via CSS line-clamp
  - **Assignee** — `heist.assignedToCodename`, or an "Unassigned" fallback if empty string
  - **Deadline** — formatted date string (e.g. `new Date(heist.deadline).toLocaleDateString()`)
  - **Status badge** — only rendered when `heist.finalStatus` is non-null; green for `'success'`, red for `'failure'`
- Follows existing component conventions: `import styles from './HeistCard.module.css'`

**`components/HeistCard/HeistCard.module.css`**
- Card container: dark surface (`#0A101D`), border `1px solid rgba(194,122,255,0.15)`, `border-radius: 8px`, padding `1.5rem`
- Hover: border brightens to `rgba(194,122,255,0.35)`, subtle lift via `transform: translateY(-2px)`
- Title link: white, no underline by default, underline on hover
- Description: `color: #99A1AF`, `line-clamp: 3`
- Status badge: small pill — success uses `#05DF72` background, failure uses `#FF6467`
- Deadline row: muted text, small font size
- Assignee row: secondary text

**`components/HeistCard/index.ts`**
- Re-exports the default export from `HeistCard.tsx`

---

### 2. `HeistCardSkeleton` component

**`components/HeistCardSkeleton/HeistCardSkeleton.tsx`**
- No props
- Renders the same structural layout as `HeistCard` but replaces all content with shimmer placeholder `<div>` blocks
- Block sizes mirror the real card elements (title, description lines, badge, deadline)

**`components/HeistCardSkeleton/HeistCardSkeleton.module.css`**
- Same card container styles as `HeistCard` for visual consistency
- `.shimmer` utility: CSS `@keyframes` pulse animation cycling between `#101828` and `#1a2235`, `border-radius: 4px`
- Placeholder blocks at appropriate widths/heights (e.g. title: `60% wide, 1.25rem tall`; description: three lines at `100%`, `90%`, `70%`; deadline: `40%`)

**`components/HeistCardSkeleton/index.ts`**
- Re-exports the default export from `HeistCardSkeleton.tsx`

---

### 3. Update `/heists` page

**`app/(dashboard)/heists/page.tsx`**

Replace the static scaffold with:

- A `'use client'` directive (needed for `useState` / `useEffect` loading simulation)
- `useState` for `heists: Heist[]` and `loading: boolean`
- `useEffect` that simulates a data fetch with a small timeout, sets mock heist data, then sets `loading: false`
  - Mock data should include a mix of active, assigned, and one expired heist to demonstrate filtering
- **Filter logic**: `const visibleHeists = heists.filter(h => h.deadline > new Date())`
- **Grid layout**: CSS grid, 3 columns on desktop, responsive (2 on tablet, 1 on mobile)
- **Render**:
  - While `loading === true`: render 6× `<HeistCardSkeleton />` in the grid
  - While `loading === false`: render `visibleHeists.map(h => <HeistCard key={h.id} heist={h} />)` — or an empty state message if the list is empty

---

### 4. Tests

**`tests/components/HeistCard.test.tsx`**
- Render with a mock `Heist` object (deadline in the future)
- Assert title text is present
- Assert title is a link pointing to `/heists/mock-id`
- Assert assignee codename is displayed
- Assert deadline is displayed
- Assert status badge is NOT rendered when `finalStatus` is `null`
- Assert success badge renders when `finalStatus === 'success'`
- Assert failure badge renders when `finalStatus === 'failure'`
- Assert "Unassigned" fallback renders when `assignedToCodename` is empty string

**`tests/components/HeistCardSkeleton.test.tsx`**
- Render without props
- Assert it renders without errors
- Assert the expected number of shimmer placeholder elements are present

---

## Conventions to Follow

- Component styles: `import styles from './ComponentName.module.css'`
- Import Heist type: `import type { Heist } from '@/types/firestore'`
- Next.js Link: `import Link from 'next/link'`
- Tests: `import { render, screen } from '@testing-library/react'` — prefer semantic queries (`getByRole`, `getByText`)
- No Firestore calls yet — mock data only on the page

---

## Verification

1. `npm run dev` → visit `/heists` — skeletons appear briefly, then cards render; expired heist is absent
2. Click a card title → navigates to `/heists/[id]` without error
3. `npx vitest run tests/components/HeistCard.test.tsx tests/components/HeistCardSkeleton.test.tsx` — all pass
4. `npm run lint` — no errors
