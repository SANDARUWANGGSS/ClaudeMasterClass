# Spec for Heist Card Component

branch: claude/feature/heist-card-component
figma_component (if used): HeistCard

## Summary

Build a `HeistCard` component to display individual heist details, and a `HeistCardSkeleton` loading placeholder. Both are rendered in a 3-column grid on the `/heists` dashboard page. Only active and assigned heists are shown — expired heists are excluded. Each card title links to the heist detail page (`/heists/:id`), which should exist as an empty route placeholder only.

## Functional Requirements

- Create a `HeistCard` component that accepts a `Heist` object (from `types/firestore`) and displays its key fields
- The card must display: title (as a link to `/heists/:id`), description, assignee codename, deadline, and final status
- Only render heists where the deadline has not yet passed (i.e. `deadline > now`) — expired heists are filtered out on the `/heists` page
- Both "active" (unassigned) and "assigned" heists should be shown; the distinction may be surfaced visually on the card
- Create a `HeistCardSkeleton` component that matches the card's visual structure with animated placeholder blocks
- Display both `HeistCard` and `HeistCardSkeleton` in a responsive 3-column grid layout on the `/heists` page
- The `/heists/[id]` route must exist but can render an empty page — no content required at this stage
- The grid should gracefully collapse to fewer columns on smaller screen sizes

## Figma Design Reference

- File: To be confirmed — design extraction from Figma is expected during implementation
- Component name: `HeistCard`
- Key visual constraints: Should align with the existing dark theme (`#030712`, `#0A101D`, `#101828`), purple (`#C27AFF`) and pink (`#FB64B6`) accent colours, and follow the CSS Module component pattern used by `Navbar`, `Avatar`, and `AuthForm`

## Possible Edge Cases

- No heists to display — the `/heists` page should handle an empty state gracefully
- All heists are expired — the filtered list may be empty
- A heist has no assignee yet — the card should handle `assignedTo` / `assignedToCodename` being absent or empty
- `finalStatus` is non-null — the card should visually indicate `success` or `failure`
- Very long titles or descriptions — text should truncate or wrap without breaking the card layout
- Skeleton count — decide on a sensible fixed number of skeletons to show while loading (e.g. 6)

## Acceptance Criteria

- `HeistCard` renders all required fields from a `Heist` object
- The card title is a Next.js `<Link>` pointing to `/heists/[id]`
- `/heists/[id]` exists as a route and renders without error (empty content is fine)
- Expired heists (deadline in the past) are not shown on the `/heists` page
- `HeistCardSkeleton` visually mirrors the `HeistCard` layout with placeholder shimmer/pulse animation
- Both components are displayed in a 3-column grid; the grid is responsive
- Components follow the project structure: `components/HeistCard/` and `components/HeistCardSkeleton/`, each with `.tsx`, `.module.css`, and `index.ts`
- No TypeScript errors or ESLint warnings introduced

## Open Questions

- Should the grid filter heists client-side or should the Firestore query exclude expired heists server-side? Client-side filtering for now.
- Should "active" vs "assigned" heists be visually differentiated on the card (e.g. a badge)? To be confirmed during Figma extraction.
- How many skeleton cards should be shown while loading? 6 (fills a 2-row grid).
- Should the `/heists` page fetch heists in real-time (Firestore listener) or on-demand? Out of scope for this spec — use static mock data or a placeholder fetch for now.

## Testing Guidelines

Create a test file in `./tests/components/` for the new components, covering:

- `HeistCard` renders the title, description, assignee codename, and deadline
- `HeistCard` title renders as a link to the correct `/heists/:id` URL
- `HeistCard` renders a `success` or `failure` status badge when `finalStatus` is set
- `HeistCardSkeleton` renders without errors and matches the expected DOM structure
- The `/heists` page filters out heists whose deadline is in the past
