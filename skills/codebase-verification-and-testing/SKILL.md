---
name: codebase-verification-and-testing
description: Enforce understand-plan-build-test-report on every change to Memory of a City, and verify features by actually running and interacting with the app, not by reading code.
---

# Codebase Verification and Testing

## Purpose

Make sure nothing gets reported as "working" without being run. This skill governs how every change is verified, regardless of which other skill produced it.

## Working rule

**Understand → Plan → Build → Test → Report.**

1. Inspect the existing implementation before changing it.
2. Make the smallest useful change that achieves the task.
3. Avoid unrelated refactoring in the same change.
4. Avoid adding a dependency unless it's genuinely needed.
5. Run the application (dev server) and exercise the change through real interaction — click it, don't just read it.
6. Record the test (see format below).
7. Fix failures before reporting the feature as complete.

## Test record format

For every important feature tested:

```
Action:   <what was done>
Expected: <what should happen>
Actual:   <what actually happened>
Result:   PASS / FAIL
```

Never write "PASS" without having actually triggered the action and observed the result in the running app.

## What must be verified before calling the project (or a phase of it) complete

- Home → City Explorer navigation
- Timeline year selection (updates map + stats)
- Map rendering (tiles load, markers appear)
- Map layer filters (each toggles independently)
- Neighborhood selection (marker click and pill click both work, panel opens)
- Comparison year selection on Neighborhood page (from/to selects)
- Statistics update when year/neighborhood changes
- Chart rendering (trend chart, comparison chart) with correct data
- "What Changed?" interaction triggers the AI Change Story flow
- City Change Investigator output (loading → three-part result → disclaimer visible)
- Evidence section renders sources tied to the current neighborhood
- "Explore another neighborhood" / return navigation
- Responsive layout at desktop, tablet, and mobile widths
- Loading and error states for any async operation

## Do not

- Do not claim something works because the code "looks correct" — it must be observed running.
- Do not skip testing because a change "seems small."
- Do not silently widen the scope of a fix into a broader rewrite.
