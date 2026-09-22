---
name: frontend-development
description: Build and extend the Memory of a City React/Vite/Tailwind frontend cleanly — component structure, state, routing, responsiveness, and accessibility.
---

# Frontend Development

## Purpose

Guide day-to-day frontend work on **Memory of a City** so the codebase stays simple enough for the team to explain during viva.

## Pages (exactly 3 — do not add more without asking)

1. **Home** — project intro, hero, Explore City CTA, timeline preview.
2. **City Explorer** — Bengaluru map, timeline, filters, neighborhood selection, stats.
3. **Neighborhood / Change Story** — before/after comparison, charts, "What Changed?", AI Change Story, evidence.

## Main user flow

Home → City Explorer → select year → select neighborhood → view changes → select two years → What Changed? → AI Change Story → Evidence → explore another neighborhood.

Every navigation action in code should map onto a step in this flow. If a new button doesn't fit this flow, ask before adding it.

## State to track (keep it explicit, not hidden in refs)

- selected year (City Explorer)
- selected neighborhood
- active map layer filters
- comparison years (fromYear / toYear on Neighborhood page)
- map view state (center/zoom, selected marker)
- loading state per async operation
- error state per async operation
- AI Change Story state (idle / loading / shown)

## Component rules

- Reusable components: Navbar, buttons, Timeline, FilterPanel, stat cards, map controls, comparison sections, evidence cards.
- Use simple, literal names (`NeighborhoodPanel`, not `NHPnl` or `SmartInsightWidget`).
- No duplicate JSX — if the same markup shape appears twice, extract a component or a small helper, but don't over-abstract a one-off.
- Avoid unnecessary abstraction layers (no generic "widget factory" for 3 stat cards).
- Make the smallest useful change when editing existing components; don't rewrite a working component to "improve" it without a reason tied to the task.

## Responsiveness & accessibility

- Every page must work at desktop, tablet, and mobile widths — navigation, timeline, map, and cards must not overflow or become unusable.
- Maintain readable contrast, visible focus states, and meaningful labels (especially on icon-only buttons like map zoom controls).
- Never use color alone to convey state (e.g. pair an active filter's color dot with a text label, which the existing design already does — preserve that).

## Loading & error states

- Any data fetch (from the Express backend, or the AI Change Story endpoint) must show a clear loading state and a understandable error message on failure — never a silent blank panel.

## Do not

- Do not add packages beyond what's needed for the stated stack (React, Vite, Tailwind, react-router-dom, Leaflet/react-leaflet, Chart.js, plus their type packages).
- Do not introduce a state management library (Redux, Zustand, etc.) — local component state and prop drilling are sufficient at this scale.
