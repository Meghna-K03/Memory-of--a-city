---
name: figma-to-code
description: Convert the approved Figma design (Memory of a City) into responsive React + Tailwind implementation, faithfully and without redesigning it.
---

# Figma to Code

## Purpose

Turn the approved Figma design for **Memory of a City** into working React + Tailwind code. The Figma design is the primary visual source of truth — this skill exists to stop the implementation from drifting into a generic dashboard.

## Process

1. **Use the connected Figma MCP** to inspect the actual design (`get_design_context`, `get_screenshot`, `get_metadata`). Do not treat the Figma URL as a passive reference image — pull the real structure.
2. Inspect: page structure, frames, components, spacing, typography, colors, borders, cards, buttons, icons, map areas, timeline, filters, and interactions.
3. **Before creating a new component, inspect the existing codebase** (`src/components`, `src/pages`) and reuse what's already there. Don't duplicate a component that already exists under a different name.
4. Implement using React + Tailwind CSS. Translate the design's visual language (colors, spacing, radii, typography scale) into Tailwind utility classes and, where a value recurs (colors, font families), into Tailwind theme tokens rather than repeating raw hex/px values inline.
5. Preserve the approved visual hierarchy — section order, emphasis, whitespace rhythm.
6. Make every implemented section responsive (desktop / tablet / mobile) even if the Figma frame only shows desktop.
7. Compare the rendered implementation against the Figma screenshot and fix meaningful visual differences (spacing, color, type scale, alignment). Minor sub-pixel differences are not worth chasing.
8. Test actual interactions (clicks, hovers, navigation, timeline scrubbing) — a visual match with broken interaction is not done.

## Do not

- Do not replace the approved design with a generic admin-dashboard layout.
- Do not add visual effects (glow, 3D, heavy animation) that aren't in the approved design or explicitly requested.
- Do not modify the Figma file itself unless explicitly asked.
- Do not invent sections or pages that aren't in SPEC.md or the approved Figma design.
